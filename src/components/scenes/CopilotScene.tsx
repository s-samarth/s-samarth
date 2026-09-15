/**
 * Illustrative scene for the Microsoft chapter, first beat: a seller drops a
 * proposal into Seller Copilot, agents retrieve, find the gaps and chase the
 * approvals, and the deal cycle bar at the bottom shrinks from 15 days to 2.
 * A picture of the idea, not a diagram of the real system. One loop = 10s.
 */
const W = 520;
const H = 340;
const HUB = { x: 250, y: 140 };
const DOC = { x: 56, y: 140 };
const PILL = { x: 392, w: 96, h: 28 };
const LOOP = "10s";

const agents = [
  { id: "retrieve", label: "Retrieve", y: 70, t0: 0.18, t1: 0.26 },
  { id: "gaps", label: "Find gaps", y: 140, t0: 0.3, t1: 0.38 },
  { id: "approve", label: "Approvals", y: 210, t0: 0.42, t1: 0.5 },
];

const font = { fontFamily: "Inter, sans-serif", fontSize: 11 } as const;
const loop = { dur: LOOP, repeatCount: "indefinite" } as const;

export const CopilotScene = () => (
  <div className="flex h-full w-full items-center justify-center p-4" aria-hidden="true">
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[560px]">
      <defs>
        <radialGradient id="copilotGlow">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <path id="cp-doc" d={`M ${DOC.x} ${DOC.y} L ${HUB.x - 26} ${HUB.y}`} />
        {agents.map((a) => (
          <path key={a.id} id={`cp-${a.id}`} d={`M ${HUB.x + 26} ${HUB.y} L ${PILL.x} ${a.y}`} />
        ))}
      </defs>

      {/* wires */}
      <line x1={DOC.x} y1={DOC.y} x2={HUB.x} y2={HUB.y} stroke="#F5F5F7" strokeOpacity="0.14" />
      {agents.map((a) => (
        <line key={a.id} x1={HUB.x} y1={HUB.y} x2={PILL.x} y2={a.y} stroke="#F5F5F7" strokeOpacity="0.14" />
      ))}

      {/* upload slot */}
      <rect x={DOC.x - 20} y={DOC.y - 26} width="40" height="52" rx="5" fill="#0F0F12" stroke="#F5F5F7" strokeOpacity="0.28" strokeDasharray="3 3" />
      <text x={DOC.x} y={DOC.y + 46} textAnchor="middle" fill="#A1A1A6" {...font}>
        Seller uploads
      </text>
      <text x={DOC.x} y={DOC.y + 60} textAnchor="middle" fill="#A1A1A6" {...font}>
        the proposal
      </text>

      {/* the proposal travelling into the copilot */}
      <g stroke="#F5F5F7">
        <animateMotion {...loop} keyPoints="0;0;1;1" keyTimes="0;0.03;0.14;1" calcMode="linear">
          <mpath href="#cp-doc" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.03;0.13;0.16;1" {...loop} />
        <rect x="-20" y="-26" width="40" height="52" rx="5" fill="#0F0F12" strokeOpacity="0.6" />
        <line x1="-11" y1="-10" x2="11" y2="-10" strokeOpacity="0.5" />
        <line x1="-11" y1="0" x2="6" y2="0" strokeOpacity="0.5" />
        <line x1="-11" y1="10" x2="9" y2="10" strokeOpacity="0.5" />
      </g>

      {/* hub */}
      <circle cx={HUB.x} cy={HUB.y} r="70" fill="url(#copilotGlow)" />
      <circle cx={HUB.x} cy={HUB.y} r="26" fill="#0F0F12" stroke="var(--accent)" strokeWidth="1.25" />
      <text x={HUB.x} y={HUB.y + 4} textAnchor="middle" fill="#F5F5F7" fontWeight="600" {...font}>
        COPILOT
      </text>

      {/* agents, lit one after another */}
      {agents.map((a) => (
        <g key={a.id}>
          <circle r="3.5" fill="var(--accent)">
            <animateMotion {...loop} keyPoints="0;0;1;1" keyTimes={`0;${a.t0};${a.t1};1`} calcMode="linear">
              <mpath href={`#cp-${a.id}`} />
            </animateMotion>
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={`0;${a.t0};${a.t0 + 0.005};${a.t1};${a.t1 + 0.01};1`} {...loop} />
          </circle>
          <rect x={PILL.x} y={a.y - PILL.h / 2} width={PILL.w} height={PILL.h} rx={PILL.h / 2} fill="#0F0F12" stroke="#F5F5F7" strokeOpacity="0.28">
            <animate attributeName="stroke" values="#F5F5F7;#F5F5F7;#34D399;#34D399;#F5F5F7" keyTimes={`0;${a.t1};${a.t1 + 0.02};0.94;1`} {...loop} />
            <animate attributeName="stroke-opacity" values="0.28;0.28;1;1;0.28" keyTimes={`0;${a.t1};${a.t1 + 0.02};0.94;1`} {...loop} />
          </rect>
          <path d={`M ${PILL.x + 12} ${a.y} l 4 4 l 8 -8`} fill="none" stroke="#34D399" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${a.t1};${a.t1 + 0.03};0.94;1`} {...loop} />
          </path>
          <text x={PILL.x + PILL.w / 2 + 10} y={a.y + 4} textAnchor="middle" fill="#F5F5F7" fontWeight="500" {...font}>
            {a.label}
          </text>
        </g>
      ))}

      {/* approvals go out, come back */}
      <g textAnchor="middle" fill="#A1A1A6" {...font}>
        <text x={PILL.x + PILL.w / 2} y={agents[2].y + 32}>
          requests sent
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.5;0.52;0.58;0.6;1" {...loop} />
        </text>
        <text x={PILL.x + PILL.w / 2} y={agents[2].y + 32} fill="#34D399">
          all approved
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.62;0.94;1" {...loop} />
        </text>
      </g>

      {/* deal cycle: 15 days vs 2 */}
      <g {...font}>
        <text x="24" y="270" fill="#A1A1A6">
          Deal cycle
        </text>
        <rect x="24" y="284" width="400" height="6" rx="3" fill="#F5F5F7" opacity="0.12" />
        <text x="432" y="290" fill="#A1A1A6">
          15 days
        </text>
        <rect x="24" y="302" width="53" height="6" rx="3" fill="var(--accent)">
          <animate attributeName="width" values="0;0;53;53" keyTimes="0;0.62;0.72;1" {...loop} />
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.62;0.63;0.94;1" {...loop} />
        </rect>
        <text x="85" y="308" fill="#F5F5F7" fontWeight="600">
          2 days
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.71;0.74;0.94;1" {...loop} />
        </text>
        <text x={W - 12} y="24" textAnchor="end" fill="#A1A1A6">
          illustrative
        </text>
      </g>
    </svg>
  </div>
);
