import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/* ==========================================================================
   홈 — 배너 두 장

   가로로 긴 카드 두 장을 세로로 쌓습니다. 사진은 배경을 딴 누끼라서
   카드 위쪽으로 삐져나옵니다 — 카드 안에 얌전히 담긴 사진보다 눈에
   먼저 들어오고, 어두운 지면 위에서 밝은 카드와 사진이 한 덩어리로
   떠 보입니다.

   둘의 좌우를 뒤집어 놓습니다(.pbn--flip). 같은 배치가 두 번 이어지면
   두 번째는 첫 번째의 반복으로 읽혀서 잘 안 봅니다.

   글과 사진 비율, 삐져나오는 높이는 CSS 의 .pbn 한 곳에 있습니다.
   ========================================================================== */

const BANNERS = [
  {
    href: "/about/",
    title: "About Ensemble M.A.Y.",
    kicker: "앙상블 메이 소개",
    body: [
      "‘앙상블 메이’는 여러 인터내셔널 스쿨에 재학 중인 학생들이 모여,",
      "음악을 통해 교감하고 성장하는 앙상블입니다.",
      "각자의 학교와 악기, 경험은 달랐지만,",
      "함께 연주하며 서로의 다름을 존중하고 이해하는 방법을 배워가고 있습니다.",
    ],
    src: "/assets/img/banner/about.webp",
    alt: "흰 셔츠를 입고 모여 선 앙상블 메이 단원들",
    /* 사진이 가로로 넓어 글자리를 조금 더 줍니다 */
    flip: false,
  },
  {
    href: "/about/history/",
    title: "Our History",
    kicker: "음악을 통한 나눔과 봉사를 실천합니다.",
    body: [
      "앙상블 메이는 단순한 연주 활동을 넘어, 음악을 통해 사회에 선한 영향력을 전하고자 합니다.",
      "정기적인 연주회뿐만 아니라 다양한 봉사활동을 통해 세상에 따뜻한 에너지를 나누며,",
      "음악으로 사랑과 희망을 전하는 것을 목표로 하고 있습니다.",
    ],
    src: "/assets/img/banner/chello.webp",
    alt: "첼로",
    flip: true,
  },
] as const;

export default function HomeBanners() {
  return (
    <div className="pbns">
      {BANNERS.map((b, i) => (
        <Reveal key={b.href} delay={i * 110}>
          <Link className={"pbn" + (b.flip ? " pbn--flip" : "")} href={b.href}>
            <span className="pbn__t">
              <span className="pbn__h">{b.title}</span>
              <span className="pbn__k">{b.kicker}</span>
              <span className="pbn__b">
                {b.body.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
              {/* 카드 전체가 이미 링크라, 이것은 누를 곳을 알려 주는 표시입니다.
                  링크 안에 링크를 넣으면 안 되므로 span 으로 둡니다. */}
              <span className="pbn__m">Read more</span>
            </span>

            <span className="pbn__ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt={b.alt} loading="lazy" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
