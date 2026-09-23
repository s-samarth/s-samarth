import { situations } from "@/data/saProduct";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";

/**
 * Page three: the 18 guides, set as the contents page of the book you'd
 * otherwise be leafing through.
 *
 * Frontend note: `columns-*` is CSS multi-column layout, so the list flows
 * down one column and then the next, like a printed contents page, instead
 * of across rows as a grid would. `break-inside-avoid` keeps an entry whole.
 */
export const SituationsSection = () => (
  <section id="situations">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="03"
        name="What it covers"
        title={
          <>
            Eighteen situations, <em className="text-redpen">written for India.</em>
          </>
        }
        lede="The emergency numbers are Indian (112, 1906 for LPG, 108 for an ambulance), and so are the snakes, the cylinders, the monsoon and the words people use. That scope is a choice, not a gap."
      />

      <Reveal className="mt-12 max-w-4xl" delay={0.1}>
        <div className="card relative rotate-[0.3deg] px-6 pb-7 pt-5 md:px-9">
          <span className="tape -top-3 left-10 -rotate-3" />
          <p className="border-b-2 border-graphite pb-2 font-serif text-[1.6rem] font-medium italic">Contents</p>
          <ol className="mt-4 columns-1 gap-10 sm:columns-2 lg:columns-3">
            {situations.map((name, i) => (
              <li
                key={name}
                className="flex break-inside-avoid items-baseline gap-3 border-b border-dotted border-graphite-soft/60 py-2"
              >
                <span className="font-mono text-[11px] font-medium text-redpen">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16.5px] text-graphite">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
      <p className="hand mt-8 -rotate-1 text-[23px]">every guide is readable in the app too, no AI needed.</p>
    </div>
  </section>
);
