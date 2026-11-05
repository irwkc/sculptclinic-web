"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X, Plus, ArrowUpRight } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { clinic, nav, locations } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[72px] text-white mix-blend-difference pointer-events-none">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-8">
          <div className="pointer-events-auto flex items-center gap-10">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu-desk"
              className="inline-flex items-center gap-2 text-[15px] font-medium"
            >
              Меню
              {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
            </button>
          </div>

          <div className="pointer-events-auto flex items-center gap-6">
            <a href={clinic.phoneHref} className="link-line text-[15px] font-medium">
              {clinic.phone}
            </a>
            <a href="#contact" className="btn h-12 bg-white px-6 text-[15px] text-black">
              <span>Записаться</span>
              <span className="btn-icon bg-black/8">
                <Plus size={13} weight="bold" />
              </span>
            </a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu-desk"
            role="dialog"
            aria-modal="true"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-text-light"
          >
            <div className="mx-auto flex min-h-full max-w-[1600px] flex-col justify-between px-8 pb-10 pt-36">
              <nav>
                <ul className="flex flex-col">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.25 + i * 0.06,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b hairline-light"
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between py-5"
                      >
                        <span className="display text-[80px] leading-[1]">{item.label}</span>
                        <ArrowUpRight
                          size={28}
                          className="opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-16 grid grid-cols-3 gap-10 text-[15px]"
              >
                {locations.map((l) => (
                  <div key={l.id}>
                    <p className="font-medium">{l.name}</p>
                    <p className="mt-1 text-white/60">{l.address}</p>
                    <a href={clinic.phoneHref} className="link-line mt-3 inline-block">
                      {l.phone}
                    </a>
                  </div>
                ))}
                <div className="flex flex-col gap-2 text-white/60">
                  <a className="link-line w-fit" href={clinic.vk}>
                    ВКонтакте
                  </a>
                  <a className="link-line w-fit" href={`mailto:${clinic.email}`}>
                    {clinic.email}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
