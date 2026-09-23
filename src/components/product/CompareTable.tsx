/**
 * The comparison table shared by the product pages. Each product keeps its
 * own rows in a data file; this only draws them.
 *
 * Frontend note: `P extends string` makes the component generic, so the
 * compiler checks that every row has a cell for every product it names.
 *
 * Wide tables don't fit a phone, so the table sits in an `overflow-x-auto`
 * box that scrolls sideways on its own, while the page doesn't. The first
 * column is `sticky left-0`, so row labels stay visible as you swipe across.
 */
export type Tone = "yes" | "no" | "meh";

export interface Cell {
  text: string;
  /** "yes" is a win for the reader, "no" a gap, "meh" in between, undefined neutral. */
  tone?: Tone;
}

export interface CompareRow<P extends string> {
  label: string;
  cells: Record<P, Cell>;
}

interface CompareTableProps<P extends string> {
  products: readonly P[];
  rows: CompareRow<P>[];
  /** The column that gets the highlighter: ours. */
  us: P;
  /** Shown in the corner cell, e.g. "July 2026". */
  checked: string;
}

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

export const CompareTable = <P extends string>({ products, rows, us, checked }: CompareTableProps<P>) => {
  // Our column gets a highlighter wash, like a row marked in a printout.
  const ours = (p: P) => (p === us ? "bg-marker/15" : "");
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b-2 border-graphite">
            <th className="sticky left-0 z-10 w-[130px] bg-paper-card px-4 py-4 md:w-[190px]">
              <span className="label !text-[10.5px]">As of {checked}</span>
            </th>
            {products.map((p) => (
              <th key={p} scope="col" className={`px-4 py-4 align-bottom ${ours(p)}`}>
                <span className={`font-serif text-[1.15rem] font-medium ${p === us ? "text-redpen" : "text-graphite"}`}>
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
                  className={`px-4 py-3.5 align-top leading-snug ${ours(p)} ${p === us ? "font-medium text-graphite" : "text-graphite-dim"}`}
                >
                  <CellText cell={row.cells[p]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** "Where they're better, said plainly", under each table. */
export const TheyWin = ({ lines }: { lines: string[] }) => (
  <>
    <p className="hand text-[26px]">where they’re better, said plainly:</p>
    <ul className="mt-4 space-y-3 text-[17.5px] leading-relaxed text-graphite-dim">
      {lines.map((line) => (
        <li key={line} className="flex gap-3">
          <span className="text-redpen" aria-hidden="true">
            —
          </span>
          {line}
        </li>
      ))}
    </ul>
  </>
);
