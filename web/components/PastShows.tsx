"use client";

/* ==========================================================================
   지난 공연 + 포스터

   둘 다 눌러서 크게 볼 수 있어야 해서 한 파일에 뒀습니다 — 라이트박스
   하나를 나눠 씁니다.

   ★ 공연 카드의 대표 사진은 GALLERY 에서 옵니다.
     사진의 show 값이 공연의 id 를 가리키는 그 연결 하나가
       · 카드의 대표 사진
       · 공연별로 넘겨 보기
       · 갤러리 날짜 정렬
     세 가지를 굴립니다. 사진 목록은 GALLERY 한 곳뿐입니다 —
     같은 경로를 두 군데 적어 두면 한쪽만 고치고 잊습니다.
   ========================================================================== */

import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, SHOWS, photosOf } from "@/lib/content";
import { postersToLbItems, showAlbum } from "@/lib/photos";

const { items: showPix, startOf } = showAlbum(SHOWS);
const posterItems = postersToLbItems(POSTERS);

export function PastShows() {
  const lb = useLightbox();

  return (
    <>
      <RevealSeq className="bento" step={70}>
        {SHOWS.map((s) => {
          const pics = photosOf(s.id);
          const start = startOf.get(s.id);
          const cls = "bento__c" + (s.wide ? " bento__c--w" : "");

          const face =
            pics.length && start !== undefined ? (
              <span className="bento__ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pics[0].src} alt={pics[0].title} loading="lazy" />
                <span className="bento__ov" />
                {/* 여러 장이면 장수를 적습니다 — 눌러서 넘길 수 있다는 표시입니다. */}
                {pics.length > 1 && <span className="bento__n">{pics.length}장</span>}
              </span>
            ) : (
              /* 사진이 아직 없으면 로고 마크를 얹은 버건디 판으로 둡니다.
                 빈 회색 상자를 두면 "빠진 칸"으로 보이고, 칸을 아예 빼면
                 연혁에 구멍이 납니다. */
              <span className="bento__ph bento__ph--empty" aria-hidden="true" />
            );

          const inner = (
            <>
              {face}
              <span className="bento__d">{s.date}</span>
              <span className="bento__t">
                {s.title}
                {s.note && <em>{s.note}</em>}
              </span>
              {s.venue && <span className="bento__v">{s.venue}</span>}
            </>
          );

          /* 사진이 있으면 눌러서 크게 볼 수 있으니 <a>, 없으면 <div> 입니다. */
          return pics.length && start !== undefined ? (
            <a
              key={s.id}
              className={cls}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                lb.open(showPix, start);
              }}
            >
              {inner}
            </a>
          ) : (
            <div key={s.id} className={cls}>
              {inner}
            </div>
          );
        })}
      </RevealSeq>

      <Lightbox {...lb.props} />
    </>
  );
}

export function Posters() {
  const lb = useLightbox();

  return (
    <>
      <div className="posters">
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
              /* 파일이 아직 없을 때. 어디에 무엇을 넣어야 하는지 화면에 적어둡니다. */
              <span className="poster__ph poster__ph--empty">
                <span className="poster__hint">
                  <span>
                    포스터 이미지를 넣어주세요
                    <br />
                    <b>public/assets/img/poster/</b> 에 파일을 두고
                    <br />
                    <b>web/content/posters.json</b> 에 경로를 적습니다
                  </span>
                </span>
              </span>
            )}
            <span className="poster__t">{p.title}</span>
            <span className="poster__m">{p.caption}</span>
          </a>
        ))}
      </div>

      <Lightbox {...lb.props} />
    </>
  );
}
