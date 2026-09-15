/**
 * Scene for the study hub: one landing node routing to seven independent
 * sites. Each track brightens in turn (styles/scenes.css, 12 s loop).
 */
const tracks = [
  "Mathematics",
  "Classical ML",
  "Deep Learning",
  "LLMs",
  "Agentic AI",
  "Case Studies",
  "Production ML",
];

const W = 400;
const H = 300;
const CX = W / 2;
const CY = H / 2;
const R = 112;

/** Positions on an ellipse so the labels have breathing room horizontally. */
const positions = tracks.map((label, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / tracks.length;
  return { label, x: CX + Math.cos(angle) * R * 1.5, y: CY + Math.sin(angle) * R };
});

export const StudyHubScene = () => (
  <div className="flex h-full w-full items-center justify-center p-4" aria-hidden="true">
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[440px]" role="img">
      {positions.map((p, i) => (
        <line
          key={p.label}
          x1={CX}
          y1={CY}
          x2={p.x}
          y2={p.y}
          stroke="#5CC8E8"
          strokeWidth="1"
          className="hub-edge"
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}

      {/* hub */}
      <g>
        <circle cx={CX} cy={CY} r="30" fill="#11141B" stroke="#F2A33A" strokeWidth="1.25" />
        <text
          x={CX}
          y={CY - 3}
          textAnchor="middle"
          fill="#ECE7DD"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
          letterSpacing="1.5"
        >
          STUDY
        </text>
        <text
          x={CX}
          y={CY + 10}
          textAnchor="middle"
          fill="#F2A33A"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
          letterSpacing="1.5"
        >
          HUB
        </text>
      </g>

      {positions.map((p, i) => (
        <g key={p.label} className="hub-node" style={{ "--i": i } as React.CSSProperties}>
          <rect
            x={p.x - 46}
            y={p.y - 13}
            width="92"
            height="26"
            rx="4"
            fill="#11141B"
            stroke="#ECE7DD"
            strokeOpacity="0.25"
          />
          <text
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fill="#ECE7DD"
            fontFamily="Instrument Sans, sans-serif"
            fontSize="11"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  </div>
);
