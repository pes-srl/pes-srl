import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, PenLine, Clock, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ArticoliAdminPage() {
    const supabase = await createClient();

    // In a real scenario we'd query the DB:
    // const { data: articoli, error } = await supabase.from("articoli").select("*").order("created_at", { ascending: false });

    // For now we attempt fetching, ignore error if table doesn't exist yet
    const { data: articoli, error } = await supabase.from("articoli").select("*").order("created_at", { ascending: false });

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
                        <PenLine className="w-7 h-7 text-fuchsia-400" />
                        Gestione Articoli
                    </h1>
                    <p className="text-zinc-400 mt-2">Crea, modifica e pubblica contenuti per il tuo MediaHub.</p>
                </div>
                <div>
                    <Link
                        href="/admin/articoli/nuovo"
                        className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-fuchsia-500/20"
                    >
                        <Plus className="w-5 h-5" />
                        Crea Nuovo Articolo
                    </Link>
                </div>
            </div>

            {error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                    <h3 className="text-red-400 font-bold text-lg mb-2">Tabella non ancora configurata</h3>
                    <p className="text-red-300">Ricordati di lanciare lo script SQL su Supabase per creare la tabella `articoli`.</p>
                </div>
            ) : null}

            {articoli && articoli.length === 0 ? (
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center shadow-xl">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 mb-4">
                        <PenLine className="w-8 h-8 text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Nessun articolo presente</h3>
                    <p className="text-zinc-400 max-w-md mx-auto mb-6">Non hai ancora scritto nessun articolo. Inizia subito a creare contenuti per i tuoi utenti.</p>
                    <Link
                        href="/admin/articoli/nuovo"
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-2.5 rounded-full font-medium transition-colors"
                    >
                        Inizia a scrivere
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articoli?.map((articolo) => (
                        <div key={articolo.id} className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-fuchsia-500/50 transition-colors group flex flex-col shadow-xl">
                            {articolo.immagine_copertina ? (
                                <div className="h-48 overflow-hidden bg-black/50 border-b border-white/10">
                                    <img src={articolo.immagine_copertina} alt="Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                </div>
                            ) : (
                                <div className="h-48 bg-zinc-800 flex items-center justify-center border-b border-white/10">
                                    <PenLine className="w-10 h-10 text-zinc-600" />
                                </div>
                            )}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${articolo.status === 'published'
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {articolo.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {articolo.status === 'published' ? 'Pubblicato' : 'Bozza'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{articolo.titolo}</h3>
                                <p className="text-sm text-zinc-400 mt-auto pt-4 border-t border-white/5">
                                    Scritto il: {new Date(articolo.created_at).toLocaleDateString('it-IT')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
