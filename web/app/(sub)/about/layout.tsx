import AboutTabs from "@/components/AboutTabs";

/* About 네 갈래가 함께 쓰는 머리 부분입니다.
   히어로와 하위 메뉴 바는 어느 탭에 있든 같은 자리에 그대로 있고,
   아래 내용만 갈립니다. Next 의 layout 이 딱 이 일을 합니다 —
   탭을 옮겨도 이 부분은 다시 그리지 않습니다. */

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 제목 블록 위에 단체 사진을 깔았습니다.
          사진은 왼쪽이 비어 있고 오른쪽에 단원들이 서 있는 가로로 긴 컷이라,
          넓은 화면에서는 글이 왼쪽 여백에 앉고 사진은 잘리지 않습니다.
          배경이 아니라 <img> 인 이유 — 단원 사진은 장식이 아니라 내용이라
          alt 가 필요하고, 첫 화면 그림이라 우선순위도 올려야 합니다. */}
      <div className="phead phead--hero">
        <div className="wrap">
          <h1>
            음악을 사랑하는 아이들이
            <br />
            만들어 가는 현악 앙상블입니다.
          </h1>
          <p>We practice sharing and service through music.</p>
        </div>
        <div className="phead__ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/about-hero.webp"
            width={2400}
            height={585}
            alt="흰 셔츠를 입고 나란히 선 앙상블 메이 단원들"
            fetchPriority="high"
          />
        </div>
      </div>

      <section className="sec sec--first">
        <div className="wrap">
          <AboutTabs />
          {children}
        </div>
      </section>
    </>
  );
}
