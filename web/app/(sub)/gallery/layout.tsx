import HeroPhoto, { type HeroShot } from "@/components/HeroPhoto";
import SubTabs from "@/components/SubTabs";
import { SECTIONS } from "@/lib/nav";

/* Gallery 두 갈래가 함께 쓰는 머리 부분입니다.
   ★ 원래는 화면 안에서 눌러 바꾸는 탭이었습니다(GalleryBrowser 의 .tabs). */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때 펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.gallery;

/* 히어로에 걸리는 사진 여러 장.
   ★ 뒤 두 장은 갤러리 폴더의 사진을 그대로 씁니다. */
const SHOTS: readonly HeroShot[] = [
  {
    /* 기록을 모아 둔 갈래라 멀리서 찍은 전경 대신 가까이 찍은 한 장. */
    src: "/assets/img/hero/hero-3.webp",
    alt: { kor: "악보를 보며 첼로를 켜는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the cello from the score" },
    pos: "50% 35%",
    width: 1918,
    height: 1079,
  },
  {
    /* 연말 파티. */
    src: "/assets/img/gallery/20251224-yearend-06.webp",
    alt: { kor: "연말 파티에서 모여 앉아 웃는 앙상블 메이 단원들", eng: "Ensemble MAY members laughing together at the year-end party" },
    pos: "50% 30%",
    narrow: true,
    width: 1600,
    height: 1200,
  },
  {
    /* 제2회 정기연주회를 마치고. */
    src: "/assets/img/gallery/20260621-concert2-04.webp",
    alt: { kor: "제2회 정기연주회를 마치고 악기를 든 채 모여 선 앙상블 메이 단원들", eng: "Ensemble MAY members gathered with their instruments after the 2nd Annual Concert" },
    pos: "50% 65%",
    narrow: true,
    width: 860,
    height: 644,
  },
  {
    /* 바이올린을 연주하는 단원 클로즈업, 뒤로 다른 단원들이 흐릿하게 보입니다. */
    src: "/assets/img/hero/hero-25.webp",
    alt: { kor: "바이올린을 연주하는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the violin" },
    pos: "50% 32%",
    width: 1920,
    height: 1281,
  },
  {
    /* 바이올린·첼로를 함께 연주하는 두 단원. */
    src: "/assets/img/hero/hero-26.webp",
    alt: { kor: "바이올린과 첼로를 함께 연주하는 앙상블 메이 단원들", eng: "Ensemble MAY members playing violin and cello together" },
    pos: "50% 26%",
    width: 1920,
    height: 1281,
  },
];

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 히어로 — 오른쪽 절반에 사진이 깔리고, 왼쪽에서 번진 어둠 위에 영문 제목과 한글 제목이 앉습니다. */}
      <div className="phead phead--hero">
        <HeroPhoto shots={SHOTS} />
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">Gallery</span>
            <span className="phead__ko">활동 사진</span>
          </h1>
        </div>
      </div>

      <SubTabs label={SEC.subLabel} tabs={SEC.sub} />

      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
