import type { Metadata } from "next";
import MemberGrid from "@/components/MemberGrid";
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
      {/* 탭 이름이 "단원" 이라 제목을 또 달지 않습니다. 대신 이 갈래가
          무엇을 담고 있는지 한 문장으로 알려 줍니다.
          화면 낭독기와 검색엔진에는 제목이 필요하므로 글자만 감춥니다. */}
      <h2 className="sr">함께 연주하는 아이들</h2>
      <p className="abt__lead">
        바이올린 · 비올라 · 첼로가 모여 한 곡을 완성합니다. 잘 하는 아이들만 모인 곳이 아니라,
        함께 연습하며 자라는 자리입니다.
      </p>
      <MemberGrid />
    </>
  );
}
