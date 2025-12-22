'use client';

import { useState } from 'react';
import { useCreateActivity } from '@/lib/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Activity as ActivityIcon } from 'lucide-react';

interface AddActivityDialogProps {
  children: React.ReactNode;
}

export function AddActivityDialog({ children }: AddActivityDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    participants: '',
    description: '',
    status: 'Selesai',
    image: '',
  });
  const [error, setError] = useState('');

  const createActivity = useCreateActivity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createActivity.mutateAsync(formData);

      setOpen(false);
      setFormData({
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        participants: '',
        description: '',
        status: 'Selesai',
        image: '',
      });
    } catch (error) {
      setError('Gagal menambahkan kegiatan. Silakan coba lagi.');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5" />
            Tambah Kegiatan
          </DialogTitle>
          <DialogDescription>
            Tambahkan kegiatan baru untuk website HMIF ITATS
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
              <Label htmlFor="participants">Peserta</Label>
              <Input
                id="participants"
                value={formData.participants}
                onChange={(e) => handleChange('participants', e.target.value)}
                placeholder="Jumlah atau deskripsi peserta"
              />
            </div>
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
            <Label htmlFor="image">URL Gambar</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createActivity.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createActivity.isPending}>
              {createActivity.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
