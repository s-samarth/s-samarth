import { motion } from "framer-motion";
import { jobs, links } from "@/data/profile";

/** Sticky-note colour and tilt, one per job, in order. */
const noteStyles = ["bg-[#FCE58A] -rotate-[2deg]", "bg-paper-card rotate-[1.5deg]"];

/**
 * The day job, as two sticky notes under the photo, and a shove toward
 * LinkedIn for anyone who wants more. Kept small on purpose.
 */
export const DayJobNotes = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <p className="label mb-4">The day job, briefly</p>
    <div className="grid grid-cols-2 gap-4">
      {jobs.map((job, i) => (
        <article
          key={job.where}
          className={`relative px-4 pb-4 pt-4 shadow-[0_1px_2px_rgba(29,36,48,0.1),0_14px_24px_-16px_rgba(29,36,48,0.45)] ${noteStyles[i]}`}
        >
          <span className="tape -top-3 left-4 !h-5 !w-16 -rotate-3" />
          <p className="label !text-[10px]">{job.when}</p>
          <h3 className="headline mt-1.5 text-[1.3rem] leading-tight">
            {job.role}, <em>{job.where}</em>
          </h3>
          <p className="mt-1.5 text-[14.5px] leading-snug text-graphite-dim">{job.what}</p>
        </article>
      ))}
    </div>
    <p className="hand mt-6 -rotate-1 text-[24px]">
      Go to my{" "}
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-redpen underline decoration-2 underline-offset-4 hover:text-graphite">
        LinkedIn
      </a>{" "}
      if you care about my job.
    </p>
  </motion.div>
);
