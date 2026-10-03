"use client";

import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { SHOWS } from "@/lib/content";

const CHARITY_SHOWS = SHOWS.filter((s) => !s.wide);

export default function ConcertKinds() {
  const { lang } = useLang();

  const KINDS = [
    {
      kicker: T.concert.regularKicker,
      freq: T.concert.regularFreq,
      body: T.concert.regularBody,
      alt: T.concert.regularAlt,
      src: "/assets/img/concert-regular.webp",
    },
    {
      kicker: T.concert.charityKicker,
      freq: T.concert.charityFreq,
      body: T.concert.charityBody,
      alt: T.concert.charityAlt,
      src: "/assets/img/concert-charity.webp",
    },
  ];

  return (
    <div className="shows">
      {KINDS.map((k, i) => (
        <Reveal key={k.src} delay={i === 0 ? undefined : 90}>
          <div className="show show--ph">
            <p className="show__h">
              <span className="show__k">{k.kicker[lang]}</span>
              <span className="show__f">{k.freq[lang]}</span>
            </p>
            <div className="show__ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={k.src} width={900} height={600} alt={k.alt[lang]} loading="lazy" />
            </div>
            <div className="show__b">
              <p>{k.body[lang]}</p>
              {i === 1 && (
                <ul className="show__list">
                  {CHARITY_SHOWS.map((s) => (
                    <li key={s.id} className="show__list-item">
                      <span className="show__list-date">{s.date}</span>
                      <span className="show__list-title">
                        {pickText(lang, s.title, s.titleEn)}
                      </span>
                      {s.venue && (
                        <span className="show__list-venue">
                          {pickText(lang, s.venue, s.venueEn)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
