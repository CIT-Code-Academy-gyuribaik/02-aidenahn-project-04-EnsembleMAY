import type { LbItem } from "@/components/Lightbox";
import { photosOf, showById, type Photo } from "@/lib/content";
import type { Lang } from "@/lib/lang";
import { pickText } from "@/lib/i18n";

const DEFAULT_RATIO = "3/2";

export function captionOf(showId: string | undefined, lang: Lang): string {
  const s = showById(showId);
  return s ? [pickText(lang, s.title, s.titleEn), s.date].filter(Boolean).join(" · ") : "";
}

export function toLbItem(p: Photo, lang: Lang): LbItem {
  return {
    src: p.src,
    ratio: p.ratio || DEFAULT_RATIO,
    title: pickText(lang, p.title, p.titleEn),
    caption: captionOf(p.show, lang),
  };
}

export function toLbItems(list: readonly Photo[], lang: Lang): LbItem[] {
  return list.map((p) => toLbItem(p, lang));
}

export function showAlbum(shows: readonly { id: string }[], lang: Lang) {
  const items: LbItem[] = [];
  const startOf = new Map<string, number>();

  for (const s of shows) {
    const pics = photosOf(s.id);
    if (!pics.length) continue;
    startOf.set(s.id, items.length);
    items.push(...toLbItems(pics, lang));
  }

  return { items, startOf };
}
