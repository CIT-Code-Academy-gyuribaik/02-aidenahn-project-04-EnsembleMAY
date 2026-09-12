/* 단원 사진 그리드 원래 홈에 있던 것을 About 의 [단원] 갈래로 옮겼습니다. */

"use client";

import { RevealSeq } from "@/components/Reveal";
import { MEMBERS } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

export default function MemberGrid() {
  const { lang } = useLang();

  /* 이름은 content/members.json 에 "김해든 Hayden Kim" 처럼 국문·영문을 한 줄로 적어 둡니다. ENG 에서는 그중
     영문(nameEn)만 내보입니다 — 번역이 아니라 이미 있는 두 이름 중 하나를 고르는 일입니다. */
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
            /* 사진이 아직 없는 자리. */
            <span className="mem__ph" aria-hidden="true" />
          )}
          {m.name && <p className="mem__n">{pickText(lang, m.name, m.nameEn)}</p>}
          {m.part && <p className="mem__p">{m.part}</p>}
        </div>
      ))}
    </RevealSeq>
  );
}
