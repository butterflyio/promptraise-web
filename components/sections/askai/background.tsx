import { A } from "./assets";

/**
 * Ask AI background art — transcribed from Figma nodes:
 *  - desktop 2046:9000 (BG) -> masked image 2029:4357 (composite PNG),
 *    terminal columns 2046:8884 (bright) / 2047:9111 (dim), dim image 2046:9003
 *  - tablet 2050:4404 (BG) -> masked image 2050:4408, terminal 2050:4421/4490,
 *    dim image 2050:4560
 *  - mobile 2054:9682 (BG) -> masked image 2054:9686, terminal 2054:9699/9768,
 *    dim image 2054:9838
 *
 * All four layers live inside the `Mask group` (mix-blend-lighten) in DOM order:
 * bright masked image -> bright terminal -> dim terminal -> dim masked image.
 * The masked image area is rendered from Figma-exported composite PNGs so the
 * whole Image Container (`05` + vectors + ellipse glows + noise) is exact.
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

/** Second binary block inside the right-side mask group (2046:8927). */
const MASKED_BINARY_ROWS: Array<Array<string>> = [
  ["01000010", "01000010", "01000"],
  ["010010", "01000010", "0100001"],
  ["01000010", "01000010", "01000"],
  ["01000010", "01000010", "01000"],
  ["01101000", "01000010", "01000"],
  ["01000", "01000010", "0100010"],
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

/**
 * The terminal column (2046:8884 bright / 2047:9111 dim).
 * `w` is the column width in design px (543.601 desktop/tablet, 369.196 mobile);
 * positions below are relative to the column origin (448.47, 593 desktop).
 */
export function TerminalPanel({
  w,
  dim = false,
}: {
  w: number;
  dim?: boolean;
}) {
  const s = w / 543.601;
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
      {/* base frosted rounded rect (2046:8886 / rect6111) */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 0,
          top: 0,
          width: 524.48 * s,
          height: 425.974 * s,
          borderRadius: 37.864 * s,
          background: "rgba(30,30,30,0.62)",
          backdropFilter: `blur(${24.49 * s}px)`,
          WebkitBackdropFilter: `blur(${24.49 * s}px)`,
          transform: `rotate(2.65deg)`,
        }}
      />

      {/* container with stars (2046:8887) - small glass chip top-left */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: (503.98 - 448.47) * s,
          top: (632.64 - 593) * s,
          width: 81.302 * s,
          height: 74.161 * s,
        }}
      >
        <div
          className="absolute flex items-center justify-center"
          style={{ transform: `rotate(2.65deg)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            aria-hidden
            src={A.containerWithStars}
            className="block max-w-none"
            style={{ width: 78.123 * s, height: 70.627 * s }}
          />
        </div>
      </div>

      {/* glass card top-left: Perplexity/V icon (2046:8890 + 8891) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: (738.97 - 448.47) * s,
          top: (633.07 - 593) * s,
          width: 152.571 * s,
          height: 150.886 * s,
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
          src={A.vectorP}
          className="absolute object-contain"
          style={{
            width: 67.985 * s,
            height: 90.179 * s,
            transform: `rotate(-18.14deg)`,
            filter: `drop-shadow(0px ${-6.452 * s}px ${8.548 * s}px rgba(0,0,0,0.25))`,
          }}
        />
      </div>

      {/* glass card right: Claude (2046:8892 + 8893) */}
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

      {/* glass card rightmost: ChatGPT (2046:8894 + 8895) */}
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
          src={A.chatgpt1}
          className="absolute object-contain"
          style={{
            width: 68.083 * s,
            height: 68.083 * s,
            transform: `rotate(22.38deg)`,
            filter: `drop-shadow(0px ${-4.539 * s}px ${6.014 * s}px rgba(0,0,0,0.25))`,
          }}
        />
      </div>

      {/* gradient binary panel (2046:8896) */}
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
            boxShadow: `inset 0 ${9.466 * s}px ${36.326 * s}px 0 #ffffff`,
            filter: `drop-shadow(0px ${10.649 * s}px ${5.325 * s}px rgba(0,0,0,0.25))`,
            transform: `rotate(2.65deg)`,
          }}
        />
        <BinaryText fontSize={26.623 * s} />
        {/* right-side glass overlay (2046:8924 / rect6113) */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: (252.92 / 543.601) * 100 + "%",
            top: 0,
            width: (244.935 / 543.601) * 100 + "%",
            height: (279.545 / 543.601) * 100 + "%",
            background: "rgba(45,48,52,0.82)",
            backdropFilter: `blur(${24.49 * s}px)`,
            WebkitBackdropFilter: `blur(${24.49 * s}px)`,
            transform: `rotate(2.65deg)`,
          }}
        />
        {/* masked binary text (2046:8925/8927) */}
        <div
          className="absolute flex flex-col gap-[0.3em]"
          style={{
            left: (127.79 / 543.601) * 100 + "%",
            top: (23.96 / 543.601) * 100 + "%",
            width: (449.935 / 543.601) * 100 + "%",
            opacity: 0.1,
            color: "#d9d9d9",
            fontFamily: "IBM Plex Mono, monospace",
            fontWeight: 500,
            fontSize: 26.623 * s,
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            maskImage: `url(${A.columnContainer})`,
            WebkitMaskImage: `url(${A.columnContainer})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: `${123.905 * s}px ${-18.155 * s}px`,
            WebkitMaskPosition: `${123.905 * s}px ${-18.155 * s}px`,
            maskSize: `${255.907 * s}px ${288.882 * s}px`,
            WebkitMaskSize: `${255.907 * s}px ${288.882 * s}px`,
          }}
        >
          {MASKED_BINARY_ROWS.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-[0.2em] whitespace-nowrap"
            >
              {row.map((txt, j) => (
                <span key={j} className="shrink-0">
                  {txt}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* union (2046:8952) - green vertical bar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.union}
          className="absolute max-w-none"
          style={{
            left: (236.95 / 543.601) * 100 + "%",
            top: 0,
            width: (29.286 / 543.601) * 100 + "%",
            height: (279.545 / 543.601) * 100 + "%",
          }}
        />
      </div>

      {/* ellipse 336 (2046:8885) - tiny dot at column bottom-right */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: (823.08 - 448.47) * s,
          top: (984.36 - 593) * s,
          width: 3.511 * s,
          height: 0.162 * s,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.ellipse336}
          className="block max-w-none"
          style={{ width: 3.515 * s, transform: `rotate(2.65deg)` }}
        />
      </div>
    </div>
  );
}

/**
 * Breakpoint configs - the four `Mask group` layers in DOM order.
 * Image layer geometry (centered on the viewport via left-1/2 -translate-x-1/2):
 *   desktop/tablet: 1440x810 composite; desktop top 158, tablet top 84, mobile top 106.94
 * Terminal column origin: desktop (448.47, 593), tablet (112.47, 519), mobile (11.58, 402.38),
 * with width 543.601 (desktop/tablet) or 369.196 (mobile).
 */
const LAYOUT = {
  desktop: { top: 158, term: { x: 448.47, y: 593, w: 543.601 } },
  tablet: { top: 84, term: { x: 112.47, y: 519, w: 543.601 } },
  // Mobile BG (2054:9682) itself sits at top 181; children are relative to it.
  mobile: {
    top: 181 + 106.94,
    term: { x: 11.58, y: 181 + 402.38, w: 369.196 },
  },
} as const;

/** The full Background art per breakpoint. */
export function AskAiBackground({
  variant,
}: {
  variant: "desktop" | "tablet" | "mobile";
}) {
  const cfg = LAYOUT[variant];

  return (
    <div aria-hidden className="absolute inset-0 overflow-clip">
      {/* Mask group - all four layers, mix-blend-lighten */}
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "lighten" }}>
        {/* 1. bright masked image (`05`) */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: cfg.top, width: 1440, height: 810 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            aria-hidden
            src={A.bg05Bright}
            className="block max-w-none"
            style={{ width: 1440, height: 810 }}
          />
        </div>

        {/* 2. bright terminal (2046:8884 / 2050:4421 / 2054:9699) */}
        <div className="absolute" style={{ left: cfg.term.x, top: cfg.term.y }}>
          <TerminalPanel w={cfg.term.w} />
        </div>

        {/* 3. dim terminal (2047:9111 / 2050:4490 / 2054:9768) */}
        <div className="absolute" style={{ left: cfg.term.x, top: cfg.term.y }}>
          <TerminalPanel w={cfg.term.w} dim />
        </div>

        {/* 4. dim masked image (2046:9003 / 2050:4560 / 2054:9838) - plus-lighter 40% */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: cfg.top,
            width: 1440,
            height: 810,
            mixBlendMode: "plus-lighter",
            opacity: 0.4,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            aria-hidden
            src={A.bg05Dim}
            className="block max-w-none"
            style={{ width: 1440, height: 810 }}
          />
        </div>
      </div>
    </div>
  );
}
