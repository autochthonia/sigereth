import { mapValues } from 'lodash';
import { transparentize } from 'polished';

import colors from './colors';

// SPACERS
export const standardSpacers = [0, 8, 12, 24, 36, 48, 72, 96, 168, 264, 360];

// GRID
export const breakpointDefaults = {
  colWidth: 72,
  gutter: 24,
};

const md = {
  // Represents where this breakpoint starts
  width: 768,
  // Container/max width at this breakpoint
  grid: 552,
  columns: 6,
  ...breakpointDefaults,
};

const lg = {
  width: 1024,
  grid: 744,
  columns: 8,
  ...breakpointDefaults,
};

const xl = {
  width: 1440,
  grid: 1128,
  columns: 12,
  ...breakpointDefaults,
};

const sm = {
  width: 0,
  grid: 375,
  columns: 6,
  // ...breakpointDefaults,
  colWidth: 54,
  gutter: 10,
};

const smOverride = {
  ...xl,
  width: 0,
};

export const breakpoints = {
  sm: smOverride,
  md,
  lg,
  xl,
};

export const breakpointsWithSmall = {
  sm,
  md,
  lg,
  xl,
};

export const mq = mapValues(breakpoints, ({ width }) => `@media (min-width: ${width}px)`);

const findNextBreakpoint = (width: 768 | 1024 | 1440 | 0) =>
  ({
    [sm.width]: md.width,
    [md.width]: lg.width,
    [lg.width]: xl.width,
    [xl.width]: 99999999,
  }[width]);

export const mqBetween = mapValues(
  breakpoints,
  ({ width }: { width: 768 | 1024 | 1440 | 0 }) =>
    `@media (min-width: ${width}px) and (max-width: ${findNextBreakpoint(width) - 1}px)`,
);

export const maxColumnsPerBreakpoint = mapValues(breakpoints, ({ columns }) => columns);

export const gridSizeByBreakpoint = mapValues(breakpoints, ({ grid }) => grid);

export const gridSizeByBreakpointWithSmall = mapValues(breakpointsWithSmall, ({ grid }) => grid);

// === VERTICAL BREAKPOINTS ===
const smv = {
  height: 600,
};
const mdv = {
  height: 900,
};
const lgv = {
  height: 1200,
};
const xlv = {
  height: 1500,
};

export const breakpointsVertical = {
  sm: smv,
  md: mdv,
  lg: lgv,
  xl: xlv,
};

// Vertical media queries
export const mqv = mapValues(breakpointsVertical, ({}, key) => {
  switch (key) {
    case 'sm':
      return `@media (min-height: 0px) and (max-height: ${smv.height}px)`;
    case 'md':
      return `@media (min-height: ${smv.height + 1}px) and (max-height: ${mdv.height}px)`;
    case 'lg':
      return `@media (min-height: ${mdv.height + 1}px) and (max-height: ${lgv.height}px)`;
    case 'xl':
    default:
      return `@media (min-height: ${lgv.height + 1}px)`;
  }
});

// === MISC ===

export const boxShadows = {
  one: `0 2px 4px 0 ${transparentize(0.9, colors.black)}`,
  two: `0 4px 8px 0 ${transparentize(0.6, colors.black)}`,
  onboarding: `0 24px 32px 0 ${transparentize(0.9, colors.black)}`,
};
