"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

const EASE = [0.76, 0, 0.24, 1] as const;

function jumpTo(target: HTMLElement, lenis: ReturnType<typeof useLenis> | null) {
  if (lenis) {
    lenis.scrollTo(target, { immediate: true, force: true });
    return;
  }
  const top = window.scrollY + target.getBoundingClientRect().top;
  window.scrollTo({ top, behavior: "auto" });
}

/**
 * Page-turn between sections. A hash link covers the screen, the view jumps
 * while it is covered, then the panel lifts away.
 * z-index: header 50, this curtain 80.
 * On phone there is no Lenis - jump with native scroll.
 */
export function PageTransition() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const targetRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = (event.target as Element | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const next = document.getElementById(href.slice(1));
      if (!next) return;
      event.preventDefault();
      if (reduce) {
        jumpTo(next, lenisRef.current);
        return;
      }
      targetRef.current = next;
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduce]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[80] grid place-items-center bg-ink"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: EASE }}
          onAnimationComplete={() => {
            const target = targetRef.current;
            if (!target) return;
            jumpTo(target, lenisRef.current);
            targetRef.current = null;
            setOpen(false);
          }}
        >
          <img src="/logo-mark.png" alt="" className="size-14" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
