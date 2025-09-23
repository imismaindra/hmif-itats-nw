import Link from "next/link"

/* Quick Links dengan side-accent & hover subtle */
const links = [
  { href: "/struktur", title: "Struktur Organisasi", desc: "Kenali kepengurusan dan perannya." },
  { href: "/divisi", title: "Divisi", desc: "Temukan minat dan komunitas belajarmu." },
  { href: "/program", title: "Program Kerja", desc: "Inisiatif strategis sepanjang periode." },
  { href: "/kegiatan", title: "Kegiatan", desc: "Agenda rutin dan event khusus." },
  { href: "/pengumuman", title: "Pengumuman/Berita", desc: "Informasi terbaru seputar HMIF." },
]

export function QuickLinks() {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-6 mt-10 md:mt-14">
      <h2 className="text-balance text-2xl md:text-3xl font-semibold">Jelajahi HMIF</h2>
      <p className="text-foreground/70 mt-2 max-w-prose">Akses cepat ke halaman yang paling sering dicari.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group relative rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-accent rounded-l-lg" aria-hidden="true" />
            <div className="pr-4">
              <h3 className="font-medium group-hover:text-foreground">{l.title}</h3>
              <p className="text-sm text-foreground/70 mt-1">{l.desc}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm text-accent">
                Buka halaman
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-none stroke-current">
                  <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
