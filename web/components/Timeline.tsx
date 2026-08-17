"use client";

/* ==========================================================================
   주요 연혁 — 세로 흐름 + 사진

   공연마다 대표 사진 한 장을 답니다. 사진은 GALLERY 에서 그 공연을
   가리키는(show) 것 중 맨 앞을 씁니다 — 따로 고르지 않아도 되고,
   사진 목록 순서를 바꾸면 여기도 같이 바뀝니다.

   사진을 누르면 그 공연 사진첩이 열리고, 계속 넘기면 다음 공연으로
   이어집니다. Concert 페이지의 지난 공연 카드와 같은 동작입니다.
   ========================================================================== */

import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { photosOf } from "@/lib/content";
import { showAlbum, showsByDate } from "@/lib/photos";

const rows = showsByDate();
const { items: pix, startOf } = showAlbum(rows);

export default function Timeline() {
  const lb = useLightbox();

  return (
    <>
      <RevealSeq className="tl" step={60}>
        {rows.map((s) => {
          const pics = photosOf(s.id);
          const start = startOf.get(s.id);
          const face = pics[0];

          return (
            <div className="tl__r" key={s.id}>
              <div className="tl__t-box">
                <p className="tl__d">{s.date}</p>
                <p className="tl__t">
                  {s.title}
                  {s.note && <em>{s.note}</em>}
                </p>
                {s.venue && <p className="tl__v">{s.venue}</p>}
              </div>

              {face && start !== undefined ? (
                <a
                  className="tl__ph"
                  href="#"
                  aria-label={`${s.title} 사진 ${pics.length}장 크게 보기`}
                  onClick={(e) => {
                    e.preventDefault();
                    lb.open(pix, start);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={face.src} alt={face.title} loading="lazy" />
                  {pics.length > 1 && <span className="tl__n">{pics.length}장</span>}
                </a>
              ) : (
                /* 사진이 아직 없는 공연. 빈 회색 칸을 두면 "빠진 자리" 로
                   보여서, 로고 마크를 얹은 버건디 판으로 둡니다. */
                <span className="tl__ph tl__ph--empty" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </RevealSeq>

      <Lightbox {...lb.props} />
    </>
  );
}
