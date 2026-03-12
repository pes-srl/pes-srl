"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center pt-24 pb-20 md:pb-32 overflow-hidden"
    >
      {/* Background Image Abstract In-Store */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/assets-pes-srl/hero_store_audio_user.png"
          alt="In-Store Audio Technology Render"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full h-full min-h-[45vh] md:min-h-[60vh] flex items-center justify-center">
        {/* Tutti gli elementi testuali e grafici sono stati rimossi dall'Overlay della Hero su richiesta */}
      </div>

    </section>
  );
}
