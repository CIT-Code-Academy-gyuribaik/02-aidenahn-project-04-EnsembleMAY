import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
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

   세 대목을 세워 놓습니다. 국문 선언문을 크게 앞세우고, 그것을 풀어쓴
   국·영문을 아래 두 단으로 둡니다.

   선언문을 크게 두는 이유 — 세 대목이 이어지면 글이 깁니다. 빠르게
   훑는 사람은 선언문 세 줄만 읽고도 무엇을 말하는지 알 수 있어야 하고,
   본문은 궁금한 사람이 읽습니다.
   900px 아래에서는 두 단이 한 단으로 접히고 국문이 먼저 옵니다.
   ========================================================================== */

const BLOCKS = [
  {
    ko: {
      lead: "음악이 서로 다른 길을 걸어온 청소년들을 하나로 이어주었습니다.",
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
          <div className="st__i">
            <p className="st__n">{String(i + 1).padStart(2, "0")}</p>
            <p className="st__ko">{b.ko.lead}</p>
            <div className="st__b">
              <p className="pair__ko">{b.ko.body}</p>
              <div>
                <p className="st__en">{b.en.lead}</p>
                <p className="pair__en">{b.en.body}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </>
  );
}
