import type { HeroShot } from "@/components/HeroPhoto";
import SubPageHead from "@/components/SubPageHead";
import { SECTIONS } from "@/lib/nav";

/* Concert 두 갈래가 함께 쓰는 머리 부분입니다.
   히어로와 하위 메뉴 띠는 어느 탭에 있든 같은 자리에 그대로 있고,
   아래 내용만 갈립니다. About 과 같은 구조입니다.

   ── 갈래를 이렇게 나눈 이유 ──
     공연 정보  지금 이 앙상블이 어떤 공연을 하는가 — 정기 · 자선,
                무슨 곡을 연주해 왔는가, 그리고 부르고 싶을 때 어디로.
     공연 연혁  언제 무슨 공연을 했는가 — 기록과 포스터.
   앞은 "앞으로 만날 공연", 뒤는 "이미 지나간 공연" 입니다.        */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때
   펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.concert;

/* 히어로에 걸리는 사진 여러 장. 들어올 때마다 이 중 하나가 나옵니다.
   pos 는 사진의 어디를 보여줄지입니다 — 사진 칸이 사진보다 훨씬 납작해서
   세로가 잘리므로, 얼굴이 잘리지 않는 높이를 장마다 따로 잡습니다. */
const SHOTS: readonly HeroShot[] = [
  {
    /* 무대 전경. 단원이 사진 아래쪽에 앉아 있어 70% 로 내렸습니다 —
       그냥 두면 빈 천장만 보입니다. */
    src: "/assets/img/hero/hero-1.webp",
    alt: "무대 위에서 지휘자와 함께 합주하는 앙상블 메이 단원들",
    pos: "50% 70%",
    width: 1918,
    height: 1079,
  },
  {
    /* 첼로 넷. 얼굴이 사진 위쪽 5분의 1 에 몰려 있어 28% 로 올렸습니다. */
    src: "/assets/img/hero/hero-6.webp",
    alt: "제1회 정기연주회 무대에서 첼로를 연주하는 앙상블 메이 단원들",
    pos: "50% 28%",
    width: 1170,
    height: 780,
  },
  {
    /* 바이올린 파트와 지휘자. 얼굴이 한가운데 조금 위라 45% 입니다. */
    src: "/assets/img/hero/hero-7.webp",
    alt: "제1회 정기연주회 무대에서 지휘자와 함께 연주하는 앙상블 메이 단원들",
    pos: "50% 45%",
    width: 1170,
    height: 780,
  },
  {
    /* 무대 전체 — 첼로 둘 + 피아노. 사람이 아래쪽 절반에 있어 48% 로 잡았습니다. */
    src: "/assets/img/hero/hero-19.webp",
    alt: "그랜드 피아노와 함께 첼로를 연주하는 앙상블 메이 단원들",
    pos: "50% 48%",
    width: 1920,
    height: 1281,
  },
  {
    /* 바이올린 파트가 대각선으로 늘어선 장. */
    src: "/assets/img/hero/hero-20.webp",
    alt: "나란히 앉아 바이올린을 연주하는 앙상블 메이 단원들",
    pos: "50% 30%",
    width: 1920,
    height: 1281,
  },
  {
    /* 현악 파트가 늘어선 또 다른 각도. */
    src: "/assets/img/hero/hero-21.webp",
    alt: "함께 연주하는 앙상블 메이 현악 파트 단원들",
    pos: "50% 25%",
    width: 1920,
    height: 1281,
  },
];

export default function ConcertLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubPageHead section={SEC} shots={SHOTS} />

      {/* About 과 달리 여기서 .wrap 으로 감싸지 않습니다 — 공연 쪽 내용은
          지면 색이 바뀌는 통짜 섹션(틴트 · 어두운 판)이 이어지는 구성이라,
          본문 폭 상자 안에 넣으면 그 색이 가운데 토막으로 잘립니다.
          각 페이지가 자기 <section> 을 그대로 내놓습니다. */}
      {children}
    </>
  );
}
