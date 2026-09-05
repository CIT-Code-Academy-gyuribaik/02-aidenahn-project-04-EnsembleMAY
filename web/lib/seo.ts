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
    /* 카카오톡·슬랙·페이스북에 링크를 붙였을 때 뜨는 그림.
       1200×630 은 어느 서비스나 자르지 않고 그대로 쓰는 크기입니다.
       metadataBase 가 위에 있어서 "/og.png" 한 줄이면 절대 주소로 펴집니다 —
       공유 그림은 상대 경로로 두면 대부분의 서비스가 못 받아 갑니다.
       ★ 아래 pageMeta() 가 이 openGraph 를 통째로 펼쳐 쓰므로, 여기 한 번
         적으면 모든 페이지가 같은 그림을 씁니다. */
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  /* X(트위터)도 og:image 를 읽기는 하지만, 카드 종류를 따로 말해 주지 않으면
     그림을 글 옆 작은 네모로 붙입니다. 큰 그림으로 뜨게 하려면 이 한 줄이
     있어야 합니다. 제목·설명은 위(title·description)에서 가져갑니다. */
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
