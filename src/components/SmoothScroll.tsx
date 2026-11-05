"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

const PHONE = "(max-width: 767px)";

/**
 * Desktop: Lenis smooth wheel.
 * Phone: native scroll (Lenis fights the finger and blocks Safari from hiding its chrome).
 * Same split as italiano/components/smooth-scroll.tsx.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [phone, setPhone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const sync = () => setPhone(mq.matches);
    sync();
    setReady(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!ready || phone) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
