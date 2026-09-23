import { SITE_URL, profile, links, jobs, facts, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";

/**
 * /llms.txt: a plain-Markdown summary of the site for AI assistants
 * (ChatGPT, Claude, Gemini, Perplexity). It follows the llms.txt proposal:
 * an H1, a one-paragraph blockquote, then sections of facts and links.
 * Built from the same data as the page, so it stays true on every deploy.
 */
export const llmsTxt = () => {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    `Website: ${SITE_URL}/`,
    `Contact: ${profile.email}, or the "Raise a ticket" form at ${SITE_URL}/#ticket`,
    "",
    "## Work",
    ...jobs.map((j) => `- ${j.when}: ${j.role}, ${j.where}. ${j.what}`),
    "",
    "## Facts",
    ...facts.map((f) => `- ${f.key}: ${f.value}`),
    "",
    "## Skills",
    ...skillGroups.map((g) => `- ${g.title}: ${g.skills.join(", ")}`),
    "",
    "## Projects",
    ...projects.flatMap((p) => [
      `### ${p.title} (${p.kind})`,
      "",
      p.oneLiner,
      "",
      ...p.body,
      "",
      ...p.specs.map((s) => `- ${s.key}: ${s.value}`),
      `- Code: ${p.github}`,
      ...(p.live ? [`- ${p.live.label}: ${p.live.href.startsWith("/") ? SITE_URL + p.live.href : p.live.href}`] : []),
      "",
    ]),
    "## Writing",
    ...articles.map((a) => `- [${a.title}](${a.url}): ${a.description}`),
    `- All posts: ${links.substack}`,
    "",
    "## Profiles",
    `- LinkedIn: ${links.linkedin}`,
    `- GitHub: ${links.github}`,
    `- Substack: ${links.substack}`,
    "",
  ];
  return lines.join("\n");
};
