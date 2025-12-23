import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast';

// Types
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: 'pengumuman' | 'berita';
  priority: 'tinggi' | 'sedang' | 'rendah';
  tags: string[];
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: number;
  title: string;
  category: string;
  date: string;
  participants: string;
  description: string;
  status: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  progress: number;
  department: string;
  participants: number;
  budget: string;
  leader: string;
  team: Array<{ name: string; role: string; avatar?: string }>;
  location: string;
  photos: string[];
  detailed_description: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: number;
  name: string;
  position: string;
  department: string;
  image?: string;
  email?: string;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface DivisionMember {
  id: number;
  division_id: number;
  name: string;
  role: 'coordinator' | 'member';
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  division_name: string;
  created_at: string;
}

export interface Division {
  id: number;
  name: string;
  description: string;
  color: string;
  members: DivisionMember[];
  created_at: string;
  updated_at: string;
}

// API functions
const API_BASE = '/api';

async function apiRequest(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Posts hooks
export function usePosts(category?: string, limit?: number) {
  return useQuery({
    queryKey: ['posts', category, limit],
    queryFn: () => apiRequest(`/posts${category || limit ? '?' + new URLSearchParams({
      ...(category && { category }),
      ...(limit && { limit: limit.toString() })
    }).toString() : ''}`),
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => apiRequest(`/posts/${id}`),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/posts', {
        method: 'POST',
        body: JSON.stringify(post),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Pengumuman berhasil ditambahkan',
      });
    },
    onError: (error: Error) => {
      if (error.message?.includes('SESSION_EXPIRED')) {
        addToast({
          type: 'warning',
          title: 'Sesi Perlu Diperbarui',
          description: 'Silakan logout dan login kembali untuk menggunakan fitur terbaru',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Gagal',
          description: error.message || 'Gagal menambahkan pengumuman',
        });
      }
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: ({ id, ...post }: Post) =>
      apiRequest(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Pengumuman berhasil diperbarui',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal memperbarui pengumuman',
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (id: number) => apiRequest(`/posts/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Pengumuman berhasil dihapus',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menghapus pengumuman',
      });
    },
  });
}

export function useTogglePostActive() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      apiRequest(`/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active }),
      }),
    onSuccess: (_: any, { is_active }: { id: number; is_active: boolean }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: `Pengumuman berhasil ${is_active ? 'diaktifkan' : 'dinonaktifkan'}`,
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal mengubah status pengumuman',
      });
    },
  });
}

// Activities hooks
export function useActivities(category?: string, limit?: number) {
  return useQuery({
    queryKey: ['activities', category, limit],
    queryFn: () => apiRequest(`/activities${category || limit ? '?' + new URLSearchParams({
      ...(category && { category }),
      ...(limit && { limit: limit.toString() })
    }).toString() : ''}`),
  });
}

export function useActivity(id: number) {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => apiRequest(`/activities/${id}`),
    enabled: !!id,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/activities', {
        method: 'POST',
        body: JSON.stringify(activity),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Kegiatan berhasil ditambahkan',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menambahkan kegiatan',
      });
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: ({ id, ...activity }: Activity) =>
      apiRequest(`/activities/${id}`, {
        method: 'PUT',
        body: JSON.stringify(activity),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Kegiatan berhasil diperbarui',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal memperbarui kegiatan',
      });
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (id: number) => apiRequest(`/activities/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Kegiatan berhasil dihapus',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menghapus kegiatan',
      });
    },
  });
}

// Programs hooks
export function usePrograms(status?: string, limit?: number) {
  return useQuery({
    queryKey: ['programs', status, limit],
    queryFn: () => apiRequest(`/programs${status || limit ? '?' + new URLSearchParams({
      ...(status && { status }),
      ...(limit && { limit: limit.toString() })
    }).toString() : ''}`),
  });
}

export function useProgram(id: number) {
  return useQuery({
    queryKey: ['program', id],
    queryFn: () => apiRequest(`/programs/${id}`),
    enabled: !!id,
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (program: Omit<Program, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/programs', {
        method: 'POST',
        body: JSON.stringify(program),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Program kerja berhasil ditambahkan',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menambahkan program kerja',
      });
    },
  });
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: ({ id, ...program }: Program) =>
      apiRequest(`/programs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(program),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['program'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Program kerja berhasil diperbarui',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal memperbarui program kerja',
      });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (id: number) => apiRequest(`/programs/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Program kerja berhasil dihapus',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menghapus program kerja',
      });
    },
  });
}

// Members hooks
export function useMembers(level?: number, limit?: number) {
  return useQuery({
    queryKey: ['members', level, limit],
    queryFn: () => apiRequest(`/members${level || limit ? '?' + new URLSearchParams({
      ...(level && { level: level.toString() }),
      ...(limit && { limit: limit.toString() })
    }).toString() : ''}`),
  });
}

export function useMember(id: number) {
  return useQuery({
    queryKey: ['member', id],
    queryFn: () => apiRequest(`/members/${id}`),
    enabled: !!id,
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (member: Omit<Member, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/members', {
        method: 'POST',
        body: JSON.stringify(member),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Anggota berhasil ditambahkan',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menambahkan anggota',
      });
    },
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: ({ id, ...member }: Member) =>
      apiRequest(`/members/${id}`, {
        method: 'PUT',
        body: JSON.stringify(member),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Anggota berhasil diperbarui',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal memperbarui anggota',
      });
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (id: number) => apiRequest(`/members/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Anggota berhasil dihapus',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menghapus anggota',
      });
    },
  });
}

// Divisions hooks
export function useDivisions() {
  return useQuery({
    queryKey: ['divisions'],
    queryFn: () => apiRequest('/divisions'),
  });
}

export function useCreateDivision() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (division: Omit<Division, 'id' | 'members' | 'created_at' | 'updated_at'>) =>
      apiRequest('/divisions', {
        method: 'POST',
        body: JSON.stringify(division),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['divisions'] });
      addToast({
        type: 'success',
        title: 'Berhasil',
        description: 'Divisi berhasil ditambahkan',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Gagal',
        description: error.message || 'Gagal menambahkan divisi',
      });
    },
  });
}
