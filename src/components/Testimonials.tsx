"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { testimonials } from "@/lib/content";

/** Light testimonials: category tabs on the left, one large quote at a time. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="bg-stone px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="text-[13px] text-text-dark/50">Отзывы</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-y-3">
            {testimonials.map((item, i) => (
              <li key={item.tag}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`text-[15px] transition-colors duration-300 ${
                    i === index ? "text-text-dark" : "text-text-dark/40 hover:text-text-dark/70"
                  }`}
                >
                  {item.tag}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-9 lg:col-span-8 lg:col-start-5">
          <div className="relative min-h-[240px] md:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="display text-[30px] leading-[1.12] md:text-[46px]">
                  «{t.quote}»
                </blockquote>
                <figcaption className="mt-8 text-[15px]">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-text-dark/50">, {t.detail}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущий отзыв"
              className="grid size-12 place-items-center rounded-full border hairline-dark transition-colors hover:bg-ink hover:text-text-light"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующий отзыв"
              className="grid size-12 place-items-center rounded-full border hairline-dark transition-colors hover:bg-ink hover:text-text-light"
            >
              <ArrowRight size={18} />
            </button>
            <span className="ml-4 text-[13px] text-text-dark/50">
              {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
