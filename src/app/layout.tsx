import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react" // bukan /next
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"
import { Providers } from "@/lib/providers"
import "./globals.css"

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "HMIF ITATS — Himpunan Mahasiswa Informatika",
  description:
    "Website resmi Himpunan Mahasiswa Informatika ITATS. Informasi struktur organisasi, divisi, program kerja, kegiatan, dan pengumuman/berita.",
  keywords: ["HMIF", "ITATS", "Himpunan Mahasiswa Informatika", "Institut Teknologi Adhi Tama Surabaya"],
  authors: [{ name: "HMIF ITATS" }],
  openGraph: {
    title: "HMIF ITATS — Himpunan Mahasiswa Informatika",
    description: "Website resmi Himpunan Mahasiswa Informatika ITATS. Informasi struktur organisasi, divisi, program kerja, kegiatan, dan pengumuman/berita.",
    url: "https://hmif.itats.ac.id",
    siteName: "HMIF ITATS",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "HMIF ITATS Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HMIF ITATS — Himpunan Mahasiswa Informatika",
    description: "Website resmi Himpunan Mahasiswa Informatika ITATS.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: "/favicon.ico", // default favicon
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-primary text-primary-foreground px-3 py-2 rounded-md"
        >
          Loncat ke konten utama
        </a>

        <Suspense fallback={<div>Loading...</div>}>
          <SiteHeader />
          <main id="main-content" className="min-h-[60vh]">
            <Providers>
              {children}
            </Providers>
          </main>
          <SiteFooter />
        </Suspense>

        <Analytics />
      </body>
    </html>
  )
}
