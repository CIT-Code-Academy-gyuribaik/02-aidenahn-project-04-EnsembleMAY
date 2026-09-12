"use client";

/* 홈 — 공연 넉 장 무대 사진을 지면 가득 깔고 그 위에 카드를 세웁니다.
   ★ 카드는 [무엇을 보여 줄지]만 적습니다. 날짜 · 장소 · 제목은 content/shows.json 과 posters.json 에서 꺼내 옵니다.
     여기에 또 적어 두면 공연 정보가 두 곳에 살게 됩니다.
   ★ 영문은 데이터가 들고 있습니다. shows.json 의 titleEn · venueEn, posters.json 의 titleEn 입니다.
     pickText 가 지금 언어에 맞는 것을 꺼내고, 영문이 비어 있으면 한국어가 그대로 나옵니다 — 자세한 것은 lib/content.ts 머리말에. */

import Link from "next/link";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, asset, showById } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

type Card = {
  show: string;
  /* 포스터로 걸 때 — content/posters.json 의 몇 번째인지 */
  poster?: number;
  /* 포스터가 없는 공연은 그날 사진으로 겁니다 */
  src?: string;
  pos?: string;
};

const CARDS: readonly Card[] = [
  { show: "concert2", poster: 0 },
  { show: "concert1", poster: 1 },
  { show: "library2512", src: "assets/img/gallery/20251213-library-03.webp", pos: "37%" },
  { show: "mekorea", src: "assets/img/gallery/20260525-mekorea-01.webp", pos: "40%" },
];

/* 2025.06.14 → 2025.6.14. 앞자리 0 을 떼면 카드 한 줄이 덜 빽빽합니다. */
const shortDate = (d: string) => d.replace(/\.0/g, ".");

export default function HomeConcerts() {
  const { lang } = useLang();

  return (
    <>
      {/* 제목은 어느 언어에서도 Concert 입니다 — 낱말 하나짜리 표제라 번역할 것이 없습니다. */}
      <h2 className="chd">Concert</h2>
      <p className="csub">
        {T.home.concertLead[lang]}{" "}
        <span className="csub__k">{T.home.concertLeadKey[lang]}</span>
        {T.home.concertLeadTail[lang]}
      </p>

      <RevealSeq className="cgrid" step={150}>
        {CARDS.map((c) => {
          const s = showById(c.show);
          const poster = c.poster !== undefined ? POSTERS[c.poster] : undefined;
          /* 포스터가 있으면 포스터에 적힌 이름이 먼저입니다 — 공연 기록의 정식 명칭("제1회 정기연주회")보다 포스터 쪽("창단 연주회")이 그 자리에서 더
             자연스럽게 읽힙니다. */
          const title = poster
            ? pickText(lang, poster.title, poster.titleEn)
            : s
              ? pickText(lang, s.title, s.titleEn)
              : "";

          return (
            <div className="ccd" key={c.show}>
              <span className="ccd__ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poster?.src || (c.src ? asset(c.src) : "")}
                  alt={poster ? `${title} ${T.home.posterOf[lang]}` : title}
                  loading="lazy"
                  style={c.pos ? { objectPosition: `${c.pos} center` } : undefined}
                />
              </span>
              <span className="ccd__d">{s ? shortDate(s.date) : ""}</span>
              <span className="ccd__v">{s ? pickText(lang, s.venue, s.venueEn) : ""}</span>
              <span className="ccd__t">{title}</span>
            </div>
          );
        })}
      </RevealSeq>

      <Link className="cmore" href="/concert/">
        {T.home.more[lang]}
        <span aria-hidden="true">▶</span>
      </Link>
    </>
  );
}
