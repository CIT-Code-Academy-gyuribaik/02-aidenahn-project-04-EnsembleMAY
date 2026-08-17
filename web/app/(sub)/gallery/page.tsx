import type { Metadata } from "next";
import GalleryBrowser from "@/components/GalleryBrowser";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "사진과 영상",
  description:
    "앙상블 메이의 연습과 공연 기록입니다. 정기 연주회, 자선 공연, 연습 현장의 " +
    "활동 사진과 연주 영상을 모았습니다.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <div className="phead">
        <div className="wrap">
          {/* 한 페이지가 사진과 영상을 함께 담으므로 제목도 둘을 함께 가리킵니다.
              "활동 사진" 으로 두면 영상 탭을 골랐을 때 제목과 어긋납니다. */}
          <h1>사진과 영상</h1>
        </div>
      </div>

      <section className="sec sec--first">
        <div className="wrap">
          <GalleryBrowser />
        </div>
      </section>
    </>
  );
}
