"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Phone hero: wavy braces-arc cut.
 * Left = stone, right = ink. Logo + wire sit on the seam with mix-blend-difference.
 */
const WIRE =
  "M 100 0 C 88 7, 82 11, 76 18 C 68 28, 64 34, 58 42 C 51 52, 47 58, 40 66 C 32 76, 26 82, 16 90 C 9 95, 4 98, 0 100";

const BRACKETS: { x: number; y: number; rot: number }[] = [
  { x: 86, y: 8, rot: -38 },
  { x: 74, y: 20, rot: -42 },
  { x: 64, y: 34, rot: -46 },
  { x: 53, y: 48, rot: -48 },
  { x: 43, y: 62, rot: -50 },
  { x: 31, y: 76, rot: -52 },
  { x: 18, y: 88, rot: -54 },
  { x: 8, y: 96, rot: -56 },
];

const EASE = [0.76, 0, 0.24, 1] as const;

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
            <path d="M 1 0 C 0.88 0.07, 0.82 0.11, 0.76 0.18 C 0.68 0.28, 0.64 0.34, 0.58 0.42 C 0.51 0.52, 0.47 0.58, 0.4 0.66 C 0.32 0.76, 0.26 0.82, 0.16 0.9 C 0.09 0.95, 0.04 0.98, 0 1 L 1 1 Z" />
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
            strokeWidth={0.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.12 }}
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
                delay: 0.4 + i * 0.055,
              }}
            >
              {/* Ortho bracket wing on the archwire */}
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
          src="/logo-mark.png"
          alt="Sculpt Clinic"
          className="size-[22vw] max-h-28 max-w-28 min-h-20 min-w-20"
          initial={reduce ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        />
      </div>

      <h1 className="sr-only">Скульптура вашей улыбки</h1>
    </section>
  );
}
