"use client";

/* 섹션 단위 스냅 스크롤 — Swiper(MIT) 의 direction:vertical + slidesPerView:1. */

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

const SPEED = 700;
const THRESHOLD_TIME = 600;
/* 칸에 도착한 뒤 휠을 받지 않는 시간. */
const GRACE = 300;
const THRESHOLD_DELTA = 6;
/* 낮은 창에서는 칸 안 내용이 넘치고 Swiper 가 잘라 냅니다. */
const BREAK_H = 580;
/* 상단 내비가 햄버거로 바뀌는 경계(style.css)와 같은 자리. */
const BREAK_W = 901;

/* pointer:fine — 터치 화면에서는 스냅을 걸지 않습니다. 걸면 아래 syncLock 이
   html{overflow:hidden} 으로 문서를 잠그는데, 태블릿처럼 넓고 높은 터치 화면에서는
   손가락이 칸을 넘기지도 못한 채 지면만 굳습니다(1024×768 에서 재현). */
const SNAP_MQ =
  `(min-width:${BREAK_W}px)` +
  ` and (min-height:${BREAK_H + 1}px)` +
  ` and (pointer:fine)` +
  ` and (prefers-reduced-motion:no-preference)`;

export default function SnapScroll({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children).filter(isValidElement);
  const swiperRef = useRef<SwiperClass | null>(null);
  const arrivedAt = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  /* 서버가 그린 HTML 과 어긋나지 않게 켠 채로 시작해, 붙자마자 실제 값으로 맞춥니다. */
  const [snap, setSnap] = useState(true);
  useEffect(() => {
    const q = window.matchMedia(SNAP_MQ);
    const sync = () => setSnap(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  /* 상태가 아니라 그 자리에서 다시 묻습니다 — 상태는 다음 그림에서야 따라오는데
     아래 잠금은 그보다 먼저 한 번 돕니다. */
  const snapOn = useCallback(() => window.matchMedia(SNAP_MQ).matches, []);

  /* 푸터는 스냅 밖, 컨테이너 바로 뒤입니다. 마지막 칸이 아닌데 페이지가 밀리면
     푸터가 아무 칸 밑에나 따라붙어서, 그동안은 문서를 잠가 둡니다. */
  const syncLock = useCallback(() => {
    const sw = swiperRef.current;
    const atLast = !!sw && sw.activeIndex >= sw.slides.length - 1;
    const lock = !!sw && snapOn() && !atLast;
    if (lock && window.scrollY > 0) window.scrollTo(0, 0);
    document.documentElement.style.overflow = lock ? "hidden" : "";
  }, [snapOn]);

  useEffect(() => {
    if (!snap) swiperRef.current = null;
    syncLock();
    window.addEventListener("resize", syncLock);
    return () => {
      window.removeEventListener("resize", syncLock);
      document.documentElement.style.overflow = "";
    };
  }, [snap, syncLock]);

  /* overflow:hidden 은 손을 막지, focus() 나 새로고침 뒤 스크롤 복원까지 막지는
     않습니다. 그렇게 밀린 것은 되돌립니다. */
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

  /* 탭으로 푸터에 초점이 갔을 때만은 되돌리지 않습니다 — 초점이 화면 밖에 남으면
     키보드로만 다니는 분이 지금 어디에 있는지 잃습니다. */
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const sw = swiperRef.current;
      const el = e.target as HTMLElement | null;
      if (!sw || !snapOn() || !el?.closest?.("footer, .cta")) return;
      const last = sw.slides.length - 1;
      if (sw.activeIndex < last) sw.slideTo(last, 0);
      el.scrollIntoView({ block: "nearest" });
    };
    window.addEventListener("focusin", onFocusIn);
    return () => window.removeEventListener("focusin", onFocusIn);
  }, [snapOn]);

  /* 마지막 칸에서 푸터로 손을 놓는 시점을 직접 정합니다. Swiper 의 releaseOnEdges
     로는 안 됩니다 — 페이지가 이미 밀려 있어도 휠을 계속 가로채서, 푸터가 떠 있는
     채로 뒤에서 칸만 바뀝니다. 전환 중에는 아예 삼킵니다(Swiper 가 전환 시작과
     동시에 activeIndex 를 올려 "마지막 칸"으로 읽히기 때문). */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const sw = swiperRef.current;
      if (!sw || !sw.enabled) return;

      const settling = sw.animating || performance.now() - arrivedAt.current < GRACE;
      if (settling) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        return;
      }

      const atLast = sw.activeIndex >= sw.slides.length - 1;
      const handOff = window.scrollY > 0 || (atLast && e.deltaY > 0);
      /* Swiper 만 막습니다. preventDefault 는 하지 않으므로 브라우저가 평범하게 스크롤합니다. */
      if (handOff) e.stopPropagation();
    };
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

  /* 재워 두기만 하면 껍데기가 남습니다 — 칸마다 인라인 height 가 박히고 컨테이너에
     overflow:hidden 이 걸려, snap.css 가 !important 로 되돌려야 했습니다. */
  if (!snap) return <>{children}</>;

  return (
    <>
      <Swiper
        className="snap"
        modules={[Mousewheel, Keyboard]}
        direction="vertical"
        slidesPerView={1}
        speed={SPEED}
        mousewheel={{
          forceToAxis: true,
          thresholdDelta: THRESHOLD_DELTA,
          thresholdTime: THRESHOLD_TIME,
          releaseOnEdges: false,
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        allowTouchMove={false}
        enabled={false}
        breakpoints={{ [BREAK_W]: { enabled: true } }}
        onSwiper={(sw: SwiperClass) => {
          swiperRef.current = sw;
          syncLock();
        }}
        onSlideChange={(sw) => {
          syncLock();
          setActiveIdx(sw.activeIndex);
        }}
        onSlideChangeTransitionEnd={() => {
          arrivedAt.current = performance.now();
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{slide}</SwiperSlide>
        ))}
      </Swiper>

      {slides.length > 1 && (
        <nav className="snap-dots" aria-label="섹션 이동 / Jump to section">
          {slides.map((_, i) => (
            <button
              key={i}
              className={"snap-dot" + (i === activeIdx ? " snap-dot--on" : "")}
              aria-label={`섹션 ${i + 1}`}
              aria-current={i === activeIdx ? "true" : undefined}
              onClick={() => swiperRef.current?.slideTo(i)}
            />
          ))}
        </nav>
      )}
    </>
  );
}
