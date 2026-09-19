"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { T } from "@/lib/i18n";

export default function CharityCta({ anchor = false }: { anchor?: boolean }) {
  const { lang } = useLang();

  return (
    <section className="cta" id={anchor ? "charity" : undefined}>
      <div className="wrap">

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
