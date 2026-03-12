"use client";

import Image from "next/image";

export function Partners() {
  return (
    <section id="partners" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold leading-relaxed text-blue-900 uppercase tracking-tight mb-6">
            Abbiamo Lavorato Con
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto mb-8"></div>
          <p className="text-lg text-zinc-600 font-medium">
            Le aziende che hanno già scelto la nostra tecnologia per valorizzare il loro brand.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] flex justify-center items-center">
          <Image
            src="/assets-pes-srl/clienti-no-sfondo.webp"
            alt="I nostri partner e clienti"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
