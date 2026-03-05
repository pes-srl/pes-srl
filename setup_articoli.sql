-- Script di configurazione per il Blog/MediaHub (Articoli)

-- 1. Creare il bucket per le immagini se non esiste
INSERT INTO storage.buckets (id, name, public) 
VALUES ('immagini-blog', 'immagini-blog', true)
ON CONFLICT (id) DO NOTHING;

-- Configuriamo le policy di Storage (Bucket publico per lettura, scrittura solo per admin o utenti autenticati)
-- Permettere la visione pubblica
CREATE POLICY "Public Access" ON storage.objects FOR SELECT 
USING (bucket_id = 'immagini-blog');

-- Permettere l'inserimento/update (in un'app reale vorresti limitarlo agli admin tramite trigger o claim)
CREATE POLICY "Authenticated Insert" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'immagini-blog' AND auth.role() = 'authenticated');

-- 2. Creare la tabella degli articoli
CREATE TABLE IF NOT EXISTS public.articoli (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titolo TEXT NOT NULL,
    contenuto TEXT NOT NULL,
    immagine_copertina TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    autore_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Abilitiamo RLS
ALTER TABLE public.articoli ENABLE ROW LEVEL SECURITY;

-- 3. Policy per la tabella "articoli"
-- I lettori possono vedere solo gli articoli pubblicati
CREATE POLICY "Utenti e visitatori vedono articoli pubblicati" 
ON public.articoli FOR SELECT 
USING (status = 'published');

-- Gli admin o autori possono inserire/modificare tutti gli articoli
CREATE POLICY "Utenti autenticati possono gestire articoli" 
ON public.articoli FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Trigger per l'aggiornamento automatico dell'updated_at
CREATE OR REPLACE FUNCTION update_articoli_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_articoli_updated_at ON public.articoli;
CREATE TRIGGER trg_articoli_updated_at
BEFORE UPDATE ON public.articoli
FOR EACH ROW
EXECUTE FUNCTION update_articoli_updated_at();
