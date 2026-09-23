import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";
import { breadcrumbFor } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import ContactCard from "@/components/ContactCard";
import JsonLd from "@/components/JsonLd";
import { T } from "@/lib/i18n";

export const metadata: Metadata = pageMeta({
  title: "자선 공연 문의",
  description:
    "앙상블 메이는 강남구자원봉사센터에 공식적으로 등록된 자선 봉사 단체입니다. " +
    `공연이 필요한 곳이라면 어디든 찾아갑니다 — 연락처 ${CONTACT.tel}, ${CONTACT.email}.`,
  path: "/contact/charity/",
});

export default function ContactCharityPage() {
  return (
    <>
      <JsonLd data={breadcrumbFor("/contact/charity/")} />
      <ContactCard
        photo={{ src: "/assets/img/hero/hero-14.webp", width: 1920, height: 1281 }}
        alt={T.contact.charityAlt}
        title={T.contact.charityTitle}
        body={T.contact.charityBody}
      />
    </>
  );
}
