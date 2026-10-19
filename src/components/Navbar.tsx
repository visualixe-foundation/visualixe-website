"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar({
  onOpenContact,
}: {
  onOpenContact: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-zinc-950/95 backdrop-blur-md z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/visualixe.png"
            alt="Visualixe Logo"
            width={40}
            height={40}
            className="h-10 w-10 logo-glow"
          />
          <span className="text-2xl font-bold tracking-tight">
            Visualixe Foundation
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-lg">
          <a href="#services" className="hover:text-cyan-400 transition rounded-sm">
            Services
          </a>
          <a href="#published" className="hover:text-cyan-400 transition rounded-sm">
            Published
          </a>
          <a href="#about" className="hover:text-cyan-400 transition rounded-sm">
            About
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition rounded-sm">
            Contact
          </a>
        </div>

        <button
          type="button"
          onClick={onOpenContact}
          className="hidden md:block bg-cyan-500 hover:bg-cyan-600 px-6 py-2.5 rounded-full font-medium transition"
        >
          Start a Project
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-3xl"
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 py-6">
          <div className="flex flex-col gap-6 px-6 text-lg">
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="hover:text-cyan-400 rounded-sm"
            >
              Services
            </a>
            <a
              href="#published"
              onClick={() => setMobileOpen(false)}
              className="hover:text-cyan-400 rounded-sm"
            >
              Published
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="hover:text-cyan-400 rounded-sm"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="hover:text-cyan-400 rounded-sm"
            >
              Contact
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenContact();
              }}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-full font-medium text-center mt-4"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
