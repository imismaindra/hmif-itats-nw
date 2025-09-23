"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Struktur Organisasi", href: "/struktur-organisasi" },
  { label: "Divisi", href: "/divisi" },
  { label: "Program Kerja", href: "/program-kerja" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Pengumuman & Berita", href: "/pengumuman" },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex h-24 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Beranda HMIF">
              <Image
                src="/hima.png"
                alt="Logo HMIF"
                width={48}
                height={48}
                className="h-12 w-17 rounded-md border"
                priority
              />
              <div className="leading-tight">
                <span className="block text-base font-semibold">Himpunan Mahasiswa</span>
                <span className="block text-sm text-muted-foreground">Teknik Informatika ITATS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-4 py-3 rounded-md text-sm font-medium hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2 b-primary">
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/#kontak">Kontak HMIF</Link>
            </Button>
            <button
              type="button"
              className="bg-primary md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Buka menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}>
              {open ? (
                <X className="h-5 w-5 text-background" aria-hidden />
              ) : (
                <Menu className="h-5 w-5 text-background" aria-hidden />
              )}
              <span className="sr-only">Buka menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Panel */}
      <div className={cn("md:hidden border-t bg-background", open ? "block" : "hidden")}>
        <nav className="max-w-7xl mx-auto px-4 py-2" aria-label="Navigasi mobile">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button asChild className="w-full">
                <Link href="/#kontak" onClick={() => setOpen(false)}>
                  Hubungi Kami
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
