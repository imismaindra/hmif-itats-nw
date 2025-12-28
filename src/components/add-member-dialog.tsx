'use client';

import { useState } from 'react';
import { useCreateMember, useDivisions } from '@/lib/react-query';
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
import { FileUpload } from '@/components/ui/file-upload';

interface AddMemberDialogProps {
  children: React.ReactNode;
}

export function AddMemberDialog({ children }: AddMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position_id: '',
    email: '',
    phone: '',
    image: '',
  });
  const [error, setError] = useState('');

  const createMember = useCreateMember();
  const { data: divisions } = useDivisions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Convert position_id to number
      const submitData = {
        ...formData,
        position_id: formData.position_id ? parseInt(formData.position_id) : undefined,
      };

      await createMember.mutateAsync(submitData);

      setOpen(false);
      setFormData({
        name: '',
        position_id: '',
        email: '',
        phone: '',
        image: '',
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
              <Label htmlFor="position_id">Posisi *</Label>
              <Select value={formData.position_id} onValueChange={(value) => handleChange('position_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih posisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ketua Umum</SelectItem>
                  <SelectItem value="2">Wakil Ketua Umum</SelectItem>
                  <SelectItem value="3">Sekretaris Umum</SelectItem>
                  <SelectItem value="4">Bendahara Umum</SelectItem>
                  <SelectItem value="5">Koordinator Divisi</SelectItem>
                  <SelectItem value="6">Anggota Divisi</SelectItem>
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
              <Label htmlFor="phone">Telepon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+628xxxxxxxxx"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Foto Profil</Label>
            <FileUpload
              value={formData.image}
              onChange={(url) => handleChange('image', url)}
              placeholder="Pilih foto profil anggota"
              maxSize={5}
              category="anggota"
            />
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
