"use client";

/* 자선 공연 신청 안내 띠 두 곳이 같은 것을 씁니다.
   ★ 팝업이 아니라 링크입니다. */

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";

export default function CharityCta({ anchor = false }: { anchor?: boolean }) {
  const { lang } = useLang();

  return (
    <section className="cta" id={anchor ? "charity" : undefined}>
      <div className="wrap">
        {/* 제목과 단추 둘뿐입니다. */}
        <h2>{T.cta.title[lang]}</h2>
        <div className="cta__b">
          <Link className="btn btn--ghost" href="/contact/charity/">
            {T.cta.button[lang]}
          </Link>
        </div>
      </div>
    </section>
  );
}
