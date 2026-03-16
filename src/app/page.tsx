import { Metadata } from "next";

import { Header } from "../components/homepage/Header";
import { Hero } from "../components/homepage/Hero";
import { Vision } from "../components/homepage/Vision";
import { ChiSiamo } from "../components/homepage/ChiSiamo";
import { Servizi } from "../components/homepage/Servizi";
import { Tecnologia } from "../components/homepage/Tecnologia";
import { Partners } from "../components/homepage/Partners";
import { CtaSection } from "../components/homepage/CtaSection";
import { Footer } from "../components/homepage/Footer";

export const metadata: Metadata = {
  title: "People Experience Solution - PES SRL",
  description: "Trasforma le tue casse audio in un potente strumento di comunicazione e vendita.",
};

export default function Homepage2() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-0 md:pt-0">
      {/* Removed background image overlay to ensure pure white background */}

      <Header />

      <Hero />
      <Vision />
      <ChiSiamo />
      <Servizi />
      <Tecnologia />
      <Partners />
      <CtaSection />

      <Footer />
    </main>
  );
}
