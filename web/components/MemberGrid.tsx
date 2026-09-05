/* ==========================================================================
   단원 사진 그리드

   원래 홈에 있던 것을 About 의 [단원] 갈래로 옮겼습니다. 홈은 배너로만
   가리키고 실제 명단은 About 에 둡니다.
   목록은 web/content/members.json 에서 옵니다 — 이 파일은 건드리지
   않아도 인원이 늘고 줄어듭니다.
   ========================================================================== */

import { RevealSeq } from "@/components/Reveal";
import { MEMBERS } from "@/lib/content";

export default function MemberGrid() {
  return (
    <RevealSeq className="mem mem--3" step={60}>
      {MEMBERS.map((m, i) => (
        <div className="mem__c" key={m.src || i}>
          {m.src ? (
            <span className="mem__ph">
              <img src={m.src} alt={m.name || "앙상블 메이 단원"} loading="lazy" />
            </span>
          ) : (
            /* 사진이 아직 없는 자리. 빈 회색 칸 대신 옅은 버건디 판으로
               둡니다 — style.css 의 .mem__ph 가 그 바탕을 갖고 있습니다. */
            <span className="mem__ph" aria-hidden="true" />
          )}
          {m.name && <p className="mem__n">{m.name}</p>}
          {m.part && <p className="mem__p">{m.part}</p>}
        </div>
      ))}
    </RevealSeq>
  );
}
