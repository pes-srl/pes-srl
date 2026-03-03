'use server'

import { createClient } from '@/utils/supabase/server'

export type ActionType = 'login' | 'logout' | 'signup_freetrial' | 'upgrade_request';

/**
 * Logs a system activity for the dashboard.
 */
export async function logActivity(userId: string, actionType: ActionType, metadata?: any) {
    if (!userId || !actionType) return { success: false, error: 'missing parameters' };

    const supabase = await createClient()

    const { error } = await supabase
        .from('activity_logs')
        .insert([{
            user_id: userId,
            action_type: actionType,
            metadata: metadata || null
        }])

    if (error) {
        console.error('Error logging activity:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

/**
 * Retrieves the latest activity logs for the admin dashboard.
 */
export async function getRecentActivity(limit: number = 15) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { logs: [], error: 'Not authorized' };

    const { data, error } = await supabase
        .from('activity_logs')
        .select(`
            id,
            action_type,
            metadata,
            created_at,
            profiles(
                salon_name,
                email
            )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching activity logs:", error);
        return { logs: [], error };
    }

    return { logs: data || [] };
}
