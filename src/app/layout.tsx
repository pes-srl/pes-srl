import type { Metadata } from "next";
import { Figtree, Montserrat } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Beautify Channel",
  description: "Next-gen audio streaming for beauty centers.",
  icons: {
    icon: "/favicon512x512.png",
    shortcut: "/favicon512x512.png",
    apple: "/favicon512x512.png",
  },
};

import { ClientLayoutWrapper } from "./ClientLayoutWrapper";
import { AuthHashCatcher } from "@/components/AuthHashCatcher";
import { Toaster } from "@/components/ui/sonner";
import { PresencePing } from "@/components/PresencePing";

import { createClient } from "@/utils/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("salon_name, role, plan_type, assigned_channel_id, assigned_channel_ids")
      .eq("id", user.id)
      .single();
    profile = data;

    if (profile?.plan_type === 'client') {
      const { createClient: createAdmin } = await import("@supabase/supabase-js");
      const supabaseAdmin = createAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const cIds = profile.assigned_channel_ids?.length > 0 ? profile.assigned_channel_ids : (profile.assigned_channel_id ? [profile.assigned_channel_id] : []);
      if (cIds.length > 0) {
        const { data: channels } = await supabaseAdmin.from('radio_channels').select('name').in('id', cIds);
        if (channels && channels.length > 0) {
            (profile as any).primary_channel_name = channels[0].name;
        }
      }
    }
  }

  return (
    <html lang="it">
      <body
        className={`${figtree.variable} ${montserrat.variable} font-sans antialiased bg-zinc-950 text-zinc-50 flex flex-col min-h-screen`}
      >
        <AuthHashCatcher />
        {user && <PresencePing />}
        <ClientLayoutWrapper user={user} profile={profile}>
          {children}
        </ClientLayoutWrapper>
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}
