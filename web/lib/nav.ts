/* ==========================================================================
   내비게이션 한 벌 — 상단 바와 하위 메뉴가 같은 목록을 봅니다

   ★ 왜 여기로 모았나
     갈래 목록은 원래 각 서브페이지의 layout.tsx 안에 TABS 로 따로 적혀
     있었습니다. 상단 바에 마우스를 올리면 그 갈래를 펼쳐 보이게 되면서
     같은 목록이 상단 바와 layout 두 곳에 생겼습니다 — About 과 Concert 가
     띠 컴포넌트를 나눠 쓰게 고쳤던 것과 같은 이유입니다. 복사해 두면
     한쪽만 고치는 날이 옵니다.

   ★ 적힌 차례가 곧 화면 차례입니다. 상단 바도 하위 띠도 이 순서대로
     늘어놓습니다.
   ========================================================================== */

/** 하위 갈래 한 칸 */
export type SubTab = { href: string; label: string };

/** 상단 바 한 칸 */
export type NavItem = {
  href: string;
  label: string;
  /** 하위 갈래. Home 처럼 없는 항목도 있습니다 — 없으면 펼칠 것도 없습니다. */
  sub?: readonly SubTab[];
  /** 하위 띠를 화면 낭독기가 무엇이라 부를지 — "앙상블 소개" 처럼 */
  subLabel?: string;
};

/* 갈래를 가진 넷. 각 layout.tsx 가 자기 것을 꺼내 씁니다.

   ★ 첫 갈래의 주소는 반드시 뿌리(=상단 항목 href)와 같아야 합니다.
     SubTabs 가 그 첫 칸만 "정확히 같은지" 로 가리기 때문입니다 —
     앞부분만 맞으면 된다고 두면 /concert/past/ 에서도 [공연 정보] 가
     함께 켜집니다. */
export const SECTIONS: Record<
  "about" | "concert" | "gallery" | "contact",
  Required<NavItem>
> = {
  about: {
    href: "/about/",
    label: "About",
    subLabel: "앙상블 소개",
    sub: [
      { href: "/about/", label: "단원" },
      { href: "/about/story/", label: "앙상블메이 스토리" },
    ],
  },
  concert: {
    href: "/concert/",
    label: "Concert",
    subLabel: "공연",
    sub: [
      { href: "/concert/", label: "공연 정보" },
      { href: "/concert/past/", label: "공연 연혁" },
    ],
  },
  gallery: {
    href: "/gallery/",
    label: "Gallery",
    subLabel: "활동 사진",
    sub: [
      { href: "/gallery/", label: "사진" },
      { href: "/gallery/videos/", label: "영상" },
    ],
  },
  contact: {
    href: "/contact/",
    label: "Contact",
    subLabel: "문의",
    sub: [
      { href: "/contact/", label: "입단 문의" },
      { href: "/contact/charity/", label: "자선 공연 문의" },
    ],
  },
};

/* 한때 Contact 만 네모 단추였습니다. 글자 링크 넷 옆에 테두리 하나만
   서 있으니 상단 바가 한 줄로 안 읽혀서, 다섯을 같은 글자 링크로
   되돌렸습니다. */
export const NAV: readonly NavItem[] = [
  { href: "/", label: "Home" },
  SECTIONS.about,
  SECTIONS.concert,
  SECTIONS.gallery,
  SECTIONS.contact,
];
