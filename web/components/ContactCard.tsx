"use client";

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

          <p>
            {body[lang].map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>

          {/* 휴대폰에서는 눌러서 바로 걸고 바로 씁니다 — 번호를 받아 적게 두지 않습니다. */}
          <dl className="bio__ct">
            <div>
              <dt>TEL</dt>
              <dd>
                <a href={`tel:${CONTACT.tel.replace(/[^0-9+]/g, "")}`}>{CONTACT.tel}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Reveal>
  );
}
