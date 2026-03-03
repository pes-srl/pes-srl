-- Create activity_logs table for dashboard overview

CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Turn on RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Note: In most cases, logs are inserted from Server Routes or Server Actions
-- using the Service Role Key or the user's authenticated session.

-- Policy 1: Users can insert their own logs
CREATE POLICY "Users can insert their own logs"
ON public.activity_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy 2: Admins can view all logs
CREATE POLICY "Admins can view all logs"
ON public.activity_logs
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'Admin'
  )
);

-- Index for descending sort on dashboard
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
