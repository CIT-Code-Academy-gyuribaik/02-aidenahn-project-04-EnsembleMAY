import HeroSlideshow from "@/components/HeroSlideshow";

/* 홈 — 아직 히어로만 옮겼습니다.
   나머지 네 칸(영상 · 단원 · 갤러리 · CTA)과 섹션 스냅 스크롤은
   이어서 붙입니다. */

export default function HomePage() {
  return (
    <section className="hero">
      <HeroSlideshow />
      <div className="hero__veil" />
      <div className="hero__body">
        <p className="eyebrow">Ensemble MAY</p>
        <h1 className="hero__lines">
          음악을 사랑하는 아이들이
          <br />
          만들어 가는 현악 앙상블입니다.
        </h1>
        <p className="hero__en">We practice sharing and service through music.</p>
      </div>
    </section>
  );
}
