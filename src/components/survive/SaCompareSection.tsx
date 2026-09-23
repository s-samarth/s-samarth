import { saChecked, saProducts, saRows, saTheyWin } from "@/data/saCompare";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { CompareTable, TheyWin } from "../product/CompareTable";

/**
 * Page six: against what people actually have when the network goes. The
 * data lives in data/saCompare.ts; the table is shared with Desi Dictation.
 */
export const SaCompareSection = () => (
  <section id="compare">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="06"
        name="Compare"
        title={
          <>
            The book, the chatbot, <em className="text-redpen">and this.</em>
          </>
        }
        lede="A printed guide has the answer and no way to find it fast. A chatbot finds it fast and needs a tower. Survive AI sits between them: the guide’s answers, found the way a chatbot would, with no network."
      />

      <Reveal className="mt-12">
        <CompareTable products={saProducts} rows={saRows} us="Survive AI" checked={saChecked} />
        <p className="label mt-4 !text-[10px] leading-relaxed !tracking-[0.1em]">
          Columns are kinds of help, not particular products. Plans and prices change.
        </p>
      </Reveal>

      <Reveal className="mt-14 max-w-3xl">
        <TheyWin lines={saTheyWin} />
      </Reveal>
    </div>
  </section>
);
