/**
 * Sizes to use in TS
 */

export const base = {
  _: 16,
  xxs: 0.625,
  xs: 0.78125,
  s: 1,
  m: 1.25,
  l: 1.5625,
  xl: 1.96875,
  xxl: 2.5,
};

export const sizes = {
  xxs: `${base._ * base.xxs}pt`, // 10pt
  xs: `${base._ * base.xs}pt`, // 12.5pt
  s: `${base._ * base.s}pt`, // 16pt
  m: `${base._ * base.m}pt`, // 20pt
  l: `${base._ * base.l}pt`, // 25pt
  xl: `${base._ * base.xl}pt`, // 31.25pt
  xxl: `${base._ * base.xxl}pt`, // 40pt
};

export const globals = {
  outerPadding: sizes.xl,
};
