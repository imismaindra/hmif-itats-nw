'use client'
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface StatsData {
  completedPrograms: number
  totalParticipants: number
  partners: number
  activeMonths: number
}

export function StatsSection() {
  const [stats, setStats] = useState<StatsData>({
    completedPrograms: 0,
    totalParticipants: 0,
    partners: 3, // Default value, could be calculated later
    activeMonths: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all programs and filter client-side
        const programsResponse = await fetch('/api/programs')
        const allPrograms = programsResponse.ok ? await programsResponse.json() : []

        // Fetch all activities
        const activitiesResponse = await fetch('/api/activities')
        const activities = activitiesResponse.ok ? await activitiesResponse.json() : []

        // Filter completed programs client-side
        const completedPrograms = allPrograms.filter((program: any) => program.status === 'completed').length

        // Calculate total participants from activities
        const totalParticipants = activities.reduce((sum: number, activity: any) => {
          const participantText = activity.participants || "0"
          const match = participantText.match(/(\d+)/)
          const count = match ? parseInt(match[1]) : 0
          return sum + count
        }, 0)

        // Calculate active months (unique months from activity dates)
        const months = new Set<string>()
        activities.forEach((activity: any) => {
          if (activity.date) {
            const date = new Date(activity.date)
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`
            months.add(monthKey)
          }
        })
        const activeMonths = months.size

        setStats({
          completedPrograms,
          totalParticipants,
          partners: 3, // Keep default for now
          activeMonths
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const displayStats = [
    {
      number: loading ? "..." : stats.completedPrograms.toString(),
      label: "Program Kerja Selesai",
      description: "Berbagai kegiatan akademik dan non-akademik"
    },
    {
      number: loading ? "..." : `${stats.totalParticipants}+`,
      label: "Mahasiswa Terlibat",
      description: "Partisipasi aktif dari seluruh angkatan"
    },
    {
      number: loading ? "..." : stats.partners.toString(),
      label: "Mitra Kerjasama",
      description: "Kolaborasi dengan industri dan institusi"
    },
    {
      number: loading ? "..." : stats.activeMonths.toString(),
      label: "Bulan Aktif",
      description: "Konsistensi kegiatan sepanjang tahun"
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
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
