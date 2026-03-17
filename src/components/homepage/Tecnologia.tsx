"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function Tecnologia() {
  return (
    <section id="tecnologia" className="py-16 md:py-24 bg-zinc-50/80 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">

          {/* Text Content */}
          <div className="flex-1 space-y-8 w-full">
            <div>
              <h2 className="text-center text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter leading-[1.1] mb-6">
                La Nostra Tecnologia
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8 text-zinc-500 leading-relaxed text-xl md:text-2xl font-light">
              <p>
                <strong className="font-medium text-zinc-800">Tecnologia di ultima generazione</strong> per la produzione, l'erogazione e la gestione di tutti i servizi.
              </p>
              <p>
                <strong className="font-medium text-zinc-800">Server audio e video dedicati</strong> con applicazioni innovative, in grado di rendere il cliente interattivo con il servizio.
              </p>
              <p>
                <strong className="font-medium text-zinc-800">PES</strong> si distingue per un <strong className="font-medium text-zinc-800">sistema di streaming audio</strong>, progettato per raggiungere capillarmente ogni negozio della rete con contenuti personalizzati e diversificati.
              </p>
              <p>
                Grazie a questa tecnologia innovativa, <strong className="font-medium text-zinc-800">è possibile inviare promozioni e messaggi specifici a ciascun punto vendita</strong>, garantendo una comunicazione su misura e altamente efficace.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full mt-4 lg:mt-0">
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white border border-zinc-100 flex items-center justify-center">
              <Image
                src="/assets-pes-srl/it-light-flow.png.png"
                alt="La Nostra Tecnologia It Light Flow"
                fill
                className="object-contain p-4 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
