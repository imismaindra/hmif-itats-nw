"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark } from "lucide-react"
import { Post } from "@/lib/react-query"

interface PengumumanDetailProps {
  pengumuman: Post
  onBack: () => void
}

export function PengumumanDetail({ pengumuman, onBack }: PengumumanDetailProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "tinggi":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "sedang":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rendah":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryColor = (category: string) => {
    return category === "pengumuman"
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-primary/10 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Daftar
      </Button>

      {/* Main Content Card */}
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={getCategoryColor(pengumuman.category)}>{pengumuman.category}</Badge>
              <Badge className={getPriorityColor(pengumuman.priority)}>{pengumuman.priority}</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{pengumuman.title}</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{pengumuman.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{pengumuman.author_name}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {pengumuman.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-border/50">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: pengumuman.content }}
          />
        </div>
      </Card>

      {/* Related Actions */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Aksi Terkait</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Hubungi Penulis</Button>
            <Button variant="outline">Laporkan Masalah</Button>
            <Button variant="outline">Berikan Feedback</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
