"use client";

import { useState } from "react";
import Image from "next/image";
import { Headphones, Radio, Mic2, Clapperboard, X } from "lucide-react";

export function Servizi() {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      title: "RADIO IN-STORE",
      icon: Headphones,
      content: (
        <div className="space-y-6 text-lg text-zinc-600 leading-relaxed font-light">
          <p>
            <strong className="font-medium text-zinc-900">Siamo nel mondo delle Radio In Store</strong>, web radio e sound design dal 2008, l’esperienza ha permesso alle nostre in-store radio e brand radio, di fare il giro del mondo, anche grazie a clienti come <strong className="font-medium text-zinc-900">Pomellato e Hogan</strong>.
          </p>
          <p>
            Operativi anche sul territorio Nazionale grazie a <strong className="font-medium text-zinc-900">Juice (Apple Premium Reseller)</strong>, Portanuova (Gae Aulenti Milano), 100 Montaditos (Gruppo Restalia) and many more…
          </p>
          <p>
            Non creiamo semplicemente canali personalizzati, ma seguiamo il cliente in ogni fase del progetto fino alla suo atto finale.
          </p>
          <p>
            Costi decisamente accessibili rispetto ad un prodotto per un ambiente sonoro fatto su misura.
          </p>
          <p>
            La prima in Italia a produrre format di Web Radio per i comuni e le amministrazioni comunali.
          </p>
          <p>
            Un team di persone che concretizza soluzioni e progetti per la rete, sulla rete e dalla rete per il mondo retail.
          </p>
        </div>
      )
    },
    {
      title: "WEB RADIO",
      icon: Radio,
      content: (
        <div className="space-y-6 text-lg text-zinc-600 leading-relaxed font-light">
          <p>
            Una <strong className="font-medium text-zinc-900">web radio aziendale</strong> è uno dei mezzi più innovativi per creare una connessione forte ed esclusiva con la tua community. È uno spazio di comunicazione proprietario dove la giusta selezione musicale e i valori del tuo brand si intrecciano in un'esperienza d'ascolto unica.
          </p>
          <p>
            Mettiamo in campo una <strong className="font-medium text-zinc-900">decennale esperienza</strong> nella produzione professionale di internet radio. Abbiamo dato vita a progetti per eccellenza: dalle emittenti dedicate ad alcune amministrazioni comunali, fino alla storica <strong className="font-medium text-zinc-900">Burger Radio</strong>, lanciata nel 2012 come prima realtà italiana dedicata alla musica rap.
          </p>
          <div className="bg-[#E8F0FE]/50 rounded-2xl p-6 my-6 border border-[#E8F0FE]">
            <p className="text-[#2B5292] font-semibold text-center text-xl">
              "Hai mai pensato ad un servizio di web radio aziendale fruibile dal sito della tua azienda?"
            </p>
          </div>
          <p>
            Negli anni la voglia di trasmettere e raccontare non si è mai fermata. Tra le produzioni più recenti spicca <strong className="font-medium text-zinc-900">Milano Beat Radio</strong> – <em>"la mia radio la mia città!"</em> –, un'emittente interamente dedicata alla promozione a 360 gradi del territorio milanese.
          </p>
          <p>
            Dall'infrastruttura streaming fino alla cura editoriale e artistica, progettiamo format musicali e parlati su misura per <strong className="font-medium text-zinc-900">connettere in maniera autentica la tua azienda</strong> ai tuoi visitatori.
          </p>
        </div>
      )
    },
    {
      title: "PODCAST AZIENDALE",
      icon: Mic2,
      content: (
        <div className="space-y-6 text-lg text-zinc-600 leading-relaxed font-light">
          <p>
            I podcast sono uno strumento straordinario per dare voce al tuo brand. L'esigenza di una comunicazione immersiva e fluida permette di sfruttare appieno il potenziale dell'audio, trasformando la storia e i valori della tua azienda in racconti affascinanti da ascoltare.
          </p>
          <p>
            Realizziamo <strong className="font-medium text-zinc-900">podcast professionali</strong>, curando ogni aspetto strategico ed editoriale. Che si tratti di un monologo o di un format narrativo a più voci, costruiamo un'esperienza d'ascolto su misura per te.
          </p>
          <div className="bg-[#E8F0FE]/50 rounded-2xl p-6 my-6 border border-[#E8F0FE]">
            <p className="text-[#2B5292] font-semibold text-center text-xl">
              Fatti un Podcast!
            </p>
          </div>
          <p>
            In un'era saturata da contenuti visivi, farsi notare con <strong className="font-medium text-zinc-900">spot e clip audio di alta qualità</strong> è essenziale. Un prodotto sonoro curato non solo cattura subito l'attenzione, ma valorizza l'intera immagine aziendale, rendendo la tua comunicazione sui social e sul web incredibilmente incisiva.
          </p>
          <p>
            Il nostro team di esperti vanta anni di esperienza in post-produzione e sound design. Offriamo una gamma completa di servizi: dai <strong className="font-medium text-zinc-900">programmi radiofonici personalizzati</strong> agli spot per radio e TV, fino ai <strong className="font-medium text-zinc-900">doppiaggi professionali</strong> per documentari e video corporate.
          </p>
          <p>
            Scegliere di investire in un livello di eccellenza radiofonica significa prendere le tue idee e trasformarle in <strong className="font-medium text-zinc-900">messaggi potenti e magnetici</strong>, capaci di arrivare dritti al cuore del tuo pubblico.
          </p>
        </div>
      )
    },
    {
      title: "AUDIO INTERVISTE",
      icon: Clapperboard,
      content: (
        <div className="space-y-6 text-lg text-zinc-600 leading-relaxed font-light">
          <p>
            Le <strong className="font-medium text-zinc-900">audio interviste</strong> sono uno strumento di comunicazione intimo, diretto ed estremamente efficace. Dare voce ai fondatori, ai collaboratori o ai clienti permette di raccontare la vera essenza e i valori della tua azienda in modo autentico e senza filtri.
          </p>
          <p>
            In un mondo sempre più frenetico e sovraccarico di stimoli visivi, l'audio crea una connessione profonda. Permette di approfondire tematiche aziendali, condividere successi e <em>best practice</em>, offrendo un contenuto di alto valore percepito che cattura l'attenzione dell'ascoltatore mentre guida, lavora o si allena.
          </p>
          <div className="bg-[#E8F0FE]/50 rounded-2xl p-6 my-6 border border-[#E8F0FE]">
            <p className="text-[#2B5292] font-semibold text-center text-xl">
              Fai ascoltare la tua voce aziendale!
            </p>
          </div>
          <p>
            Realizziamo format di audio interviste <strong className="font-medium text-zinc-900">chiavi in mano</strong>: dalla stesura editoriale delle domande, passando per la registrazione con attrezzature broadcast professionali, fino all'attenta post-produzione. 
          </p>
          <p>
            Il risultato finale è un contenuto perfetto da integrare nel tuo sito web aziendale, condividere sui social media o allegare alle newsletter, ideale per <strong className="font-medium text-zinc-900">umanizzare il tuo brand</strong> e rafforzare la fiducia del tuo target.
          </p>
        </div>
      )
    },
  ];

  return (
    <section id="servizi" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 space-y-8 w-full">
            <h2 className="text-center text-3xl md:text-5xl font-bold text-zinc-900 tracking-tighter leading-[1.1]">
              I Nostri Servizi
            </h2>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveService(idx)}
                  className="relative overflow-hidden rounded-3xl aspect-square group cursor-pointer bg-zinc-50 border border-zinc-100 hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-zinc-200"
                >
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col items-center justify-center text-center z-10 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#E8F0FE] flex items-center justify-center mb-4 md:mb-6 text-[#2B5292] group-hover:scale-110 transition-transform duration-500">
                      <service.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-sm md:text-lg font-semibold leading-tight text-zinc-900 tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full">
            <div className="relative aspect-square md:aspect-4/3 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="/assets-pes-srl/servizi-macbook.jpg"
                alt="I Nostri Servizi"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Modal Overlay */}
      {activeService !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setActiveService(null)}
          ></div>
          
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-8 md:p-12">
              <button 
                onClick={() => setActiveService(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#E8F0FE] flex items-center justify-center text-[#2B5292] shrink-0">
                  {services[activeService].icon && (() => {
                    const Icon = services[activeService].icon;
                    return <Icon className="w-7 h-7 md:w-8 md:h-8" />;
                  })()}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tighter leading-tight">
                  {services[activeService].title}
                </h3>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto pr-4 -mr-4">
                {services[activeService].content ? (
                  services[activeService].content
                ) : (
                  <p className="text-zinc-500 font-light text-lg">Dettagli in arrivo per questo servizio.</p>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-zinc-100 flex justify-end">
                <button 
                  onClick={() => setActiveService(null)}
                  className="px-8 py-4 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors duration-300"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
