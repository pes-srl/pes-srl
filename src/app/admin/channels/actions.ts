"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function updateChannelAdmin(channelId: string, data: any) {
    const supabase = await createClient();

    // Verify current user is an Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Non autorizzato." };

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "Admin") {
        return { error: "Accesso negato. Solo gli admin possono modificare i canali." };
    }

    // Create a privileged client that bypasses RLS
    const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    // Update the channel
    const { error } = await supabaseAdmin
        .from("radio_channels")
        .update({
            name: data.name,
            slug: data.slug,
            stream_url_hls: data.stream_url_hls,
            stream_url_mp3: data.stream_url_mp3,
            stream_url_mp3_mobile: data.stream_url_mp3_mobile,
            subtitle: data.subtitle,
            is_default: data.is_default
        })
        .eq("id", channelId);

    if (error) {
        console.error("Server Action updateChannel Error:", error);
        return { error: error.message };
    }

    revalidatePath(`/admin/channels/${channelId}`);
    revalidatePath("/admin/channels");
    revalidatePath("/area-riservata");

    return { success: true };
}
