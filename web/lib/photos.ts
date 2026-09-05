/* ==========================================================================
   사진을 "크게 보기" 목록으로 바꾸는 자리

   같은 코드가 다섯 군데에 복사돼 있었습니다 — 홈의 공연 리스트, 홈의
   배너, Concert 의 지난 공연과 포스터, About 의 연혁, Gallery.
   설명줄을 만드는 방식이나 기본 비율을 한 곳에서 고치면 나머지가 따라
   가지 않아서, 화면마다 다르게 보이기 시작합니다. 여기로 모읍니다.
   ========================================================================== */

import type { LbItem } from "@/components/Lightbox";
import { photosOf, showById, type Photo } from "@/lib/content";

/** 비율을 적지 않은 사진의 기본값. 가로로 조금 긴 쪽으로 둡니다. */
const DEFAULT_RATIO = "3/2";

/**
 * 사진 설명줄.
 * 공연 사진이면 공연 이름과 날짜가 그대로 나옵니다.
 * 공연에 매이지 않은 사진은 설명줄이 없습니다 — 사진 제목은 이미
 * alt 로 들어가 있어서, 밑에 또 적으면 같은 말이 두 번 나옵니다.
 */
export function captionOf(showId: string | undefined): string {
  const s = showById(showId);
  return s ? [s.title, s.date].filter(Boolean).join(" · ") : "";
}

/** 사진 하나를 크게 보기 항목으로 */
export function toLbItem(p: Photo): LbItem {
  return {
    src: p.src,
    ratio: p.ratio || DEFAULT_RATIO,
    title: p.title,
    caption: captionOf(p.show),
  };
}

export function toLbItems(list: readonly Photo[]): LbItem[] {
  return list.map(toLbItem);
}

/**
 * 공연별 사진을 한 줄로 이어 붙이고, 공연마다 시작 자리를 알려 줍니다.
 *
 * 이렇게 두는 이유 — 어느 공연 사진에서 열든 계속 넘기면 다음 공연
 * 사진으로 자연스럽게 이어집니다. 공연마다 목록을 따로 만들면 그 공연
 * 마지막 장에서 막힙니다.
 *
 * @param shows 이어 붙일 공연들 (넘긴 순서대로 이어집니다)
 */
export function showAlbum(shows: readonly { id: string }[]) {
  const items: LbItem[] = [];
  const startOf = new Map<string, number>();

  for (const s of shows) {
    const pics = photosOf(s.id);
    if (!pics.length) continue;
    startOf.set(s.id, items.length);
    items.push(...toLbItems(pics));
  }

  return { items, startOf };
}
