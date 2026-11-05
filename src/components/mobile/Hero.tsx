"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Negative / positive mobile hero.
 * Ink above, stone below. Type + mark use mix-blend-difference like the header.
 * Sticky stage is 100svh so Safari chrome does not resize / jerk the frame.
 * Headline is pinned to the bottom safe area (italiano pattern).
 */

const EASE = [0.76, 0, 0.24, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const seam = useTransform(scrollYProgress, [0, 0.75], [52, 108]);
  const darkClip = useTransform(seam, (value) => {
    const bottom = Math.max(0, 100 - value);
    return `inset(0px 0px ${bottom}% 0px)`;
  });
  const seamTop = useTransform(seam, (value) => `${value}%`);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[160vh] bg-stone"
      aria-label="Скульпт Клиник"
    >
      {/* svh: stable height while Safari shows/hides its bars */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-stone" />
        <motion.div
          className="absolute inset-0 bg-ink"
          style={{ clipPath: reduce ? "inset(0 0 48% 0)" : darkClip }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-20 h-px bg-white mix-blend-difference"
          style={{ top: reduce ? "52%" : seamTop }}
        />

        {/* One layer, same invert trick as the header */}
        <div className="absolute inset-0 z-10 text-white mix-blend-difference">
          <motion.img
            src="/logo.svg"
            alt="Sculpt Clinic"
            className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+5.5rem)] w-[34vw] min-w-[96px] max-w-[140px] -translate-x-1/2 brightness-0 invert"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          />

          <motion.p
            className="display absolute inset-x-5 bottom-[max(0.35rem,env(safe-area-inset-bottom))] pb-[0.15em] text-center text-[13vw] leading-[0.92]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
          >
            Скульптура
            <br />
            вашей <em>улыбки</em>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
