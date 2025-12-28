'use client';

import { usePosts, useActivities, usePrograms, useMembers, useDivisions, Post, Activity as ActivityType, Division, DivisionMember } from '@/lib/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Activity as ActivityIcon, Calendar, Users, Building, X, Settings, LayoutDashboard, FileText as AnnouncementIcon, Activity, Users as MembersIcon } from 'lucide-react';
import { AddPostDialog } from '@/components/add-post-dialog';
import { AddActivityDialog } from '@/components/add-activity-dialog';
import { AddProgramDialog } from '@/components/add-program-dialog';
import { AddMemberDialog } from '@/components/add-member-dialog';
import { ManagePostsDialog } from '@/components/manage-posts-dialog';
import { ManageDivisionsDialog } from '@/components/manage-divisions-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useState } from 'react';

function ContentTypeSelector({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tambah Konten Baru
          </DialogTitle>
          <DialogDescription>
            Pilih jenis konten yang ingin ditambahkan
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <AddPostDialog>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Pengumuman</span>
            </Button>
          </AddPostDialog>

          <AddActivityDialog>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <ActivityIcon className="w-6 h-6" />
              <span className="text-sm">Kegiatan</span>
            </Button>
          </AddActivityDialog>

          <AddProgramDialog>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Program Kerja</span>
            </Button>
          </AddProgramDialog>

          <AddMemberDialog>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Anggota</span>
            </Button>
          </AddMemberDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminDashboard() {
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const { data: posts, isLoading: postsLoading } = usePosts();
  const { data: activities, isLoading: activitiesLoading } = useActivities();
  const { data: programs, isLoading: programsLoading } = usePrograms();
  const { data: members, isLoading: membersLoading } = useMembers();
  const { data: divisions, isLoading: divisionsLoading } = useDivisions();

  const stats = [
    {
      title: 'Total Pengumuman',
      value: posts?.length || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Kegiatan',
      value: activities?.length || 0,
      icon: ActivityIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Program Kerja',
      value: programs?.length || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Anggota Organisasi',
      value: members?.length || 0,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Divisi',
      value: divisions?.length || 0,
      subtitle: `${divisions?.reduce((acc: number, div: Division) => acc + (div.members?.length || 0), 0) || 0} anggota`,
      icon: Building,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  if (postsLoading || activitiesLoading || programsLoading || membersLoading || divisionsLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Kelola konten website HMIF ITATS</p>
            </div>
            <Button variant="outline" onClick={() => setContentDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Konten
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      {stat.subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recent Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Posts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Pengumuman Terbaru</h3>
                <div className="flex gap-2">
                  <Link href="/admin/pengumuman">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Kelola
                    </Button>
                  </Link>
                  <AddPostDialog>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah
                    </Button>
                  </AddPostDialog>
                </div>
              </div>
              <div className="space-y-4">
                {posts?.slice(0, 3).map((post: Post) => (
                  <div key={post.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{post.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Kegiatan Terbaru</h3>
                <Link href="/admin/kegiatan">
                  <Button variant="outline" size="sm">
                    Lihat Semua
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {activities?.slice(0, 3).map((activity: ActivityType) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Organization Management */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Struktur Organisasi</h3>
              <ManageDivisionsDialog>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Kelola Divisi
                </Button>
              </ManageDivisionsDialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {divisions?.slice(0, 6).map((division: Division) => (
                <div key={division.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: division.gradient_from }}
                    />
                    <span className="font-medium">{division.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{division.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>{division.members?.length || 0} anggota</span>
                    <Badge variant="outline" className="text-xs">
                      {division.members?.filter((m: DivisionMember) => m.is_coordinator).length || 0} koordinator
                    </Badge>
                  </div>
                </div>
              ))}

              {(!divisions || divisions.length === 0) && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  Belum ada divisi. Klik "Kelola Divisi" untuk menambah divisi pertama.
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AddPostDialog>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">Tambah Pengumuman</span>
                </Button>
              </AddPostDialog>

              <AddActivityDialog>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <ActivityIcon className="w-5 h-5" />
                  <span className="text-sm">Tambah Kegiatan</span>
                </Button>
              </AddActivityDialog>

              <AddProgramDialog>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Tambah Program</span>
                </Button>
              </AddProgramDialog>

              <AddMemberDialog>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Tambah Anggota</span>
                </Button>
              </AddMemberDialog>
            </div>
          </Card>

          <ContentTypeSelector open={contentDialogOpen} onOpenChange={setContentDialogOpen} />
        </div>
    </div>
  );
}
