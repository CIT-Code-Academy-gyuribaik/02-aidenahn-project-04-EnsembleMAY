import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "입단 문의",
  description:
    "앙상블 메이 입단 상담을 받습니다. " +
    `아이 나이와 하고 싶은 악기만 알려주시면 됩니다 — 연락처 ${CONTACT.tel}, ${CONTACT.email}.`,
  path: "/contact/",
});

/* Contact 의 기본 탭. 주소가 /contact/ 자체입니다.
   자선 공연 문의는 /contact/charity/ 로 나갔습니다.
   짜임(사진 1 : 글 1.6)은 style.css 의 [.bio] — 원래 원장 이야기용이던
   것을 그대로 가져다 씁니다. */
export default function ContactEnrollPage() {
  return (
    <Reveal>
      <div className="bio">
        <div className="bio__ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/hero/hero-13.webp"
            width={1920}
            height={1281}
            alt="바이올린을 연주하는 앙상블 메이 단원"
            loading="lazy"
          />
        </div>
        <div className="bio__t">
          <h2 className="sec__h">입단 문의</h2>
          <p>
            바이올린 · 비올라 · 첼로 단원을 모집하고 있습니다. 아이 나이와 하고 싶은 악기만
            알려주시면 편하게 상담해 드립니다.
          </p>
          <dl className="bio__ct">
            <div>
              <dt>Mobile</dt>
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
