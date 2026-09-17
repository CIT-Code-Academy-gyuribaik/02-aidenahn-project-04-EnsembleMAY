"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubTab, NavLabel } from "@/lib/nav";
import { useLang } from "@/lib/lang";

export type { SubTab };

export default function SubTabs({
  label,
  tabs,
}: {
  label: NavLabel;
  tabs: readonly SubTab[];
}) {
  const pathname = usePathname();
  const { lang } = useLang();

  const root = tabs[0]?.href;

  return (
    <nav className="abt" aria-label={label[lang]}>
      <div className="abt__in">
        {tabs.map((t) => {
          const here = t.href === root ? pathname === t.href : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="abt__b"
              aria-current={here ? "page" : undefined}
            >
              {t.label[lang]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
