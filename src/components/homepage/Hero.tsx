"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center pt-24 pb-20 md:pb-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/assets-pes-srl/people-listening-to-music-PBPJ9NS-scaled-e1670072019352.jpg"
          alt="People listening to music"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Leggera sfumatura azzurrina/overlay (ridotta leggermente) */}
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-blue-500/30" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col h-full min-h-[45vh] md:min-h-[55vh] w-full justify-between items-start pt-12 pb-12 md:pb-24">
        
        <div className="flex-1 w-full flex flex-col justify-center items-start">
        {/* Main Title - Vertical letters */}
        <div className="flex flex-col mb-8 text-left max-w-2xl items-start">
          <div className="flex items-center gap-2 md:gap-3 text-white drop-shadow-md group">
            <span className="text-6xl md:text-8xl font-semibold">P</span>
            <span className="text-3xl md:text-5xl font-light mt-1 md:mt-2 tracking-wide">eople</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-white drop-shadow-md group">
            <span className="text-6xl md:text-8xl font-semibold">E</span>
            <span className="text-3xl md:text-5xl font-light mt-1 md:mt-2 tracking-wide">xperience</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-white drop-shadow-md group">
            <span className="text-6xl md:text-8xl font-semibold">S</span>
            <span className="text-3xl md:text-5xl font-light mt-1 md:mt-2 tracking-wide">olution</span>
          </div>
        </div>

        <div className="inline-block px-5 py-3 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium tracking-widest text-xs md:text-lg uppercase shadow-[0_4px_30px_rgba(0,0,0,0.1)] mb-8">
          RADIO IN-STORE-BRAND PODCAST
        </div>
        
        </div>

        <div className="w-full flex justify-center mt-auto pt-16">
          <a
            href="mailto:info@pes-srl.it"
            className="group relative inline-flex items-center justify-center px-10 py-5 rounded-lg font-semibold text-sm md:text-base text-white tracking-widest uppercase overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(255,138,76,0.7)] hover:shadow-[0_20px_60px_-15px_rgba(255,138,76,1)]"
            style={{ backgroundImage: 'linear-gradient(135deg, #ff8a4c 0%, #ff5e62 100%)' }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
              CHIEDI UN PREVENTIVO
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>

    </section>
  );
}
