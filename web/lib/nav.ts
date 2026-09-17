export type NavLabel = { kor: string; eng: string };

export type SubTab = { href: string; label: NavLabel };

export type NavItem = {
  href: string;
  label: NavLabel;

  sub?: readonly SubTab[];

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
