"use client";

/* ==========================================================================
   홈 상단 바 — 세 번째 칸부터 흰 바탕

   1 히어로 · 2 영상   → 사진과 어두운 지면. 바탕 없이 흰 글자.
   3 단원 · 4 갤러리 · 5 CTA+푸터 → 흰 바탕에 먹색 글자.

   style.css 의 .hdr.is-solid 를 붙였다 뗍니다. 바뀌는 것 자체는 CSS 의
   transition 이 380ms 에 걸쳐 녹입니다 — 여기서는 언제 바꿀지만 정합니다.

   기준선을 상단 바 바로 아래(--hdr 높이)에 두고, 그 선에 어떤 칸이
   걸쳐 있는지 봅니다. 스크롤 방향을 따질 필요가 없어집니다 —
   "지금 상단 바 밑에 무엇이 있는가" 하나만 보면 되기 때문입니다.
   ========================================================================== */

import { useEffect } from "react";

/** 몇 번째 칸부터 흰 바탕인지. 0 부터 세므로 2 = 세 번째. */
const SOLID_FROM = 2;

export default function HeaderTone() {
  useEffect(() => {
    const hdr = document.querySelector<HTMLElement>(".hdr");
    if (!hdr) return;

    /* 스냅이 꺼진 폭(모바일)에서는 예전처럼 뒤 배경 명암만 따라갑니다. */
    const wide = window.matchMedia("(min-width: 901px)");

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("#main > .hero, #main > .sec, #main > .cta")
    );
    if (!sections.length) return;

    let raf = 0;
    const paint = () => {
      raf = 0;
      if (!wide.matches) {
        hdr.classList.remove("is-solid");
        return;
      }
      /* 상단 바 아래 조금 지난 곳을 잽니다. 경계에 딱 걸치면 스크롤할 때
         두 칸 사이에서 색이 깜빡입니다. */
      const y = hdr.offsetHeight * 0.55;
      let at = 0;
      sections.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) at = i;
      });
      hdr.classList.toggle("is-solid", at >= SOLID_FROM);
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    wide.addEventListener("change", queue);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      wide.removeEventListener("change", queue);
      hdr.classList.remove("is-solid");
    };
  }, []);

  return null;
}
