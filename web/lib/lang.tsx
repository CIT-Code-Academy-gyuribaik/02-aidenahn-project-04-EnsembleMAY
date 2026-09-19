"use client";

/* 화면 언어. 고른 값은 localStorage 에 두고, 읽는 일은 화면에 붙은 뒤에 합니다 —
   첫 그림에서 읽으면 서버가 만든 HTML(늘 KOR)과 어긋나 하이드레이션 경고가 납니다. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "kor" | "eng";

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

  useEffect(() => {
    document.documentElement.dataset.lang = lang;

    /* 화면 읽어 주는 프로그램이 어느 말로 읽을지 정하는 자리입니다 — 글은 영어로
       바뀌었는데 lang 이 ko 로 남아 있으면 한국어 발음으로 읽습니다. */
    document.documentElement.lang = lang === "eng" ? "en" : "ko";
  }, [lang]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (isLang(saved)) setLang(saved);
    } catch {
      /* 저장소를 못 쓰는 브라우저 — 기억하지 않고 넘어갑니다. */
    }
  }, []);

  const toggle = useCallback(() => {
    const next: Lang = lang === "kor" ? "eng" : "kor";
    setLang(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* 못 적어도 이번 화면에서는 바뀐 채로 씁니다. */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
