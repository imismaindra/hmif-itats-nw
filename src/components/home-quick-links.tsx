import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const links = [
  {
    title: "Struktur Organisasi",
    href: "/struktur-organisasi",
    desc: "Kenali pengurus dan peran tiap posisi.",
    icon: "users",
  },
  { title: "Divisi", href: "/divisi", desc: "Eksplorasi minat dan komunitas bidang.", icon: "layers" },
  { title: "Program Kerja", href: "/program-kerja", desc: "Agenda, target, dan inisiatif strategis.", icon: "rocket" },
  { title: "Kegiatan", href: "/kegiatan", desc: "Event akademik, kompetisi, dan komunitas.", icon: "calendar" },
  { title: "Pengumuman & Berita", href: "/pengumuman", desc: "Informasi resmi dan kabar terbaru.", icon: "megaphone" },
  { title: "Kontak", href: "/#kontak", desc: "Hubungi kami untuk kolaborasi.", icon: "mail" },
]

export function HomeQuickLinks() {
  return (
    <section className="py-8 sm:py-12 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-balance text-2xl sm:text-3xl font-semibold">Jelajahi HMIF</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Mulai dari struktur hingga program kerja — pilih bagian yang ingin Anda lihat terlebih dahulu.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} aria-label={item.title}>
              <Card className="h-full hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="h-1 w-full bg-accent" aria-hidden />
                <CardHeader className="flex flex-row items-start gap-3">
                  <span className={`i-lucide-${item.icon} h-5 w-5 text-primary`} aria-hidden />
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
