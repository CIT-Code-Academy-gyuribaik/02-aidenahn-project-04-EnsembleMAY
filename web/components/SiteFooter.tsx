"use client";

import Link from "next/link";
import { CONTACT } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";

const NAV = [
  { href: "/", label: { kor: "처음으로", eng: "Home" } },
  { href: "/about/", label: { kor: "앙상블 소개", eng: "About" } },
  { href: "/concert/", label: { kor: "공연 안내", eng: "Concert" } },
  { href: "/gallery/", label: { kor: "활동 사진", eng: "Gallery" } },
  { href: "/contact/", label: { kor: "문의", eng: "Contact" } },
] as const;

export default function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="foot">
      <nav className="foot__nav" aria-label={T.common.footerMenu[lang]}>
        <div className="wrap">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label[lang]}
            </Link>
          ))}
        </div>
      </nav>

      <div className="foot__bot">
        <div className="wrap">
          {/* 눌러서 바로 쓰고 바로 겁니다. */}
          <p className="foot__meta">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a
              href="https://www.instagram.com/ensemble_m.a.y/"
              target="_blank"
              rel="noopener"
            >
              @ensemble_m.a.y
            </a>
            <a href={`tel:${CONTACT.tel.replace(/[^0-9+]/g, "")}`}>
              <b>TEL :</b>&nbsp;{CONTACT.tel}
            </a>
          </p>
          <p className="foot__c">
            Copyright © 2026 <b>{T.common.siteName[lang]}</b>{" "}
            <a href="https://www.ensemblemay.com">www.ensemblemay.com</a> All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
