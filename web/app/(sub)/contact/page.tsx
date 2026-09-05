import type { Metadata } from "next";
import ContactBio from "@/components/ContactBio";
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
   짜임은 자선 공연 쪽과 같은 것을 씁니다 — components/ContactBio.tsx */
export default function ContactEnrollPage() {
  return (
    <ContactBio
      src="/assets/img/hero/hero-13.webp"
      alt="바이올린을 연주하는 앙상블 메이 단원"
      heading="입단 문의"
    >
      바이올린 · 비올라 · 첼로 단원을 모집하고 있습니다. 아이 나이와 하고 싶은 악기만
      알려주시면 편하게 상담해 드립니다.
    </ContactBio>
  );
}
