"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

const PHONE = "(max-width: 767px)";

/** Lock the first layout height so Safari toolbar show/hide does not resize pinned stages. */
function lockAppVh() {
  document.documentElement.style.setProperty("--app-vh", `${window.innerHeight}px`);
}

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

    lockAppVh();
    const onOrient = () => {
      window.setTimeout(lockAppVh, 350);
    };
    window.addEventListener("orientationchange", onOrient);
    window.addEventListener("pageshow", lockAppVh);

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("orientationchange", onOrient);
      window.removeEventListener("pageshow", lockAppVh);
    };
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
