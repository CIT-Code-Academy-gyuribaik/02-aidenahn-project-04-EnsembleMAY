"use client";

import SubTabs from "@/components/SubTabs";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";
import { SECTIONS } from "@/lib/nav";

const SEC = SECTIONS.contact;

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  return (
    <>

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

      <SubTabs label={SEC.subLabel} tabs={SEC.sub} />

      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
