-- RIGENERA TUTTO DA ZERO: FUNZIONE E TRIGGER SALVATAGGIO PROFILI

-- 1. Ripristiniamo la funzione (senza is_admin e senza subscriptions fantasma)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, plan_type, trial_ends_at, salon_name)
  VALUES (
    new.id, 
    new.email, 
    'Free', 
    COALESCE(new.raw_user_meta_data->>'plan_type', 'free'),
    (new.raw_user_meta_data->>'trial_ends_at')::timestamp with time zone,
    new.raw_user_meta_data->>'salon_name'
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Eliminiamo il vecchio trigger se esiste (per sicurezza)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. RI-CREIAMO L'ALLARME: Diciamo al database "ogni volta che c'è un nuovo utente (auth.users), esegui public.handle_new_user()"
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
