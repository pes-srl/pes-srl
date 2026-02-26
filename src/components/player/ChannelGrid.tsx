"use client";

import { useAudioStore } from "@/store/useAudioStore";
import { Play, Pause, Radio } from "lucide-react";
import { motion } from "framer-motion";

// Temporary mock data until Supabase integration
const mockChannels = [
    {
        id: "1",
        name: "Relaxing Spa",
        streamUrl: "https://stream.zeno.fm/t3q59q5q5mruv", // Placeholder valid endless URL or similar
        imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop",
        tier: "Basic",
    },
    {
        id: "2",
        name: "Barber Vibes",
        streamUrl: "https://stream.zeno.fm/f3yv5z9x5mruv", // Placeholder
        imageUrl: "https://images.unsplash.com/photo-1622295679905-c3f2d2b6b0c2?w=500&auto=format&fit=crop",
        tier: "Basic",
    },
    {
        id: "3",
        name: "Premium Deep Focus",
        streamUrl: "https://stream.zeno.fm/x5p9c8m25mruv", // Placeholder
        imageUrl: "https://images.unsplash.com/photo-1517409088424-d1d784df00a4?w=500&auto=format&fit=crop",
        tier: "Premium",
    },
    {
        id: "4",
        name: "Ultra Exclusive",
        streamUrl: "https://stream.zeno.fm/h2v5b3y85mruv", // Placeholder
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop",
        tier: "Ultra",
    }
];

export function ChannelGrid() {
    const { currentChannel, isPlaying, togglePlay, setChannel } = useAudioStore();

    const handleChannelClick = (channel: typeof mockChannels[0]) => {
        if (currentChannel?.id === channel.id) {
            togglePlay();
        } else {
            setChannel(channel);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockChannels.map((channel, idx) => {
                const isActive = currentChannel?.id === channel.id;
                const isCurrentlyPlaying = isActive && isPlaying;

                return (
                    <motion.div
                        key={channel.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() => handleChannelClick(channel)}
                        className={`
              relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300
              ${isActive ? 'ring-2 ring-fuchsia-500 shadow-[0_0_30px_-5px_var(--color-fuchsia-500)]' : 'border border-white/10 hover:border-white/30'}
            `}
                    >
                        {/* Background Image & Overlay */}
                        <div className="aspect-square w-full relative">
                            <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors z-10" />
                            {channel.imageUrl ? (
                                <img
                                    src={channel.imageUrl}
                                    alt={channel.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                    <Radio className="w-12 h-12 text-zinc-700" />
                                </div>
                            )}

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300
                  ${isActive ? 'bg-fuchsia-500/80 text-white' : 'bg-white/10 text-white/0 group-hover:bg-white/20 group-hover:text-white'}
                `}>
                                    {isCurrentlyPlaying ? (
                                        <Pause className="w-8 h-8 fill-current" />
                                    ) : (
                                        <Play className="w-8 h-8 fill-current ml-1" />
                                    )}
                                </div>
                            </div>

                            {/* Tier Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg
                  ${channel.tier === 'Ultra' ? 'bg-zinc-950/80 text-yellow-400 border border-yellow-400/50' :
                                        channel.tier === 'Premium' ? 'bg-zinc-950/80 text-fuchsia-400 border border-fuchsia-400/50' :
                                            'bg-zinc-950/80 text-zinc-300 border border-white/20'}
                `}>
                                    {channel.tier}
                                </span>
                            </div>
                        </div>

                        {/* Content info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20 pt-12">
                            <h3 className="text-lg font-semibold text-white truncate">{channel.name}</h3>
                            {isActive && (
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-fuchsia-500 rounded-full"
                                                animate={isCurrentlyPlaying ? { height: ["4px", "16px", "4px"] } : { height: "4px" }}
                                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-fuchsia-400 font-medium">Playing</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
