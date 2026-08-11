import { A } from "./assets";

/**
 * Terminal art — the binary column + glass cards + LLM logos panel from the
 * Ask AI desktop BG (2046:8884 lighten copy, 2047:9111 opacity-12 copy).
 * Transcribed from ctx_2046-9001.txt (desktop), scaled for tablet/mobile.
 */

const BINARY_ROWS: Array<Array<[string, number]>> = [
  [
    ["01000010", 0.3],
    ["01000010", 1],
    ["010000", 0.5],
  ],
  [
    ["010010", 0.44],
    ["01000010", 0.2],
    ["010000", 0.5],
  ],
  [
    ["01000010", 1],
    ["01000010", 0.3],
    ["010000", 0.5],
  ],
  [
    ["01000010", 0.3],
    ["01000010", 1],
    ["010000", 0.5],
  ],
  [
    ["01101000", 1],
    ["01000010", 0.3],
    ["010000", 0.5],
  ],
  [
    ["01000", 0.3],
    ["01000010", 1],
    ["010000", 0.5],
  ],
];

function BinaryText({ fontSize }: { fontSize: number }) {
  return (
    <div
      className="absolute flex flex-col items-start text-center whitespace-nowrap text-white not-italic mix-blend-overlay"
      style={{
        fontFamily: "IBM Plex Mono, monospace",
        fontWeight: 500,
        fontSize,
        lineHeight: 1.2,
        letterSpacing: "0.02em",
        opacity: 0.8,
        left: "4.8%",
        top: "8.5%",
        gap: fontSize * 0.3,
      }}
    >
      {BINARY_ROWS.map((row, i) => (
        <div
          key={i}
          className="flex w-full items-center gap-[0.2em] whitespace-nowrap"
        >
          {row.map(([txt, op], j) => (
            <span key={j} style={{ opacity: op }} className="shrink-0">
              {txt}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

interface TerminalPanelProps {
  /** Width of the whole terminal column (design px). */
  w: number;
  /** Whether this is the dim (opacity-12) duplicate. */
  dim?: boolean;
}

/** The two stacked glass cards with LLM logos + the gradient binary panel. */
export function TerminalPanel({ w, dim = false }: TerminalPanelProps) {
  const s = w / 543.601; // scale factor relative to desktop
  const opacity = dim ? 0.12 : 1;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        width: 543.601 * s,
        height: 449.751 * s,
        opacity,
        mixBlendMode: dim ? undefined : "lighten",
      }}
    >
      {/* glass card top-right: ChatGPT */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: (757.94 - 448.47) * s,
          top: (651.58 - 593) * s,
          width: 122.093 * s,
          height: 122.093 * s,
        }}
      >
        <div
          className="absolute rounded-[29.286px] border border-white/[0.04]"
          style={{
            width: 122.596 * s,
            height: 120.044 * s,
            background: "#222529",
            boxShadow: `inset 0 0 ${21.299 * s}px 0 rgba(255,255,255,0.2)`,
            transform: `rotate(-17.17deg)`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.chatgpt1}
          className="absolute object-contain"
          style={{
            width: 67.985 * s,
            height: 90.179 * s,
            transform: `rotate(-18.14deg)`,
            filter: `drop-shadow(0px ${-6.452 * s}px ${8.548 * s}px rgba(0,0,0,0.25))`,
          }}
        />
      </div>

      {/* glass card right: Claude */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: (839 - 448.47) * s,
          top: (655.05 - 593) * s,
          width: 129.537 * s,
          height: 131.193 * s,
        }}
      >
        <div
          className="absolute rounded-[29.286px] border border-white/[0.04]"
          style={{
            width: 126.287 * s,
            height: 127.987 * s,
            background: "#292d33",
            boxShadow: `0px ${-2.662 * s}px ${31.948 * s}px 0 rgba(0,0,0,0.3), inset 0 0 ${21.299 * s}px 0 rgba(255,255,255,0.2)`,
            transform: `rotate(-1.47deg)`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.claude1}
          className="absolute object-contain"
          style={{
            width: 68.376 * s,
            height: 68.376 * s,
            transform: `rotate(-1.38deg)`,
            filter: `drop-shadow(0px ${-4.558 * s}px ${6.04 * s}px rgba(0,0,0,0.25))`,
          }}
        />
      </div>

      {/* glass card rightmost: sparkle/vector */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: (764.54 - 448.47) * s,
          top: (668.22 - 593) * s,
          width: 163.075 * s,
          height: 158.139 * s,
        }}
      >
        <div
          className="absolute rounded-[29.286px] border border-white/[0.04]"
          style={{
            width: 128.619 * s,
            height: 120.044 * s,
            background: "#3c4147",
            boxShadow: `0px ${-2.662 * s}px ${31.948 * s}px 0 rgba(0,0,0,0.3), inset 0 0 ${21.299 * s}px 0 rgba(255,255,255,0.2)`,
            transform: `rotate(20.98deg)`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.vectorP}
          className="absolute object-contain"
          style={{
            width: 68.083 * s,
            height: 68.083 * s,
            transform: `rotate(22.38deg)`,
            filter: `drop-shadow(0px ${-4.539 * s}px ${6.014 * s}px rgba(0,0,0,0.25))`,
          }}
        />
      </div>

      {/* gradient binary panel */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: (462.38 - 448.47) * s,
          top: (726.59 - 593) * s,
          width: 510.241 * s,
          height: 302.249 * s,
        }}
      >
        <div
          className="absolute rounded-[37.858px]"
          style={{
            width: 497.857 * s,
            height: 279.545 * s,
            background:
              "linear-gradient(105.618deg, rgb(65,65,65) 21.939%, rgb(40,114,69) 50.78%)",
            boxShadow: insetBox(s),
            filter: `drop-shadow(0px ${10.649 * s}px ${5.325 * s}px rgba(0,0,0,0.25))`,
            transform: `rotate(2.65deg)`,
          }}
        />
        <BinaryText fontSize={26.623 * s} />
        {/* right side fade */}
        <div
          className="absolute"
          style={{
            width: 95.844 * s,
            height: 279.628 * s,
            left: (157.08 / 543.601) * 100 + "%",
            top: -0.08,
            background:
              "linear-gradient(to right, rgba(45,48,52,0), rgba(45,48,52,0.8))",
            transform: `rotate(2.65deg)`,
          }}
        />
      </div>
    </div>
  );
}

function insetBox(s: number) {
  return `inset 0 ${9.466 * s}px ${36.326 * s}px 0 #ffffff`;
}

/** The full Background art per breakpoint (masked image + noise + terminal). */
export function AskAiBackground({
  variant,
}: {
  variant: "desktop" | "tablet" | "mobile";
}) {
  if (variant === "desktop") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-clip">
        {/* masked main image */}
        <div className="absolute top-[158px] left-1/2 -translate-x-1/2">
          <div
            className="absolute"
            style={{
              width: 1440,
              height: 810,
              background: "#000f00",
              overflow: "clip",
              ...maskStyles(-180, -37, 1800, 884),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={A.mainImage}
              className="absolute max-w-none object-cover"
              style={{
                width: 1478.25,
                height: 985.5,
                left: "calc(50% + 0.38px)",
                top: "calc(50% + 87.75px)",
                transform: "translate(-50%, -50%)",
                opacity: 0.45,
              }}
            />
            <div className="absolute inset-0 bg-[#287245] mix-blend-hue" />
          </div>
        </div>

        {/* noise overlays */}
        <div
          className="absolute top-1/2 left-1/2 h-[1527px] w-[1441.5px] -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url(${A.noise})`,
            backgroundSize: "540px 337.5px",
          }}
        />

        {/* terminal panels - bright copy at Figma coords, dim copy below */}
        <div className="absolute top-[593px] left-[448.47px]">
          <TerminalPanel w={543.601} />
        </div>
        <div className="absolute top-[593px] left-[448.47px]">
          <TerminalPanel w={543.601} dim />
        </div>
      </div>
    );
  }
  if (variant === "tablet") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-clip">
        <div className="absolute top-[158px] left-1/2 -translate-x-1/2">
          <div
            className="absolute"
            style={{
              width: 1440,
              height: 810,
              background: "#000f00",
              overflow: "clip",
              ...maskStyles(-180, -37, 1800, 884),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={A.mainImage}
              className="absolute max-w-none object-cover"
              style={{
                width: 1478.25,
                height: 985.5,
                left: "calc(50% + 0.38px)",
                top: "calc(50% + 87.75px)",
                transform: "translate(-50%, -50%)",
                opacity: 0.45,
              }}
            />
            <div className="absolute inset-0 bg-[#287245] mix-blend-hue" />
          </div>
        </div>
        {/* tablet terminal column: left 112.47 / top 519, width 543.6 -> 368 scale */}
        <div className="absolute top-[519px] left-[112.47px]">
          <TerminalPanel w={369.196} dim />
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden className="absolute inset-0 overflow-clip">
      {/* mobile masked main image: mask -122.25 -25.13 / 1023.6 600.9 */}
      <div className="absolute top-[181px] left-1/2 -translate-x-1/2">
        <div
          className="absolute"
          style={{
            width: 392,
            height: 550.125,
            background: "#000f00",
            overflow: "clip",
            ...maskStyles(-122.25, -25.13, 1023.6, 600.9),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={A.mainImage1}
            className="absolute max-w-none object-cover"
            style={{
              width: 1003.5,
              height: 669,
              left: "calc(50% + 0.26px)",
              top: "calc(50% + 59.55px)",
              transform: "translate(-50%, -50%)",
              opacity: 0.45,
            }}
          />
          <div className="absolute inset-0 bg-[#287245] mix-blend-hue" />
        </div>
      </div>
      {/* mobile terminal column: left 11.58 / top 402.38, width 369.196 */}
      <div className="absolute top-[402.38px] left-[11.58px]">
        <TerminalPanel w={369.196} dim />
      </div>
    </div>
  );
}

function maskStyles(px: number, py: number, sx: number, sy: number) {
  return {
    maskImage: `url(${A.mask05})`,
    WebkitMaskImage: `url(${A.mask05})`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: `${px}px ${py}px`,
    WebkitMaskPosition: `${px}px ${py}px`,
    maskSize: `${sx}px ${sy}px`,
    WebkitMaskSize: `${sx}px ${sy}px`,
  } as const;
}
