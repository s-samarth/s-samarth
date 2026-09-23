/**
 * The long story behind a project, folded away under the results.
 *
 * Frontend note: <details>/<summary> is the browser's built-in disclosure
 * widget. It is keyboard- and screen-reader-accessible for free, needs no
 * state, and crawlers still read the folded text. Tailwind's `group-open:`
 * variant styles children while the <details> is open.
 */
export const LabNotes = ({ paragraphs }: { paragraphs: string[] }) => (
  <details className="group mt-7 border-t border-graphite/15 pt-3.5">
    <summary className="inline-flex cursor-pointer list-none items-center gap-2.5 [&::-webkit-details-marker]:hidden">
      <span className="grid h-[22px] w-[22px] place-items-center border-2 border-graphite/60 font-mono text-[16px] font-medium leading-none text-biro transition-transform duration-300 ease-cinematic group-open:rotate-45">
        +
      </span>
      <span className="hand text-[25px]">read the full lab notes</span>
    </summary>
    <div className="rise mt-3.5 space-y-3.5 text-[17px] leading-relaxed text-graphite-dim">
      {paragraphs.map((para) => (
        <p key={para.slice(0, 24)}>{para}</p>
      ))}
    </div>
  </details>
);
