"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "kor" | "eng";

const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "kor",
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("kor");
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang((l) => (l === "kor" ? "eng" : "kor")) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
