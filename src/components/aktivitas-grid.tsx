'use client'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface Activity {
  id: number
  title: string
  category: string
  date: string
  participants: string
  description: string
  status: string
  image: string
}

export function AktivitasGrid() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities')
        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return (
      <section id="kegiatan" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Program Kerja yang Telah Selesai</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Memuat data kegiatan...
            </p>
          </div>
        </div>
      </section>
    )
  }

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
          {activities.map((activity, index) => {
            const formatDate = (dateString: string) => {
              const date = new Date(dateString)
              const monthNames = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
              ]
              return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
            }

            return (
              <Card key={activity.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
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
                    <span className="text-xs text-muted-foreground">{formatDate(activity.date)}</span>
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
            )
          })}
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
