import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        {/* Copy utama */}
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-accent-foreground bg-accent/70 px-2.5 py-1 rounded-full">
            Himpunan Mahasiswa Informatika
          </span>
          <h1 className="mt-3 text-pretty text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Ruang Berkarya, Berjejaring, dan Bertumbuh bagi Mahasiswa Informatika
          </h1>
          <p className="mt-4 text-pretty text-sm sm:text-base text-muted-foreground">
            Jelajahi struktur organisasi, divisi, program kerja, dan kegiatan terbaru. Dapatkan pengumuman penting dan
            berita terkini dari HMIF.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href="/kegiatan">Lihat Kegiatan</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/pengumuman">Pengumuman & Berita</Link>
            </Button>
          </div>

          {/* Stats ringkas */}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-lg border-3 p-3 sm:p-4">
              <p className="text-xs text-muted-foreground">Anggota</p>
              <p className="mt-1 text-lg sm:text-xl font-semibold">600+</p>
            </div>
            <div className="rounded-lg border-3 p-3 sm:p-4">
              <p className="text-xs text-muted-foreground">Program Kerja</p>
              <p className="mt-1 text-lg sm:text-xl font-semibold">25</p>
            </div>
            <div className="rounded-lg border-3 p-3 sm:p-4">
              <p className="text-xs text-muted-foreground">Kegiatan/Tahun</p>
              <p className="mt-1 text-lg sm:text-xl font-semibold">40+</p>
            </div>
          </div>
        </div>

        {/* Bento Cards */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2">
          {/* Kartu gambar */}
          <div className="col-span-2 row-span-1 rounded-lg border overflow-hidden">
            <img
              src="/ilustrasi-mahasiswa-informatika-berkolaborasi.jpg"
              alt="Ilustrasi mahasiswa Informatika berkolaborasi"
              className="w-full h-56 sm:h-64 object-cover"
            />
          </div>
          {/* Kartu event */}
          <div className="rounded-lg bg-primary text-primary-foreground p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs opacity-90">Event Berikutnya</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold leading-snug">Seminar AI & Data</h3>
              <p className="mt-1 text-xs sm:text-sm opacity-90">28 Sep • Aula FTI</p>
            </div>
            <Link
              href="/kegiatan"
              className="mt-3 inline-flex text-xs sm:text-sm font-medium underline-offset-4 hover:underline"
            >
              Lihat detail →
            </Link>
          </div>
          {/* Kartu ajakan divisi */}
          <div className="rounded-lg border p-4 sm:p-5">
            <p className="text-xs text-muted-foreground">Bergabung</p>
            <h3 className="mt-1 text-base sm:text-lg font-semibold leading-snug">Open Recruitment Divisi</h3>
            <Link href="/divisi" className="mt-3 inline-flex text-xs sm:text-sm font-medium hover:underline">
              Pilih minatmu →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
