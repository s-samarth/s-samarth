/**
 * POST /api/feedback: where Desi Dictation's "Send Feedback" window sends a
 * report, only when the user presses Send. It forwards the report to
 * Samarth's inbox through its own EmailJS account (samarthsaraswat13), apart
 * from the contact form's, and keeps nothing: no database, no logs of what
 * was written, and the template is set to "Do not save private data" so
 * EmailJS's history doesn't keep it either.
 *
 * The app sends exactly what its window shows: the message, and optionally a
 * reply address, an app-info line and the last dictation. No IDs, no audio.
 *
 * Setup (done 2026-10-30): EmailJS Account → Security allows API calls from
 * non-browser apps, with "Use Private Key" on, so the Vercel project needs
 * EMAILJS_PRIVATE_KEY (EmailJS Account → General → Private Key). The
 * template "Desi Dictation feedback" uses {{subject}}, {{message}} and
 * {{reply_to}}.
 */

const EMAILJS = {
  url: "https://api.emailjs.com/api/v1.0/email/send",
  service: "service_c6a0pva",
  template: "template_z3xpi3n",
  publicKey: "zaoPHRNuoT-I6JH_y",
};

/** Where replies go when the sender left no address. */
const OWNER = "samarthsaraswat13@gmail.com";

/** The app's header; anything else is not our window. */
const CLIENT = "feedback-1";

const LIMITS = { message: 5000, replyTo: 200, appInfo: 500, lastDictation: 3000 };

/** Per warm instance: 5 reports per address per 10 minutes. Memory only. */
const WINDOW_MS = 10 * 60 * 1000;
const PER_WINDOW = 5;
const recent = new Map<string, number[]>();

interface Report {
  message: string;
  replyTo?: string;
  appInfo?: string;
  lastDictation?: string;
}

const reply = (status: number, result: string) =>
  new Response(JSON.stringify({ result }), { status, headers: { "content-type": "application/json" } });

/** The report, trimmed and checked; a string is the reason it was refused. */
export function parseReport(body: unknown): Report | string {
  if (typeof body !== "object" || body === null) return "not an object";
  const b = body as Record<string, unknown>;
  const text = (key: keyof typeof LIMITS) => (typeof b[key] === "string" ? (b[key] as string).trim() : "");
  const report: Report = { message: text("message") };
  if (!report.message) return "empty message";
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    const value = text(key);
    if (value.length > LIMITS[key]) return `${key} too long`;
    if (value && key !== "message") report[key] = value;
  }
  if (report.replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(report.replyTo)) return "reply address doesn't look like an email";
  return report;
}

function limited(address: string, now = Date.now()): boolean {
  const times = (recent.get(address) ?? []).filter((t) => now - t < WINDOW_MS);
  times.push(now);
  recent.set(address, times);
  return times.length > PER_WINDOW;
}

export async function POST(request: Request): Promise<Response> {
  if (request.headers.get("x-desi-dictation") !== CLIENT) return reply(400, "unknown client");
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply(400, "not JSON");
  }
  const report = parseReport(body);
  if (typeof report === "string") return reply(400, report);
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(address)) return reply(429, "too many reports, try again in a few minutes");

  const message = [
    report.message,
    "",
    `Reply to: ${report.replyTo ?? "not given"}`,
    `App: ${report.appInfo ?? "not included"}`,
    `Last dictation: ${report.lastDictation ?? "not included"}`,
  ].join("\n");
  const sent = await fetch(EMAILJS.url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.service,
      template_id: EMAILJS.template,
      user_id: EMAILJS.publicKey,
      accessToken: process.env.EMAILJS_PRIVATE_KEY || undefined,
      template_params: {
        reply_to: report.replyTo ?? OWNER,
        subject: `[Desi Dictation feedback] ${report.message.slice(0, 60)}`,
        message,
      },
    }),
  });
  if (!sent.ok) {
    // The status only: never the report itself.
    console.error("feedback: mail service answered", sent.status);
    return reply(502, "couldn't send right now");
  }
  return reply(200, "sent");
}
