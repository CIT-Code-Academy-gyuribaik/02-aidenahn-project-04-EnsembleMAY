"use client";

import { RevealSeq } from "@/components/Reveal";
import { MEMBERS } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

export default function MemberGrid() {
  const { lang } = useLang();

  return (
    <RevealSeq className="mem mem--3" step={60}>
      {MEMBERS.map((m, i) => (
        <div className="mem__c" key={m.src || i}>
          {m.src ? (
            <span className="mem__ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt={pickText(lang, m.name, m.nameEn) || T.about.memberAlt[lang]}
                loading="lazy"
              />
            </span>
          ) : (
            <span className="mem__ph" aria-hidden="true" />
          )}
          {m.name && <p className="mem__n">{pickText(lang, m.name, m.nameEn)}</p>}
          {m.part && <p className="mem__p">{m.part}</p>}
        </div>
      ))}
    </RevealSeq>
  );
}
