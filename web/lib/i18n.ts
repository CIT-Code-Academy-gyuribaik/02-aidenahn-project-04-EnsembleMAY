/* 화면에 나오는 글 한 벌 — 국문·영문
   ★ 왜 여기로 모았나 lib/nav.ts 가 메뉴 이름을 한곳에 모아 둔 것과 같은 이유입니다. 번역을 화면 코드 안에 ( lang === "kor" ?
     "…" : "…" ) 로 흩어 놓으면, 문안을 고칠 때마다 어느 파일에 있었는지부터 찾아야 합니다. 실제로 그렇게 흩어져 있던 것을 여기로 걷어
     왔습니다. ── 번역하는 것과 하지 않는 것 ──
   ★ [원래부터 영어가 제자리에 있던 글]은 언어를 따라가지 않습니다. 세 자리가 그렇습니다.
   ★ 검색·공유용 글(lib/seo.ts)은 한국어 그대로입니다. 이 사이트는 주소 하나에 HTML 하나가 떨어지는 정적 내보내기라
     (next.config.ts 의 output:"export"), 페이지를 받아 가는 시점에는 방문자가 어느 언어를 골랐는지 알 길이 없습니다.
     <html lang="ko"> 를 그대로 두는 것과 같은 까닭입니다. ── 쓰는 법 ── const { lang } = useLang();
     <h2>{T.contact.enrollTitle[lang]}</h2> */

import type { Lang } from "@/lib/lang";

/* 한 자리에 들어갈 국문·영문 한 쌍 */
export type Text = { kor: string; eng: string };

/* 문장마다 한 줄로 앉히는 글. 한 덩어리로 두면 어디서 줄이 바뀔지 브라우저가 폭만 보고 정합니다. 글 칸이 넓은 자리에서는 그 결과가 [한 문장이
   한복판에서 잘리고 다음 문장이 그 뒤에 이어 붙는] 모양이 되어, 양옆에 여백이 남는데도 문장이 끊겨 보입니다. 문장을 각각 한 줄로 두면 끊기는 자리가
   뜻과 맞습니다. 좁은 화면에서는 각 문장이 다시 제 안에서 접힙니다 — 그래서 <br> 이 아니라 블록입니다. 홈 히어로(.hero__en)와
   배너(.pbn__b)가 같은 방식입니다. */
export type Lines = { kor: readonly string[]; eng: readonly string[] };

/* 지금 언어로 고릅니다. 화면 코드가 lang === … 을 되풀이하지 않게. */
export function say(t: Text, lang: Lang): string {
  return t[lang];
}

/* 데이터에서 꺼낼 때 — content/*.json 은 영문을 *En 짝으로 들고 있습니다. 영문이 비어 있으면 한국어가 그대로 나옵니다. 번역이 아직
   없는 항목 때문에 화면이 비는 것보다, 한국어라도 보이는 편이 낫습니다. */
export function pickText(lang: Lang, kor: string, eng?: string): string {
  return lang === "eng" && eng ? eng : kor;
}

/* ══════════════════════════════════════════════════════════════ 공통 — 여러 화면이 함께 쓰는 낱말
   ══════════════════════════════════════════════════════════════ */
export const T = {
  common: {
    siteName: { kor: "앙상블메이", eng: "Ensemble MAY" },
    /* 화면 낭독기가 부르는 이름들 */
    mainMenu: { kor: "주 메뉴", eng: "Main menu" },
    footerMenu: { kor: "푸터 메뉴", eng: "Footer menu" },
    openMenu: { kor: "메뉴 열기", eng: "Open menu" },
    closeMenu: { kor: "메뉴 닫기", eng: "Close menu" },
    close: { kor: "닫기", eng: "Close" },
  },

  /* ── 홈 */
  home: {
    /* 공연 칸 — 강남구자원봉사센터 한 줄 */
    concertLead: { kor: "앙상블 메이는", eng: "Ensemble MAY is" },
    concertLeadKey: {
      kor: "강남구자원봉사센터의 공식 봉사단체",
      eng: "an officially registered volunteer group of the Gangnam-gu Volunteer Center",
    },
    concertLeadTail: { kor: "입니다.", eng: "." },
    more: { kor: "공연 더보기", eng: "See all concerts" },
    /* 히어로 사진 넘기기 — 점과 좌우 화살표가 같이 씁니다 */
    heroNav: { kor: "히어로 사진 넘기기", eng: "Hero photos" },
    heroPrev: { kor: "이전 사진", eng: "Previous photo" },
    heroNext: { kor: "다음 사진", eng: "Next photo" },
    /* `${n}번째 사진` 의 뒷말 — 영문은 앞말이라 자리를 바꿔 씁니다 */
    heroNth: { kor: "번째 사진", eng: "Photo" },
    /* 포스터 alt 의 뒷말 — `${제목} 포스터` */
    posterOf: { kor: "포스터", eng: "concert poster" },
  },

  /* ── 공연 */
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
    /* 사진 설명 */
    regularAlt: {
      kor: "무대 위에서 지휘자와 함께 합주하는 앙상블 메이 단원들",
      eng: "Ensemble MAY members playing together on stage with their conductor",
    },
    charityAlt: {
      kor: "도서관 로비에서 관객 앞에 서서 연주하는 앙상블 메이 단원들",
      eng: "Ensemble MAY members performing for an audience in a library lobby",
    },
    /* 연혁 */
    historyHeading: { kor: "공연 연혁", eng: "Past concerts" },
  },

  /* ── 소개 */
  about: {
    membersHeading: { kor: "함께 연주하는 아이들", eng: "The children who play together" },
    memberAlt: { kor: "앙상블 메이 단원", eng: "An Ensemble MAY member" },
  },

  /* ── 갤러리 */
  gallery: {
    sortLabel: { kor: "사진 정렬", eng: "Sort photos" },
    sortNew: { kor: "최신순", eng: "Newest first" },
    sortOld: { kor: "과거순", eng: "Oldest first" },
    lightbox: { kor: "사진 크게 보기", eng: "Photo viewer" },
    prev: { kor: "이전 사진", eng: "Previous photo" },
    next: { kor: "다음 사진", eng: "Next photo" },
    /* 영상 재생 — `${제목} 재생` */
    play: { kor: "재생", eng: "Play" },
  },

  /* ── 문의 */
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

  /* ── 자선 공연 신청 띠 (홈 · 공연 두 곳이 같이 씀) */
  cta: {
    title: { kor: "자선 공연 신청 안내", eng: "Invite Us to Play" },
    button: { kor: "자선 공연 문의", eng: "Request a concert" },
  },
} as const satisfies Record<string, Record<string, Text | Lines>>;
