/* ==========================================================================
   앙상블 메이 — 사이트 내용 한 곳

   예전 data/content.js 를 web/content/*.json 으로 옮긴 것입니다.
   JSON 으로 바꾼 이유가 두 가지 있습니다.
     1. 나중에 붙일 관리자 페이지(CMS)가 다룰 수 있는 형식입니다.
        자바스크립트 파일은 CMS 가 고치지 못합니다.
     2. 타입을 붙일 수 있어서, 항목 이름을 잘못 적으면 빌드가 실패합니다.
        예전에는 오타가 나도 화면에 빈칸이 나올 뿐이라 알아채기 어려웠습니다.

   ★ 내용을 고치실 때는 web/content/ 안의 .json 파일만 보시면 됩니다.
     이 파일(content.ts)은 그것을 읽어 화면에 넘겨 주는 통로일 뿐입니다.
   ========================================================================== */

import membersJson from "@/content/members.json";
import galleryJson from "@/content/gallery.json";
import showsJson from "@/content/shows.json";
import postersJson from "@/content/posters.json";
import videosJson from "@/content/videos.json";
import repertoireJson from "@/content/repertoire.json";
import siteJson from "@/content/site.json";
import sponsorsJson from "@/content/sponsors.json";

/* ── 생김새 ────────────────────────────────────────────────────────────── */

/** 단원 한 명. name·part 를 빈 문자열로 두면 사진만 나옵니다. */
export type Member = {
  src: string;
  /** 사진 비율. "853/1280" 처럼 적습니다 — 사진이 늦게 와도 칸이 안 흔들립니다. */
  ratio: string;
  name: string;
  part: string;
};

/** 공연 한 번. id 는 갤러리 사진의 show 와 이어지는 열쇠입니다. */
export type Show = {
  id: string;
  date: string;
  title: string;
  venue: string;
  note: string;
  /** 지난 공연 카드에서 한 줄을 통째로 쓸지 */
  wide?: boolean;
};

/** 활동 사진 한 장. show 가 있으면 그 공연 사진으로 묶입니다. */
export type Photo = {
  src: string;
  ratio: string;
  title: string;
  show?: string;
  tag: string;
};

/** 공연 포스터 */
export type Poster = {
  src: string;
  ratio: string;
  title: string;
  caption: string;
};

/**
 * 영상 한 편. 셋 중 하나만 있으면 됩니다.
 *   id   유튜브 영상 id      → 눌렀을 때 iframe
 *   ig   인스타그램 게시물 주소
 *   mp4  직접 올린 파일 경로
 */
export type Video = {
  id?: string;
  ig?: string;
  mp4?: string;
  /** 유튜브는 적지 않아도 됩니다 — 유튜브가 주는 그림을 씁니다. */
  thumb?: string;
  title: string;
  meta: string;
};

/**
 * 지금까지 연주한 곡 한 줄.
 * 한 공연의 순서표가 아니라, 아이들이 올린 곡이 쌓인 목록입니다.
 * 새 곡은 목록 맨 뒤에 더하면 됩니다 — 화면에서 두 단으로 알아서 나뉩니다.
 */
export type Piece = {
  title: string;
  /** 부제. "from Spirited Away" 처럼 작은 기울임으로 붙습니다. */
  sub?: string;
  composer: string;
  /** 편성. 솔로가 있는 곡에만 적습니다. */
  ensemble?: string;
};

export type Contact = { tel: string; email: string };

/** 히어로 사진이 넘어가는 속도. 1000 이 1초입니다. */
export type HeroMs = {
  /** 다음 장으로 넘어가는 간격 */
  hold: number;
  /** 녹아드는 시간. hold 보다 반드시 짧아야 합니다. */
  fade: number;
};

/* ── 경로 다듬기 ────────────────────────────────────────────────────────
   json 에는 "assets/img/…" 처럼 앞에 슬래시 없이 적혀 있습니다.
   예전 사이트는 HTML 이 있는 자리에서부터 세는 상대 경로였습니다.
   Next 는 public/ 안의 파일을 "/assets/img/…" 로 부릅니다 — 맨 앞
   슬래시가 있어야 합니다. 여기서 한 번만 붙여 두면, 화면 쪽 코드는
   경로 생각을 안 해도 됩니다.

   이미 슬래시가 있거나 http 로 시작하면(유튜브 썸네일 등) 그대로 둡니다. */
export function asset(path: string): string {
  if (!path) return "";
  if (path.startsWith("/") || /^https?:\/\//.test(path)) return path;
  return "/" + path;
}

function fixSrc<T extends { src: string }>(items: readonly T[]): T[] {
  return items.map((it) => ({ ...it, src: asset(it.src) }));
}

/** 후원해 주시는 곳.
 *  ★ 기업·기관과 개인을 따로 둡니다. 한 줄에 섞으면 회사 이름 사이에
 *    사람 이름이 끼어 양쪽 다 묻힙니다.
 *  ★ 순서는 가나다순입니다. 금액순·시기순은 후원사가 늘 때마다 서열
 *    문제가 생기지만, 가나다순은 자리만 끼워 넣으면 끝입니다.
 *    (주) 는 정렬에서 뺐습니다 — 그것까지 세면 ㅈ 자리에 다 모입니다.
 *  ★ 로고가 아니라 글자로 겁니다. 열여덟 곳의 로고를 해상도와 배경까지
 *    맞춰 모으는 일은 명단이 늘 때마다 되풀이됩니다. 글자는 한 줄 추가로
 *    끝나고, 이 규모에서는 오히려 더 정연해 보입니다. */
export type Sponsors = {
  /** 기업·기관. 공식 상호 그대로 적습니다. */
  orgs: string[];
  /** 개인. 이름만 적습니다 — "님" 은 화면에서 붙입니다. */
  people: string[];
};

/* ── 내보내기 ──────────────────────────────────────────────────────────── */

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
export const SPONSORS: Sponsors = sponsorsJson;
export const HERO: string[] = siteJson.hero.map(asset);
export const HERO_MS: HeroMs = siteJson.heroMs;
export const HOME_VIDEO: Video = siteJson.homeVideo;

/* ── 사진과 공연 잇기 ───────────────────────────────────────────────────
   예전 main.js 에 있던 것을 그대로 옮겼습니다. 이 연결 하나가
     · 지난 공연 카드의 대표 사진
     · 공연별로 넘겨 보기
     · 갤러리 날짜 정렬
   세 가지를 굴립니다.                                                   */

export function showById(id: string | undefined): Show | undefined {
  return id ? SHOWS.find((s) => s.id === id) : undefined;
}

export function photosOf(showId: string): Photo[] {
  return GALLERY.filter((p) => p.show === showId);
}

/**
 * 이 사진이 언제 것인가.
 * ★ 파일 이름이 먼저입니다. 이름 규칙이 YYYYMMDD-행사-번호.webp 라서
 *   이름만 고쳐도 정렬이 따라옵니다.
 * 이름에 날짜가 없으면 공연 날짜를 씁니다. 둘 다 없으면 빈 값이고,
 * 정렬하면 맨 뒤로 갑니다.
 */
export function photoDate(p: Photo): string {
  const file = p.src.split("/").pop() ?? "";
  const m = /(\d{4})(\d{2})(\d{2})/.exec(file);
  if (m) return `${m[1]}.${m[2]}.${m[3]}`;
  return showById(p.show)?.date ?? "";
}

