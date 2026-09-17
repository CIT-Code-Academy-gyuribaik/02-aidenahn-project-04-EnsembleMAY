import type { Metadata } from "next";
import ScrollTop from "@/components/ScrollTop";
import Shell from "@/components/Shell";
import { baseMetadata } from "@/lib/seo";

export const metadata: Metadata = baseMetadata;

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell hdr="solid">

      <ScrollTop />
      {children}
    </Shell>
  );
}
