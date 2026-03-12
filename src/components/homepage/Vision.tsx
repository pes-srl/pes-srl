"use client";

import { Speaker, RadioReceiver, Lightbulb, ArrowRight } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="relative z-20 -mt-24 md:-mt-40 pt-24 pb-24 bg-[#0a192f] rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Existing ones */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* New additional glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-400/20 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full mix-blend-screen filter blur-[110px] opacity-50 animate-pulse" style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="space-y-8 text-lg text-blue-100 leading-relaxed font-medium mt-10">
            <div className="relative group mx-auto max-w-3xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 md:p-10 bg-[#0a192f]/80 ring-1 ring-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                <div className="p-4 bg-white/5 rounded-2xl shrink-0 group-hover:-translate-y-1 transition-transform duration-300">
                  <Speaker className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
                </div>
                <p className="text-xl md:text-2xl text-blue-50/90 leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                  Le casse audio che hai già installato nel tuo punto vendita o le casse Bluetooth <strong className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">non devono limitarsi</strong> a trasmettere solo musica di sottofondo.
                </p>
              </div>
            </div>

            <p className="text-3xl md:text-5xl font-extrabold text-white my-14 leading-tight drop-shadow-lg tracking-tight">
              Trasformale in un potente strumento di <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">comunicazione, vendita e marketing.</span>
            </p>

            {/* Artistic Button */}
            <div className="flex justify-center my-16">
              <button className="group relative px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer">
                {/* Ping Effect / Lightbulb */}
                <div className="absolute -top-3 -right-3">
                  <span className="relative flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-yellow-500 items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      <Lightbulb className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-white tracking-wide">Chiedici come...</span>
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                
                {/* Gradient underline on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full"></div>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-20 text-left">
              <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-400/30 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-300">
                  <RadioReceiver className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Connessione Globale</h3>
                <p className="text-blue-100/80 leading-relaxed text-lg">
                  Il nostro avanzato sistema di streaming audio connette singolarmente ogni negozio della tua rete.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-400/30 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-300">
                  <Speaker className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Contenuti Mirati</h3>
                <p className="text-blue-100/80 leading-relaxed text-lg">
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
