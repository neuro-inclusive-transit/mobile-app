/**
 * Motion Values
 *
 * @description
 * This file contains the motion values used in the application originally
 * created by the Carbon Design System team. The values are used in the
 * motion module to create animations.
 *
 * @see https://carbondesignsystem.com/guidelines/motion/overview/
 */

import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";

export const durations: Record<"fast" | "moderate" | "slow", Array<number>> = {
  fast: [
    70, // Micro-interactions such as button and toggle
    110, // Micro-interactions such as fade
  ],
  moderate: [
    150, // Micro-interactions, small expansion, short distance movements
    240, // Expansion, system communication, toast
  ],
  slow: [
    400, // Large expansion, important system notifications
    700, // Background dimming
  ],
};

export const easings: Record<
  "standard" | "entrance" | "exit",
  Record<"productive" | "expressive", CubicBezierAnimationCurve>
> = {
  standard: {
    productive: new CubicBezierAnimationCurve(0.2, 0, 0.38, 0.9),
    expressive: new CubicBezierAnimationCurve(0.4, 0.14, 0.3, 1),
  },
  entrance: {
    productive: new CubicBezierAnimationCurve(0, 0, 0.38, 0.9),
    expressive: new CubicBezierAnimationCurve(0, 0, 0.3, 1),
  },
  exit: {
    productive: new CubicBezierAnimationCurve(0.2, 0, 1, 0.9),
    expressive: new CubicBezierAnimationCurve(0.4, 0.14, 1, 1),
  },
};
