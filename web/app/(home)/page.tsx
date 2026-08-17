import SnapScroll from "@/components/SnapScroll";
import SiteFooter from "@/components/SiteFooter";
import HeroSlideshow from "@/components/HeroSlideshow";
import HomeBanners from "@/components/HomeBanners";
import HomeConcerts from "@/components/HomeConcerts";
import VideoCard from "@/components/VideoCard";
import { Reveal } from "@/components/Reveal";
import { HOME_VIDEO } from "@/lib/content";

/* ==========================================================================
   홈 — 네 칸

     1 히어로 (사진 4장이 넘어감)
     2 큰 영상
     3 공연 리스트 — 포스터 + 최근 공연 → 더보기
     4 배너 목록 (단원 · 활동 사진) + 푸터

   SnapScroll 의 직계 자식 하나가 한 칸입니다.
   푸터는 마지막 칸 안에 있습니다 — 배너와 한 화면에 같이 보여야 해서
   Shell 이 아니라 여기서 그립니다(Shell 의 ownFooter).

   ★ 홈에서 단원과 사진을 전부 펼치지 않습니다.
     예전에는 단원 8명과 사진 8장을 홈에 다 늘어놓았는데, 그러면 홈이
     About·Gallery 와 같은 말을 반복하게 됩니다. 홈은 "무엇을 하는
     앙상블인가" 만 보여 주고 각자의 페이지로 보냅니다.
   ========================================================================== */

export default function HomePage() {
  return (
    <SnapScroll solidFrom={2}>
      {/* 1 — 히어로 */}
      <section className="hero">
        <HeroSlideshow />
        <div className="hero__veil" />
        <div className="hero__body">
          <p className="eyebrow">Ensemble MAY</p>
          <h1 className="hero__lines">
            음악을 사랑하는 아이들이
            <br />
            만들어 가는 현악 앙상블입니다.
          </h1>
          <p className="hero__en">We practice sharing and service through music.</p>
        </div>
      </section>

      {/* 2 — 큰 영상.
          어떤 영상을 걸지는 web/content/site.json 의 homeVideo 한 곳에서
          정합니다. 갤러리의 영상 목록(videos.json)과는 따로 놉니다. */}
      <section className="sec sec--first sec--dark">
        <div className="wrap">
          <Reveal>
            <div className="feat">
              <div className="vids vids--one feat__v">
                <VideoCard video={HOME_VIDEO} />
              </div>
              <div className="feat__t">
                {/* 영상이 제목 역할을 하는 자리라 제목을 눈에 보이게 두지
                    않습니다. 다만 화면 낭독기와 검색엔진에는 이 칸이 무엇에
                    관한 자리인지 알려 줘야 해서 글자만 감춥니다. */}
                <h2 className="sec__h sr">음악을 사랑하는 아이들이 만들어 가는 현악 앙상블</h2>
                {/* 국문·영문을 두 단으로 나란히. 세로로 쌓는 것보다 낮게 끝나서
                    그만큼 위 영상을 크게 걸 수 있습니다. */}
                <div className="pair">
                  <p className="pair__ko">
                    1년에 한 번 정기 공연을 열고, 그 사이사이 자선 공연으로 무대에 섭니다. 잘 하는
                    아이들만 모인 곳이 아니라, 함께 연습하며 자라는 자리입니다.
                  </p>
                  <p className="pair__en">
                    Ensemble MAY is a string ensemble created by children who love music. We hold
                    one regular concert each year and perform at charity concerts through the
                    seasons. We practice sharing and service through music.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — 공연 리스트 */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Concert</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec__h">무대에 선 날들</h2>
          </Reveal>
          <HomeConcerts />
        </div>
      </section>

      {/* 4 — 배너 목록 + 푸터 */}
      <div className="section--end">
        <section className="sec sec--tint">
          <div className="wrap">
            <HomeBanners />
          </div>
        </section>

        <SiteFooter />
      </div>
    </SnapScroll>
  );
}
