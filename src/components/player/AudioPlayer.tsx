"use client";

import { useEffect, useRef, useState } from "react";
import { useAudioStore } from "@/store/useAudioStore";
import { Play, Pause, Volume2, Loader2, Radio } from "lucide-react";

export function AudioPlayer() {
    const { currentChannel, isPlaying, volume, bufferingState, togglePlay, setBufferingState } = useAudioStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    // Initialize or update audio stream
    useEffect(() => {
        if (!audioRef.current || !currentChannel) return;

        const audio = audioRef.current;

        // Only set src if it changed to avoid interrupting the current stream
        if (audio.src !== currentChannel.streamUrl) {
            audio.src = currentChannel.streamUrl;
            audio.load();
            if (isPlaying) {
                audio.play().catch(console.error);
            }
        }
    }, [currentChannel, isPlaying]);

    // Handle Play/Pause changes from store
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error("Autoplay prevented:", e);
                togglePlay(); // Revert state if prevented
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, togglePlay]);

    // Handle Volume changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Smart Buffering & Event Listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlaying = () => {
            setBufferingState('playing');
            setRetryCount(0); // Reset retries on success
        };

        const onWaiting = () => setBufferingState('buffering');

        const onError = () => {
            console.error("Audio stream error");
            setBufferingState('error');

            // Smart Buffering logic: automatic reconnection for mobile drops
            if (currentChannel && retryCount < 5) {
                setTimeout(() => {
                    console.log(`Reconnecting stream... Attempt ${retryCount + 1}`);
                    setRetryCount(prev => prev + 1);
                    audio.load();
                    if (isPlaying) audio.play().catch(console.error);
                }, 3000 * (retryCount + 1)); // Exponential backoff
            }
        };

        audio.addEventListener("playing", onPlaying);
        audio.addEventListener("waiting", onWaiting);
        audio.addEventListener("error", onError);
        audio.addEventListener("stalled", onWaiting);

        return () => {
            audio.removeEventListener("playing", onPlaying);
            audio.removeEventListener("waiting", onWaiting);
            audio.removeEventListener("error", onError);
            audio.removeEventListener("stalled", onWaiting);
        };
    }, [currentChannel, isPlaying, retryCount, setBufferingState]);

    if (!currentChannel) return null;

    return (
        <>
            <audio ref={audioRef} preload="none" />

            <div className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 flex items-center px-6 z-50">
                <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">

                    <div className="flex items-center gap-4 w-1/3">
                        <div className="h-14 w-14 bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {currentChannel.imageUrl ? (
                                <img src={currentChannel.imageUrl} alt={currentChannel.name} className="w-full h-full object-cover" />
                            ) : (
                                <Radio className="w-6 h-6 text-zinc-500" />
                            )}
                        </div>
                        <div>
                            <h4 className="text-zinc-100 font-medium truncate">{currentChannel.name}</h4>
                            <p className="text-xs text-fuchsia-400 capitalize flex items-center gap-2">
                                {bufferingState === 'buffering' && <Loader2 className="w-3 h-3 animate-spin" />}
                                {bufferingState === 'error' ? 'Connection Lost' : bufferingState}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center items-center gap-6">
                        <button
                            onClick={togglePlay}
                            className="h-14 w-14 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying && bufferingState !== 'buffering' ? (
                                <Pause className="w-6 h-6 fill-current" />
                            ) : (
                                <Play className="w-6 h-6 fill-current ml-1" />
                            )}
                        </button>
                    </div>

                    <div className="w-1/3 flex justify-end items-center gap-4">
                        <Volume2 className="w-5 h-5 text-zinc-400" />
                        <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-fuchsia-500 to-indigo-500"
                                style={{ width: `${volume * 100}%` }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
