"use client";

import { motion, useReducedMotion } from "motion/react";

type Tag = "div" | "h2" | "p" | "li" | "section";

const tags = {
  div: motion.div,
  h2: motion.h2,
  p: motion.p,
  li: motion.li,
  section: motion.section,
} as const;

type Props = {
  as?: Tag;
  delay?: number;
  y?: number;
  amount?: number;
  className?: string;
  children: React.ReactNode;
};

/** Scroll-reveal wrapper: content rises and fades in once when it enters the viewport. */
export function Reveal({
  as = "div",
  delay = 0,
  y = 28,
  amount = 0.3,
  className,
  children,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = tags[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
