"use client";

import { useState } from "react";

const colorMap: Record<
  string,
  { text: string; button: string; buttonHover: string }
> = {
  emerald: {
    text: "text-emerald-300",
    button: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700",
  },
  amber: {
    text: "text-amber-300",
    button: "bg-amber-600",
    buttonHover: "hover:bg-amber-700",
  },
  blue: {
    text: "text-blue-300",
    button: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
  },
  rose: {
    text: "text-rose-300",
    button: "bg-rose-600",
    buttonHover: "hover:bg-rose-700",
  },
  violet: {
    text: "text-violet-300",
    button: "bg-violet-600",
    buttonHover: "hover:bg-violet-700",
  },
  orange: {
    text: "text-orange-300",
    button: "bg-orange-600",
    buttonHover: "hover:bg-orange-700",
  },
  sky: {
    text: "text-sky-300",
    button: "bg-sky-600",
    buttonHover: "hover:bg-sky-700",
  },
  pink: {
    text: "text-pink-300",
    button: "bg-pink-600",
    buttonHover: "hover:bg-pink-700",
  },
  lime: {
    text: "text-lime-300",
    button: "bg-lime-600",
    buttonHover: "hover:bg-lime-700",
  },
  yellow: {
    text: "text-yellow-300",
    button: "bg-yellow-600",
    buttonHover: "hover:bg-yellow-700",
  },
  cyan: {
    text: "text-cyan-300",
    button: "bg-cyan-600",
    buttonHover: "hover:bg-cyan-700",
  },
  teal: {
    text: "text-teal-300",
    button: "bg-teal-600",
    buttonHover: "hover:bg-teal-700",
  },
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  color: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const colors = colorMap[project.color] || colorMap.cyan;

  return (
    <div className="bg-zinc-800 rounded-3xl overflow-hidden card-hover flex flex-col">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden border-b border-zinc-700/50 focus-visible:outline-none"
      >
        <div className={`project-thumb-wrap ${loaded ? "loaded" : ""}`}>
          <div className="project-skeleton" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://image.thum.io/get/width/800/crop/500/noanimate/${project.url}`}
            alt={`${project.title} preview`}
            className={`project-thumb ${loaded ? "is-loaded" : ""}`}
            loading="lazy"
            width={800}
            height={500}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </a>
      <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
        <div
          className={`project-cat ${colors.text} mb-2 text-xs sm:text-sm`}
        >
          {project.category}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
          {project.title}
        </h3>
        <p className="text-zinc-400 mb-5 sm:mb-6 text-sm sm:text-base flex-1">
          {project.description}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 sm:gap-3 ${colors.button} ${colors.buttonHover} px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl font-medium transition text-sm sm:text-base w-full sm:w-auto`}
        >
          Visit Live Website <i className="fas fa-external-link-alt" />
        </a>
      </div>
    </div>
  );
}
