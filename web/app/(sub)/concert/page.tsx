import type { Metadata } from "next";
import CharityCta from "@/components/CharityCta";
import ConcertKinds from "@/components/ConcertKinds";
import JsonLd from "@/components/JsonLd";
import { breadcrumbFor } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "공연 정보",
  description:
    "앙상블 메이는 1년에 한 번 정기 연주회를 열고, 그 사이사이 자선 공연으로 무대에 섭니다. " +
    "지금까지 연주한 곡과 자선 공연 문의를 여기에 모았습니다.",
  path: "/concert/",
});

export default function ConcertPage() {
  return (
    <>
      <JsonLd data={breadcrumbFor("/concert/")} />

      <section className="sec sec--first">
        <div className="wrap">
          <ConcertKinds />
        </div>
      </section>

      <CharityCta anchor />
    </>
  );
}
