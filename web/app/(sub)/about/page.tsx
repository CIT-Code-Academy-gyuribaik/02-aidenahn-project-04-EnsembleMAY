import type { Metadata } from "next";
import { MemberGrid } from "@/components/HomeSections";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "단원",
  description:
    "앙상블 메이에서 함께 연주하는 아이들입니다. 바이올린·비올라·첼로가 모여 한 곡을 완성합니다.",
  path: "/about/",
});

/* About 의 기본 탭. 주소가 /about/ 자체입니다. */
export default function AboutMembersPage() {
  return (
    <>
      <h2 className="sec__h">함께 연주하는 아이들</h2>
      <MemberGrid />
    </>
  );
}
