'use client';

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useDivisions, useMembers } from "@/lib/react-query"

interface OrgMember {
  id: string
  name: string
  position: string
  department?: string
  image?: string
  email?: string
  level: number
}

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
  const { data: members, isLoading: membersLoading } = useMembers();
  const { data: divisions, isLoading: divisionsLoading } = useDivisions();

  if (membersLoading || divisionsLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-12">
        <div className="text-center">Memuat struktur organisasi...</div>
      </div>
    );
  }

  // Create a map of member_id to division_name for quick lookup
  const memberDivisionMap: { [key: number]: string } = {};
  divisions?.forEach((division: any) => {
    division.members?.forEach((member: any) => {
      memberDivisionMap[member.member_id] = division.name;
    });
  });

  // Convert all members to OrgMember format
  const allMembers: OrgMember[] = members?.map((member: any) => ({
    id: member.id.toString(),
    name: member.name,
    position: member.position,
    department: memberDivisionMap[member.id] || member.department, // Use division name if assigned, otherwise use member's department
    image: member.image,
    email: member.email,
    level: member.level,
  })) || [];

  // Group members by level
  const level1Members = allMembers.filter((m) => m.level === 1);
  const level2Members = allMembers.filter((m) => m.level === 2);
  const level3Members = allMembers.filter((m) => m.level === 3);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* Level 1 - Leadership */}
      {level1Members.length > 0 && (
        <>
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
        </>
      )}

      {/* Level 2 - Core Management */}
      {level2Members.length > 0 && (
        <>
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
        </>
      )}

      {/* Level 3 - Coordinators */}
      {level3Members.length > 0 && (
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
      )}

      {allMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Belum ada anggota yang terdaftar dalam struktur organisasi</p>
        </div>
      )}
    </div>
  );
}
