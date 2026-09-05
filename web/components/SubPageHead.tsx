import HeroPhoto, { type HeroShot } from "@/components/HeroPhoto";
import SubTabs from "@/components/SubTabs";
import type { NavItem } from "@/lib/nav";

/* ==========================================================================
   서브페이지의 머리 — 히어로 + 하위 메뉴 띠

   About · Concert · Gallery · Contact 넷이 같은 머리를 씁니다. 갈래를
   옮겨도 이 부분은 그 자리에 그대로 있고 아래 내용만 갈립니다 —
   Next 의 layout 이 딱 이 일을 합니다.

   ★ 넉 장의 layout.tsx 가 이 마크업을 각자 들고 있었습니다.
     .phead 열 줄과 SubTabs 한 줄이 네 벌이라, 히어로의 짜임을 고칠 일이
     생기면 네 군데를 함께 고쳐야 했습니다. 실제로 Contact 만 사진을
     <img> 로 직접 그리고 있어서 나머지 셋과 조금씩 달라져 있었습니다.
     SubTabs 를 About·Concert 가 나눠 쓰게 고쳤던 것과 같은 이유입니다.

   ★ 제목은 lib/nav.ts 에서 옵니다.
     영문(label)도 한글(ko)도 상단 바가 보는 그 목록에 있습니다 —
     갈래 이름을 고치면 상단 바와 히어로가 함께 따라옵니다.

   ★ 사진은 각 layout.tsx 가 넘깁니다.
     어느 장을 어느 높이로 걸지는 그 갈래를 아는 사람이 정할 일이라
     페이지 옆에 두는 편이 낫습니다 — 장마다 붙은 긴 설명이 그 판단의
     기록입니다. 여러 장이면 들어올 때마다 한 장이 걸리고, 한 장이면
     그 장으로 고정됩니다(components/HeroPhoto.tsx).
   ========================================================================== */

export default function SubPageHead({
  section,
  shots,
}: {
  /** SECTIONS.about 처럼 lib/nav.ts 의 갈래 하나 */
  section: Required<NavItem>;
  shots: readonly HeroShot[];
}) {
  return (
    <>
      {/* 히어로 — 오른쪽 절반에 사진이 깔리고, 왼쪽에서 번진 어둠 위에
          영문 제목과 한글 제목이 앉습니다. 짜임은 style.css 의
          [사진을 깐 제목 블록] 한 곳에 있습니다. */}
      <div className="phead phead--hero">
        <HeroPhoto shots={shots} />
        <div className="wrap">
          <h1 className="phead__ttl">
            <span className="phead__en">{section.label}</span>
            <span className="phead__ko">{section.ko}</span>
          </h1>
        </div>
      </div>

      {/* 띠는 .wrap 밖에 둡니다 — 화면 폭을 다 써야 히어로 아래 경계가
          제대로 지어집니다. 안쪽 항목만 본문 폭에 맞춥니다. */}
      <SubTabs label={section.subLabel} tabs={section.sub} />
    </>
  );
}
