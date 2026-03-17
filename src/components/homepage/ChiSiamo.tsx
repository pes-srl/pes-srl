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
            <h2 className="text-center text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter leading-[1.1]">
              Chi Siamo
            </h2>
            
            <div className="space-y-8 text-zinc-500 leading-relaxed text-xl md:text-2xl font-light">
              <p>
                Una equipe creativa e curiosa che vive di <strong className="font-medium text-zinc-800">un'esplorazione costante delle potenzialità del mezzo</strong> e dell'ideazione di nuove applicazioni per ottimizzare la user experience.
              </p>
              <p>
                Il nostro sistema di idee ci porta a selezionare ogni particolare di un progetto in collaborazione con il cliente, <strong className="font-medium text-zinc-800">mantenendo costi decisamente accessibili</strong>.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full">
            <div className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets-pes-srl/chi-siamo-new.jpg"
                alt="Chi Siamo - Team at work"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
