import { CONTACT, SHOWS } from "@/lib/content";
import { SECTIONS } from "@/lib/nav";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const BRAND_ALIASES = [
  "앙상블메이",
  "Ensemble M.A.Y.",
  "Ensemble MAY",
  "EnsembleMAY",
  "ensemblemay",
];

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

const ORG_DESC =
  "앙상블 메이(Ensemble M.A.Y.)는 음악을 사랑하는 아이들이 만들어 가는 현악 앙상블입니다. " +
  "1년에 한 번 정기 연주회를 열고, 자선 공연으로 나눔을 실천합니다.";

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: BRAND_ALIASES,
    url: `${SITE_URL}/`,
    description: ORG_DESC,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/apple-touch-icon.png`,
      width: 180,
      height: 180,
    },
    image: `${SITE_URL}/og.png`,
    email: CONTACT.email,
    telephone: CONTACT.tel,
    foundingDate: "2025",
    genre: ["Classical music", "Chamber music", "String ensemble"],
    sameAs: ["https://www.instagram.com/ensemble_m.a.y/"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    alternateName: BRAND_ALIASES,
    url: `${SITE_URL}/`,
    description: ORG_DESC,
    inLanguage: ["ko-KR", "en"],
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbFor(path: string) {
  const sec = Object.values(SECTIONS).find(
    (s) => path === s.href || path.startsWith(s.href),
  );

  const trail: { name: string; path: string }[] = [{ name: "홈", path: "/" }];

  if (sec) {
    trail.push({ name: sec.label.kor, path: sec.href });

    const tab = sec.sub.find((t) => t.href === path && t.href !== sec.href);
    if (tab) trail.push({ name: tab.label.kor, path: tab.href });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

const isoDate = (d: string) => d.replace(/\./g, "-");

export function eventsJsonLd() {
  return SHOWS.map((s) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "@id": `${SITE_URL}/concert/past/#${s.id}`,
    name: s.note ? `${s.title} — ${s.note}` : s.title,
    startDate: isoDate(s.date),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: `${SITE_URL}/concert/past/`,
    performer: { "@id": ORG_ID },
    organizer: { "@id": ORG_ID },
    ...(s.venue
      ? { location: { "@type": "Place", name: s.venue, address: s.venue } }
      : {}),
  }));
}
