"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { services } from "@/lib/content";
import { Button } from "./ui/Button";

const COUNT = services.length;

const crop: Record<string, { wide: string; tight: string }> = {
  esthetic: { wide: "70% 48%", tight: "84% 44%" },
  restorative: { wide: "center 32%", tight: "34% 24%" },
  preventive: { wide: "46% 44%", tight: "40% 40%" },
  beyond: { wide: "62% 38%", tight: "72% 42%" },
};

type Service = (typeof services)[number];

/** Enter, lock, end of dwell, leave. Strictly increasing. */
function planeStops(index: number): [number, number, number, number] {
  const span = 1 / COUNT;
  const start = index * span;
  const end = start + span;
  const pre = index === 0 ? 0 : start - span * 0.34;
  const settled = index === 0 ? 0.012 : start;
  const leave = index === COUNT - 1 ? 0.988 : end;
  const post = index === COUNT - 1 ? 1 : Math.min(0.997, end + span * 0.24);
  return [pre, settled, leave, post];
}

function copyStops(index: number): [number, number, number, number] {
  const span = 1 / COUNT;
  const start = index * span;
  const end = start + span;
  if (index === 0) return [0, 0.02, end - span * 0.12, end + span * 0.08];
  if (index === COUNT - 1) return [start - span * 0.08, start + span * 0.1, 0.992, 1];
  return [start - span * 0.08, start + span * 0.1, end - span * 0.12, end + span * 0.08];
}

function fade(index: number): [number, number, number, number] {
  if (index === 0) return [1, 1, 1, 0];
  if (index === COUNT - 1) return [0, 1, 1, 1];
  return [0, 1, 1, 0];
}

/**
 * Pinned stage. Scrolling switches the service by itself.
 * The wide frame drifts upward. A closer crop drifts down and sideways,
 * out from behind the text column, so the two planes separate.
 */
export function Services() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    const next = Math.min(COUNT - 1, Math.floor(Math.min(value, 0.999) * COUNT));
    setActive((current) => (current === next ? current : next));
  });

  const scrollToIndex = (index: number) => {
    if (reduce) {
      setActive(index);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const start = window.scrollY + el.getBoundingClientRect().top;
    const travel = el.offsetHeight - window.innerHeight;
    const span = 1 / COUNT;
    const top = start + travel * (index * span + span * 0.14);
    if (lenis) lenis.scrollTo(top, { duration: 1.05 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      ref={rootRef}
      className={
        reduce
          ? "bg-ink text-text-light"
          : "h-[300vh] bg-ink text-text-light md:h-[440vh]"
      }
    >
      <h2 className="sr-only">Направления</h2>
      <div className="sticky top-0 flex h-app flex-col md:grid md:grid-cols-12">
        <div className="relative h-[40vh] min-h-[240px] md:col-span-7 md:h-full">
          <div className="absolute inset-0 overflow-hidden">
            {services.map((service, index) => (
              <ServicePlane
                key={service.id}
                index={index}
                service={service}
                progress={scrollYProgress}
                reduce={!!reduce}
                active={active}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-ink via-ink/25 to-transparent" />
          </div>

          {services.map((service, index) => (
            <ServiceTitle
              key={service.id}
              index={index}
              service={service}
              progress={scrollYProgress}
              reduce={!!reduce}
              active={active}
            />
          ))}

          {services.map((service, index) => (
            <DetailPlate
              key={service.id}
              index={index}
              service={service}
              progress={scrollYProgress}
              reduce={!!reduce}
            />
          ))}
        </div>

        <div className="relative z-20 flex min-h-0 flex-1 flex-col justify-between bg-ink px-5 pt-5 pb-6 md:col-span-5 md:px-12 md:pt-24 md:pb-8 lg:px-16">
          <ul>
            {services.map((service, index) => (
              <NameButton
                key={service.id}
                index={index}
                service={service}
                open={index === active}
                progress={scrollYProgress}
                reduce={!!reduce}
                onPick={() => scrollToIndex(index)}
              />
            ))}
          </ul>

          <div>
            <div className="relative min-h-[6.5rem] md:min-h-[19rem]">
              {services.map((service, index) => (
                <ServiceCopy
                  key={service.id}
                  index={index}
                  service={service}
                  progress={scrollYProgress}
                  reduce={!!reduce}
                  open={index === active}
                />
              ))}
            </div>
            <Button variant="light" href="#contact" className="mt-6 md:mt-8">
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicePlane({
  index,
  service,
  progress,
  reduce,
  active,
}: {
  index: number;
  service: Service;
  progress: MotionValue<number>;
  reduce: boolean;
  active: number;
}) {
  const [pre, settled, leave, post] = planeStops(index);
  const fadeIn = index === 0 ? settled : pre + (settled - pre) * 0.38;
  const y = useTransform(
    progress,
    [pre, settled, leave, post],
    index === 0 ? ["0%", "0%", "-9%", "-14%"] : ["11%", "0%", "-9%", "-14%"],
  );
  const scale = useTransform(progress, [pre, settled, leave, post], [1.06, 1.03, 1, 1]);
  const opacity = useTransform(progress, [pre, fadeIn, leave, post], fade(index));

  return (
    <motion.img
      src={service.image}
      alt=""
      style={
        reduce
          ? { opacity: index === active ? 1 : 0, objectPosition: crop[service.id].wide }
          : { y, scale, opacity, objectPosition: crop[service.id].wide, zIndex: index + 1 }
      }
      className="absolute top-[-30%] left-0 h-[160%] w-full max-w-none object-cover"
    />
  );
}

function DetailPlate({
  index,
  service,
  progress,
  reduce,
}: {
  index: number;
  service: Service;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const [pre, settled, leave, post] = planeStops(index);
  const span = 1 / COUNT;
  const plateIn = Math.min(leave - 0.04, settled + 0.028);
  const fadeOut = Math.max(plateIn + 0.04, leave - span * 0.16);
  const fadeEnd = index === COUNT - 1 ? post : leave;
  const y = useTransform(
    progress,
    [pre, settled, leave, post],
    index === 0 ? ["0%", "0%", "14%", "20%"] : ["-6%", "0%", "14%", "20%"],
  );
  const x = useTransform(
    progress,
    [pre, settled, leave, post],
    index === 0 ? ["0%", "0%", "-12%", "-18%"] : ["8%", "0%", "-12%", "-18%"],
  );
  const opacity = useTransform(
    progress,
    [settled, plateIn, fadeOut, fadeEnd],
    index === 0 ? [1, 1, 1, 0] : index === COUNT - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const innerY = useTransform(progress, [settled, leave], ["0%", "-14%"]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ y, x, opacity, zIndex: 12 + index }}
      className="pointer-events-none absolute top-[13%] right-[-7%] hidden aspect-[4/5] w-[38%] overflow-hidden shadow-[0_28px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/20 md:block"
    >
      <motion.img
        src={service.image}
        alt=""
        style={{ y: innerY, objectPosition: crop[service.id].tight }}
        className="absolute top-[-18%] left-0 h-[136%] w-full max-w-none object-cover"
      />
    </motion.div>
  );
}

function ServiceTitle({
  index,
  service,
  progress,
  reduce,
  active,
}: {
  index: number;
  service: Service;
  progress: MotionValue<number>;
  reduce: boolean;
  active: number;
}) {
  const stops = copyStops(index);
  const opacity = useTransform(progress, stops, fade(index));
  const y = useTransform(progress, stops, [22, 0, -32, -56]);

  return (
    <motion.p
      aria-hidden
      style={reduce ? { opacity: index === active ? 1 : 0 } : { opacity, y }}
      className="display pointer-events-none absolute bottom-5 left-5 z-[16] text-[42px] leading-[0.92] md:bottom-12 md:left-8 md:text-[76px]"
    >
      {service.title}
      <br />
      <em>{service.titleAccent}</em>
    </motion.p>
  );
}

function ServiceCopy({
  index,
  service,
  progress,
  reduce,
  open,
}: {
  index: number;
  service: Service;
  progress: MotionValue<number>;
  reduce: boolean;
  open: boolean;
}) {
  const stops = copyStops(index);
  const opacity = useTransform(progress, stops, fade(index));
  const y = useTransform(progress, stops, [16, 0, 0, -12]);

  return (
    <motion.div
      aria-hidden={!open}
      style={reduce ? { opacity: open ? 1 : 0 } : { opacity, y }}
      className={`absolute inset-x-0 top-0 ${open ? "z-10" : "pointer-events-none z-0"}`}
    >
      <p className="max-w-[38ch] text-[16px] leading-relaxed text-white/75 md:text-[18px]">
        {service.description}
      </p>
      <ul className="mt-4 hidden border-t hairline-light text-[15px] md:mt-6 md:block">
        {service.items.map((item) => (
          <li key={item} className="border-b hairline-light">
            <a
              href="#contact"
              className="group flex items-center justify-between gap-4 py-2.5 text-white/80 transition-colors hover:text-white md:py-3"
            >
              {item}
              <ArrowUpRight
                size={16}
                className="shrink-0 opacity-50 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function NameButton({
  index,
  service,
  open,
  progress,
  reduce,
  onPick,
}: {
  index: number;
  service: Service;
  open: boolean;
  progress: MotionValue<number>;
  reduce: boolean;
  onPick: () => void;
}) {
  const fill = useTransform(progress, (value) => {
    const scaled = Math.min(value, 0.999) * COUNT;
    const current = Math.floor(scaled);
    if (current !== index) return 0;
    return scaled - current;
  });

  return (
    <li className="border-b hairline-light">
      <button
        type="button"
        onClick={onPick}
        aria-pressed={open}
        className={`relative w-full py-2.5 text-left text-[15px] transition-colors duration-300 md:py-3 md:text-[17px] ${
          open ? "text-white" : "text-white/40 hover:text-white/75"
        }`}
      >
        <span className="mr-3 inline-block w-5 text-[13px] text-white/35">0{index + 1}</span>
        {service.title} {service.titleAccent}
        {!reduce && (
          <motion.span
            aria-hidden
            style={{ scaleX: fill }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-white"
          />
        )}
      </button>
    </li>
  );
}
