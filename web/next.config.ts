import type { NextConfig } from "next";

/* output: "export" 가 이 사이트의 핵심입니다. 빌드하면 서버가 필요 없는
   HTML·CSS·JS 가 out/ 에 떨어지고, 페이지마다 진짜 HTML 이 만들어져야 검색
   크롤러가 읽습니다. 대신 서버 액션·API 라우트·이미지 최적화·미들웨어는 못 씁니다. */
const nextConfig: NextConfig = {
  output: "export",

  /* 주소 끝에 슬래시를 붙입니다: /about → /about/
     정적 호스팅에서는 about/index.html 로 떨어져야 새로고침해도
     404 가 나지 않습니다. */
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
