'use client';

import { useState } from 'react';
import { usePosts, useDeletePost, Post } from '@/lib/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Search, Calendar, User, FileText, Eye, EyeOff } from 'lucide-react';
import { AddPostDialog } from '@/components/add-post-dialog';
import { EditPostDialog } from '@/components/edit-post-dialog';
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

export default function AdminPengumumanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: posts, isLoading } = usePosts();
  const deletePost = useDeletePost();

  const filteredPosts = posts?.filter((post: Post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.author_name && post.author_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

    return matchesSearch && matchesCategory;
  }) || [];

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'tinggi': return 'destructive';
      case 'sedang': return 'default';
      case 'rendah': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'tinggi': return 'Tinggi';
      case 'sedang': return 'Sedang';
      case 'rendah': return 'Rendah';
      default: return 'Sedang';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
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
            <h1 className="text-3xl font-bold text-foreground">Kelola Pengumuman</h1>
            <p className="text-muted-foreground">Tambah, edit, dan hapus pengumuman serta berita HMIF ITATS</p>
          </div>
          <AddPostDialog>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pengumuman
            </Button>
          </AddPostDialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="p-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari pengumuman berdasarkan judul, isi, atau penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>
          <Card className="p-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="pengumuman">Pengumuman</SelectItem>
                <SelectItem value="berita">Berita</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: Post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Image */}
                {post.image && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant={post.is_active ? 'default' : 'secondary'} className="flex items-center gap-1">
                    {post.is_active ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Aktif
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Nonaktif
                      </>
                    )}
                  </Badge>
                  <Badge variant={getPriorityColor(post.priority)}>
                    {getPriorityLabel(post.priority)}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg leading-tight">{post.title}</h3>
                    <Badge variant="outline" className="ml-2 flex-shrink-0 capitalize">
                      {post.category}
                    </Badge>
                  </div>

                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('id-ID')}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author_name || 'Unknown'}
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
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
                        <AlertDialogTitle>Hapus Pengumuman</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus pengumuman "{post.title}"?
                          Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post.id)}
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
        {filteredPosts.length === 0 && (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Belum ada pengumuman</h3>
                <p className="text-muted-foreground">
                  {searchTerm || categoryFilter !== 'all'
                    ? 'Tidak ada pengumuman yang cocok dengan filter Anda.'
                    : 'Tambah pengumuman pertama untuk memulai.'}
                </p>
              </div>
              {!searchTerm && categoryFilter === 'all' && (
                <AddPostDialog>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Pengumuman Pertama
                  </Button>
                </AddPostDialog>
              )}
            </div>
          </Card>
        )}

        {/* Edit Dialog */}
        <EditPostDialog
          post={selectedPost}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      </div>
    </div>
  );
}
