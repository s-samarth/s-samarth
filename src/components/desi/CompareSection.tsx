import { checked, products, rows, theyWin } from "@/data/ddCompare";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { CompareTable, TheyWin } from "../product/CompareTable";

/**
 * Page five: how it stacks up. The data lives in data/ddCompare.ts so rows
 * and products can be added without touching this layout.
 */
export const CompareSection = () => (
  <section id="compare">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="05"
        name="Compare"
        title={
          <>
            How it stacks up, <em className="text-redpen">honestly.</em>
          </>
        }
        lede="Wispr Flow, MacWhisper and Superwhisper are good apps. None of them is built for the way India actually talks, and that is the gap this fills."
      />

      <Reveal className="mt-12">
        <CompareTable products={products} rows={rows} us="Desi Dictation" checked={checked} />
        <p className="label mt-4 !text-[10px] leading-relaxed !tracking-[0.1em]">
          From each product’s public pages and 2026 reviews, checked {checked}. Prices and plans change; check their
          sites.
        </p>
      </Reveal>

      <Reveal className="mt-14 max-w-3xl">
        <TheyWin lines={theyWin} />
      </Reveal>
    </div>
  </section>
);
