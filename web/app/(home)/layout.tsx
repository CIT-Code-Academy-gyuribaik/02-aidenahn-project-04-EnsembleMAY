import type { Metadata, Viewport } from "next";
import Shell from "@/components/Shell";
import { baseMetadata, homeViewport, SITE_URL } from "@/lib/seo";
import "./snap.css";

export const viewport: Viewport = homeViewport;

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: { canonical: SITE_URL + "/" },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell hdr="overlay">
      {children}
    </Shell>
  );
}
