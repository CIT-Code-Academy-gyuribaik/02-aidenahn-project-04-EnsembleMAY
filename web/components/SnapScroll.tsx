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

/** 칸에 도착한 뒤 이만큼은 휠을 받지 않습니다. 트랙패드 관성 꼬리가
    도착하자마자 페이지를 끌어내리는 것을 막습니다. */
const GRACE = 260;

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
  const swiperRef = useRef<SwiperClass | null>(null);
  /** 마지막으로 칸에 도착한 시각. 갓 도착했을 때 관성 꼬리가 페이지를
      끌어내리지 않게 하는 데 씁니다. */
  const arrivedAt = useRef(0);

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

  /* ── 마지막 칸에서 푸터로 넘겨주기 ────────────────────────────────────
     스냅 컨테이너는 화면 높이라, 그 뒤에 놓인 푸터를 보려면 페이지가
     스크롤되어야 합니다. 문제는 "언제 스냅이 손을 놓느냐" 입니다.

     Swiper 의 releaseOnEdges 로는 안 됩니다. 페이지가 이미 밀려 있어도
     휠을 계속 가로채기 때문에, 푸터가 화면 아래 떠 있는 채로 뒤에서
     칸만 바뀝니다. 실제로 그 증상이 났습니다.

     그래서 넘겨주는 시점을 여기서 직접 정합니다. 규칙은 셋입니다.
       · 칸이 넘어가는 중이면          → 아무도 손대지 않습니다
       · 페이지가 이미 밀려 있으면      → 스냅은 손 떼고 페이지가 스크롤
       · 마지막 칸에서 아래로 굴리면    → 스냅은 손 떼고 페이지가 스크롤
     그 밖에는 스냅이 맡습니다.

     ★ 첫 줄이 빠져 있어서 푸터가 3번 칸 밑에 붙어 보였습니다.
       Swiper 는 전환이 시작되는 순간 activeIndex 를 먼저 올립니다.
       그래서 3→4 전환이 아직 흐르는 중인데도 "마지막 칸" 으로 읽혀,
       그때 들어온 휠이 페이지를 밀어 버렸습니다. 전환 중에는 휠을
       아예 삼켜서 스냅도 페이지도 움직이지 않게 합니다.
       전환이 끝난 뒤 GRACE 만큼은 더 기다립니다 — 트랙패드 관성
       꼬리가 도착하자마자 페이지를 끌어내리지 않게 하는 몫입니다.

     window 의 캡처 단계에서 가로채 stopPropagation 하면, 컨테이너에
     걸린 Swiper 의 휠 처리기가 아예 돌지 않습니다. preventDefault 는
     하지 않으므로 브라우저가 평범하게 스크롤합니다.

     되돌아올 때도 자연스럽습니다 — 위로 굴리면 페이지가 0 까지 올라오고,
     그 다음 휠부터 스냅이 다시 맡습니다.                                */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const sw = swiperRef.current;
      if (!sw || !sw.enabled) return;

      /* 칸이 넘어가는 중이거나 막 도착한 참이면 아무도 손대지 않습니다 */
      const settling = sw.animating || performance.now() - arrivedAt.current < GRACE;
      if (settling) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        return;
      }

      const atLast = sw.activeIndex >= sw.slides.length - 1;
      const handOff = window.scrollY > 0 || (atLast && e.deltaY > 0);
      /* 넘겨줄 때는 Swiper 만 막습니다. preventDefault 는 하지 않으므로
         브라우저가 평범하게 스크롤합니다. */
      if (handOff) e.stopPropagation();
    };
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
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
        /* Swiper 의 자동 넘김은 끕니다. 언제 손을 놓을지는 위
           [마지막 칸에서 푸터로 넘겨주기] 에서 직접 정합니다.
           releaseOnEdges 를 켜면 페이지가 이미 밀려 있어도 휠을 계속
           가로채서, 푸터가 떠 있는 채로 칸만 바뀝니다. */
        releaseOnEdges: false,
      }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      /* 기본은 꺼진 상태입니다 — 좁은 화면이 기본값이라야 모바일에서
         평범한 스크롤로 시작합니다. 901px 이상에서만 켭니다.
         style.css 가 상단 내비를 감추고 햄버거로 바꾸는 경계와 같은
         자리라, "메뉴는 모바일인데 스크롤은 데스크톱"인 구간이 없습니다. */
      enabled={false}
      breakpoints={{ 901: { enabled: !off } }}
      onSwiper={(sw: SwiperClass) => {
        swiperRef.current = sw;
      }}
      onSlideChange={(s: SwiperClass) => {
        /* 위로 갈 때만 미리 바꿉니다 */
        if (s.activeIndex < s.previousIndex) paint(s.activeIndex);
      }}
      onSlideChangeTransitionEnd={(s: SwiperClass) => {
        arrivedAt.current = performance.now();
        paint(s.activeIndex);
      }}
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
