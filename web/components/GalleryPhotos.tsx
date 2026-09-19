"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { GALLERY, photoDate } from "@/lib/content";
import { toLbItems } from "@/lib/photos";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

type Sort = "new" | "old";

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
  const more = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!selRef.current?.contains(e.target as Node)) setSelOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [selOpen]);

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
              aria-haspopup="listbox"
              aria-expanded={selOpen}
              aria-label={T.gallery.sortLabel[lang]}
              onClick={() => setSelOpen((v) => !v)}
            >
              <span>{SORT_LABEL[sort]}</span>
            </button>
            <ul
              className="sel__list"
              role="listbox"
              aria-label={T.gallery.sortLabel[lang]}
              hidden={!selOpen}
            >
              {(["new", "old"] as Sort[]).map((s) => (
                <li
                  key={s}
                  className="sel__o"
                  role="option"
                  aria-selected={sort === s}
                  tabIndex={-1}
                  onClick={() => {
                    setSort(s);

                    setShown(STEP);
                    setSelOpen(false);
                  }}
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
          <a
            key={p.src}
            className="mas__i"
            href="#"
            onClick={(e) => {
              e.preventDefault();

              lb.open(lbItems, i);
            }}
          >
            <span className="mas__ph">

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={pickText(lang, p.title, p.titleEn)}
                loading={i < 8 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i < 4 ? "high" : "auto"}
              />
            </span>
            <span className="mas__ov" />
          </a>
        ))}
      </RevealSeq>

      {shown < photos.length && <div ref={more} aria-hidden="true" />}

      <Lightbox {...lb.props} />
    </>
  );
}
