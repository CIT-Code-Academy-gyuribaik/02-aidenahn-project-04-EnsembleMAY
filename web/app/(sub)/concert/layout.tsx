import HeroPhoto, { type HeroShot } from "@/components/HeroPhoto";
import SubTabs from "@/components/SubTabs";
import { SECTIONS } from "@/lib/nav";

/* Concert 두 갈래가 함께 쓰는 머리 부분입니다. */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때 펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.concert;

/* 히어로에 걸리는 사진 여러 장. */
const SHOTS: readonly HeroShot[] = [
  {
    /* 무대 전경. */
    src: "/assets/img/hero/hero-1.webp",
    alt: { kor: "무대 위에서 지휘자와 함께 합주하는 앙상블 메이 단원들", eng: "Ensemble MAY members playing together on stage with their conductor" },
    pos: "50% 70%",
    width: 1918,
    height: 1079,
  },
  {
    /* 첼로 넷. */
    src: "/assets/img/hero/hero-6.webp",
    alt: { kor: "제1회 정기연주회 무대에서 첼로를 연주하는 앙상블 메이 단원들", eng: "Ensemble MAY cellists on stage at the 1st Annual Concert" },
    pos: "50% 28%",
    width: 1170,
    height: 780,
  },
  {
    /* 바이올린 파트와 지휘자. */
    src: "/assets/img/hero/hero-7.webp",
    alt: { kor: "제1회 정기연주회 무대에서 지휘자와 함께 연주하는 앙상블 메이 단원들", eng: "Ensemble MAY members playing with their conductor at the 1st Annual Concert" },
    pos: "50% 45%",
    width: 1170,
    height: 780,
  },
  {
    /* 무대 전체 — 첼로 둘 + 피아노. */
    src: "/assets/img/hero/hero-19.webp",
    alt: { kor: "그랜드 피아노와 함께 첼로를 연주하는 앙상블 메이 단원들", eng: "Ensemble MAY cellists playing alongside a grand piano" },
    pos: "50% 48%",
    width: 1920,
    height: 1281,
  },
  {
    /* 바이올린 파트가 대각선으로 늘어선 장. */
    src: "/assets/img/hero/hero-20.webp",
    alt: { kor: "나란히 앉아 바이올린을 연주하는 앙상블 메이 단원들", eng: "Ensemble MAY members seated side by side playing the violin" },
    pos: "50% 30%",
    width: 1920,
    height: 1281,
  },
  {
    /* 현악 파트가 늘어선 또 다른 각도. */
    src: "/assets/img/hero/hero-21.webp",
    alt: { kor: "함께 연주하는 앙상블 메이 현악 파트 단원들", eng: "The string players of Ensemble MAY performing together" },
    pos: "50% 25%",
    width: 1920,
    height: 1281,
  },
];

export default function ConcertLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 히어로 — 오른쪽 절반에 사진이 깔리고, 왼쪽에서 번진 어둠 위에 영문 제목과 한글 제목이 앉습니다. */}
      <div className="phead phead--hero">
        <HeroPhoto shots={SHOTS} />
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">Concert</span>
            <span className="phead__ko">공연 안내</span>
          </h1>
        </div>
      </div>

      {/* 띠는 .wrap 밖에 둡니다 — 화면 폭을 다 써야 히어로 아래 경계가 제대로 지어집니다. */}
      <SubTabs label={SEC.subLabel} tabs={SEC.sub} />

      {/* About 과 달리 여기서 .wrap 으로 감싸지 않습니다 — 공연 쪽 내용은 지면 색이 바뀌는 통짜 섹션(틴트 · 어두운 판)이 이어지는 구성이라,
          본문 폭 상자 안에 넣으면 그 색이 가운데 토막으로 잘립니다. */}
      {children}
    </>
  );
}
