import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface TerminalCommandProps {
  /** One command per line. */
  command: string;
  /** Typewritten caption under the slip, e.g. "Terminal · once". */
  caption?: string;
}

/**
 * A terminal command printed out and taped into the notebook, with a copy
 * button. Kept flat (no tilt) because people select text from it.
 *
 * Frontend note: `navigator.clipboard.writeText` is the modern async
 * clipboard API. It only works on https or localhost and can be refused,
 * so the button only flips to "copied" once the promise resolves.
 */
export const TerminalCommand = ({ command, caption }: TerminalCommandProps) => {
  const [copied, setCopied] = useState(false);

  const copy = () =>
    navigator.clipboard
      ?.writeText(command)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => setCopied(false));

  return (
    <figure className="print relative mt-2">
      <span className="tape -top-3 right-8 !h-5 !w-16 rotate-3" />
      <div className="relative bg-graphite px-4 py-4 pr-24 font-mono text-[13px] leading-relaxed text-paper sm:text-[14px]">
        {command.split("\n").map((line) => (
          <p key={line} className="[overflow-wrap:anywhere]">
            <span className="select-none text-marker">$ </span>
            {line}
          </p>
        ))}
        <button
          type="button"
          onClick={copy}
          className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 border border-paper/30 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-paper/85 transition-colors hover:border-marker hover:text-marker"
          aria-label="Copy command"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {caption && <figcaption className="label mt-2.5 px-1 !text-[10px]">{caption}</figcaption>}
    </figure>
  );
};
