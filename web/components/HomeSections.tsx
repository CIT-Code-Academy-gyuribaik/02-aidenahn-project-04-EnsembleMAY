"use client";

/* ==========================================================================
   홈의 칸들 — 단원 · 활동 사진 미리보기

   목록은 web/content/ 의 members.json · gallery.json 에서 옵니다.
   단원을 늘리거나 사진을 바꿀 때 이 파일은 건드리지 않습니다.
   ========================================================================== */

import Link from "next/link";
import { useMemo } from "react";
import { Lightbox, useLightbox, type LbItem } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { GALLERY, MEMBERS, showById } from "@/lib/content";

/** 단원 사진 8명. 4단이라 두 줄로 딱 떨어집니다. */
export function MemberGrid() {
  return (
    <RevealSeq className="mem mem--4" step={60}>
      {MEMBERS.map((m, i) => (
        <div className="mem__c" key={m.src || i}>
          {m.src ? (
            <span className="mem__ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.name || "앙상블 메이 단원"} loading="lazy" />
            </span>
          ) : (
            <span className="mem__ph" aria-hidden="true" />
          )}
          {m.name && <p className="mem__n">{m.name}</p>}
          {m.part && <p className="mem__p">{m.part}</p>}
        </div>
      ))}
    </RevealSeq>
  );
}

/**
 * 홈의 활동 사진 — 목록 맨 앞 8장을 순서 그대로 씁니다.
 * ★ 정렬하지 않습니다. 가로 사진으로 골라 둔 자리라 순서가 바뀌면
 *   단 높이가 들쭉날쭉해집니다. 정렬은 갤러리 페이지에서만 합니다.
 */
export function GalleryPreview({ count = 8 }: { count?: number }) {
  const lb = useLightbox();
  const photos = useMemo(() => GALLERY.slice(0, count), [count]);

  const items: LbItem[] = useMemo(
    () =>
      photos.map((p) => {
        const s = showById(p.show);
        return {
          src: p.src,
          ratio: p.ratio || "3/2",
          title: p.title,
          caption: s ? [s.title, s.date].filter(Boolean).join(" · ") : "",
        };
      }),
    [photos]
  );

  return (
    <>
      <RevealSeq className="mas" step={40}>
        {photos.map((p, i) => (
          <a
            key={p.src}
            className="mas__i"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              lb.open(items, i);
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

      <Link className="more" href="/gallery/">
        사진 더보기
      </Link>

      <Lightbox {...lb.props} />
    </>
  );
}
