import type { HeroShot } from "@/components/HeroPhoto";
import SubPageHead from "@/components/SubPageHead";
import { SECTIONS } from "@/lib/nav";

/* Gallery 두 갈래가 함께 쓰는 머리 부분입니다. About · Concert 와 같은 구조.

   ★ 원래는 화면 안에서 눌러 바꾸는 탭이었습니다(GalleryBrowser 의 .tabs).
     주소를 가진 탭으로 올린 이유는 About 과 같습니다 —
       · 영상 목록이 검색에 따로 잡힙니다
       · "영상 보여줄게" 하고 링크를 보낼 수 있습니다
       · 뒤로 가기가 갈래 단위로 동작합니다
     예전 주소 /gallery/#videos 가 여러 곳에 들어 있었는데, 그것도
     따지고 보면 "영상에 주소를 주고 싶다" 는 뜻이었습니다.        */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때
   펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.gallery;

/* 히어로에 걸리는 사진 여러 장. 들어올 때마다 이 중 하나가 나옵니다 —
   고르는 방법과 그 이유는 components/HeroPhoto.tsx 에 적었습니다.
   ★ 뒤 두 장은 갤러리 폴더의 사진을 그대로 씁니다. 히어로용으로 따로
     복사해 두지 않는 이유 — 같은 파일을 갤러리 격자도 부르므로, 복사본을
     만들면 같은 그림을 두 번 내려받게 됩니다.
   pos 는 사진의 어디를 보여줄지입니다. 사진 칸이 사진보다 훨씬 납작해서
   세로로 절반쯤 잘리므로, 얼굴이 살아남는 높이를 장마다 따로 잡습니다. */
const SHOTS: readonly HeroShot[] = [
  {
    /* 기록을 모아 둔 갈래라 멀리서 찍은 전경 대신 가까이 찍은 한 장.
       결이 살아 있어서 넓게 잘라도 허전하지 않습니다. */
    src: "/assets/img/hero/hero-3.webp",
    alt: "악보를 보며 첼로를 켜는 앙상블 메이 단원",
    pos: "50% 35%",
    width: 1918,
    height: 1079,
  },
  {
    /* 연말 파티. 뒷줄 머리가 위쪽 8%, 앞줄 앉은 아이들 아래가 90% 입니다.
       세로로 73% 가 보이므로 30% 에 맞추면 8~81% 가 들어옵니다 — 앞줄
       얼굴이 아래 모서리에서 잘리던 것이 이 값으로 해결됩니다. */
    src: "/assets/img/gallery/20251224-yearend-06.webp",
    alt: "연말 파티에서 모여 앉아 웃는 앙상블 메이 단원들",
    pos: "50% 30%",
    narrow: true,
    width: 1600,
    height: 1200,
  },
  {
    /* 제2회 정기연주회를 마치고. 위쪽 5분의 1 이 천장과 모니터라 보여 줄
       것이 없습니다. 65% 로 내려 얼굴과 몸이 들어오게 하고 천장을 잘라냅니다. */
    src: "/assets/img/gallery/20260621-concert2-04.webp",
    alt: "제2회 정기연주회를 마치고 악기를 든 채 모여 선 앙상블 메이 단원들",
    pos: "50% 65%",
    narrow: true,
    width: 860,
    height: 644,
  },
  {
    /* 바이올린을 연주하는 단원 클로즈업, 뒤로 다른 단원들이 흐릿하게 보입니다. */
    src: "/assets/img/hero/hero-25.webp",
    alt: "바이올린을 연주하는 앙상블 메이 단원",
    pos: "50% 32%",
    width: 1920,
    height: 1281,
  },
  {
    /* 바이올린·첼로를 함께 연주하는 두 단원. */
    src: "/assets/img/hero/hero-26.webp",
    alt: "바이올린과 첼로를 함께 연주하는 앙상블 메이 단원들",
    pos: "50% 26%",
    width: 1920,
    height: 1281,
  },
];

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubPageHead section={SEC} shots={SHOTS} />

      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
