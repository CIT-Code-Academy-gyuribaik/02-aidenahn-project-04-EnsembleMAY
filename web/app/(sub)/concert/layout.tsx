import HeroPhoto, { type HeroShot } from "@/components/HeroPhoto";
import SubTabs from "@/components/SubTabs";
import { SECTIONS } from "@/lib/nav";

const SEC = SECTIONS.concert;

const SHOTS: readonly HeroShot[] = [
  {
    src: "/assets/img/hero/hero-1.webp",
    alt: { kor: "무대 위에서 지휘자와 함께 합주하는 앙상블 메이 단원들", eng: "Ensemble M.A.Y. members playing together on stage with their conductor" },
    pos: "50% 70%",
    width: 1918,
    height: 1079,
  },
  {
    src: "/assets/img/hero/hero-6.webp",
    alt: { kor: "제1회 정기연주회 무대에서 첼로를 연주하는 앙상블 메이 단원들", eng: "Ensemble M.A.Y. cellists on stage at the 1st Annual Concert" },
    pos: "50% 28%",
    width: 1170,
    height: 780,
  },
  {
    src: "/assets/img/hero/hero-7.webp",
    alt: { kor: "제1회 정기연주회 무대에서 지휘자와 함께 연주하는 앙상블 메이 단원들", eng: "Ensemble M.A.Y. members playing with their conductor at the 1st Annual Concert" },
    pos: "50% 45%",
    width: 1170,
    height: 780,
  },
  {
    src: "/assets/img/hero/hero-19.webp",
    alt: { kor: "그랜드 피아노와 함께 첼로를 연주하는 앙상블 메이 단원들", eng: "Ensemble M.A.Y. cellists playing alongside a grand piano" },
    pos: "50% 48%",
    width: 1920,
    height: 1281,
  },
  {
    src: "/assets/img/hero/hero-20.webp",
    alt: { kor: "나란히 앉아 바이올린을 연주하는 앙상블 메이 단원들", eng: "Ensemble M.A.Y. members seated side by side playing the violin" },
    pos: "50% 30%",
    width: 1920,
    height: 1281,
  },
  {
    src: "/assets/img/hero/hero-21.webp",
    alt: { kor: "함께 연주하는 앙상블 메이 현악 파트 단원들", eng: "The string players of Ensemble M.A.Y. performing together" },
    pos: "50% 25%",
    width: 1920,
    height: 1281,
  },
];

export default function ConcertLayout({ children }: { children: React.ReactNode }) {
  return (
    <>

      <div className="phead phead--hero">
        <HeroPhoto shots={SHOTS} />
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">Concert</span>
            <span className="phead__ko">공연 안내</span>
          </h1>
        </div>
      </div>

      <SubTabs label={SEC.subLabel} tabs={SEC.sub} />

      {children}
    </>
  );
}
