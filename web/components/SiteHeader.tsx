"use client";

/* ==========================================================================
   상단 바 + 모바일 서랍

   예전 main.js 가 클래스를 붙였다 뗐다 하던 것을 React 상태로 옮겼습니다.
   내는 마크업(클래스 이름)은 예전과 똑같습니다 — style.css 를 한 줄도
   고치지 않고 그대로 쓰기 위해서입니다.

   두 가지를 한 파일에 둔 이유: 상단 바의 햄버거와 서랍이 같은 "열림"
   상태를 나눠 씁니다. 따로 두면 그 상태를 위로 끌어올려야 해서 오히려
   복잡해집니다.
   ========================================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Item = { href: string; label: string; cta?: boolean };

/* Contact 만 성격이 다릅니다 — 나머지 넷은 "어디를 볼까"고 이것만
   "연락해 주세요"입니다. 그래서 네모 단추로 나옵니다(.nav__cta). */
const NAV: Item[] = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/concert/", label: "Concert" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/contact/", label: "Contact", cta: true },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* 지금 보고 있는 페이지인지. trailingSlash 를 켜 두어서 주소 끝에
     슬래시가 붙습니다(/about/). 홈만 "/" 하나입니다. */
  const isHere = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  /* ── 서랍이 열려 있는 동안 뒤 화면이 안 밀리게 ──
     style.css 의 body.menu-open{overflow:hidden} 을 그대로 씁니다. */
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  /* 페이지를 옮기면 서랍은 닫습니다. 안 닫으면 새 페이지 위에 그대로 떠 있습니다. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="hdr">
        <div className="hdr__bar">
          <Link className="hdr__logo" href="/">
            <span className="hdr__mark" aria-hidden="true" />
            <span className="hdr__wm">Ensemble M.A.Y</span>
          </Link>

          <DesktopNav isHere={isHere} />

          <button
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* 모바일 서랍 : 오른쪽에서 밀려 들어옵니다.
          .menu 는 뒤를 덮는 막, .menu__panel 이 실제로 미끄러지는 판입니다.
          막을 눌러도 닫힙니다(아래 onClick 의 e.target === e.currentTarget). */}
      <div
        className={"menu" + (open ? " is-open" : "")}
        id="menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="menu__panel">
          <button className="menu__x" aria-label="메뉴 닫기" onClick={() => setOpen(false)}>
            &times;
          </button>
          {NAV.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              aria-current={isHere(it.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── 상단 내비 : 밑줄이 마우스를 따라갑니다 ──────────────────────────────
   현재 페이지 아래 있던 선 하나가 올려놓은 항목으로 미끄러져 가고,
   벗어나면 제자리로 돌아옵니다.

   Contact(네모 단추) 위에서는 따라오지 않고 제자리로 물러납니다 —
   테두리 안에 선이 하나 더 들어가면 지저분합니다.                      */
function DesktopNav({ isHere }: { isHere: (href: string) => boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  /* 선을 어디에 둘지. hover 중이면 그 항목, 아니면 현재 페이지.
     둘 다 없으면(홈에는 자기를 가리키는 항목이 있지만 CTA 는 제외)
     선을 감춥니다. */
  useEffect(() => {
    const nav = navRef.current;
    const ind = indRef.current;
    if (!nav || !ind) return;

    const target = hover ?? NAV.find((i) => !i.cta && isHere(i.href))?.href ?? null;
    const el = target ? nav.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;

    if (el && el.offsetWidth) {
      ind.style.width = `${el.offsetWidth}px`;
      ind.style.transform = `translateX(${el.offsetLeft}px)`;
      ind.style.opacity = "1";
    } else {
      ind.style.opacity = "0";
    }
  }, [hover, isHere]);

  return (
    <nav className="nav is-ind" aria-label="주 메뉴" ref={navRef} onMouseLeave={() => setHover(null)}>
      {NAV.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          data-href={it.href}
          className={it.cta ? "nav__cta" : undefined}
          aria-current={isHere(it.href) ? "page" : undefined}
          /* 네모 단추 위에서는 선이 따라오지 않습니다 */
          onMouseEnter={() => setHover(it.cta ? null : it.href)}
          onFocus={() => setHover(it.cta ? null : it.href)}
          onBlur={() => setHover(null)}
        >
          {it.label}
        </Link>
      ))}
      <span className="nav__ind" ref={indRef} />
    </nav>
  );
}
