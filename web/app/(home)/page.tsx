import SnapScroll from "@/components/SnapScroll";
import HeroSlideshow from "@/components/HeroSlideshow";
import HomeBanners from "@/components/HomeBanners";
import HomeConcerts from "@/components/HomeConcerts";
import CharityCta from "@/components/CharityCta";
import VideoCard from "@/components/VideoCard";
import { Reveal, RevealStage } from "@/components/Reveal";
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
          <div className="hero__body">
            {/* 히어로에는 이름만 세웁니다. 앙상블을 소개하는 글은 바로 아래
                칸에서 국문·영문 두 단으로 이어집니다 — 첫 화면에서 두 번
                읽히면 둘 다 흐려집니다. 필기체는 여기 한 자리뿐입니다. */}
            <h1 className="hero__lines hero__lines--script">Ensemble MAY</h1>
            {/* 이름과 한 줄 소개 사이를 가르는 금선. 가운데에 로고 마크가 놓입니다.
                aria-hidden 인 이유는 읽을 내용이 없어서입니다. 화면 낭독기가
                "이미지" 라고만 말하고 지나가면 방해만 됩니다. */}
            <div className="hero__orn" aria-hidden="true">
              <span />
            </div>
            {/* 두 문장을 한 줄씩 앉힙니다 — 앞은 누구인가, 뒤는 무엇을 하는가.
                한 문장만으로는 금선(720px) 아래가 너무 비어서 낱말 사이를
                억지로 벌려 폭을 채우던 자리였습니다. 문장이 길어지니 그럴
                필요가 없어졌습니다.
                ★ 문장마다 <span> 으로 감싸는 이유 — 한 덩어리로 두면 어디서
                  줄이 바뀔지 브라우저가 정합니다. 그런데 이 자리의 글꼴은
                  방문자 컴퓨터에 무엇이 깔려 있느냐에 따라 달라져서(--gothic
                  차례대로 프리텐다드 · Poppins · 맑은 고딕), 글자 폭이 제각각이라
                  [문장 사이]가 아니라 문장 한복판에서 끊기기도 합니다.
                  실제로 "…WHO LOVE / MUSIC" 처럼 끊겼습니다. 문장을 각각
                  블록으로 두면 어느 글꼴에서도 문장 단위로 나뉩니다.
                  <br> 대신 <span> 인 것은, 좁은 화면에서 각 문장이 다시
                  제 안에서 접혀야 하기 때문입니다.
                대문자는 style.css 가 입힙니다. 여기에 대문자로 적어 두면
                복사해 갈 때도 대문자로 붙고, 화면 낭독기가 한 글자씩 읽습니다. */}
            <p className="hero__en">
              <span>A string ensemble created by children who love music</span>
              <span>We practice sharing and service through music</span>
            </p>
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
                      &apos;앙상블 메이&apos;는 단원들이 각자의 꿈을 음악 안에서 발견하고 키워갈 수
                      있도록 응원합니다. 무대 위의 작은 경험들이 모여 스스로에 대한 확신과 미래를
                      향한 용기로 이어지기를 바라며, 오늘도 한 걸음씩 나아가고 있습니다.
                    </p>
                    <p className="pair__en">
                      Ensemble M.A.Y. encourages each member to discover and nurture their own
                      dreams through music. We hope that these small experiences on stage will
                      grow into confidence in themselves and courage for the future, and so we
                      take one step forward, every day.
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
            <img src={asset("assets/img/gallery/20250614-concert1-09.webp")} alt="" />
          </div>
          {/* .csec__in 상자가 곧 무대입니다 — 이 칸이 화면에 들어온 순간을
              안쪽 일곱 조각이 함께 보고 차례로 올라옵니다. 조각마다 따로
              지켜보면 아래쪽 [공연 더보기] 가 켜지지 않습니다: 까닭은
              components/Reveal.tsx 의 RevealStage 주석에. */}
          <RevealStage className="csec__in">
            <HomeConcerts />
          </RevealStage>
        </section>

        {/* 4 — 배너 목록. 어두운 지면 위에 밝은 카드 두 장이 뜹니다. */}
        <section className="sec sec--dark sec--banner">
          <div className="wrap">
            <HomeBanners />
          </div>
        </section>
      </SnapScroll>

      {/* 5 — 자선 공연 신청 안내. 스냅 밖입니다.
          <SnapScroll> 이 끝난 뒤라 스냅 칸이 아니라 평범한 지면으로
          이어집니다 — 푸터와 같은 자리 취급입니다. 마지막 칸에서 아래로
          굴리면 이 띠와 푸터가 차례로 올라옵니다.
          문안과 마크업은 Concert 맨 아래와 같은 것을 씁니다
          (components/CharityCta.tsx). 여기에는 #charity 를 달지 않습니다 —
          같은 id 가 한 화면에 둘이면 안 되고, 그 주소는 Concert 쪽입니다. */}
      <CharityCta />
    </>
  );
}
