import { AudioPlayer } from "@/components/player/AudioPlayer";

export default function AreaClienteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-950 relative pb-24">
            {/* 
        Header could go here:
        <AreaClienteHeader /> 
      */}

            <main className="mx-auto max-w-7xl pt-8 px-6">
                {children}
            </main>

            <AudioPlayer />
        </div>
    );
}
