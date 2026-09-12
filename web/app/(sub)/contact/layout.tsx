"use client";

import SubTabs from "@/components/SubTabs";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";
import { SECTIONS } from "@/lib/nav";

/* Contact 두 갈래가 함께 쓰는 머리 부분입니다. */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때 펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.contact;

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  /* 사진이 한 장이라 <img> 를 그대로 그리는데, alt 는 글자가 아니라 속성이라 <Say> 를 끼울 자리가 없습니다. 그래서 이 레이아웃만
     클라이언트입니다 — metadata 를 내보내지 않으니 문제가 없고, 클라이언트 부품도 첫 HTML 에는 서버가 그려 두므로 위 주석이 말하는 [첫
     화면이 빠르다] 는 그대로입니다. */
  const { lang } = useLang();
  return (
    <>
      {/* 히어로 — About · Concert · Gallery 와 같은 짜임입니다.
          ★ 여기는 사진이 한 장이라 components/HeroPhoto.tsx 를 쓰지 않고 <img> 를 그대로 그립니다 — 서버가 미리 그려 두는 편이 첫
            화면이 빠릅니다. */}
      <div className="phead phead--hero">
        <div className="phead__ph" style={{ ["--ph-pos" as string]: "50% 25%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/hero/hero-12.webp"
            width={1920}
            height={1281}
            alt={T.contact.conductorAlt[lang]}
            fetchPriority="high"
          />
        </div>
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">Contact</span>
            <span className="phead__ko">문의하기</span>
          </h1>
        </div>
      </div>

      {/* 띠는 .wrap 밖에 둡니다 — 화면 폭을 다 써야 히어로 아래 경계가 제대로 지어집니다. */}
      <SubTabs label={SEC.subLabel} tabs={SEC.sub} />

      {/* sec--first : 위 테두리를 지웁니다. */}
      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
