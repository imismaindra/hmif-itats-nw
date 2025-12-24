'use client';

import { useState, useEffect } from 'react';
import { useUpdateActivity, Activity } from '@/lib/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Activity as ActivityIcon } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';

interface EditActivityDialogProps {
  activity: Activity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditActivityDialog({ activity, open, onOpenChange }: EditActivityDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    participants_count: '',
    participants_description: '',
    description: '',
    status: 'Selesai',
    image: '',
  });
  const [error, setError] = useState('');

  const updateActivity = useUpdateActivity();

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        category: activity.category,
        date: activity.date,
        participants_count: activity.participants_count?.toString() || '',
        participants_description: activity.participants_description || '',
        description: activity.description,
        status: activity.status,
        image: activity.image || '',
      });
    }
  }, [activity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await updateActivity.mutateAsync({
        id: activity.id,
        ...formData,
        created_at: activity.created_at,
        updated_at: new Date().toISOString(),
      });

      onOpenChange(false);
    } catch (error) {
      setError('Gagal memperbarui kegiatan. Silakan coba lagi.');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5" />
            Edit Kegiatan
          </DialogTitle>
          <DialogDescription>
            Perbarui informasi kegiatan HMIF ITATS
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Kegiatan *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Masukkan judul kegiatan"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Contoh: Workshop, Seminar, dll"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants_count">Jumlah Peserta</Label>
              <Input
                id="participants_count"
                type="number"
                value={formData.participants_count}
                onChange={(e) => handleChange('participants_count', e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants_description">Deskripsi Peserta</Label>
            <Input
              id="participants_description"
              value={formData.participants_description}
              onChange={(e) => handleChange('participants_description', e.target.value)}
              placeholder="Contoh: Mahasiswa aktif, Dosen, dll"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              placeholder="Status kegiatan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Deskripsi lengkap kegiatan"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Gambar</Label>
            <FileUpload
              value={formData.image}
              onChange={(url) => handleChange('image', url)}
              placeholder="Pilih gambar untuk kegiatan"
              maxSize={5}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateActivity.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={updateActivity.isPending}>
              {updateActivity.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
