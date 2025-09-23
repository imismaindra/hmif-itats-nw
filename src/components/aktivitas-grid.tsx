import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AktivitasGrid() {
  const activities = [
    {
      title: "Tech Talk: AI & Machine Learning",
      category: "AKADEMIK",
      date: "Maret 2024",
      participants: "120 peserta",
      description: "Seminar teknologi terdepan dengan pembicara dari industri tech terkemuka",
      status: "Selesai",
      image: "/tech-conference-presentation.png",
    },
    {
      title: "Hackathon HIMTI 2024",
      category: "KOMPETISI",
      date: "April 2024",
      participants: "80 peserta",
      description: "Kompetisi pengembangan aplikasi 48 jam dengan tema Smart City Solutions",
      status: "Selesai",
      image: "/hackathon-coding-competition.jpg",
    },
    {
      title: "Workshop UI/UX Design",
      category: "PELATIHAN",
      date: "Mei 2024",
      participants: "65 peserta",
      description: "Pelatihan intensif desain antarmuka dan pengalaman pengguna",
      status: "Selesai",
      image: "/ui-ux-design-workshop.jpg",
    },
    {
      title: "Bakti Sosial Digital Literacy",
      category: "SOSIAL",
      date: "Juni 2024",
      participants: "45 relawan",
      description: "Program edukasi literasi digital untuk masyarakat sekitar kampus",
      status: "Selesai",
      image: "/digital-literacy-community-service.jpg",
    },
    {
      title: "Study Tour Tech Company",
      category: "KUNJUNGAN",
      date: "Juli 2024",
      participants: "35 mahasiswa",
      description: "Kunjungan industri ke perusahaan teknologi terkemuka di Jakarta",
      status: "Selesai",
      image: "/tech-company-office-visit.jpg",
    },
    {
      title: "Webinar Cybersecurity",
      category: "AKADEMIK",
      date: "Agustus 2024",
      participants: "200 peserta",
      description: "Seminar online keamanan siber dan best practices untuk developer",
      status: "Selesai",
      image: "/cybersecurity-webinar-online.jpg",
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      AKADEMIK: "bg-blue-100 text-blue-800",
      KOMPETISI: "bg-red-100 text-red-800",
      PELATIHAN: "bg-green-100 text-green-800",
      SOSIAL: "bg-purple-100 text-purple-800",
      KUNJUNGAN: "bg-orange-100 text-orange-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <section id="kegiatan" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Program Kerja yang Telah Selesai</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Berikut adalah dokumentasi lengkap kegiatan dan program kerja yang telah berhasil dilaksanakan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 text-balance">{activity.title}</h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{activity.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{activity.participants}</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    ✓ {activity.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ingin melihat Program kerja lainnya atau melihat pengumuman mendatang?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Lihat Program Kerja
            </button>
            <button className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors">
              Lihat Pengumuman
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
