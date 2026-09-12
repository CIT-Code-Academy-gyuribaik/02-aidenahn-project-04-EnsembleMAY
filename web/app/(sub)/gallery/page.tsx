import type { Metadata } from "next";
import GalleryPhotos from "@/components/GalleryPhotos";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "활동 사진",
  description:
    "앙상블 메이의 연습과 공연 기록입니다. 정기 연주회, 자선 공연, 연습 현장의 " +
    "활동 사진을 모았습니다.",
  path: "/gallery/",
});

/* Gallery 의 기본 탭. */
export default function GalleryPage() {
  return <GalleryPhotos />;
}
