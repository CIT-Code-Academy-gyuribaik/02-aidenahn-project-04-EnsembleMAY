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
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "@/app/style.css";

export default function Shell({
  hdr,
  ownFooter,
  children,
}: {
  hdr: "overlay" | "solid";
  /**
   * 홈은 푸터를 마지막 칸 안에 직접 넣습니다.
   * 스냅 스크롤에서 CTA 와 푸터가 한 화면에 같이 보여야 하는데,
   * 여기서 <main> 밖에 그리면 둘이 다른 칸으로 갈라집니다.
   */
  ownFooter?: boolean;
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body data-hdr={hdr}>
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
