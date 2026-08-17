"use client";

/* ==========================================================================
   갤러리 — 사진과 영상을 한 화면에서 골라 봅니다

   처음에는 사진입니다. 푸터의 [연주 영상] 링크(/gallery/#videos)로 들어오면
   영상이 먼저 열립니다 — 그 주소가 여러 곳에 들어 있어서 그대로 살렸습니다.

   정렬 단추를 <select> 로 두지 않은 이유(예전 주석 그대로) —
   펼친 목록은 브라우저·운영체제가 직접 그려서 CSS 가 닿지 않습니다.
   윈도우의 파란 선택 막대가 그것입니다. 그래서 단추 + 목록으로 만듭니다.
   ========================================================================== */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import VideoCard from "@/components/VideoCard";
import { GALLERY, VIDEOS, photoDate } from "@/lib/content";
import { toLbItems } from "@/lib/photos";

type Tab = "photos" | "videos";
type Sort = "new" | "old";

const SORT_LABEL: Record<Sort, string> = { new: "최신순", old: "과거순" };

export default function GalleryBrowser() {
  const [tab, setTab] = useState<Tab>("photos");
  const [sort, setSort] = useState<Sort>("new");
  const [selOpen, setSelOpen] = useState(false);
  const lb = useLightbox();
  const selRef = useRef<HTMLDivElement>(null);

  /* 주소 끝의 #videos 로 들어오면 영상 탭이 먼저 열립니다.

     ★ 패널의 id 를 photos/videos 가 아니라 panel-photos/panel-videos 로
       둔 이유 — 같은 이름을 쓰면 브라우저가 그 자리로 화면을 뛰웁니다.
       그러면 페이지를 열자마자 제목 블록이 위로 밀려 올라가 안 보입니다.
       해시는 "어느 탭을 열지" 신호로만 쓰고, 화면은 맨 위에서 시작합니다. */
  useEffect(() => {
    if (window.location.hash === "#videos") setTab("videos");
  }, []);

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
     날짜를 모르는 사진은 최신순이든 과거순이든 맨 뒤에 둡니다 —
     언제 것인지 모르는 사진을 아무 자리에나 끼워 넣지 않습니다. */
  const photos = useMemo(() => {
    const dir = sort === "new" ? -1 : 1;
    return [...GALLERY].sort((x, y) => {
      const dx = photoDate(x);
      const dy = photoDate(y);
      if (!dx || !dy) return dx ? -1 : dy ? 1 : 0;
      return dx < dy ? -dir : dx > dy ? dir : 0;
    });
  }, [sort]);

  const lbItems = useMemo(() => toLbItems(photos), [photos]);

  return (
    <>
      <div className="tabbar">
        <div className="tabs" role="tablist" aria-label="갤러리 종류">
          {(["photos", "videos"] as Tab[]).map((t) => (
            <button
              key={t}
              className={"tabs__b" + (tab === t ? " is-on" : "")}
              role="tab"
              aria-selected={tab === t}
              aria-controls={"panel-" + t}
              id={`tab-${t}`}
              onClick={() => setTab(t)}
            >
              {t === "photos" ? "사진" : "영상"}
            </button>
          ))}
        </div>

        {/* 사진에만 쓰이므로 영상 탭에서는 숨습니다. */}
        {tab === "photos" && (
          <div className="sortbar">
            <div className="sel" ref={selRef}>
              <button
                className="sel__b"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={selOpen}
                aria-label="사진 정렬"
                onClick={() => setSelOpen((v) => !v)}
              >
                <span>{SORT_LABEL[sort]}</span>
              </button>
              <ul className="sel__list" role="listbox" aria-label="사진 정렬" hidden={!selOpen}>
                {(["new", "old"] as Sort[]).map((s) => (
                  <li
                    key={s}
                    className="sel__o"
                    role="option"
                    aria-selected={sort === s}
                    tabIndex={-1}
                    onClick={() => {
                      setSort(s);
                      setSelOpen(false);
                    }}
                  >
                    {SORT_LABEL[s]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div id="panel-photos" role="tabpanel" aria-labelledby="tab-photos" hidden={tab !== "photos"}>
        {/* 사진이 한 장씩 40ms 간격으로 올라옵니다.
            key 에 sort 를 섞어 두면 정렬을 바꿀 때 다시 흐릅니다. */}
        <RevealSeq className="mas" step={40} key={sort}>
          {photos.map((p, i) => (
            <a
              key={p.src}
              className="mas__i"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                lb.open(lbItems, i);
              }}
            >
              <span className="mas__ph" style={{ aspectRatio: p.ratio }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.title} loading="lazy" />
              </span>
              <span className="mas__ov" />
            </a>
          ))}
        </RevealSeq>
      </div>

      <div id="panel-videos" role="tabpanel" aria-labelledby="tab-videos" hidden={tab !== "videos"}>
        <div className="vids">
          {VIDEOS.map((v) => (
            <VideoCard key={v.mp4 ?? v.id ?? v.title} video={v} />
          ))}
        </div>
        <Link className="more" href="/concert/#repertoire">
          아이들이 연주한 곡 보기
        </Link>
      </div>

      <Lightbox {...lb.props} />
    </>
  );
}
