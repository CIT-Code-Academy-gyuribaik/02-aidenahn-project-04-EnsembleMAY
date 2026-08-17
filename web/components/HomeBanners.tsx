import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/* ==========================================================================
   홈 — 배너 두 장

   가로로 긴 카드 두 장을 세로로 쌓습니다. 사진은 배경을 딴 누끼라서
   카드 위쪽으로 삐져나오고, 아래로는 카드 바닥선에서 잘립니다 — 카드
   안에 얌전히 담긴 사진보다 눈에 먼저 들어오고, 어두운 지면 위에서
   밝은 카드와 사진이 한 덩어리로 떠 보입니다.

   둘의 좌우를 뒤집어 놓습니다(.pbn--flip). 같은 배치가 두 번 이어지면
   두 번째는 첫 번째의 반복으로 읽혀서 잘 안 봅니다.

   크기·간격·색은 전부 style.css 의 .pbn 한 곳에 있습니다. 시안을
   픽셀로 재서 옮긴 값이라 눈대중으로 고치면 어긋납니다 — 잰 값과
   재는 방법이 그 자리에 적혀 있습니다.

   ★ 사진 파일은 투명 여백을 잘라낸 상태여야 합니다.
     위치를 사진 상자 기준으로 잡기 때문에, 파일 가장자리에 투명한
     띠가 남아 있으면 그만큼 덜 솟습니다. 갈아 끼울 때는 알파 경계로
     크롭해서 넣어 주세요.
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
          <div className={"pbn" + (b.flip ? " pbn--flip" : "")}>
            <div className="pbn__t">
              <h2 className="pbn__h">{b.title}</h2>
              <p className="pbn__k">{b.kicker}</p>
              <p className="pbn__b">
                {b.body.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>

            <div className="pbn__ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt={b.alt} loading="lazy" />
            </div>

            {/* 누를 곳은 이 단추 하나입니다. 카드 전체를 링크로 두면
                글을 긁어 읽으려고 끌기만 해도 페이지가 넘어갑니다.

                글 상자(.pbn__t) 밖에 두는 이유 — 좁은 화면에서 글 · 사진 ·
                단추 순으로 세우는데, 단추가 글 상자 안에 있으면 사진을
                그 사이로 끼워 넣을 수가 없습니다. 넓은 화면에서 보이는
                모습은 안에 있을 때와 같습니다. */}
            <Link className="pbn__m" href={b.href}>
              Read more
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
