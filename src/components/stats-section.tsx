import { Card } from "@/components/ui/card"

export function StatsSection() {
  const stats = [
    { number: "5", label: "Program Kerja Selesai", description: "Berbagai kegiatan akademik dan non-akademik" },
    { number: "150+", label: "Mahasiswa Terlibat", description: "Partisipasi aktif dari seluruh angkatan" },
    { number: "3", label: "Mitra Kerjasama", description: "Kolaborasi dengan industri dan institusi" },
    { number: "6", label: "Bulan Aktif", description: "Konsistensi kegiatan sepanjang tahun" },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 glow-animation">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm font-semibold text-foreground mb-2">{stat.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
