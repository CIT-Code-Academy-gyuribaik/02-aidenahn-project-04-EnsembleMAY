"use client";

/* 상단 바 + 모바일 서랍 + 갈래 예전 main.js 가 클래스를 붙였다 뗐다 하던 것을 React 상태로 옮겼습니다. */

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

  /* 내비와 갈래가 같은 <nav> 를 봅니다 — 갈래는 [올려놓은 항목이 화면 어디에 있는지] 를 알아야 그 밑에 설 수 있습니다. */
  const navRef = useRef<HTMLElement>(null);

  /* 밑줄이 가 있는(=마우스나 초점이 올라가 있는) 항목 */
  const [hover, setHover] = useState<string | null>(null);
  /* 내려 놓은 갈래. */
  const [item, setItem] = useState<NavItem | null>(null);
  const [sub, setSub] = useState(false);
  const shutT = useRef<number | undefined>(undefined);

  /* 닫으려던 것을 무릅니다. */
  const keep = useCallback(() => window.clearTimeout(shutT.current), []);

  const show = useCallback(
    (it: NavItem) => {
      keep();
      setHover(it.href);
      if (it.sub) {
        setItem(it);
        setSub(true);
      } else {
        /* Home 처럼 갈래가 없는 항목 위에서는 내려 둘 것이 없습니다. */
        setSub(false);
      }
    },
    [keep]
  );

  /* 항목은 바 한가운데에, 갈래는 바 아래에 있어서 그 사이에 빈 자리가 있습니다. */
  const shut = useCallback(() => {
    keep();
    shutT.current = window.setTimeout(() => {
      setHover(null);
      setSub(false);
    }, 180);
  }, [keep]);

  /* 갈래를 고르면 할 일은 끝났습니다. */
  const done = useCallback(() => {
    keep();
    setSub(false);
  }, [keep]);

  useEffect(() => keep, [keep]);

  /* 지금 보고 있는 페이지인지. */
  const isHere = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  /* ── 서랍이 열려 있는 동안 뒤 화면이 안 밀리게 ── style.css 의 body.menu-open{overflow:hidden} 을 그대로 씁니다. */
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  /* 페이지를 옮기면 서랍은 닫습니다. */
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

  return (
    <>
      <header className="hdr">
        <div className="hdr__bar">
          <Link className="hdr__logo" href="/">
            <span className="hdr__mark" aria-hidden="true" />
            <span className="hdr__wm">Ensemble MAY</span>
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

      {/* 모바일 서랍 : 오른쪽에서 밀려 들어옵니다. */}
      <div
        className={"menu" + (open ? " is-open" : "")}
        id="menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="menu__panel">
          <button className="menu__x" aria-label={T.common.closeMenu[lang]} onClick={() => setOpen(false)}>
            &times;
          </button>
          {NAV.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              aria-current={isHere(it.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {/* 좁은 화면의 서랍도 같은 상단 메뉴라 영문으로 둡니다 */}
              {it.label.eng}
            </Link>
          ))}
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

/* ── 상단 내비 : 밑줄이 마우스를 따라갑니다 현재 페이지 아래 있던 선 하나가 올려놓은 항목으로 미끄러져 가고, 벗어나면 제자리로 돌아옵니다.
   ★ 좁은 화면(≤900px)에는 이 내비가 없습니다. */
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

  /* 선을 어디에 둘지. */
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
          {/* ★ 상단 바의 다섯 낱말은 KOR 에서도 영문입니다. */}
          {it.label.eng}
        </Link>
      ))}
      <span className="nav__ind" ref={indRef} />
    </nav>
  );
}

/* 자리 계산은 화면에 그려지기 전에 끝나야 합니다 — 그리고 나서 옮기면 갈래가 엉뚱한 자리에서 한 프레임 번쩍입니다. */
const useOnLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ── 갈래 : 올려놓은 항목 바로 밑에 매달립니다
   ★ 왼끝을 항목의 왼끝에 맞춥니다. */
const EDGE = 14; // 화면 가장자리에 남겨 두는 여백

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

    /* position:fixed 라 자리는 화면 좌표 그대로입니다. */
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
          /* 한 줄씩 차례로 옵니다. */
          style={{ ["--d" as string]: `${90 + i * 70}ms` }}
          /* 뿌리 갈래는 모든 하위 주소의 앞부분이라 "정확히 같은지" 를 봐야 합니다 — 앞부분만 맞으면 된다고 두면 /concert/past/ 에서도 [공연
             정보] 가 함께 켜집니다. */
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
