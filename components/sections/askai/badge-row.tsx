import { A } from "./assets";

/**
 * Ask AI badge row — Figma "Pricing Container" (2029:4391 desktop).
 * `display:contents` group; children position against the heading column
 * (2029:4424, relative). All offsets are relative to the heading's left edge:
 * - pill: left 0, top -63 (39px tall)
 * - decor vector: left -146, top -42, w 384 (rotate-180)
 * - mark right (Inner Frame): left 88.5, top -55 (40x25)
 * - mark left (Inner Frame 1): left -36.5, top -55 (40x25, flipped)
 */
export function AskAiBadgeRow({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute top-[-63px] left-0 h-0 w-[384px]">
      {/* decorative vector line (rotated) */}
      <div className="absolute top-[21px] left-[-146px] h-0 w-[384px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.decorativeVector}
          className="h-0 w-[384px] max-w-none rotate-180"
        />
      </div>
      {/* mark right (Inner Frame) */}
      <div className="absolute top-[8px] left-[88.5px] h-[25px] w-[40px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.innerFrame}
          className="h-[25px] w-[40px]"
        />
      </div>
      {/* mark left (Inner Frame 1, flipped) */}
      <div className="absolute top-[8px] left-[-36.5px] h-[25px] w-[40px] -scale-y-100 rotate-180">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={A.innerFrame1}
          className="h-[25px] w-[40px]"
        />
      </div>
      {/* pill */}
      <div className="absolute top-0 left-0">
        <div className="flex h-[39px] items-center justify-center rounded-[100px] border border-[#3c3e3f] bg-[rgba(20,20,20,0.8)] px-[24px] py-[8px] backdrop-blur-[12px]">
          <p className="text-[15px] leading-[1.5] whitespace-nowrap text-[#a1a1aa]">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
