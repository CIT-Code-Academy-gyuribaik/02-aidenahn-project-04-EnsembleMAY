"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { useSwipe } from "@/lib/swipe";
import { T } from "@/lib/i18n";

export type LbItem = {
  src?: string;

  ratio?: string;
  title: string;

  caption?: string;
};

export function useLightbox() {
  const [items, setItems] = useState<LbItem[]>([]);
  const [at, setAt] = useState(0);
  const [showCap, setShowCap] = useState(true);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((list: LbItem[], index: number, withCaption = true) => {
    opener.current = document.activeElement as HTMLElement | null;
    setItems(list);
    setAt(index);
    setShowCap(withCaption);
  }, []);

  const close = useCallback(() => {
    setItems([]);

    opener.current?.focus({ preventScroll: true });
  }, []);

  return {
    open,
    props: { items, at, setAt, showCap, close },
  };
}

export function Lightbox({
  items,
  at,
  setAt,
  showCap,
  close,
}: {
  items: LbItem[];
  at: number;
  setAt: (i: number) => void;
  showCap: boolean;
  close: () => void;
}) {
  const { lang } = useLang();
  const isOpen = items.length > 0;
  const many = items.length > 1;
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const step = useCallback(
    (d: number) => setAt((at + d + items.length) % items.length),
    [at, items.length, setAt]
  );

  /* 좁은 화면에는 화살표가 작게 붙어 있을 뿐이라, 쓸어 넘기기가 주된 길입니다.
     아래로 쓸면 닫힙니다. */
  const swipe = useSwipe({
    onLeft: many ? () => step(1) : undefined,
    onRight: many ? () => step(-1) : undefined,
    onDown: close,
  });

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    document.body.classList.add("menu-open");

    const box = boxRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (many && e.key === "ArrowLeft") {
        step(-1);
        return;
      }
      if (many && e.key === "ArrowRight") {
        step(1);
        return;
      }

      /* 탭이 뒤 페이지로 새지 않게 가둡니다 — 사진은 화면을 다 덮고 있는데
         초점만 보이지 않는 곳으로 가면 키보드로는 빠져나올 길이 없습니다. */
      if (e.key !== "Tab" || !box) return;
      const list = [...box.querySelectorAll<HTMLElement>("button")];
      if (!list.length) return;
      const edge = e.shiftKey ? list[0] : list[list.length - 1];
      if (document.activeElement !== edge) return;
      e.preventDefault();
      (e.shiftKey ? list[list.length - 1] : list[0]).focus();
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, many, step, close]);

  if (!isOpen) return null;

  const g = items[at];

  const [rw, rh] = String(g.ratio ?? "4/3").split("/");
  const f = (parseFloat(rw) || 4) / (parseFloat(rh) || 3);

  const nth = many ? `${at + 1} / ${items.length}` : "";
  const cap = [showCap ? g.caption : "", nth].filter(Boolean).join(" · ");

  return (
    <div
      className={"lb is-open" + (many ? "" : " is-single")}
      ref={boxRef}
      role="dialog"
      aria-modal="true"
      aria-label={T.gallery.lightbox[lang]}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      {...swipe}
    >
      <button ref={closeRef} className="lb__x" aria-label={T.common.close[lang]} onClick={close}>
        &times;
      </button>

      {many && (
        <>
          <button
            className="lb__nav lb__nav--p"
            aria-label={T.gallery.prev[lang]}
            onClick={() => step(-1)}
          >
            &#8249;
          </button>
          <button
            className="lb__nav lb__nav--n"
            aria-label={T.gallery.next[lang]}
            onClick={() => step(1)}
          >
            &#8250;
          </button>
        </>
      )}

      <figure className="lb__fig">
        <div className="lb__stage">
          {g.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={g.src} alt={g.title} />
          ) : (
            <div className="lb__ph" style={{ aspectRatio: String(f) }} />
          )}
        </div>
        {cap && <figcaption className="lb__cap">{cap}</figcaption>}
      </figure>
    </div>
  );
}
