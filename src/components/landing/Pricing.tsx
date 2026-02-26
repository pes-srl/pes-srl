"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
    {
        name: "Basic",
        price: "€29",
        description: "Essential ambient music for a single salon room.",
        features: [
            "1 Concurrent Stream",
            "Standard Audio Quality (128kbps)",
            "Standard Channels",
            "No Voice Spots",
        ],
        highlight: false,
    },
    {
        name: "Premium",
        price: "€59",
        description: "Advanced controls and multi-room syncing.",
        features: [
            "3 Concurrent Streams",
            "High Quality Audio (320kbps)",
            "Premium 'Relax' & 'Energy' Channels",
            "1 Custom Voice Spot / Hour",
            "Smart Buffering Engine",
        ],
        highlight: true,
    },
    {
        name: "Ultra",
        price: "€99",
        description: "The complete custom audio branding experience.",
        features: [
            "Unlimited Concurrent Streams (per Location)",
            "Lossless Audio Support",
            "Full Channel Catalog Access",
            "Unlimited 'Tati' Voice Spots Scheduling",
            "Real-time Analytics Dashboard",
        ],
        highlight: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-100">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Choose the perfect atmosphere package for your beauty center size.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className={`relative p-8 rounded-3xl ${plan.highlight
                                ? "bg-linear-to-b from-fuchsia-500/10 to-indigo-500/10 border-fuchsia-500/50 shadow-2xl shadow-fuchsia-500/10"
                                : "bg-white/2 border-white/10 hover:border-white/20"
                                } border backdrop-blur-sm transition-all`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-fuchsia-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-zinc-100 mb-2">{plan.name}</h3>
                                <p className="text-sm text-zinc-400 h-10">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-5xl font-bold text-white">{plan.price}</span>
                                <span className="text-zinc-500">/mo</span>
                            </div>

                            <ul className="space-y-4 mb-8 h-48">
                                {plan.features.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-fuchsia-400' : 'text-zinc-600'}`} />
                                        <span className="text-zinc-300 text-sm">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.highlight ? "default" : "outline"}
                                className={`w-full rounded-xl h-12 ${plan.highlight
                                    ? "bg-white text-zinc-950 hover:bg-zinc-200"
                                    : "bg-transparent text-white border-white/20 hover:bg-white/5"
                                    }`}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
