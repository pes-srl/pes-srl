import { getTopChannels } from "@/app/actions/analytics-actions";
import { Headphones, Trophy } from "lucide-react";

export async function TopChannelsWidget() {
    const { topChannels, error } = await getTopChannels(7); // Last 7 days

    // We'll calculate a percentage relative to the #1 channel for visual bars
    const maxPlays = topChannels && topChannels.length > 0 ? topChannels[0].plays : 1;

    return (
        <div className="lg:col-span-2 p-8 rounded-2xl bg-[#17092b] border border-white/5 shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="font-bold text-xl text-white">Canali più ascoltati</h3>
                    <p className="text-zinc-400 text-sm mt-1">Classifica degli ultimi 7 giorni</p>
                </div>
                <div className="p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20">
                    <Trophy className="w-5 h-5 text-fuchsia-400" />
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 relative z-10">
                {error || !topChannels ? (
                    <div className="flex items-center justify-center p-8 border border-dashed border-white/10 rounded-xl text-zinc-500">
                        Nessun dato analitico disponibile. (Verifica di aver eseguito la migrazione SQL).
                    </div>
                ) : topChannels.length === 0 ? (
                    <div className="flex items-center justify-center p-8 border border-dashed border-white/10 rounded-xl text-zinc-500 text-center">
                        Nessun riproduzione registrata negli ultimi 7 giorni.
                    </div>
                ) : (
                    topChannels.map((channel, i) => {
                        const widthPct = Math.max((channel.plays / maxPlays) * 100, 5); // bare minimum 5% to show the bar
                        return (
                            <div key={channel.id} className="group cursor-default">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-black text-lg ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-zinc-300' : i === 2 ? 'text-orange-400' : 'text-zinc-500'}`}>
                                            #{i + 1}
                                        </span>
                                        <span className="font-medium text-white group-hover:text-fuchsia-400 transition-colors">
                                            {channel.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-zinc-400">
                                        <Headphones className="w-4 h-4" />
                                        <span className="text-sm font-bold text-white">{channel.plays}</span>
                                    </div>
                                </div>
                                {/* Visual progress bar */}
                                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-300' : 'bg-gradient-to-r from-fuchsia-600 to-fuchsia-400'}`}
                                        style={{ width: `${widthPct}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}
