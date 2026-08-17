import type { Metadata } from "next";

/* ==========================================================================
   검색·공유에 쓰이는 정보

   예전 HTML 6장의 <head> 에 흩어져 있던 것을 한 곳에 모았습니다.
   페이지마다 다른 것(제목·설명·주소)만 pageMeta() 로 덧씌웁니다.
   ========================================================================== */

export const SITE_URL = "https://ensemblemay.com";
export const SITE_NAME = "앙상블 메이";

/** 모든 페이지가 공유하는 기본값. 각 페이지가 title·description 을 덮어씁니다. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "앙상블 메이 — 음악을 사랑하는 아이들이 만들어 가는 현악 앙상블",
    /* 서브페이지는 "About · 앙상블 메이" 처럼 나옵니다 */
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "앙상블 메이는 음악을 사랑하는 아이들이 만들어 가는 현악 앙상블입니다. " +
    "1년에 한 번 정기 공연을 열고, 자선 공연으로 나눔을 실천합니다. " +
    "단원 등록 상담을 받고 있습니다.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ko_KR",
    title: SITE_NAME,
    description:
      "음악을 사랑하는 아이들이 만들어 가는 현악 앙상블. " +
      "We practice sharing and service through music.",
    url: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

/** 페이지 하나의 제목·설명·주소를 만듭니다. path 는 "/about/" 처럼 넘깁니다. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${opts.title} · ${SITE_NAME}`,
      description: opts.description,
      url: `${SITE_URL}${opts.path}`,
    },
  };
}
