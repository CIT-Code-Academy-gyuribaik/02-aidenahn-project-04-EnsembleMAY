/* 사진 작은 판 만들기 — 빌드 전에 한 번 돕니다(package.json 의 prebuild/predev).
 *
 * 왜: 갤러리 사진은 1280px 안팎인데, 휴대폰에서는 171px 짜리 칸에 들어갑니다.
 * 원본 그대로 받으면 82장 12MB 를 셀룰러로 내려받게 됩니다.
 *
 * 왜 여기서: Netlify 든 Cloudflare Pages 든 저장소를 받아 `npm run build` 를
 * 돌립니다. 만드는 일을 빌드 안에 두면 어느 쪽에 올리든 똑같이 동작하고,
 * 호스팅 업체의 이미지 변환 기능에 매이지 않습니다. 결과물은 저장소에 넣지
 * 않습니다(.gitignore).
 *
 * 결과: public/assets/img/<갈래>/w<너비>/<이름>.webp
 * 이미 있고 원본보다 새 것이면 건너뜁니다 — 두 번째 빌드부터는 거의 공짜입니다.
 */

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..", "public", "assets", "img");

/* 갈래마다 어느 너비가 필요한지.
   gallery — 격자 칸(휴대폰 2단 / 데스크톱 4단)과 스토리의 한 폭짜리 사진.
   hero    — 속페이지 머리의 한 폭짜리 사진.
   원본은 그대로 남습니다(사진 크게 보기에서 씁니다). */
const JOBS = [
  { dir: "gallery", widths: [480, 800] },
  { dir: "hero", widths: [560, 900, 1400] },
  { dir: "members", widths: [360, 640] },
  { dir: "banner", widths: [480] },
];

const QUALITY = 74;

async function newerThan(a, b) {
  try {
    const [x, y] = await Promise.all([stat(a), stat(b)]);
    return x.mtimeMs >= y.mtimeMs;
  } catch {
    return false;
  }
}

async function run() {
  let made = 0;
  let kept = 0;

  for (const job of JOBS) {
    const from = path.join(ROOT, job.dir);

    let files;
    try {
      files = (await readdir(from)).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
    } catch {
      /* 갈래가 없으면 조용히 넘어갑니다 — 사진을 아직 안 넣은 상태일 수 있습니다. */
      continue;
    }

    for (const width of job.widths) {
      const to = path.join(from, `w${width}`);
      await mkdir(to, { recursive: true });

      for (const file of files) {
        const src = path.join(from, file);
        const out = path.join(to, file.replace(/\.(jpe?g|png)$/i, ".webp"));

        if (await newerThan(out, src)) {
          kept++;
          continue;
        }

        const img = sharp(src);
        const meta = await img.metadata();

        /* 원본보다 큰 판은 만들지 않습니다 — 늘려 봐야 화질만 나빠집니다. */
        if ((meta.width ?? 0) <= width) {
          kept++;
          continue;
        }

        const buf = await img
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toBuffer();

        await writeFile(out, buf);
        made++;
      }
    }
  }

  console.log(`[thumbs] 새로 만든 것 ${made}장, 그대로 둔 것 ${kept}장`);
}

run().catch((err) => {
  console.error("[thumbs] 실패:", err);
  process.exit(1);
});
