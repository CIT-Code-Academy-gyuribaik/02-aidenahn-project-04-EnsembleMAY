"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO, HERO_MS } from "@/lib/content";
import { useLang } from "@/lib/lang";
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
            {HERO.map((src, i) => (
              <button
                key={src}
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
