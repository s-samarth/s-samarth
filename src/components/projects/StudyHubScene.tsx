/**
 * Scene for the study hub: one landing node routing to seven independent
 * sites. Each track lights up in turn (styles/scenes.css, 12 s loop).
 */
const tracks = [
  { label: "Mathematics", color: "#2B5BA8" },
  { label: "Classical ML", color: "#0FA37F" },
  { label: "Deep Learning", color: "#E5533D" },
  { label: "LLMs", color: "#7C4DDB" },
  { label: "Agentic AI", color: "#D9468A" },
  { label: "Case Studies", color: "#0B8FC7" },
  { label: "Production ML", color: "#C77A1A" },
];

const W = 400;
const H = 300;
const CX = W / 2;
const CY = H / 2;
const R = 112;
const FONT = "Inter, system-ui, sans-serif";
const MONO = "IBM Plex Mono, monospace";

/** Positions on an ellipse so the labels have breathing room horizontally. */
const positions = tracks.map((track, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / tracks.length;
  return { ...track, x: CX + Math.cos(angle) * R * 1.28, y: CY + Math.sin(angle) * R };
});

export const StudyHubScene = () => (
  <div className="flex h-full w-full items-center justify-center p-4" aria-hidden="true">
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[440px]" role="img" shapeRendering="geometricPrecision">
      {positions.map((p, i) => (
        <line
          key={p.label}
          x1={CX}
          y1={CY}
          x2={p.x}
          y2={p.y}
          stroke={p.color}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="hub-edge"
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}

      <circle cx={CX} cy={CY} r="31" fill="#F2A33A" />
      <circle cx={CX} cy={CY} r="31" fill="none" stroke="#1D2430" strokeWidth="1.5" />
      <text x={CX} y={CY - 2} textAnchor="middle" fill="#1D2430" fontFamily={MONO} fontSize="10" fontWeight="500" letterSpacing="1.5">
        STUDY
      </text>
      <text x={CX} y={CY + 11} textAnchor="middle" fill="#1D2430" fontFamily={MONO} fontSize="10" fontWeight="500" letterSpacing="1.5">
        HUB
      </text>

      {positions.map((p, i) => (
        <g key={p.label} className="hub-node" style={{ "--i": i } as React.CSSProperties}>
          <rect x={p.x - 47} y={p.y - 14} width="94" height="28" rx="6" fill="#FFFFFF" stroke={p.color} strokeWidth="1.5" />
          <rect x={p.x - 47} y={p.y - 14} width="6" height="28" rx="3" fill={p.color} />
          <text x={p.x + 3} y={p.y + 4} textAnchor="middle" fill="#1D2430" fontFamily={FONT} fontSize="11" fontWeight="500">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  </div>
);
