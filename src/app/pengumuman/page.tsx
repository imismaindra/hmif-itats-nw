"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, User, Tag } from "lucide-react"
import { PengumumanDetail } from "@/components/pengumuman-detail"

interface Pengumuman {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: "pengumuman" | "berita"
  priority: "tinggi" | "sedang" | "rendah"
  tags: string[]
  image: string
}

const mockPengumuman: Pengumuman[] = [
  {
    id: "1",
    title: "Pemilihan Ketua Himpunan Periode 2024/2025",
    excerpt:
      "Pendaftaran calon ketua himpunan telah dibuka. Segera daftarkan diri Anda untuk menjadi bagian dari perubahan.",
    content: `
      <h2>Pemilihan Ketua Himpunan Periode 2024/2025</h2>
      
      <p>Himpunan Mahasiswa Teknik Informatika dengan bangga mengumumkan pembukaan pendaftaran calon ketua himpunan untuk periode 2024/2025.</p>
      
      <h3>Persyaratan Calon:</h3>
      <ul>
        <li>Mahasiswa aktif Teknik Informatika minimal semester 3</li>
        <li>IPK minimal 3.00</li>
        <li>Tidak sedang menjalani sanksi akademik</li>
        <li>Memiliki visi dan misi yang jelas</li>
      </ul>
      
      <h3>Timeline:</h3>
      <ul>
        <li>Pendaftaran: 15 Januari - 25 Januari 2025</li>
        <li>Verifikasi berkas: 26 Januari - 28 Januari 2025</li>
        <li>Kampanye: 29 Januari - 5 Februari 2025</li>
        <li>Pemilihan: 6 Februari 2025</li>
      </ul>
      
      <p>Untuk informasi lebih lanjut, silakan hubungi sekretariat HIMTI.</p>
    `,
    date: "15 JAN 2025",
    author: "Sekretaris HIMTI",
    category: "pengumuman",
    priority: "tinggi",
    tags: ["Pemilihan", "Ketua Himpunan", "Periode Baru"],
    image: "/student-election-voting-democracy-leadership-unive.jpg",
  },
  {
    id: "2",
    title: 'Workshop "AI & Machine Learning for Beginners"',
    excerpt:
      "Bergabunglah dalam workshop eksklusif tentang kecerdasan buatan dan pembelajaran mesin yang akan diselenggarakan bulan depan.",
    content: `
      <h2>Workshop "AI & Machine Learning for Beginners"</h2>
      
      <p>HIMTI dengan bangga mempersembahkan workshop tentang Artificial Intelligence dan Machine Learning yang dirancang khusus untuk pemula.</p>
      
      <h3>Detail Acara:</h3>
      <ul>
        <li>Tanggal: 20 Februari 2025</li>
        <li>Waktu: 09.00 - 16.00 WIB</li>
        <li>Tempat: Lab Komputer Gedung F</li>
        <li>Pembicara: Dr. Ahmad Fauzi, M.Kom (Dosen AI Universitas)</li>
      </ul>
      
      <h3>Materi yang akan dibahas:</h3>
      <ul>
        <li>Pengenalan AI dan ML</li>
        <li>Python untuk Data Science</li>
        <li>Implementasi algoritma sederhana</li>
        <li>Hands-on project</li>
      </ul>
      
      <p>Pendaftaran dibuka hingga 18 Februari 2025. Kuota terbatas hanya 30 peserta!</p>
    `,
    date: "12 JAN 2025",
    author: "Divisi Akademik",
    category: "berita",
    priority: "sedang",
    tags: ["Workshop", "AI", "Machine Learning", "Teknologi"],
    image: "/artificial-intelligence-machine-learning-workshop-.jpg",
  },
  {
    id: "3",
    title: "Kompetisi Programming Internal HIMTI 2025",
    excerpt:
      "Asah kemampuan programming Anda dalam kompetisi internal yang akan memberikan hadiah menarik untuk para pemenang.",
    content: `
      <h2>Kompetisi Programming Internal HIMTI 2025</h2>
      
      <p>Saatnya menunjukkan kemampuan programming terbaik Anda! HIMTI mengadakan kompetisi programming internal dengan hadiah total 10 juta rupiah.</p>
      
      <h3>Kategori Kompetisi:</h3>
      <ul>
        <li>Competitive Programming</li>
        <li>Web Development</li>
        <li>Mobile App Development</li>
        <li>Game Development</li>
      </ul>
      
      <h3>Hadiah:</h3>
      <ul>
        <li>Juara 1: Rp 3.000.000 + Sertifikat + Trophy</li>
        <li>Juara 2: Rp 2.000.000 + Sertifikat + Trophy</li>
        <li>Juara 3: Rp 1.000.000 + Sertifikat + Trophy</li>
        <li>Juara Harapan: Merchandise eksklusif</li>
      </ul>
      
      <p>Pendaftaran dibuka mulai 10 Februari 2025. Jangan lewatkan kesempatan emas ini!</p>
    `,
    date: "08 JAN 2025",
    author: "Divisi Kompetisi",
    category: "pengumuman",
    priority: "tinggi",
    tags: ["Kompetisi", "Programming", "Hadiah", "Internal"],
    image: "/programming-competition-coding-contest-trophy-winn.jpg",
  },
  {
    id: "4",
    title: "Kerjasama HIMTI dengan Perusahaan Teknologi Terkemuka",
    excerpt:
      "HIMTI menjalin kerjasama strategis dengan beberapa perusahaan teknologi untuk membuka peluang magang dan kerja.",
    content: `
      <h2>Kerjasama HIMTI dengan Perusahaan Teknologi Terkemuka</h2>
      
      <p>Dalam upaya meningkatkan kualitas dan peluang karir mahasiswa, HIMTI telah menjalin kerjasama dengan beberapa perusahaan teknologi terkemuka.</p>
      
      <h3>Perusahaan Partner:</h3>
      <ul>
        <li>PT. Teknologi Nusantara</li>
        <li>CV. Digital Inovasi</li>
        <li>PT. Solusi Cerdas Indonesia</li>
        <li>Startup TechHub</li>
      </ul>
      
      <h3>Benefit Kerjasama:</h3>
      <ul>
        <li>Program magang eksklusif</li>
        <li>Workshop dan seminar gratis</li>
        <li>Peluang kerja setelah lulus</li>
        <li>Mentoring dari praktisi industri</li>
      </ul>
      
      <p>Informasi lebih lanjut akan diumumkan melalui website resmi HIMTI.</p>
    `,
    date: "05 JAN 2025",
    author: "Ketua HIMTI",
    category: "berita",
    priority: "sedang",
    tags: ["Kerjasama", "Industri", "Magang", "Karir"],
    image: "/business-partnership-technology-company-collaborat.jpg",
  },
]

export default function PengumumanPage() {
  const [selectedPengumuman, setSelectedPengumuman] = useState<Pengumuman | null>(null)
  const [filter, setFilter] = useState<"semua" | "pengumuman" | "berita">("semua")

  const filteredPengumuman = mockPengumuman.filter(
    (pengumuman) => filter === "semua" || pengumuman.category === filter,
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "tinggi":
        return "bg-red-100 text-red-700 border-red-200"
      case "sedang":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "rendah":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryColor = (category: string) => {
    return category === "pengumuman"
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-blue-100 text-blue-700 border-blue-200"
  }

  if (selectedPengumuman) {
    return <PengumumanDetail pengumuman={selectedPengumuman} onBack={() => setSelectedPengumuman(null)} />
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {(["semua", "pengumuman", "berita"] as Array<"semua" | "pengumuman" | "berita">).map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? "default" : "outline"}
            onClick={() => setFilter(filterType)}
            className="capitalize"
          >
            {filterType}
          </Button>
        ))}
      </div>

      {/* Announcements Grid */}
      <div className="grid gap-6 md:gap-8">
        {filteredPengumuman.map((pengumuman, index) => (
          <Card
            key={pengumuman.id}
            className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
            onClick={() => setSelectedPengumuman(pengumuman)}
          >
            <div className="md:flex">
              <div className="md:w-1/3 lg:w-1/4">
                <div className="relative h-48 md:h-full overflow-hidden">
                  <img
                    src={pengumuman.image || "/placeholder.svg"}
                    alt={pengumuman.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  {/* Date Section */}
                  <div className="flex-shrink-0">
                    <div className="text-center p-4 bg-muted/50 rounded-lg border border-border/50">
                      <div className="text-2xl font-bold text-primary">{pengumuman.date.split(" ")[0]}</div>
                      <div className="text-sm text-muted-foreground">
                        {pengumuman.date.split(" ")[1]} {pengumuman.date.split(" ")[2]}
                      </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getCategoryColor(pengumuman.category)}>{pengumuman.category}</Badge>
                      <Badge className={getPriorityColor(pengumuman.priority)}>{pengumuman.priority}</Badge>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors text-balance">
                      {pengumuman.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-pretty">{pengumuman.excerpt}</p>

                    <div className="flex flex-wrap gap-2">
                      {pengumuman.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {pengumuman.author}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Card>
        ))}
      </div>
    </div>
  )
}
