import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import ContactCard from "@/components/ContactCard";
import { T } from "@/lib/i18n";

export const metadata: Metadata = pageMeta({
  title: "자선 공연 문의",
  description:
    "앙상블 메이는 강남구자원봉사센터에 공식적으로 등록된 자선 봉사 단체입니다. " +
    `공연이 필요한 곳이라면 어디든 찾아갑니다 — 연락처 ${CONTACT.tel}, ${CONTACT.email}.`,
  path: "/contact/charity/",
});

/* 짜임(사진 1 : 글 1.6)은 style.css 의 [.bio] — 원래 원장 이야기용이던 것을 그대로 가져다 씁니다. */
export default function ContactCharityPage() {
  return (
    <ContactCard
      photo={{ src: "/assets/img/hero/hero-14.webp", width: 1920, height: 1281 }}
      alt={T.contact.charityAlt}
      title={T.contact.charityTitle}
      body={T.contact.charityBody}
    />
  );
}
