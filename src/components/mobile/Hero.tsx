"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Studio hero: the mark on a stage.
 * Soft key light drifts left → right; specular and floor shadow follow.
 */

const EASE = [0.76, 0, 0.24, 1] as const;
const CYCLE = 14;

const logoMask: CSSProperties = {
  WebkitMaskImage: "url(/logo.svg)",
  maskImage: "url(/logo.svg)",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden bg-[#0e0f13]"
      aria-label="Скульпт Клиник"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, #1a1c24 0%, #0e0f13 55%, #090a0d 100%)",
        }}
      />

      {/* Floor */}
      <div
        aria-hidden
        className="absolute inset-x-[-20%] bottom-0 h-[42%] origin-bottom"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(18,19,24,0.2) 18%, #12131a 100%)",
          transform: "perspective(700px) rotateX(58deg)",
          transformOrigin: "center top",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.55) 70%)",
        }}
      />

      {/* Cool fill from the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[8%] h-[70%] w-[70%] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(180,190,210,0.14), transparent 62%)",
        }}
      />

      {reduce ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 42% 22%, rgba(255,248,235,0.28), transparent 65%)",
          }}
        />
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          animate={{ x: ["-28%", "28%", "-28%"] }}
          transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="absolute left-1/2 top-[-8%] h-[85%] w-[85%] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 55% 70% at 50% 18%, rgba(255,248,235,0.34) 0%, rgba(255,236,210,0.14) 28%, rgba(255,220,180,0.05) 48%, transparent 70%)",
            }}
          />
          <div
            className="absolute left-1/2 top-[6%] h-[42%] w-[38%] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(255,252,245,0.55) 0%, rgba(255,230,190,0.18) 35%, transparent 68%)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute left-1/2 top-[-5%] h-[78%] w-[46%] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,245,230,0.2) 0%, rgba(255,230,200,0.08) 42%, transparent 78%)",
              clipPath: "polygon(32% 0%, 68% 0%, 92% 100%, 8% 100%)",
              filter: "blur(18px)",
              opacity: 0.85,
            }}
          />
          <div
            className="absolute bottom-[14%] left-1/2 h-[12%] w-[58%] -translate-x-1/2 rounded-[100%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,236,210,0.22) 0%, rgba(255,220,180,0.06) 45%, transparent 72%)",
              filter: "blur(6px)",
            }}
          />
        </motion.div>
      )}

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-8 pt-[env(safe-area-inset-top)] pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="relative flex w-full max-w-[280px] flex-col items-center">
          <motion.div
            aria-hidden
            className="absolute -bottom-6 left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-[100%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 42%, transparent 72%)",
              filter: "blur(8px)",
            }}
            animate={
              reduce
                ? undefined
                : {
                    x: ["18%", "-18%", "18%"],
                    scaleX: [1.05, 0.92, 1.05],
                    opacity: [0.55, 0.75, 0.55],
                  }
            }
            transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            aria-hidden
            className="absolute top-[18%] left-1/2 h-[70%] w-[70%] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.45), transparent 65%)",
              filter: "blur(22px)",
            }}
            animate={
              reduce
                ? undefined
                : { x: ["22%", "-22%", "22%"], opacity: [0.35, 0.55, 0.35] }
            }
            transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative aspect-square w-[58vw] max-w-[240px]"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <img
              src="/logo.svg"
              alt=""
              aria-hidden
              className="absolute inset-0 size-full"
              style={{
                transform: "translate(3px, 5px)",
                filter: "brightness(0) blur(0.4px)",
                opacity: 0.4,
              }}
            />
            <img
              src="/logo.svg"
              alt=""
              aria-hidden
              className="absolute inset-0 size-full"
              style={{
                transform: "translate(6px, 10px)",
                filter: "brightness(0) blur(1.5px)",
                opacity: 0.22,
              }}
            />

            <img
              src="/logo.svg"
              alt="Sculpt Clinic"
              className="relative size-full"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 28px rgba(255,236,210,0.2))",
              }}
            />

            {!reduce && (
              <>
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  style={logoMask}
                  animate={{ x: ["-55%", "55%", "-55%"] }}
                  transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    className="absolute inset-[-12%] rotate-[18deg]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 34%, rgba(255,252,245,0.16) 44%, rgba(255,255,255,0.72) 50%, rgba(255,230,190,0.24) 56%, transparent 66%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </motion.div>

                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ ...logoMask, mixBlendMode: "screen" }}
                  animate={{
                    background: [
                      "radial-gradient(circle at 22% 28%, rgba(255,248,235,0.52), transparent 36%)",
                      "radial-gradient(circle at 78% 28%, rgba(255,248,235,0.52), transparent 36%)",
                      "radial-gradient(circle at 22% 28%, rgba(255,248,235,0.52), transparent 36%)",
                    ],
                  }}
                  transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
          </motion.div>
        </div>
      </div>

      <h1 className="sr-only">Скульптура вашей улыбки</h1>
    </section>
  );
}
