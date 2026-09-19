"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO, HERO_MS } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { srcSetOf } from "@/lib/img";
import { attachSwipe } from "@/lib/swipe";
import { T } from "@/lib/i18n";

export default function HeroSlideshow() {
  const { lang } = useLang();
  const [at, setAt] = useState(0);

  const [out, setOut] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

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

  /* 첫 그림에는 첫 장만 내겁니다. 나머지 넉 장은 첫 화면이 다 뜬 뒤에 붙입니다 —
     다섯 장을 한꺼번에 받으면 휴대폰에서 첫 사진이 늦게 뜹니다. 두 번째 장이
     필요해지는 것은 5.6초 뒤(HERO_MS.hold)라 시간은 넉넉합니다.
     ★ 손으로 new Image() 를 만들어 미리 받지는 않습니다 — srcset 을 거치지 않아
       원본을 한 번 더 내려받게 됩니다. */
  const [rest, setRest] = useState(false);
  useEffect(() => {
    if (!many) return;
    const on = () => setRest(true);
    if (document.readyState === "complete") {
      const t = setTimeout(on, 120);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", on, { once: true });
    return () => window.removeEventListener("load", on);
  }, [many]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => setSeen(es[0].isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [awake, setAwake] = useState(true);
  useEffect(() => {
    const sync = () => setAwake(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const running = many && !calm && seen && awake;

  const atRef = useRef(0);
  const outT = useRef<number | undefined>(undefined);

  const go = useCallback((i: number) => {
    const cur = atRef.current;
    if (i === cur) return;
    atRef.current = i;
    setOut(cur);
    setAt(i);

    window.clearTimeout(outT.current);
    outT.current = window.setTimeout(() => setOut(-1), HERO_MS.fade);
  }, []);

  useEffect(() => () => window.clearTimeout(outT.current), []);

  const step = useCallback(
    (d: number) => go((atRef.current + d + HERO.length) % HERO.length),
    [go]
  );

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go((atRef.current + 1) % HERO.length), HERO_MS.hold);
    return () => clearTimeout(t);
  }, [running, at, go]);

  /* 좁은 화면에서는 화살표를 숨기므로(style.css) 쓸어 넘기기가 유일한 길입니다.
     장막과 글상자가 배경 칸을 덮고 있어서, 손짓은 맨 바깥 .hero 에서 받습니다. */
  useEffect(() => {
    if (!many) return;
    const hero = boxRef.current?.closest<HTMLElement>(".hero");
    if (!hero) return;
    return attachSwipe(hero, {
      onLeft: () => step(1),
      onRight: () => step(-1),
    });
  }, [many, step]);

  if (!HERO.length) {
    return <div className="hero__bg" ref={boxRef} />;
  }

  return (
    <>
      <div
        className={"hero__bg is-slides" + (armed ? " is-armed" : "")}
        ref={boxRef}

        style={{
          ["--hero-fade" as string]: `${HERO_MS.fade}ms`,
          ["--hero-zoom" as string]: `${HERO_MS.hold + HERO_MS.fade}ms`,
        }}
      >
        {/* 배경 그림이 아니라 진짜 <img> 입니다 — 그래야 srcset 으로 화면 폭에 맞는
            판을 고를 수 있습니다. 휴대폰이 1920px 짜리 다섯 장(740KB)을 통째로
            받던 자리입니다. 확대·녹아듦은 바깥 칸에 걸려 있어 그대로입니다. */}
        {HERO.map((h, i) => (
          <div
            key={h.src}
            className={
              "hero__s" + (i === at ? " is-on" : i === out ? " is-out" : "")
            }
          >
            {(i === 0 || rest) && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={h.src}
                srcSet={srcSetOf(h.src, h.w)}
                sizes="100vw"
                alt=""
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>

      {many && (
        <>
          <button
            type="button"
            className="hero__arw hero__arw--p"
            aria-label={T.home.heroPrev[lang]}
            onClick={() => step(-1)}
          >
            <span aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hero__arw hero__arw--n"
            aria-label={T.home.heroNext[lang]}
            onClick={() => step(1)}
          >
            <span aria-hidden="true" />
          </button>

          <div className="hero__dots" role="group" aria-label={T.home.heroNav[lang]}>
            {HERO.map((h, i) => (
              <button
                key={h.src}
                type="button"
                className={"hero__dot" + (i === at ? " is-on" : "")}

                aria-label={
                  lang === "kor"
                    ? `${i + 1}${T.home.heroNth.kor}`
                    : `${T.home.heroNth.eng} ${i + 1}`
                }
                aria-current={i === at ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
