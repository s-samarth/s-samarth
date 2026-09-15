/**
 * Illustrative scene for the Microsoft chapter, second beat: invoices stream
 * through an anomaly model. Most clear and turn green; every so often one is
 * pulled aside with the reason attached. Not a diagram of the real product.
 */
const W = 520;
const H = 340;
const BELT_Y = 170;
const SCAN_X = 260;
const TRAVEL = "7s";

/** Stagger so the belt always has a few invoices on it. */
const begins = [0, 1.4, 2.8, 4.2, 5.6];

const font = { fontFamily: "Inter, sans-serif", fontSize: 11 } as const;

const Invoice = () => (
  <>
    <rect x="-20" y="-14" width="40" height="28" rx="4" fill="#0F0F12" />
    <line x1="-12" y1="-6" x2="12" y2="-6" />
    <line x1="-12" y1="0" x2="4" y2="0" />
    <line x1="-12" y1="6" x2="8" y2="6" />
  </>
);

export const LeakageScene = () => (
  <div className="flex h-full w-full items-center justify-center p-4" aria-hidden="true">
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[560px]">
      <defs>
        <linearGradient id="scanGlow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <path id="lk-belt" d={`M -30 ${BELT_Y} L ${W + 30} ${BELT_Y}`} />
      </defs>

      <text x="24" y="28" fill="#A1A1A6" {...font}>
        Global invoices
      </text>

      {/* belt and scanner */}
      <line x1="0" y1={BELT_Y} x2={W} y2={BELT_Y} stroke="#F5F5F7" strokeOpacity="0.14" />
      <rect x={SCAN_X - 10} y={BELT_Y - 66} width="20" height="132" fill="url(#scanGlow)" />
      <line x1={SCAN_X} y1={BELT_Y - 66} x2={SCAN_X} y2={BELT_Y + 66} stroke="var(--accent)" strokeWidth="1.25" />
      <text x={SCAN_X} y={BELT_Y + 84} textAnchor="middle" fill="#F5F5F7" fontWeight="600" {...font}>
        Anomaly model
      </text>

      {/* invoices that clear: grey in, green out */}
      {begins.map((begin) => (
        <g key={begin} stroke="#F5F5F7" strokeOpacity="0.3">
          <animateMotion dur={TRAVEL} begin={`${begin}s`} repeatCount="indefinite">
            <mpath href="#lk-belt" />
          </animateMotion>
          <animate attributeName="stroke" values="#F5F5F7;#F5F5F7;#34D399;#34D399" keyTimes="0;0.5;0.52;1" dur={TRAVEL} begin={`${begin}s`} repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.3;0.3;1;1" keyTimes="0;0.5;0.52;1" dur={TRAVEL} begin={`${begin}s`} repeatCount="indefinite" />
          <Invoice />
        </g>
      ))}

      {/* one held back every 14s, lifted off the belt with its reason */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -62;0 -62" keyTimes="0;0.28;0.34;1" dur="14s" begin="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.9;0.93;1" dur="14s" begin="3.5s" repeatCount="indefinite" />
        <g stroke="#F5F5F7" strokeOpacity="0.3">
          <animateMotion dur="14s" begin="3.5s" repeatCount="indefinite" keyPoints="0;0.55;0.55" keyTimes="0;0.275;1" calcMode="linear">
            <mpath href="#lk-belt" />
          </animateMotion>
          <animate attributeName="stroke" values="#F5F5F7;#F5F5F7;#F2A33A;#F2A33A" keyTimes="0;0.25;0.27;1" dur="14s" begin="3.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.3;0.3;1;1" keyTimes="0;0.25;0.27;1" dur="14s" begin="3.5s" repeatCount="indefinite" />
          <Invoice />
        </g>
      </g>
      <g {...font}>
        <rect x="318" y="94" width="176" height="28" rx="6" fill="#0F0F12" stroke="#F2A33A" strokeOpacity="0.8">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.34;0.37;0.9;0.93" dur="14s" begin="3.5s" repeatCount="indefinite" />
        </rect>
        <text x="406" y="112" textAnchor="middle" fill="#F2A33A" fontWeight="600">
          Held · duplicate credit memo
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.34;0.37;0.9;0.93" dur="14s" begin="3.5s" repeatCount="indefinite" />
        </text>
      </g>

      {/* legend */}
      <g fill="#A1A1A6" {...font}>
        <circle cx="24" cy={H - 16} r="3.5" fill="#34D399" />
        <text x="34" y={H - 12}>cleared</text>
        <circle cx="104" cy={H - 16} r="4" fill="#F2A33A" />
        <text x="114" y={H - 12}>held, with the reason</text>
        <text x={W - 12} y={H - 12} textAnchor="end">
          illustrative
        </text>
      </g>
    </svg>
  </div>
);
