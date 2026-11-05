"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Smile garland hero.
 * Wavy braces arc splits stone / ink. Brackets hold tooth ornaments on threads.
 */

const EASE = [0.76, 0, 0.24, 1] as const;

/** viewBox 390×844 — phone portrait, so ornaments are not stretched. */
const VB = { w: 390, h: 844 };

const WIRE =
  "M 390 0 C 242 34, 382 95, 288 168 C 186 248, 358 318, 224 402 C 108 478, 330 552, 188 648 C 92 714, 128 780, 0 844";

const DARK_CLIP =
  "M 1 0 C 0.62 0.04, 0.979 0.113, 0.738 0.199 C 0.477 0.294, 0.918 0.377, 0.574 0.476 C 0.277 0.566, 0.846 0.654, 0.482 0.768 C 0.236 0.846, 0.328 0.924, 0 1 L 1 1 Z";

type Ornament = {
  x: number;
  y: number;
  rot: number;
  thread: number;
  scale: number;
  kind: "incisor" | "canine" | "molar";
  sway: number;
  duration: number;
};

const ORNAMENTS: Ornament[] = [
  { x: 318, y: 118, rot: -34, thread: 52, scale: 0.92, kind: "incisor", sway: 7, duration: 3.4 },
  { x: 262, y: 268, rot: -46, thread: 64, scale: 1.05, kind: "molar", sway: 9, duration: 4.1 },
  { x: 214, y: 430, rot: -40, thread: 48, scale: 0.88, kind: "canine", sway: 6, duration: 3.7 },
  { x: 156, y: 590, rot: -50, thread: 72, scale: 1.12, kind: "molar", sway: 10, duration: 4.6 },
  { x: 92, y: 730, rot: -56, thread: 44, scale: 0.8, kind: "incisor", sway: 8, duration: 3.2 },
];

function Bracket() {
  return (
    <g>
      <path
        fill="currentColor"
        d="M -9.5 -7.5 h 19 v 4.2 h -2.2 v 7.2 h 2.2 v 4.2 h -19 v -4.2 h 2.2 v -7.2 h -2.2 z"
      />
      {/* Slot through the lock */}
      <rect x={-8.8} y={-1.8} width={17.6} height={3.6} rx={0.8} fill="currentColor" />
      <rect x={-5.5} y={-5.2} width={11} height={10.4} rx={1} fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.55} />
    </g>
  );
}

function Tooth({ kind }: { kind: Ornament["kind"] }) {
  if (kind === "molar") {
    return (
      <path
        fill="currentColor"
        d="M -9 -2 C -9 -10, -5 -14, 0 -14 C 5 -14, 9 -10, 9 -2 L 9 4 C 9 7, 7 9, 5 9 L 4 18 C 3.5 21, 1.5 22, 0 22 C -1.5 22, -3.5 21, -4 18 L -5 9 C -7 9, -9 7, -9 4 Z"
      />
    );
  }
  if (kind === "canine") {
    return (
      <path
        fill="currentColor"
        d="M -6.5 0 C -6.5 -9, -3 -14, 0 -16 C 3 -14, 6.5 -9, 6.5 0 L 6.5 5 C 6.5 7.5, 5 9, 3.2 9 L 2.2 20 C 1.8 22.5, 0.6 23.5, 0 23.5 C -0.6 23.5, -1.8 22.5, -2.2 20 L -3.2 9 C -5 9, -6.5 7.5, -6.5 5 Z"
      />
    );
  }
  return (
    <path
      fill="currentColor"
      d="M -5.5 -1 C -5.5 -9, -2.5 -13, 0 -13 C 2.5 -13, 5.5 -9, 5.5 -1 L 5.5 5 C 5.5 7, 4.2 8.5, 2.8 8.5 L 2 19 C 1.6 21.5, 0.5 22.5, 0 22.5 C -0.5 22.5, -1.6 21.5, -2 19 L -2.8 8.5 C -4.2 8.5, -5.5 7, -5.5 5 Z"
    />
  );
}

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
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <motion.path
            d={WIRE}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            pathLength={1}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
          />

          {ORNAMENTS.map((item, i) => (
            <motion.g
              key={`${item.x}-${item.y}`}
              transform={`translate(${item.x} ${item.y}) rotate(${item.rot})`}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.35 + i * 0.08 }}
            >
              <Bracket />

              <motion.g
                style={{ transformOrigin: "0px 8px" }}
                animate={
                  reduce
                    ? undefined
                    : { rotate: [-item.sway, item.sway, -item.sway] }
                }
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <line
                  x1={0}
                  y1={8}
                  x2={0}
                  y2={8 + item.thread}
                  stroke="currentColor"
                  strokeWidth={1.15}
                  strokeLinecap="round"
                  opacity={0.8}
                />
                <motion.g
                  transform={`translate(0 ${8 + item.thread}) scale(${item.scale})`}
                  initial={reduce ? false : { opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    ease: EASE,
                    delay: 0.65 + i * 0.1,
                  }}
                >
                  <Tooth kind={item.kind} />
                </motion.g>
              </motion.g>
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
