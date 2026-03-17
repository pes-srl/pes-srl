"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function Tecnologia() {
  return (
    <section id="tecnologia" className="py-24 bg-zinc-50/80 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image Content */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white border border-zinc-100 p-8 flex items-center justify-center">
              <Image
                src="/assets-pes-srl/it-no-sfodo_3-1.webp"
                alt="La Nostra Tecnologia"
                fill
                className="object-contain p-8 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-zinc-900 tracking-tight mb-6">
                La Nostra Tecnologia
              </h2>
            </div>

            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-zinc-900 shrink-0 mt-1" />
                <p>
                  <strong>Tecnologia di ultima generazione</strong> per la produzione, l'erogazione e la gestione di tutti i servizi.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-zinc-900 shrink-0 mt-1" />
                <p>
                  <strong>Server audio e video dedicati</strong> con applicazioni innovative, in grado di rendere il cliente interattivo con il servizio.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm mt-8">
                <p className="text-zinc-700 font-medium">
                  <strong>PES</strong> si distingue per un <strong>sistema di streaming audio</strong>, progettato per raggiungere capillarmente ogni negozio della rete con contenuti personalizzati e diversificati.
                  <br /><br />
                  Grazie a questa tecnologia innovativa, <strong>è possibile inviare promozioni e messaggi specifici a ciascun punto vendita</strong>, garantendo una comunicazione su misura e altamente efficace.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
