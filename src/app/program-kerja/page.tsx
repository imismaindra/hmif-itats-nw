"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  PlayCircle,
  Calendar,
  Users,
  Target,
  MapPin,
  User,
  Camera,
  X,
} from "lucide-react"

type ProgramStatus = "completed" | "ongoing" | "upcoming"

interface TeamMember {
  name: string
  role: string
  avatar?: string
}

interface ProgramKerja {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: ProgramStatus
  progress: number
  department: string
  participants: number
  budget: string
  leader: string
  leaderAvatar?: string
  team: TeamMember[]
  location: string
  photos: string[]
  detailedDescription: string
}

const programKerjaData: ProgramKerja[] = [
  {
    id: "1",
    title: "Orientasi Mahasiswa Baru",
    description: "Program pengenalan kampus dan organisasi untuk mahasiswa baru angkatan 2024",
    startDate: "2024-08-15",
    endDate: "2024-08-20",
    status: "completed",
    progress: 100,
    department: "Kemahasiswaan",
    participants: 450,
    budget: "Rp 25.000.000",
    leader: "Ahmad Rizki Pratama",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Sari Dewi", role: "Wakil Ketua", avatar: "/diverse-female-student.png" },
      { name: "Budi Santoso", role: "Sekretaris", avatar: "/male-student-studying.png" },
      { name: "Maya Sari", role: "Bendahara", avatar: "/diverse-female-student.png" },
      { name: "Doni Pratama", role: "Koordinator Acara", avatar: "/male-student-studying.png" },
    ],
    location: "Auditorium Utama & Lapangan Kampus",
    photos: [
      "/university-orientation-ceremony.jpg",
      "/students-group-activities.jpg",
      "/campus-tour-students.jpg",
      "/welcome-banner-university.jpg",
    ],
    detailedDescription:
      "Program Orientasi Mahasiswa Baru (OSMB) merupakan kegiatan wajib bagi seluruh mahasiswa baru angkatan 2024. Program ini bertujuan untuk memperkenalkan kehidupan kampus, nilai-nilai universitas, serta membangun networking antar mahasiswa baru. Kegiatan meliputi pengenalan fakultas, organisasi kemahasiswaan, fasilitas kampus, dan berbagai workshop pengembangan diri.",
  },
  {
    id: "2",
    title: "Workshop Pengembangan Soft Skills",
    description: "Pelatihan kepemimpinan, komunikasi, dan manajemen waktu untuk anggota himpunan",
    startDate: "2024-09-10",
    endDate: "2024-10-15",
    status: "ongoing",
    progress: 65,
    department: "Pengembangan SDM",
    participants: 120,
    budget: "Rp 15.000.000",
    leader: "Indira Putri Maharani",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Fajar Nugroho", role: "Koordinator Materi", avatar: "/male-student-studying.png" },
      { name: "Rina Wulandari", role: "Koordinator Peserta", avatar: "/diverse-female-student.png" },
      { name: "Eko Prasetyo", role: "Dokumentasi", avatar: "/male-student-studying.png" },
    ],
    location: "Ruang Seminar Lt. 3 & Lab Komputer",
    photos: ["/workshop-presentation-students.jpg", "/group-discussion-meeting.jpg", "/leadership-training-session.jpg"],
    detailedDescription:
      "Workshop ini dirancang untuk meningkatkan kemampuan soft skills mahasiswa melalui serangkaian pelatihan intensif. Materi meliputi public speaking, leadership, time management, dan team building. Setiap sesi dipandu oleh praktisi berpengalaman dan dilengkapi dengan studi kasus nyata.",
  },
  {
    id: "3",
    title: "Seminar Nasional Teknologi",
    description: 'Seminar dengan tema "Inovasi Teknologi untuk Masa Depan Indonesia"',
    startDate: "2024-10-25",
    endDate: "2024-10-26",
    status: "ongoing",
    progress: 40,
    department: "Akademik",
    participants: 300,
    budget: "Rp 50.000.000",
    leader: "Muhammad Arief Hidayat",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Dewi Lestari", role: "Koordinator Acara", avatar: "/diverse-female-student.png" },
      { name: "Reza Pratama", role: "Koordinator Sponsor", avatar: "/male-student-studying.png" },
      { name: "Sinta Maharani", role: "Humas", avatar: "/diverse-female-student.png" },
      { name: "Bayu Setiawan", role: "IT Support", avatar: "/male-student-studying.png" },
      { name: "Lina Sari", role: "Konsumsi", avatar: "/diverse-female-student.png" },
    ],
    location: "Convention Hall Jakarta",
    photos: ["/technology-seminar-stage.jpg", "/conference-preparation-setup.jpg"],
    detailedDescription:
      "Seminar nasional yang menghadirkan pembicara dari berbagai kalangan industri teknologi, akademisi, dan startup. Tema utama fokus pada AI, IoT, blockchain, dan teknologi masa depan. Event ini diharapkan menjadi wadah networking dan knowledge sharing bagi mahasiswa dan profesional IT.",
  },
  {
    id: "4",
    title: "Bakti Sosial Masyarakat",
    description: "Program pengabdian masyarakat di daerah terpencil dengan fokus pendidikan",
    startDate: "2024-11-15",
    endDate: "2024-11-20",
    status: "upcoming",
    progress: 0,
    department: "Sosial Masyarakat",
    participants: 80,
    budget: "Rp 20.000.000",
    leader: "Putri Ayu Lestari",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Agus Setiawan", role: "Koordinator Logistik", avatar: "/male-student-studying.png" },
      { name: "Nia Ramadhani", role: "Koordinator Pendidikan", avatar: "/diverse-female-student.png" },
      { name: "Dimas Pratama", role: "Koordinator Kesehatan", avatar: "/male-student-studying.png" },
    ],
    location: "Desa Sukamaju, Bogor",
    photos: [],
    detailedDescription:
      "Program pengabdian masyarakat yang bertujuan memberikan bantuan pendidikan dan kesehatan kepada masyarakat desa terpencil. Kegiatan meliputi mengajar anak-anak, penyuluhan kesehatan, dan pemberian bantuan alat tulis serta obat-obatan dasar.",
  },
  {
    id: "5",
    title: "Kompetisi Programming",
    description: "Lomba pemrograman tingkat nasional untuk mahasiswa se-Indonesia",
    startDate: "2024-12-05",
    endDate: "2024-12-07",
    status: "upcoming",
    progress: 0,
    department: "Akademik",
    participants: 200,
    budget: "Rp 35.000.000",
    leader: "Kevin Wijaya",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Sarah Putri", role: "Koordinator Teknis", avatar: "/diverse-female-student.png" },
      { name: "Andi Pratama", role: "Juri Kompetisi", avatar: "/male-student-studying.png" },
      { name: "Lisa Maharani", role: "Koordinator Peserta", avatar: "/diverse-female-student.png" },
    ],
    location: "Lab Komputer Terpadu",
    photos: [],
    detailedDescription:
      "Kompetisi programming yang menguji kemampuan algoritma dan pemecahan masalah mahasiswa. Lomba terdiri dari beberapa kategori: competitive programming, web development, dan mobile app development. Hadiah total mencapai puluhan juta rupiah.",
  },
  {
    id: "6",
    title: "Pelatihan Kewirausahaan",
    description: "Program pengembangan jiwa entrepreneur untuk mahasiswa",
    startDate: "2025-01-20",
    endDate: "2025-02-10",
    status: "upcoming",
    progress: 0,
    department: "Kewirausahaan",
    participants: 150,
    budget: "Rp 30.000.000",
    leader: "Diana Sari Dewi",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Rizky Pratama", role: "Koordinator Mentor", avatar: "/male-student-studying.png" },
      { name: "Mega Wulandari", role: "Koordinator Workshop", avatar: "/diverse-female-student.png" },
      { name: "Yoga Setiawan", role: "Koordinator Pitching", avatar: "/male-student-studying.png" },
    ],
    location: "Ruang Inkubator Bisnis",
    photos: [],
    detailedDescription:
      "Program pelatihan komprehensif untuk mengembangkan jiwa kewirausahaan mahasiswa. Meliputi workshop business model canvas, digital marketing, financial planning, dan pitching. Program diakhiri dengan kompetisi business plan dengan hadiah inkubasi bisnis.",
  },
]

const statusConfig = {
  completed: {
    label: "Selesai",
    icon: CheckCircle2,
    color: "status-completed",
    textColor: "text-green-100",
  },
  ongoing: {
    label: "Sedang Berjalan",
    icon: PlayCircle,
    color: "status-ongoing",
    textColor: "text-orange-100",
  },
  upcoming: {
    label: "Akan Datang",
    icon: Clock,
    color: "status-upcoming",
    textColor: "text-blue-100",
  },
}

export default function ProgramKerjaTimeline() {
  const [selectedFilter, setSelectedFilter] = useState<ProgramStatus | "all">("all")
  const [selectedProgram, setSelectedProgram] = useState<ProgramKerja | null>(null)

  const filteredPrograms =
    selectedFilter === "all"
      ? programKerjaData
      : programKerjaData.filter((program) => program.status === selectedFilter)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-balance mb-2">Program Kerja</h1>
              <p className="text-muted-foreground text-lg">Himpunan Mahasiswa Teknik Informatika</p>
              <p className="text-sm text-muted-foreground mt-1">Periode 2024/2025</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Total Program</div>
              <div className="text-3xl font-bold text-primary">{programKerjaData.length}</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
              className="font-medium"
            >
              Semua Program
            </Button>
            {Object.entries(statusConfig).map(([status, config]) => (
              <Button
                key={status}
                variant={selectedFilter === status ? "default" : "outline"}
                onClick={() => setSelectedFilter(status as ProgramStatus)}
                className="font-medium"
              >
                <config.icon className="w-4 h-4 mr-2" />
                {config.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 timeline-line"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {filteredPrograms.map((program, index) => {
              const config = statusConfig[program.status]
              const StatusIcon = config.icon

              return (
                <div key={program.id} className="relative flex items-start gap-8">
                  {/* Timeline Dot */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${config.color} glow-effect`}
                  >
                    <StatusIcon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content Card */}
                  <Card
                    className="flex-1 p-8 bg-card/80 backdrop-blur-sm border-border hover:bg-card/90 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedProgram(program)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className={`${config.color} ${config.textColor} border-0 px-3 py-1`}>
                            {config.label}
                          </Badge>
                          <Badge variant="outline" className="text-muted-foreground">
                            {program.department}
                          </Badge>
                        </div>

                        <h3 className="text-2xl font-bold text-balance mb-3">{program.title}</h3>

                        <p className="text-muted-foreground text-pretty mb-6 leading-relaxed">{program.description}</p>

                        {/* Progress Bar for Ongoing Programs */}
                        {program.status === "ongoing" && (
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm text-muted-foreground">{program.progress}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className="bg-accent h-2 rounded-full transition-all duration-300"
                                style={{ width: `${program.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Program Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(program.startDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{program.participants} peserta</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Target className="w-4 h-4" />
                            <span>{program.budget}</span>
                          </div>
                        </div>

                        {/* Click to view details hint */}
                        <div className="mt-4 text-sm text-primary/70 hover:text-primary transition-colors">
                          Klik untuk melihat detail lengkap →
                        </div>
                      </div>

                      {/* Date Badge */}
                      <div className="text-right">
                        <div className="bg-secondary/50 rounded-lg p-4 min-w-[140px]">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <CalendarDays className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Periode
                            </span>
                          </div>
                          <div className="text-sm font-medium">{formatDate(program.startDate)}</div>
                          <div className="text-xs text-muted-foreground">s/d {formatDate(program.endDate)}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = programKerjaData.filter((p) => p.status === status).length
            const StatusIcon = config.icon

            return (
              <Card key={status} className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${config.color}`}>
                    <StatusIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground">{config.label}</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-balance">{selectedProgram.title}</h2>
                <p className="text-muted-foreground">{selectedProgram.department}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProgram(null)}
                className="hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              {/* Status and Basic Info */}
              <div className="flex flex-wrap gap-4">
                <Badge
                  className={`${statusConfig[selectedProgram.status].color} ${statusConfig[selectedProgram.status].textColor} border-0 px-3 py-1`}
                >
                  {statusConfig[selectedProgram.status].label}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(selectedProgram.startDate)} - {formatDate(selectedProgram.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedProgram.location}</span>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Deskripsi Program</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedProgram.detailedDescription}</p>
              </div>

              {/* Leader */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Ketua Program</h3>
                <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                  <img
                    src={selectedProgram.leaderAvatar || "/placeholder.svg"}
                    alt={selectedProgram.leader}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{selectedProgram.leader}</div>
                    <div className="text-sm text-muted-foreground">Ketua Program Kerja</div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tim Pelaksana</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProgram.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Stats */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Informasi Program</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/20 rounded-lg text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{selectedProgram.participants}</div>
                    <div className="text-sm text-muted-foreground">Peserta</div>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg text-center">
                    <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">{selectedProgram.budget}</div>
                    <div className="text-sm text-muted-foreground">Anggaran</div>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg text-center">
                    <User className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{selectedProgram.team.length + 1}</div>
                    <div className="text-sm text-muted-foreground">Tim Inti</div>
                  </div>
                </div>
              </div>

              {/* Progress for ongoing programs */}
              {selectedProgram.status === "ongoing" && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Progress Program</h3>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Kemajuan Pelaksanaan</span>
                      <span className="text-lg font-bold text-primary">{selectedProgram.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedProgram.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Documentation Photos */}
              {selectedProgram.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Dokumentasi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProgram.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Dokumentasi ${selectedProgram.title} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProgram.photos.length === 0 && selectedProgram.status === "upcoming" && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Dokumentasi
                  </h3>
                  <div className="p-8 bg-secondary/20 rounded-lg text-center">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">Dokumentasi akan tersedia setelah program dilaksanakan</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
