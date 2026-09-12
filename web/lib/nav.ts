/* 내비게이션 한 벌 — 상단 바와 하위 메뉴가 같은 목록을 봅니다
   ★ 왜 여기로 모았나 갈래 목록은 원래 각 서브페이지의 layout.tsx 안에 TABS 로 따로 적혀 있었습니다. */

/* 언어 쌍 */
export type NavLabel = { kor: string; eng: string };

/* 하위 갈래 한 칸 */
export type SubTab = { href: string; label: NavLabel };

/* 상단 바 한 칸 */
export type NavItem = {
  href: string;
  label: NavLabel;
  /* 하위 갈래. Home 처럼 없는 항목도 있습니다 — 없으면 펼칠 것도 없습니다. */
  sub?: readonly SubTab[];
  /* 하위 띠를 화면 낭독기가 무엇이라 부를지 */
  subLabel?: NavLabel;
};

/* 갈래를 가진 넷.
   ★ 첫 갈래의 주소는 반드시 뿌리(=상단 항목 href)와 같아야 합니다. */
export const SECTIONS: Record<
  "about" | "concert" | "gallery" | "contact",
  Required<NavItem>
> = {
  about: {
    href: "/about/",
    label: { kor: "소개", eng: "About" },
    subLabel: { kor: "앙상블 소개", eng: "About" },
    sub: [
      { href: "/about/", label: { kor: "단원", eng: "Members" } },
      { href: "/about/story/", label: { kor: "앙상블메이 스토리", eng: "Our Story" } },
    ],
  },
  concert: {
    href: "/concert/",
    label: { kor: "공연", eng: "Concert" },
    subLabel: { kor: "공연", eng: "Concert" },
    sub: [
      { href: "/concert/", label: { kor: "공연 정보", eng: "Our Concerts" } },
      { href: "/concert/past/", label: { kor: "공연 연혁", eng: "Past Concerts" } },
    ],
  },
  gallery: {
    href: "/gallery/",
    label: { kor: "갤러리", eng: "Gallery" },
    subLabel: { kor: "활동 사진", eng: "Gallery" },
    sub: [
      { href: "/gallery/", label: { kor: "사진", eng: "Photos" } },
      { href: "/gallery/videos/", label: { kor: "영상", eng: "Videos" } },
    ],
  },
  contact: {
    href: "/contact/",
    label: { kor: "문의", eng: "Contact" },
    subLabel: { kor: "문의", eng: "Contact" },
    sub: [
      { href: "/contact/", label: { kor: "입단 문의", eng: "Join Us" } },
      { href: "/contact/charity/", label: { kor: "자선 공연 문의", eng: "Charity Concerts" } },
    ],
  },
};

export const NAV: readonly NavItem[] = [
  { href: "/", label: { kor: "홈", eng: "Home" } },
  SECTIONS.about,
  SECTIONS.concert,
  SECTIONS.gallery,
  SECTIONS.contact,
];
