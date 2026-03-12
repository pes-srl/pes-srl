"use client";

import { MessageCircle } from "lucide-react";

export function CtaSection() {
  return (
    <section id="contattaci" className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <MessageCircle className="w-16 h-16 text-white/80 mx-auto" />

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            CONTATTACI PER UN PREVENTIVO GRATUITO
          </h2>

          <p className="text-xl text-blue-100 font-medium">
            Contattaci per avere maggiori info sui nostri servizi o per proporci i tuoi, ti aspettiamo!
          </p>

          <div className="pt-8">
            <a
              href="mailto:info@pes-srl.it"
              className="inline-block px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-zinc-100 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              SCRIVICI ORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
