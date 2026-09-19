"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { GALLERY, photoDate } from "@/lib/content";
import { toLbItems } from "@/lib/photos";
import { srcSetOf, widthOf } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

type Sort = "new" | "old";

const SORTS: readonly Sort[] = ["new", "old"];

const STEP = 24;

export default function GalleryPhotos() {
  const { lang } = useLang();

  const SORT_LABEL: Record<Sort, string> = {
    new: T.gallery.sortNew[lang],
    old: T.gallery.sortOld[lang],
  };
  const [sort, setSort] = useState<Sort>("new");
  const [selOpen, setSelOpen] = useState(false);

  const [shown, setShown] = useState(STEP);
  const lb = useLightbox();
  const selRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const more = useRef<HTMLDivElement>(null);

  const choose = (s: Sort) => {
    setSort(s);

    setShown(STEP);
    setSelOpen(false);
    btnRef.current?.focus();
  };

  useEffect(() => {
    if (!selOpen) return;
    /* pointerdown 이라야 손가락과 마우스를 한 번에 받습니다 — mousedown 은 터치에서
       뒤늦게 흉내 낸 것이라, 그 사이에 다른 것이 먼저 눌립니다. */
    const onDown = (e: PointerEvent) => {
      if (!selRef.current?.contains(e.target as Node)) setSelOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [selOpen]);

  /* 목록을 열면 지금 골라 둔 줄로 초점을 옮깁니다 — 키보드로 오신 분이 곧바로
     위아래 화살표를 쓸 수 있게. */
  useEffect(() => {
    if (!selOpen) return;
    const list = selRef.current?.querySelectorAll<HTMLElement>(".sel__o");
    list?.[SORTS.indexOf(sort)]?.focus();
  }, [selOpen, sort]);

  const onListKey = (e: React.KeyboardEvent<HTMLLIElement>, s: Sort) => {
    const list = [...(selRef.current?.querySelectorAll<HTMLElement>(".sel__o") ?? [])];
    const i = list.indexOf(e.currentTarget);

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(s);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const d = e.key === "ArrowDown" ? 1 : -1;
      list[(i + d + list.length) % list.length]?.focus();
      return;
    }
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      (e.key === "Home" ? list[0] : list[list.length - 1])?.focus();
    }
  };

  const photos = useMemo(() => {
    const dir = sort === "new" ? -1 : 1;
    return [...GALLERY].sort((x, y) => {
      const dx = photoDate(x);
      const dy = photoDate(y);
      if (!dx || !dy) return dx ? -1 : dy ? 1 : 0;
      if (dx !== dy) return dx < dy ? -dir : dir;
      return x.src < y.src ? -dir : x.src > y.src ? dir : 0;
    });
  }, [sort]);

  const lbItems = useMemo(() => toLbItems(photos, lang), [photos, lang]);

  useEffect(() => {
    if (shown >= photos.length) return;
    const el = more.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown((n) => Math.min(n + STEP, photos.length));
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, photos.length]);

  return (
    <>

      <div className="tabbar">
        <div className="sortbar">
          <div className="sel" ref={selRef}>
            <button
              className="sel__b"
              type="button"
              ref={btnRef}
              aria-haspopup="listbox"
              aria-expanded={selOpen}
              aria-label={T.gallery.sortLabel[lang]}
              onClick={() => setSelOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelOpen(true);
                }
              }}
            >
              <span>{SORT_LABEL[sort]}</span>
            </button>
            <ul
              className="sel__list"
              role="listbox"
              aria-label={T.gallery.sortLabel[lang]}
              hidden={!selOpen}
            >
              {SORTS.map((s) => (
                <li
                  key={s}
                  className="sel__o"
                  role="option"
                  aria-selected={sort === s}
                  tabIndex={selOpen ? 0 : -1}
                  onClick={() => choose(s)}
                  onKeyDown={(e) => onListKey(e, s)}
                >
                  {SORT_LABEL[s]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <RevealSeq className="mas" step={40} key={sort}>
        {photos.slice(0, shown).map((p, i) => (
          /* 링크가 아니라 단추입니다 — 다른 쪽으로 가는 것이 아니라 이 자리에서
             사진을 크게 펴는 일이라, 화면 읽어 주는 프로그램에도 그렇게 알립니다. */
          <button
            key={p.src}
            type="button"
            className="mas__i"
            aria-label={`${pickText(lang, p.title, p.titleEn)} — ${T.gallery.lightbox[lang]}`}
            onClick={() => lb.open(lbItems, i)}
          >
            <span className="mas__ph">

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                srcSet={srcSetOf(p.src, widthOf(p.ratio))}
                sizes="(max-width:900px) 50vw, 25vw"
                alt={pickText(lang, p.title, p.titleEn)}
                loading={i < 8 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i < 4 ? "high" : "auto"}
              />
            </span>
            <span className="mas__ov" />
          </button>
        ))}
      </RevealSeq>

      {shown < photos.length && <div ref={more} aria-hidden="true" />}

      <Lightbox {...lb.props} />
    </>
  );
}
