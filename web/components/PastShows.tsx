"use client";

import { useMemo } from "react";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, SHOWS, photosOf } from "@/lib/content";
import { showAlbum } from "@/lib/photos";
import { srcSetOf, widthOf } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { pickText } from "@/lib/i18n";

const POSTER_OF: Record<string, number> = { concert2: 0, concert1: 1 };

export function PastShows() {
  const lb = useLightbox();
  const { lang } = useLang();

  const { items: showPix, startOf } = useMemo(() => showAlbum(SHOWS, lang), [lang]);

  return (
    <>

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
                      srcSet={srcSetOf(face.src, widthOf(face.ratio))}
                      sizes="(max-width:520px) 112px, (max-width:900px) 158px, 240px"
                      alt={pickText(lang, face.title, face.titleEn)}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="hist__ov" />

                  </>
                ) : (
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

          return pics.length && start !== undefined ? (
            /* 사진첩을 펴는 단추입니다 — 주소가 바뀌지 않으므로 링크가 아닙니다. */
            <button
              key={s.id}
              type="button"
              className="hist__r"
              onClick={() => lb.open(showPix, start)}
            >
              {inner}
            </button>
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
