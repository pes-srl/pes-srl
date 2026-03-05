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
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-fuchsia-500" />
                <p>Caricamento articolo in corso...</p>
            </div>
        );
    }

    if (error || !articolo) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 gap-4 p-4">
                <FileText className="w-16 h-16 text-zinc-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Articolo Non Trovato</h1>
                <p className="text-center max-w-md mb-6">
                    L'articolo che stai cercando potrebbe essere stato rimosso, non essere più disponibile, o essere ancora in bozza.
                </p>
                <Link
                    href="/mediahub"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-full font-medium transition-colors border border-white/10"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Torna al MediaHub
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030712] text-[#f8fafc] pb-24 font-sans">
            {/* Header / Nav */}
            <div className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/mediahub"
                        className="group flex items-center gap-2 text-zinc-400 hover:text-fuchsia-400 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        MediaHub
                    </Link>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 pt-12">
                <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                    <div className="flex items-center justify-center gap-2 text-fuchsia-400 text-sm font-medium uppercase tracking-widest mb-4">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(articolo.created_at), "dd MMMM yyyy", { locale: it })}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
                        {articolo.titolo}
                    </h1>
                </div>

                {/* Copertina full size */}
                {articolo.immagine_copertina && (
                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-black/50 mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both relative border border-white/5">
                        <img
                            src={articolo.immagine_copertina}
                            alt={articolo.titolo}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>
                )}

                {/* Contenuto Formattato (Rich Text) */}
                <div
                    className="prose prose-invert prose-lg md:prose-xl max-w-none prose-fuchsia prose-img:rounded-xl prose-img:w-full prose-headings:font-bold prose-a:text-fuchsia-400 animate-in fade-in duration-1000 delay-300 fill-mode-both prose-p:leading-relaxed prose-p:text-zinc-300"
                    dangerouslySetInnerHTML={{ __html: articolo.contenuto }}
                />
            </main>
        </div>
    );
}
