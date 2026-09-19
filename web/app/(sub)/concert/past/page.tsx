import type { Metadata } from "next";
import { PastShows } from "@/components/PastShows";
import { pageMeta } from "@/lib/seo";
import Say from "@/components/Say";
import { T } from "@/lib/i18n";

export const metadata: Metadata = pageMeta({
  title: "공연 연혁",
  description:
    "앙상블 메이가 지금까지 올린 공연 기록입니다. 정기 연주회는 포스터로, " +
    "나머지 공연은 그날의 사진으로 한 줄씩 정리했습니다.",
  path: "/concert/past/",
});

export default function ConcertPastPage() {
  return (
    <>

      <section className="sec sec--first" id="history">
        <div className="wrap">
          <h2 className="sr">
            <Say t={T.concert.historyHeading} />
          </h2>
          <PastShows />
        </div>
      </section>

    </>
  );
}
