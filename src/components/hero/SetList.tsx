import { useEffect, useState } from "react";
import { useActivePage } from "@/hooks/use-active-page";
import { useTicketSent } from "@/lib/ticket-sent";
import { riseDelay } from "@/lib/rise";

/** The page's sections in reading order; the set list crosses them off in this order. */
const order = ["top", "who", "built", "writes", "ticket"] as const;
type SectionId = (typeof order)[number];

interface Bit {
  /** Which section this bit belongs to; it's crossed off once the reader is past it. */
  section: SectionId;
  href: string;
  text: string;
  /** Fixed timing text. Without it, the time is the section's real reading time. */
  time?: string;
  /** The day-job bit shares page one with the name bit, so only one of them says "now". */
  showNow?: boolean;
}

const bits: Bit[] = [
  { section: "top", href: "#top", text: "The name bit", showNow: true },
  { section: "top", href: "#dayjob", text: "Day job, keep it short", time: "2 notes" },
  { section: "who", href: "#who", text: "The fine print", showNow: true },
  { section: "built", href: "#built", text: "Built it, gave it away", showNow: true },
  { section: "writes", href: "#writes", text: "Things I wrote down", showNow: true },
  { section: "ticket", href: "#ticket", text: "Crowd work: raise a ticket", showNow: true },
];

/** Reading time at 220 words a minute, so the set list's timings are true. */
const readingTime = (id: string) => {
  const words = document.getElementById(id)?.innerText.split(/\s+/).length ?? 0;
  const mins = words / 220;
  return mins < 0.75 ? `${Math.max(15, Math.round(mins * 4) * 15)} s` : `${Math.round(mins)} min`;
};

/**
 * Measured after the page mounts. The prerendered HTML has no timings, and
 * that's fine: they fill in a moment later without changing the layout.
 */
const useReadingTimes = () => {
  const [times, setTimes] = useState<Partial<Record<SectionId, string>>>({});
  useEffect(() => setTimes(Object.fromEntries(order.map((id) => [id, readingTime(id)]))), []);
  return times;
};

/**
 * A comic's set list, torn off a pad and taped under the photo. It doubles as
 * the table of contents: each bit links to its section and gets crossed off in
 * red marker once the reader scrolls past it. Raising a ticket crosses off the
 * last bit. Styles in styles/hero.css.
 */
export const SetList = () => {
  const active = useActivePage(order) ?? "top";
  const sent = useTicketSent();
  const times = useReadingTimes();
  const at = order.indexOf(active);

  return (
    <nav aria-label="Set list: the pages of this site">
      <div className="rise set-wrap" style={riseDelay(0.6)}>
        <span className="tape -top-2.5 left-1/2 -ml-12 rotate-3" />
        <div className="setlist">
          <div className="flex items-baseline justify-between">
            <span className="font-hand text-[34px] font-bold leading-none text-graphite underline decoration-[3px] underline-offset-[5px]">SET LIST</span>
            <span className="hand text-[21px]">Bangalore, tonight</span>
          </div>
          <ol className="set-items mt-2.5">
            {bits.map((bit) => {
              const i = order.indexOf(bit.section);
              const crowdWorkDone = bit.section === "ticket" && sent;
              const done = i < at || crowdWorkDone;
              const now = bit.showNow && i === at && !crowdWorkDone;
              return (
                <li key={bit.text} className={done ? "set-done" : ""}>
                  <a href={bit.href} aria-current={now ? "location" : undefined}>
                    <span className="set-text">{bit.text}</span>
                    {now && <span className="set-now font-hand text-[22px] font-medium text-biro">← now</span>}
                    <span className="ml-auto pl-2 font-mono text-[11px] font-normal tracking-[0.04em] text-graphite-soft">
                      {bit.time ?? times[bit.section]}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
          <p className="label mt-2 !text-[10px]">Crossed off as you scroll</p>
        </div>
      </div>
    </nav>
  );
};
