-- Aggiorna la funzione per evitare l'iserimento in "subscriptions" (che non esiste) e "is_admin"
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
