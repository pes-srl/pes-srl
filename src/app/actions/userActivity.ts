"use server";

import { createClient } from "@/utils/supabase/server";

export async function pingUserActivity() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: "Not authenticated" };
        }

        // Update the last_seen timestamp
        const { error } = await supabase
            .from("profiles")
            .update({ last_seen: new Date().toISOString() })
            .eq("id", user.id);

        if (error) {
            console.error("Failed to update user activity:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (e: any) {
        console.error("Error in pingUserActivity:", e);
        return { success: false, error: e.message };
    }
}
