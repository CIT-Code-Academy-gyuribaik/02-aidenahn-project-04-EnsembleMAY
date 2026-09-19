"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/lang";
import type { NavLabel } from "@/lib/nav";
import { srcSetOf } from "@/lib/img";

type Banner = {
  href: string;
  title: string;
  kicker: NavLabel;
  body: { kor: readonly string[]; eng: readonly string[] };
  src: string;
  alt: NavLabel;

  /* 사진의 원래 크기 — 자리를 먼저 잡아 두지 않으면, 아래로 내려오다 사진이 뜨는
     순간 글이 툭 밀려납니다. */
  w: number;
  h: number;
  flip: boolean;
};

const BANNERS: readonly Banner[] = [
  {
    href: "/about/",
    title: "About Ensemble M.A.Y.",
    kicker: { kor: "앙상블 메이 소개", eng: "Meet Ensemble M.A.Y." },
    body: {
      kor: [
        "'앙상블 메이'는 인터내셔널 스쿨 학생들이 모여,",
        "음악을 통해 교감하고 성장하는 앙상블입니다.",
      ],
      eng: [
        "Students from international schools,",
        "connecting and growing through music.",
      ],
    },
    src: "/assets/img/banner/about.webp",
    alt: { kor: "흰 셔츠를 입고 모여 선 앙상블 메이 단원들", eng: "Ensemble M.A.Y. members gathered in white shirts" },
    w: 501,
    h: 435,
    flip: false,
  },
  {
    href: "/concert/",
    title: "Our History",
    kicker: { kor: "음악을 통한 나눔과 봉사를 실천합니다.", eng: "Sharing and service through music" },
    body: {
      kor: [
        "앙상블 메이는 연주를 넘어 선한 영향력을 전합니다.",
        "정기 연주회와 봉사활동으로 따뜻한 에너지를 나누며,",
        "사랑과 희망을 전하는 것을 목표로 합니다.",
      ],
      eng: [
        "We play for more than applause.",
        "Concerts and volunteer work let us share",
        "a little warmth, and a lot of hope.",
      ],
    },
    src: "/assets/img/banner/chello.webp",
    alt: {
      kor: "무대 위에서 첼로를 연주하는 앙상블 메이 단원",
      eng: "An Ensemble M.A.Y. member playing the cello on stage",
    },
    w: 387,
    h: 574,
    flip: true,
  },
] as const;

export default function HomeBanners() {
  const { lang } = useLang();

  return (
    <div className="pbns">
      {BANNERS.map((b, i) => (
        <Reveal key={b.href} delay={i * 110}>
          <div className={"pbn" + (b.flip ? " pbn--flip" : "")}>
            <div className="pbn__t">
              <h2 className="pbn__h">{b.title}</h2>
              <p className="pbn__k">{b.kicker[lang]}</p>
              <p className="pbn__b">
                {b.body[lang].map((line) => (
                  /* 끝의 빈 칸은 좁은 화면에서 줄들이 한 문단으로 이어질 때 씁니다. */
                  <span key={line}>{line} </span>
                ))}
              </p>
              <Link className="pbn__m" href={b.href}>
                Read more
              </Link>
            </div>

            <div className="pbn__ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.src}
                srcSet={srcSetOf(b.src, b.w)}
                sizes="(max-width:900px) 300px, 520px"
                width={b.w}
                height={b.h}
                alt={b.alt[lang]}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
