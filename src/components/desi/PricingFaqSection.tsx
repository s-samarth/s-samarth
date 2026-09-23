import { faqs } from "@/data/ddProduct";
import { requirements } from "@/data/desiDictation";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { DownloadStamp } from "./DdHero";
import { FaqSection as SharedFaq } from "../product/FaqSection";

const included = [
  "Every model: Hinglish, English, हिन्दी and the pause detector",
  "Every feature, including the on-device AI layer",
  "No word limits, no account, no card",
];

/** Page six: one plan, because there is one plan. A ticket stub, torn at the side. */
export const PricingSection = () => (
  <section id="pricing">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="06"
        name="Pricing"
        title={
          <>
            Free while it’s <em className="text-redpen">in beta.</em>
          </>
        }
      />
      <Reveal className="mt-12 max-w-xl">
        <div className="card relative -rotate-[0.6deg] border-l-4 border-dashed border-redpen/50 px-7 pb-7 pt-6">
          <span className="tape -top-3 right-10 rotate-3" />
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-graphite pb-3">
            <p className="font-serif text-[1.5rem] font-medium">Free beta</p>
            <p className="headline text-[3rem] leading-none">₹0</p>
          </div>
          <ul className="mt-5 space-y-2.5 text-[17px] leading-snug text-graphite-dim">
            {included.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-hand text-[22px] leading-none text-redpen" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <DownloadStamp />
          </div>
          <p className="label mt-4 !text-[10.5px]">{requirements.slice(0, 2).join(" · ")}</p>
        </div>
      </Reveal>
      <p className="hand mt-8 max-w-xl -rotate-1 text-[23px]">
        no subscriptions: the roadmap lists them as a non-goal.
      </p>
    </div>
  </section>
);

/** Page seven: the shared FAQ layout with this product's questions. */
export const FaqSection = () => <SharedFaq page="07" faqs={faqs} />;
