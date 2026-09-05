"use client";

/* ==========================================================================
   상단 바 + 모바일 서랍 + 갈래

   예전 main.js 가 클래스를 붙였다 뗐다 하던 것을 React 상태로 옮겼습니다.
   내는 마크업(클래스 이름)은 예전과 똑같습니다 — style.css 를 한 줄도
   고치지 않고 그대로 쓰기 위해서입니다.

   ── 왜 셋이 한 파일에 있나 ──
   상단 바의 햄버거와 서랍이 같은 "열림" 상태를 나눠 씁니다. 그리고 갈래
   (넓은 화면에서 항목에 마우스를 올리면 바 아래로 내려오는 목록)는
   <header> 밖에 그려야 해서 — 이유는 style.css 의 .subnav 주석에 —
   "어느 항목에 올렸는지" 를 여기서 들고 내비와 갈래에 나눠 줍니다.
   따로 두면 그 상태를 결국 여기까지 끌어올려야 합니다.
   ========================================================================== */

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

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();

  /* 내비와 갈래가 같은 <nav> 를 봅니다 — 갈래는 [올려놓은 항목이 화면
     어디에 있는지] 를 알아야 그 밑에 설 수 있습니다. */
  const navRef = useRef<HTMLElement>(null);

  /* 밑줄이 가 있는(=마우스나 초점이 올라가 있는) 항목 */
  const [hover, setHover] = useState<string | null>(null);
  /* 내려 놓은 갈래. 닫을 때 비우지 않습니다 — 비우면 금선이 길이를 잃고
     찌그러지면서 사라집니다. 사라지는 동안에도 갈래는 갈래여야 합니다. */
  const [item, setItem] = useState<NavItem | null>(null);
  const [sub, setSub] = useState(false);
  const shutT = useRef<number | undefined>(undefined);

  /* 닫으려던 것을 무릅니다. 항목에서 갈래로 건너가는 동안 부릅니다. */
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

  /* 항목은 바 한가운데에, 갈래는 바 아래에 있어서 그 사이에 빈 자리가
     있습니다. 벗어나자마자 닫아 버리면 마우스가 갈래에 닿기 전에 사라져서
     누를 방법이 없습니다 — 지나갈 만큼만 기다렸다 닫습니다. */
  const shut = useCallback(() => {
    keep();
    shutT.current = window.setTimeout(() => {
      setHover(null);
      setSub(false);
    }, 180);
  }, [keep]);

  /* 갈래를 고르면 할 일은 끝났습니다. 페이지가 바뀌는 동안 떠 있으면
     새 화면 위에 그대로 남습니다. */
  const done = useCallback(() => {
    keep();
    setSub(false);
  }, [keep]);

  useEffect(() => keep, [keep]);

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
            <span data-active={lang === "kor"}>KOR</span>
            <span aria-hidden="true">·</span>
            <span data-active={lang === "eng"}>ENG</span>
          </button>

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

      {/* 갈래는 <header> 밖입니다 — 홈의 상단 바에 걸린 backdrop-filter
          안쪽에 두면 블러가 뒤 화면을 못 잡습니다. 자세한 것은 style.css 의
          .subnav 주석에. */}
      <SubNav
        item={item}
        open={sub}
        pathname={pathname}
        navRef={navRef}
        onKeep={keep}
        onShut={shut}
        onDone={done}
      />

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
              {it.label[lang]}
            </Link>
          ))}
          <button className="menu__lang" onClick={toggle}>
            <span data-active={lang === "kor"}>KOR</span>
            <span aria-hidden="true">·</span>
            <span data-active={lang === "eng"}>ENG</span>
          </button>
        </div>
      </div>
    </>
  );
}

/* ── 상단 내비 : 밑줄이 마우스를 따라갑니다 ──────────────────────────────
   현재 페이지 아래 있던 선 하나가 올려놓은 항목으로 미끄러져 가고,
   벗어나면 제자리로 돌아옵니다.

   어느 항목에 올렸는지(hover)는 위에서 내려받습니다 — 같은 값으로 갈래가
   설 자리를 정하기 때문입니다. 여기서는 그 값을 선의 자리로만 옮깁니다.

   ★ 좁은 화면(≤900px)에는 이 내비가 없습니다. 손가락에는 hover 가 없어서
     어차피 쓸 수 없고, 그쪽은 햄버거 서랍이 맡습니다.                   */
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

  /* 선을 어디에 둘지. hover 중이면 그 항목, 아니면 현재 페이지.
     둘 다 없으면 선을 감춥니다. */
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
    <nav className="nav is-ind" aria-label="주 메뉴" ref={navRef} onMouseLeave={onShut}>
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
          {it.label[lang]}
        </Link>
      ))}
      <span className="nav__ind" ref={indRef} />
    </nav>
  );
}

/* 자리 계산은 화면에 그려지기 전에 끝나야 합니다 — 그리고 나서 옮기면
   갈래가 엉뚱한 자리에서 한 프레임 번쩍입니다. 다만 서버에는 그릴 화면이
   없어서 useLayoutEffect 가 경고를 냅니다. 브라우저에서만 그쪽을 씁니다. */
const useOnLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ── 갈래 : 올려놓은 항목 바로 밑에 매달립니다 ──────────────────────────
   ★ 왼끝을 항목의 왼끝에 맞춥니다.
     한때 항목 한가운데에서 내려오게 했는데, 그러면 어느 낱말에 달린
     것인지가 흐려집니다. 글자가 시작하는 자리에서 함께 시작해야 위아래가
     한 줄로 읽힙니다.
   ★ 마지막 항목(Contact)도 예외가 아닙니다.
     오른쪽 끝에 붙어 있어 갈래가 본문 폭 밖으로 나가지만, 화면에는 아직
     자리가 남아 있습니다. 본문 폭이 아니라 [화면] 을 기준으로만 막아
     두어서, 정말 좁지 않은 한 왼끝 맞춤이 그대로 지켜집니다.
   ★ 옮기는 데 전환을 걸지 않습니다. 다른 항목으로 건너갈 때 금선이
     미끄러지면 "같은 선이 움직인다" 로 읽히는데, 실제로는 매달린 것이
     통째로 바뀐 다른 선입니다. 그 자리에서 바뀌는 편이 정직합니다.     */
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
          /* 한 줄씩 차례로 옵니다. style.css 가 읽는 --d 는 Reveal 이
             스크롤 등장에 쓰는 것과 같은 이름입니다. 금선이 다 그어지기
             전에 첫 줄이 뜨도록 90ms 부터 시작합니다. */
          style={{ ["--d" as string]: `${90 + i * 70}ms` }}
          /* 뿌리 갈래는 모든 하위 주소의 앞부분이라 "정확히 같은지" 를
             봐야 합니다 — 앞부분만 맞으면 된다고 두면 /concert/past/
             에서도 [공연 정보] 가 함께 켜집니다. SubTabs 와 같은 규칙. */
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
