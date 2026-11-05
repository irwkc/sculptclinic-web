"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Phone hero: wavy braces-arc cut.
 * Left = stone, right = ink. Logo + wire sit on the seam with mix-blend-difference.
 */
const WIRE =
  "M 100 0 C 62 4, 98 12, 74 20 C 48 28, 92 36, 58 44 C 28 52, 86 58, 52 66 C 22 74, 70 82, 38 88 C 16 93, 24 97, 0 100";

/** Fewer brackets, spaced along the wilder arc. */
const BRACKETS: { x: number; y: number; rot: number }[] = [
  { x: 82, y: 14, rot: -36 },
  { x: 66, y: 40, rot: -48 },
  { x: 48, y: 68, rot: -42 },
  { x: 26, y: 90, rot: -58 },
];

const EASE = [0.76, 0, 0.24, 1] as const;

/** Same curve in objectBoundingBox space (0..1) for the dark half clip. */
const DARK_CLIP =
  "M 1 0 C 0.62 0.04, 0.98 0.12, 0.74 0.2 C 0.48 0.28, 0.92 0.36, 0.58 0.44 C 0.28 0.52, 0.86 0.58, 0.52 0.66 C 0.22 0.74, 0.7 0.82, 0.38 0.88 C 0.16 0.93, 0.24 0.97, 0 1 L 1 1 Z";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden bg-stone"
      aria-label="Скульпт Клиник"
    >
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id="mobile-hero-dark" clipPathUnits="objectBoundingBox">
            <path d={DARK_CLIP} />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        aria-hidden
        className="absolute inset-0 bg-ink"
        style={{ clipPath: "url(#mobile-hero-dark)" }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      <div className="pointer-events-none absolute inset-0 z-10 mix-blend-difference">
        <svg
          className="h-full w-full text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={WIRE}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.45}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.25, ease: EASE, delay: 0.12 }}
          />

          {BRACKETS.map((b, i) => (
            <motion.g
              key={`${b.x}-${b.y}`}
              transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}
              initial={reduce ? false : { opacity: 0, scale: 0.35 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: EASE,
                delay: 0.45 + i * 0.08,
              }}
            >
              <path
                fill="currentColor"
                d="M -1.2 -1.45 h 2.4 v 0.7 h -0.55 v 1.5 h 0.55 v 0.7 h -2.4 v -0.7 h 0.55 v -1.5 h -0.55 z"
              />
              <rect x={-1.5} y={-0.28} width={3} height={0.56} rx={0.1} fill="currentColor" />
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="absolute inset-0 z-20 grid place-items-center mix-blend-difference">
        <motion.img
          src="/logo.svg"
          alt="Sculpt Clinic"
          className="size-[24vw] min-h-20 min-w-20 max-h-32 max-w-32 brightness-0 invert"
          initial={reduce ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        />
      </div>

      <h1 className="sr-only">Скульптура вашей улыбки</h1>
    </section>
  );
}
