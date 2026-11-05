"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { services } from "@/lib/content";

const crop: Record<string, string> = {
  esthetic: "70% 48%",
  restorative: "center 32%",
  preventive: "46% 44%",
  beyond: "62% 38%",
};

/** Phone services: tap to switch. No pin, no Lenis, no Записаться. */
export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  return (
    <section id="services" className="bg-ink text-text-light">
      <div className="relative h-[52vh] min-h-[280px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.image}
            alt=""
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ objectPosition: crop[current.id] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.h2
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="display absolute bottom-5 left-5 right-5 text-[40px] leading-[0.92]"
          >
            {current.title}
            <br />
            <em>{current.titleAccent}</em>
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
        <ul>
          {services.map((service, index) => {
            const open = index === active;
            return (
              <li key={service.id} className="border-b hairline-light">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={open}
                  className={`w-full py-3.5 text-left text-[16px] transition-colors ${
                    open ? "text-white" : "text-white/40"
                  }`}
                >
                  <span className="mr-3 inline-block w-5 text-[13px] text-white/35">
                    0{index + 1}
                  </span>
                  {service.title} {service.titleAccent}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-[38ch] text-[16px] leading-relaxed text-white/75">
          {current.description}
        </p>
        <ul className="mt-5 border-t hairline-light text-[15px]">
          {current.items.map((item) => (
            <li key={item} className="border-b hairline-light">
              <a
                href="#contact"
                className="flex items-center justify-between gap-4 py-3 text-white/80"
              >
                {item}
                <ArrowUpRight size={16} className="shrink-0 opacity-50" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
