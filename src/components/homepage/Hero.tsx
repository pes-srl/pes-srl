"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[60vh] md:min-h-[75vh] flex flex-col items-center justify-start pt-24 pb-16 md:pb-24 overflow-hidden bg-white"
    >

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full flex flex-col items-center">

        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-xl hover:scale-105 transition-transform duration-500">
              <Image
                src="/assets-pes-srl/pes-logo-new.png"
                alt="PES People Experience Solution Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200/60 text-zinc-600 text-sm font-medium tracking-wide mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400"></span>
            </span>
            Audio Marketing Pro
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-zinc-900 tracking-tight leading-[1.10]">
            Le casse audio nel tuo store o i tuoi diffusori Bluetooth <br className="hidden md:block" />
            <span className="text-zinc-400">
              non devono limitarsi
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-zinc-500 font-light leading-relaxed max-w-3xl mx-auto mt-6">
            a trasmettere solo musica di sottofondo.
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-zinc-900/5 transition-transform duration-700 hover:scale-[1.02]">
          <Image
            src="/assets-pes-srl/hero-image-new.jpg"
            alt="PES In-Store Audio Technology"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 mt-16 md:mt-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.10]">
            In pochissimi minuti puoi trasformarle in un potente <br className="hidden md:block" />
            <span className="text-zinc-400">
              strumento di vendita, comunicazione
            </span>
          </h2>

          <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-zinc-500 tracking-tight leading-relaxed max-w-3xl mx-auto mt-6">
            e marketing.
          </p>
        </div>

      </div>

    </section>
  );
}
