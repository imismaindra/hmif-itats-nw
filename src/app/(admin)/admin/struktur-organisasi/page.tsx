'use client';

import { useState } from 'react';
import { useDivisions, useCreateDivision, DivisionMember, Division, useMembers } from '@/lib/react-query';
import { AddMemberDialog } from '@/components/add-member-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Users, Plus, Settings, UserPlus, Crown, User } from 'lucide-react';

export default function AdminStrukturOrganisasiPage() {
  const [showAddDivision, setShowAddDivision] = useState(false);
  const [newDivision, setNewDivision] = useState({
    name: '',
    slug: '',
    description: '',
    gradient_from: 'blue-500',
    gradient_to: 'cyan-500',
  });

  const { data: divisions, isLoading, error } = useDivisions();
  const createDivision = useCreateDivision();

  const handleCreateDivision = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createDivision.mutateAsync(newDivision);
      setNewDivision({ name: '', slug: '', description: '', gradient_from: 'blue-500', gradient_to: 'cyan-500' });
      setShowAddDivision(false);
    } catch (error) {
      console.error('Failed to create division:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Kelola Struktur Organisasi</h1>
              <p className="text-muted-foreground">Kelola divisi dan anggota HMIF ITATS</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Kelola Struktur Organisasi</h1>
              <p className="text-muted-foreground">Kelola divisi dan anggota HMIF ITATS</p>
            </div>
          </div>
          <Alert variant="destructive">
            <AlertDescription>Gagal memuat data divisi</AlertDescription>
          </Alert>
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
            <h1 className="text-3xl font-bold text-foreground">Kelola Struktur Organisasi</h1>
            <p className="text-muted-foreground">
              Kelola divisi organisasi dan anggota yang tergabung di dalamnya
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setShowAddDivision(true)}
            disabled={createDivision.isPending}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Divisi
          </Button>
        </div>

        {/* Divisions List */}
        <div className="space-y-4">
          {divisions?.map((division: Division) => (
            <DivisionCard key={division.id} division={division} />
          ))}

          {divisions?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada divisi. Klik "Tambah Divisi" untuk membuat divisi pertama.
            </div>
          )}
        </div>

        {/* Add Division Dialog */}
        <Dialog open={showAddDivision} onOpenChange={setShowAddDivision}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Divisi Baru</DialogTitle>
              <DialogDescription>
                Buat divisi baru untuk organisasi
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateDivision} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="division-name">Nama Divisi *</Label>
                <Input
                  id="division-name"
                  value={newDivision.name}
                  onChange={(e) => setNewDivision(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Contoh: Divisi IT, Divisi Acara, dll"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="division-description">Deskripsi</Label>
                <Textarea
                  id="division-description"
                  value={newDivision.description}
                  onChange={(e) => setNewDivision(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Deskripsi tugas dan fungsi divisi"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gradient-from">Gradient Dari</Label>
                  <select
                    id="gradient-from"
                    value={newDivision.gradient_from}
                    onChange={(e) => setNewDivision(prev => ({ ...prev, gradient_from: e.target.value }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="blue-500">Biru</option>
                    <option value="purple-500">Ungu</option>
                    <option value="green-500">Hijau</option>
                    <option value="red-500">Merah</option>
                    <option value="yellow-500">Kuning</option>
                    <option value="pink-500">Pink</option>
                    <option value="indigo-500">Indigo</option>
                    <option value="teal-500">Teal</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gradient-to">Gradient Ke</Label>
                  <select
                    id="gradient-to"
                    value={newDivision.gradient_to}
                    onChange={(e) => setNewDivision(prev => ({ ...prev, gradient_to: e.target.value }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="cyan-500">Cyan</option>
                    <option value="pink-500">Pink</option>
                    <option value="teal-500">Teal</option>
                    <option value="purple-500">Ungu</option>
                    <option value="blue-500">Biru</option>
                    <option value="green-500">Hijau</option>
                    <option value="red-500">Merah</option>
                    <option value="yellow-500">Kuning</option>
                  </select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDivision(false)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={createDivision.isPending}>
                  {createDivision.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Membuat...
                    </>
                  ) : (
                    'Buat Divisi'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

interface DivisionCardProps {
  division: Division;
}

function DivisionCard({ division }: DivisionCardProps) {
  const [showAddMember, setShowAddMember] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-4 h-4 rounded-full bg-gradient-to-r from-${division.gradient_from} to-${division.gradient_to}`}
          />
          <div>
            <h3 className="font-semibold">{division.name}</h3>
            <p className="text-sm text-muted-foreground">{division.description}</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAddMember(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Anggota
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Anggota ({division.members?.length || 0})</span>
        </div>

        {division.members && division.members.length > 0 ? (
          <div className="space-y-2">
            {division.members.map((member: DivisionMember) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {member.is_coordinator ? (
                    <Crown className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {member.is_coordinator ? 'Koordinator' : 'Anggota'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Level {member.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {member.email && (
                    <span className="text-xs text-muted-foreground">{member.email}</span>
                  )}
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Belum ada anggota di divisi ini
          </p>
        )}
      </div>

      {/* Add Member to Division Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah Anggota ke {division.name}</DialogTitle>
            <DialogDescription>
              Tambahkan anggota baru ke divisi ini
            </DialogDescription>
          </DialogHeader>

          <AddMemberToDivisionForm
            divisionId={division.id}
            onSuccess={() => setShowAddMember(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

interface AddMemberToDivisionFormProps {
  divisionId: number;
  onSuccess: () => void;
}

function AddMemberToDivisionForm({ divisionId, onSuccess }: AddMemberToDivisionFormProps) {
  const [formData, setFormData] = useState({
    member_id: '',
    is_coordinator: false,
  });

  const { data: members } = useMembers();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/divisions/${divisionId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        setFormData({
          member_id: '',
          is_coordinator: false,
        });
      }
    } catch (error) {
      console.error('Failed to add member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="member-select">Pilih Anggota *</Label>
        <select
          id="member-select"
          value={formData.member_id}
          onChange={(e) => setFormData(prev => ({ ...prev, member_id: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih anggota...</option>
          {members?.map((member: any) => (
            <option key={member.id} value={member.id}>
              {member.name} - {member.position?.name || 'No position'}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="member-coordinator">Jadikan Koordinator</Label>
        <input
          id="member-coordinator"
          type="checkbox"
          checked={formData.is_coordinator}
          onChange={(e) => setFormData(prev => ({ ...prev, is_coordinator: e.target.checked }))}
          className="ml-2"
        />
        <span className="ml-2 text-sm text-muted-foreground">
          Centang jika anggota ini akan menjadi koordinator divisi
        </span>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onSuccess}>
          Batal
        </Button>
        <Button type="submit">
          Tambah Anggota
        </Button>
      </DialogFooter>
    </form>
  );
}
