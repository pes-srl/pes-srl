"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function ChiSiamo() {
  return (
    <section id="chi-siamo" className="py-24 bg-zinc-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-4xl font-semibold leading-relaxed text-blue-900 uppercase tracking-tight">
              Chi Siamo
            </h2>
            <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
            
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p>
                Una equipe creativa e curiosa che vive di <strong>un'esplorazione costante delle potenzialità del mezzo</strong> e dell'ideazione di nuove applicazioni per ottimizzare la user experience.
              </p>
              <p>
                Il nostro sistema di idee ci porta a selezionare ogni particolare di un progetto in collaborazione con il cliente, <strong>mantenendo costi decisamente accessibili</strong>.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="mailto:info@pes-srl.it"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 group shadow-lg"
                style={{ background: 'linear-gradient(148deg,#45b2ff 0%,#0047d6 100%)' }}
              >
                <span>DEMO PODCAST</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full">
            <div className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets-pes-srl/01-IMMAGINE-DI-SFONDO-INIZIALEpeople-together-enjoying-music-P7YJTEX.jpg"
                alt="Chi Siamo - People enjoying music"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
