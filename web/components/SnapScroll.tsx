"use client";

/* ==========================================================================
   섹션 단위 스냅 스크롤 — Swiper (MIT)

   왜 Swiper 인가
   ─────────────────────────────────────────────────────────────────────────
   "한 페이지 스크롤" 전용 오픈소스는 대부분 2022~2023년에 멈췄습니다
   (react-page-scroller · react-full-page · @ap.cx/react-fullpage).
   지금도 활발히 관리되는 MIT 라이브러리는 Swiper 뿐입니다.
   원래 캐러셀 라이브러리지만 direction:"vertical" + slidesPerView:1 이
   곧 한 페이지 스크롤입니다. fullPage.js 와 달리 라이선스 비용이 없습니다.

   ★ thresholdTime 이 핵심입니다
     직접 만들었을 때 "휠을 여러 번 굴려야 넘어가는" 문제가 났습니다.
     휠이 잠잠해질 때까지 기다리게 만들었더니, 마우스 휠처럼 이벤트가
     끊임없이 들어오는 입력에서는 영영 잠잠해지지 않았기 때문입니다.
     Swiper 는 "마지막으로 넘긴 뒤 이 시간 안의 휠은 무시" 라는
     시간 기준을 씁니다. 관성 꼬리는 막으면서 연속 휠은 막지 않습니다.
   ========================================================================== */

import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";

/** 칸이 넘어가는 데 걸리는 시간 */
const SPEED = 700;

/** 한 번 넘긴 뒤 이 시간 안에 들어온 휠은 무시합니다.
    트랙패드 관성 꼬리를 막는 값입니다. 전환 시간보다 조금 짧게 두면
    전환이 끝나자마자 다음 휠을 받아 연속 스크롤이 답답하지 않습니다. */
const THRESHOLD_TIME = 550;

/** 창 높이가 이보다 낮으면 스냅을 끕니다. 한 칸이 한 화면이라
    낮은 창에서는 칸 안 내용이 넘치고, Swiper 는 넘친 부분을 잘라 냅니다.
    푸터를 스냅 밖으로 뺀 덕에 기준을 560 까지 낮출 수 있었습니다 —
    예전에는 푸터(390px)까지 한 화면에 넣느라 700 이어야 했습니다. */
const BREAK_H = 580;

/** 이보다 약한 휠은 무시합니다 — 손가락이 스친 정도로 넘어가지 않게. */
const THRESHOLD_DELTA = 6;

export default function SnapScroll({
  children,
  solidFrom,
}: {
  children: ReactNode;
  /**
   * 몇 번째 칸부터 상단 바를 흰 바탕으로 할지. 0 부터 셉니다.
   *   0 히어로 · 1 영상   → 사진과 어두운 지면. 바탕 없이 흰 글자.
   *   2 단원 · 3 갤러리 · 4 CTA+푸터 → 흰 바탕에 먹색 글자.
   */
  solidFrom?: number;
}) {
  const slides = Children.toArray(children).filter(isValidElement);
  const hdrRef = useRef<HTMLElement | null>(null);

  /* 스냅을 끄는 두 가지 경우.

       calm  동작 줄이기 설정. 스크롤이 손을 떠나 저절로 움직이는 것은
             어지럼증이 있는 분에게 부담이 큽니다.

       short 창이 낮을 때. 한 칸이 한 화면이라, 화면이 낮으면 칸 안
             내용이 넘칩니다. Swiper 는 넘친 부분을 잘라 버려서 영영
             못 보게 됩니다. 그럴 바엔 평범한 스크롤이 낫습니다.
             ★ Swiper 의 breakpoints 는 너비만 봅니다. 높이는 여기서
               직접 재야 합니다 — 이걸 빠뜨려서 낮은 창에서 잘렸습니다.

     처음 그릴 때는 둘 다 false 로 두어 서버가 만든 HTML 과 어긋나지
     않게 합니다. 붙자마자 실제 값으로 맞춥니다. */
  const [calm, setCalm] = useState(false);
  const [short, setShort] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion:reduce)");
    const height = window.matchMedia(`(max-height:${BREAK_H}px)`);
    const sync = () => {
      setCalm(motion.matches);
      setShort(height.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    height.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      height.removeEventListener("change", sync);
    };
  }, []);

  const off = calm || short;

  /* 상단 바 색. 바뀌는 것 자체는 style.css 의 transition 이 380ms 에
     걸쳐 녹입니다 — 여기서는 언제 바꿀지만 정합니다.

     바꾸기 좋은 순간이 방향에 따라 정반대입니다.
       위로 갈 때  — 올라오는 칸이 화면 위에서 내려옵니다. 상단 바 자리를
                    곧바로 덮으므로 전환이 시작할 때 바꿉니다.
       아래로 갈 때 — 올라오는 칸이 화면 아래에서 올라옵니다. 상단 바
                    자리에 닿는 것은 맨 마지막이라 전환이 끝난 뒤에.
     한쪽으로 통일하면 반대 방향에서 어긋납니다 — 어두운 칸 위에 먹색
     글자가, 또는 밝은 칸 위에 흰 글자가 놓입니다. */
  const paint = (index: number) => {
    if (solidFrom === undefined) return;
    if (!hdrRef.current) hdrRef.current = document.querySelector(".hdr");
    hdrRef.current?.classList.toggle("is-solid", index >= solidFrom);
  };

  useEffect(() => {
    return () => {
      document.querySelector(".hdr")?.classList.remove("is-solid");
    };
  }, []);

  return (
    <Swiper
      className={"snap" + (off ? " snap--off" : "")}
      modules={[Mousewheel, Keyboard]}
      direction="vertical"
      slidesPerView={1}
      speed={SPEED}
      /* 손가락으로 쓸어 넘기기. 좁은 화면에서는 아래 breakpoints 로
         Swiper 자체가 꺼지므로 평범한 스크롤이 됩니다. */
      mousewheel={{
        forceToAxis: true,
        thresholdDelta: THRESHOLD_DELTA,
        thresholdTime: THRESHOLD_TIME,
        /* 끝에서 놓아주지 않습니다. 놓아주면 그 뒤로는 아무 위치에나
           멈춰서, 제목이 상단 바에 잘리고 사진이 중간에서 끊깁니다.
           홈은 푸터까지 전부 칸입니다 — 이음매를 만들지 않습니다. */
        releaseOnEdges: false,
      }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      /* 기본은 꺼진 상태입니다 — 좁은 화면이 기본값이라야 모바일에서
         평범한 스크롤로 시작합니다. 901px 이상에서만 켭니다.
         style.css 가 상단 내비를 감추고 햄버거로 바꾸는 경계와 같은
         자리라, "메뉴는 모바일인데 스크롤은 데스크톱"인 구간이 없습니다. */
      enabled={false}
      breakpoints={{ 901: { enabled: !off } }}
      onSlideChange={(s: SwiperClass) => {
        /* 위로 갈 때만 미리 바꿉니다 */
        if (s.activeIndex < s.previousIndex) paint(s.activeIndex);
      }}
      onSlideChangeTransitionEnd={(s: SwiperClass) => paint(s.activeIndex)}
      onBreakpoint={(s: SwiperClass) => {
        if (!s.enabled) hdrRef.current?.classList.remove("is-solid");
      }}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
