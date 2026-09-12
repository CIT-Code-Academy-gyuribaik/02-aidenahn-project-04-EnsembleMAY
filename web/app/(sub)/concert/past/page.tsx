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
      {/* 지난 공연 : 목록은 web/content/shows.json 에서 옵니다. 공연을 추가하거나 사진을 붙일 때 이 파일은 건드리지 않습니다. 탭 이름이
          "공연 연혁" 이라 제목을 또 달지 않습니다. 화면 낭독기와 검색엔진에는 제목이 필요하므로 글자만 감춥니다(.sr). 안내 한 문장을 두었다가 뺐습니다
          — 카드가 사진이고 눌리게 생겼으니 "누르면 사진을 볼 수 있다" 는 말은 화면이 이미 하고 있었습니다. #history 앵커는 예전
          주소(/concert/#history)로 들어오던 링크를 받아 주려고 남겨 둡니다. */}
      <section className="sec sec--first" id="history">
        <div className="wrap">
          <h2 className="sr">
            <Say t={T.concert.historyHeading} />
          </h2>
          <PastShows />
        </div>
      </section>

      {/* [정기 공연] 포스터 섹션이 여기 있었습니다. */}
    </>
  );
}
