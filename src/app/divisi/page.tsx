"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Crown, Mail, Phone, MapPin } from "lucide-react"

interface Member {
  id: string
  name: string
  role: "coordinator" | "member"
  email: string
  phone: string
  avatar?: string
  department: string
}

interface Division {
  id: string
  name: string
  description: string
  color: string
  members: Member[]
}

const divisionsData: Division[] = [
  {
    id: "psdm",
    name: "Divisi Pengembangan SDM",
    description: "Mengelola kegiatan akademik dan pengembangan intelektual mahasiswa",
    color: "from-blue-500 to-cyan-500",
    members: [
      {
        id: "1",
        name: "Firman Ardiansyah",
        role: "coordinator",
        email: "exemple@exemple.com",
        phone: "+62 812-3456-7890",
        department: "Koordinator",
        avatar: "/professional-male-student.png",
      },
      {
        id: "2",
        name: "Hasan Abdul Latif",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 813-4567-8901",
        department: "Anggota",
        avatar: "/professional-female-student.png",
      },
      {
        id: "3",
        name: "Raesyitha Elga Rolobessy",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 814-5678-9012",
        department: "Anggota",
        avatar: "/professional-male-student-glasses.jpg",
      },
      {
        id: "4",
        name: "Madadina Adilah Pamuji",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 814-5678-9012",
        department: "Anggota",
        avatar: "/professional-female-student.jpg",
      },
      {
        id: "5",
        name: "Maria Yesinta Fernanda",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 814-5678-9012",
        department: "Anggota",
        avatar: "/professional-female-student.jpg",
      },
    ],
  },
  {
    id: "humas",
    name: "Divisi Hubungan Masyarakat",
    description: "Menjalin komunikasi dan kerjasama dengan pihak eksternal",
    color: "from-purple-500 to-pink-500",
    members: [
      {
        id: "6",
        name: "Tarishah Aridhah Zhafirah",
        role: "coordinator",
        email: "exemple@exemple.com",
        phone: "+62 815-6789-0123",
        department: "Komunikasi",
        avatar: "/professional-female-student-smile.jpg",
      },
      {
        id: "7",
        name: "Ahmad Maulana Ismaindra",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 816-7890-1234",
        department: "Public Relations",
        avatar: "/professional-male-student-confident.jpg",
      },
      {
        id: "8",
        name: "Timy Kakeru",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 816-7890-1234",
        department: "Public Relations",
        avatar: "/professional-male-student-confident.jpg",
      },
      {
        id: "9",
        name: "Rafly Rizky Pratama",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 816-7890-1234",
        department: "Public Relations",
        avatar: "/professional-male-student-confident.jpg",
      },
    ],
  },
  {
    id: "kreatif",
    name: "Divisi Penelitian dan Pengembangan ",
    description: "Fokus pada kemampuan ilmiah dan teknologi (IPTEK), menghasilkan temuan baru, serta meningkatkan keahlian (soft skill dan hard skill) anggota",
    color: "from-green-500 to-teal-500",
    members: [
      {
        id: "10",
        name: "Haza Satria Nagari",
        role: "coordinator",
        email: "exemple@exemple.com",
        phone: "+62 817-8901-2345",
        department: "Litbang",
        avatar: "/creative-female-student-artist.jpg",
      },
      {
        id: "11",
        name: "Amelya Sofia Anggraini",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 818-9012-3456",
        department: "Litbang",
        avatar: "/creative-male-student-photographer.jpg",
      },
      {
        id: "12",
        name: "Nazwa Zahira Eka Aryanto",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 819-0123-4567",
        department: "Litbang",
        avatar: "/creative-female-student-camera.jpg",
      },
      {
        id: "13",
        name: "Khalfullah Rafiuddin Lukman",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 819-0123-4567",
        department: "Litbang",
        avatar: "/creative-female-student-camera.jpg",
      },
      {
        id: "14",
        name: "Muhammad Naufal Rizky. A",
        role: "member",
        email: "exemple@exemple.com",
        phone: "+62 819-0123-4567",
        department: "Litbang",
        avatar: "/creative-female-student-camera.jpg",
      },
    ],
  },
]

export default function DivisionsPage() {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{"Struktur Organisasi"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {"Divisi Himpunan"} <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {"Mahasiswa"}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {"Mengenal lebih dekat struktur organisasi dan anggota dari setiap divisi dalam himpunan mahasiswa kami"}
            </p>
          </div>
        </div>
      </div>

      {/* Divisions Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {divisionsData.map((division) => (
            <Card
              key={division.id}
              className="glass-card hover:glow-primary transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedDivision(selectedDivision === division.id ? null : division.id)}
            >
              <div className="p-6 space-y-6">
                {/* Division Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${division.color} flex items-center justify-center glow-accent`}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {division.members.length} {"Anggota"}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {division.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty">{division.description}</p>
                  </div>
                </div>

                {/* Members Preview */}
                <div className="space-y-4">
                  {/* Coordinator */}
                  {division.members
                    .filter((member) => member.role === "coordinator")
                    .map((coordinator) => (
                      <div
                        key={coordinator.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <div className="relative">
                          <Avatar className="w-12 h-12 border-2 border-primary/20">
                            <AvatarImage src={coordinator.avatar || "/placeholder.svg"} alt={coordinator.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {coordinator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Crown className="w-3 h-3 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-card-foreground truncate">{coordinator.name}</p>
                            <Badge variant="default" className="text-xs bg-primary/20 text-primary border-primary/30">
                              {"Koordinator"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{coordinator.department}</p>
                        </div>
                      </div>
                    ))}

                  {/* Members Grid */}
                  <div
                    className={`grid grid-cols-2 gap-3 transition-all duration-300 ${
                      selectedDivision === division.id
                        ? "opacity-100 max-h-none"
                        : "opacity-70 max-h-32 overflow-hidden"
                    }`}
                  >
                    {division.members
                      .filter((member) => member.role === "member")
                      .map((member) => (
                        <div
                          key={member.id}
                          className="glass-card p-3 rounded-lg hover:bg-accent/5 transition-colors group/member"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="w-10 h-10 border border-border/50">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-card-foreground truncate group-hover/member:text-primary transition-colors">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">{member.department}</p>
                            </div>
                          </div>

                          {/* Contact Info - Only show when division is selected */}
                          {selectedDivision === division.id && (
                            <div className="mt-3 pt-3 border-t border-border/30 space-y-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span>{member.phone}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  {/* Expand Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-primary hover:text-primary hover:bg-primary/10"
                  >
                    {selectedDivision === division.id ? "Tutup Detail" : "Lihat Detail Anggota"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">{"Himpunan Mahasiswa Teknik Informatika - ITATS"}</p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{"Jl. Arief Rahman Hakim No.100, Klampis Ngasem, Kec. Sukolilo, Surabaya, Jawa Timur 60117"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
