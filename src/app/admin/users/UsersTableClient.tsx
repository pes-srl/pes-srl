"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserRowActions } from "./UserRowActions";
import { formatDistanceToNow, differenceInMinutes, differenceInSeconds, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import { Search, Clock, Plus, X, Loader2 } from "lucide-react";
import { format } from "date-fns";

export function UsersTableClient({ initialProfiles, activeChannels = [] }: { initialProfiles: any[], activeChannels?: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [now, setNow] = useState(new Date());

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [formData, setFormData] = useState({
        userId: "",
        email: "",
        password: "",
        salon_name: "",
        assigned_channel_ids: [] as string[],
        plan_type: ""
    });

    const openCreateModal = () => {
        setIsEditing(false);
        setFormData({ userId: "", email: "", password: "", salon_name: "", assigned_channel_ids: [], plan_type: "client" });
        setErrorMsg("");
        setSuccessMsg("");
        setIsModalOpen(true);
    };

    const openEditModal = (user: any) => {
        setIsEditing(true);
        setFormData({
            userId: user.id || "",
            email: user.email || "",
            password: "", // We left it empty, to only update if typed
            salon_name: user.salon_name || "",
            assigned_channel_ids: user.assigned_channel_ids || (user.assigned_channel_id ? [user.assigned_channel_id] : []),
            plan_type: user.plan_type || "free"
        });
        setErrorMsg("");
        setSuccessMsg("");
        setIsModalOpen(true);
    };

    const handleCreateOrEditClient = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setIsSubmitting(true);

        const endpoint = isEditing ? "/api/admin/edit-client" : "/api/admin/create-client";

        // Avoid sending empty password on edit
        const payload = { ...formData };
        if (isEditing && payload.password === "") {
            delete payload.password;
        }

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Errore sconosciuto");
            }

            setSuccessMsg(isEditing ? "Utente aggiornato con successo!" : "Cliente creato con successo! Attendi il refresh...");
            setTimeout(() => {
                setIsModalOpen(false);
                setSuccessMsg("");
                window.location.reload(); 
            }, 1000);
        } catch (err: any) {
            setErrorMsg(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);

    const filteredProfiles = initialProfiles.filter((user) => {
        const searchUpper = searchTerm.toUpperCase();
        return user.salon_name?.toUpperCase().includes(searchUpper) || user.email?.toUpperCase().includes(searchUpper);
    });

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center max-w-full">
                <div className="flex items-center gap-2 w-full max-w-sm">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Cerca per istituto o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-fuchsia-500"
                        />
                    </div>
                </div>
                <Button 
                    onClick={openCreateModal}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 border-0 shadow-lg shrink-0"
                >
                    <Plus className="w-4 h-4" /> Nuovo Client
                </Button>
            </div>

            {/* MODALE NUOVO / MODIFICA CLIENT */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-[#17092b] border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 max-w-lg w-full relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isEditing ? `Modifica Utente` : `Crea Nuovo Client`}
                        </h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            {isEditing 
                                ? "Modifica l'email, la password (lascia vuoto per non cambiarla) e i dettagli del profilo." 
                                : "Questo utente avrà accesso esclusivo a un singolo canale. Usa una password sicura."}
                        </p>

                        <form onSubmit={handleCreateOrEditClient} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Email Cliente</label>
                                <Input 
                                    required={!isEditing}
                                    type="email" 
                                    placeholder="cliente@email.com"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
                                <Input 
                                    required={!isEditing}
                                    type="text" 
                                    placeholder={isEditing ? "Lascia vuoto per non modificare" : "Password di accesso"}
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Client</label>
                                <Input 
                                    required 
                                    type="text" 
                                    placeholder="Es. Palestra Fit"
                                    value={formData.salon_name}
                                    onChange={e => setFormData({...formData, salon_name: e.target.value})}
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                            
                            {isEditing && (
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1">Abbonamento</label>
                                    <select 
                                        value={formData.plan_type}
                                        onChange={e => setFormData({...formData, plan_type: e.target.value})}
                                        className="w-full bg-black/50 border border-white/10 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-500"
                                    >
                                        <option value="free">Free (Scaduto)</option>
                                        <option value="free_trial">Free Trial</option>
                                        <option value="basic">Basic</option>
                                        <option value="premium">Premium</option>
                                        <option value="client">Client Custom</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Canali Audio Esclusivi (Opzionale se non è Client)
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-white/10 rounded-md bg-black/50">
                                    {activeChannels.map(ch => (
                                        <label key={ch.id} className="flex items-center gap-2 cursor-pointer group">
                                            <input 
                                                type="checkbox"
                                                checked={formData.assigned_channel_ids.includes(ch.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFormData({...formData, assigned_channel_ids: [...formData.assigned_channel_ids, ch.id]});
                                                    } else {
                                                        setFormData({...formData, assigned_channel_ids: formData.assigned_channel_ids.filter(id => id !== ch.id)});
                                                    }
                                                }}
                                                className="rounded border-zinc-600 bg-zinc-800 text-fuchsia-500 focus:ring-fuchsia-500/50"
                                            />
                                            <span className="text-sm text-zinc-300 group-hover:text-white">{ch.name}</span>
                                        </label>
                                    ))}
                                    {activeChannels.length === 0 && (
                                        <span className="text-zinc-500 text-sm">Nessun canale attivo disponibile.</span>
                                    )}
                                </div>
                            </div>

                            {errorMsg && <p className="text-red-400 text-sm font-medium pt-2">{errorMsg}</p>}
                            {successMsg && <p className="text-emerald-400 text-sm font-medium pt-2">{successMsg}</p>}

                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-zinc-300">
                                    Annulla
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className={isEditing ? "bg-sky-600 hover:bg-sky-500 text-white" : "bg-fuchsia-600 hover:bg-fuchsia-500 text-white"}>
                                    {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                    {isEditing ? (isSubmitting ? "Salvataggio..." : "Salva Modifiche") : (isSubmitting ? "Creazione in corso..." : "Crea Utente Client")}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-950/50">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-zinc-400 font-medium">Client</TableHead>
                            <TableHead className="text-zinc-400 font-medium">Email</TableHead>
                            <TableHead className="hidden text-zinc-400 font-medium">Role</TableHead>
                            <TableHead className="text-zinc-400 font-medium">Abbonamento</TableHead>
                            <TableHead className="text-zinc-400 font-medium">Stato Abbonamento</TableHead>
                            <TableHead className="text-zinc-400 font-medium">Scadenza</TableHead>
                            <TableHead className="text-zinc-400 font-medium">Ultimo Accesso</TableHead>
                            <TableHead className="text-zinc-400 font-medium">Timing</TableHead>
                            <TableHead className="text-right text-zinc-400 font-medium">Azioni</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProfiles.map((user) => {
                            const isDbOnline = user.is_online === true;
                            const lastPingDate = user.last_ping_at ? parseISO(user.last_ping_at) : null;
                            const isPingRecent = lastPingDate && (differenceInMinutes(now, lastPingDate) < 3);

                            const isOnline = isDbOnline && isPingRecent;
                            let lastSeenText = "Mai connesso";

                            if (user.last_seen) {
                                lastSeenText = formatDistanceToNow(parseISO(user.last_seen), { addSuffix: true, locale: it });
                            }

                            let computedPlanType = user.plan_type;
                            let isPlanActive = user.plan_status === 'active';
                            let displayStatus = user.plan_status || 'no active';

                            if (!user.plan_type || user.plan_type === 'free') {
                                isPlanActive = false;
                                displayStatus = 'no active';
                                computedPlanType = 'free';
                            } else if (user.plan_type === 'free_trial' && user.trial_ends_at && new Date(user.trial_ends_at) < now) {
                                isPlanActive = false;
                                displayStatus = 'no active';
                                computedPlanType = 'free';
                            } else if ((user.plan_type === 'basic' || user.plan_type === 'premium') && user.subscription_expiration && new Date(user.subscription_expiration) < now) {
                                isPlanActive = false;
                                displayStatus = 'no active';
                            }

                            if (computedPlanType === 'client') {
                                isPlanActive = true;
                                displayStatus = 'Client Attivo';
                            } else if (!isPlanActive) {
                                displayStatus = 'no active';
                            }

                            return (
                                <TableRow key={user.id} className="border-white/10 hover:bg-white/5 transition-colors">
                                    <TableCell className="font-medium text-zinc-100">{user.salon_name || "Senza Nome"}</TableCell>
                                    <TableCell className="text-zinc-400">{user.email}</TableCell>
                                    <TableCell className="hidden">
                                        <Badge variant="outline" className={user.role === 'Admin' ? 'text-red-400 border-red-400/50' : 'text-zinc-300 border-white/20'}>
                                            {user.role === 'Admin' ? 'Admin' : 'User'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`
                                            bg-transparent uppercase text-[10px] font-bold tracking-wider
                                            ${computedPlanType === 'premium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/50' :
                                                computedPlanType === 'client' ? 'text-sky-400 border-sky-400/50' :
                                                computedPlanType === 'free_trial' ? 'text-emerald-400 border-emerald-400/50' :
                                                    computedPlanType === 'basic' ? 'text-indigo-400 border-indigo-400/50' :
                                                        'text-red-500 border-red-500/50'}
                                        `}>
                                            {computedPlanType ? computedPlanType.replace('_', ' ') : 'free'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 relative pl-4">
                                            <span className={`w-2 h-2 rounded-full absolute left-0 ${isPlanActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                                            <span className={isPlanActive ? 'text-zinc-300 capitalize' : 'text-zinc-500 capitalize'}>{displayStatus}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-zinc-300 text-sm whitespace-nowrap">
                                            {computedPlanType === 'client' ? 'Senza Limiti' : user.subscription_expiration
                                                ? format(parseISO(user.subscription_expiration), "dd MMM yyyy", { locale: it })
                                                : "-"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`relative flex h-2 w-2`}>
                                                    {isOnline && (
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                    )}
                                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-emerald-500' : 'bg-zinc-600'}`}></span>
                                                </span>
                                                <span className={`text-sm font-medium ${isOnline ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                                    {isOnline ? 'Online' : 'Offline'}
                                                </span>
                                            </div>
                                            {!isOnline && user.last_seen && (
                                                <span suppressHydrationWarning className="text-xs text-zinc-500 ml-4 truncate max-w-[150px]" title={new Date(user.last_seen).toLocaleString('it-IT')}>
                                                    {lastSeenText}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-2.5 py-1 rounded-md w-fit border border-white/10">
                                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                            <span className="text-sm font-medium">--</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <UserRowActions 
                                            user={user} 
                                            onEditClick={() => openEditModal(user)} 
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
