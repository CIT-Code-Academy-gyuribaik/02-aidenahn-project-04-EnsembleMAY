import type { Lang } from "@/lib/lang";

export type Text = { kor: string; eng: string };

export type Lines = { kor: readonly string[]; eng: readonly string[] };

export function say(t: Text, lang: Lang): string {
  return t[lang];
}

export function pickText(lang: Lang, kor: string, eng?: string): string {
  return lang === "eng" && eng ? eng : kor;
}

export const T = {
  common: {
    siteName: { kor: "앙상블메이", eng: "Ensemble MAY" },

    mainMenu: { kor: "주 메뉴", eng: "Main menu" },
    footerMenu: { kor: "푸터 메뉴", eng: "Footer menu" },
    openMenu: { kor: "메뉴 열기", eng: "Open menu" },
    closeMenu: { kor: "메뉴 닫기", eng: "Close menu" },
    close: { kor: "닫기", eng: "Close" },
  },

  home: {
    concertLead: { kor: "앙상블 메이는", eng: "Ensemble MAY is" },
    concertLeadKey: {
      kor: "강남구자원봉사센터의 공식 봉사단체",
      eng: "an officially registered volunteer group of the Gangnam-gu Volunteer Center",
    },
    concertLeadTail: { kor: "입니다.", eng: "." },
    more: { kor: "공연 더보기", eng: "See all concerts" },

    heroNav: { kor: "히어로 사진 넘기기", eng: "Hero photos" },
    heroPrev: { kor: "이전 사진", eng: "Previous photo" },
    heroNext: { kor: "다음 사진", eng: "Next photo" },

    heroNth: { kor: "번째 사진", eng: "Photo" },

    posterOf: { kor: "포스터", eng: "concert poster" },
  },

  concert: {
    regularKicker: { kor: "정기 연주회", eng: "Annual Concert" },
    regularFreq: { kor: "연 1회", eng: "Once a year" },
    regularBody: {
      kor:
        "'앙상블 메이'는 강남구 자원봉사센터에 등록된 공식 봉사단체로서, 매년 한 번 " +
        "정기공연을 열어 한 해 동안 쌓아온 노력을 나눔의 무대로 완성하고 있습니다. " +
        "일 년에 단 한 번뿐인 만큼 더욱 정성을 담아 준비하며, 그 시간이 관객들에게 " +
        "위로와 즐거움을 전하는 의미 있는 순간이 되기를 바라고 있습니다.",
      eng:
        "Ensemble MAY is an officially registered volunteer group of the Gangnam-gu " +
        "Volunteer Center, and once a year we hold an annual concert that turns a year " +
        "of work into an evening of giving. It comes around only once, so we prepare for " +
        "it with particular care — hoping the hours we spend on stage leave our audience " +
        "with something worth carrying home.",
    },
    charityKicker: { kor: "자선 공연", eng: "Charity Concerts" },
    charityFreq: { kor: "수시", eng: "By invitation" },
    charityBody: {
      kor:
        "'앙상블 메이'는 학교, 도서관, 복지기관 등 다양한 곳의 요청을 받아 자선 공연을 " +
        "진행하며 도움이 필요한 이웃들에게 따뜻한 마음을 전하고 있습니다. 강남구 " +
        "자원봉사센터의 공식 봉사단체로서, 초청이 있는 곳이라면 어디든 찾아가 연주라는 " +
        "재능을 나눔으로 연결하고자 합니다.",
      eng:
        "Schools, libraries, and welfare centers invite us, and we come — playing for " +
        "neighbours who could use an afternoon of music. As an officially registered " +
        "volunteer group of the Gangnam-gu Volunteer Center, we go wherever we are asked, " +
        "and turn what these children can do into something they can give away.",
    },

    regularAlt: {
      kor: "무대 위에서 지휘자와 함께 합주하는 앙상블 메이 단원들",
      eng: "Ensemble MAY members playing together on stage with their conductor",
    },
    charityAlt: {
      kor: "도서관 로비에서 관객 앞에 서서 연주하는 앙상블 메이 단원들",
      eng: "Ensemble MAY members performing for an audience in a library lobby",
    },

    historyHeading: { kor: "공연 연혁", eng: "Past concerts" },
  },

  about: {
    membersHeading: { kor: "함께 연주하는 아이들", eng: "The children who play together" },
    memberAlt: { kor: "앙상블 메이 단원", eng: "An Ensemble MAY member" },
  },

  gallery: {
    sortLabel: { kor: "사진 정렬", eng: "Sort photos" },
    sortNew: { kor: "최신순", eng: "Newest first" },
    sortOld: { kor: "과거순", eng: "Oldest first" },
    lightbox: { kor: "사진 크게 보기", eng: "Photo viewer" },
    prev: { kor: "이전 사진", eng: "Previous photo" },
    next: { kor: "다음 사진", eng: "Next photo" },

    play: { kor: "재생", eng: "Play" },
  },

  contact: {
    enrollTitle: { kor: "입단 문의", eng: "Join Us" },
    enrollBody: {
      kor: [
        "바이올린 · 비올라 · 첼로 단원을 모집하고 있습니다.",
        "아이 나이와 하고 싶은 악기만 알려주시면 편하게 상담해 드립니다.",
      ],
      eng: [
        "We are looking for violin, viola, and cello players.",
        "Tell us your child's age and the instrument they would like to play.",
      ],
    },
    enrollAlt: {
      kor: "바이올린을 연주하는 앙상블 메이 단원",
      eng: "An Ensemble MAY member playing the violin",
    },
    charityTitle: { kor: "자선 공연 문의", eng: "Charity Concert Requests" },
    charityBody: {
      kor: [
        "앙상블 메이는 강남구자원봉사센터에 공식적으로 등록된 자선 봉사 단체입니다.",
        "공연이 필요한 곳이라면 어디든 찾아가 나눔을 실천합니다.",
      ],
      eng: [
        "Ensemble MAY is an officially registered volunteer group",
        "of the Gangnam-gu Volunteer Center.",
        "Wherever a concert is needed, we will come and play.",
      ],
    },
    charityAlt: {
      kor: "공연 무대에서 마이크를 들고 이야기하는 앙상블 메이 단원",
      eng: "An Ensemble MAY member speaking into a microphone on stage",
    },
    conductorAlt: {
      kor: "공연장에서 단원들을 지휘하는 앙상블 메이 지휘자",
      eng: "Ensemble MAY's conductor leading the players in the concert hall",
    },
  },

  cta: {
    title: { kor: "자선 공연 신청 안내", eng: "Invite Us to Play" },
    button: { kor: "자선 공연 문의", eng: "Request a concert" },
  },
} as const satisfies Record<string, Record<string, Text | Lines>>;
