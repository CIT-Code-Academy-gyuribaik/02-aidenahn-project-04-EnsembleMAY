"use client";

/* ==========================================================================
   About 하위 메뉴 띠

   탭처럼 보이지만 실제로는 페이지 이동입니다. 그래서
     · 각 갈래가 자기 주소를 갖습니다 (/about/director/ 처럼)
     · 검색에 따로 잡히고, 링크로 바로 보낼 수 있습니다
     · 뒤로 가기가 갈래 단위로 동작합니다
   한 페이지 안에서 감췄다 보였다 하면 셋 다 안 됩니다.

   화면 폭을 다 쓰는 띠입니다(.wrap 밖). 안쪽 항목만 본문 폭에 맞춥니다 —
   히어로가 화면 폭을 다 쓰는 사진 블록이라, 그 아래에 폭이 좁은 줄이
   놓이면 경계가 흐려집니다.
   ========================================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";

/* [주요 연혁] 이 여기 있었습니다. 그 갈래는 shows.json 을 그대로 세로로
   늘어놓은 것이라 Concert 페이지와 같은 내용이었습니다 — 같은 기록을
   두 군데에 두면 한쪽만 고치는 일이 생깁니다. 공연 기록은 Concert 로
   모았습니다. */
const TABS = [
  { href: "/about/", label: "단원" },
  { href: "/about/director/", label: "단장" },
  { href: "/about/story/", label: "앙상블메이 스토리" },
] as const;

export default function AboutTabs() {
  const pathname = usePathname();

  return (
    <nav className="abt" aria-label="앙상블 소개">
      <div className="abt__in">
        {TABS.map((t) => {
          /* 단원은 /about/ 자체라, 다른 갈래의 주소가 여기에 걸리지 않도록
             정확히 같은지 봅니다. 나머지는 앞부분만 맞으면 됩니다. */
          const here = t.href === "/about/" ? pathname === "/about/" : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="abt__b"
              aria-current={here ? "page" : undefined}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
