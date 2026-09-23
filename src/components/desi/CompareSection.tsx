import { checked, products, rows, theyWin, type Cell, type Product } from "@/data/ddCompare";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";

const US: Product = "Desi Dictation";

/** A pen mark before each cell: a biro tick, a red cross, or a soft tilde for "partly". */
const marks = {
  yes: { glyph: "✓", cls: "text-biro" },
  no: { glyph: "✕", cls: "text-redpen" },
  meh: { glyph: "~", cls: "text-graphite-soft" },
} as const;

const CellText = ({ cell }: { cell: Cell }) => (
  <span className="flex items-baseline gap-2">
    {cell.tone && (
      <span className={`w-3 shrink-0 font-hand text-[20px] leading-none ${marks[cell.tone].cls}`} aria-hidden="true">
        {marks[cell.tone].glyph}
      </span>
    )}
    <span>{cell.text}</span>
  </span>
);

/** Our column gets a highlighter wash, like a row marked in a printout. */
const ours = (p: Product) => (p === US ? "bg-marker/15" : "");

/**
 * Page five: how it stacks up. The data lives in data/ddCompare.ts so rows
 * and products can be added without touching this layout.
 *
 * Frontend note: wide tables don't fit a phone, so the table sits in an
 * `overflow-x-auto` box that scrolls sideways on its own, while the page
 * doesn't. The first column is `sticky left-0`, so row labels stay visible
 * as you swipe across.
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
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b-2 border-graphite">
                <th className="sticky left-0 z-10 w-[130px] bg-paper-card md:w-[190px] px-4 py-4">
                  <span className="label !text-[10.5px]">As of {checked}</span>
                </th>
                {products.map((p) => (
                  <th key={p} scope="col" className={`px-4 py-4 align-bottom ${ours(p)}`}>
                    <span
                      className={`font-serif text-[1.15rem] font-medium ${p === US ? "text-redpen" : "text-graphite"}`}
                    >
                      {p}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-dotted border-graphite-soft/60 last:border-0">
                  <th scope="row" className="sticky left-0 z-10 bg-paper-card px-4 py-3.5 align-top">
                    <span className="label !text-[10.5px] !tracking-[0.1em] !text-graphite-dim">{row.label}</span>
                  </th>
                  {products.map((p) => (
                    <td
                      key={p}
                      className={`px-4 py-3.5 align-top leading-snug ${ours(p)} ${p === US ? "font-medium text-graphite" : "text-graphite-dim"}`}
                    >
                      <CellText cell={row.cells[p]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="label mt-4 !text-[10px] leading-relaxed !tracking-[0.1em]">
          From each product’s public pages and 2026 reviews, checked {checked}. Prices and plans change; check their
          sites.
        </p>
      </Reveal>

      <Reveal className="mt-14 max-w-3xl">
        <p className="hand text-[26px]">where they’re better, said plainly:</p>
        <ul className="mt-4 space-y-3 text-[17.5px] leading-relaxed text-graphite-dim">
          {theyWin.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="text-redpen" aria-hidden="true">
                —
              </span>
              {line}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
