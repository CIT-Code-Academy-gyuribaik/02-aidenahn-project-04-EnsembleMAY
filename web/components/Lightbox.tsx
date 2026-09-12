"use client";

/* 사진 크게 보기 예전 main.js 의 라이트박스를 옮겼습니다. */

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";

export type LbItem = {
  src?: string;
  /* "3/2" 처럼. 사진이 아직 없을 때 자리 크기를 잡는 데 씁니다. */
  ratio?: string;
  title: string;
  /* 아래에 붙는 설명줄. 공연 이름·날짜 등. */
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
    /* 눌렀던 자리로 초점을 돌려 줍니다 — 키보드로 넘겨 보던 분이 닫은 뒤 목록 맨 위로 튕기지 않게. */
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

  /* 사진이 아직 없는 항목(포스터 자리 등)은 비율을 지키는 빈 판으로 둡니다. */
  const [rw, rh] = String(g.ratio ?? "4/3").split("/");
  const f = (parseFloat(rw) || 4) / (parseFloat(rh) || 3);

  /* 몇 번째 장인지는 남깁니다 — 제목이 아니라 길 안내입니다. */
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
