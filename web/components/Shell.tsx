import type { ReactNode } from "react";
import { Abril_Fatface } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LangProvider } from "@/lib/lang";
import "@/app/style.css";

const abril = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--display",
});

export default function Shell({
  hdr,
  ownFooter,
  children,
}: {
  hdr: "overlay" | "solid";

  ownFooter?: boolean;
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body data-hdr={hdr} className={abril.variable}>

        <LangProvider>
          <a className="skip" href="#main">
            본문으로 건너뛰기
          </a>

          <SiteHeader />

          <main id="main">{children}</main>

          {!ownFooter && <SiteFooter />}
        </LangProvider>
      </body>
    </html>
  );
}
