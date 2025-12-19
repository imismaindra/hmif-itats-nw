import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
  return useMutation({
    mutationFn: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/posts', {
        method: 'POST',
        body: JSON.stringify(post),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...post }: Post) =>
      apiRequest(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiRequest(`/posts/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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
  return useMutation({
    mutationFn: (activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/activities', {
        method: 'POST',
        body: JSON.stringify(activity),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
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
  return useMutation({
    mutationFn: (program: Omit<Program, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/programs', {
        method: 'POST',
        body: JSON.stringify(program),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
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
  return useMutation({
    mutationFn: (member: Omit<Member, 'id' | 'created_at' | 'updated_at'>) =>
      apiRequest('/members', {
        method: 'POST',
        body: JSON.stringify(member),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
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
  return useMutation({
    mutationFn: (division: Omit<Division, 'id' | 'members' | 'created_at' | 'updated_at'>) =>
      apiRequest('/divisions', {
        method: 'POST',
        body: JSON.stringify(division),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['divisions'] });
    },
  });
}
