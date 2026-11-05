"use client";

import { motion, useReducedMotion } from "motion/react";

/** Phone hero: one screen, native scroll, no pinned dual-tone stage. */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[100dvh] bg-ink text-text-light">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/img/hero.jpg"
          alt="Пациентка клиники с естественной улыбкой"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-[70%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/25" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(env(safe-area-inset-top)+5rem)]">
        <h1 className="display text-[15.5vw] leading-[0.92]">
          Скульптура
          <br />
          вашей <em>улыбки</em>
        </h1>
        <p className="mt-6 max-w-[28ch] text-[16px] leading-relaxed text-white/70">
          Улыбки, которые выглядят естественно и служат десятилетиями.
        </p>
      </div>
    </section>
  );
}
