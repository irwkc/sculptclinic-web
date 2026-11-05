"use client";

import { useRef, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Negative / positive mobile hero.
 * Horizontal seam: ink above, stone below. Type + mark invert across it.
 * On scroll the seam travels down and the dark half takes the frame.
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
  const markY = useTransform(scrollYProgress, [0, 0.6], [0, -28]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[165vh] bg-ink"
      aria-label="Скульпт Клиник"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 bg-stone" />

        <motion.div
          className="absolute inset-0 bg-ink"
          style={{ clipPath: reduce ? "inset(0 0 48% 0)" : darkClip }}
        />

        <motion.div
          className="absolute inset-0 z-10"
          style={reduce ? undefined : { y: markY }}
        >
          <HeroCopy tone="dark" opacity={reduce ? undefined : copyOpacity} />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20"
          style={
            reduce
              ? { clipPath: "inset(0 0 48% 0)" }
              : { clipPath: darkClip, y: markY }
          }
        >
          <HeroCopy tone="light" opacity={reduce ? undefined : copyOpacity} />
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-30 h-px bg-white mix-blend-difference"
          style={{ top: reduce ? "52%" : seamTop }}
        />
      </div>
    </section>
  );
}

function HeroCopy({
  tone,
  opacity,
}: {
  tone: "light" | "dark";
  opacity?: MotionValue<number>;
}) {
  const light = tone === "light";

  return (
    <motion.div
      style={opacity ? { opacity } : undefined}
      className={`flex h-full flex-col items-center justify-center px-6 pt-[env(safe-area-inset-top)] pb-[max(1.5rem,env(safe-area-inset-bottom))] ${
        light ? "text-text-light" : "text-text-dark"
      }`}
    >
      <motion.img
        src="/logo.svg"
        alt={light ? "" : "Sculpt Clinic"}
        aria-hidden={light}
        className={`w-[34vw] min-w-[96px] max-w-[140px] ${
          light ? "brightness-0 invert" : "brightness-0"
        }`}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <motion.p
        className="display mt-10 text-center text-[13vw] leading-[0.92]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
        style={
          {
            // keep italic descenders clear
            paddingBottom: "0.15em",
          } satisfies CSSProperties
        }
      >
        Скульптура
        <br />
        вашей <em>улыбки</em>
      </motion.p>
    </motion.div>
  );
}
