import type { Metadata } from "next";
import ScrollTop from "@/components/ScrollTop";
import Shell from "@/components/Shell";
import { baseMetadata } from "@/lib/seo";

/* 서브페이지(About · Concert · Gallery · Contact · 방침)의 뿌리 레이아웃.
   상단 바가 흰 바탕입니다. 홈은 app/(home) 쪽에 따로 있습니다 —
   이유는 components/Shell.tsx 주석에 적어 두었습니다. */

export const metadata: Metadata = baseMetadata;

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell hdr="solid">
      {/* 갈래를 옮길 때 히어로가 위로 밀려 올라가지 않게 합니다 —
          까닭은 components/ScrollTop.tsx 주석에 적어 두었습니다. */}
      <ScrollTop />
      {children}
    </Shell>
  );
}
