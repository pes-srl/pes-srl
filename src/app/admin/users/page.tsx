import { createClient } from "@/utils/supabase/server";
import { UsersTableClient } from "./UsersTableClient";

export const dynamic = "force-dynamic";

export default async function UsersManagementPage() {
    const supabase = await createClient();

    // Fetch all profiles from the database, newest first
    const { data: users, error } = await supabase
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
