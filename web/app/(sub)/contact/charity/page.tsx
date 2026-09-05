import type { Metadata } from "next";
import ContactBio from "@/components/ContactBio";
import { CONTACT } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "자선 공연 문의",
  description:
    "앙상블 메이는 강남구자원봉사센터에 공식적으로 등록된 자선 봉사 단체입니다. " +
    `공연이 필요한 곳이라면 어디든 찾아갑니다 — 연락처 ${CONTACT.tel}, ${CONTACT.email}.`,
  path: "/contact/charity/",
});

/* 짜임은 입단 문의 쪽과 같은 것을 씁니다 — components/ContactBio.tsx */
export default function ContactCharityPage() {
  return (
    <ContactBio
      src="/assets/img/hero/hero-14.webp"
      alt="공연 무대에서 마이크를 들고 이야기하는 앙상블 메이 단원"
      heading="자선 공연 문의"
    >
      앙상블 메이는 강남구자원봉사센터에 공식적으로 등록된 자선 봉사 단체입니다. 공연이
      필요한 곳이라면 어디든 찾아가 나눔을 실천합니다.
    </ContactBio>
  );
}
