import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { GALLERY, MEMBERS } from "@/lib/content";

/* ==========================================================================
   홈 — 배너 목록

   단원과 활동 사진을 홈에서 전부 펼치지 않고, 대표 사진 한 장씩만 걸고
   각자의 페이지로 보냅니다.

   대표 사진은 목록 맨 앞을 씁니다 — 사람이 따로 고르지 않아도 되고,
   목록 순서를 바꾸면 배너 사진도 같이 바뀝니다.

   움직이는 것이 없어서 "use client" 가 없습니다. 서버에서 HTML 로
   만들어 두면 브라우저가 받을 자바스크립트가 그만큼 줄어듭니다.
   ========================================================================== */

const BANNERS = [
  {
    href: "/about/",
    kicker: "Members",
    title: "함께 연주하는 아이들",
    body: "바이올린 · 비올라 · 첼로. 잘 하는 아이들만 모인 곳이 아니라, 함께 연습하며 자라는 자리입니다.",
    src: MEMBERS[0]?.src,
    alt: "앙상블 메이 단원",
  },
  {
    href: "/gallery/",
    kicker: "Gallery",
    title: "활동 사진",
    body: "정기 연주회와 자선 공연, 그 사이사이의 연습. 아이들이 지나온 자리를 모았습니다.",
    src: GALLERY[0]?.src,
    alt: GALLERY[0]?.title ?? "앙상블 메이 활동 사진",
  },
] as const;

export default function HomeBanners() {
  return (
    <div className="bnr">
      {BANNERS.map((b, i) => (
        <Reveal key={b.href} delay={i * 90}>
          <Link className="bnr__c" href={b.href}>
            <span className="bnr__ph">
              {b.src && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={b.src} alt={b.alt} loading="lazy" />
              )}
              <span className="bnr__ov" />
            </span>
            <span className="bnr__t">
              <span className="bnr__k">{b.kicker}</span>
              <span className="bnr__h">{b.title}</span>
              <span className="bnr__b">{b.body}</span>
              <span className="bnr__m">read more</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
