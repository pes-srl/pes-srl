"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Giulia M.",
        salon: "Estetica La Perla",
        text: "Da quando abbiamo installato BeautiFy Channel, l'atmosfera in istituto è cambiata completamente. Le clienti adorano la musica e le promozioni vocali ci hanno aiutato a vendere il 20% in più di pacchetti corpo!",
        rating: 5,
    },
    {
        id: 2,
        name: "Alessia T.",
        salon: "Centro Benessere Armonia",
        text: "Finalmente una radio che parla la nostra lingua! I messaggi personalizzati sono elegantissimi e non invadenti. Un investimento che si ripaga da solo in pochi giorni.",
        rating: 5,
    },
    {
        id: 3,
        name: "Martina V.",
        salon: "Vibes Beauty Lounge",
        text: "Il canale Relax è fantastico per la zona massaggi, mentre per la reception usiamo il canale principale. La gestione è zero, fa tutto da solo. Consigliatissimo!",
        rating: 5,
    },
    {
        id: 4,
        name: "Roberta F.",
        salon: "Nail & Beauty Studio",
        text: "Aver inserito i nostri spot audio tra una canzone e l'altra ha dato un tocco di altissima professionalità al centro. Le clienti ci chiedono spesso come abbiamo fatto!",
        rating: 5,
    },
    {
        id: 5,
        name: "Sara P.",
        salon: "Sun & Beauty",
        text: "Ero scettica, ma la differenza con Spotify è abissale. Niente pubblicità fastidiose, solo i nostri messaggi e musica perfetta per chi vuole rilassarsi.",
        rating: 5,
    },
    {
        id: 6,
        name: "Francesca C.",
        salon: "Elite Cosmetology",
        text: "Il Premium è pazzesco. Abbiamo registrato gli spot per il laser Diodo e le richieste sono aumentate a dismisura semplicemente facendolo ascoltare in sala d'attesa.",
        rating: 5,
    },
];

export function TestimonialsNew() {
    return (
        <section className="bg-zinc-950 py-24 px-6 md:px-12 overflow-hidden relative border-t border-white/5">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-black text-white mb-6"
                >
                    Cosa dicono di <span className="text-transparent bg-clip-text bg-linear-to-r from-fuchsia-400 to-purple-600">BeautiFy</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
                >
                    Centinaia di istituti hanno già rivoluzionato l'esperienza delle loro clienti.
                </motion.p>
            </div>

            {/* Marquee Carousel Container */}
            <div className="relative w-full overflow-hidden flex z-10">
                {/* Left/Right Fade masks for smooth edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                    className="flex gap-6 md:gap-8 hover:paused px-4 w-max"
                >
                    {/* Double the array to create seamless loop */}
                    {[...testimonials, ...testimonials].map((t, idx) => (
                        <div
                            key={idx}
                            className="w-[320px] md:w-[400px] shrink-0 bg-[#1E0C31] border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-transform hover:scale-[1.02] cursor-default"
                        >
                            <div>
                                <div className="flex gap-1 mb-6 text-[#FBD44C]">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-zinc-300 text-[15px] leading-relaxed italic mb-8">
                                    "{t.text}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                    {t.name.split(" ")[0][0]}{t.name.split(" ")[1][0]}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{t.salon}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
