"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { technologies } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

/** Light technology section: poster headline, then a hover-driven list with a swapping image. */
export function Technology() {
  const [active, setActive] = useState(0);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="technology" className="bg-stone px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal as="h2" className="display mx-auto max-w-[14ch] text-center text-[52px] leading-[0.95] md:text-[clamp(72px,8.6vw,150px)]">
          Технологии <em>для</em> предсказуемого результата
        </Reveal>

        <div className="mt-24 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
          {/* counter */}
          <div className="hidden md:col-span-2 md:block">
            <p className="display sticky top-28 text-[40px] leading-none">
              {pad(active + 1)}
              <span className="ml-2 font-sans text-[13px] text-text-dark/50">
                / {pad(technologies.length)}
              </span>
            </p>
          </div>

          {/* image */}
          <div className="md:col-span-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-2 md:sticky md:top-28 md:aspect-[3/4]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={technologies[active].image}
                  src={technologies[active].image}
                  alt={technologies[active].title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* list */}
          <div className="md:col-span-6 md:pl-8">
            <p className="text-[13px] text-text-dark/50">Оборудование</p>
            <ul className="mt-4 border-t hairline-dark">
              {technologies.map((t, i) => {
                const isActive = i === active;
                return (
                  <li key={t.title} className="border-b hairline-dark">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                    >
                      <span className="flex-1">
                        <span
                          className={`display block text-[30px] leading-[1.02] transition-colors duration-500 md:text-[44px] ${
                            isActive ? "text-text-dark" : "text-text-dark/40"
                          }`}
                        >
                          {t.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              key="text"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              className="block overflow-hidden"
                            >
                              <span className="block max-w-[46ch] pt-3 text-[15px] leading-relaxed text-text-dark/70">
                                {t.text}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className="pt-2 text-[13px] text-text-dark/50 md:hidden">
                        {pad(i + 1)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
