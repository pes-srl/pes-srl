"use client";

import { Headphones, Radio, Mic2, Clapperboard } from "lucide-react";

export function Servizi() {
  const services = [
    {
      title: "PERCHÈ UNA RADIO IN-STORE?",
      icon: Headphones,
    },
    {
      title: "PERCHÈ UNA WEB RADIO?",
      icon: Radio,
    },
    {
      title: "PERCHÈ UN PODCAST AZIENDALE?",
      icon: Mic2,
    },
    {
      title: "PERCHÈ UN PODCAST VIDEO?",
      icon: Clapperboard,
    },
  ];

  return (
    <section id="servizi" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-zinc-900 tracking-tight mb-6">
            I Nostri Servizi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-3xl aspect-[4/5] group cursor-pointer bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10 transition-transform duration-500 group-hover:scale-105">
                <service.icon className="w-16 h-16 text-zinc-900 mb-6 transition-colors" />
                <h3 className="text-xl font-medium leading-tight text-zinc-900 tracking-tight">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
