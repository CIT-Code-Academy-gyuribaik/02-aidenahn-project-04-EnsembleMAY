"use client";

import { RevealSeq } from "@/components/Reveal";
import { MEMBERS } from "@/lib/content";
import { srcSetOf, widthOf } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

const PART_KOR: Record<string, string> = {
  Violin: "바이올린",
  Viola: "비올라",
  Cello: "첼로",
  Piano: "피아노",
};

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
                srcSet={srcSetOf(m.src, widthOf(m.ratio))}
                sizes="(max-width:520px) 50vw, (max-width:900px) 33vw, 25vw"
                alt={pickText(lang, m.name, m.nameEn) || T.about.memberAlt[lang]}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
              />
            </span>
          ) : (
            <span className="mem__ph" aria-hidden="true" />
          )}
          {m.name && <p className="mem__n">{pickText(lang, m.name, m.nameEn)}</p>}
          {m.part && <p className="mem__p">{lang === "kor" ? (PART_KOR[m.part] ?? m.part) : m.part}</p>}
        </div>
      ))}
    </RevealSeq>
  );
}
