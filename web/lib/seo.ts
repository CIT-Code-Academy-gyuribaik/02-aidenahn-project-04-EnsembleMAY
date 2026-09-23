import type { Metadata, Viewport } from "next";

export const SITE_URL = "https://ensemblemay.com";
export const SITE_NAME = "앙상블 메이";

/* viewportFit:"cover" — 노치가 있는 아이폰에서 사진이 화면 끝까지 차게 합니다.
   대신 글자와 단추가 노치 밑으로 들어가지 않도록, style.css 가 --sal/--sar/--sat/--sab
   (env(safe-area-inset-*)) 로 자리를 비켜 줍니다. 둘은 한 벌입니다. */
export const baseViewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  /* 최대 확대 배율을 막지 않습니다 — 글씨를 키워 보는 분을 가로막게 됩니다. */
  viewportFit: "cover",
  themeColor: "#ffffff",
};

/* 홈은 첫 화면이 어두운 사진이라 주소창까지 같은 색으로 이어 줍니다. */
export const homeViewport: Viewport = {
  ...baseViewport,
  themeColor: "#2A1418",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "앙상블 메이 Ensemble M.A.Y. — 음악을 사랑하는 아이들이 만들어 가는 현악 앙상블",

    template: `%s · ${SITE_NAME} Ensemble M.A.Y.`,
  },
  description:
    "앙상블 메이는 음악을 사랑하는 아이들이 만들어 가는 현악 앙상블입니다. " +
    "1년에 한 번 정기 공연을 열고, 자선 공연으로 나눔을 실천합니다. " +
    "단원 등록 상담을 받고 있습니다.",

  keywords: [
    "앙상블메이",
    "앙상블 메이",
    "Ensemble M.A.Y.",
    "ensemblemay",
    "어린이 현악 앙상블",
    "청소년 현악 앙상블",
    "정기 연주회",
    "자선 공연",
    "바이올린 비올라 첼로",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ko_KR",

    alternateLocale: ["en_US"],
    title: SITE_NAME,
    description:
      "음악을 사랑하는 아이들이 만들어 가는 현악 앙상블. " +
      "We practice sharing and service through music.",
    url: SITE_URL,

    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },

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
