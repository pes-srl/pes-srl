-- Migration: Create channel_analytics table

CREATE TABLE IF NOT EXISTS public.channel_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    channel_id UUID REFERENCES public.radio_channels(id) ON DELETE CASCADE,
    action TEXT NOT NULL DEFAULT 'play',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Turn on RLS
ALTER TABLE public.channel_analytics ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can insert their own analytics logs
CREATE POLICY "Users can insert their own analytics logs"
ON public.channel_analytics
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy 2: Admins can view all analytics
CREATE POLICY "Admins can view all analytics"
ON public.channel_analytics
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'Admin'
  )
);

-- Index for faster querying by date and channel
CREATE INDEX IF NOT EXISTS idx_channel_analytics_created_at ON public.channel_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_channel_analytics_channel_id ON public.channel_analytics(channel_id);
