import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    title: "KijaniPulse",
    category: "ENVIRONMENTAL MOVEMENT",
    description:
      "Student-led environmental movement at St. Joseph Boys Science High School, Kilimanjaro.",
    url: "https://kijanipulse-foundation.vercel.app/",
    color: "emerald",
    order: 1,
  },
  {
    title: "Playlist Manifest",
    category: "PRODUCTIVITY TOOL",
    description:
      "Catalog any YouTube playlist into a clean, downloadable track list — metadata only, no files downloaded.",
    url: "https://playlist-manifest.vercel.app/",
    color: "amber",
    order: 2,
  },
  {
    title: "Accepted Students",
    category: "EDUCATION DIRECTORY",
    description:
      "Discover students accepted into competitive summer programs and international high schools.",
    url: "https://accepted-students.vercel.app/",
    color: "blue",
    order: 3,
  },
  {
    title: "Link Hall",
    category: "DIRECTORY · CURATED LINKS",
    description:
      "A directory of good websites, sorted by category, with search and filtering — Roundup.",
    url: "https://link-hall.vercel.app/",
    color: "rose",
    order: 4,
  },
  {
    title: "NECTA A-Level Papers",
    category: "EDUCATION · EXAM ARCHIVE",
    description:
      "Past papers and pre-mock exams for Form V and VI — view online or download for revision.",
    url: "https://advance-archive.vercel.app/",
    color: "violet",
    order: 5,
  },
  {
    title: "Music Seedbox",
    category: "PRODUCTIVITY · TORRENT TOOL",
    description:
      "Create .torrent files from your own files entirely in the browser — magnet links, tags, and a local saved list.",
    url: "https://music-seedbox.vercel.app/",
    color: "orange",
    order: 6,
  },
  {
    title: "Screen List",
    category: "ENTERTAINMENT · WATCHLIST",
    description:
      "A personal watchlist for movies and series — search, filter by type or year, and keep track of what is worth watching.",
    url: "https://screen-list.vercel.app/",
    color: "sky",
    order: 7,
  },
  {
    title: "Fit Finds",
    category: "FASHION · DISCOVERY",
    description:
      "A curated list of fashion Instagram accounts and style inspiration worth following.",
    url: "https://fit-finds.vercel.app/",
    color: "pink",
    order: 8,
  },
  {
    title: "Initial Read",
    category: "READING · CURATED LIST",
    description:
      "A short list of books worth reading at least once — stories and ideas that stay with you, growing slowly on purpose.",
    url: "https://initial-read.vercel.app/",
    color: "lime",
    order: 9,
  },
  {
    title: "Karibu Jikoni",
    category: "FOOD · RECIPE BOOK",
    description:
      "Kitabu cha mapishi — a digital recipe book for home cooking, organized and easy to browse.",
    url: "https://karibu-jikoni.vercel.app/",
    color: "yellow",
    order: 10,
  },
  {
    title: "Night Timetable",
    category: "EDUCATION · SCHEDULE",
    description:
      "Public weekly schedule showing which teacher is teaching Form V / Form VI each night at St. Joseph Boys Science High School.",
    url: "https://night-timetable.vercel.app/",
    color: "cyan",
    order: 11,
  },
  {
    title: "Waqt",
    category: "FAITH · PRAYER TIMES",
    description:
      "Local prayer times, a verse for today, and a plain-language introduction for people new to Islam.",
    url: "https://camino-islamico.vercel.app/",
    color: "teal",
    order: 12,
  },
];

async function main() {
  console.log("Seeding projects...");

  // Clear existing projects so re-seeding is safe
  await prisma.project.deleteMany();

  for (const project of projects) {
    await prisma.project.create({
      data: {
        ...project,
        published: true,
      },
    });
    console.log(`  ✓ ${project.title}`);
  }

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
