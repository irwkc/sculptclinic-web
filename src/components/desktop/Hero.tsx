"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { locations } from "@/lib/content";

/**
 * Desktop pinned hero. Photo grows from the right half; two-tone headline across the split.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const split = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const panelClip = useMotionTemplate`inset(0 0 0 ${split}%)`;
  const darkTextClip = useMotionTemplate`inset(0 calc(100% - ${split}%) 0 0)`;
  const lightTextClip = useMotionTemplate`inset(0 0 0 ${split}%)`;

  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.08, 1]);
  const h1Opacity = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  const h1Y = useTransform(scrollYProgress, [0.25, 0.5], [0, -40]);
  const p2Opacity = useTransform(scrollYProgress, [0.5, 0.65, 0.92, 1], [0, 1, 1, 0]);
  const p2X = useTransform(scrollYProgress, [0.5, 1], ["12vw", "-12vw"]);
  const sideOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);

  const headline = (
    <>
      <span className="block pl-[22vw]">Скульптура</span>
      <span className="block pl-[12vw]">
        вашей <em>улыбки</em>
      </span>
    </>
  );
  const headlineClass =
    "display absolute inset-x-0 top-[30vh] text-[9.2vw] leading-[0.92] pointer-events-none";

  return (
    <section id="top" ref={ref} className="relative h-[240vh] bg-stone">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div
          style={{ clipPath: reduce ? "inset(0 0 0 0%)" : panelClip }}
          className="absolute inset-0 bg-ink"
        >
          <motion.img
            src="/img/hero.jpg"
            alt="Пациентка клиники с естественной улыбкой"
            style={{ scale: reduce ? 1 : imgScale }}
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />
        </motion.div>

        <motion.h1
          style={{
            clipPath: reduce ? "inset(0 50% 0 0)" : darkTextClip,
            opacity: h1Opacity,
            y: h1Y,
          }}
          className={`${headlineClass} text-text-dark`}
        >
          {headline}
        </motion.h1>
        <motion.p
          aria-hidden
          style={{
            clipPath: reduce ? "inset(0 0 0 50%)" : lightTextClip,
            opacity: h1Opacity,
            y: h1Y,
          }}
          className={`${headlineClass} text-text-light`}
        >
          {headline}
        </motion.p>

        <motion.p
          style={{ opacity: reduce ? 0 : p2Opacity, x: p2X }}
          className="display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[8vw] text-text-light"
        >
          Ваша улыбка. <em>Без компромиссов.</em>
        </motion.p>

        <motion.div
          style={{ opacity: sideOpacity }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-8"
        >
          <div className="text-[13px] leading-snug">
            <p className="text-text-dark/55">Мы находимся:</p>
            <ul className="mt-2 font-medium text-text-dark">
              {locations.map((l) => (
                <li key={l.id}>{l.name}</li>
              ))}
            </ul>
          </div>

          <p className="display absolute bottom-8 left-[52vw] max-w-[12ch] text-[34px] leading-[1.02] text-text-light">
            Улыбки, которые выглядят <em>естественно</em> и служат десятилетиями
          </p>

          <p className="max-w-[22ch] text-right text-[13px] font-medium leading-snug text-text-light">
            Наука и точность с рукой художника.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
