"use client";

import { ReactLenis } from "lenis/react";

/** Desktop-only Lenis wrapper. Mobile home never imports this. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
