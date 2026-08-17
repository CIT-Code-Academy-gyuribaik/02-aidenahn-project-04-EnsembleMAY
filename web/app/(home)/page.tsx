import SnapScroll from "@/components/SnapScroll";
import HeroSlideshow from "@/components/HeroSlideshow";
import HeroWaves from "@/components/HeroWaves";
import HomeBanners from "@/components/HomeBanners";
import HomeConcerts from "@/components/HomeConcerts";
import VideoCard from "@/components/VideoCard";
import { Reveal } from "@/components/Reveal";
import { asset, HOME_VIDEO } from "@/lib/content";

/* ==========================================================================
   홈

   ── 스냅으로 넘기는 네 칸 ──
     1 히어로 (사진 4장이 넘어감)
     2 큰 영상
     3 공연 리스트 — 포스터 + 최근 공연 → 더보기
     4 배너 목록 (단원 · 활동 사진)

   ── 그다음 ──
     5 푸터 — 스크롤로 이어집니다 (Shell 이 그립니다)

   네 번째 칸에서 아래로 굴리면 스냅이 손을 놓고 푸터가 평범하게
   올라옵니다. 손을 놓는 시점은 components/SnapScroll.tsx 의
   [마지막 칸에서 푸터로 넘겨주기] 가 정합니다 — Swiper 에 맡기면
   페이지가 밀린 뒤에도 휠을 계속 가로채서, 푸터가 떠 있는 채로
   뒤에서 칸만 바뀝니다.

   ★ 홈에서 단원과 사진을 전부 펼치지 않습니다.
     예전에는 단원 8명과 사진 8장을 홈에 다 늘어놓았는데, 그러면 홈이
     About·Gallery 와 같은 말을 반복하게 됩니다. 홈은 "무엇을 하는
     앙상블인가" 만 보여 주고 각자의 페이지로 보냅니다.
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      <SnapScroll>
        {/* 1 — 히어로 */}
        <section className="hero">
          <HeroSlideshow />
          <div className="hero__veil" />
          <HeroWaves />
          <div className="hero__body">
            <p className="eyebrow">Ensemble MAY</p>
            <h1 className="hero__lines">
              음악을 사랑하는 아이들이
              <br />
              만들어 가는 현악 앙상블입니다.
            </h1>
            {/* 제목과 영문 사이를 끊는 금선. About 의 [지금까지 연주한 곡]
                에 쓰던 .orn 과 같은 언어입니다 — 가운데 표식을 두고 양옆
                으로 선이 흐려집니다. 마름모를 쓰는 것은 상단 바 바로 아래
                라서, 로고와 같은 M 마크를 또 두면 같은 것이 두 번 나옵니다. */}
            <p className="hero__orn" aria-hidden="true">
              <span />
            </p>
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
                  {/* 이 칸은 그 자체가 영상입니다. 칸이 자리를 잡으면
                      소리를 끈 채로 알아서 시작합니다 — 자세한 조건은
                      components/VideoCard.tsx 의 auto 설명에 있습니다. */}
                  <VideoCard video={HOME_VIDEO} auto />
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

        {/* 3 — 공연 넉 장.
            무대 사진을 지면 가득 깔고 그 위에 세웁니다. .sec 을 쓰지
            않는 이유 — 사진이 화면 끝까지 가야 해서 .wrap 의 안쪽
            여백 밖으로 나가야 합니다. */}
        <section className="csec">
          <div className="csec__bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("assets/img/gallery/20250614-concert1-09.webp")} alt="" />
          </div>
          <div className="csec__in">
            <HomeConcerts />
          </div>
        </section>

        {/* 4 — 배너 목록. 어두운 지면 위에 밝은 카드 두 장이 뜹니다. */}
        <section className="sec sec--dark sec--banner">
          <div className="wrap">
            <HomeBanners />
          </div>
        </section>
      </SnapScroll>
    </>
  );
}
