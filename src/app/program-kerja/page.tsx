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
import Image from "next/image"

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
    title: "Promosi Himpunan Mahasiswa Teknik Informatika 2025",
    description: "Promosi dan pemberian wawasan tentang HMIF ITATS kepada mahasiswa baru Teknik Informatika ITATS.",
    startDate: "2025-10-01",
    endDate: "2025-10-01",
    status: "completed",
    progress: 70,
    department: "Humas",
    participants: 99,
    budget: "Rp -",
    leader: "R. Abiyyu Ardi Lian Permadi",
    leaderAvatar: "/uploads/anggota/abiyyu-kahim.png",
    team: [
      { name: "Ahmad Maulana Ismaindra", role: "Dokumentasi", avatar: "/uploads/anggota/jawir.png" },
      { name: "Tarishah Aridhah Zhafirah", role: "Publikasi", avatar: "/uploads/anggota/tata_akmj.png" },
    ],
    location: "Graha ITATS",
    photos: ["/poster_pomosi.png"],
    detailedDescription:
      "Kegiatan ini bertujuan memperkenalkan HMIF ITATS kepada mahasiswa baru Teknik Informatika ITATS, meliputi pengenalan program kerja, struktur organisasi, dan manfaat bergabung di himpunan.",
  },
  {
    id: "2",
    title: "Open Recruitment",
    description: "Penerimaan anggota baru HMIF ITATS.",
    startDate: "2025-10-10",
    endDate: "2025-10-25",
    status: "upcoming",
    progress: 0,
    department: "Keanggotaan",
    participants: 150,
    budget: "Rp 100.000",
    leader: "Ayu Lestari",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Bagus Setiawan", role: "Sekretaris", avatar: "/male-student-studying.png" },
      { name: "Nur Aini", role: "Koordinator Registrasi", avatar: "/diverse-female-student.png" },
    ],
    location: "Ruang Seminar ITATS",
    photos: ["/open-recruitment-session.jpg"],
    detailedDescription:
      "Open recruitment dilaksanakan untuk merekrut anggota baru HMIF ITATS dengan seleksi administrasi, wawancara, dan orientasi pengenalan organisasi.",
  },
  {
    id: "3",
    title: "Pelatihan Manajemen dan Organisasi (PMO)",
    description: "Pelatihan manajemen dan organisasi bagi anggota himpunan HMIF ITATS.",
    startDate: "2025-11-05",
    endDate: "2025-11-10",
    status: "upcoming",
    progress: 0,
    department: "Pengembangan SDM",
    participants: 100,
    budget: "Rp 750.000",
    leader: "Andi Wijaya",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Fitri Handayani", role: "Bendahara", avatar: "/diverse-female-student.png" },
      { name: "Yusuf Ali", role: "Materi", avatar: "/male-student-studying.png" },
    ],
    location: "Aula Kampus ITATS",
    photos: ["/training-leadership.jpg"],
    detailedDescription:
      "Kegiatan ini ditujukan untuk meningkatkan kemampuan manajerial dan organisasi anggota HMIF ITATS melalui workshop, simulasi, dan studi kasus.",
  },
  {
    id: "4",
    title: "Public Speaking Berkelanjutan",
    description: "Pelatihan public speaking kepada seluruh anggota HMIF ITATS.",
    startDate: "2025-11-15",
    endDate: "2026-07-30",
    status: "upcoming",
    progress: 0,
    department: "Pengembangan SDM",
    participants: 120,
    budget: "Rp 0",
    leader: "Nadia Kusuma",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Agus Setiawan", role: "Koordinator Materi", avatar: "/male-student-studying.png" },
    ],
    location: "Lab Komputer & Aula Kampus",
    photos: ["/public-speaking-training.jpg"],
    detailedDescription:
      "Program pelatihan public speaking ini dilaksanakan secara berkelanjutan untuk melatih keberanian, komunikasi efektif, dan presentasi mahasiswa.",
  },
  {
    id: "5",
    title: "Seminar Penjurusan Teknik Informatika",
    description: "Pemberian wawasan tentang penjurusan di Teknik Informatika ITATS.",
    startDate: "2025-11-20",
    endDate: "2025-11-20",
    status: "upcoming",
    progress: 0,
    department: "Akademik",
    participants: 180,
    budget: "Rp 72.000",
    leader: "Bayu Pratama",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Dewi Sartika", role: "Moderator", avatar: "/diverse-female-student.png" },
    ],
    location: "Auditorium Kampus",
    photos: ["/seminar-department.jpg"],
    detailedDescription:
      "Seminar ini membahas pilihan penjurusan di Teknik Informatika ITATS, memberikan pemahaman tentang peluang karir dan bidang keahlian masing-masing.",
  },
  {
    id: "6",
    title: "Penjualan Atribut PDH Himpunan dan Prodi",
    description: "Penjualan atribut himpunan dan prodi bagi seluruh mahasiswa Informatika ITATS.",
    startDate: "2025-11-25",
    endDate: "2025-12-15",
    status: "upcoming",
    progress: 0,
    department: "Kewirausahaan",
    participants: 250,
    budget: "Rp 5.000.000",
    leader: "Dian Puspita",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Joko Santoso", role: "Logistik", avatar: "/male-student-studying.png" },
    ],
    location: "Sekretariat HMIF ITATS",
    photos: ["/merchandise-sales.jpg"],
    detailedDescription:
      "Program ini menyediakan atribut resmi himpunan dan prodi (seperti PDH, kaos, dan pin) untuk mahasiswa Informatika ITATS.",
  },
  {
    id: "7",
    title: "Penyambutan Wisuda 73",
    description: "Penyambutan wisudawan ke-73 Teknik Informatika oleh HMIF ITATS.",
    startDate: "2025-11-30",
    endDate: "2025-11-30",
    status: "upcoming",
    progress: 0,
    department: "Acara",
    participants: 300,
    budget: "Rp 200.000",
    leader: "Rahmat Hidayat",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Mega Lestari", role: "Koordinator Dekorasi", avatar: "/diverse-female-student.png" },
    ],
    location: "Gedung Serbaguna ITATS",
    photos: ["/graduation-ceremony.jpg"],
    detailedDescription:
      "Kegiatan ini bertujuan memberikan apresiasi kepada wisudawan Teknik Informatika angkatan ke-73 dengan acara seremonial sederhana.",
  },
  {
    id: "8",
    title: "Informatics Programming Competition",
    description: "Kompetisi pemrograman terstruktur, basis data, dan pemrograman web untuk mahasiswa Teknik Informatika ITATS.",
    startDate: "2026-01-10",
    endDate: "2026-01-15",
    status: "upcoming",
    progress: 0,
    department: "Kompetisi",
    participants: 100,
    budget: "Rp 600.000",
    leader: "Hendra Gunawan",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Lisa Anggraini", role: "Panitia Teknis", avatar: "/diverse-female-student.png" },
    ],
    location: "Lab Komputer ITATS",
    photos: ["/coding-competition.jpg"],
    detailedDescription:
      "Kompetisi ini bertujuan meningkatkan kemampuan mahasiswa dalam pemrograman dasar, basis data, dan web development.",
  },
  {
    id: "9",
    title: "Bakti Sosial Ramadhan 2026",
    description: "Pelaksanaan bakti sosial ke panti asuhan dan memberikan santunan sosial.",
    startDate: "2026-03-15",
    endDate: "2026-03-25",
    status: "upcoming",
    progress: 0,
    department: "Sosial",
    participants: 80,
    budget: "Rp 700.000",
    leader: "Sofia Rahmawati",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Arif Nugroho", role: "Koordinator Lapangan", avatar: "/male-student-studying.png" },
    ],
    location: "Panti Asuhan Al-Hidayah",
    photos: ["/social-service.jpg"],
    detailedDescription:
      "Bakti sosial ini berupa santunan kepada anak-anak panti asuhan, berbuka puasa bersama, serta pemberian sembako.",
  },
  {
    id: "10",
    title: "Penyambutan Wisuda 74",
    description: "Penyambutan wisudawan ke-74 Teknik Informatika oleh HMIF ITATS.",
    startDate: "2026-05-20",
    endDate: "2026-05-20",
    status: "upcoming",
    progress: 0,
    department: "Acara",
    participants: 320,
    budget: "Rp 200.000",
    leader: "Adi Saputra",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Lina Marlina", role: "Koordinator Acara", avatar: "/diverse-female-student.png" },
    ],
    location: "Gedung Serbaguna ITATS",
    photos: ["/graduation-event.jpg"],
    detailedDescription:
      "Acara penyambutan wisudawan angkatan ke-74 dilakukan dengan rangkaian hiburan, sambutan, dan persembahan dari HMIF ITATS.",
  },
  {
    id: "11",
    title: "Debat Calon Ketua HMIF dan Pemilu Raya 2026/2027",
    description: "Debat calon ketua HMIF 2026/2027 dan pelaksanaan pemilu raya.",
    startDate: "2026-07-05",
    endDate: "2026-07-15",
    status: "upcoming",
    progress: 0,
    department: "Keorganisasian",
    participants: 200,
    budget: "Rp 100.000",
    leader: "Farhan Maulana",
    leaderAvatar: "/male-student-leader.png",
    team: [
      { name: "Nisa Putri", role: "Moderator Debat", avatar: "/diverse-female-student.png" },
    ],
    location: "Aula Utama ITATS",
    photos: ["/student-debate.jpg"],
    detailedDescription:
      "Debat ini bertujuan menilai visi misi calon ketua HMIF sebelum pemilihan umum mahasiswa untuk periode 2026/2027.",
  },
  {
    id: "12",
    title: "Musyawarah Himpunan Periode 2026/2027",
    description: "Pelaksanaan revisi AD ART dan GBHO HMIF ITATS.",
    startDate: "2026-08-10",
    endDate: "2026-08-15",
    status: "upcoming",
    progress: 0,
    department: "Keorganisasian",
    participants: 100,
    budget: "Rp 800.000",
    leader: "Yuliana Sari",
    leaderAvatar: "/female-student-leader.png",
    team: [
      { name: "Reza Mahendra", role: "Notulen", avatar: "/male-student-studying.png" },
    ],
    location: "Ruang Sidang ITATS",
    photos: ["/student-meeting.jpg"],
    detailedDescription:
      "Musyawarah ini dilakukan untuk melakukan revisi AD ART dan GBHO HMIF ITATS sebagai pedoman organisasi periode 2026/2027.",
  },
];

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
              <p className="text-sm text-muted-foreground mt-1">Periode 2025/2026</p>
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
                    className={`relative flex items-center justify-center w-16 h-16 rounded-full ${config.color} glow-effect`}
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
                  <Image
                    width={400}
                    height={400}
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
                      <Image
                        width={400}
                        height={400}
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
                        <Image
                          width={400}
                          height={300}
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
