import HeroPhoto, { type HeroShot } from "@/components/HeroPhoto";
import SubTabs from "@/components/SubTabs";
import { SECTIONS } from "@/lib/nav";

const SEC = SECTIONS.gallery;

const SHOTS: readonly HeroShot[] = [
  {
    src: "/assets/img/hero/hero-3.webp",
    alt: { kor: "악보를 보며 첼로를 켜는 앙상블 메이 단원", eng: "An Ensemble M.A.Y. member playing the cello from the score" },
    pos: "50% 35%",
    width: 1918,
    height: 1079,
  },
  {
    src: "/assets/img/gallery/20251224-yearend-06.webp",
    alt: { kor: "연말 파티에서 모여 앉아 웃는 앙상블 메이 단원들", eng: "Ensemble M.A.Y. members laughing together at the year-end party" },
    pos: "50% 30%",
    narrow: true,
    width: 1600,
    height: 1200,
  },
  {
    src: "/assets/img/gallery/20260621-concert2-04.webp",
    alt: { kor: "제2회 정기연주회를 마치고 악기를 든 채 모여 선 앙상블 메이 단원들", eng: "Ensemble M.A.Y. members gathered with their instruments after the 2nd Annual Concert" },
    pos: "50% 65%",
    narrow: true,
    width: 860,
    height: 644,
  },
  {
    src: "/assets/img/hero/hero-25.webp",
    alt: { kor: "바이올린을 연주하는 앙상블 메이 단원", eng: "An Ensemble M.A.Y. member playing the violin" },
    pos: "50% 32%",
    width: 1920,
    height: 1281,
  },
  {
    src: "/assets/img/hero/hero-26.webp",
    alt: { kor: "바이올린과 첼로를 함께 연주하는 앙상블 메이 단원들", eng: "Ensemble M.A.Y. members playing violin and cello together" },
    pos: "50% 26%",
    width: 1920,
    height: 1281,
  },
];

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>

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
