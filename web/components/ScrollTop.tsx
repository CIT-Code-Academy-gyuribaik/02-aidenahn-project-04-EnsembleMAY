"use client";

/* ==========================================================================
   페이지를 옮기면 맨 위에서 시작합니다

   ★ 왜 필요한가
     Next 는 클라이언트 이동에서 "바뀐 구간" 을 화면에 보이게 스크롤합니다.
     문서 맨 위가 아니라, 실제로 갈아 끼운 부분의 top 입니다.

     About 의 갈래끼리 옮길 때 그것이 문제가 됩니다. 히어로와 하위 메뉴
     띠는 about/layout.tsx 에 있고 갈리는 것은 그 아래 {children} 뿐이라,
     Next 가 그 자리를 보이게 하려고 히어로를 화면 밖으로 밀어냅니다.

     홈에서 서브페이지로 갈 때는 이 일이 없습니다 — 라우트 그룹이 달라
     (home)/(sub) 각자 뿌리 레이아웃을 가지므로 전체 새로고침이고,
     그때는 브라우저가 맨 위에서 시작합니다. 그래서 증상이 갈래 이동
     에서만 나타났습니다.

   주소에 #앵커가 있으면 건드리지 않습니다 — /concert/#repertoire 처럼
   일부러 그 자리로 보내는 링크가 있습니다.
   ========================================================================== */

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
