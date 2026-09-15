/**
 * Looping scene for Desi Dictation: hold the right Option key, speak, release,
 * and Hinglish is pasted into the focused editor. Timing in styles/scenes.css
 * (8 s loop).
 */
const bars = [0, 1, 2, 3, 4, 5, 6];

const Mic = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v5" />
  </svg>
);

const Pill = ({ cls, children }: { cls: string; children: React.ReactNode }) => (
  <div
    className={`dd-loop ${cls} absolute inset-0 flex items-center gap-2 rounded-full border border-bone/15 bg-ink-2/95 px-3 font-mono text-[10px] uppercase tracking-wider text-bone`}
  >
    {children}
  </div>
);

export const DesiDictationScene = () => (
  <div className="flex h-full w-full items-center justify-center p-6" aria-hidden="true">
    <div className="w-full max-w-[380px]">
      {/* editor window */}
      <div className="overflow-hidden rounded-xl border border-bone/15 bg-ink-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-1.5 border-b border-bone/10 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
          <span className="ml-3 font-mono text-[10px] text-mist">Notes</span>
        </div>
        <div className="dd-loop dd-fade min-h-[92px] px-4 py-4 font-sans text-[14px] leading-6 text-bone">
          <span className="text-mist">Team update: </span>
          <span className="dd-loop dd-type inline sm:whitespace-nowrap">kal meeting hai, please deck ready rakhna.</span>
          <span className="dd-caret ml-0.5 inline-block h-[15px] w-[1.5px] translate-y-[2px] bg-amber" />
          <div className="dd-loop dd-timing mt-3 inline-flex items-center gap-2 rounded-sm bg-amber/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber">
            1.47 s · Apex q5_0 · local
          </div>
        </div>
      </div>

      {/* hotkey + overlay pill */}
      <div className="dd-loop dd-fade mt-4 flex items-center gap-3">
        <div className="dd-loop dd-key flex h-11 w-16 flex-col items-center justify-center rounded-md border bg-ink-3 font-mono text-[10px] leading-tight text-bone">
          <span className="text-[14px]">⌥</span>
          <span className="text-mist">hold</span>
        </div>

        <div className="relative h-11 flex-1">
          <Pill cls="dd-listen">
            <span className="text-amber"><Mic /></span>
            Listening
            <span className="ml-auto flex h-4 items-end gap-[3px]">
              {bars.map((i) => (
                <span
                  key={i}
                  style={{ "--i": i } as React.CSSProperties}
                  className="dd-bar block h-4 w-[3px] rounded-full bg-cyan"
                />
              ))}
            </span>
          </Pill>
          <Pill cls="dd-work">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
            Transcribing on Metal
          </Pill>
          <Pill cls="dd-done">
            <span className="text-cyan">✓</span>
            Pasted into Notes
            <span className="ml-auto text-mist">0 bytes sent</span>
          </Pill>
        </div>
      </div>
    </div>
  </div>
);
