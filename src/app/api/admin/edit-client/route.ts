import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: "Missing Supabase Environment Variables" }, { status: 500 });
        }

        // Verifica che chi fa la richiesta sia un Admin
        const supabase = await createClient();
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

        const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', currentUser.id).single();
        if (adminProfile?.role !== 'Admin') return NextResponse.json({ error: "Accesso negato: solo gli Admin possono modificare clienti" }, { status: 403 });

        const body = await request.json();
        const { userId, email, password, salon_name, assigned_channel_id, plan_type } = body;

        if (!userId || !email) {
            return NextResponse.json({ error: "Campi obbligatori mancanti (userId, email)" }, { status: 400 });
        }

        const supabaseAdmin = createAdminClient(supabaseUrl, supabaseServiceKey);

        // 1. Update Auth info if email or password changed
        const updateAuthPayload: any = { email };
        if (password && password.trim() !== '') {
            updateAuthPayload.password = password;
        }

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(
            userId, 
            updateAuthPayload
        );

        if (authError) {
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        // 2. Update Profile info
        const updateProfilePayload: any = {
            salon_name: salon_name || 'Utente Modificato',
            assigned_channel_id: assigned_channel_id === "" ? null : assigned_channel_id
        };
        
        if (plan_type) {
            updateProfilePayload.plan_type = plan_type;
        }

        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update(updateProfilePayload)
            .eq('id', userId);

        if (profileError) {
             return NextResponse.json({ error: "Utente Auth modificato, ma errore sul profilo: " + profileError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, user: authData.user }, { status: 200 });

    } catch (error: any) {
        console.error("Errore fatale in edit-client API:", error);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}
