import { BasicHeroChannel } from "@/components/player/BasicHeroChannel";
import { ChannelGrid } from "@/components/player/ChannelGrid";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Paywall } from "./Paywall";

export const dynamic = "force-dynamic";

export default async function AreaClientePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("salon_name, role, plan_type, trial_ends_at, assigned_channel_id, assigned_channel_ids")
        .eq("id", user.id)
        .single();

    const isAdmin = profile?.role === 'Admin';
    let isExpired = profile?.plan_type === 'free';

    if (profile?.plan_type === 'free_trial' && profile?.trial_ends_at) {
        const trialEndDate = new Date(profile.trial_ends_at);
        const daysLeft = Math.ceil((trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 0) isExpired = true;
    }

    // Fetching base channels
    const { data: rawChannels } = await supabase
        .rpc('get_authorized_channels', { req_user_id: user.id });

    let channels = rawChannels || [];

    // Se l'utente è "client" puro, sovrascrivi tutto e pesca unicamente 
    // i radio_channels corrispondenti al suo assigned_channel_ids (o fallback su old_id)
    const clientChannelIds = profile?.plan_type === 'client' 
        ? (profile.assigned_channel_ids?.length > 0 ? profile.assigned_channel_ids : (profile.assigned_channel_id ? [profile.assigned_channel_id] : []))
        : [];

    if (profile?.plan_type === 'client' && clientChannelIds.length > 0) {
        const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data: clientChannels } = await supabaseAdmin
            .from('radio_channels')
            .select('*')
            .in('id', clientChannelIds);
            
        if (clientChannels && clientChannels.length > 0) {
            channels = clientChannels;
        } else {
            channels = []; // Nessun canale valido
        }
    } else if (profile?.plan_type === 'premium') {
        const { data: premiumExclusives } = await supabase
            .from('radio_channels')
            .select('*')
            .in('id', [
                'ef6cd00d-1966-4aff-b8a5-4d416deae0ec', 
                '850d1e16-7842-4e12-a66f-8879a0662d57' 
            ])
            .eq('is_active', true);

        if (premiumExclusives && premiumExclusives.length > 0) {
            const existingIds = new Set(channels.map((c: any) => c.id));
            const newChannels = premiumExclusives.filter((c: any) => !existingIds.has(c.id));
            channels = [...channels, ...newChannels];
        }
    }

    // Define the correct generic channel for standards
    const getStandardChannel = () => {
        if (profile?.plan_type === 'premium') {
            return channels?.find((c: any) => c.name.toLowerCase().includes('premium') || c.name.toLowerCase() === 'beautify channel premium') || null;
        }
        return channels?.find((c: any) => c.name.toLowerCase().includes('basic') || c.name.toLowerCase() === 'beautify channel basic') || null;
    }

    return (
        <div className="pt-24 pb-32">
            {(!isExpired || isAdmin) ? (
                <>
                    {(profile?.plan_type === 'free_trial' || profile?.plan_type === 'basic' || profile?.plan_type === 'premium' || profile?.plan_type === 'client') && (
                        <div className="mb-8">
                            {profile?.plan_type === 'client' && channels.length > 1 ? (
                                <ChannelGrid initialChannels={channels} />
                            ) : (
                                <BasicHeroChannel
                                    planType={profile?.plan_type}
                                    channel={profile?.plan_type === 'client' ? (channels[0] || null) : getStandardChannel()}
                                />
                            )}
                        </div>
                    )}
                </>
            ) : (
                <Paywall salonName={profile?.salon_name || user.email || 'Utente'} userEmail={user.email} />
            )}
        </div>
    );
}
