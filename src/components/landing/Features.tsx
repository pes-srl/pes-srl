"use client";

import { motion } from "framer-motion";
import { Headphones, ShieldCheck, Sparkles, Smartphone, BarChart3, Radio } from "lucide-react";

export function Features() {
    const features = [
        {
            title: "Persistent Audio Engine",
            description: "Music never stops. Navigate the entire platform without interrupting the audio stream.",
            icon: Headphones,
        },
        {
            title: "Smart Buffering",
            description: "Optimized for mobile connections inside salons. Rebuilds the stream automatically upon network drops.",
            icon: Smartphone,
        },
        {
            title: "Automated Marketing",
            description: "Schedule 'Tati' assistant voice spots and marketing overlays directly into your active channels.",
            icon: Sparkles,
        },
        {
            title: "Multi-Tenant Tiers",
            description: "Automated access logic based on Basic, Premium, or Ultra tier subscriptions.",
            icon: ShieldCheck,
        },
        {
            title: "Global Channel Manager",
            description: "Manage stream URLs universally. An update reflects instantly in every connected client player.",
            icon: Radio,
        },
        {
            title: "Real-time Analytics",
            description: "Track concurrent listeners per salon and understand which channels are performing best.",
            icon: BarChart3,
        },
    ];

    return (
        <section className="py-32 px-6 bg-zinc-950/50 border-y border-white/5 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-100">
                        Built for Scale & Atmosphere
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Every feature is designed to ensure maximum uptime, premium quality, and effortless administration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/10 transition-all group"
                        >
                            <div className="h-12 w-12 rounded-xl bg-linear-to-br from-fuchsia-500/20 to-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6 text-fuchsia-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-200 mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
