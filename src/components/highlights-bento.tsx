/* Highlights bento: Program, Kegiatan, Berita cards dengan CTA */
import Link from "next/link"

export function HighlightsBento() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 mt-12 md:mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card
          title="Program Unggulan"
          desc="Rangkaian program prioritas untuk mengakselerasi kapasitas anggota."
          cta={{ href: "/program", label: "Lihat program" }}
          tag="Program"
        />
        <Card
          title="Kegiatan Terbaru"
          desc="Dokumentasi kegiatan terkini dan agenda yang sedang berjalan."
          cta={{ href: "/kegiatan", label: "Jelajahi kegiatan" }}
          tag="Kegiatan"
        />
        <Card
          title="Pengumuman & Berita"
          desc="Informasi penting, rilis resmi, dan liputan HMIF."
          cta={{ href: "/pengumuman", label: "Baca kabar terbaru" }}
          tag="Info"
        />
      </div>
    </section>
  )
}

function Card({
  title,
  desc,
  cta,
  tag,
}: {
  title: string
  desc: string
  cta: { href: string; label: string }
  tag: string
}) {
  return (
    <div className="relative rounded-xl border border-border p-5 transition hover:shadow-[0_0_0_2px_var(--border)]">
      <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-xs text-foreground/70">
        <i className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" /> {tag}
      </span>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{desc}</p>
      <Link href={cta.href} className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline">
        {cta.label}
        <svg width="16" height="16" viewBox="0 0 24 24" className="fill-none stroke-current">
          <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}
