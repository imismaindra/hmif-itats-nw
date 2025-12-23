"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, User, Tag, Loader2 } from "lucide-react"
import { PengumumanDetail } from "@/components/pengumuman-detail"
import { usePosts, Post } from "@/lib/react-query"

export default function PengumumanPage() {
  const [selectedPengumuman, setSelectedPengumuman] = useState<Post | null>(null)
  const [filter, setFilter] = useState<"semua" | "pengumuman" | "berita">("semua")

  // Fetch posts from database (only active posts for public view)
  const { data: posts, isLoading, error } = usePosts()

  // Filter posts: only active posts, then by category
  const filteredPengumuman = posts?.filter(
    (pengumuman: Post) => pengumuman.is_active && (filter === "semua" || pengumuman.category === filter),
  ) || []

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

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleDateString('id-ID', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <p className="text-center text-muted-foreground">Memuat pengumuman...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Gagal memuat pengumuman</p>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    );
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

      {/* Empty State */}
      {filteredPengumuman.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {filter === "semua" ? "Belum ada pengumuman" : `Belum ada ${filter}`}
          </p>
        </div>
      )}

      {/* Announcements Grid */}
      <div className="grid gap-6 md:gap-8">
        {filteredPengumuman.map((pengumuman: Post) => (
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
                      <div className="text-2xl font-bold text-primary">{formatDate(pengumuman.date).split(' ')[0]}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(pengumuman.date).split(' ')[1]} {formatDate(pengumuman.date).split(' ')[2]}
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
                      {pengumuman.tags.map((tag: string) => (
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
