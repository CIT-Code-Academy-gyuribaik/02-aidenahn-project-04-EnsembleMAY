import type { Metadata } from "next";
import InquiryButton from "@/components/InquiryButton";
import { Reveal, RevealSeq } from "@/components/Reveal";
import { REPERTOIRE, type Piece } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "앙상블 소개",
  description:
    "앙상블 메이는 바이올린·비올라·첼로가 모여 한 곡을 완성하는 어린이 현악 앙상블입니다. " +
    "단장 이야기와 지금까지 연주한 곡을 소개합니다.",
  path: "/about/",
});

/* 곡 목록을 두 단으로 나눕니다. 읽는 순서가 [왼쪽 전부 → 오른쪽 전부] 라
   앞쪽 절반이 왼쪽입니다. 홀수면 왼쪽이 한 곡 더 갖습니다 —
   예전 HTML 이 8 : 7 로 손수 맞춰 두었던 것을 계산으로 바꿨습니다.
   이제 곡을 추가해도 경계를 옮길 필요가 없습니다. */
function split(list: Piece[]): [Piece[], Piece[]] {
  const half = Math.ceil(list.length / 2);
  return [list.slice(0, half), list.slice(half)];
}

function Program({ pieces }: { pieces: Piece[] }) {
  return (
    <RevealSeq step={70}>
      {pieces.map((p) => (
        <div className="prog__i" key={p.title + p.composer}>
          <p className="prog__t">
            {p.title}
            {p.sub && <em>{p.sub}</em>}
          </p>
          <p className="prog__c">{p.composer}</p>
          {p.ensemble && <p className="prog__e">{p.ensemble}</p>}
        </div>
      ))}
    </RevealSeq>
  );
}

export default function AboutPage() {
  const [left, right] = split(REPERTOIRE);

  return (
    <>
      {/* 제목 블록 위에 단체 사진을 깔았습니다.
          사진은 왼쪽이 비어 있고 오른쪽에 단원들이 서 있는 가로로 긴 컷이라,
          넓은 화면에서는 글이 왼쪽 여백에 앉고 사진은 잘리지 않습니다.
          배경이 아니라 <img> 인 이유 — 단원 사진은 장식이 아니라 내용이라
          alt 가 필요하고, 첫 화면 그림이라 우선순위도 올려야 합니다. */}
      <div className="phead phead--hero">
        <div className="wrap">
          <h1>
            음악을 사랑하는 아이들이
            <br />
            만들어 가는 현악 앙상블입니다.
          </h1>
          <p>We practice sharing and service through music.</p>
        </div>
        <div className="phead__ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/about-hero.webp"
            width={2400}
            height={585}
            alt="흰 셔츠를 입고 나란히 선 앙상블 메이 단원들"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* 앙상블 소개 */}
      <section className="sec sec--first">
        <div className="wrap">
          <div className="pair">
            <p className="pair__ko">
              앙상블 메이는 음악을 사랑하는 아이들이 만들어 가는 현악 앙상블입니다. 바이올린,
              비올라, 첼로가 모여 한 곡을 완성합니다.
              <br />
              <br />
              1년에 한 번 정기 공연을 열고, 그 사이사이 자선 공연으로 무대에 섭니다. 연주로 얻은
              것을 필요한 곳에 나누는 일을 앙상블의 일부로 여깁니다.
            </p>
            <p className="pair__en">
              Ensemble MAY is a string ensemble created by children who love music. Violin,
              viola, and cello come together to complete a single piece.
              <br />
              <br />
              We hold one regular concert each year, and perform at charity concerts through the
              seasons. Giving back through what we play is part of what this ensemble is.
            </p>
          </div>
        </div>
      </section>

      {/* 단장 이야기 */}
      <section className="sec sec--tint" id="director">
        <div className="wrap">
          <p className="eyebrow">Director</p>
          <h2 className="sec__h">단장 이야기</h2>
          <div className="bio">
            {/* 사진이 준비되면 이 자리에 <img> 를 넣으면 됩니다 */}
            <div className="bio__ph" />
            {/* DRAFT · 단장님 확인 필요
                성함(○○○)과 "반주를 했다"는 전제는 지난 프로그램의 Piano 표기에서
                추정한 것입니다. 포스터 두 장에는 음악감독이
                Shine Minyoung Kwon 으로 적혀 있습니다. 한글 성함을 확인해 주세요. */}
            <div className="bio__t">
              <p className="bio__n">○○○</p>
              <p className="bio__r">Director · Piano</p>

              <p>
                저는 오래 반주를 했습니다. 무대 옆에서 아이들이 첫 음을 내는 순간을 가장 가까이서
                보는 자리입니다.
              </p>
              <p>
                그 자리에서 자주 본 것은 실력보다 표정이었습니다. 잘 켜는 아이가 즐거워 보이지
                않고, 아직 서툰 아이가 활을 들 때 눈이 반짝이는 일이 많았습니다. 연습이 숙제가 된
                아이와, 아직 음악인 아이의 차이였습니다.
              </p>
              <p>
                앙상블 메이는 그 차이를 지키려고 만들었습니다. 그래서 아이들이 이미 알고 있는
                곡으로 시작합니다. 지브리와 영화음악으로 한 해를 열고, 바흐는 아이들이 먼저
                궁금해할 때 꺼냅니다.
              </p>
              <p>
                혼자 잘하는 것보다 옆 사람 소리를 듣는 것을 먼저 가르칩니다. 현악 앙상블에서는 그게
                실력입니다. 그리고 준비한 것을 필요한 곳에 가져갑니다. 박수를 받으러 가는 게
                아니라, 음악이 누군가에게 가 닿는 것을 아이들이 직접 보게 하려고 갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 연주한 곡 — 곡 목록은 web/content/repertoire.json 에 있습니다 */}
      <section className="sec sec--dark sec--c" id="repertoire">
        <div className="wrap">
          <Reveal>
            <h2 className="sec__h">지금까지 연주한 곡</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="sec__lead">
              정기 연주회와 자선 공연을 거치며 아이들이 연습한 곡을 모았습니다.
            </p>
          </Reveal>

          <div className="orn" aria-hidden="true">
            <span />
          </div>

          {/* 두 단이 각각 seq 입니다. 왼쪽을 다 훑고 오른쪽으로 넘어가면
              오른쪽 첫 곡이 1초 가까이 늦습니다. 나란히 흘려보냅니다. */}
          <div className="prog">
            <Program pieces={left} />
            <Program pieces={right} />
          </div>

          <div className="orn" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

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
