import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MemberGrid from "@/components/MemberGrid";
import { breadcrumbFor } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import Say from "@/components/Say";
import { T } from "@/lib/i18n";

export const metadata: Metadata = pageMeta({
  title: "단원",
  description:
    "앙상블 메이에서 함께 연주하는 아이들입니다. 바이올린·비올라·첼로가 모여 한 곡을 완성합니다.",
  path: "/about/",
});

export default function AboutMembersPage() {
  return (
    <>
      <JsonLd data={breadcrumbFor("/about/")} />

      <h2 className="sr">
        <Say t={T.about.membersHeading} />
      </h2>
      <MemberGrid />
    </>
  );
}
