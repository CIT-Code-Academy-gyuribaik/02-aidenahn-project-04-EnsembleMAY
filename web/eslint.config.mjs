import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    /* ── <img> 를 그대로 씁니다 ──────────────────────────────────────────
       이 사이트는 next.config.ts 에서 output: "export" 로 굽고
       images.unoptimized 도 켜 두었습니다. 그 조합에서 next/image 는
       사진을 줄여 주지도, 형식을 바꿔 주지도 않습니다 — 서버가 없으니
       할 수가 없습니다. 남는 것은 <img> 를 감싼 <span> 한 겹뿐입니다.
       사진은 이미 WebP 로 줄여서 넣고, 칸 크기는 style.css 와 width·height
       가 잡습니다.

       그래서 이 규칙은 여기서 늘 거짓 경보입니다. 예전에는 파일마다
       eslint-disable 주석을 달아 막았는데, 사진을 그리는 자리마다 한 줄씩
       열다섯 군데가 됐습니다. 규칙을 끄는 판단은 한 번만 하면 되는
       일이므로 그 이유와 함께 여기 적어 둡니다.
       ※ 서버를 두는 구성으로 옮기게 되면 이 항목을 지우고 next/image 로
         갈아타는 것이 맞습니다.                                        */
    rules: { "@next/next/no-img-element": "off" },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
