import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { UsersTableClient } from "./UsersTableClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UsersManagementPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect("/login");

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'Admin') return redirect("/");

    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch all profiles from the database, newest first
    const { data: users, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .order('salon_name', { ascending: true });

    // Fallback to empty array in case of error
    const profiles = users || [];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Istituti & Utenti</h1>
                    <p className="text-zinc-400">Gestisci i piani, gli abbonamenti e i ruoli dei tuoi clienti.</p>
                </div>
            </div>

            <UsersTableClient initialProfiles={profiles} />
        </div>
    );
}
