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

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";

/** 칸이 넘어가는 데 걸리는 시간.
    700 에서 1100 으로 늦췄습니다 — 한 칸이 화면 전체라 이동 거리가
    크고, 빠르면 화면이 통째로 튀는 것처럼 보입니다. 곡선은 snap.css
    의 .swiper-wrapper 에 있습니다(가속·감속을 양쪽에 둔 이징). */
const SPEED = 1100;

/** 한 번 넘긴 뒤 이 시간 안에 들어온 휠은 무시합니다.
    트랙패드 관성 꼬리를 막는 값입니다. 전환 시간보다 조금 짧게 두면
    전환이 끝나자마자 다음 휠을 받아 연속 스크롤이 답답하지 않습니다. */
const THRESHOLD_TIME = 900;

/** 칸에 도착한 뒤 이만큼은 휠을 받지 않습니다. 트랙패드 관성 꼬리가
    도착하자마자 페이지를 끌어내리는 것을 막습니다. */
const GRACE = 300;

/** 창 높이가 이보다 낮으면 스냅을 끕니다. 한 칸이 한 화면이라
    낮은 창에서는 칸 안 내용이 넘치고, Swiper 는 넘친 부분을 잘라 냅니다.
    푸터를 스냅 밖으로 뺀 덕에 기준을 560 까지 낮출 수 있었습니다 —
    예전에는 푸터(390px)까지 한 화면에 넣느라 700 이어야 했습니다. */
const BREAK_H = 580;

/** 이보다 약한 휠은 무시합니다 — 손가락이 스친 정도로 넘어가지 않게. */
const THRESHOLD_DELTA = 6;

/** 이보다 좁으면 스냅을 끕니다. style.css 가 상단 내비를 감추고 햄버거로
    바꾸는 경계와 같은 자리라, "메뉴는 모바일인데 스크롤은 데스크톱"인
    구간이 없습니다. snap.css 의 @media (max-width:900px) 와 짝입니다. */
const BREAK_W = 901;

export default function SnapScroll({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children).filter(isValidElement);
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

  /* ── 마지막 칸이 아니면 페이지를 잠급니다 ──────────────────────────────
     푸터는 스냅 밖, 이 컨테이너 바로 뒤에 놓입니다. 컨테이너가 화면
     높이(100dvh)라 문서는 언제나 "푸터 높이만큼" 더 깁니다 — 지금 몇 번째
     칸을 보고 있든 상관없이 그렇습니다. 1440×900 에서 재어 보면 문서가
     1285px, 화면이 900px 이라 385px 이 늘 남아 있습니다.

     ★ 그래서 휠이 아닌 길로 페이지가 밀리면 푸터가 아무 칸 밑에나
       따라붙습니다. 실제로 밀리는 길이 넷 있었습니다.
         · 스크롤바를 잡아 끌 때          · 터치 화면에서 쓸어내릴 때
         · 새로고침 뒤 스크롤 복원        · 탭으로 푸터 링크에 초점이 갈 때
       한 번 밀리고 나면 아래 [푸터로 넘겨주기] 의 조건(scrollY > 0)이
       계속 참이라 휠이 전부 페이지로 넘어갑니다. "스냅이 안 걸리고 그냥
       스크롤된다" 던 증상의 정체가 이것입니다 — 스냅이 죽은 것이 아니라,
       한 번 밀린 페이지가 스스로 0 으로 돌아오지 못한 것입니다.

     막는 방법은 간단합니다. 마지막 칸이 아닐 때는 문서를 아예 스크롤할
     수 없게 두고, 마지막 칸에 닿으면 풀어 줍니다. 푸터가 올라오는 자리는
     원래 설계대로 마지막 칸 하나뿐이 됩니다.

     style.css 의 html{scrollbar-gutter:stable} 이 짝입니다 — 잠글 때
     스크롤바가 사라지면서 내용이 옆으로 튀는 것을 막습니다. */
  /** 스냅이 지금 실제로 걸려 있는가.

      ★ Swiper 의 sw.enabled 를 보면 안 됩니다. 창 크기가 바뀌는 순간에는
        Swiper 가 아직 breakpoints 를 반영하기 전이라 한 박자 어긋납니다.
        실제로 창을 900px 로 좁혔을 때 스냅은 꺼졌는데 잠금만 남아,
        지면이 통째로 굳었습니다. 켜는 조건을 그대로 다시 봅니다. */
  const snapOn = useCallback(() => !off && window.innerWidth >= BREAK_W, [off]);

  const syncLock = useCallback(() => {
    const sw = swiperRef.current;
    const atLast = !!sw && sw.activeIndex >= sw.slides.length - 1;
    const lock = !!sw && snapOn() && !atLast;
    /* 마지막 칸에서 푸터를 보다가 위 칸으로 올라온 참이면 페이지가 아직
       내려가 있습니다. 그대로 잠그면 푸터가 걸린 채 굳으므로 먼저 올립니다. */
    if (lock && window.scrollY > 0) window.scrollTo(0, 0);
    document.documentElement.style.overflow = lock ? "hidden" : "";
  }, [snapOn]);

  useEffect(() => {
    syncLock();
    /* 창 크기가 바뀌면 Swiper 가 breakpoints 로 켜지고 꺼집니다.
       꺼진 뒤에도 잠금이 남아 있으면 평범한 스크롤까지 막힙니다. */
    window.addEventListener("resize", syncLock);
    return () => {
      window.removeEventListener("resize", syncLock);
      document.documentElement.style.overflow = "";
    };
  }, [off, syncLock]);

  /* 잠갔는데도 페이지가 밀렸다면 사람이 아니라 브라우저가 민 것입니다 —
     overflow:hidden 은 손을 막지, focus() 나 새로고침 뒤 스크롤 복원까지
     막지는 않습니다. 마지막 칸이 아닌데 밀려 있으면 맨 위로 되돌립니다. */
  useEffect(() => {
    const onScroll = () => {
      const sw = swiperRef.current;
      if (!sw || !snapOn() || window.scrollY === 0) return;
      if (sw.activeIndex >= sw.slides.length - 1) return;
      window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [snapOn]);

  /* 탭으로 푸터 링크에 초점이 갔을 때만은 되돌리면 안 됩니다 — 초점이
     화면 밖에 남으면 키보드로만 다니는 분이 지금 어디에 있는지 잃습니다.
     그래서 푸터가 제 칸(마지막 칸) 밑에 오도록 옮겨 놓고 보여 줍니다.

     ★ 이 판단을 scroll 쪽에 두었더니 마지막 칸에서 못 빠져나왔습니다.
       한 번 푸터에 초점이 닿으면 그 뒤로도 계속 "초점이 푸터에 있는"
       상태라, 휠로 위 칸에 올라가려 할 때마다 도로 끌려 내려왔습니다.
       초점이 옮겨 온 그 순간에 한 번만 반응해야 합니다.

     브라우저가 초점을 따라 지면을 먼저 밀어 버리는 경우가 있어(그러면
     위 onScroll 이 0 으로 되돌립니다) 잠금을 푼 뒤 다시 한 번 불러
     세웁니다. */
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const sw = swiperRef.current;
      const el = e.target as HTMLElement | null;
      /* 스냅 칸 뒤에 놓인 것들 — 자선 공연 띠와 푸터입니다.
         한때 footer 만 봤는데, 그 위에 띠가 하나 더 생기면서 탭으로 그리
         옮겨 간 분이 화면 밖에 남았습니다. 이 뒤로 무언가 더 붙으면
         여기에도 한 줄 더해야 합니다. */
      if (!sw || !snapOn() || !el?.closest?.("footer, .cta")) return;
      const last = sw.slides.length - 1;
      if (sw.activeIndex < last) sw.slideTo(last, 0);
      el.scrollIntoView({ block: "nearest" });
    };
    window.addEventListener("focusin", onFocusIn);
    return () => window.removeEventListener("focusin", onFocusIn);
  }, [snapOn]);

  /* 칸이 넘어갈 때 상단 바를 흰 바탕으로 바꾸던 코드가 여기 있었습니다.
     홈의 네 칸이 모두 어두워지면서 — 히어로 사진, 어두운 영상 칸, 무대
     사진, 버건디 배너 — 첫 칸의 흰 글자가 끝까지 그대로 읽힙니다.
     중간에 바꾸면 어두운 지면 위에 밝은 띠가 하나 끼어드는 꼴입니다. */

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
      breakpoints={{ [BREAK_W]: { enabled: !off } }}
      onSwiper={(sw: SwiperClass) => {
        swiperRef.current = sw;
        syncLock();
      }}
      /* 칸이 바뀔 때마다 잠금을 다시 맞춥니다 — 마지막 칸에 닿으면 풀고,
         떠나면 겁니다. slideChange 는 전환이 시작될 때 옵니다. */
      onSlideChange={syncLock}
      onSlideChangeTransitionEnd={() => {
        arrivedAt.current = performance.now();
      }}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
