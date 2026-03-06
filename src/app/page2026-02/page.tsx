import { Plus_Jakarta_Sans } from "next/font/google";
import { Hero2026_02 } from "@/components/homepagenew/Hero2026_02";
import { InfoBlocks2026_02 } from "@/components/homepagenew/InfoBlocks2026_02";
import { Pricing2026_02 } from "@/components/homepagenew/Pricing2026_02";
import { BottomCTA2026_02 } from "@/components/homepagenew/BottomCTA2026_02";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function HomePage2026_02() {
    return (
        <main className={`min-h-screen bg-black selection:bg-[#E84F9A]/30 ${jakarta.className}`}>
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 flex justify-center bg-black pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#637BD0]/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#CFF63D]/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 w-full overflow-hidden">
                <Hero2026_02 />
                <InfoBlocks2026_02 />
                <Pricing2026_02 />
                <BottomCTA2026_02 />
            </div>
        </main>
    );
}
