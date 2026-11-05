"use client";

import { useEffect, useState } from "react";
import { DesktopHome } from "./DesktopHome";
import { MobileHome } from "./MobileHome";

/**
 * Mount exactly one tree. Desktop and mobile never share scroll, Lenis, or pinned stages.
 */
export function HomeGate() {
  const [phone, setPhone] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (phone === null) {
    return <div className="min-h-[100dvh] bg-stone" aria-hidden />;
  }

  return phone ? <MobileHome /> : <DesktopHome />;
}
