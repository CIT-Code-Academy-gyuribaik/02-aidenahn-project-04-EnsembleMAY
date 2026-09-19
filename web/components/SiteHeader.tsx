"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { NAV, type NavItem } from "@/lib/nav";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();

  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const [hover, setHover] = useState<string | null>(null);

  const [item, setItem] = useState<NavItem | null>(null);
  const [sub, setSub] = useState(false);
  const shutT = useRef<number | undefined>(undefined);

  const keep = useCallback(() => window.clearTimeout(shutT.current), []);

  const show = useCallback(
    (it: NavItem) => {
      keep();
      setHover(it.href);
      if (it.sub) {
        setItem(it);
        setSub(true);
      } else {
        setSub(false);
      }
    },
    [keep]
  );

  const shut = useCallback(() => {
    keep();
    shutT.current = window.setTimeout(() => {
      setHover(null);
      setSub(false);
    }, 180);
  }, [keep]);

  const done = useCallback(() => {
    keep();
    setSub(false);
  }, [keep]);

  useEffect(() => keep, [keep]);

  const isHere = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  /* 홈의 상단 바는 첫 화면 사진 위에 그냥 얹혀 있습니다. 좁은 화면에는 칸 단위
     스냅이 없어서 밝은 칸(소개 배너의 흰 카드)이 바 밑으로 지나가는데, 그때 흰
     글씨가 읽히지 않습니다. 조금이라도 내려갔으면 바에 바탕을 깔아 줍니다.
     넓은 화면은 스냅이 문서를 잠가 두어 scrollY 가 0 이라 그대로입니다. */
  useEffect(() => {
    /* 스크롤은 1초에 수십 번 옵니다 — 값이 실제로 바뀔 때만 손을 댑니다. */
    let on: boolean | null = null;
    const sync = () => {
      const next = window.scrollY > 24;
      if (next === on) return;
      on = next;
      document.body.classList.toggle("is-scrolled", next);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      document.body.classList.remove("is-scrolled");
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open && !sub) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setSub(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, sub]);

  /* 서랍이 열린 동안은 초점을 안에 가둡니다 — 탭이 뒤 페이지로 새면 키보드로만
     다니는 분이 보이지도 않는 곳에 초점을 둔 채 헤매게 됩니다. 닫을 때는 햄버거로
     되돌려 줍니다. */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const burger = burgerRef.current;
    if (!panel) return;

    const pick = () =>
      [...panel.querySelectorAll<HTMLElement>("a[href],button")].filter(
        (el) => !el.hasAttribute("disabled")
      );

    pick()[0]?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = pick();
      if (!list.length) return;
      const edge = e.shiftKey ? list[0] : list[list.length - 1];
      if (document.activeElement !== edge) return;
      e.preventDefault();
      (e.shiftKey ? list[list.length - 1] : list[0]).focus();
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (burger && document.body.contains(burger)) {
        burger.focus({ preventScroll: true });
      }
    };
  }, [open]);

  return (
    <>
      <header className="hdr">
        <div className="hdr__bar">
          <Link className="hdr__logo" href="/">
            <span className="hdr__mark" aria-hidden="true" />
            <span className="hdr__wm">Ensemble M.A.Y.</span>
          </Link>

          <DesktopNav
            isHere={isHere}
            hover={hover}
            navRef={navRef}
            onShow={show}
            onShut={shut}
            onDone={done}
            lang={lang}
          />

          <button
            className="lang-btn"
            aria-label="언어 전환 / Switch language"
            onClick={toggle}
          >
            <span data-active={lang === "kor"}>KR</span>
            <span aria-hidden="true">|</span>
            <span data-active={lang === "eng"}>EN</span>
          </button>

          <button
            className="burger"
            ref={burgerRef}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? T.common.closeMenu[lang] : T.common.openMenu[lang]}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* 갈래는 <header> 밖입니다 — 홈의 상단 바에 걸린 backdrop-filter 안쪽에 두면 블러가 뒤 화면을 못 잡습니다. */}
      <SubNav
        item={item}
        open={sub}
        pathname={pathname}
        navRef={navRef}
        onKeep={keep}
        onShut={shut}
        onDone={done}
      />

      <div
        className={"menu" + (open ? " is-open" : "")}
        id="menu"
        role="dialog"
        aria-modal="true"
        aria-label={T.common.mainMenu[lang]}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="menu__panel" ref={panelRef}>
          <button className="menu__x" aria-label={T.common.closeMenu[lang]} onClick={() => setOpen(false)}>
            &times;
          </button>

          {/* 좁은 화면에는 갈래 메뉴가 뜨지 않으므로, 서랍 안에 한 벌 더 펼쳐 둡니다 —
              그러지 않으면 /about/story/ 같은 속페이지는 한 번 들어가 봐야만 보입니다. */}
          <nav className="menu__nav" aria-label={T.common.mainMenu[lang]}>
            {NAV.map((it) => (
              <div className="menu__grp" key={it.href}>
                <Link
                  className="menu__a"
                  href={it.href}
                  aria-current={isHere(it.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {it.label.eng}
                </Link>

                {it.sub && (
                  <div className="menu__sub">
                    {it.sub.map((t) => (
                      <Link
                        key={t.href}
                        className="menu__b"
                        href={t.href}
                        aria-current={
                          (t.href === it.href ? pathname === t.href : pathname.startsWith(t.href))
                            ? "page"
                            : undefined
                        }
                        onClick={() => setOpen(false)}
                      >
                        {t.label[lang]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button className="menu__lang" onClick={toggle}>
            <span data-active={lang === "kor"}>KR</span>
            <span aria-hidden="true">|</span>
            <span data-active={lang === "eng"}>EN</span>
          </button>
        </div>
      </div>
    </>
  );
}

function DesktopNav({
  isHere,
  hover,
  navRef,
  onShow,
  onShut,
  onDone,
  lang,
}: {
  isHere: (href: string) => boolean;
  hover: string | null;
  navRef: RefObject<HTMLElement | null>;
  onShow: (it: NavItem) => void;
  onShut: () => void;
  onDone: () => void;
  lang: "kor" | "eng";
}) {
  const indRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const ind = indRef.current;
    if (!nav || !ind) return;

    const target = hover ?? NAV.find((i) => isHere(i.href))?.href ?? null;
    const el = target ? nav.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;

    if (el && el.offsetWidth) {
      ind.style.width = `${el.offsetWidth}px`;
      ind.style.transform = `translateX(${el.offsetLeft}px)`;
      ind.style.opacity = "1";
    } else {
      ind.style.opacity = "0";
    }
  }, [hover, isHere, navRef, lang]);

  return (
    <nav className="nav is-ind" aria-label={T.common.mainMenu[lang]} ref={navRef} onMouseLeave={onShut}>
      {NAV.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          data-href={it.href}
          aria-current={isHere(it.href) ? "page" : undefined}
          onMouseEnter={() => onShow(it)}
          onFocus={() => onShow(it)}
          onBlur={onShut}
          onClick={onDone}
        >

          {it.label.eng}
        </Link>
      ))}
      <span className="nav__ind" ref={indRef} />
    </nav>
  );
}

const useOnLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

const EDGE = 14;

function SubNav({
  item,
  open,
  pathname,
  navRef,
  onKeep,
  onShut,
  onDone,
}: {
  item: NavItem | null;
  open: boolean;
  pathname: string;
  navRef: RefObject<HTMLElement | null>;
  onKeep: () => void;
  onShut: () => void;
  onDone: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  useOnLayout(() => {
    const nav = navRef.current;
    const box = boxRef.current;
    if (!nav || !box || !item) return;

    const el = nav.querySelector<HTMLElement>(`[data-href="${item.href}"]`);
    if (!el) return;

    const x = el.getBoundingClientRect().left;
    const last = window.innerWidth - EDGE - box.offsetWidth;
    box.style.left = `${Math.max(EDGE, Math.min(x, last))}px`;
  }, [item, open, navRef, lang]);

  return (
    <div
      className={"subnav" + (open ? " is-open" : "")}
      ref={boxRef}
      onMouseEnter={onKeep}
      onMouseLeave={onShut}
    >
      {item?.sub?.map((t, i) => (
        <Link
          key={t.href}
          href={t.href}
          className="subnav__b"

          style={{ ["--d" as string]: `${90 + i * 70}ms` }}

          aria-current={
            (t.href === item.href ? pathname === t.href : pathname.startsWith(t.href))
              ? "page"
              : undefined
          }
          onFocus={onKeep}
          onBlur={onShut}
          onClick={onDone}
        >
          {t.label[lang]}
        </Link>
      ))}
    </div>
  );
}
