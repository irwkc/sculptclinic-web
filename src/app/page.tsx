import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Services } from "@/components/Services";
import { Marquee } from "@/components/Marquee";
import { Technology } from "@/components/Technology";
import { Founder } from "@/components/Founder";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
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
