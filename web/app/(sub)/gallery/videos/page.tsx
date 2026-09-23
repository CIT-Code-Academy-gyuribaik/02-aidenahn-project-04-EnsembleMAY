import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import VideoCard from "@/components/VideoCard";
import { VIDEOS } from "@/lib/content";
import { breadcrumbFor } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "연주 영상",
  description:
    "앙상블 메이의 연주 영상입니다. 정기 연주회와 자선 공연에서 아이들이 올린 무대를 " +
    "영상으로 볼 수 있습니다.",
  path: "/gallery/videos/",
});

export default function GalleryVideosPage() {
  return (
    <>
      <JsonLd data={breadcrumbFor("/gallery/videos/")} />
      <div className="vids">
        {VIDEOS.map((v) => (
          <VideoCard key={v.mp4 ?? v.id ?? v.title} video={v} />
        ))}
      </div>
    </>
  );
}
