"use client";

import { Sparkles, ArrowRight, Rss } from "lucide-react";

export function CtaSection() {
  return (
    <section id="contattaci" className="py-20 relative bg-zinc-900 overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Abstract Glow 1 */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2B5292] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse"></div>
        {/* Abstract Glow 2 */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zinc-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
        
        {/* Decorative Lines/Grid (Subtle) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-center relative overflow-hidden group">
            
            {/* Hover subtle glow on the card itself */}
            <div className="absolute inset-0 bg-[#2B5292]/0 group-hover:bg-[#2B5292]/10 transition-colors duration-700 ease-out"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-[#2B5292] rounded-full flex items-center justify-center mb-6 border border-[#1e3a68] shrink-0 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Rss className="w-7 h-7 text-white" />
                <Sparkles className="w-4 h-4 text-white/80 absolute -top-1 -right-1 animate-bounce" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white tracking-tight mb-6">
                Pronto a dare <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Voce</span><br className="hidden md:block"/> alla tua Azienda?
              </h2>

              <p className="text-lg md:text-xl text-zinc-300 font-light max-w-xl mx-auto leading-relaxed mb-8">
                Contattaci per un <strong className="text-white font-medium">preventivo gratuito</strong>, per avere maggiori info sui nostri servizi o per proporci i tuoi!
              </p>

              <a
                href="mailto:info@pes-srl.it"
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium text-base lg:text-lg overflow-hidden group/btn hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-white to-zinc-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 tracking-wide">SCRIVICI ORA</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
