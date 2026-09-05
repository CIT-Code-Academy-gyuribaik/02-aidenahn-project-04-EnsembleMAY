import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "자선 공연 문의",
  description:
    "앙상블 메이는 강남구자원봉사센터에 공식적으로 등록된 자선 봉사 단체입니다. " +
    `공연이 필요한 곳이라면 어디든 찾아갑니다 — 연락처 ${CONTACT.tel}, ${CONTACT.email}.`,
  path: "/contact/charity/",
});

/* 짜임(사진 1 : 글 1.6)은 style.css 의 [.bio] — 원래 원장 이야기용이던
   것을 그대로 가져다 씁니다. */
export default function ContactCharityPage() {
  return (
    <Reveal>
      <div className="bio">
        <div className="bio__ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/hero/hero-14.webp"
            width={1920}
            height={1281}
            alt="공연 무대에서 마이크를 들고 이야기하는 앙상블 메이 단원"
            loading="lazy"
          />
        </div>
        <div className="bio__t">
          <h2 className="sec__h">자선 공연 문의</h2>
          <p>
            앙상블 메이는 강남구자원봉사센터에 공식적으로 등록된 자선 봉사 단체입니다. 공연이
            필요한 곳이라면 어디든 찾아가 나눔을 실천합니다.
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
