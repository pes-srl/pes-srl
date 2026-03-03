"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { AdminSidebarNav } from "./AdminSidebarNav";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Ensure title is accessible

export function MobileAdminNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close sheet on navigation automatically
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10 text-zinc-300">
                    <Menu className="w-8 h-8" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0 bg-zinc-950 border-r border-white/10 text-white flex flex-col">
                <VisuallyHidden>
                    <SheetTitle>Menu Amministrazione</SheetTitle>
                </VisuallyHidden>

                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold tracking-tight text-white/90">Navigazione Admin</h2>
                </div>

                <div className="flex-1 overflow-y-auto py-2">
                    <AdminSidebarNav />
                </div>

                <div className="p-4 border-t border-white/10 mt-auto bg-black/20">
                    <form action="/auth/signout" method="post" className="w-full">
                        <button className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                            <LogOut className="w-5 h-5" />
                            <span className="font-bold">Sign Out</span>
                        </button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
