"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "CHI SIAMO", href: "#chi-siamo" },
    { label: "SERVIZI", href: "#servizi" },
    { label: "CONTATTACI", href: "#contattaci" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-white/90 backdrop-blur-sm py-5 shadow-sm border-b border-zinc-100"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Link href="/homepage2" className="flex items-center gap-3 z-50 group">
          <div className="w-10 h-10 rounded-xl bg-[#2B5292] flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
            <Image
              src="/assets-pes-srl/favicon.png"
              alt="PES SRL Logo"
              width={24}
              height={24}
              className="w-6 h-6 object-contain brightness-0 invert"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`text-sm font-semibold tracking-wide hover:text-blue-600 transition-colors text-zinc-700`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-full bg-[#2B5292] text-white font-semibold hover:bg-[#1e3a68] transition-all shadow-sm border border-[#2B5292]"
          >
            LOGIN
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-zinc-900" />
          ) : (
            <Menu className="text-zinc-900" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-8 z-40">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-2xl font-bold text-zinc-900"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              className="mt-8 px-8 py-3 rounded-full bg-[#2B5292] text-white font-bold text-xl transition-all shadow-md hover:bg-[#1e3a68] border border-[#2B5292]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
