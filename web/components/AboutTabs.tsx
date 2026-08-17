"use client";

/* ==========================================================================
   About 하위 메뉴 바

   탭처럼 보이지만 실제로는 페이지 이동입니다. 그래서
     · 각 탭이 자기 주소를 갖습니다 (/about/director/ 처럼)
     · 검색에 따로 잡히고, 링크로 바로 보낼 수 있습니다
     · 뒤로 가기가 탭 단위로 동작합니다
   한 페이지 안에서 감췄다 보였다 하면 셋 다 안 됩니다.

   갤러리의 탭(.tabs)과 같은 생김새를 씁니다 — 사이트 안에서 "고르는 자리"가
   두 번째로 나오는 것이라, 다르게 생기면 새로 배워야 합니다.
   ========================================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/about/", label: "단원" },
  { href: "/about/director/", label: "단장" },
  { href: "/about/history/", label: "주요 연혁" },
  { href: "/about/story/", label: "앙상블메이 스토리" },
] as const;

export default function AboutTabs() {
  const pathname = usePathname();

  return (
    <div className="tabbar">
      <div className="tabs" role="tablist" aria-label="앙상블 소개">
        {TABS.map((t) => {
          /* 단원은 /about/ 자체라, 다른 탭의 주소가 여기에 걸리지 않도록
             정확히 같은지 봅니다. 나머지는 앞부분만 맞으면 됩니다. */
          const here = t.href === "/about/" ? pathname === "/about/" : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={"tabs__b" + (here ? " is-on" : "")}
              role="tab"
              aria-selected={here}
              aria-current={here ? "page" : undefined}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
