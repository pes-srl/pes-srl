"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface Articolo {
    id: string;
    titolo: string;
    immagine_copertina: string | null;
    contenuto: string;
    created_at: string;
    status: string;
}

export default function ArticoloCompletoPage() {
    const { id } = useParams();
    const router = useRouter();
    const supabase = createClient();

    const [articolo, setArticolo] = useState<Articolo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id || typeof id !== "string") return;

        const fetchArticolo = async () => {
            const { data, error } = await supabase
                .from("articoli")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data || data.status !== "published") {
                setError(true);
            } else {
                setArticolo(data);
            }
            setIsLoading(false);
        };

        fetchArticolo();
    }, [id, supabase]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-zinc-400 gap-4 font-['Outfit']">
                <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
                <p className="tracking-widest uppercase text-sm">Caricamento articolo in corso...</p>
            </div>
        );
    }

    if (error || !articolo) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-zinc-400 gap-4 p-4 font-['Outfit']">
                <FileText className="w-16 h-16 text-zinc-600 mb-4" />
                <h1 className="text-3xl font-light text-white mb-2 uppercase tracking-wide">Articolo Non Trovato</h1>
                <p className="text-center max-w-md mb-6 font-light">
                    L'articolo che stai cercando potrebbe essere stato rimosso, non essere più disponibile, o essere ancora in bozza.
                </p>
                <Link
                    href="/mediahub"
                    className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-[#D4AF37] px-8 py-3 rounded-none border border-[#D4AF37]/30 hover:border-[#D4AF37] uppercase tracking-widest text-xs transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Torna al MediaHub
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-[#f8fafc] pb-24 font-['Outfit']" style={{ backgroundColor: "#050505", backgroundImage: "radial-gradient(circle at 50% 0%, #151515 0%, #050505 70%)" }}>
            {/* Header / Nav */}
            <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-5 px-6 md:px-12">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/mediahub"
                        className="group flex items-center gap-3 text-zinc-400 hover:text-[#D4AF37] transition-colors text-xs font-light tracking-[0.2em] uppercase"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        MediaHub
                    </Link>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 pt-16">
                <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                    <div className="flex items-center justify-center gap-2 text-white text-xs font-light uppercase tracking-[0.15em] mb-6">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(articolo.created_at), "dd MMMM yyyy", { locale: it })}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 leading-[1.1] text-white tracking-tight">
                        {articolo.titolo}
                    </h1>
                </div>

                {/* Copertina full size */}
                {articolo.immagine_copertina && (
                    <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both relative border border-white/5">
                        <img
                            src={articolo.immagine_copertina}
                            alt={articolo.titolo}
                            className="w-full h-full object-cover filter contrast-110 brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                )}

                {/* Contenuto Formattato (Rich Text) */}
                <div
                    className="prose prose-invert prose-lg md:prose-xl max-w-none prose-img:rounded-none prose-img:w-full prose-headings:font-normal prose-headings:tracking-tight prose-a:text-[#D4AF37] hover:prose-a:text-white prose-a:transition-colors animate-in fade-in duration-1000 delay-300 fill-mode-both prose-p:leading-[1.8] prose-p:text-[#a3a3a3] prose-p:font-light font-sans"
                    dangerouslySetInnerHTML={{ __html: articolo.contenuto }}
                />
            </main>
        </div>
    );
}
