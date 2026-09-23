import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const PATHS: readonly { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about/", priority: 0.8 },
  { path: "/about/story/", priority: 0.7 },
  { path: "/concert/", priority: 0.8 },
  { path: "/concert/past/", priority: 0.7 },
  { path: "/gallery/", priority: 0.8 },
  { path: "/gallery/videos/", priority: 0.7 },
  { path: "/contact/", priority: 0.8 },
  { path: "/contact/charity/", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
