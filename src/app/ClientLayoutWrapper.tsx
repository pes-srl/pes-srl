"use client";

import { usePathname } from "next/navigation";
import { HeaderNew } from "@/components/homepagenew/HeaderNew";
import { FooterNew } from "@/components/homepagenew/FooterNew";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  user: any;
  profile: any;
}

export function ClientLayoutWrapper({ children, user, profile }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isAreaRiservata = pathname.startsWith("/area-riservata");

  return (
    <>
      {!isHomepage && <HeaderNew initialUser={user} initialProfile={profile} />}
      <div className="flex-1">
        {children}
      </div>
      {!isHomepage && <FooterNew />}
    </>
  );
}
