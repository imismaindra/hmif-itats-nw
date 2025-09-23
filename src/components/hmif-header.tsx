"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

/* Header modern dengan pill nav, sticky, dan mobile menu */
const nav = [
  { href: "/", label: "Beranda" },
  { href: "/struktur", label: "Struktur Organisasi" },
  { href: "/divisi", label: "Divisi" },
  { href: "/program", label: "Program Kerja" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/pengumuman", label: "Pengumuman/Berita" },
]

export function HmifHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-2 rounded"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary grid place-items-center text-sm font-semibold text-primary-foreground">
              HM
            </div>
            <span className="font-semibold tracking-wide">HMIF</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm transition-colors",
                    "hover:bg-muted/50 hover:text-foreground",
                    active ? "bg-muted text-foreground" : "text-foreground/80",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
            onClick={() => setOpen((s) => !s)}
          >
            <span className="sr-only">Menu</span>
            <div className="h-4 w-4 relative">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 bg-foreground transition",
                  open && "translate-y-2 rotate-45",
                )}
              ></span>
              <span
                className={cn("absolute inset-x-0 top-2 h-0.5 bg-foreground transition", open && "opacity-0")}
              ></span>
              <span
                className={cn(
                  "absolute inset-x-0 top-4 h-0.5 bg-foreground transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-3 border-t border-border">
            <nav className="grid gap-1" aria-label="Mobile">
              {nav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm transition-colors",
                      "hover:bg-muted/50 hover:text-foreground",
                      active ? "bg-muted text-foreground" : "text-foreground/80",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
