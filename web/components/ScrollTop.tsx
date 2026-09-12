"use client";

/* 페이지를 옮기면 맨 위에서 시작합니다
   ★ 왜 필요한가 Next 는 클라이언트 이동에서 "바뀐 구간" 을 화면에 보이게 스크롤합니다. */

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
