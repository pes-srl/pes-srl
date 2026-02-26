import { ChannelGrid } from "@/components/player/ChannelGrid";

export default function AreaClientePage() {
    return (
        <div className="pt-12 pb-32">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-2">My Stations</h1>
                <p className="text-zinc-400">Select a channel to set the atmosphere.</p>
            </div>

            <ChannelGrid />
        </div>
    );
}
