'use client';

import { useState } from 'react';
import { useCreateMember } from '@/lib/react-query';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Users } from 'lucide-react';

interface AddMemberDialogProps {
  children: React.ReactNode;
}

export function AddMemberDialog({ children }: AddMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    image: '',
    email: '',
    level: 3,
  });
  const [error, setError] = useState('');

  const createMember = useCreateMember();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createMember.mutateAsync(formData);

      setOpen(false);
      setFormData({
        name: '',
        position: '',
        department: '',
        image: '',
        email: '',
        level: 3,
      });
    } catch (error) {
      setError('Gagal menambahkan anggota. Silakan coba lagi.');
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Tambah Anggota
          </DialogTitle>
          <DialogDescription>
            Tambahkan anggota baru ke struktur organisasi HMIF ITATS
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
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Jabatan *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                placeholder="Contoh: Ketua, Sekretaris, dll"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departemen/Divisi</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder="Divisi yang diikuti"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select value={formData.level.toString()} onValueChange={(value) => handleChange('level', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Pengurus Inti</SelectItem>
                  <SelectItem value="2">Koordinator</SelectItem>
                  <SelectItem value="3">Staff</SelectItem>
                  <SelectItem value="4">Anggota Biasa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL Foto</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createMember.isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={createMember.isPending}>
              {createMember.isPending ? (
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
