"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import type { Text } from "@/lib/i18n";

export type HeroShot = {
  src: string;

  alt: Text;

  pos: string;

  narrow?: boolean;

  light?: boolean;

  band?: boolean;
  width: number;
  height: number;
};

export default function HeroPhoto({ shots }: { shots: readonly HeroShot[] }) {
  const { lang } = useLang();
  const [at, setAt] = useState<number | null>(null);

  useEffect(() => {
    setAt(Math.floor(Math.random() * shots.length));
  }, [shots.length]);

  if (at === null) return <div className="phead__ph" />;

  const shot = shots[at];
  return (
    <div
      className={
        "phead__ph" +
        (shot.narrow ? " phead__ph--narrow" : "") +
        (shot.band ? " phead__ph--band" : "") +
        (shot.light ? " phead__ph--light" : "")
      }
      style={{ ["--ph-pos" as string]: shot.pos }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={shot.alt[lang]}
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
