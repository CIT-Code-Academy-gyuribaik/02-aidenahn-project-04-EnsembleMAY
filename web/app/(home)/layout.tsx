import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import Shell from "@/components/Shell";
import { orgJsonLd, websiteJsonLd } from "@/lib/jsonld";
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
      <JsonLd data={orgJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      {children}
    </Shell>
  );
}
