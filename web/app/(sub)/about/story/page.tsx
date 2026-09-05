import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "앙상블메이 스토리",
  description:
    "음악이 서로 다른 길을 걸어온 청소년들을 하나로 이어주었습니다. " +
    "여러 인터내셔널 스쿨 학생들이 모여 음악으로 교감하고 성장하는 앙상블입니다.",
  path: "/about/story/",
});

/* ==========================================================================
   앙상블메이 스토리

   세 대목을 [사진 | 글] 한 쌍으로 세우고, 사진의 좌우를 번갈아 놓습니다.
   글 칸 안에서는 국문 선언문 → 국문 본문 → 영문 선언문 → 영문 본문 이
   세로로 흐릅니다.

   ★ 사진을 넣은 이유 — 예전에는 글만 세 덩어리가 이어졌습니다. 세 대목이
     모두 [선언문 + 국문 + 영문] 이라는 같은 모양이어서, 스크롤하면 같은
     화면이 세 번 반복되는 것처럼 보였습니다. 사진이 좌우로 번갈아 들어가면
     대목이 바뀐 것이 한눈에 보입니다.
   ★ 사진은 각 대목이 말하는 장면으로 골랐습니다 — 아래 photo 주석 참고.
   900px 아래에서는 한 단으로 접히고 사진이 글 위로 갑니다(좌우 번갈이 없음).
   ========================================================================== */

const BLOCKS = [
  {
    /* [서로 다른 길을 걸어온 청소년들이 하나로] — 다른 학교에서 온 넷이
       악기를 들고 나란히 서서 웃는 컷입니다. 무대 사진보다 이 문장에
       가깝습니다. 문장이 말하는 것이 연주가 아니라 만남이라서요. */
    photo: "assets/img/gallery/20260510-sfs-01.webp",
    alt: "악기를 들고 나란히 서서 웃는 앙상블 메이 단원들",
    ko: {
      /* 줄바꿈을 글 안에 직접 넣습니다(\n). style.css 의 .st__ko 가
         white-space:pre-line 으로 이 줄바꿈만 살립니다 — 브라우저에 맡기면
         [걸어온 / 청소년들을] 에서 끊깁니다. */
      lead: "음악이 서로 다른 길을 걸어온 청소년들을\n하나로 이어주었습니다.",
      body:
        "‘앙상블 메이’는 여러 인터내셔널 스쿨에 재학 중인 학생들이 모여, 음악을 통해 교감하고 " +
        "성장하는 앙상블입니다. 각자의 학교와 악기, 경험은 달랐지만, 함께 연주하며 서로의 다름을 " +
        "존중하고 이해하는 방법을 배워가고 있습니다.",
    },
    en: {
      lead: "Music has brought together young musicians who walked different paths.",
      body:
        "We [Ensemble M.A.Y.] are an ensemble of students attending international schools in " +
        "Korea, growing through communication and connection via music. Although we come from " +
        "different schools, instruments, and experiences, we have connected and created an " +
        "ensemble through our ambition, passion and love for music.",
    },
  },
  {
    /* [나눔과 봉사] — 도서관 자선 공연에서 연주하는 장면입니다. 무대가
       아닌 곳에서 관객과 같은 높이로 연주하는 사진이라, 봉사라는 말을
       설명 없이 보여 줍니다. */
    photo: "assets/img/gallery/20251213-library-16.webp",
    alt: "국립어린이청소년도서관 [음악이 흐르는 도서관] 에서 관객 앞에 서서 연주하는 앙상블 메이 단원들",
    ko: {
      lead: "음악을 통한 나눔과 봉사를 실천합니다.",
      body:
        "‘앙상블 메이’는 단순한 연주 활동을 넘어, 음악을 통해 사회에 선한 영향력을 전하고자 " +
        "합니다. 정기적인 연주회뿐만 아니라 다양한 봉사활동을 통해 세상에 따뜻한 에너지를 " +
        "나누며, 음악으로 사랑과 희망을 전하는 것을 목표로 하고 있습니다.",
    },
    en: {
      lead: "We practice sharing and service through music.",
      body:
        "Ensemble M.A.Y. goes beyond simple performances to spread positive energy through " +
        "music. Through regular concerts and diverse volunteer activities, we aim to bring " +
        "warmth, love, and hope to the world.",
    },
  },
  {
    /* [더 넓은 세상] — 창단 공연(제1회 정기연주회, 거암아트홀)이 끝나고
       무대에 나란히 선 단체 사진입니다. 앞의 두 장이 연주하는 장면이라,
       마지막은 연주가 끝난 뒤 열세 명이 정면을 보고 선 컷으로 닫습니다 —
       셋을 나란히 보면 만남 → 나눔 → 무대로 넓어집니다. */
    photo: "assets/img/gallery/20250614-concert1-12.webp",
    alt: "제1회 정기연주회를 마치고 무대에 나란히 선 앙상블 메이 단원들",
    ko: {
      lead: "음악과 함께 더 넓은 세상을 향해 나아갑니다.",
      body:
        "‘앙상블 메이’는 음악을 중심으로 다양한 경험과 문화를 존중하고 받아들이며, 넓은 시야를 " +
        "가진 세계시민으로 성장하고자 합니다. 서로 다른 배경을 가진 단원들이 함께 어우러져, " +
        "작은 울림이 큰 감동으로 이어지기를 꿈꾸고 있습니다.",
    },
    en: {
      lead: "We move toward a broader world with music.",
      body:
        "Centered around music, Ensemble M.A.Y. embraces diverse experiences and cultures, " +
        "striving to grow into global citizens with a wide and inclusive perspective. We believe " +
        "that the small echoes we create together will eventually resonate with greater impact.",
    },
  },
] as const;

export default function AboutStoryPage() {
  return (
    <>
      <h2 className="sr">앙상블메이 스토리</h2>

      {BLOCKS.map((b, i) => (
        <Reveal key={b.ko.lead} delay={i * 90}>
          {/* 홀수 번째 대목은 사진을 오른쪽으로 보냅니다(--flip).
              좌우를 번갈아 놓으면 세 대목이 같은 화면의 반복으로 보이지
              않습니다. 좁은 화면에서는 이 갈림이 없어집니다 — 한 단으로
              접히면 좌우라는 것 자체가 없습니다. */}
          <div className={"st__i" + (i % 2 ? " st__i--flip" : "")}>
            <div className="st__ph">
              <img src={asset(b.photo)} alt={b.alt} loading="lazy" />
            </div>
            <div className="st__t">
              <p className="st__ko">{b.ko.lead}</p>
              <p className="pair__ko">{b.ko.body}</p>
              <p className="st__en">{b.en.lead}</p>
              <p className="pair__en">{b.en.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </>
  );
}
