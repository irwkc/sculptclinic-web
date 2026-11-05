"use client";

import { ReactLenis } from "lenis/react";
import { Header } from "@/components/desktop/Header";
import { Hero } from "@/components/desktop/Hero";
import { Services } from "@/components/desktop/Services";
import { Footer } from "@/components/desktop/Footer";
import { Mission } from "@/components/Mission";
import { Marquee } from "@/components/Marquee";
import { Technology } from "@/components/Technology";
import { Founder } from "@/components/Founder";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { PageTransition } from "@/components/PageTransition";

/** PC version only. Lenis + pinned scroll stages live here and nowhere else. */
export function DesktopHome() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Services />
        <Marquee />
        <Technology />
        <Founder />
        <Team />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <PageTransition />
    </ReactLenis>
  );
}
