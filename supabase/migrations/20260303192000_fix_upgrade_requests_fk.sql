-- In Supabase, if we want to join `upgrade_requests` with `profiles`,
-- we need a foreign key relationship directly between them if relying on PostgREST auto-detection.
-- `upgrade_requests.user_id` currently points to `auth.users(id)`.
-- `profiles.id` also points to `auth.users(id)`.
-- PostgREST cannot automatically join through auth.users.
-- We should add a direct FK to `profiles.id` to allow `profiles(...)` in the SELECT query.

ALTER TABLE public.upgrade_requests
DROP CONSTRAINT IF EXISTS upgrade_requests_user_id_fkey;

ALTER TABLE public.upgrade_requests
ADD CONSTRAINT upgrade_requests_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
