import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { asset, photoBySrc } from "@/lib/content";
import { srcSetOf, widthOf } from "@/lib/img";
import { breadcrumbFor } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "앙상블메이 스토리",
  description:
    "음악이 서로 다른 길을 걸어온 청소년들을 하나로 이어주었습니다. " +
    "여러 인터내셔널 스쿨 학생들이 모여 음악으로 교감하고 성장하는 앙상블입니다.",
  path: "/about/story/",
});

const BLOCKS = [
  {
    photo: "assets/img/gallery/20260510-sfs-01.webp",
    alt: "악기를 들고 나란히 서서 웃는 앙상블 메이 단원들",
    ko: {
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
      <JsonLd data={breadcrumbFor("/about/story/")} />
      <h2 className="sr">앙상블메이 스토리</h2>

      {BLOCKS.map((b, i) => (
        <Reveal key={b.ko.lead} delay={i * 90}>

          <div className={"st__i" + (i % 2 ? " st__i--flip" : "")}>
            <div className="st__ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(b.photo)}
                srcSet={srcSetOf(asset(b.photo), widthOf(photoBySrc(asset(b.photo))?.ratio))}
                sizes="(max-width:900px) 100vw, 55vw"
                alt={b.alt}
                loading="lazy"
                decoding="async"
              />
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
