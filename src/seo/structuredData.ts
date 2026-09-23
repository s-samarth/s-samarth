import { SITE_URL, profile, links, jobs, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";

const PERSON_ID = `${SITE_URL}/#person`;
const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/**
 * Schema.org JSON-LD for the whole page, as one linked @graph.
 *
 * Search engines and AI answer engines read this to learn which entity the
 * page is about (a Person), what that person made, and which other profiles
 * are the same person (`sameAs`). Every node points back at the Person by
 * @id, so a crawler sees one connected identity instead of loose facts.
 */
export const structuredData = (photoUrl: string) => {
  const [now, before] = jobs;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: profile.name,
        url: `${SITE_URL}/`,
        image: absolute(photoUrl),
        email: `mailto:${profile.email}`,
        jobTitle: now.role,
        description: profile.summary,
        worksFor: { "@type": "Organization", name: now.where, url: now.whereUrl },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Guwahati", alternateName: "IIT Guwahati" },
          { "@type": "Organization", name: before.where, url: before.whereUrl },
        ],
        hasOccupation: [
          { "@type": "Occupation", name: now.role, description: now.what },
          { "@type": "Occupation", name: `${before.role} at ${before.where}`, description: before.what },
        ],
        address: { "@type": "PostalAddress", addressLocality: profile.city, addressRegion: profile.region, addressCountry: profile.country },
        knowsAbout: skillGroups.flatMap((g) => g.skills),
        sameAs: Object.values(links),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: profile.name,
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: `${profile.name}, ${profile.headline}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": PERSON_ID },
        dateModified: new Date().toISOString(),
      },
      ...projects.map((p) => ({
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/#${p.id}`,
        name: p.title,
        description: p.oneLiner,
        codeRepository: p.github,
        ...(p.live && { url: absolute(p.live.href) }),
        keywords: p.kind,
        author: { "@id": PERSON_ID },
      })),
      ...articles.map((a) => ({
        "@type": "BlogPosting",
        headline: a.title,
        description: a.description,
        url: a.url,
        image: absolute(a.image),
        author: { "@id": PERSON_ID },
      })),
    ],
  };
};
