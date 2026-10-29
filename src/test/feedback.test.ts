import { afterEach, describe, expect, it, vi } from "vitest";
import { parseReport, POST } from "../../api/feedback";

const post = (body: unknown, client = "feedback-1", ip = "10.0.0.1") =>
  POST(
    new Request("https://example.test/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json", "x-desi-dictation": client, "x-forwarded-for": ip },
      body: JSON.stringify(body),
    }),
  );

describe("parseReport", () => {
  it("keeps only the fields the app's window shows", () => {
    expect(parseReport({ message: " hi ", appInfo: "v0.7.0", extra: "x" })).toEqual({
      message: "hi",
      appInfo: "v0.7.0",
    });
  });
  it("refuses an empty message, oversized fields and a bad reply address", () => {
    expect(parseReport({ message: "  " })).toBe("empty message");
    expect(parseReport({ message: "x".repeat(5001) })).toBe("message too long");
    expect(parseReport({ message: "hi", replyTo: "nope" })).toMatch(/email/);
  });
});

describe("POST /api/feedback", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("refuses anything that isn't the app", async () => {
    expect((await post({ message: "hi" }, "browser")).status).toBe(400);
  });

  it("forwards the report to EmailJS and nothing else", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("OK", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await post({ message: "Paste went to the wrong app", replyTo: "a@b.co" }, "feedback-1", "10.0.0.2");
    expect(res.status).toBe(200);
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.template_params.reply_to).toBe("a@b.co");
    expect(sent.template_params.message).toContain("Paste went to the wrong app");
    expect(sent.template_params.message).toContain("Last dictation: not included");
  });

  it("says so when the mail service fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 403 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await post({ message: "hi" }, "feedback-1", "10.0.0.3")).status).toBe(502);
  });

  it("slows down a flood from one address", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("OK", { status: 200 })));
    const codes = [];
    for (let i = 0; i < 6; i++) codes.push((await post({ message: `hi ${i}` }, "feedback-1", "10.0.0.4")).status);
    expect(codes).toEqual([200, 200, 200, 200, 200, 429]);
  });
});
