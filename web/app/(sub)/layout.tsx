import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import ScrollTop from "@/components/ScrollTop";
import Shell from "@/components/Shell";
import { orgJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { baseMetadata, baseViewport } from "@/lib/seo";

export const viewport: Viewport = baseViewport;

export const metadata: Metadata = baseMetadata;

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell hdr="solid">

      <JsonLd data={orgJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <ScrollTop />
      {children}
    </Shell>
  );
}
