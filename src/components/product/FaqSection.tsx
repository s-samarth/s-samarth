import { PageHead } from "../notebook/PageHead";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * A product page's FAQ: questions people actually ask.
 *
 * Frontend note: each answer is a native <details>, like the lab notes on the
 * home page, so it is keyboard-accessible and crawlers read the answers.
 */
export const FaqSection = ({ page, faqs }: { page: string; faqs: FaqItem[] }) => (
  <section id="faq">
    <div className="page-x py-20 md:py-28">
      <PageHead page={page} name="FAQ" title={<>Fair questions.</>} />
      <div className="mt-10 max-w-3xl border-t-2 border-graphite">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-dotted border-graphite-soft/60 py-4">
            <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
              <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center border-2 border-graphite/60 font-mono text-[16px] font-medium leading-none text-biro transition-transform duration-300 ease-cinematic group-open:rotate-45">
                +
              </span>
              <span className="font-serif text-[1.3rem] font-medium leading-snug text-graphite">{f.q}</span>
            </summary>
            <p className="rise mt-3 pl-[38px] text-[17px] leading-relaxed text-graphite-dim">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
