"use client";

import { useState } from "react";
import { updateUpgradeRequestStatus } from "@/app/actions/upgrade-actions";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export function StatusUpdater({
    requestId,
    currentStatus,
}: {
    requestId: string;
    currentStatus: string;
}) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true);
        const result = await updateUpgradeRequestStatus(requestId, newStatus);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Stato aggiornato con successo!");
        }

        setIsUpdating(false);
    };

    return (
        <div className="flex items-center gap-3">
            <Select
                defaultValue={currentStatus}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
            >
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white focus:ring-fuchsia-500">
                    <SelectValue placeholder="Seleziona stato" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-white/10 text-white">
                    <SelectItem value="pending" className="focus:bg-white/10">In Attesa</SelectItem>
                    <SelectItem value="contacted" className="focus:bg-white/10 text-blue-400">Contattato</SelectItem>
                    <SelectItem value="approved" className="focus:bg-white/10 text-emerald-400">Approvata</SelectItem>
                    <SelectItem value="rejected" className="focus:bg-white/10 text-red-400">Rifiutata</SelectItem>
                </SelectContent>
            </Select>
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin text-fuchsia-400" />}
        </div>
    );
}
