/* 페이지 껍데기 — <html> 부터 푸터까지
   ★ data-hdr 이 이 파일의 존재 이유입니다. */

import type { ReactNode } from "react";
import { Abril_Fatface } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LangProvider } from "@/lib/lang";
import "@/app/style.css";

/* 배너 제목에 쓰는 디스플레이 세리프. */
const abril = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--display",
});

/* 홈 히어로의 이름에 쓰던 필기체(Great Vibes)는 더 받지 않습니다. */

export default function Shell({
  hdr,
  ownFooter,
  children,
}: {
  hdr: "overlay" | "solid";
  /* 홈은 푸터를 마지막 칸으로 직접 넣습니다. 홈 전체가 스냅이라 푸터도 한 칸이어야 합니다 — 스냅과 일반 스크롤을 섞으면 그 이음매에서 아무 위치에나
     멈춰 화면이 깨져 보입니다. */
  ownFooter?: boolean;
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body data-hdr={hdr} className={abril.variable}>
        {/* 키보드만 쓰는 분이 탭 한 번으로 본문까지 건너뛰는 길입니다. */}
        <LangProvider>
          <a className="skip" href="#main">
            본문으로 건너뛰기
          </a>

          <SiteHeader />

          <main id="main">{children}</main>

          {!ownFooter && <SiteFooter />}
        </LangProvider>
      </body>
    </html>
  );
}
