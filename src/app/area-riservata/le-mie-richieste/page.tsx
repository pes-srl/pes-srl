import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { HandCoins, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function MieRichiestePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch ONLY the requests for the currently logged-in user
    const { data: richieste, error } = await supabase
        .from("upgrade_requests")
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching user richieste:", error);
    }

    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20">
                        <HandCoins className="w-8 h-8 text-fuchsia-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Le mie Richieste</h1>
                        <p className="text-zinc-400 mt-2 text-lg">Storico delle tue richieste di upgrade ricevute dal nostro team.</p>
                    </div>
                </div>

                {error ? (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-6 rounded-2xl flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 text-red-400" />
                        <p>Si è verificato un errore nel caricamento del tuo storico. Riprova più tardi.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {!richieste || richieste.length === 0 ? (
                            <div className="bg-[#17092b] border border-white/5 rounded-3xl p-12 text-center shadow-xl">
                                <HandCoins className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Nessuna richiesta trovata</h3>
                                <p className="text-zinc-400 max-w-md mx-auto">Non hai ancora inviato nessuna richiesta di passaggio a un piano superiore.</p>
                            </div>
                        ) : (
                            richieste.map((req: any) => {
                                // Determinare l'aspetto in base allo stato
                                let statusConfig = {
                                    icon: Clock,
                                    label: 'In Lavorazione',
                                    colorClass: 'text-yellow-400',
                                    bgClass: 'bg-yellow-400/10',
                                    borderClass: 'border-yellow-400/20',
                                    message: 'Il nostro team sta analizzando la tua richiesta. Ti contatteremo a breve.'
                                };

                                if (req.status === 'approved') {
                                    statusConfig = {
                                        icon: CheckCircle2,
                                        label: 'Approvata',
                                        colorClass: 'text-emerald-400',
                                        bgClass: 'bg-emerald-400/10',
                                        borderClass: 'border-emerald-400/20',
                                        message: 'Complimenti! Il tuo upgrade è stato confermato ed è attivo.'
                                    };
                                } else if (req.status === 'contacted') {
                                    statusConfig = {
                                        icon: CheckCircle2,
                                        label: 'Contattato',
                                        colorClass: 'text-blue-400',
                                        bgClass: 'bg-blue-400/10',
                                        borderClass: 'border-blue-400/20',
                                        message: 'Ti abbiamo inviato un\'e-mail per procedere. Controlla la tua casella di posta.'
                                    };
                                } else if (req.status === 'rejected') {
                                    statusConfig = {
                                        icon: AlertCircle,
                                        label: 'Rifiutata / Annullata',
                                        colorClass: 'text-red-400',
                                        bgClass: 'bg-red-400/10',
                                        borderClass: 'border-red-400/20',
                                        message: 'Questa richiesta è stata annullata.'
                                    };
                                }

                                const StatusIcon = statusConfig.icon;

                                return (
                                    <div key={req.id} className="bg-[#17092b] border border-white/5 hover:border-white/10 transition-colors rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">

                                        {/* Status Header */}
                                        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-full ${statusConfig.bgClass} ${statusConfig.borderClass} border`}>
                                                    <StatusIcon className={`w-6 h-6 ${statusConfig.colorClass}`} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                                            PIANO {req.requested_plan}
                                                        </h3>
                                                        <span className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded-md border ${statusConfig.colorClass} ${statusConfig.bgClass} ${statusConfig.borderClass}`}>
                                                            {statusConfig.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-zinc-400 text-sm mt-1 flex items-center gap-1">
                                                        Inviata il: <strong className="text-zinc-300">{format(new Date(req.created_at), "dd MMMM yyyy", { locale: it })}</strong>
                                                        alle {format(new Date(req.created_at), "HH:mm")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Helper Message based on Status */}
                                        <div className={`mb-6 p-4 rounded-xl text-sm md:text-base ${statusConfig.bgClass} ${statusConfig.colorClass} border ${statusConfig.borderClass}`}>
                                            {statusConfig.message}
                                        </div>

                                        {/* Billing Details Recap */}
                                        <div className="mt-6">
                                            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Riepilogo Dati Inviati</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                                <div>
                                                    <p className="text-xs text-zinc-500 mb-1">Ragione Sociale</p>
                                                    <p className="text-zinc-200 font-medium">{req.billing_details?.ragione_sociale}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-zinc-500 mb-1">Partita IVA</p>
                                                    <p className="text-zinc-200 font-medium">{req.billing_details?.partita_iva}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-zinc-500 mb-1">Istituto</p>
                                                    <p className="text-zinc-200 font-medium">{req.billing_details?.nome_istituto} ({req.billing_details?.metri_quadri})</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
