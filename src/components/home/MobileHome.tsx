"use client";

import { Header } from "@/components/mobile/Header";
import { Hero } from "@/components/mobile/Hero";
import { Services } from "@/components/mobile/Services";
import { Footer } from "@/components/mobile/Footer";
import { Mission } from "@/components/Mission";
import { Marquee } from "@/components/Marquee";
import { Technology } from "@/components/Technology";
import { Founder } from "@/components/Founder";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

/** Phone version only. Native scroll, no Lenis, no desktop pin/parallax. */
export function MobileHome() {
  return (
    <>
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
    </>
  );
}
