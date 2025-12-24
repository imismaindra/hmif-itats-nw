'use client';

import { useState } from 'react';
import { usePosts, useDeletePost, useTogglePostActive, Post } from '@/lib/react-query';
import { AddPostDialog } from '@/components/add-post-dialog';
import { EditPostDialog } from '@/components/edit-post-dialog';
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
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Edit, Trash2, FileText, Plus, Eye, EyeOff } from 'lucide-react';

interface ManagePostsDialogProps {
  children: React.ReactNode;
}

export function ManagePostsDialog({ children }: ManagePostsDialogProps) {
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: posts, isLoading, error } = usePosts();
  const deletePost = useDeletePost();
  const toggleActive = useTogglePostActive();

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      try {
        await deletePost.mutateAsync(id);
      } catch (error) {
        alert('Gagal menghapus pengumuman');
      }
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setEditDialogOpen(true);
  };

  const handleToggleActive = async (post: Post) => {
    try {
      await toggleActive.mutateAsync({
        id: post.id,
        is_active: !post.is_active,
      });
    } catch (error) {
      console.error('Error toggling post status:', error);
    }
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingPost(null);
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <Alert variant="destructive">
            <AlertDescription>Gagal memuat data pengumuman</AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Kelola Pengumuman
            </DialogTitle>
            <DialogDescription>
              Tambah, edit, atau hapus pengumuman dan berita
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Total: {posts?.length || 0} pengumuman
            </p>
            <AddPostDialog>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pengumuman
              </Button>
            </AddPostDialog>
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioritas</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="w-[150px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts?.map((post: Post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="truncate" title={post.title}>
                        {post.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {post.category === 'pengumuman' ? 'Pengumuman' : 'Berita'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={post.is_active ? "default" : "secondary"}
                        className="flex items-center gap-1 w-fit"
                      >
                        {post.is_active ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        {post.is_active ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.priority === 'tinggi' ? 'destructive' :
                          post.priority === 'sedang' ? 'default' : 'secondary'
                        }
                      >
                        {post.priority === 'tinggi' ? 'Tinggi' :
                         post.priority === 'sedang' ? 'Sedang' : 'Rendah'}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.author_name}</TableCell>
                    <TableCell>{new Date(post.date).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(post)}
                          title="Edit"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant={post.is_active ? "secondary" : "default"}
                          size="sm"
                          onClick={() => handleToggleActive(post)}
                          disabled={toggleActive.isPending}
                          title={post.is_active ? "Nonaktifkan" : "Aktifkan"}
                        >
                          {post.is_active ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          disabled={deletePost.isPending}
                          title="Hapus"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {posts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Belum ada pengumuman
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editingPost && (
        <EditPostDialog
          post={editingPost}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) setEditingPost(null);
          }}
        />
      )}
    </>
  );
}
