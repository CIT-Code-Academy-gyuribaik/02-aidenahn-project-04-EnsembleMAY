"use client";

/* 손가락으로 쓸어 넘기기. 좁은 화면에는 화살표 단추를 두지 않으므로(style.css 의
   .hero__arw), 사진을 넘기는 길은 이것뿐입니다.
   마우스는 받지 않습니다 — 끌어서 글자를 고르는 평범한 동작을 넘김으로 오해합니다. */

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

/* 이보다 짧게 스친 것은 넘김으로 치지 않습니다. */
const MIN = 44;

/* 가로로 간 거리가 세로보다 이만큼은 커야 넘김입니다 — 비스듬히 스크롤하다
   말고 사진이 넘어가 버리는 일을 막습니다. */
const SLOPE = 1.2;

/* 오래 누르고 있다 뗀 것은 넘김이 아닙니다(사진을 눌러 보고 있었을 뿐). */
const HOLD = 800;

export type SwipeOpts = {
  onLeft?: () => void;
  onRight?: () => void;
  onDown?: () => void;
};

type Start = { x: number; y: number; id: number; at: number };

function begin(e: { pointerType: string; clientX: number; clientY: number; pointerId: number }) {
  if (e.pointerType === "mouse") return null;
  return { x: e.clientX, y: e.clientY, id: e.pointerId, at: performance.now() };
}

function end(
  s: Start | null,
  e: { clientX: number; clientY: number; pointerId: number },
  o: SwipeOpts
) {
  if (!s || s.id !== e.pointerId) return;
  if (performance.now() - s.at > HOLD) return;

  const dx = e.clientX - s.x;
  const dy = e.clientY - s.y;

  if (Math.abs(dx) >= MIN && Math.abs(dx) > Math.abs(dy) * SLOPE) {
    (dx < 0 ? o.onLeft : o.onRight)?.();
    return;
  }

  if (o.onDown && dy >= MIN * 1.6 && Math.abs(dy) > Math.abs(dx) * SLOPE) o.onDown();
}

/* JSX 에 그대로 펼쳐 넣는 쪽. */
export function useSwipe(opts: SwipeOpts) {
  const from = useRef<Start | null>(null);

  return {
    onPointerDown: (e: ReactPointerEvent) => {
      from.current = begin(e);
    },
    onPointerUp: (e: ReactPointerEvent) => {
      const s = from.current;
      from.current = null;
      end(s, e, opts);
    },
    onPointerCancel: () => {
      from.current = null;
    },
  };
}

/* 손짓을 받을 자리가 이미 다른 칸들로 덮여 있을 때(첫 화면의 장막·글상자) 쓰는 쪽 —
   맨 바깥 칸에 직접 매답니다. 돌려받은 함수를 부르면 떼어냅니다. */
export function attachSwipe(el: HTMLElement, opts: SwipeOpts) {
  let from: Start | null = null;

  const down = (e: PointerEvent) => {
    from = begin(e);
  };
  const up = (e: PointerEvent) => {
    const s = from;
    from = null;
    end(s, e, opts);
  };
  const cancel = () => {
    from = null;
  };

  el.addEventListener("pointerdown", down, { passive: true });
  el.addEventListener("pointerup", up, { passive: true });
  el.addEventListener("pointercancel", cancel, { passive: true });

  return () => {
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", cancel);
  };
}
