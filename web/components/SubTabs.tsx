"use client";

/* 서브페이지 하위 메뉴 띠 — About 과 Concert 가 함께 씁니다 탭처럼 보이지만 실제로는 페이지 이동입니다.
   ★ About 전용이던 것을 둘이 나눠 쓰게 고쳤습니다. */

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubTab, NavLabel } from "@/lib/nav";
import { useLang } from "@/lib/lang";

/* 갈래 목록 자체는 lib/nav.ts 에 있습니다 — 상단 바도 같은 것을 봅니다. */
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

  /* 첫 갈래는 뿌리 주소 자체입니다(/about/ · /concert/). */
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
