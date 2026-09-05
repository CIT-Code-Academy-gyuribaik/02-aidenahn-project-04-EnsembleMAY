import type { HeroShot } from "@/components/HeroPhoto";
import SubPageHead from "@/components/SubPageHead";
import { SECTIONS } from "@/lib/nav";

/* [주요 연혁] 이 여기 있었습니다. 그 갈래는 shows.json 을 그대로 세로로
   늘어놓은 것이라 Concert 페이지와 같은 내용이었습니다 — 같은 기록을
   두 군데에 두면 한쪽만 고치는 일이 생깁니다. 공연 기록은 Concert 로
   모았습니다. */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때
   펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.about;

/* 히어로에 걸리는 사진 여러 장. 들어올 때마다 이 중 하나가 나옵니다 —
   고르는 방법과 그 이유는 components/HeroPhoto.tsx 에 적었습니다.
   pos 는 사진의 어디를 보여줄지입니다. 사진 칸이 사진보다 훨씬 납작해서
   세로로 절반쯤 잘리므로, 얼굴이 살아남는 높이를 장마다 따로 잡습니다. */
const SHOTS: readonly HeroShot[] = [
  {
    /* 사람이 주인공인 갈래라 합주 장면. 아이들이 오른쪽에 치우쳐 있습니다. */
    src: "/assets/img/hero/hero-2.webp",
    alt: "합주 중에 서로를 바라보며 웃는 앙상블 메이 단원들",
    pos: "50% 32%",
    width: 1918,
    height: 1079,
  },
  {
    /* 창단 공연을 마치고 무대에 선 열세 명. 사람이 사진 아래 3분의 2 에
       몰려 있어 아래쪽으로 내렸습니다 — 그냥 두면 빈 나무벽만 보입니다.
       ★ 62% 입니다. 사람이 차지하는 세로가 52.4%, 띠에 보이는 세로가
         54.1% — 위아래 여유를 합쳐 1.7% 뿐인 사진이라, 처음 값(72%)에서는
         뒷줄 머리가 띠 윗변에 3px 차이로 붙어 있었습니다. 여기서는 머리
         위로 25px 이 열리고 대신 신발이 발목께에서 잘립니다. 이 사진은
         둘 중 하나만 됩니다 — 머리를 살리면 발이 잘립니다. */
    src: "/assets/img/hero/hero-8.webp",
    alt: "제1회 정기연주회를 마치고 무대에 나란히 선 앙상블 메이 단원들",
    pos: "50% 62%",
    width: 1278,
    height: 853,
  },
  {
    /* 흰 배경 스튜디오 단체 사진. 이 장만 왼쪽 여백까지 함께 그려 둔 넓은
       사진(2.95:1)입니다 — 단원들은 오른쪽 47.5% 에 있고 나머지는 사진의
       뒷배경(#D3D6DF)이 그대로 이어집니다. 그래서
         · band 로 칸을 띠 전체로 넓히고(절반으로 자르면 왼쪽 빈 회색만
           보입니다),
         · light 로 어둠을 걷고 지면을 사진 뒷배경과 같은 색으로 맞춥니다
           — 제목은 검정으로 바뀝니다.
       ★ 아이들이 얼마나 크게 보이는지는 이 사진의 폭이 정합니다.
         띠 안에서 아이들이 차지하는 비율 = 사진 속 아이들 폭 ÷ 사진 폭.
         왼쪽 빈 회색을 더 붙이면 폭이 늘어 아이들이 작아지고, 잘라내면
         커집니다. 지금은 47.5% 에 맞춰 왼쪽을 잘라 둔 상태입니다.
       pos 의 40% 는 세로 자리입니다. 띠가 사진보다 훨씬 납작해서 세로는
       절반쯤(51~53%)만 보입니다. 40% 면 뒷줄 머리 바로 위에서 시작해
       앞줄 무릎께에서 끊깁니다 — 얼굴 열세 개가 전부 살아남는 구간입니다.
       발끝까지 넣으려면 사진 폭을 다시 늘려야 합니다(= 아이들이 작아집니다). */
    src: "/assets/img/hero/hero-11.webp",
    alt: "악기를 들고 모여 앉은 앙상블 메이 단원들",
    pos: "50% 40%",
    band: true,
    light: true,
    width: 2829,
    height: 960,
  },
  {
    /* 피아노를 치는 단원 옆으로 바이올린이 흐릿하게 걸칩니다 — 합주 중
       한순간. 얼굴이 위쪽 4분의 1 에 있어 낮게 잡았습니다. */
    src: "/assets/img/hero/hero-15.webp",
    alt: "피아노를 연주하는 앙상블 메이 단원",
    pos: "50% 24%",
    width: 1920,
    height: 1280,
  },
  {
    /* 첼로를 켜는 단원 클로즈업. 얼굴이 위쪽에 몰려 있습니다. */
    src: "/assets/img/hero/hero-16.webp",
    alt: "첼로를 연주하는 앙상블 메이 단원",
    pos: "50% 32%",
    width: 1920,
    height: 1281,
  },
  {
    /* 레이스 드레스를 입고 첼로를 연주하는 단원. 위쪽 3분의 1 에 얼굴이 있습니다. */
    src: "/assets/img/hero/hero-17.webp",
    alt: "무대 의상을 입고 첼로를 연주하는 앙상블 메이 단원",
    pos: "50% 30%",
    width: 1920,
    height: 1281,
  },
  {
    /* 나란히 앉아 연주하는 세 단원 — 함께한다는 느낌이 강한 장. */
    src: "/assets/img/hero/hero-18.webp",
    alt: "나란히 앉아 바이올린을 연주하는 앙상블 메이 단원들",
    pos: "50% 26%",
    width: 1920,
    height: 1281,
  },
];

/* About 두 갈래가 함께 쓰는 머리 부분입니다.
   히어로와 하위 메뉴 바는 어느 탭에 있든 같은 자리에 그대로 있고,
   아래 내용만 갈립니다. Next 의 layout 이 딱 이 일을 합니다 —
   탭을 옮겨도 이 부분은 다시 그리지 않습니다.
   머리 자체의 짜임은 넷이 나눠 씁니다: components/SubPageHead.tsx */

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubPageHead section={SEC} shots={SHOTS} />

      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
