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
            user_id
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching activity logs:", error);
        return { logs: [], error };
    }

    if (!data || data.length === 0) return { logs: [] };

    try {
        const userIds = [...new Set(data.map(log => log.user_id).filter(Boolean))];
        if (userIds.length > 0) {
            const { data: profiles } = await supabase
                .from('profiles')
                .select('id, email, salon_name')
                .in('id', userIds);

            if (profiles) {
                const profileMap = profiles.reduce((acc: any, p: any) => {
                    acc[p.id] = p;
                    return acc;
                }, {});

                const enrichedLogs = data.map(log => ({
                    ...log,
                    profiles: profileMap[log.user_id] || null
                }));

                return { logs: enrichedLogs };
            }
        }
    } catch(err) {
        console.error("Error attaching profiles to logs:", err);
    }

    return { logs: data || [] };
}
