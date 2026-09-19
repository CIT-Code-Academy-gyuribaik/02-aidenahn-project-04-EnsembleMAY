/* 화면 크기에 맞는 사진 고르기.
 *
 * scripts/thumbs.mjs 가 빌드 전에 public/assets/img/<갈래>/w<너비>/ 에 작은 판을
 * 만들어 둡니다. 여기서는 그 목록을 srcset 문자열로 엮어 줍니다 — 어느 것을 받을지는
 * 브라우저가 화면 폭과 화소 밀도를 보고 고릅니다.
 *
 * ★ 아래 WIDTHS 는 scripts/thumbs.mjs 의 JOBS 와 같아야 합니다. 한쪽만 고치면
 *   없는 파일을 가리키게 됩니다.
 */

const WIDTHS: Record<string, readonly number[]> = {
  gallery: [480, 800],
  hero: [560, 900, 1400],
  members: [360, 640],
  banner: [480],
};

/* content/*.json 의 ratio 는 "1280/960" 처럼 원본 크기를 그대로 적어 둔 것이 많습니다.
   앞 숫자가 원본 가로 길이입니다. "3/4" 처럼 비율만 적힌 것은 크기가 아니므로
   (너무 작아서) 걸러집니다. */
export function widthOf(ratio?: string): number | undefined {
  const n = Number.parseInt(String(ratio ?? "").split("/")[0] ?? "", 10);
  return Number.isFinite(n) && n >= 200 ? n : undefined;
}

/**
 * @param src   "/assets/img/gallery/x.webp" 또는 "assets/img/gallery/x.webp"
 * @param natural 원본 가로 길이. 알면 원본도 후보에 넣습니다 — 넓고 촘촘한 화면에서
 *                작은 판이 뿌옇게 보이지 않도록.
 */
export function srcSetOf(src: string, natural?: number): string | undefined {
  const at = src.startsWith("/") ? src : "/" + src;
  const m = /^\/assets\/img\/([^/]+)\/([^/]+)$/.exec(at);
  if (!m) return undefined;

  const [, dir, file] = m;
  const widths = WIDTHS[dir];
  if (!widths) return undefined;

  /* 원본보다 큰 판은 thumbs.mjs 가 만들지 않습니다 — 목록에서도 빼야 404 가 안 납니다. */
  const parts = widths
    .filter((w) => natural === undefined || w < natural)
    .map((w) => `/assets/img/${dir}/w${w}/${file} ${w}w`);

  if (!parts.length) return undefined;
  if (natural) parts.push(`${at} ${natural}w`);

  return parts.join(", ");
}
