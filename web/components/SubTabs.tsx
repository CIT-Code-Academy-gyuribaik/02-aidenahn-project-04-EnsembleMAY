"use client";

/* ==========================================================================
   서브페이지 하위 메뉴 띠 — About 과 Concert 가 함께 씁니다

   탭처럼 보이지만 실제로는 페이지 이동입니다. 그래서
     · 각 갈래가 자기 주소를 갖습니다 (/about/story/ 처럼)
     · 검색에 따로 잡히고, 링크로 바로 보낼 수 있습니다
     · 뒤로 가기가 갈래 단위로 동작합니다
   한 페이지 안에서 감췄다 보였다 하면 셋 다 안 됩니다.

   화면 폭을 다 쓰는 띠입니다(.wrap 밖). 안쪽 항목만 본문 폭에 맞춥니다 —
   히어로가 화면 폭을 다 쓰는 사진 블록이라, 그 아래에 폭이 좁은 줄이
   놓이면 경계가 흐려집니다.

   ★ About 전용이던 것을 둘이 나눠 쓰게 고쳤습니다. 띠 높이와 글자 크기를
     "똑같이" 맞추라는 요구가 있었는데, 복사해 두면 한쪽만 고치는 날이
     옵니다. 컴포넌트 하나에 CSS(.abt) 하나면 어긋날 자리가 없습니다.
     클래스 이름이 abt(=about) 인 것은 태어난 자리가 About 이라서일 뿐,
     지금은 서브페이지 공용입니다.
   ========================================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubTab, NavLabel } from "@/lib/nav";
import { useLang } from "@/lib/lang";

/* 갈래 목록 자체는 lib/nav.ts 에 있습니다 — 상단 바도 같은 것을 봅니다.
   여기서는 그리기만 합니다. */
export type { SubTab };

export default function SubTabs({
  label,
  tabs,
}: {
  label: NavLabel;
  tabs: readonly SubTab[];
}) {
  const pathname = usePathname();
  const { lang } = useLang();

  /* 첫 갈래는 뿌리 주소 자체입니다(/about/ · /concert/). 뿌리는 모든 하위
     주소의 앞부분이라, 그것만 "정확히 같은지" 봐야 합니다. 앞부분만 맞으면
     된다고 두면 /concert/past/ 에서도 [공연 정보] 가 함께 켜집니다. */
  const root = tabs[0]?.href;

  return (
    <nav className="abt" aria-label={label[lang]}>
      <div className="abt__in">
        {tabs.map((t) => {
          const here = t.href === root ? pathname === t.href : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="abt__b"
              aria-current={here ? "page" : undefined}
            >
              {t.label[lang]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
