import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface OrgMember {
  id: string
  name: string
  position: string
  department?: string
  image?: string
  email?: string
  level: number
}

const organizationData: OrgMember[] = [
  {
    id: "1",
    name: "R. Abiyyu Ardi Lian Permadi",
    position: "Ketua Umum",
    department: "Kepemimpinan",
    level: 1,
    image: "/professional-student-leader.jpg",
  },
  {
    id: "2",
    name: "Nur Layli Ramadhani Sufyan",
    position: "Wakil Ketua",
    department: "Kepemimpinan",
    level: 1,
    image: "/professional-female-student.png",
  },
  {
    id: "3",
    name: "Ridho Pangestu",
    position: "Sekretaris Umum",
    department: "Administrasi",
    level: 2,
    image: "/professional-male-secretary.jpg",
  },
  {
    id: "4",
    name: "Rizka Amalia",
    position: "Bendahara Umum",
    department: "Keuangan",
    level: 2,
    image: "/professional-female-treasurer.jpg",
  },
  {
    id: "5",
    name: "Firman Ardiansyah",
    position: "Koordinator PSDM",
    department: "Pengembangan SDM",
    level: 3,
    image: "/academic-coordinator-student.jpg",
  },
  {
    id: "6",
    name: "Tarishah Aridhah Zhafirah",
    position: "Koordinator Humas",
    department: "Hubungan Masyarakat",
    level: 3,
    image: "/student-affairs-coordinator.jpg",
  },
  {
    id: "7",
    name: "Haza Satria Nagari",
    position: "Koordinator Litbang",
    department: "Penelitian dan Pengembangan",
    level: 3,
    image: "/public-relations-student.jpg",
  },
]

const MemberCard = ({ member }: { member: OrgMember }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-20 h-20 border-2 border-primary/20">
          <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-balance leading-tight">{member.name}</h3>
          <Badge variant="secondary" className="text-xs font-medium">
            {member.position}
          </Badge>
          {member.department && <p className="text-sm text-muted-foreground">{member.department}</p>}
        </div>
      </div>
    </Card>
  )
}

export default function OrganizationChart() {
  const level1Members = organizationData.filter((m) => m.level === 1)
  const level2Members = organizationData.filter((m) => m.level === 2)
  const level3Members = organizationData.filter((m) => m.level === 3)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* Level 1 - Leadership */}
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-primary">Pimpinan Organisasi</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          {level1Members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Connection Line */}
      <div className="flex justify-center">
        <div className="w-px h-12 bg-border"></div>
      </div>

      {/* Level 2 - Core Management */}
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-primary">Manajemen Inti</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          {level2Members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Connection Line */}
      <div className="flex justify-center">
        <div className="w-px h-12 bg-border"></div>
      </div>

      {/* Level 3 - Coordinators */}
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-primary">Koordinator Bidang</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {level3Members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}
