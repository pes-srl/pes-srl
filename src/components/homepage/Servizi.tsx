"use client";

import { Headphones, Radio, Mic2, Clapperboard } from "lucide-react";

export function Servizi() {
  const services = [
    {
      title: "PERCHÈ UNA RADIO IN-STORE?",
      icon: Headphones,
      bgClass: "from-blue-600/90 to-blue-900/90",
      image: "bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80')]",
    },
    {
      title: "PERCHÈ UNA WEB RADIO?",
      icon: Radio,
      bgClass: "from-cyan-600/90 to-blue-800/90",
      image: "bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80')]",
    },
    {
      title: "PERCHÈ UN PODCAST AZIENDALE?",
      icon: Mic2,
      bgClass: "from-indigo-600/90 to-slate-900/90",
      image: "bg-[url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80')]",
    },
    {
      title: "PERCHÈ UN PODCAST VIDEO?",
      icon: Clapperboard,
      bgClass: "from-orange-600/90 to-red-900/90",
      image: "bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80')]",
    },
  ];

  return (
    <section id="servizi" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 uppercase tracking-tight mb-6">
            I Nostri Servizi
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl aspect-[4/5] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${service.image} bg-cover bg-center`}
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${service.bgClass} mix-blend-multiply opacity-80 group-hover:opacity-60 transition-opacity duration-500`} />

              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10 transition-transform duration-500 group-hover:scale-110">
                <service.icon className="w-16 h-16 text-white/80 mb-6 drop-shadow-md group-hover:text-white transition-colors" />
                <h3 className="text-2xl font-black text-white leading-tight drop-shadow-lg uppercase tracking-wide">
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
