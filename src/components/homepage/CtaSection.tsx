"use client";

import { MessageCircle } from "lucide-react";

export function CtaSection() {
  return (
    <section id="contattaci" className="py-24 bg-white relative overflow-hidden border-t border-zinc-100">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <MessageCircle className="w-16 h-16 text-zinc-900 mx-auto" />

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-zinc-900 tracking-tight">
            CONTATTACI PER UN PREVENTIVO GRATUITO
          </h2>

          <p className="text-xl text-zinc-600 font-medium">
            Contattaci per avere maggiori info sui nostri servizi o per proporci i tuoi, ti aspettiamo!
          </p>

          <div className="pt-8">
            <a
              href="mailto:info@pes-srl.it"
              className="inline-block px-10 py-5 bg-zinc-900 text-white rounded-full font-medium text-lg hover:bg-zinc-800 hover:scale-105 transition-all duration-300 shadow-sm"
            >
              SCRIVICI ORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
