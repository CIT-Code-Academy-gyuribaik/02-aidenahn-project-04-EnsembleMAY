/* ==========================================================================
   푸터

   ★ 전화번호와 메일 주소는 web/content/site.json 의 contact 한 곳에서 옵니다.
     예전에는 HTML 6장에 각각 박혀 있어서, 번호를 바꾸면 일곱 군데를 고쳐야
     했고 한 곳만 빠뜨리기 딱 좋았습니다.

   ★ 넉 줄짜리 큰 푸터(브랜드 소개 + 링크 세 단)에서 두 줄짜리 띠로
     줄였습니다. 링크 세 단은 상단 바와 하위 메뉴 띠가 이미 하는 일을
     한 번 더 하고 있었고, 바닥에서 그만큼 자리를 차지할 이유가 없었습니다.
     대신 페이지 목록은 빗금으로 이은 한 줄로 남깁니다 — 바닥까지 내려온
     사람이 다른 데로 갈 길은 있어야 합니다.

   이 컴포넌트에는 "use client" 가 없습니다. 움직이는 것이 없는 화면이라
   서버에서 HTML 로 만들어 두면 됩니다 — 브라우저가 받을 자바스크립트가
   그만큼 줄어듭니다.
   ========================================================================== */

import Link from "next/link";
import { CONTACT } from "@/lib/content";

const NAV = [
  { href: "/", label: "처음으로" },
  { href: "/about/", label: "앙상블 소개" },
  { href: "/concert/", label: "공연 안내" },
  { href: "/gallery/", label: "활동 사진" },
  { href: "/contact/", label: "문의" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="foot">
      <nav className="foot__nav" aria-label="푸터 메뉴">
        <div className="wrap">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="foot__bot">
        <div className="wrap">
          {/* 메일과 전화는 글자로만 둡니다 — 누르는 자리가 아니라 적어 두는
              자리입니다. 실제로 걸고 보내는 길은 Contact 페이지의 문의
              단추가 맡습니다. 인스타그램만 링크로 남깁니다: 계정 이름은
              그 자체가 "여기로 가면 있다" 는 주소입니다. */}
          <p className="foot__meta">
            <span>{CONTACT.email}</span>
            <a
              href="https://www.instagram.com/ensemble_m.a.y/"
              target="_blank"
              rel="noopener"
            >
              @ensemble_m.a.y
            </a>
            <span>
              <b>TEL :</b> {CONTACT.tel}
            </span>
          </p>
          <p className="foot__c">
            Copyright © 2026 <b>앙상블메이</b>{" "}
            <a href="https://www.ensemblemay.com">www.ensemblemay.com</a> All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
