"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
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

  const step = useCallback(
    (d: number) => setAt((at + d + items.length) % items.length),
    [at, items.length, setAt]
  );

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    document.body.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (many && e.key === "ArrowLeft") step(-1);
      else if (many && e.key === "ArrowRight") step(1);
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
      className="lb is-open"
      role="dialog"
      aria-modal="true"
      aria-label={T.gallery.lightbox[lang]}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
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
        <div>
          {g.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={g.src} alt={g.title} />
          ) : (
            <div
              className="lb__ph"
              style={{
                aspectRatio: String(f),
                width: `min(88vw, calc(78vh * ${f.toFixed(4)}))`,
              }}
            />
          )}
        </div>
        {cap && <figcaption className="lb__cap">{cap}</figcaption>}
      </figure>
    </div>
  );
}
