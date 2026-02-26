"use client";

import { motion } from "framer-motion";
import { ArrowRight, Music, RadioTower, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl max-auto text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-zinc-300">Next-Generation Audio for Beauty Centers</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-linear-to-r from-zinc-100 via-zinc-300 to-zinc-500 text-transparent bg-clip-text">
                    Elevate Your Salon's <br className="hidden md:block" />
                    <span className="bg-linear-to-r from-fuchsia-400 to-indigo-500 text-transparent bg-clip-text">Musical Atmosphere</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    The ultimate multi-tenant radio platform. Provide your clients with a continuous, premium audio experience tailored for Massages, Barbers, and Estetica.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/login">
                        <Button size="lg" className="h-14 px-8 text-base bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all rounded-full">
                            Enter Area Cliente <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/pricing" className="group flex items-center gap-2 h-14 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md text-zinc-300">
                        View Plans
                    </Link>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-24 w-full max-w-5xl mx-auto relative"
            >
                {/* Abstract visual representation of the web app / player */}
                <div className="aspect-video rounded-2xl md:rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl relative overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-linear-to-br from-fuchsia-500/10 via-transparent to-indigo-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="flex flex-col items-center justify-center p-8 text-center relative z-10 w-full">
                        <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10 backdrop-blur-md relative">
                            <div className="absolute inset-0 rounded-full border border-fuchsia-500/30 animate-[spin_4s_linear_infinite]" />
                            <Music className="w-10 h-10 text-fuchsia-400" />
                        </div>
                        <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-linear-to-r from-fuchsia-500 to-indigo-500 w-1/3 animate-[pulse_2s_ease-in-out_infinite]" />
                        </div>
                        <div className="h-2 w-32 bg-white/5 rounded-full" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
