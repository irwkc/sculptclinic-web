"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./ui/Reveal";

/** Light editorial panel. The cutout portrait is the only image; type matches the rest of the site. */
export function Founder() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden bg-stone">
      <div className="mx-auto grid max-w-[1600px] items-end md:min-h-[100dvh] md:grid-cols-12">
        <div className="px-5 pb-4 pt-28 md:col-span-5 md:self-center md:px-8 md:py-36">
          <Reveal>
            <h2 className="display text-[64px] leading-[0.92] md:text-[108px]">
              Основатель
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-10 text-[20px] font-medium leading-snug">
              Огнева Анастасия Николаевна
            </p>
            <p className="mt-2 text-[15px] text-text-dark/55">
              Стоматолог-терапевт, эндодонтист
            </p>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-relaxed text-text-dark/70">
              Основала клинику в Рязани. Сохраняем свои зубы даже в сложных случаях.
              План и стоимость называем до начала работы.
            </p>
          </Reveal>
        </div>

        <div className="relative h-[78vh] md:col-span-7 md:h-auto md:min-h-[100dvh]">
          <motion.img
            src="/img/founder.png"
            alt="Огнева Анастасия Николаевна"
            className="absolute bottom-0 right-0 h-full w-auto max-w-full object-contain object-bottom md:right-8 md:h-[94%]"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </section>
  );
}
