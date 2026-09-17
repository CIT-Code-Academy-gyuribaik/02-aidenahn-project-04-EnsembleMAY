import HeroPhoto, { type HeroShot } from "@/components/HeroPhoto";
import SubTabs from "@/components/SubTabs";
import { SECTIONS } from "@/lib/nav";

const SEC = SECTIONS.about;

const SHOTS: readonly HeroShot[] = [
  {
    src: "/assets/img/hero/hero-2.webp",
    alt: { kor: "합주 중에 서로를 바라보며 웃는 앙상블 메이 단원들", eng: "Ensemble MAY members smiling at one another during rehearsal" },
    pos: "50% 32%",
    width: 1918,
    height: 1079,
  },
  {
    src: "/assets/img/hero/hero-8.webp",
    alt: { kor: "제1회 정기연주회를 마치고 무대에 나란히 선 앙상블 메이 단원들", eng: "Ensemble MAY members lined up on stage after the 1st Annual Concert" },
    pos: "50% 62%",
    width: 1278,
    height: 853,
  },
  {
    src: "/assets/img/hero/hero-11.webp",
    alt: { kor: "악기를 들고 모여 앉은 앙상블 메이 단원들", eng: "Ensemble MAY members seated together with their instruments" },
    pos: "50% 40%",
    band: true,
    light: true,
    width: 2829,
    height: 960,
  },
  {
    src: "/assets/img/hero/hero-15.webp",
    alt: { kor: "피아노를 연주하는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the piano" },
    pos: "50% 24%",
    width: 1920,
    height: 1280,
  },
  {
    src: "/assets/img/hero/hero-16.webp",
    alt: { kor: "첼로를 연주하는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the cello" },
    pos: "50% 32%",
    width: 1920,
    height: 1281,
  },
  {
    src: "/assets/img/hero/hero-17.webp",
    alt: { kor: "무대 의상을 입고 첼로를 연주하는 앙상블 메이 단원", eng: "An Ensemble MAY member playing the cello in concert dress" },
    pos: "50% 30%",
    width: 1920,
    height: 1281,
  },
  {
    src: "/assets/img/hero/hero-18.webp",
    alt: { kor: "나란히 앉아 바이올린을 연주하는 앙상블 메이 단원들", eng: "Ensemble MAY members seated side by side playing the violin" },
    pos: "50% 26%",
    width: 1920,
    height: 1281,
  },
];

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>

      <div className="phead phead--hero">
        <HeroPhoto shots={SHOTS} />
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">About</span>
            <span className="phead__ko">앙상블 소개</span>
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
