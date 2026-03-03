'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Logs a 'play' event for a specific channel.
 */
export async function logChannelPlay(channelId: string) {
    if (!channelId) return { success: false, error: 'missing channelId' };

    const supabase = await createClient()

    // Opcional: obtener el user actual
    const { data: { user } } = await supabase.auth.getUser()

    // Insertar log. Si no hay usuario, inserta null en user_id
    const payload: any = { channel_id: channelId, action: 'play' };
    if (user) {
        payload.user_id = user.id;
    }

    const { error } = await supabase
        .from('channel_analytics')
        .insert([payload])

    if (error) {
        // Ignoramos silenciosamente si la tabla todavía no existe o falla (por ejemplo antes de hacer la migración)
        console.error('Error logging channel analytics:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

/**
 * Gets the top 5 most listened channels in the last 7 days.
 */
export async function getTopChannels(days: number = 7) {
    const supabase = await createClient();

    // In Supabase, standard RPC for aggregation is ideal. 
    // If not available, we can rely on standard select and JS side counting,
    // though a SQL view or RPC is better.
    // For now we'll fetch logs from the last N days. If a client has millions of rows, use an RPC.

    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    const { data, error } = await supabase
        .from('channel_analytics')
        .select(`
            channel_id,
            radio_channels(name)
        `)
        .gte('created_at', dateLimit.toISOString());

    if (error || !data) {
        return { topChannels: [], error };
    }

    // Count occurrences
    const counts: Record<string, { count: number, name: string }> = {};

    data.forEach((row: any) => {
        const id = row.channel_id;
        const name = row.radio_channels?.name || 'Canale Sconosciuto';
        if (!counts[id]) {
            counts[id] = { count: 0, name };
        }
        counts[id].count++;
    });

    // Convert to array and sort descending
    const sortedChannels = Object.entries(counts)
        .map(([id, info]) => ({ id, name: info.name, plays: info.count }))
        .sort((a, b) => b.plays - a.plays)
        .slice(0, 5); // top 5

    return { topChannels: sortedChannels };
}
