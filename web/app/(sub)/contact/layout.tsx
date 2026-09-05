import SubTabs from "@/components/SubTabs";
import { SECTIONS } from "@/lib/nav";

/* Contact 두 갈래가 함께 쓰는 머리 부분입니다.
   히어로와 하위 메뉴 띠는 어느 탭에 있든 같은 자리에 그대로 있고,
   아래 내용만 갈립니다. About·Concert 와 같은 구조입니다.

   ── 갈래를 이렇게 나눈 이유 ──
     입단 문의      연주를 시작하고 싶은 아이 · 학부모가 오는 길.
     자선 공연 문의  학교 · 복지관 · 지역 행사에서 연주를 청하는 쪽이 오는 길.
   적어 보낼 것(나이·악기 vs 날짜·장소)이 서로 달라, 한 화면에 나란히 두면
   자기 것을 찾는 데 한 번 더 눈이 오갔습니다. About·Concert 처럼 각자
   주소를 갖는 편이 검색에도, 링크로 바로 보내기에도 낫습니다.

   두 갈래 다 같은 섹션 틀(sec--first, 배경은 흰색)을 쓰므로, About 처럼 이
   layout 이 그 틀을 한 번만 두르고 각 page.tsx 는 안쪽 내용만 냅니다. */
/* 갈래 목록은 lib/nav.ts 한 곳에 있습니다 — 상단 바가 마우스를 올렸을 때
   펼치는 것도 같은 목록입니다. */
const SEC = SECTIONS.contact;

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 히어로 — About · Concert · Gallery 와 같은 짜임입니다.
          오른쪽 절반에 사진이 깔리고, 왼쪽에서 번진 어둠 위에 영문·한글
          제목이 앉습니다. 규칙은 style.css 의 [사진을 깐 제목 블록] 한 곳에.

          ★ 여기는 사진이 한 장이라 components/HeroPhoto.tsx 를 쓰지 않고
            <img> 를 그대로 그립니다 — 서버가 미리 그려 두는 편이 첫 화면이
            빠릅니다. 여러 장으로 늘리게 되면 그때 HeroPhoto 로 바꾸세요.
          ★ 지휘하는 순간 — 팔을 든 자세와 얼굴이 위쪽 4분의 1 에 있어
            --ph-pos 를 25% 로 낮게 잡았습니다. 화질이 낮았던 예전 사진
            (hero-10)을 새로 고른 사진으로 갈았습니다. */}
      <div className="phead phead--hero">
        <div className="phead__ph" style={{ ["--ph-pos" as string]: "50% 25%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/hero/hero-12.webp"
            width={1920}
            height={1281}
            alt="공연장에서 단원들을 지휘하는 앙상블 메이 지휘자"
            fetchPriority="high"
          />
        </div>
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">Contact</span>
            <span className="phead__ko">문의하기</span>
          </h1>
        </div>
      </div>

      {/* 띠는 .wrap 밖에 둡니다 — 화면 폭을 다 써야 히어로 아래 경계가
          제대로 지어집니다. About·Concert 와 같은 컴포넌트라 높이와
          글자 크기가 저절로 같습니다. */}
      <SubTabs label={SEC.subLabel} tabs={SEC.sub} />

      {/* sec--first : 위 테두리를 지웁니다. 바로 위 하위 메뉴 띠가 이미
          아래쪽에 헤어라인을 긋고 있어서, 두면 선이 두 겹으로 보입니다. */}
      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
