import type { Metadata } from "next";
import CharityCta from "@/components/CharityCta";
import ConcertKinds from "@/components/ConcertKinds";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "공연 정보",
  description:
    "앙상블 메이는 1년에 한 번 정기 연주회를 열고, 그 사이사이 자선 공연으로 무대에 섭니다. " +
    "지금까지 연주한 곡과 자선 공연 문의를 여기에 모았습니다.",
  path: "/concert/",
});

/* Concert 의 기본 탭. 주소가 /concert/ 자체입니다. 지난 공연 기록과 포스터는 /concert/past/ 로 나갔습니다 — 이 갈래는
   "무슨 공연을 하는 앙상블인가" 만 답합니다. 두 갈래(정기 연주회 · 자선 공연)는 components/ConcertKinds.tsx 가 그립니다 —
   사진 alt 가 언어를 따라가야 해서 그쪽이 클라이언트입니다. 이 파일에는 metadata 가 남아 있어야 하므로 나누었습니다. */
export default function ConcertPage() {
  return (
    <>
      {/* sec--first : 위 테두리를 지웁니다. */}
      <section className="sec sec--first">
        <div className="wrap">
          <ConcertKinds />
        </div>
      </section>

      {/* 맨 아래 자선 공연 신청 띠. */}
      <CharityCta anchor />
    </>
  );
}
