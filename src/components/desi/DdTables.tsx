import { models, permissions } from "@/data/desiDictation";

/**
 * The two reference tables in the install steps, drawn like the lab-results
 * table on the home page: a heavy graphite top rule, dotted rows, mono keys.
 *
 * Frontend note: these are real <table>s, not divs, because the data is
 * tabular. Screen readers announce rows and column headers, and on phones
 * each row collapses into a stacked block with plain CSS (`block md:table-row`).
 */
const th = "label pb-2 text-left !text-[10.5px] font-medium";
const row = "block border-b border-dotted border-graphite-soft/60 py-3 md:table-row md:py-0";
const td = "block md:table-cell md:py-3 md:pr-6 align-top";

export const PermissionsTable = () => (
  <table className="mt-2 w-full border-t-2 border-graphite text-[16px]">
    <thead className="sr-only md:not-sr-only md:table-header-group">
      <tr>
        <th className={`${th} pt-3`}>Permission</th>
        <th className={`${th} pt-3`}>Why</th>
        <th className={`${th} pt-3`}>Where</th>
      </tr>
    </thead>
    <tbody>
      {permissions.map((p) => (
        <tr key={p.name} className={row}>
          <td className={`${td} font-medium text-graphite`}>{p.name}</td>
          <td className={td}>{p.why}</td>
          <td className={`${td} font-mono text-[13px] text-graphite-soft md:text-graphite-dim`}>{p.where}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const ModelsTable = () => (
  <table className="mt-2 w-full border-t-2 border-graphite text-[16px]">
    <thead className="sr-only md:not-sr-only md:table-header-group">
      <tr>
        <th className={`${th} pt-3`}>Model</th>
        <th className={`${th} pt-3`}>When you want</th>
        <th className={`${th} pt-3 text-right`}>Size</th>
      </tr>
    </thead>
    <tbody>
      {models.map((m) => (
        <tr key={m.name} className={row}>
          <td className={`${td} whitespace-nowrap font-medium text-graphite`}>
            <span className={`mr-1.5 ${m.pick ? "text-redpen" : "text-transparent"}`} aria-hidden="true">
              ★
            </span>
            {m.pick ? <span className="hl">{m.name}</span> : m.name}
            {m.pick && <span className="sr-only"> (recommended)</span>}
          </td>
          <td className={td}>{m.forWhat}</td>
          <td className={`${td} font-mono text-[13px] text-graphite-soft md:whitespace-nowrap md:text-right`}>{m.size}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
