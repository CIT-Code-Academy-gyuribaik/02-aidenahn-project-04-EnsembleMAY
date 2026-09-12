"use client";

/* 공연 — 무슨 공연을 하는 앙상블인가 두 갈래를 나란히 놓습니다. .shows 가 두 단으로 벌리고, 각 단은 [제목 → 사진 → 설명] 순으로
   내려갑니다. 가운데 세로 실선은 .shows 가 그립니다 — 900px 아래로 내려가면 한 단으로 접히고 가로선으로 바뀝니다.
   ★ 페이지(app/(sub)/concert/page.tsx)에서 이리로 옮겨 온 까닭은 사진의 alt 입니다. 제목·설명은 <Say> 로 감싸면 서버에
     둘 수 있지만 alt 는 속성이라 부품을 끼울 자리가 없습니다. 화면 낭독기에게는 alt 가 본문이라, ENG 를 고른 분에게 여기만 한국어로 읽히면
     안 됩니다. 페이지 쪽에는 metadata 가 남아 있어야 해서(정적 내보내기의 검색·공유 카드) 파일을 통째로 클라이언트로 돌리는 대신 이 칸만
     떼어 왔습니다.
   ★ 문안은 lib/i18n.ts 의 T.concert 한 곳에 있습니다. */

import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export default function ConcertKinds() {
  const { lang } = useLang();

  /* 두 갈래는 짜임이 같고 글과 사진만 다릅니다. */
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
        /* 둘째 칸만 조금 늦게 올라옵니다 — 동시에 뜨면 두 장이 한 덩어리로 보여서 나란한 두 갈래라는 것이 안 읽힙니다. */
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
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
