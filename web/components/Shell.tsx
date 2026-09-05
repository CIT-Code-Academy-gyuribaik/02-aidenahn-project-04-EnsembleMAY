/* ==========================================================================
   페이지 껍데기 — <html> 부터 푸터까지

   ★ data-hdr 이 이 파일의 존재 이유입니다.
     홈은 상단 바가 사진 위에 투명하게 얹히고("overlay"), 나머지 페이지는
     흰 바탕입니다("solid"). style.css 가 그 두 상태를 body 의 속성으로
     구분합니다 — body[data-hdr="overlay"] 규칙이 28개 있습니다.

     그런데 Next 의 레이아웃은 "지금 어느 페이지인지"를 모릅니다.
     그래서 app/ 을 라우트 그룹 둘로 나누고((home) 과 (sub)), 각자
     자기 값을 이 껍데기에 넘깁니다. 빌드할 때 확정되므로 화면이
     열리자마자 제 색으로 나옵니다 — 자바스크립트로 나중에 바꾸면
     투명이었다가 흰색으로 튀는 것이 한 번 보입니다.
   ========================================================================== */

import type { ReactNode } from "react";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "@/app/style.css";

/* 영문 제목에 쓰는 디스플레이 세리프.
   홈의 [Concert]·배너 두 장, 서브페이지 히어로 넷(About·Concert·
   Gallery·Contact)이 이 한 벌을 나눠 씁니다.

   ★ Abril Fatface 에서 갈아탔습니다.
     Abril 은 이름 그대로 팻페이스(fat face) 입니다 — 세로획이 아주
     굵고 가로획이 머리카락처럼 얇은, 19세기 포스터용 활자입니다.
     굵기도 400 한 벌뿐이라 [조금 가늘게] 가 아예 불가능합니다.
     무대 사진 위에 크게 얹으니 연주회 안내가 아니라 웨딩·행사 포스터
     템플릿처럼 읽혔습니다. 배경 사진이 이미 충분히 강해서 글자까지
     소리를 지를 이유가 없습니다.
     Cormorant Garamond 는 같은 세리프 계열이면서 획 대비가 훨씬
     차분하고, 500·600 두 벌이 있어 크기를 줄이고 굵기를 낮출 수
     있습니다. 공연 프로그램 책자의 결에 가깝습니다.

   next/font 는 빌드할 때 글꼴 파일을 받아 우리 쪽에 함께 굽습니다 —
   화면을 열 때 구글로 나가는 요청이 없습니다. 방문자 컴퓨터에 무엇이
   깔려 있든 같은 모양으로 보이는 것도 이 방식뿐입니다.
   라틴만 받습니다. 이 글꼴로 쓰는 글이 영문 제목뿐입니다. */
const display = Cormorant_Garamond({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--display",
});

/* 홈 히어로의 이름(Ensemble MAY)에 쓰는 필기체.
   여기 한 자리에만 씁니다 — 손으로 쓴 글씨는 한 곳에 있을 때 서명처럼
   읽히고, 여기저기 쓰면 금방 장식으로 흘러 버립니다. */
const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--script",
});

export default function Shell({
  hdr,
  ownFooter,
  children,
}: {
  hdr: "overlay" | "solid";
  /**
   * 홈은 푸터를 마지막 칸으로 직접 넣습니다.
   * 홈 전체가 스냅이라 푸터도 한 칸이어야 합니다 — 스냅과 일반 스크롤을
   * 섞으면 그 이음매에서 아무 위치에나 멈춰 화면이 깨져 보입니다.
   */
  ownFooter?: boolean;
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body data-hdr={hdr} className={`${display.variable} ${script.variable}`}>
        {/* 키보드만 쓰는 분이 탭 한 번으로 본문까지 건너뛰는 길입니다.
            평소에는 화면 위로 숨어 있다가 초점이 닿으면 내려옵니다. */}
        <a className="skip" href="#main">
          본문으로 건너뛰기
        </a>

        <SiteHeader />

        <main id="main">{children}</main>

        {!ownFooter && <SiteFooter />}
      </body>
    </html>
  );
}
