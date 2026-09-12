"use client";

/* 문의 카드 — 사진 한 장 + 제목 + 안내 + 연락처 두 곳이 같은 것을 씁니다.
   ★ 클라이언트인 까닭은 alt 때문입니다. 제목과 본문은 <Say> 로 감싸면 서버 페이지에 그냥 둘 수 있는데, 사진의 alt 는 글자가 아니라
     속성이라 부품을 끼워 넣을 자리가 없습니다. 화면 낭독기에게는 alt 가 본문이므로, ENG 를 고른 분에게 여기만 한국어로 읽히면 안 됩니다. */

import { useLang } from "@/lib/lang";
import type { Text, Lines } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/lib/content";

export default function ContactCard({
  photo,
  alt,
  title,
  body,
}: {
  photo: { src: string; width: number; height: number };
  alt: Text;
  title: Text;
  body: Lines;
}) {
  const { lang } = useLang();
  return (
    <Reveal>
      <div className="bio">
        <div className="bio__ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={alt[lang]}
            loading="lazy"
          />
        </div>
        <div className="bio__t">
          <h2 className="sec__h">{title[lang]}</h2>
          {/* 문장마다 한 줄. 왜 <br> 이 아니라 <span> 인지는 lib/i18n.ts 의 Lines 설명에 적었습니다. */}
          <p>
            {body[lang].map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          {/* 연락처는 번역할 것이 없습니다 — 라벨이 원래 영어입니다. */}
          <dl className="bio__ct">
            <div>
              <dt>TEL</dt>
              <dd>{CONTACT.tel}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{CONTACT.email}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Reveal>
  );
}
