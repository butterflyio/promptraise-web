/**
 * Ask AI section — Figma asset map (desktop 2046:9001 / tablet 2050:4403 / mobile 2054:9681).
 * Downloaded 2026-08-11 from the ctx asset URLs (see skill: promptraise-web).
 */

export const A = {
  mainImage: "/figma/askai-2ca1f7a6-1219-4239-b675-74697bf81f2a.png",
  mainImage1: "/figma/askai-4af84755-8518-495e-8bda-ca0b81144ccd.png",
  noise: "/figma/askai-00627366-72ce-4198-b04f-9f23bebbd09c.png",
  mask05: "/figma/askai-25f5967e-fa61-46ad-8609-e58116c0d22a.svg",
  vector7: "/figma/askai-246001c1-52d0-4a35-8f38-e2a73a7d5bf7.svg",
  vector35: "/figma/askai-915843ef-fe37-4b86-bda1-f52c9a7b1aa3.svg",
  vector36: "/figma/askai-0cf4e77e-b5d7-495c-8734-5ec231f8c05b.svg",
  vector03: "/figma/askai-24c558de-0977-474a-b174-e9ab9969f86a.svg",
  vector02: "/figma/askai-9262e939-55a4-4be2-bd3d-16e38ee00e41.svg",
  vector34: "/figma/askai-60a81716-24a1-4352-b144-ac19d5bc25a9.svg",
  ellipse2599: "/figma/askai-ab1ad1ea-9a2b-4b4c-ac9d-21b1a18b4b39.svg",
  ellipse2600: "/figma/askai-0af82355-e633-4385-934f-151c36ca49b8.svg",
  ellipse336: "/figma/askai-f11de296-0cea-4f6a-b88d-e6f435496caa.svg",
  rect6111: "/figma/askai-2494de45-1708-4c41-b060-e7a247a7ea3b.svg",
  containerWithStars: "/figma/askai-0ca25875-62d1-496e-a2d7-e5df9cb0ce2c.svg",
  vectorP: "/figma/askai-390cf202-2730-46f2-a34b-513c74a3ed76.svg",
  claude1: "/figma/askai-7709790c-388e-4465-ad7e-1729cbbedf90.svg",
  chatgpt1: "/figma/askai-c30cd28f-206e-4643-a789-6811f0b77d05.svg",
  rect6113: "/figma/askai-8c618f0b-7add-4c4f-9491-5911d4498603.svg",
  columnContainer: "/figma/askai-31d778cb-060a-48c4-b2af-f38d01bd37d3.svg",
  union: "/figma/askai-fcda14da-7dfb-45b7-b4d9-324aca428792.svg",
  rect6112: "/figma/askai-f04cea1f-2e7d-4832-abb3-943a3bf84423.svg",
  bg05Bright: "/figma/askai-bg05-bright.png",
  bg05Dim: "/figma/askai-bg05-dim.png",
  mbg05Bright: "/figma/askai-mbg05-bright.png",
  mbg05Dim: "/figma/askai-mbg05-dim.png",
  decorativeVector: "/figma/askai-675548d9-5c9c-4a9b-9e44-e77a55fcc5f5.svg",
  innerFrame: "/figma/askai-cc7ad175-778a-4ce5-950c-4939445d3fa1.svg",
  innerFrame1: "/figma/askai-fecfaf21-4a1b-40bf-a6d7-b1efbd27878d.svg",
  chatgpt2: "/figma/askai-da76e9a6-4b33-4f5e-8a69-a4abf0215daa.svg",
  claude2: "/figma/askai-eedd4525-9e90-49ba-ac6c-1f050c041f1f.svg",
  vectorP2: "/figma/askai-517a7666-6d0e-4347-9807-74e3f821f682.svg",
} as const;

/** Shared mask-style helper (mirrors the Figma `mask-alpha mask-intersect mask-no-clip
 * mask-no-repeat mask-position-* mask-size-*` set) for the "05" mask. */
export function mask05(
  position: string,
  size: string,
  repeat = "no-repeat",
): React.CSSProperties {
  return {
    maskImage: `url(${A.mask05})`,
    WebkitMaskImage: `url(${A.mask05})`,
    maskRepeat: repeat,
    WebkitMaskRepeat: repeat,
    maskPosition: position,
    WebkitMaskPosition: position,
    maskSize: size,
    WebkitMaskSize: size,
  } as React.CSSProperties;
}
