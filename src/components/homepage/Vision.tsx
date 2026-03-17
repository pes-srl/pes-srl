"use client";

import { Speaker, RadioReceiver } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="relative z-20 py-24 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <div className="space-y-8 text-lg text-zinc-600 leading-relaxed font-medium mt-10">


            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 mt-12 text-left items-stretch">
              {/* Left Card - More Artistic/Editorial */}
              <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-[2rem] border border-zinc-100 shadow-sm transition-all duration-500 hover:shadow-md flex flex-col justify-between group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none transform translate-x-4 -translate-y-4">
                  <RadioReceiver className="w-64 h-64 text-zinc-900" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-zinc-50 rounded-full flex items-center justify-center mb-10 border border-zinc-100 group-hover:bg-[#E8F0FE] transition-colors duration-500">
                    <RadioReceiver className="w-6 h-6 text-zinc-900 group-hover:text-[#2B5292] transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter mb-6 leading-[1.1]">
                    Connessione<br />Globale
                  </h3>
                  <p className="text-zinc-500 leading-relaxed text-xl md:text-2xl font-light max-w-lg mt-auto">
                    Un ecosistema sonoro unificato. Il nostro <strong className="font-medium text-zinc-800">sistema di streaming</strong> intreccia invisibilmente ogni spazio della tua rete, diffondendo la voce del tuo brand ovunque, in perfetta sincronia.
                  </p>
                </div>
              </div>

              {/* Right Card - Complementary */}
              <div className="lg:col-span-5 bg-zinc-900 p-10 md:p-14 rounded-[2rem] shadow-xl text-white transition-all duration-500 hover:shadow-2xl flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center mb-10 border border-zinc-700">
                    <Speaker className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white tracking-tight mb-4 leading-tight">
                    Contenuti Mirati
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-lg font-light">
                    Oltre la musica. Trasmetti promozioni, comunicazioni personalizzate e palinsesti distinti per valorizzare l'identità di ogni singolo punto vendita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
