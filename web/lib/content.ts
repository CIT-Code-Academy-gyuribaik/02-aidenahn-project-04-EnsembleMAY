import membersJson from "@/content/members.json";
import galleryJson from "@/content/gallery.json";
import showsJson from "@/content/shows.json";
import postersJson from "@/content/posters.json";
import videosJson from "@/content/videos.json";
import repertoireJson from "@/content/repertoire.json";
import siteJson from "@/content/site.json";

export type Member = {
  src: string;

  ratio: string;

  name: string;

  nameEn?: string;
  part: string;
};

export type Show = {
  id: string;
  date: string;
  title: string;
  titleEn?: string;
  venue: string;
  venueEn?: string;
  note: string;
  noteEn?: string;

  wide?: boolean;
};

export type Photo = {
  src: string;
  ratio: string;
  title: string;
  titleEn?: string;
  show?: string;
  tag: string;
};

export type Poster = {
  src: string;
  ratio: string;
  title: string;
  titleEn?: string;
  caption: string;
  captionEn?: string;
};

export type Video = {
  id?: string;
  ig?: string;
  mp4?: string;

  thumb?: string;
  title: string;
  titleEn?: string;
  meta: string;
  metaEn?: string;
};

export type Piece = {
  title: string;
  titleEn?: string;

  sub?: string;
  subEn?: string;
  composer: string;
  composerEn?: string;

  ensemble?: string;
  ensembleEn?: string;
};

export type Contact = { tel: string; email: string };

export type HeroMs = {
  hold: number;
  /* 녹아드는 시간. hold 보다 반드시 짧아야 합니다. */
  fade: number;
};

export function asset(path: string): string {
  if (!path) return "";
  if (path.startsWith("/") || /^https?:\/\//.test(path)) return path;
  return "/" + path;
}

function fixSrc<T extends { src: string }>(items: readonly T[]): T[] {
  return items.map((it) => ({ ...it, src: asset(it.src) }));
}

export const MEMBERS: Member[] = fixSrc(membersJson as Member[]);
export const GALLERY: Photo[] = fixSrc(galleryJson as Photo[]);
export const POSTERS: Poster[] = fixSrc(postersJson as Poster[]);
export const SHOWS: Show[] = showsJson as Show[];

export const VIDEOS: Video[] = (videosJson as Video[]).map((v) => ({
  ...v,
  mp4: v.mp4 ? asset(v.mp4) : undefined,
  thumb: v.thumb ? asset(v.thumb) : undefined,
}));

export const REPERTOIRE: Piece[] = repertoireJson as Piece[];

export const CONTACT: Contact = siteJson.contact;
export const HERO: string[] = siteJson.hero.map(asset);
export const HERO_MS: HeroMs = siteJson.heroMs;
export const HOME_VIDEO: Video = siteJson.homeVideo;

export function showById(id: string | undefined): Show | undefined {
  return id ? SHOWS.find((s) => s.id === id) : undefined;
}

export function photosOf(showId: string): Photo[] {
  return GALLERY.filter((p) => p.show === showId);
}

export function photoDate(p: Photo): string {
  const file = p.src.split("/").pop() ?? "";
  const m = /(\d{4})(\d{2})(\d{2})/.exec(file);
  if (m) return `${m[1]}.${m[2]}.${m[3]}`;
  return showById(p.show)?.date ?? "";
}
