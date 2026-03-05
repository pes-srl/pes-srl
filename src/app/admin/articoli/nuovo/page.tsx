"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2, UploadCloud, ArrowLeft, Send, Save } from "lucide-react";
import Link from "next/link";

export default function NuovoArticoloPage() {
    const router = useRouter();
    const supabase = createClient();

    const [titolo, setTitolo] = useState("");
    const [contenuto, setContenuto] = useState("");
    const [immagine, setImmagine] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingImg, setIsUploadingImg] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImmagine(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!immagine) return null;

        setIsUploadingImg(true);
        const fileExt = immagine.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error, data } = await supabase.storage
            .from('immagini-blog')
            .upload(fileName, immagine, {
                cacheControl: '3600',
                upsert: false
            });

        setIsUploadingImg(false);

        if (error) {
            toast.error("Errore upload immagine", { description: error.message });
            throw error;
        }

        const { data: publicData } = supabase.storage.from('immagini-blog').getPublicUrl(fileName);
        return publicData.publicUrl;
    };

    const saveArticle = async (status: 'draft' | 'published') => {
        if (!titolo.trim()) {
            toast.error("Titolo mancante", { description: "Inserisci un titolo per l'articolo." });
            return;
        }
        if (!contenuto.trim() || contenuto === "<p></p>") {
            toast.error("Contenuto vuoto", { description: "Scrivi qualcosa nel corpo dell'articolo." });
            return;
        }

        setIsSubmitting(true);
        toast.loading(status === 'published' ? 'Pubblicazione in corso...' : 'Salvataggio bozza...', { id: 'save' });

        try {
            // 1. Upload immagine se presente
            let coverUrl = null;
            if (immagine) {
                coverUrl = await uploadImage();
            }

            // 2. Prendi l'utente corrente
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;

            if (!user) {
                throw new Error("Devi essere loggato per pubblicare un articolo.");
            }

            // 3. Salva nel DB
            const { error } = await supabase.from('articoli').insert({
                titolo,
                contenuto,
                status,
                immagine_copertina: coverUrl,
                autore_id: user?.id,
            });

            if (error) throw error;

            toast.success(status === 'published' ? 'Articolo pubblicato con successo!' : 'Bozza salvata.', { id: 'save' });
            router.push('/admin/articoli');
            router.refresh();

        } catch (error: any) {
            console.error(error);
            toast.error("Errore", { id: 'save', description: error.message || "Impossibile salvare l'articolo. Hai eseguito lo script SQL?" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Link href="/admin/articoli" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Torna agli Articoli
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">Crea Nuovo Articolo</h1>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => saveArticle('draft')}
                        disabled={isSubmitting}
                        className="border-white/10 text-white hover:bg-white/10 gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Salva Bozza
                    </Button>
                    <Button
                        onClick={() => saveArticle('published')}
                        disabled={isSubmitting}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white gap-2 shadow-lg shadow-fuchsia-500/20"
                    >
                        {isSubmitting && !isUploadingImg ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Pubblica Ora
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Copertina */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
                    <Label className="text-white text-base font-semibold mb-3 block">Immagine di Copertina</Label>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <Label htmlFor="cover-upload" className="cursor-pointer group flex-shrink-0">
                            {previewUrl ? (
                                <div className="w-full sm:w-64 aspect-video rounded-xl overflow-hidden relative border border-white/10 group-hover:border-fuchsia-500/50 transition-colors">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-sm font-medium flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                            <UploadCloud className="w-4 h-4" /> Cambia
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full sm:w-64 aspect-video rounded-xl bg-zinc-950 border-2 border-dashed border-white/10 group-hover:border-fuchsia-500/50 group-hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-2">
                                    <ImageIcon className="w-8 h-8 text-zinc-500 group-hover:text-fuchsia-400 transition-colors" />
                                    <span className="text-zinc-400 text-sm font-medium group-hover:text-white transition-colors">Carica Immagine</span>
                                </div>
                            )}
                            <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </Label>
                        <div className="text-sm text-zinc-400 flex-1">
                            <p className="mb-2">Aggiungi un'immagine accattivante per il tuo articolo.</p>
                            <p>L'immagine verrà automaticamente caricata nel bucket <code className="text-fuchsia-300 bg-fuchsia-500/10 px-1.5 py-0.5 rounded">immagini-blog</code> di Supabase durante il salvataggio.</p>
                        </div>
                    </div>
                </div>

                {/* Titolo e Editor */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
                    <div>
                        <Label htmlFor="titolo" className="text-white text-base font-semibold mb-2 block">Titolo dell'Articolo</Label>
                        <Input
                            id="titolo"
                            type="text"
                            placeholder="Es: I 5 trend del 2026 per i Saloni di Bellezza..."
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            className="bg-zinc-950 border-white/10 text-white text-lg py-6 focus-visible:ring-fuchsia-500"
                        />
                    </div>

                    <div>
                        <Label className="text-white text-base font-semibold mb-2 block">Contenuto dell'Articolo</Label>
                        <TiptapEditor
                            content={contenuto}
                            onChange={(html) => setContenuto(html)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
