import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { baseMetadata, SITE_URL } from "@/lib/seo";
import "./snap.css";

/* 홈의 뿌리 레이아웃.
   상단 바가 사진 위에 투명하게 얹히고(data-hdr="overlay"),
   <html> 에 snap 이 붙어 섹션 단위 스냅 스크롤이 걸립니다.
   서브페이지는 app/(sub) 쪽에 따로 있습니다 —
   이유는 components/Shell.tsx 주석에 적어 두었습니다. */

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: { canonical: SITE_URL + "/" },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell hdr="overlay" htmlClass="snap">
      {children}
    </Shell>
  );
}
