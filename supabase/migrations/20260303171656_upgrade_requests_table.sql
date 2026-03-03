-- Create the upgrade_requests table
CREATE TABLE IF NOT EXISTS public.upgrade_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    requested_plan TEXT NOT NULL CHECK (requested_plan IN ('basic', 'premium')),
    billing_details JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.upgrade_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own requests
CREATE POLICY "Users can insert their own upgrade requests"
ON public.upgrade_requests FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can view their own requests
CREATE POLICY "Users can view their own upgrade requests"
ON public.upgrade_requests FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Admins can view all requests
CREATE POLICY "Admins can view all upgrade requests"
ON public.upgrade_requests FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'Admin'
  )
);

-- Policy: Admins can update all requests
CREATE POLICY "Admins can update all upgrade requests"
ON public.upgrade_requests FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'Admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'Admin'
  )
);

-- Create index for faster lookups by user and status
CREATE INDEX IF NOT EXISTS idx_upgrade_requests_user_id ON public.upgrade_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_upgrade_requests_status ON public.upgrade_requests(status);
