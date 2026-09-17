"use client";

import Link from "next/link";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, asset, showById } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

type Card = {
  show: string;

  poster?: number;

  src?: string;
  pos?: string;
};

const CARDS: readonly Card[] = [
  { show: "concert2", poster: 0 },
  { show: "concert1", poster: 1 },
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
        {T.home.concertLead[lang]}{" "}
        <span className="csub__k">{T.home.concertLeadKey[lang]}</span>
        {T.home.concertLeadTail[lang]}
      </p>

      <RevealSeq className="cgrid" step={150}>
        {CARDS.map((c) => {
          const s = showById(c.show);
          const poster = c.poster !== undefined ? POSTERS[c.poster] : undefined;

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
