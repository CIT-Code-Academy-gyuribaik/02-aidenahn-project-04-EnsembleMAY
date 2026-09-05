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
import { showAlbum } from "@/lib/photos";

const { items: showPix, startOf } = showAlbum(SHOWS);

/** 정기 연주회는 현장 사진 대신 포스터를 겁니다.
    값은 posters.json 의 몇 번째인지입니다 — 홈의 공연 넉 장(HomeConcerts)과
    같은 짝을 씁니다. 한쪽만 바꾸면 같은 공연이 두 얼굴을 갖게 됩니다. */
const POSTER_OF: Record<string, number> = { concert2: 0, concert1: 1 };

export function PastShows() {
  const lb = useLightbox();

  return (
    <>
      {/* 한 줄에 [사진 | 공연 정보] 로 일곱 줄입니다.

          ★ 벤토(크기가 제각각인 상자들)에서 이 표로 바꿨습니다. 벤토는
            넓은 칸과 좁은 칸이 섞여 있어 사진 크기가 공연의 무게처럼
            읽혔습니다 — 연혁은 무엇이 더 큰 공연인지가 아니라 언제 무엇을
            했는지를 보는 자리입니다. 칸을 모두 같게 두면 눈이 날짜를
            따라 아래로만 내려갑니다.

          ★ 사진 비율 3/4 는 홈의 공연 넉 장(.ccd__ph)과 포스터(.poster__ph)가
            쓰는 값입니다. 정기 연주회 자리에 포스터가 그대로 들어가야 해서
            포스터 비율을 기준으로 잡았습니다. */}
      <RevealSeq className="hist" step={70}>
        {SHOWS.map((s) => {
          const pics = photosOf(s.id);
          const start = startOf.get(s.id);
          const poster = POSTER_OF[s.id] !== undefined ? POSTERS[POSTER_OF[s.id]] : undefined;
          const face = poster ?? pics[0];

          const inner = (
            <>
              <span className="hist__ph">
                {face ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={face.src} alt={face.title} loading="lazy" />
                    <span className="hist__ov" />
                    {/* 여러 장이면 장수를 적습니다 — 눌러서 넘길 수 있다는 표시입니다. */}
                    {pics.length > 1 && <span className="hist__n">{pics.length}장</span>}
                  </>
                ) : (
                  /* 사진도 포스터도 없으면 로고 마크를 얹은 버건디 판으로 둡니다.
                     빈 회색 상자를 두면 "빠진 칸"으로 보이고, 줄을 아예 빼면
                     연혁에 구멍이 납니다. */
                  <span className="hist__ph--empty" aria-hidden="true" />
                )}
              </span>

              <span className="hist__b">
                <span className="hist__d">{s.date}</span>
                <span className="hist__t">
                  {s.title}
                  {s.note && <em>{s.note}</em>}
                </span>
                {s.venue && <span className="hist__v">{s.venue}</span>}
              </span>
            </>
          );

          /* 사진이 있으면 눌러서 크게 볼 수 있으니 <a>, 없으면 <div> 입니다.
             포스터를 건 줄도 눌렀을 때 열리는 것은 그날의 사진첩입니다 —
             포스터는 그 공연을 가리키는 얼굴일 뿐입니다. */
          return pics.length && start !== undefined ? (
            <a
              key={s.id}
              className="hist__r"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                lb.open(showPix, start);
              }}
            >
              {inner}
            </a>
          ) : (
            <div key={s.id} className="hist__r">
              {inner}
            </div>
          );
        })}
      </RevealSeq>

      <Lightbox {...lb.props} />
    </>
  );
}
