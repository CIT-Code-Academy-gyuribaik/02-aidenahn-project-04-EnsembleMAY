"use client";

/* ==========================================================================
   히어로 사진 넘기기

   예전 main.js 의 같은 기능을 옮긴 것입니다. 동작과 이유는 그대로입니다.
     · 사진을 겹쳐 놓고 opacity 로만 넘깁니다. 사진을 갈아 끼우는 방식
       (src 교체)은 새 사진을 받아오는 동안 한 번 깜빡입니다.
     · 첫 장 말고는 미리 받아 둡니다. 넘어가는 순간에 받기 시작하면
       그 한 번은 빈 자리가 스쳐 지나갑니다.
     · 히어로가 화면 밖이거나 탭을 옮기면 타이머를 멈춥니다.
       보이지도 않는 사진을 4초마다 바꾸면 배터리만 씁니다.
     · 동작 줄이기 설정이 켜져 있으면 저절로 넘기지 않습니다. 다만 점을
       눌러 직접 넘기는 것은 됩니다 — 스스로 일으킨 움직임까지 막을
       이유는 없습니다.

   사진 목록과 속도는 web/content/site.json 에 있습니다.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO, HERO_MS } from "@/lib/content";

export default function HeroSlideshow() {
  const [at, setAt] = useState(0);
  /* 지금 녹아 나가는 중인 장. 없으면 -1.
     ────────────────────────────────────────────────────────────────
     [켜짐]만으로는 부족합니다. 켜짐이 떨어지는 순간 확대의 목적지가
     제자리(1)로 바뀌면서, 브라우저가 그때까지 가던 확대를 버립니다 —
     그 자리에서 굳었다가 다 사라진 뒤에야 되돌아갑니다. 화면에서는
     [커지다가 멈춘 채로 넘어가는] 것으로 보입니다.
     나가는 동안에도 [켜짐]과 똑같은 확대를 걸어 두면(style.css 의
     .is-out) 커지던 것이 그대로 이어져, 사라지는 마지막 순간에 목적지
     (1.16)에 닿습니다. 확대에 걸린 시간(--hero-zoom)이 hold + fade 인
     것이 원래 이걸 노린 값이었습니다. */
  const [out, setOut] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

  /* 천천히 커지는 연출(style.css 의 .hero__s)을 그릴 준비가 됐는가.
     ────────────────────────────────────────────────────────────────
     첫 장은 처음부터 켜진 채로(.is-on) 그려집니다. 배율을 그 규칙에 바로
     걸면 브라우저가 [처음 값이 1.06] 이라고 읽어서, 옮겨 갈 곳이 없으니
     아무것도 움직이지 않습니다 — 첫 장만 멈춰 있고 둘째 장부터 커집니다.
     그래서 한 프레임 뒤에 .is-armed 를 붙입니다. 그 사이에 [1] 이 한 번
     그려지므로 브라우저가 1 에서 1.06 으로 옮겨 갈 길을 갖게 됩니다.
     rAF 를 두 번 겹치는 이유 — 한 번만으로는 아직 첫 그림이 끝나기 전인
     브라우저가 있어서, 그 경우 같은 자리로 되돌아갑니다. */
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setArmed(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  /* 저절로 넘어가도 되는 상황인가 — 화면에 보이고, 탭이 앞에 있고,
     동작 줄이기가 꺼져 있고, 사진이 두 장 이상일 때. */
  const [seen, setSeen] = useState(true);
  const [calm, setCalm] = useState(false);
  const many = HERO.length > 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion:reduce)");
    const sync = () => setCalm(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* 첫 장 뒤의 사진을 미리 받아 둡니다. */
  useEffect(() => {
    if (!many) return;
    const onLoad = () => {
      HERO.slice(1).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    if (document.readyState === "complete") onLoad();
    else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, [many]);

  /* 히어로가 화면 안에 있는지 지켜봅니다. */
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => setSeen(es[0].isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* 탭을 다른 곳으로 옮겼는지 */
  const [awake, setAwake] = useState(true);
  useEffect(() => {
    const sync = () => setAwake(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const running = many && !calm && seen && awake;

  /* 지금 몇 번째인지를 ref 로도 들고 있습니다. 아래 go 가 [지금 장]을
     알아야 하는데, 상태로만 두면 go 가 그 값을 붙들게 되어 타이머를
     걸 때마다 새로 만들어야 합니다. */
  const atRef = useRef(0);
  const outT = useRef<number | undefined>(undefined);

  const go = useCallback((i: number) => {
    const cur = atRef.current;
    if (i === cur) return;
    atRef.current = i;
    setOut(cur);
    setAt(i);
    /* 다 녹아 나간 뒤에 [나가는 중]을 뗍니다. 그 순간 확대가 제자리로
       돌아가지만, 이미 투명해진 뒤라 되돌아가는 것은 보이지 않습니다. */
    window.clearTimeout(outT.current);
    outT.current = window.setTimeout(() => setOut(-1), HERO_MS.fade);
  }, []);

  useEffect(() => () => window.clearTimeout(outT.current), []);

  /* 점을 누르면 그 장으로 가고, 시계를 처음부터 다시 셉니다 —
     방금 누른 장이 바로 넘어가 버리면 누른 보람이 없습니다.
     at 을 지켜보고 있으므로 장이 바뀔 때마다 시계가 새로 걸립니다.
     (setInterval 이 아니라 setTimeout 인 것이 그래서입니다 — 간격을
     유지하는 시계는 눌러도 제 박자를 그대로 밀고 갑니다.) */
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go((atRef.current + 1) % HERO.length), HERO_MS.hold);
    return () => clearTimeout(t);
  }, [running, at, go]);

  if (!HERO.length) {
    /* 사진 목록이 비어 있으면 style.css 의 바탕(그라디언트)만 나옵니다. */
    return <div className="hero__bg" ref={boxRef} />;
  }

  return (
    <>
      <div
        className={"hero__bg is-slides" + (armed ? " is-armed" : "")}
        ref={boxRef}
        /* --hero-zoom 은 한 장이 화면에 머무는 시간입니다(녹아 들어오고 ·
           멈춰 있고 · 녹아 나가는 시간의 합 = hold + fade). 그동안 사진이
           아주 조금씩 커집니다 — 자세한 것은 style.css 의 .hero__s 주석에. */
        style={{
          ["--hero-fade" as string]: `${HERO_MS.fade}ms`,
          ["--hero-zoom" as string]: `${HERO_MS.hold + HERO_MS.fade}ms`,
        }}
      >
        {HERO.map((src, i) => (
          <div
            key={src}
            className={
              "hero__s" + (i === at ? " is-on" : i === out ? " is-out" : "")
            }
            style={{ backgroundImage: `url("${src}")` }}
          />
        ))}
      </div>

      {many && (
        <div className="hero__dots" role="group" aria-label="히어로 사진 넘기기">
          {HERO.map((src, i) => (
            <button
              key={src}
              type="button"
              className={"hero__dot" + (i === at ? " is-on" : "")}
              aria-label={`${i + 1}번째 사진`}
              aria-current={i === at ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </>
  );
}
