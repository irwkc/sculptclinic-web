"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { locations } from "@/lib/content";

/**
 * Pinned hero. On scroll the photo panel grows from the right half to full-bleed,
 * the headline (two-tone across the split) fades out and a second phrase glides through.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Where the light/dark split sits, in vw. 50 -> 0 as the photo takes over.
  const startSplit = narrow ? 0 : 50;
  const split = useTransform(scrollYProgress, [0, 0.5], [startSplit, 0]);
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
      <span className="block pl-[6vw] md:pl-[22vw]">Скульптура</span>
      <span className="block pl-[2vw] md:pl-[12vw]">
        вашей <em>улыбки</em>
      </span>
    </>
  );
  const headlineClass =
    "display absolute inset-x-0 top-[26vh] md:top-[30vh] text-[15.5vw] md:text-[9.2vw] leading-[0.92] pointer-events-none";

  return (
    <section id="top" ref={ref} className="relative h-[240vh] bg-stone">
      <div className="sticky top-0 h-app overflow-hidden">
        {/* photo panel */}
        <motion.div
          style={{ clipPath: reduce ? "inset(0 0 0 0%)" : panelClip }}
          className="absolute inset-0 bg-ink"
        >
          <motion.img
            src="/img/hero.jpg"
            alt="Пациентка клиники с естественной улыбкой"
            style={{ scale: reduce ? 1 : imgScale }}
            className="h-full w-full object-cover object-[70%_center] md:object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />
        </motion.div>

        {/* headline, dark layer (visible over light panel) */}
        <motion.h1
          aria-hidden={narrow}
          style={{
            clipPath: reduce ? "inset(0 50% 0 0)" : darkTextClip,
            opacity: h1Opacity,
            y: h1Y,
          }}
          className={`${headlineClass} text-text-dark`}
        >
          {headline}
        </motion.h1>
        {/* headline, light layer (visible over photo) */}
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

        {/* second phrase */}
        <motion.p
          style={{ opacity: reduce ? 0 : p2Opacity, x: p2X }}
          className="display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[13vw] text-text-light md:text-[8vw]"
        >
          Ваша улыбка. <em>Без компромиссов.</em>
        </motion.p>

        {/* bottom row */}
        <motion.div
          style={{ opacity: sideOpacity }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-8 md:pb-8"
        >
          <div className="hidden text-[13px] leading-snug md:block">
            <p className="text-text-dark/55">Мы находимся:</p>
            <ul className="mt-2 font-medium text-text-dark">
              {locations.map((l) => (
                <li key={l.id}>{l.name}</li>
              ))}
            </ul>
          </div>

          <p className="display max-w-[12ch] text-[30px] leading-[1.02] text-text-light md:absolute md:left-[52vw] md:bottom-8 md:text-[34px]">
            Улыбки, которые выглядят <em>естественно</em> и служат десятилетиями
          </p>

          <p className="hidden max-w-[22ch] text-right text-[13px] font-medium leading-snug text-text-light md:block">
            Наука и точность с рукой художника.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
