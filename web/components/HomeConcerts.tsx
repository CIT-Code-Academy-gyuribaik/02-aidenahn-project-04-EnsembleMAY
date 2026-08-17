"use client";

/* ==========================================================================
   홈 — 공연 리스트

   포스터와 지난 공연을 한 칸에 같이 놓습니다. 스냅 스크롤이라 한 화면에
   담겨야 해서, 전부 늘어놓지 않고 최근 것만 보여 주고 Concert 로 보냅니다.

   포스터는 눌러서 크게 볼 수 있고, 공연 카드는 그 공연 사진첩으로
   이어집니다 — Concert 페이지와 같은 동작입니다.
   ========================================================================== */

import Link from "next/link";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, photosOf } from "@/lib/content";
import { postersToLbItems, showAlbum, showsByDate } from "@/lib/photos";

/** 지난 공연은 최근 몇 개까지 보여 줄지. 나머지는 Concert 에 있습니다. */
const SHOW_LIMIT = 3;

/* 최근 것만 보여 주고 나머지는 Concert 로 보냅니다. */
const recent = showsByDate().slice(0, SHOW_LIMIT);
const { items: showPix, startOf } = showAlbum(recent);
const posterItems = postersToLbItems(POSTERS);

export default function HomeConcerts() {
  const lb = useLightbox();

  return (
    <>
      <div className="hcon">
        {/* 포스터 — 정기 연주회 */}
        <div className="hcon__posters">
          {POSTERS.map((p, i) => (
            <a
              key={p.src || p.title}
              className="poster"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                lb.open(posterItems, i);
              }}
            >
              {p.src ? (
                <span className="poster__ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={`${p.title} 포스터`} loading="lazy" />
                  <span className="poster__ov">
                    <span>크게 보기</span>
                  </span>
                </span>
              ) : (
                <span className="poster__ph poster__ph--empty" aria-hidden="true" />
              )}
              <span className="poster__t">{p.title}</span>
              <span className="poster__m">{p.caption}</span>
            </a>
          ))}
        </div>

        {/* 공연 실황 — 최근 것만 */}
        <RevealSeq className="hcon__list" step={60}>
          {recent.map((s) => {
            const pics = photosOf(s.id);
            const start = startOf.get(s.id);
            const inner = (
              <>
                <span className="hcon__d">{s.date}</span>
                <span className="hcon__t">
                  {s.title}
                  {s.note && <em>{s.note}</em>}
                </span>
                {s.venue && <span className="hcon__v">{s.venue}</span>}
                {pics.length > 1 && <span className="hcon__n">{pics.length}장</span>}
              </>
            );
            return pics.length && start !== undefined ? (
              <a
                key={s.id}
                className="hcon__r"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  lb.open(showPix, start);
                }}
              >
                {inner}
              </a>
            ) : (
              <div className="hcon__r" key={s.id}>
                {inner}
              </div>
            );
          })}
        </RevealSeq>
      </div>

      <Link className="more" href="/concert/">
        공연 더보기
      </Link>

      <Lightbox {...lb.props} />
    </>
  );
}
