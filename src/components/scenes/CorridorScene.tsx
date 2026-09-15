/**
 * Illustrative scene for the Tazapay chapter: payments travelling along
 * cross-border corridors into a hub, each one screened, one of them flagged.
 * It is a picture of the problem space, not a diagram of any real system.
 */
const W = 520;
const H = 340;
const HUB = { x: 260, y: 170 };

const corridors = [
  { id: "in", label: "IN", x: 70, y: 70, dur: 5.2, begin: 0 },
  { id: "us", label: "US", x: 450, y: 60, dur: 6.1, begin: 1.1 },
  { id: "gb", label: "GB", x: 470, y: 180, dur: 4.6, begin: 2.3 },
  { id: "ae", label: "AE", x: 60, y: 190, dur: 5.7, begin: 0.6 },
  { id: "id", label: "ID", x: 120, y: 290, dur: 4.9, begin: 1.8 },
  { id: "au", label: "AU", x: 420, y: 290, dur: 6.4, begin: 3.0 },
];

/** Quadratic curve from a node to the hub, bowed toward the centre-top. */
const pathFor = (x: number, y: number) => {
  const cx = (x + HUB.x) / 2;
  const cy = (y + HUB.y) / 2 - 40;
  return `M ${x} ${y} Q ${cx} ${cy} ${HUB.x} ${HUB.y}`;
};

export const CorridorScene = () => (
  <div className="flex h-full w-full items-center justify-center p-4" aria-hidden="true">
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[560px]">
      <defs>
        <radialGradient id="hubGlow">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {corridors.map((c) => (
        <path key={c.id} id={`corr-${c.id}`} d={pathFor(c.x, c.y)} fill="none" stroke="#F5F5F7" strokeOpacity="0.14" strokeWidth="1" />
      ))}

      {/* hub */}
      <circle cx={HUB.x} cy={HUB.y} r="70" fill="url(#hubGlow)" />
      <circle cx={HUB.x} cy={HUB.y} r="26" fill="#0F0F12" stroke="var(--accent)" strokeWidth="1.25" />
      <text x={HUB.x} y={HUB.y + 4} textAnchor="middle" fill="#F5F5F7" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600">
        SCREEN
      </text>

      {/* country nodes */}
      {corridors.map((c) => (
        <g key={c.id}>
          <circle cx={c.x} cy={c.y} r="16" fill="#0F0F12" stroke="#F5F5F7" strokeOpacity="0.28" />
          <text x={c.x} y={c.y + 4} textAnchor="middle" fill="#F5F5F7" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500">
            {c.label}
          </text>
        </g>
      ))}

      {/* cleared payments: green dots travelling in */}
      {corridors.map((c) => (
        <circle key={`dot-${c.id}`} r="3.5" fill="#34D399">
          <animateMotion dur={`${c.dur}s`} begin={`${c.begin}s`} repeatCount="indefinite">
            <mpath href={`#corr-${c.id}`} />
          </animateMotion>
        </circle>
      ))}

      {/* one flagged payment on the IN corridor, every 8s */}
      <circle r="4.5" fill="#F2A33A">
        <animateMotion dur="8s" begin="2s" repeatCount="indefinite" keyPoints="0;0.62;0.62" keyTimes="0;0.55;1" calcMode="linear">
          <mpath href="#corr-in" />
        </animateMotion>
        <animate attributeName="opacity" values="1;1;1;0;0" keyTimes="0;0.55;0.9;0.95;1" dur="8s" begin="2s" repeatCount="indefinite" />
      </circle>
      <g fontFamily="Inter, sans-serif" fontSize="11">
        <rect x="150" y="96" width="112" height="24" rx="6" fill="#0F0F12" stroke="#F2A33A" strokeOpacity="0.8">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.6;0.92;1" dur="8s" begin="2s" repeatCount="indefinite" />
        </rect>
        <text x="206" y="112" textAnchor="middle" fill="#F2A33A" fontWeight="600">
          Held for review
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.6;0.92;1" dur="8s" begin="2s" repeatCount="indefinite" />
        </text>
      </g>

      {/* legend */}
      <g fontFamily="Inter, sans-serif" fontSize="11" fill="#A1A1A6">
        <circle cx="24" cy={H - 16} r="3.5" fill="#34D399" />
        <text x="34" y={H - 12}>cleared</text>
        <circle cx="104" cy={H - 16} r="4" fill="#F2A33A" />
        <text x="114" y={H - 12}>flagged</text>
        <text x={W - 12} y={H - 12} textAnchor="end">illustrative</text>
      </g>
    </svg>
  </div>
);
