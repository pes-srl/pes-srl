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

        const { data: profile } = await supabase.from('profiles').select('role').eq('id', currentUser.id).single();
        if (profile?.role !== 'Admin') return NextResponse.json({ error: "Accesso negato: solo gli Admin possono creare nuovi clienti" }, { status: 403 });

        const body = await request.json();
        const { email, password, salon_name, assigned_channel_ids } = body;

        if (!email || !password || !assigned_channel_ids || assigned_channel_ids.length === 0) {
            return NextResponse.json({ error: "Campi obbligatori mancanti (email, password, canali)" }, { status: 400 });
        }

        const supabaseAdmin = createAdminClient(supabaseUrl, supabaseServiceKey);

        // 1. Crea l'utente nell'Auth di Supabase bypassando le regole tramite Admin Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-conferma per non dover cliccare link
        });

        if (authError) {
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        const newUserId = authData.user.id;

        // 2. Aspettiamo un secondo che il Database crei il profilo di base tramite Trigger (standard Supabase)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 3. Aggiorna il profilo appena nato
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({
                plan_type: 'client',
                salon_name: salon_name || 'Nuovo Client',
                assigned_channel_ids: assigned_channel_ids,
                role: 'User'
            })
            .eq('id', newUserId);

        if (profileError) {
             // Fallback: se il trigger Auth non esisteva e update ha fallito, inseriamo forzatamente
             const { error: upsertError } = await supabaseAdmin
                .from('profiles')
                .upsert({
                    id: newUserId,
                    plan_type: 'client',
                    salon_name: salon_name || 'Nuovo Client',
                    assigned_channel_ids: assigned_channel_ids,
                    role: 'User'
                });
             if (upsertError) {
                 return NextResponse.json({ error: "Utente creato ma aggiornamento dati fallito: " + upsertError.message }, { status: 500 });
             }
        }

        return NextResponse.json({ success: true, user: authData.user }, { status: 200 });

    } catch (error: any) {
        console.error("Errore fatale in create-client API:", error);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}
