"use client";

/* ==========================================================================
   섹션 단위 스냅 스크롤 — 직접 구현

   fullPage.js 가 하던 일을 그대로 합니다. 라이브러리도, 라이선스도,
   워터마크도 없습니다.

   ── CSS scroll-snap 과 다른 점 ──────────────────────────────────────────
   scroll-snap 은 브라우저가 알아서 "가까운 칸에 붙이는" 방식이라,
   트랙패드로 세게 튕기면 관성 때문에 두세 칸을 지나쳐 버립니다.
   여기서는 휠 이벤트를 우리가 받아서 한 번에 한 칸만 갑니다.
   전환 곡선과 시간도 우리가 정합니다(브라우저는 못 정하게 합니다).

   ── fullPage.js 와 다른 점 ─────────────────────────────────────────────
   fullPage 는 container 를 transform 으로 밀어 올립니다. 여기서는 그냥
   창을 스크롤합니다(window.scrollTo). 그래서
     · 스크롤바가 살아 있습니다
     · 칸 안 내용이 화면보다 길어져도 잘리지 않습니다 — 아래에서
       "긴 칸은 안에서 먼저 훑는다" 로 처리합니다
     · 앵커·초점 이동이 브라우저 기본 동작 그대로입니다

   ── 언제 꺼지나 ────────────────────────────────────────────────────────
   좁은 창(900px 이하) · 낮은 창(700px 이하) · 동작 줄이기 설정.
   꺼지면 <html> 에서 snap-on 이 떨어지고 평범한 스크롤이 됩니다.
   ========================================================================== */

import { useCallback, useEffect, useRef, type ReactNode } from "react";

/** 칸이 넘어가는 데 걸리는 시간 */
const SPEED = 700;

/** style.css 의 @keyframes rise 와 같은 곡선. 칸이 올라오는 결과
    그 안의 글이 떠오르는 결이 어긋나지 않습니다. */
const EASE = [0.22, 0.61, 0.36, 1] as const;

/** 이 시간만큼 휠이 잠잠해져야 다음 칸으로 갑니다.
    트랙패드 관성은 한 번 튕기면 이벤트가 수백 ms 동안 이어집니다.
    그걸 다음 제스처로 세면 한 번에 서너 칸이 넘어갑니다. */
const QUIET = 220;

/** 이보다 약한 휠은 무시합니다 — 손가락이 스친 정도로 칸이 넘어가지 않게. */
const MIN_DELTA = 4;

/** 이 안에서 굴린 휠은 칸을 넘기지 않습니다 (사진 크게 보기 · 팝업 · 서랍) */
const NORMAL_SCROLL = ".lb, .mdl, .menu";

const BREAK_W = 900;
const BREAK_H = 700;

/* 3차 베지어 곡선을 t(0~1) → 진행률(0~1) 로 바꿉니다.
   CSS 의 cubic-bezier 와 같은 계산을 자바스크립트에서 합니다. */
function bezier([x1, y1, x2, y2]: readonly [number, number, number, number]) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const xAt = (t: number) => ((ax * t + bx) * t + cx) * t;
  const yAt = (t: number) => ((ay * t + by) * t + cy) * t;
  const dxAt = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (x: number) => {
    /* 뉴턴-랩슨으로 x 에 해당하는 t 를 찾습니다. 여덟 번이면 충분합니다. */
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = xAt(t) - x;
      if (Math.abs(err) < 1e-4) break;
      const d = dxAt(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return yAt(t);
  };
}

const ease = bezier(EASE);

export default function SnapScroll({
  children,
  solidFrom,
}: {
  children: ReactNode;
  /**
   * 몇 번째 칸부터 상단 바를 흰 바탕으로 할지. 0 부터 셉니다.
   *   0 히어로 · 1 영상   → 사진과 어두운 지면. 바탕 없이 흰 글자.
   *   2 단원 · 3 갤러리 · 4 CTA+푸터 → 흰 바탕에 먹색 글자.
   * 넘기지 않으면 상단 바를 건드리지 않습니다.
   */
  solidFrom?: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const at = useRef(0);
  const busy = useRef(false);
  const quiet = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settling = useRef(false);
  const hdrRef = useRef<HTMLElement | null>(null);

  /* 상단 바 색. 바뀌는 것 자체는 style.css 의 transition 이 380ms 에
     걸쳐 녹입니다 — 여기서는 언제 바꿀지만 정합니다.

     바꾸기 좋은 순간이 방향에 따라 정반대입니다.
       위로 갈 때  — 올라오는 칸이 화면 위에서 내려옵니다. 상단 바 자리를
                    곧바로 덮으므로 전환이 시작할 때 바꿉니다.
       아래로 갈 때 — 올라오는 칸이 화면 아래에서 올라옵니다. 상단 바
                    자리에 닿는 것은 맨 마지막이라 전환이 끝난 뒤에
                    바꿉니다(dir 0 = 끝난 시점).
     한쪽으로 통일하면 반대 방향에서 어긋납니다 — 어두운 칸 위에 먹색
     글자가, 또는 밝은 칸 위에 흰 글자가 놓입니다. */
  /* useRef 는 처음 값만 붙듭니다. solidFrom 이 바뀌어도 따라가도록
     따로 담아 두고 그것을 읽습니다. */
  const solidRef = useRef(solidFrom);
  solidRef.current = solidFrom;

  const onIndexRef = useRef((index: number, dir: 1 | -1 | 0) => {
    const from = solidRef.current;
    if (from === undefined) return;
    if (dir === 1) return; /* 아래로 가는 중 — 도착한 뒤에 바꿉니다 */
    if (!hdrRef.current) hdrRef.current = document.querySelector(".hdr");
    hdrRef.current?.classList.toggle("is-solid", index >= from);
  });

  /** 칸들의 문서상 위치 */
  const tops = useCallback(() => {
    const box = boxRef.current;
    if (!box) return [];
    return Array.from(box.children).map((el) => (el as HTMLElement).offsetTop);
  }, []);

  /** 한 칸으로 부드럽게 이동 */
  const glide = useCallback(
    (to: number, dir: 1 | -1 | 0) => {
      const from = window.scrollY;
      const dist = to - from;
      if (Math.abs(dist) < 2) return;

      busy.current = true;
      onIndexRef.current(at.current, dir);

      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / SPEED, 1);
        window.scrollTo(0, Math.round(from + dist * ease(p)));
        if (p < 1) requestAnimationFrame(step);
        else {
          busy.current = false;
          onIndexRef.current(at.current, 0);
        }
      };
      requestAnimationFrame(step);
    },
    []
  );

  /** 한 칸 이동. 긴 칸은 안에서 먼저 훑고 나서 넘어갑니다. */
  const go = useCallback(
    (dir: 1 | -1) => {
      const box = boxRef.current;
      if (!box || busy.current) return;

      const list = tops();
      if (!list.length) return;
      const vh = window.innerHeight;
      const y = window.scrollY;

      /* 지금 칸이 화면보다 길면, 칸을 넘기기 전에 그 안을 먼저 봅니다.
         fullPage 는 여기서 내용을 잘라 버렸는데, 그러면 아래쪽을
         영영 못 봅니다. */
      const cur = at.current;
      const el = box.children[cur] as HTMLElement | undefined;
      if (el) {
        const top = list[cur];
        const bottom = top + el.offsetHeight;
        if (dir === 1 && bottom > y + vh + 2) {
          glide(Math.min(y + vh, bottom - vh), 1);
          return;
        }
        if (dir === -1 && y > top + 2) {
          glide(Math.max(y - vh, top), -1);
          return;
        }
      }

      const next = cur + dir;
      if (next < 0 || next >= list.length) return;
      at.current = next;
      glide(list[next], dir);
    },
    [glide, tops]
  );

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const wide = window.matchMedia(`(min-width:${BREAK_W + 1}px) and (min-height:${BREAK_H}px)`);
    const calm = window.matchMedia("(prefers-reduced-motion:reduce)");
    const on = () => wide.matches && !calm.matches;

    /* 켜졌는지 CSS 에 알려 줍니다. app/(home)/snap.css 의 규칙이 전부
       html.snap-on 아래 있어서, 꺼지면 덧칠도 같이 사라집니다. */
    const sync = () => {
      document.documentElement.classList.toggle("snap-on", on());
      if (!on()) {
        document.documentElement.classList.remove("snap-on");
        onIndexRef.current(0, 0);
      } else {
        nearest();
      }
    };

    /** 스크롤바를 직접 끌었을 때 등, 지금 어느 칸인지 다시 셉니다. */
    const nearest = () => {
      const list = tops();
      if (!list.length) return;
      const y = window.scrollY;
      let best = 0;
      list.forEach((t, i) => {
        if (t <= y + window.innerHeight * 0.5) best = i;
      });
      at.current = best;
      onIndexRef.current(best, 0);
    };

    const inNormal = (t: EventTarget | null) =>
      t instanceof Element && t.closest(NORMAL_SCROLL) !== null;

    const onWheel = (e: WheelEvent) => {
      if (!on() || inNormal(e.target)) return;
      e.preventDefault();

      /* 휠이 잠잠해질 때까지 계속 미룹니다. 관성 꼬리가 끝나야
         다음 제스처로 인정합니다. */
      if (quiet.current) clearTimeout(quiet.current);
      quiet.current = setTimeout(() => {
        settling.current = false;
      }, QUIET);

      if (busy.current || settling.current) return;
      if (Math.abs(e.deltaY) < MIN_DELTA) return;

      settling.current = true;
      go(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!on() || inNormal(e.target)) return;
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;

      const list = tops();
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        at.current = 0;
        glide(list[0] ?? 0, -1);
      } else if (e.key === "End") {
        e.preventDefault();
        at.current = list.length - 1;
        glide(list[list.length - 1] ?? 0, 1);
      }
    };

    /* 손가락으로 쓸어 넘기기. 900px 이하에서는 꺼지지만, 가로로 돌린
       태블릿은 그보다 넓어서 여기 걸립니다. */
    let y0 = 0;
    const onTouchStart = (e: TouchEvent) => {
      y0 = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!on() || inNormal(e.target)) return;
      if (e.cancelable) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!on() || inNormal(e.target)) return;
      const dy = y0 - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) go(dy > 0 ? 1 : -1);
    };

    sync();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    wide.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    window.addEventListener("resize", sync);

    return () => {
      if (quiet.current) clearTimeout(quiet.current);
      document.documentElement.classList.remove("snap-on");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      wide.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [go, glide, tops]);

  return <div ref={boxRef}>{children}</div>;
}
