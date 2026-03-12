"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden"
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
        {/* White Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Main Title - Vertical letters */}
        <div className="flex flex-col mb-8 text-left max-w-xl mx-auto items-start md:text-center md:items-center">
          <div className="flex items-center gap-4 text-zinc-900 transition-colors group">
            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">P</span>
            <span className="text-3xl md:text-5xl font-light tracking-wide mt-2 group-hover:text-blue-600">eople</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-900 transition-colors group">
            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">E</span>
            <span className="text-3xl md:text-5xl font-light tracking-wide mt-2 group-hover:text-blue-600">xperience</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-900 transition-colors group">
            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">S</span>
            <span className="text-3xl md:text-5xl font-light tracking-wide mt-2 group-hover:text-blue-600">olution</span>
          </div>
        </div>

        <h2 className="text-xl md:text-3xl font-bold text-blue-800 tracking-widest mb-12 uppercase drop-shadow-sm">
          RADIO IN-STORE-BRAND PODCAST
        </h2>

        <a
          href="mailto:info@pes-srl.it"
          className="group relative inline-block px-10 py-5 rounded-full font-bold text-lg text-white tracking-wider overflow-hidden shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
          style={{ background: 'linear-gradient(148deg,#45b2ff 0%,#0047d6 100%)' }}
        >
          <span className="relative z-10">CHIEDI PREVENTIVO</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
        </a>
      </div>

      {/* Decorative wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[50px] w-full fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,130.83,123.6,189.92,109.28Z"></path>
        </svg>
      </div>
    </section>
  );
}
