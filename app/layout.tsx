import type { Metadata } from "next";
import { Manrope, Fredoka } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Portfolio`,
    template: `%s — ${SITE_NAME}`,
  },
  description: "Software engineer portfolio built with Next.js, Tailwind CSS, and shadcn/ui.",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: `${SITE_NAME} — Portfolio`,
    images: ["/profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  alternateName: "Abbas Zabier",
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/abbaszabier",
    "https://linkedin.com/in/abbaszabier",
    "https://instagram.com/abzabier_",
  ],
};

const THEME_INIT_SCRIPT = `
  (function () {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${fredoka.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col pb-16 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
