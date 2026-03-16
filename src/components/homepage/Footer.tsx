"use client";

import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-100 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-zinc-500 text-sm font-medium text-center space-y-2">
            <p>&copy; {currentYear} People Experience Solution. Tutti i diritti riservati.</p>
            <p>P.IVA / C.F. - info@pes-srl.it</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
