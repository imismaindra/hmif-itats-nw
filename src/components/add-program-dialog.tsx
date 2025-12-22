'use client';

import { useState } from 'react';
import { useCreateProgram } from '@/lib/react-query';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Calendar } from 'lucide-react';

interface AddProgramDialogProps {
  children: React.ReactNode;
}

export function AddProgramDialog({ children }: AddProgramDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    status: 'upcoming' as 'completed' | 'ongoing' | 'upcoming',
    progress: 0,
    department: '',
    participants: 0,
    budget: '',
    leader: '',
    team: '',
    location: '',
    photos: '',
    detailed_description: '',
  });
  const [error, setError] = useState('');

  const createProgram = useCreateProgram();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createProgram.mutateAsync({
        ...formData,
        team: formData.team ? formData.team.split(',').map(name => ({ name: name.trim(), role: 'member' })) : [],
        photos: formData.photos ? formData.photos.split(',').map(url => url.trim()) : [],
      });

      setOpen(false);
      setFormData({
        title: '',
        description: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        status: 'upcoming',
        progress: 0,
        department: '',
        participants: 0,
        budget: '',
        leader: '',
        team: '',
        location: '',
        photos: '',
        detailed_description: '',
      });
    } catch (error) {
      setError('Gagal menambahkan program kerja. Silakan coba lagi.');
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Tambah Program Kerja
          </DialogTitle>
          <DialogDescription>
            Tambahkan program kerja baru untuk HMIF ITATS
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
              <Label htmlFor="title">Judul Program *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Masukkan judul program"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder="Departemen yang menjalankan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Tanggal Mulai *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Tanggal Selesai *</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Akan Datang</SelectItem>
                  <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => handleChange('progress', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Jumlah Peserta</Label>
              <Input
                id="participants"
                type="number"
                min="0"
                value={formData.participants}
                onChange={(e) => handleChange('participants', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                placeholder="Rp 0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leader">Ketua/Penanggung Jawab</Label>
              <Input
                id="leader"
                value={formData.leader}
                onChange={(e) => handleChange('leader', e.target.value)}
                placeholder="Nama ketua program"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Tempat pelaksanaan"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Singkat *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Deskripsi singkat program"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailed_description">Deskripsi Detail</Label>
            <Textarea
              id="detailed_description"
              value={formData.detailed_description}
              onChange={(e) => handleChange('detailed_description', e.target.value)}
              placeholder="Deskripsi detail program"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team">Tim (pisahkan dengan koma)</Label>
              <Input
                id="team"
                value={formData.team}
                onChange={(e) => handleChange('team', e.target.value)}
                placeholder="nama1, nama2, nama3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Foto (URL, pisahkan dengan koma)</Label>
              <Input
                id="photos"
                value={formData.photos}
                onChange={(e) => handleChange('photos', e.target.value)}
                placeholder="url1.jpg, url2.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createProgram.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createProgram.isPending}>
              {createProgram.isPending ? (
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
