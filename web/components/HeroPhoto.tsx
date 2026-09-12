"use client";

/* 서브페이지 히어로 사진 — 여러 장 중 한 장을 골라 겁니다 들어올 때마다 다른 사진이 걸립니다. 공연 페이지처럼 보여 줄 무대가 여럿인 자리에서, 한
   장만 고정해 두면 두 번째 방문부터는 사진이 배경 무늬처럼 읽힙니다.
   ★ 고르는 일을 브라우저에서 합니다(useEffect). 서버에서 Math.random 을 부르면 두 가지가 어긋납니다 —
   ★ 사진이 한 장뿐이면 이 컴포넌트를 쓰지 않습니다. About·Gallery 처럼 한 장으로 정해진 자리는 layout.tsx 가 <img> 를 그대로
     그립니다 — 서버가 미리 그려 두는 편이 첫 화면이 빠릅니다. */

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import type { Text } from "@/lib/i18n";

export type HeroShot = {
  src: string;
  /* 사진 설명. 화면 낭독기에게는 이것이 본문이라 언어를 따라갑니다. */
  alt: Text;
  /* 사진의 어디를 보여줄지. style.css 의 .phead__ph img 가 씁니다. */
  pos: string;
  /* 사진 칸을 절반(기본)이 아니라 33% 로 좁힙니다. 세로로 긴 사진(4:3 단체 사진처럼)만 붙입니다 — 절반 폭에서는 세로가 절반밖에 안 보여서 앞줄
     얼굴이 아래 모서리에서 잘립니다. 왜 폭이 세로 노출을 정하는지는 style.css 의 .phead__ph--narrow 주석에. */
  narrow?: boolean;
  /* 어둠(그라데이션)을 걷고, 히어로 바탕을 사진 뒷배경과 같은 밝은 회색으로 맞춥니다. 제목 글씨도 검정으로 바뀝니다. 흰 배경 스튜디오 사진처럼 [사진과
     지면이 이어져 보이는 편이 나은] 장에만 붙입니다. 색과 규칙은 style.css 의 .phead__ph--light 에 있습니다. */
  light?: boolean;
  /* 사진 칸을 절반이 아니라 띠 전체로 넓힙니다. 왼쪽이 이미 비어 있게 만들어 둔 넓은 사진(4.7:1 처럼)에만 붙입니다 — 사진 안에 글자 자리가 들어
     있으므로 칸을 나눌 이유가 없습니다. narrow 와는 반대 방향이라 함께 붙이지 않습니다. */
  band?: boolean;
  width: number;
  height: number;
};

export default function HeroPhoto({ shots }: { shots: readonly HeroShot[] }) {
  const { lang } = useLang();
  const [at, setAt] = useState<number | null>(null);

  useEffect(() => {
    setAt(Math.floor(Math.random() * shots.length));
  }, [shots.length]);

  /* 아직 고르기 전 — 사진 칸만 비워 둡니다. */
  if (at === null) return <div className="phead__ph" />;

  const shot = shots[at];
  return (
    <div
      className={
        "phead__ph" +
        (shot.narrow ? " phead__ph--narrow" : "") +
        (shot.band ? " phead__ph--band" : "") +
        (shot.light ? " phead__ph--light" : "")
      }
      style={{ ["--ph-pos" as string]: shot.pos }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={shot.alt[lang]}
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
