import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const highlights = [
  {
    title: "Open Recruitment Divisi",
    desc: "Bergabung dengan divisi sesuai minatmu. Daftar hingga 15 Oktober.",
    href: "/divisi",
    badge: "Pengumuman",
  },
  {
    title: "Seminar AI & Data",
    desc: "Belajar praktik AI modern untuk proyek kampus. 28 September, Aula FTI.",
    href: "/kegiatan",
    badge: "Kegiatan",
  },
  {
    title: "Rencana Kerja Semester Ganjil",
    desc: "Prioritas program literasi teknologi dan kompetisi nasional.",
    href: "/program-kerja",
    badge: "Program Kerja",
  },
]

export function HomeHighlights() {
  return (
    <section className="py-8 sm:py-12 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold">Kilas HMIF</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sorotan singkat hal penting terbaru dari HMIF.</p>
          </div>
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <Link href="/pengumuman">Lihat semua</Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="h-full hover:shadow-md transition-all hover:-translate-y-0.5">
              <CardHeader>
                <div className="inline-flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{item.badge}</span>
                </div>
                <CardTitle className="text-base mt-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex text-sm font-medium underline-offset-4 hover:underline"
                  aria-label={`Baca selengkapnya: ${item.title}`}
                >
                  Pelajari lebih lanjut →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
