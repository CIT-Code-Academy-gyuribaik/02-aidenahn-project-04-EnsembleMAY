"use client";

import { useLang } from "@/lib/lang";
import type { Text } from "@/lib/i18n";

export default function Say({ t }: { t: Text }) {
  const { lang } = useLang();
  return <>{t[lang]}</>;
}
