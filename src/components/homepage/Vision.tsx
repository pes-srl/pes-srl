"use client";

import { Speaker, RadioReceiver, Lightbulb, ArrowRight } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="relative z-20 -mt-24 md:-mt-40 pt-24 pb-24 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Abstract Background Elements Rimosse per sfondo bianco */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <div className="space-y-8 text-lg text-zinc-600 leading-relaxed font-medium mt-10">
            <div className="relative group mx-auto max-w-3xl">
              <div className="bg-white backdrop-blur-xl p-10 rounded-3xl border border-zinc-100 shadow-xl hover:-translate-y-2 hover:bg-zinc-50 transition-all duration-300 flex flex-col items-center md:items-start gap-6 text-center md:text-left">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  <Speaker className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Non Farti Limitare</h3>
                <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-light group-hover:text-zinc-900 transition-colors duration-300">
                  Le casse audio che hai già installato nel tuo punto vendita o le casse Bluetooth <strong className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">non devono limitarsi</strong> a trasmettere solo musica di sottofondo.
                </p>
              </div>
            </div>

            <p className="text-3xl md:text-5xl font-extrabold my-14 leading-tight drop-shadow-sm tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
              TRASFORMALE IN UN POTENTE STRUMENTO DI COMUNICAZIONE, VENDITA E MARKETING.
            </p>


            <div className="grid md:grid-cols-2 gap-8 mt-20 text-left">
              <div className="bg-white backdrop-blur-xl p-10 rounded-3xl border border-zinc-100 shadow-xl hover:-translate-y-2 hover:bg-zinc-50 transition-all duration-300 group">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  <RadioReceiver className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">Connessione Globale</h3>
                <p className="text-zinc-600 leading-relaxed text-lg">
                  Il nostro avanzato sistema di streaming audio connette singolarmente ogni negozio della tua rete.
                </p>
              </div>

              <div className="bg-white backdrop-blur-xl p-10 rounded-3xl border border-zinc-100 shadow-xl hover:-translate-y-2 hover:bg-zinc-50 transition-all duration-300 group">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  <Speaker className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">Contenuti Mirati</h3>
                <p className="text-zinc-600 leading-relaxed text-lg">
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
