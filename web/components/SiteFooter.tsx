/* ==========================================================================
   푸터

   ★ 예전에는 전화번호와 메일 주소가 HTML 6장에 각각 박혀 있었습니다.
     content.js 에 CONTACT 가 따로 있는데도요 — 번호를 바꾸면 일곱 군데를
     고쳐야 했고, 한 곳만 빠뜨리기 딱 좋았습니다.
     이제 web/content/site.json 의 contact 한 곳만 고치면 전부 따라옵니다.

   이 컴포넌트에는 "use client" 가 없습니다. 움직이는 것이 없는 화면이라
   서버에서 HTML 로 만들어 두면 됩니다 — 브라우저가 받을 자바스크립트가
   그만큼 줄어듭니다.
   ========================================================================== */

import Link from "next/link";
import { CONTACT } from "@/lib/content";

/** tel: 링크는 숫자만 받습니다. "010-1234-5678" → "01012345678" */
const telHref = `tel:${CONTACT.tel.replace(/[^0-9+]/g, "")}`;

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__brand">
            <Link className="foot__logo" href="/">
              앙상블 메이
            </Link>
            <span className="foot__en">Ensemble MAY</span>
            <p>
              음악을 사랑하는 아이들이 만들어 가는 현악 앙상블. 연주로 얻은 것을 필요한 곳에
              나눕니다.
            </p>
            <div className="foot__sns">
              <a
                href="https://www.instagram.com/ensemble_m.a.y/"
                target="_blank"
                rel="noopener"
              >
                Instagram
              </a>
            </div>
          </div>

          <nav className="foot__col" aria-label="앙상블 소개">
            <h2>About</h2>
            <ul>
              <li>
                <Link href="/about/">단원</Link>
              </li>
              <li>
                <Link href="/about/director/">단장 이야기</Link>
              </li>
              <li>
                <Link href="/about/history/">주요 연혁</Link>
              </li>
              <li>
                <Link href="/about/story/">앙상블메이 스토리</Link>
              </li>
            </ul>
          </nav>

          <nav className="foot__col" aria-label="공연">
            <h2>Concert</h2>
            <ul>
              <li>
                <Link href="/concert/">정기 · 자선 공연</Link>
              </li>
              <li>
                <Link href="/concert/#repertoire">연주한 곡</Link>
              </li>
              <li>
                <Link href="/concert/#history">지난 공연</Link>
              </li>
              <li>
                <Link href="/concert/#charity">자선 공연 문의</Link>
              </li>
            </ul>
          </nav>

          <nav className="foot__col" aria-label="기록과 문의">
            <h2>Gallery &amp; Contact</h2>
            <ul>
              <li>
                <Link href="/gallery/#photos">활동 사진</Link>
              </li>
              <li>
                <Link href="/gallery/#videos">연주 영상</Link>
              </li>
              <li>
                <Link href="/contact/">문의 · 자주 받는 질문</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="foot__bot">
          <div className="foot__meta">
            <span>대표 ○○○</span>
            <span>
              <a href={telHref}>{CONTACT.tel}</a>
            </span>
            <span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </span>
            <span>@ensemble_m.a.y</span>
          </div>
          <div className="foot__legal">
            <Link href="/privacy/">개인정보처리방침</Link>
            <span className="foot__c">© 2026 Ensemble MAY. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
