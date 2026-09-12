import HeroPhoto, { type HeroShot } from "@/components/HeroPhoto";
import SubTabs from "@/components/SubTabs";
import { SECTIONS } from "@/lib/nav";

/* [주요 연혁] 이 여기 있었습니다. */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때 펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.about;

/* 히어로에 걸리는 사진 여러 장. */
const SHOTS: readonly HeroShot[] = [
  {
    /* 사람이 주인공인 갈래라 합주 장면. */
    src: "/assets/img/hero/hero-2.webp",
    alt: { kor: "합주 중에 서로를 바라보며 웃는 앙상블 메이 단원들", eng: "Ensemble MAY members smiling at one another during rehearsal" },
    pos: "50% 32%",
    width: 1918,
    height: 1079,
  },
  {
    /* 창단 공연을 마치고 무대에 선 열세 명.
       ★ 62% 입니다. */
    src: "/assets/img/hero/hero-8.webp",
    alt: { kor: "제1회 정기연주회를 마치고 무대에 나란히 선 앙상블 메이 단원들", eng: "Ensemble MAY members lined up on stage after the 1st Annual Concert" },
    pos: "50% 62%",
    width: 1278,
    height: 853,
  },
  {
    /* 흰 배경 스튜디오 단체 사진.
       ★ 아이들이 얼마나 크게 보이는지는 이 사진의 폭이 정합니다. */
    src: "/assets/img/hero/hero-11.webp",
    alt: { kor: "악기를 들고 모여 앉은 앙상블 메이 단원들", eng: "Ensemble MAY members seated together with their instruments" },
    pos: "50% 40%",
    band: true,
    light: true,
    width: 2829,
    height: 960,
  },
  {
    /* 피아노를 치는 단원 옆으로 바이올린이 흐릿하게 걸칩니다 — 합주 중 한순간. */
    src: "/assets/img/hero/hero-15.webp",
    alt: { kor: "피아노를 연주하는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the piano" },
    pos: "50% 24%",
    width: 1920,
    height: 1280,
  },
  {
    /* 첼로를 켜는 단원 클로즈업. */
    src: "/assets/img/hero/hero-16.webp",
    alt: { kor: "첼로를 연주하는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the cello" },
    pos: "50% 32%",
    width: 1920,
    height: 1281,
  },
  {
    /* 레이스 드레스를 입고 첼로를 연주하는 단원. */
    src: "/assets/img/hero/hero-17.webp",
    alt: { kor: "무대 의상을 입고 첼로를 연주하는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the cello in concert dress" },
    pos: "50% 30%",
    width: 1920,
    height: 1281,
  },
  {
    /* 나란히 앉아 연주하는 세 단원 — 함께한다는 느낌이 강한 장. */
    src: "/assets/img/hero/hero-18.webp",
    alt: { kor: "나란히 앉아 바이올린을 연주하는 앙상블 메이 단원들", eng: "Ensemble MAY members seated side by side playing the violin" },
    pos: "50% 26%",
    width: 1920,
    height: 1281,
  },
];

/* About 두 갈래가 함께 쓰는 머리 부분입니다. */

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 히어로 — 오른쪽 절반에 사진이 깔리고, 왼쪽에서 번진 어둠 위에 영문 제목과 한글 제목이 앉습니다. */}
      <div className="phead phead--hero">
        <HeroPhoto shots={SHOTS} />
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">About</span>
            <span className="phead__ko">앙상블 소개</span>
          </h1>
        </div>
      </div>

      {/* 띠는 .wrap 밖에 둡니다 — 화면 폭을 다 써야 히어로 아래 경계가 제대로 지어집니다. */}
      <SubTabs label={SEC.subLabel} tabs={SEC.sub} />

      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
