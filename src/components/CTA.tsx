"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Closing poster: silhouette photo with parallax, headline scattered across the frame. */
export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative h-[110vh] overflow-hidden bg-stone-2">
      <motion.img
        src="/img/cta.jpg"
        alt=""
        loading="lazy"
        style={{ y: reduce ? 0 : imgY }}
        className="absolute inset-0 h-[116%] w-full object-cover object-center opacity-90 mix-blend-multiply"
      />
      <motion.div
        style={{ y: reduce ? 0 : textY }}
        className="display absolute inset-x-0 top-[38%] px-5 text-[15vw] leading-[0.9] md:px-8 md:text-[8.4vw]"
      >
        <span className="block text-text-dark md:pl-[2vw]">
          Воплощаем вашу
        </span>
        <span className="block text-text-light md:pl-[28vw]">
          <em>идеальную</em> улыбку
        </span>
      </motion.div>
      {/* curved lead-in to the dark footer */}
      <div className="absolute -bottom-[42vw] left-1/2 h-[60vw] w-[160vw] -translate-x-1/2 rounded-[50%] bg-ink md:-bottom-[32vw] md:h-[40vw] md:w-[140vw]" />
    </section>
  );
}
