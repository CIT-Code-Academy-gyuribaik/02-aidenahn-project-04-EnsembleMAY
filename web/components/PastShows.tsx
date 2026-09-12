"use client";

/* 지난 공연 + 포스터 둘 다 눌러서 크게 볼 수 있어야 해서 한 파일에 뒀습니다 — 라이트박스 하나를 나눠 씁니다.
   ★ 공연 카드의 대표 사진은 GALLERY 에서 옵니다. */

import { useMemo } from "react";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, SHOWS, photosOf } from "@/lib/content";
import { showAlbum } from "@/lib/photos";
import { useLang } from "@/lib/lang";
import { pickText } from "@/lib/i18n";

/* 정기 연주회는 현장 사진 대신 포스터를 겁니다. 값은 posters.json 의 몇 번째인지입니다 — 홈의 공연 넉 장(HomeConcerts)과 같은
   짝을 씁니다. 한쪽만 바꾸면 같은 공연이 두 얼굴을 갖게 됩니다. */
const POSTER_OF: Record<string, number> = { concert2: 0, concert1: 1 };

export function PastShows() {
  const lb = useLightbox();
  const { lang } = useLang();
  /* 공연별 사진 묶음. */
  const { items: showPix, startOf } = useMemo(() => showAlbum(SHOWS, lang), [lang]);

  return (
    <>
      {/* 한 줄에 [사진 | 공연 정보] 로 일곱 줄입니다.
          ★ 벤토(크기가 제각각인 상자들)에서 이 표로 바꿨습니다. */}
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
                    <img
                      src={face.src}
                      alt={pickText(lang, face.title, face.titleEn)}
                      loading="lazy"
                    />
                    <span className="hist__ov" />
                    {/* 여러 장이면 장수를 적습니다 — 눌러서 넘길 수 있다는 표시입니다. */}

                  </>
                ) : (
                  /* 사진도 포스터도 없으면 로고 마크를 얹은 버건디 판으로 둡니다. */
                  <span className="hist__ph--empty" aria-hidden="true" />
                )}
              </span>

              <span className="hist__b">
                <span className="hist__d">{s.date}</span>
                <span className="hist__t">
                  {pickText(lang, s.title, s.titleEn)}
                  {s.note && <em>{pickText(lang, s.note, s.noteEn)}</em>}
                </span>
                {s.venue && (
                  <span className="hist__v">{pickText(lang, s.venue, s.venueEn)}</span>
                )}
              </span>
            </>
          );

          /* 사진이 있으면 눌러서 크게 볼 수 있으니 <a>, 없으면 <div> 입니다. */
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
