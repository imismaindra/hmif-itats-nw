'use client';

import { useState } from 'react';
import { usePosts, useDeletePost, Post } from '@/lib/react-query';
import { AddPostDialog } from '@/components/add-post-dialog';
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
import { Loader2, Edit, Trash2, FileText, Plus } from 'lucide-react';

interface ManagePostsDialogProps {
  children: React.ReactNode;
}

export function ManagePostsDialog({ children }: ManagePostsDialogProps) {
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const { data: posts, isLoading, error } = usePosts();
  const deletePost = useDeletePost();

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
  };

  const closeEditDialog = () => {
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
                  <TableHead>Prioritas</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="w-[100px]">Aksi</TableHead>
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
                        variant={
                          post.priority === 'tinggi' ? 'destructive' :
                          post.priority === 'sedang' ? 'default' : 'secondary'
                        }
                      >
                        {post.priority === 'tinggi' ? 'Tinggi' :
                         post.priority === 'sedang' ? 'Sedang' : 'Rendah'}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{new Date(post.date).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          disabled={deletePost.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {posts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
          open={!!editingPost}
          onClose={closeEditDialog}
        />
      )}
    </>
  );
}

interface EditPostDialogProps {
  post: Post;
  open: boolean;
  onClose: () => void;
}

function EditPostDialog({ post, open, onClose }: EditPostDialogProps) {
  const [formData, setFormData] = useState({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    author: post.author,
    category: post.category,
    priority: post.priority,
    tags: post.tags.join(', '),
    image: post.image || '',
  });
  const [error, setError] = useState('');

  const updatePost = useDeletePost(); // We'll replace this with useUpdatePost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // This should use updatePost mutation instead
      // For now, just close the dialog
      onClose();
    } catch (error) {
      setError('Gagal mengupdate pengumuman');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pengumuman</DialogTitle>
          <DialogDescription>
            Edit detail pengumuman
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Judul</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Konten</label>
            <textarea
              className="w-full p-2 border rounded min-h-[100px]"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
