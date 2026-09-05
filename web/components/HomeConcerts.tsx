"use client";

import Link from "next/link";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, asset, showById } from "@/lib/content";
import { useLang } from "@/lib/lang";
import type { NavLabel } from "@/lib/nav";

type Card = {
  show: string;
  poster?: number;
  src?: string;
  pos?: string;
  title?: NavLabel;
};

const CARDS: readonly Card[] = [
  { show: "concert2", poster: 0 },
  { show: "concert1", poster: 1, title: { kor: "창단 연주회", eng: "Founding Concert" } },
  { show: "library2512", src: "assets/img/gallery/20251213-library-03.webp", pos: "37%" },
  { show: "mekorea", src: "assets/img/gallery/20260525-mekorea-01.webp", pos: "40%" },
];

const shortDate = (d: string) => d.replace(/\.0/g, ".");

export default function HomeConcerts() {
  const { lang } = useLang();

  return (
    <>
      <h2 className="chd">Concert</h2>
      <p className="csub">
        {lang === "kor" ? (
          <>
            앙상블 메이는{" "}
            <span className="csub__k">강남구자원봉사센터의 공식 봉사단체</span>
            입니다.
          </>
        ) : (
          <>
            Ensemble MAY is an{" "}
            <span className="csub__k">official volunteer organization of the Gangnam-gu Volunteer Center</span>
            .
          </>
        )}
      </p>

      <RevealSeq className="cgrid" step={150}>
        {CARDS.map((c) => {
          const s = showById(c.show);
          const poster = c.poster !== undefined ? POSTERS[c.poster] : undefined;
          const title = c.title
            ? c.title[lang]
            : poster?.title || s?.title || "";

          return (
            <div className="ccd" key={c.show}>
              <span className="ccd__ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poster?.src || (c.src ? asset(c.src) : "")}
                  alt={poster ? `${title} 포스터` : title}
                  loading="lazy"
                  style={c.pos ? { objectPosition: `${c.pos} center` } : undefined}
                />
              </span>
              <span className="ccd__d">{s ? shortDate(s.date) : ""}</span>
              <span className="ccd__v">{s?.venue}</span>
              <span className="ccd__t">{title}</span>
            </div>
          );
        })}
      </RevealSeq>

      <Link className="cmore" href="/concert/">
        {lang === "kor" ? "공연 더보기" : "More Concerts"}
        <span aria-hidden="true">▶</span>
      </Link>
    </>
  );
}
