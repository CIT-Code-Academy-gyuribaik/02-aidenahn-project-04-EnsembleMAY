/* 앙상블 메이 — 사이트 내용 한 곳 예전 data/content.js 를 web/content/*.json 으로 옮긴 것입니다. JSON 으로 바꾼
   이유가 두 가지 있습니다. 1. 나중에 붙일 관리자 페이지(CMS)가 다룰 수 있는 형식입니다. 자바스크립트 파일은 CMS 가 고치지 못합니다. 2.
   타입을 붙일 수 있어서, 항목 이름을 잘못 적으면 빌드가 실패합니다. 예전에는 오타가 나도 화면에 빈칸이 나올 뿐이라 알아채기 어려웠습니다.
   ★ 내용을 고치실 때는 web/content/ 안의 .json 파일만 보시면 됩니다. 이 파일(content.ts)은 그것을 읽어 화면에 넘겨 주는
     통로일 뿐입니다. ── 영문은 *En 짝으로 옆에 둡니다 ──
   ★ title 옆에 titleEn, venue 옆에 venueEn 을 두는 식입니다. 감싸서 { kor, eng } 로 만들지 않은 까닭이 둘 있습니다.
     1. 나중에 붙일 CMS 가 다루기 쉽습니다 — 칸 하나가 늘 뿐입니다. 2. 없어도 됩니다. 영문을 아직 안 적은 항목은 한국어가 그대로
     나옵니다(lib/i18n.ts 의 pickText). 번역이 밀렸다고 화면이 비는 것보다 낫습니다. */

import membersJson from "@/content/members.json";
import galleryJson from "@/content/gallery.json";
import showsJson from "@/content/shows.json";
import postersJson from "@/content/posters.json";
import videosJson from "@/content/videos.json";
import repertoireJson from "@/content/repertoire.json";
import siteJson from "@/content/site.json";

/* ── 생김새 */

/* 단원 한 명. name·part 를 빈 문자열로 두면 사진만 나옵니다. */
export type Member = {
  src: string;
  /* 사진 비율. "853/1280" 처럼 적습니다 — 사진이 늦게 와도 칸이 안 흔들립니다. */
  ratio: string;
  /* "김해든 Hayden Kim" 처럼 국문·영문을 한 줄에 적습니다. */
  name: string;
  /* 그중 영문만. ENG 에서 이것만 나옵니다 — 번역이 아니라 나누기입니다. */
  nameEn?: string;
  part: string;
};

/* 공연 한 번. id 는 갤러리 사진의 show 와 이어지는 열쇠입니다. */
export type Show = {
  id: string;
  date: string;
  title: string;
  titleEn?: string;
  venue: string;
  venueEn?: string;
  note: string;
  noteEn?: string;
  /* 지난 공연 카드에서 한 줄을 통째로 쓸지 */
  wide?: boolean;
};

/* 활동 사진 한 장. show 가 있으면 그 공연 사진으로 묶입니다. */
export type Photo = {
  src: string;
  ratio: string;
  title: string;
  titleEn?: string;
  show?: string;
  tag: string;
};

/* 공연 포스터 */
export type Poster = {
  src: string;
  ratio: string;
  title: string;
  titleEn?: string;
  caption: string;
  captionEn?: string;
};

/* 영상 한 편. 셋 중 하나만 있으면 됩니다. id   유튜브 영상 id      → 눌렀을 때 iframe ig   인스타그램 게시물 주소 mp4  직접
   올린 파일 경로 */
export type Video = {
  id?: string;
  ig?: string;
  mp4?: string;
  /* 유튜브는 적지 않아도 됩니다 — 유튜브가 주는 그림을 씁니다. */
  thumb?: string;
  title: string;
  titleEn?: string;
  meta: string;
  metaEn?: string;
};

/* 지금까지 연주한 곡 한 줄. 한 공연의 순서표가 아니라, 아이들이 올린 곡이 쌓인 목록입니다. 새 곡은 목록 맨 뒤에 더하면 됩니다 — 화면에서 두
   단으로 알아서 나뉩니다. */
export type Piece = {
  title: string;
  titleEn?: string;
  /* 부제. "from Spirited Away" 처럼 작은 기울임으로 붙습니다. */
  sub?: string;
  subEn?: string;
  composer: string;
  composerEn?: string;
  /* 편성. 솔로가 있는 곡에만 적습니다. */
  ensemble?: string;
  ensembleEn?: string;
};

export type Contact = { tel: string; email: string };

/* 히어로 사진이 넘어가는 속도. 1000 이 1초입니다. */
export type HeroMs = {
  /* 다음 장으로 넘어가는 간격 */
  hold: number;
  /* 녹아드는 시간. hold 보다 반드시 짧아야 합니다. */
  fade: number;
};

/* ── 경로 다듬기 json 에는 "assets/img/…" 처럼 앞에 슬래시 없이 적혀 있습니다. */
export function asset(path: string): string {
  if (!path) return "";
  if (path.startsWith("/") || /^https?:\/\//.test(path)) return path;
  return "/" + path;
}

function fixSrc<T extends { src: string }>(items: readonly T[]): T[] {
  return items.map((it) => ({ ...it, src: asset(it.src) }));
}

/* ── 내보내기 */

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

/* ── 사진과 공연 잇기 예전 main.js 에 있던 것을 그대로 옮겼습니다. */

export function showById(id: string | undefined): Show | undefined {
  return id ? SHOWS.find((s) => s.id === id) : undefined;
}

export function photosOf(showId: string): Photo[] {
  return GALLERY.filter((p) => p.show === showId);
}

/* 이 사진이 언제 것인가.
   ★ 파일 이름이 먼저입니다. */
export function photoDate(p: Photo): string {
  const file = p.src.split("/").pop() ?? "";
  const m = /(\d{4})(\d{2})(\d{2})/.exec(file);
  if (m) return `${m[1]}.${m[2]}.${m[3]}`;
  return showById(p.show)?.date ?? "";
}

