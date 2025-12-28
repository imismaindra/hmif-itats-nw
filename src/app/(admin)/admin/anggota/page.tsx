'use client';

import { useState } from 'react';
import { useMembers, useDeleteMember, Member } from '@/lib/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Search, Mail, User, Users as UsersIcon } from 'lucide-react';
import { AddMemberDialog } from '@/components/add-member-dialog';
import { EditMemberDialog } from '@/components/edit-member-dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminAnggotaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: members, isLoading } = useMembers();
  const deleteMember = useDeleteMember();

  const filteredMembers = members?.filter((member: Member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.position?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLevel = levelFilter === 'all' || (member.position?.level || 3).toString() === levelFilter;

    return matchesSearch && matchesLevel;
  }) || [];

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMember.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'Pengurus Inti';
      case 2: return 'Koordinator';
      case 3: return 'Staff';
      case 4: return 'Anggota Biasa';
      default: return 'Anggota Biasa';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'destructive';
      case 2: return 'default';
      case 3: return 'secondary';
      case 4: return 'outline';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
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
            <h1 className="text-3xl font-bold text-foreground">Kelola Anggota</h1>
            <p className="text-muted-foreground">Tambah, edit, dan hapus anggota HMIF ITATS</p>
          </div>
          <AddMemberDialog>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Anggota
            </Button>
          </AddMemberDialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="p-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari anggota berdasarkan nama, jabatan, divisi, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>
          <Card className="p-4">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Level</SelectItem>
                <SelectItem value="1">Pengurus Inti</SelectItem>
                <SelectItem value="2">Koordinator</SelectItem>
                <SelectItem value="3">Staff</SelectItem>
                <SelectItem value="4">Anggota Biasa</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member: Member) => (
            <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.position?.name || 'No position'}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Badge variant={getLevelColor(member.position?.level || 3)}>
                      {getLevelLabel(member.position?.level || 3)}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
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
                        <AlertDialogTitle>Hapus Anggota</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus anggota "{member.name}"?
                          Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(member.id)}
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
        {filteredMembers.length === 0 && (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Belum ada anggota</h3>
                <p className="text-muted-foreground">
                  {searchTerm || levelFilter !== 'all'
                    ? 'Tidak ada anggota yang cocok dengan filter Anda.'
                    : 'Tambah anggota pertama untuk memulai.'}
                </p>
              </div>
              {!searchTerm && levelFilter === 'all' && (
                <AddMemberDialog>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Anggota Pertama
                  </Button>
                </AddMemberDialog>
              )}
            </div>
          </Card>
        )}

        {/* Edit Dialog */}
        <EditMemberDialog
          member={selectedMember}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      </div>
    </div>
  );
}
