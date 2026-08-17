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
  const boxRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setAt((i) => (i + 1) % HERO.length), HERO_MS.hold);
    return () => clearInterval(t);
  }, [running]);

  /* 점을 누르면 그 장으로 가고, 시계를 처음부터 다시 셉니다 —
     방금 누른 장이 바로 넘어가 버리면 누른 보람이 없습니다.
     at 이 바뀌면 위 effect 가 다시 걸리므로 타이머는 자동으로 새로 시작합니다. */
  const go = useCallback((i: number) => setAt(i), []);

  if (!HERO.length) {
    /* 사진 목록이 비어 있으면 style.css 의 바탕(그라디언트)만 나옵니다. */
    return <div className="hero__bg" ref={boxRef} />;
  }

  return (
    <>
      <div
        className="hero__bg is-slides"
        ref={boxRef}
        style={{ ["--hero-fade" as string]: `${HERO_MS.fade}ms` }}
      >
        {HERO.map((src, i) => (
          <div
            key={src}
            className={"hero__s" + (i === at ? " is-on" : "")}
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
