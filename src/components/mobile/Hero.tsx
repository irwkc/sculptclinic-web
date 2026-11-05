"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Negative / positive mobile hero.
 * Ink curtain over stone. Type + mark share one mix-blend-difference layer (like the header).
 * Viewport height is frozen on mount so Safari chrome cannot resize the sticky stage mid-scroll.
 */

const EASE = [0.76, 0, 0.24, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [stageH, setStageH] = useState(0);

  useEffect(() => {
    const freeze = () => {
      // Freeze once — do not follow toolbar show/hide (that jerks sticky + seam).
      setStageH((prev) => prev || window.innerHeight);
    };
    freeze();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // GPU curtain: scale from top instead of rewriting clip-path every frame.
  const curtain = useTransform(scrollYProgress, [0, 0.75], [0.52, 1]);
  const seamTop = useTransform(scrollYProgress, [0, 0.75], ["52%", "100%"]);

  const stageStyle = stageH
    ? { height: stageH }
    : { height: "100svh" as const };
  const sectionStyle = stageH
    ? { height: Math.round(stageH * 1.6) }
    : { height: "160svh" as const };

  return (
    <section
      id="top"
      ref={ref}
      className="relative bg-stone"
      style={sectionStyle}
      aria-label="Скульпт Клиник"
    >
      <div className="sticky top-0 overflow-hidden" style={stageStyle}>
        <div className="absolute inset-0 bg-stone" />
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top bg-ink will-change-transform"
          style={{ scaleY: reduce ? 0.52 : curtain }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-20 h-px bg-white mix-blend-difference will-change-transform"
          style={{ top: reduce ? "52%" : seamTop }}
        />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-[env(safe-area-inset-top)] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-white mix-blend-difference">
          <motion.img
            src="/logo.svg"
            alt="Sculpt Clinic"
            className="w-[34vw] min-w-[96px] max-w-[140px] brightness-0 invert"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.p
            className="display mt-10 text-center text-[13vw] leading-[0.92]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
            style={{ paddingBottom: "0.15em" }}
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
