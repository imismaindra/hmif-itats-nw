'use client';

import { useState, useEffect } from 'react';
import { useUpdatePost, useTogglePostActive, Post } from '@/lib/react-query';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save, Eye, EyeOff } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';

interface EditPostDialogProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPostDialog({ post, open, onOpenChange }: EditPostDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: '',
    category: 'pengumuman' as 'pengumuman' | 'berita',
    priority: 'sedang' as 'tinggi' | 'sedang' | 'rendah',
    tags: '',
    image: '',
    is_active: true,
  });

  const updatePost = useUpdatePost();
  const toggleActive = useTogglePostActive();

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        date: post.date,
        category: post.category,
        priority: post.priority,
        tags: post.tags.join(', '),
        image: post.image || '',
        is_active: post.is_active,
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      await updatePost.mutateAsync({
        ...post,
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleToggleActive = async () => {
    if (!post) return;

    try {
      await toggleActive.mutateAsync({
        id: post.id,
        is_active: !post.is_active,
      });
    } catch (error) {
      console.error('Error toggling post status:', error);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Edit Pengumuman
          </DialogTitle>
          <DialogDescription>
            Edit detail pengumuman dan kelola status publikasi
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Active Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Status Publikasi</Label>
              <p className="text-sm text-muted-foreground">
                {post.is_active ? 'Pengumuman aktif dan terlihat oleh publik' : 'Pengumuman tidak aktif dan tersembunyi'}
              </p>
            </div>
            <Button
              type="button"
              variant={post.is_active ? "default" : "outline"}
              size="sm"
              onClick={handleToggleActive}
              disabled={toggleActive.isPending}
              className="flex items-center gap-2"
            >
              {toggleActive.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : post.is_active ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
              {post.is_active ? 'Aktif' : 'Nonaktif'}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Masukkan judul pengumuman"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pengumuman">Pengumuman</SelectItem>
                    <SelectItem value="berita">Berita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Prioritas</Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih prioritas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rendah">Rendah</SelectItem>
                    <SelectItem value="sedang">Sedang</SelectItem>
                    <SelectItem value="tinggi">Tinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Ringkasan singkat pengumuman"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Konten lengkap pengumuman"
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div className="space-y-2">
              <Label>Gambar</Label>
              <FileUpload
                value={formData.image}
                onChange={(url) => handleChange('image', url)}
                placeholder="Pilih gambar untuk pengumuman"
                maxSize={5}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updatePost.isPending}
              >
                Batal
              </Button>
              <Button type="submit" disabled={updatePost.isPending}>
                {updatePost.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
