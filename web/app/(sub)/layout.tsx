import type { Metadata, Viewport } from "next";
import ScrollTop from "@/components/ScrollTop";
import Shell from "@/components/Shell";
import { baseMetadata, baseViewport } from "@/lib/seo";

export const viewport: Viewport = baseViewport;

export const metadata: Metadata = baseMetadata;

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell hdr="solid">

      <ScrollTop />
      {children}
    </Shell>
  );
}
