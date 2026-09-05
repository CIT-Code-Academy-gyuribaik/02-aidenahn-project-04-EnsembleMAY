"use client";

/* ==========================================================================
   화면 언어 — 상단 바의 [KOR · ENG]

   메뉴 이름만 갈아 끼웁니다. 본문은 한국어 그대로입니다 — 그래서
   components/Shell.tsx 의 <html lang="ko"> 도 바꾸지 않습니다.

   ★ 고른 언어를 기억합니다(localStorage).
     기억하지 않으면 페이지를 옮길 때마다 KOR 로 되돌아갑니다. 이 사이트는
     홈과 서브페이지가 라우트 그룹이 달라 그 사이를 오갈 때 브라우저가
     문서를 새로 받습니다(까닭은 components/ScrollTop.tsx 주석에) — 그러면
     화면 안의 기억은 통째로 사라집니다. ENG 로 바꾼 분이 About 을 누르는
     순간 한국어로 돌아가는 것이 그 증상이었습니다.

   ★ 읽는 일은 화면에 붙은 뒤에 합니다(useEffect).
     서버에는 localStorage 가 없습니다. 첫 그림에서 바로 읽으면 서버가
     만든 HTML(늘 KOR)과 브라우저가 그린 것이 어긋나 하이드레이션 경고가
     납니다. 그래서 KOR 로 시작하고, 붙자마자 기억해 둔 값으로 맞춥니다 —
     components/HeroPhoto.tsx 가 사진을 고르는 방식과 같습니다.
     ENG 를 골라 둔 분에게는 첫 순간 KOR 이 한 번 스치는데, 메뉴 다섯
     낱말이라 눈에 띄지 않습니다.

   ★ localStorage 는 없을 수도 있습니다.
     시크릿 창이나 쿠키를 막아 둔 브라우저에서는 읽고 쓰는 것 자체가
     예외를 던집니다. 언어 기억 하나 때문에 화면이 죽으면 안 되므로
     try 로 감싸고, 실패하면 그냥 기억하지 않습니다.
   ========================================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "kor" | "eng";

/** localStorage 열쇠. 다른 사이트와 섞이지 않게 앞에 이름을 답니다. */
const KEY = "may:lang";

function isLang(v: unknown): v is Lang {
  return v === "kor" || v === "eng";
}

const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "kor",
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("kor");

  /* 지난번에 고른 것을 되살립니다. 한 번만 합니다. */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (isLang(saved)) setLang(saved);
    } catch {
      /* 저장소를 못 쓰는 브라우저 — 그냥 KOR 로 둡니다 */
    }
  }, []);

  /* 바꾸는 순간에 함께 적어 둡니다.
     효과(useEffect)로 미루지 않는 이유 — 처음 그릴 때도 한 번 돌면서
     위에서 되살린 값을 KOR 로 덮어씁니다. 바뀌는 계기가 이 누름 하나뿐이라
     여기서 함께 처리하는 편이 확실합니다. */
  const toggle = useCallback(() => {
    const next: Lang = lang === "kor" ? "eng" : "kor";
    setLang(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* 못 적어도 이번 화면에서는 바뀐 채로 씁니다 */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
