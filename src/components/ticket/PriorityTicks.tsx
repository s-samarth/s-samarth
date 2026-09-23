import { motion } from "framer-motion";

const priorities = ["Urgent", "This week", "Just saying hi"] as const;
export type Priority = (typeof priorities)[number];

/** A biro tick that draws itself into the box when chosen. */
const Tick = () => (
  <svg viewBox="0 0 30 28" className="absolute -left-0.5 -top-1.5 h-7 w-[30px] overflow-visible" aria-hidden="true">
    <motion.path
      d="M5 15 L 12 22 L 27 3"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    />
  </svg>
);

interface PriorityTicksProps {
  value: Priority;
  onChange: (p: Priority) => void;
}

/**
 * Priority as hand-ticked boxes. Under the hood it's a real radio group
 * (`sr-only` hides the native input but keeps it focusable), so arrow keys
 * and screen readers work as usual; `peer-focus-visible` draws the focus ring
 * on the drawn box instead.
 */
export const PriorityTicks = ({ value, onChange }: PriorityTicksProps) => (
  <fieldset>
    <legend className="label !text-[11px]">Priority</legend>
    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
      {priorities.map((p) => (
        <label key={p} className="flex cursor-pointer items-center gap-2 font-hand text-[23px] font-medium leading-[1.1] text-graphite">
          <input type="radio" name="priority" value={p} checked={value === p} onChange={() => onChange(p)} className="peer sr-only" />
          <span className="relative h-5 w-5 shrink-0 border-2 border-graphite/60 text-biro peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-biro">
            {value === p && <Tick />}
          </span>
          {p}
        </label>
      ))}
    </div>
  </fieldset>
);
