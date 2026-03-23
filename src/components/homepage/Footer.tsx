"use client";

import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-100 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-zinc-500 text-sm font-medium text-center space-y-2">
            <p>&copy; {currentYear} PES - People Experience Solution. Tutti i diritti riservati.</p>
            <p>
              P.IVA / C.F. 06241330965 -{' '}
              <a 
                href="mailto:info@pes-srl.it?subject=Vorrei%20delle%20informazioni%20sul%20vostro%20servizio"
                className="hover:text-zinc-800 transition-colors underline underline-offset-4"
              >
                info@pes-srl.it
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
