"use client";

/* 갤러리 — 활동 사진
   ★ GalleryBrowser 를 둘로 나눈 절반입니다. */

import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { GALLERY, photoDate } from "@/lib/content";
import { toLbItems } from "@/lib/photos";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

type Sort = "new" | "old";

/* 한 번에 화면에 붙이는 장수. 4단 기준 6줄입니다. */
const STEP = 24;

export default function GalleryPhotos() {
  const { lang } = useLang();
  /* 정렬 이름도 언어를 따라갑니다 — 예전에는 이 파일 맨 위에 한국어로만 적어 두었습니다. */
  const SORT_LABEL: Record<Sort, string> = {
    new: T.gallery.sortNew[lang],
    old: T.gallery.sortOld[lang],
  };
  const [sort, setSort] = useState<Sort>("new");
  const [selOpen, setSelOpen] = useState(false);
  /* 지금까지 화면에 붙인 장수. 스크롤이 끝에 가까워지면 STEP 만큼 늘립니다. */
  const [shown, setShown] = useState(STEP);
  const lb = useLightbox();
  const selRef = useRef<HTMLDivElement>(null);
  const more = useRef<HTMLDivElement>(null);

  /* 정렬 목록 바깥을 누르면 닫습니다. */
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

  /* 날짜는 "2026.01.15" 꼴이라 글자 그대로 비교해도 시간 순서가 맞습니다.
     ★ 같은 날 사진의 순서를 파일 이름으로 정합니다. */
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

  /* ── 스크롤을 내릴 때 이어서 붙입니다 82장을 한 번에 그리지 않습니다. */
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
      {/* 탭이 하위 메뉴 띠로 올라가면서 이 줄에는 정렬 단추만 남았습니다. */}
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
                    /* 순서가 통째로 바뀌므로 처음 24장부터 다시 셉니다. */
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

      {/* 사진이 한 장씩 40ms 간격으로 올라옵니다. */}
      <RevealSeq className="mas" step={40} key={sort}>
        {photos.slice(0, shown).map((p, i) => (
          <a
            key={p.src}
            className="mas__i"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              /* 라이트박스에는 82장을 그대로 넘깁니다 — 화면에 몇 장을 붙였든 크게 볼 때는 전부 넘겨 볼 수 있어야 합니다. */
              lb.open(lbItems, i);
            }}
          >
            <span className="mas__ph">
              {/* 첫 두 줄(8장)은 열자마자 보이는 자리라 lazy 를 걸지 않습니다 — 화면 안에 있는 사진에 lazy 를 걸면 오히려 한 박자 늦게 뜹니다. */}
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

      {/* 이 자리가 화면에 가까워지면 다음 24장을 붙입니다. */}
      {shown < photos.length && <div ref={more} aria-hidden="true" />}

      <Lightbox {...lb.props} />
    </>
  );
}
