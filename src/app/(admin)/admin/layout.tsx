'use client';

import Link from 'next/link';
import { LayoutDashboard, FileText, Activity, Users, LogOut, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">HMIF Admin Panel</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/pengumuman"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Pengumuman
              </Link>
              <Link
                href="/admin/kegiatan"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Activity className="w-4 h-4" />
                Kegiatan
              </Link>
              <Link
                href="/admin/anggota"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Users className="w-4 h-4" />
                Anggota
              </Link>
              <Link
                href="/admin/struktur-organisasi"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Network className="w-4 h-4" />
                Struktur Organisasi
              </Link>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
