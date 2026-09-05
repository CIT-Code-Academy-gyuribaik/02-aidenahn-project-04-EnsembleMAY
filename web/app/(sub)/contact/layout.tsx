import type { HeroShot } from "@/components/HeroPhoto";
import SubPageHead from "@/components/SubPageHead";
import { SECTIONS } from "@/lib/nav";

/* Contact 두 갈래가 함께 쓰는 머리 부분입니다.
   히어로와 하위 메뉴 띠는 어느 탭에 있든 같은 자리에 그대로 있고,
   아래 내용만 갈립니다. About·Concert 와 같은 구조입니다 —
   머리 자체의 짜임은 넷이 나눠 씁니다: components/SubPageHead.tsx

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

/* ★ 여기만 사진이 한 장입니다. 들어올 때마다 바뀌지 않고 늘 이 장입니다 —
     한 장짜리 목록은 고를 것이 없어서 서버가 구운 HTML 에 사진이 그대로
     들어갑니다(components/HeroPhoto.tsx). 여러 장으로 늘리고 싶으면 이
     배열에 더하기만 하면 그때부터 번갈아 걸립니다.
   ★ 지휘하는 순간 — 팔을 든 자세와 얼굴이 위쪽 4분의 1 에 있어 pos 를
     25% 로 낮게 잡았습니다. 화질이 낮았던 예전 사진(hero-10)을 새로 고른
     사진으로 갈았습니다. */
const SHOTS: readonly HeroShot[] = [
  {
    src: "/assets/img/hero/hero-12.webp",
    alt: "공연장에서 단원들을 지휘하는 앙상블 메이 지휘자",
    pos: "50% 25%",
    width: 1920,
    height: 1281,
  },
];

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubPageHead section={SEC} shots={SHOTS} />

      {/* sec--first : 위 테두리를 지웁니다. 바로 위 하위 메뉴 띠가 이미
          아래쪽에 헤어라인을 긋고 있어서, 두면 선이 두 겹으로 보입니다. */}
      <section className="sec sec--first">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
