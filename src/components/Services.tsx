"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { services } from "@/lib/content";
import { Button } from "./ui/Button";

type Service = (typeof services)[number];

/**
 * Dark services section. Left column is sticky: founder portrait + the active category title.
 * Right column scrolls through four categories; the one in the middle of the viewport is active.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="relative bg-ink text-text-light">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
        {/* sticky visual */}
        <div className="relative md:sticky md:top-0 md:h-[100dvh]">
          <div className="relative h-[70vh] overflow-hidden md:h-full">
            <img
              src="/img/founder.jpg"
              alt="Основатель клиники"
              className="h-full w-full object-cover object-top grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-8 md:px-8 md:pb-10">
            <div className="hidden text-[13px] leading-relaxed md:block">
              <p className="text-white/50">Направления:</p>
              <ul className="mt-2">
                {services.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(`service-${s.id}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "center" })
                      }
                      className={`transition-colors duration-300 ${
                        i === active ? "text-white" : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {s.title} {s.titleAccent}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[2.1em] w-full overflow-visible text-[48px] md:absolute md:bottom-10 md:left-[60%] md:w-[70vw] md:text-[clamp(56px,6.2vw,110px)]">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="display absolute bottom-0 left-0 leading-[0.92]"
                >
                  {current.title}
                  <br />
                  <em>{current.titleAccent}</em>
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* scrolling categories */}
        <div className="px-5 pb-16 md:px-12 md:pb-32 lg:px-20">
          {services.map((s, i) => (
            <ServiceBlock key={s.id} service={s} index={i} onActive={setActive} />
          ))}
          <div className="mt-6 md:mt-10">
            <Button variant="light" href="#contact">
              Подобрать лечение
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({
  service,
  index,
  onActive,
}: {
  service: Service;
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const activate = useCallback(() => onActive(index), [onActive, index]);
  useEffect(() => {
    if (inView) activate();
  }, [inView, activate]);

  return (
    <div
      id={`service-${service.id}`}
      ref={ref}
      className={`flex flex-col justify-center py-16 md:min-h-[100dvh] md:py-24 ${
        index === 0 ? "" : "border-t hairline-light md:border-0"
      }`}
    >
      <h3 className="display mb-6 text-[40px] leading-[0.95] md:hidden">
        {service.title} <em>{service.titleAccent}</em>
      </h3>
      <p className="max-w-[40ch] text-[19px] font-medium leading-snug md:text-[22px]">
        {service.description}
      </p>
      <div className="mt-8 grid grid-cols-[112px_1fr] items-start gap-6 md:grid-cols-[160px_1fr] md:gap-10">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="aspect-[3/4] w-full object-cover"
        />
        <ul className="divide-y divide-white/12 border-y border-white/12 text-[15px]">
          {service.items.map((item) => (
            <li key={item}>
              <a
                href="#contact"
                className="group flex items-center justify-between gap-4 py-3 transition-colors hover:text-white"
              >
                <span className="text-white/85 group-hover:text-white">{item}</span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 opacity-60 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
