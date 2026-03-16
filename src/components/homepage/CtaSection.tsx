"use client";

import { MessageCircle } from "lucide-react";

export function CtaSection() {
  return (
    <section id="contattaci" className="py-24 bg-white relative overflow-hidden border-t border-zinc-100">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <MessageCircle className="w-16 h-16 text-blue-600 mx-auto" />

          <h2 className="text-3xl md:text-4xl font-semibold leading-relaxed text-blue-900 tracking-tight">
            CONTATTACI PER UN PREVENTIVO GRATUITO
          </h2>

          <p className="text-xl text-zinc-600 font-medium">
            Contattaci per avere maggiori info sui nostri servizi o per proporci i tuoi, ti aspettiamo!
          </p>

          <div className="pt-8">
            <a
              href="mailto:info@pes-srl.it"
              className="inline-block px-10 py-5 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              SCRIVICI ORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
