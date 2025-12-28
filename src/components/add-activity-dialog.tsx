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
import { FileUpload } from '@/components/ui/file-upload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddActivityDialogProps {
  children: React.ReactNode;
}

export function AddActivityDialog({ children }: AddActivityDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    end_date: '',
    participants_count: '',
    participants_description: '',
    description: '',
    detailed_description: '',
    status: 'completed',
    location: '',
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
        end_date: '',
        participants_count: '',
        participants_description: '',
        description: '',
        detailed_description: '',
        status: 'completed',
        location: '',
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INTERNAL">Internal</SelectItem>
                  <SelectItem value="SOSIAL">Sosial</SelectItem>
                  <SelectItem value="AKADEMIK">Akademik</SelectItem>
                  <SelectItem value="KOMPETISI">Kompetisi</SelectItem>
                  <SelectItem value="LAINNYA">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Akan Datang</SelectItem>
                  <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal Mulai *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Tanggal Selesai</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label htmlFor="participants_description">Deskripsi Peserta</Label>
              <Input
                id="participants_description"
                value={formData.participants_description}
                onChange={(e) => handleChange('participants_description', e.target.value)}
                placeholder="Contoh: Mahasiswa aktif, Dosen, dll"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Tempat pelaksanaan kegiatan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Singkat *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Deskripsi singkat kegiatan (untuk preview)"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailed_description">Detail Kegiatan</Label>
            <Textarea
              id="detailed_description"
              value={formData.detailed_description}
              onChange={(e) => handleChange('detailed_description', e.target.value)}
              placeholder="Deskripsi lengkap dan detail kegiatan (opsional)"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Gambar</Label>
            <FileUpload
              value={formData.image}
              onChange={(url) => handleChange('image', url)}
              placeholder="Pilih gambar untuk kegiatan"
              maxSize={5}
              category="kegiatan"
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
