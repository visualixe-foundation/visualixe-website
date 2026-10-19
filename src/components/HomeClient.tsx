"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import ContactModal from "./ContactModal";
import ProjectCard, { type Project } from "./ProjectCard";

export default function HomeClient({ projects }: { projects: Project[] }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="hero-bg min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Apps & Websites
              <br />
              that solve <span className="text-cyan-400">real problems</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg">
              We build practical digital solutions that simplify daily life,
              education, productivity, and collaboration.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-full font-semibold text-lg transition"
              >
                Start a Project
              </button>
              <a
                href="#published"
                className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cyan-400 hover:text-black transition"
              >
                View Published Work
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/visualixe.png"
              alt="Visualixe"
              width={400}
              height={400}
              className="w-full max-w-md logo-glow"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto">
            From idea to a working product — we help you every step of the way.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800 rounded-3xl p-8 card-hover text-center">
              <i className="fas fa-mobile-alt text-5xl text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Mobile & Web Apps</h3>
              <p className="text-zinc-400">
                Custom applications tailored to solve specific real-world
                problems.
              </p>
            </div>
            <div className="bg-zinc-800 rounded-3xl p-8 card-hover text-center">
              <i className="fas fa-globe text-5xl text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Business Websites</h3>
              <p className="text-zinc-400">
                Professional, fast-loading websites that represent your vision.
              </p>
            </div>
            <div className="bg-zinc-800 rounded-3xl p-8 card-hover text-center">
              <i className="fas fa-cogs text-5xl text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Automation Tools</h3>
              <p className="text-zinc-400">
                Systems that eliminate manual work and improve efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Tech We Use</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <i className="fab fa-react text-5xl text-cyan-400" />
              <span className="font-medium">React / Next.js</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-5xl font-bold text-blue-400">TS</span>
              <span className="font-medium">TypeScript</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <i className="fab fa-node-js text-5xl text-green-400" />
              <span className="font-medium">Node.js</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <i className="fas fa-database text-5xl text-amber-400" />
              <span className="font-medium">Databases</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <i className="fas fa-wind text-5xl text-cyan-400" />
              <span className="font-medium">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Published Projects */}
      <section id="published" className="py-16 sm:py-20 md:py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Published Projects
          </h2>
          <p className="text-center text-zinc-400 mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-2">
            Live projects already making an impact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Think. Create. Innovate.</h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Hi, I&apos;m <strong className="text-white">Roque</strong>, founder
            of Visualixe. I build systems that turn real-world inefficiencies
            into practical digital solutions especially in education,
            productivity, and daily workflows in Tanzania and beyond.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s build something</h2>
          <p className="text-xl text-zinc-400 mb-10">
            Have a problem worth solving? I work with students, schools, and
            small teams in Tanzania and beyond.
          </p>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-4 rounded-full font-semibold text-lg transition"
          >
            Start a Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500">
          <p>&copy; 2026 Visualixe. All rights reserved.</p>
          <p className="mt-2">Built with purpose ✌️</p>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
