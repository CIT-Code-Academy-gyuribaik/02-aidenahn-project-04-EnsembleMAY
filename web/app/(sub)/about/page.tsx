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
      {/* 탭 이름이 "단원" 이라 제목을 또 달지 않습니다. 화면 낭독기와
          검색엔진에는 제목이 필요하므로 글자만 감춥니다(.sr).
          안내 한 문장을 두었다가 뺐습니다 — 얼굴과 이름이 늘어선 판이라
          그 앞에 설명을 세우지 않아도 무엇인지 바로 읽힙니다. */}
      <h2 className="sr">함께 연주하는 아이들</h2>
      <MemberGrid />
    </>
  );
}
