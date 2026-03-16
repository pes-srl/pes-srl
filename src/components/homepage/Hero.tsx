"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center pt-24 pb-20 md:pb-32 overflow-hidden"
    >
      {/* Artistic Lightweight Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-50/60 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full h-full min-h-[45vh] md:min-h-[60vh] flex flex-col items-center justify-center">
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 text-sm font-medium tracking-wide mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Il Suono Evoluto
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
            Le casse audio nel tuo store <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              non devono limitarsi
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-zinc-500 font-light leading-relaxed max-w-3xl mx-auto mt-6">
            a trasmettere solo musica di sottofondo.
          </p>
        </div>

      </div>

    </section>
  );
}
