/**
 * Looping scene for Survive AI: a phone with no signal takes a Hinglish
 * query, three retrieval legs light up, fuse, and a cited answer streams in.
 * Timing lives in styles/scenes.css (9 s loop).
 */
const legs = [
  { cls: "sv-leg-1", label: "BM25" },
  { cls: "sv-leg-2", label: "expanded" },
  { cls: "sv-leg-3", label: "dense" },
];

const answerLines = [
  { cls: "sv-ans-1", text: "Wash the bite under running water" },
  { cls: "sv-ans-2", text: "for 15 minutes. Do not tie it off." },
  { cls: "sv-ans-3", text: "Get the anti-rabies vaccine today." },
];

const NoSignal = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true" className="text-graphite-soft">
    <rect x="0" y="7" width="2" height="3" fill="currentColor" />
    <rect x="4" y="5" width="2" height="5" fill="currentColor" opacity="0.5" />
    <rect x="8" y="3" width="2" height="7" fill="currentColor" opacity="0.3" />
    <rect x="12" y="1" width="2" height="9" fill="currentColor" opacity="0.2" />
    <path d="M1 1l12 8" stroke="#E5533D" strokeWidth="1.6" />
  </svg>
);

export const SurviveAiScene = () => (
  <div className="flex h-full w-full items-center justify-center p-6" aria-hidden="true">
    <div className="relative w-[272px] rounded-[28px] border border-graphite/15 bg-white p-2.5 shadow-[0_24px_50px_-24px_rgba(29,36,48,0.45)]">
      <div className="rounded-[20px] border border-graphite/10 bg-[#FBFCFD] px-4 pb-4 pt-3">
        {/* status bar */}
        <div className="flex items-center justify-between font-mono text-[10px] text-graphite-dim">
          <span>03:12</span>
          <span className="flex items-center gap-1.5">
            <NoSignal />
            <span className="font-medium text-[#E5533D]">OFFLINE</span>
          </span>
        </div>

        <div className="sv-loop sv-fade mt-5 space-y-3">
          {/* user query */}
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-[#2B5BA8] px-3 py-2 text-[12px] text-white">
              <span className="sv-loop sv-type inline-block whitespace-nowrap">kutte ne kaata</span>
            </div>
          </div>

          {/* retrieval legs */}
          <div className="rounded-lg border border-graphite/10 bg-white px-3 py-2">
            <div className="flex items-center justify-between">
              {legs.map((leg) => (
                <span
                  key={leg.label}
                  className={`sv-loop ${leg.cls} rounded-sm bg-[#D7F5EA] px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-[#0B7A5E]`}
                >
                  {leg.label}
                </span>
              ))}
            </div>
            <div className="sv-loop sv-fuse mt-2 flex items-center gap-2 font-mono text-[9px] text-graphite-soft">
              <span className="h-px flex-1 bg-[#0FA37F]/40" />
              <span className="font-medium text-graphite">RRF · top 5</span>
              <span className="h-px flex-1 bg-[#0FA37F]/40" />
            </div>
          </div>

          {/* answer */}
          <div className="rounded-2xl rounded-bl-sm bg-[#EEF1F5] px-3 py-2 text-[12px] leading-5 text-graphite">
            {answerLines.map((line) => (
              <div key={line.cls} className={`sv-loop ${line.cls} whitespace-nowrap`}>
                {line.text}
              </div>
            ))}
            <div className="sv-loop sv-cite mt-2 inline-flex items-center gap-1 rounded-sm bg-[#FFE3A8] px-1.5 py-0.5 font-mono text-[9px] font-medium text-[#8A5300]">
              medical › animal bites ¶3
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-graphite-soft">
          <span>Gemma 2B · on device</span>
          <span>0 bytes sent</span>
        </div>
      </div>
    </div>
  </div>
);
