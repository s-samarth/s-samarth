/**
 * Looping scene for Desi Dictation: hold the right Option key, speak, release,
 * and Hinglish is pasted into the focused editor. Timing in styles/scenes.css
 * (8 s loop).
 */
const bars = [0, 1, 2, 3, 4, 5, 6];

/**
 * One span per word. On desktop the parent's clip-path types the sentence;
 * on phones it wraps, clip-path can't type across a line break, and the
 * words arrive one at a time instead (see scenes.css).
 */
const words = ["kal", "meeting", "hai,", "please", "deck", "ready", "rakhna."];

const Mic = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v5" />
  </svg>
);

const Pill = ({ cls, children }: { cls: string; children: React.ReactNode }) => (
  <div
    className={`dd-loop ${cls} absolute inset-0 flex items-center gap-2 rounded-full border border-graphite/12 bg-white px-3 font-mono text-[10px] font-medium uppercase tracking-wider text-graphite shadow-[0_6px_16px_-10px_rgba(29,36,48,0.4)]`}
  >
    {children}
  </div>
);

export const DesiDictationScene = () => (
  <div className="flex h-full w-full items-center justify-center p-6" aria-hidden="true">
    <div className="w-full max-w-[380px]">
      {/* editor window */}
      <div className="overflow-hidden rounded-xl border border-graphite/12 bg-white shadow-[0_24px_50px_-24px_rgba(29,36,48,0.45)]">
        <div className="flex items-center gap-1.5 border-b border-graphite/10 bg-[#F6F7F9] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[10px] text-graphite-soft">Notes</span>
        </div>
        <div className="dd-loop dd-fade min-h-[92px] px-4 py-4 font-sans text-[14px] leading-6 text-graphite">
          <span className="text-graphite-soft">Team update: </span>
          <span className="dd-loop dd-type inline sm:whitespace-nowrap">
            {words.map((word, i) => (
              <span key={word} className={`dd-loop dd-w${i}`}>
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
          <span className="dd-caret ml-0.5 inline-block h-[15px] w-[1.5px] translate-y-[2px] bg-[#E5533D]" />
          <div className="dd-loop dd-timing mt-3 inline-flex items-center gap-2 rounded-sm bg-[#FFE3A8] px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-[#8A5300]">
            1.47 s · Apex q5_0 · local
          </div>
        </div>
      </div>

      {/* hotkey + overlay pill */}
      <div className="dd-loop dd-fade mt-4 flex items-center gap-3">
        <div className="dd-loop dd-key flex h-11 w-16 flex-col items-center justify-center rounded-md border-2 bg-white font-mono text-[10px] leading-tight text-graphite">
          <span className="text-[14px]">⌥</span>
          <span className="text-graphite-soft">hold</span>
        </div>

        <div className="relative h-11 flex-1">
          <Pill cls="dd-listen">
            <span className="text-[#E5533D]"><Mic /></span>
            Listening
            <span className="ml-auto flex h-4 items-end gap-[3px]">
              {bars.map((i) => (
                <span
                  key={i}
                  style={{ "--i": i } as React.CSSProperties}
                  className="dd-bar block h-4 w-[3px] rounded-full bg-[#2B5BA8]"
                />
              ))}
            </span>
          </Pill>
          <Pill cls="dd-work">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#F2A33A]" />
            Transcribing on Metal
          </Pill>
          <Pill cls="dd-done">
            <span className="text-[#0FA37F]">✓</span>
            Pasted into Notes
            <span className="ml-auto text-graphite-soft">0 bytes sent</span>
          </Pill>
        </div>
      </div>
    </div>
  </div>
);
