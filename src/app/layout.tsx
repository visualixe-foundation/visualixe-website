import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Visualixe | Think. Create. Innovate.",
  description:
    "Visualixe Foundation builds practical apps and websites for education, productivity, and daily life in Tanzania and beyond.",
  icons: {
    icon: "/visualixe.png",
    apple: "/visualixe.png",
  },
  openGraph: {
    type: "website",
    url: "https://visualixe-foundation.vercel.app/",
    title: "Visualixe | Think. Create. Innovate.",
    description:
      "We build practical digital solutions that simplify daily life, education, productivity, and collaboration.",
    images: [
      {
        url: "https://visualixe-foundation.vercel.app/visualixe.png",
        alt: "Visualixe Foundation logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visualixe | Think. Create. Innovate.",
    description:
      "We build practical digital solutions that simplify daily life, education, productivity, and collaboration.",
    images: ["https://visualixe-foundation.vercel.app/visualixe.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </head>
      <body className="bg-zinc-950 text-white font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
