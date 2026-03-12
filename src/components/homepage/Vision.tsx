"use client";

import { Speaker, RadioReceiver, Cast } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 uppercase tracking-tight">
            VISION
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-10 rounded-full"></div>

          <div className="space-y-8 text-lg text-zinc-600 leading-relaxed font-medium">
            <p className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              Le casse audio che hai già installato nel tuo punto vendita o le casse Bluetooth non devono limitarsi a trasmettere solo musica di sottofondo.
            </p>

            <p className="text-2xl font-bold text-zinc-800 my-10">
              Trasformale in un potente strumento di comunicazione, vendita e marketing.
            </p>

            <p className="text-xl font-semibold text-blue-600 italic">
              Chiedici come…
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
              <div className="bg-zinc-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <RadioReceiver className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-zinc-900 mb-3">Connessione Globale</h3>
                <p className="text-zinc-600">
                  Il nostro avanzato sistema di streaming audio connette singolarmente ogni negozio della tua rete.
                </p>
              </div>

              <div className="bg-zinc-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <Speaker className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-zinc-900 mb-3">Contenuti Mirati</h3>
                <p className="text-zinc-600">
                  Con noi puoi trasmettere promozioni, comunicazioni personalizzate e contenuti specifici distinti per ogni singolo punto vendita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
