"use client";

import Image from "next/image";

export function Partners() {
  type LogoItem = {
    name: string;
    src: string;
    widthClass?: string;
  };

  type LogoEntry = LogoItem | { isGroup: true; items: LogoItem[] };

  const logos: LogoEntry[] = [
    { name: "Arielcar", src: "/assets-pes-srl/loghi/arielcar.png" },
    { name: "Acqua & Sapone", src: "/assets-pes-srl/loghi/acqua_sapone.png" },
    { name: "Burger Radio", src: "/assets-pes-srl/loghi/burger_radio.png" },
    { name: "Emy Store", src: "/assets-pes-srl/loghi/emy_store.png" },
    { name: "DoDo", src: "/assets-pes-srl/loghi/dodo.jpg" },
    { name: "Hogan", src: "/assets-pes-srl/loghi/hogan.png" },
    { 
      isGroup: true, 
      items: [
        { name: "Juice", src: "/assets-pes-srl/loghi/juice_new.png", widthClass: "w-28 md:w-36" },
        { name: "Apple Premium Reseller", src: "/assets-pes-srl/loghi/apple_new.png", widthClass: "w-16 md:w-20" }
      ]
    },
    { name: "Milano Beat", src: "/assets-pes-srl/loghi/milano_beat.png" },
    { name: "Pomellato", src: "/assets-pes-srl/loghi/pomellato.png" },
    { name: "Grand Hotel Puccini", src: "/assets-pes-srl/loghi/grand_hotel_puccini.jpg" },
    { name: "Hotel Del Golfo", src: "/assets-pes-srl/loghi/hotel_del_golfo.png" },
    { name: "Tigota", src: "/assets-pes-srl/loghi/tigota.png" },
    { name: "Dimensione", src: "/assets-pes-srl/loghi/dimensione.png" },
    { name: "Rocale", src: "/assets-pes-srl/loghi/rocale.jpg" },
  ];

  return (
    <section id="partners" className="py-24 bg-white relative overflow-hidden border-t border-zinc-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter leading-[1.1] mb-6">
            Abbiamo Lavorato Con...
          </h2>
          <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-3xl mx-auto leading-relaxed">
            Tra le aziende che hanno già scelto la nostra esperienza, le nostre soluzioni e la nostra tecnologia.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 max-w-5xl mx-auto">
          {logos.map((logo, idx) => {
            if ('isGroup' in logo) {
              return (
                <div key={idx} className="flex items-center gap-0 md:gap-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer hover:scale-105">
                  {logo.items.map((item, subIdx) => (
                    <div key={subIdx} className={`relative h-16 md:h-20 ${item.widthClass}`}>
                      <Image
                        src={item.src}
                        alt={`Logo ${item.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div 
                key={idx} 
                className="relative w-32 h-16 md:w-40 md:h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer hover:scale-105"
              >
                <Image
                  src={logo.src}
                  alt={`Logo ${logo.name}`}
                  fill
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
