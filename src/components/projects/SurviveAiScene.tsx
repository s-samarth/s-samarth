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
  <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true" className="text-mist">
    <rect x="0" y="7" width="2" height="3" fill="currentColor" />
    <rect x="4" y="5" width="2" height="5" fill="currentColor" opacity="0.5" />
    <rect x="8" y="3" width="2" height="7" fill="currentColor" opacity="0.3" />
    <rect x="12" y="1" width="2" height="9" fill="currentColor" opacity="0.2" />
    <path d="M1 1l12 8" stroke="#F2A33A" strokeWidth="1.5" />
  </svg>
);

export const SurviveAiScene = () => (
  <div className="flex h-full w-full items-center justify-center p-6" aria-hidden="true">
    <div className="relative w-[272px] rounded-[26px] border border-bone/15 bg-ink-2 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="rounded-[18px] bg-ink px-4 pb-4 pt-3">
        {/* status bar */}
        <div className="flex items-center justify-between font-mono text-[10px] text-mist">
          <span>03:12</span>
          <span className="flex items-center gap-1.5">
            <NoSignal />
            <span className="text-amber">OFFLINE</span>
          </span>
        </div>

        <div className="sv-loop sv-fade mt-5 space-y-3">
          {/* user query */}
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-bone px-3 py-2 text-[12px] text-ink">
              <span className="sv-loop sv-type inline-block whitespace-nowrap">kutte ne kaata</span>
            </div>
          </div>

          {/* retrieval legs */}
          <div className="rounded-lg border border-bone/10 px-3 py-2">
            <div className="flex items-center justify-between">
              {legs.map((leg) => (
                <span
                  key={leg.label}
                  className={`sv-loop ${leg.cls} rounded-sm border border-cyan/50 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan`}
                >
                  {leg.label}
                </span>
              ))}
            </div>
            <div className="sv-loop sv-fuse mt-2 flex items-center gap-2 font-mono text-[9px] text-mist">
              <span className="h-px flex-1 bg-cyan/40" />
              <span className="text-bone">RRF · top 5</span>
              <span className="h-px flex-1 bg-cyan/40" />
            </div>
          </div>

          {/* answer */}
          <div className="rounded-2xl rounded-bl-sm border border-bone/10 bg-ink-3 px-3 py-2 text-[12px] leading-5 text-bone">
            {answerLines.map((line) => (
              <div key={line.cls} className={`sv-loop ${line.cls} whitespace-nowrap`}>
                {line.text}
              </div>
            ))}
            <div className="sv-loop sv-cite mt-2 inline-flex items-center gap-1 rounded-sm bg-amber/15 px-1.5 py-0.5 font-mono text-[9px] text-amber">
              medical › animal bites ¶3
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-mist">
          <span>Gemma 2B · on device</span>
          <span>0 bytes sent</span>
        </div>
      </div>
    </div>
  </div>
);
