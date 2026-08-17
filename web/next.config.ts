import type { NextConfig } from "next";

/* ==========================================================================
   앙상블 메이 — Next.js 설정

   ★ output: "export" 가 이 사이트의 핵심입니다.
     빌드하면 서버가 필요 없는 순수 HTML·CSS·JS 가 out/ 에 떨어집니다.
     Cloudflare Pages 는 그 폴더를 그대로 올려 주기만 하면 됩니다 —
     Node 서버를 돌릴 필요가 없어서 비용도, 관리할 것도 없습니다.

     페이지마다 진짜 HTML 파일이 만들어진다는 점이 중요합니다.
     순수 SPA(브라우저에서 JS 로 화면을 그리는 방식)로 만들면 네이버
     크롤러가 내용을 못 읽어서, 검색으로 앙상블을 찾을 수 없게 됩니다.

   ※ output: "export" 에서는 못 쓰는 기능이 있습니다 — 서버 액션,
     API 라우트, 이미지 최적화 서버, 미들웨어. 이 사이트에는 하나도
     필요 없습니다. 나중에 관리자 페이지를 붙일 때도 CMS 쪽이
     그 역할을 대신합니다.
   ========================================================================== */
const nextConfig: NextConfig = {
  output: "export",

  /* 주소 끝에 슬래시를 붙입니다: /about → /about/
     정적 호스팅에서는 about/index.html 로 떨어져야 새로고침해도
     404 가 나지 않습니다. */
  trailingSlash: true,

  images: {
    /* next/image 의 서버 최적화는 Node 서버가 있어야 돌아갑니다.
       정적 내보내기에서는 끕니다 — 사진은 이미 WebP 로 줄여 두었습니다
       (히어로 4장 합쳐 415KB). */
    unoptimized: true,
  },
};

export default nextConfig;
