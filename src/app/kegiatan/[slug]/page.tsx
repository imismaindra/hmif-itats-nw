'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Users, MapPin, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ActivityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: activity, isLoading, error } = useQuery({
    queryKey: ['activity', slug],
    queryFn: async () => {
      const response = await fetch(`/api/activities?slug=${slug}`);
      if (!response.ok) throw new Error('Failed to fetch activity');
      const activities = await response.json();
      return activities.find((a: any) => a.slug === slug);
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Memuat detail kegiatan...</div>
        </div>
      </main>
    );
  }

  if (error || !activity) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Kegiatan Tidak Ditemukan</h1>
            <Link href="/kegiatan">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Daftar Kegiatan
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      AKADEMIK: "bg-blue-100 text-blue-800",
      KOMPETISI: "bg-red-100 text-red-800",
      PELATIHAN: "bg-green-100 text-green-800",
      SOSIAL: "bg-purple-100 text-purple-800",
      KUNJUNGAN: "bg-orange-100 text-orange-800",
      INTERNAL: "bg-indigo-100 text-indigo-800",
      LAINNYA: "bg-gray-100 text-gray-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      ongoing: "bg-blue-100 text-blue-800",
      upcoming: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto">
          <Link href="/kegiatan">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Kegiatan
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className={getCategoryColor(activity.category)}>
                  {activity.category}
                </Badge>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status === 'completed' ? 'Selesai' :
                   activity.status === 'ongoing' ? 'Sedang Berlangsung' :
                   activity.status === 'upcoming' ? 'Akan Datang' : 'Dibatalkan'}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">
                {activity.title}
              </h1>

              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{formatDate(activity.date)}</span>
                  {activity.end_date && (
                    <span> - {formatDate(activity.end_date)}</span>
                  )}
                </div>

                {activity.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{activity.location}</span>
                  </div>
                )}

                {(activity.participants_count || activity.participants_description) && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>
                      {activity.participants_count ? `${activity.participants_count} peserta` : ''}
                      {activity.participants_description && ` (${activity.participants_description})`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Deskripsi Kegiatan</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {activity.description}
                  </p>
                </div>
              </Card>

              {/* Detailed Description */}
              {activity.detailed_description && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Detail Kegiatan</h2>
                  <div className="prose prose-gray max-w-none">
                    <div
                      className="text-muted-foreground leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: activity.detailed_description }}
                    />
                  </div>
                </Card>
              )}

              {/* Photos */}
              {activity.photos && activity.photos.length > 0 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Galeri Foto</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activity.photos.map((photo: string, index: number) => (
                      <div key={index} className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={photo}
                          alt={`${activity.title} - Foto ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informasi Kegiatan</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Kategori</span>
                    <Badge className={`${getCategoryColor(activity.category)} mt-1`}>
                      {activity.category}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                    <Badge className={`${getStatusColor(activity.status)} mt-1`}>
                      {activity.status === 'completed' ? 'Selesai' :
                       activity.status === 'ongoing' ? 'Sedang Berlangsung' :
                       activity.status === 'upcoming' ? 'Akan Datang' : 'Dibatalkan'}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Tanggal</span>
                    <p className="text-sm mt-1">
                      {formatDate(activity.date)}
                      {activity.end_date && ` - ${formatDate(activity.end_date)}`}
                    </p>
                  </div>

                  {activity.location && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Lokasi</span>
                      <p className="text-sm mt-1">{activity.location}</p>
                    </div>
                  )}

                  {(activity.participants_count || activity.participants_description) && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Peserta</span>
                      <p className="text-sm mt-1">
                        {activity.participants_count ? `${activity.participants_count} orang` : ''}
                        {activity.participants_description && ` (${activity.participants_description})`}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Navigation */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
                <div className="space-y-3">
                  <Link href="/kegiatan">
                    <Button variant="outline" className="w-full justify-start">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Daftar Kegiatan
                    </Button>
                  </Link>

                  <Link href="/pengumuman">
                    <Button variant="outline" className="w-full justify-start">
                      Lihat Pengumuman
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
