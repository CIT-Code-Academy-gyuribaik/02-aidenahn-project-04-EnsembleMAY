import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";
import { breadcrumbFor } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import ContactCard from "@/components/ContactCard";
import JsonLd from "@/components/JsonLd";
import { T } from "@/lib/i18n";

export const metadata: Metadata = pageMeta({
  title: "입단 문의",
  description:
    "앙상블 메이 입단 상담을 받습니다. " +
    `아이 나이와 하고 싶은 악기만 알려주시면 됩니다 — 연락처 ${CONTACT.tel}, ${CONTACT.email}.`,
  path: "/contact/",
});

export default function ContactEnrollPage() {
  return (
    <>
      <JsonLd data={breadcrumbFor("/contact/")} />
      <ContactCard
        photo={{ src: "/assets/img/hero/hero-13.webp", width: 1920, height: 1281 }}
        alt={T.contact.enrollAlt}
        title={T.contact.enrollTitle}
        body={T.contact.enrollBody}
      />
    </>
  );
}
