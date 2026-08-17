import HeroSlideshow from "@/components/HeroSlideshow";
import InquiryButton from "@/components/InquiryButton";
import VideoCard from "@/components/VideoCard";
import { Reveal } from "@/components/Reveal";
import { GalleryPreview, MemberGrid } from "@/components/HomeSections";
import { HOME_VIDEO } from "@/lib/content";

/* ==========================================================================
   홈 — 다섯 칸

     1 히어로 (사진 4장이 넘어감)
     2 큰 영상 + 그 아래 소개글
     3 단원
     4 활동 사진
     5 입단 CTA + 푸터

   푸터는 Shell 이 렌더하므로 여기서는 4번까지만 있습니다.
   섹션 단위 스냅 스크롤은 아직 붙이지 않았습니다 — 방식이 정해지면
   이 구조를 그대로 감싸기만 하면 됩니다.
   ========================================================================== */

export default function HomePage() {
  return (
    <>
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

      {/* 2 — 큰 영상 + 아래 소개글.
          어떤 영상을 걸지는 web/content/site.json 의 homeVideo 한 곳에서 정합니다.
          갤러리의 영상 목록(videos.json)과는 따로 놉니다. */}
      <section className="sec sec--first sec--dark">
        <div className="wrap">
          <Reveal>
            <div className="feat">
              <div className="vids vids--one feat__v">
                <VideoCard video={HOME_VIDEO} />
              </div>

              <div className="feat__t">
                {/* 이 칸에는 제목을 눈에 보이게 두지 않습니다 — 영상이 제목
                    역할을 합니다. 다만 화면 낭독기와 검색엔진에는 이 칸이
                    무엇에 관한 자리인지 알려 줘야 해서 글자만 감춥니다. */}
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

      {/* 3 — 단원 */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Members</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="sec__h">함께 연주하는 아이들</h2>
          </Reveal>
          <MemberGrid />
        </div>
      </section>

      {/* 4 — 활동 사진 */}
      <section className="sec sec--tint">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Gallery</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec__h">활동 사진</h2>
          </Reveal>
          <GalleryPreview count={8} />
        </div>
      </section>

      {/* 5 — 입단 CTA (푸터는 Shell 이 이어서 렌더합니다) */}
      <section className="cta">
        <div className="wrap">
          <h2>입단 상담을 받고 있습니다.</h2>
          <p>
            바이올린 · 비올라 · 첼로.
            <br />
            어떻게 시작하면 되는지 편하게 물어봐 주세요.
          </p>
          <div className="cta__b">
            <InquiryButton kind="enroll" label="입단 문의" />
          </div>
        </div>
      </section>
    </>
  );
}
