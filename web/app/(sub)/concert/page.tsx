import type { Metadata } from "next";
import InquiryButton from "@/components/InquiryButton";
import { Reveal } from "@/components/Reveal";
import { PastShows, Posters } from "@/components/PastShows";
import Repertoire from "@/components/Repertoire";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "공연",
  description:
    "앙상블 메이는 1년에 한 번 정기 연주회를 열고, 그 사이사이 자선 공연으로 무대에 섭니다. " +
    "지금까지 연주한 곡, 지난 공연 기록, 정기 공연 포스터를 볼 수 있습니다.",
  path: "/concert/",
});

export default function ConcertPage() {
  return (
    <>
      <div className="phead">
        <div className="wrap">
          <h1>앙상블 메이가 올리는 공연</h1>
          <p>앙상블 메이는 정기적으로 공연 활동을 진행하고 있습니다.</p>
        </div>
      </div>

      {/* 두 갈래를 나란히 놓습니다. .shows 가 두 단으로 벌리고, 각 단은
          [제목 → 사진 → 설명] 순으로 내려갑니다. 가운데 세로 실선은 .shows 가
          그립니다 — 900px 아래로 내려가면 한 단으로 접히고 가로선으로 바뀝니다. */}
      <section className="sec sec--tint">
        <div className="wrap">
          <div className="shows">
            <Reveal>
              <div className="show show--ph">
                <p className="show__h">
                  <span className="show__k">정기 연주회</span>
                  <span className="show__f">연 1회</span>
                </p>
                <div className="show__ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/img/concert-regular.webp"
                    width={900}
                    height={600}
                    alt="무대 위에서 지휘자와 함께 합주하는 앙상블 메이 단원들"
                    loading="lazy"
                  />
                </div>
                <div className="show__b">
                  <p>
                    한 해 동안 연습한 곡을 1부와 2부로 나누어 전부 올립니다. 단원 전체가 함께하는
                    합주곡과, 몇 명이 나와 연주하는 앙상블·솔로 무대를 번갈아 배치합니다.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="show show--ph">
                <p className="show__h">
                  <span className="show__k">자선 공연</span>
                  <span className="show__f">수시</span>
                </p>
                <div className="show__ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/img/concert-charity.webp"
                    width={900}
                    height={600}
                    alt="도서관 로비에서 관객 앞에 서서 연주하는 앙상블 메이 단원들"
                    loading="lazy"
                  />
                </div>
                <div className="show__b">
                  <p>
                    정기 공연 사이사이에 요청을 받아 섭니다. 학교, 복지관, 지역 행사 — 아이들의
                    연주가 필요한 곳이면 어디든 갑니다. 자선 공연은 Contact 메뉴로 문의
                    부탁드립니다.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 연주한 곡 — About 에서 옮겨왔습니다. 어두운 지면이라
          위(틴트)·아래(흰색)와 번갈아 놓입니다. */}
      <Repertoire />

      {/* 지난 공연 : 목록은 web/content/shows.json 에서 옵니다.
          공연을 추가하거나 사진을 붙일 때 이 파일은 건드리지 않습니다. */}
      <section className="sec" id="history">
        <div className="wrap">
          <Reveal>
            <h2 className="sec__h">지난 공연</h2>
          </Reveal>
          <PastShows />
        </div>
      </section>

      {/* 포스터는 흰 바탕 인쇄물이라 어두운 지면에서 확 살아납니다.
          이 페이지에서 어두운 구간은 여기 하나입니다. */}
      <section className="sec sec--dark" id="posters">
        <div className="wrap">
          <Reveal>
            <h2 className="sec__h">정기 공연</h2>
          </Reveal>
          <Posters />
        </div>
      </section>

      <section className="cta" id="charity">
        <div className="wrap">
          <h2>자선 공연을 요청하고 싶으신가요?</h2>
          <p>
            학교, 복지관, 지역 행사 모두 가능합니다.
            <br />
            희망하시는 날짜와 장소, 예상 관객 규모를 적어 보내주세요.
          </p>
          <div className="cta__b">
            <InquiryButton kind="charity" label="자선 공연 문의" />
          </div>
        </div>
      </section>
    </>
  );
}
