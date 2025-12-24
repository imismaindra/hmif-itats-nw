'use client';

import { useState } from 'react';
import { useActivities, useDeleteActivity, Activity } from '@/lib/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Search, Calendar, Users, Activity as ActivityIcon } from 'lucide-react';
import { AddActivityDialog } from '@/components/add-activity-dialog';
import { EditActivityDialog } from '@/components/edit-activity-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminKegiatanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: activities, isLoading } = useActivities();
  const deleteActivity = useDeleteActivity();

  const filteredActivities = activities?.filter((activity: Activity) =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteActivity.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete activity:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kelola Kegiatan</h1>
            <p className="text-muted-foreground">Tambah, edit, dan hapus kegiatan HMIF ITATS</p>
          </div>
          <AddActivityDialog>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kegiatan
            </Button>
          </AddActivityDialog>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari kegiatan berdasarkan judul, kategori, atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity: Activity) => (
            <Card key={activity.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Image */}
                {activity.image && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg leading-tight">{activity.title}</h3>
                    <Badge variant="outline" className="ml-2 flex-shrink-0">
                      {activity.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(activity.date).toLocaleDateString('id-ID')}
                    </div>
                    {activity.participants && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {activity.participants}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={activity.status === 'Selesai' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(activity)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kegiatan</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus kegiatan "{activity.title}"?
                          Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(activity.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <ActivityIcon className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Belum ada kegiatan</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Tidak ada kegiatan yang cocok dengan pencarian Anda.' : 'Tambah kegiatan pertama untuk memulai.'}
                </p>
              </div>
              {!searchTerm && (
                <AddActivityDialog>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kegiatan Pertama
                  </Button>
                </AddActivityDialog>
              )}
            </div>
          </Card>
        )}

        {/* Edit Dialog */}
        {selectedActivity && (
          <EditActivityDialog
            activity={selectedActivity}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
        )}
      </div>
    </div>
  );
}
