import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/* Hero bento: headline kuat, CTA, stats, event, dan pengumuman */
export function HeroBento() {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-6 pt-10 md:pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Headline + CTA */}
        <div className="flex flex-col justify-center gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-foreground/70">
            <i
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />{" "}
            Informatika • Kolaboratif • Progresif
          </span>
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Himpunan Mahasiswa Informatika
            <span className="block text-foreground/80">
              Tempat bertumbuh, berjejaring, dan berkarya.
            </span>
          </h1>
          <p className="text-pretty text-foreground/70 max-w-prose">
            Kami memfasilitasi pengembangan diri lewat divisi, program kerja,
            dan kegiatan berdampak. Ikut terlibat dan jadilah bagian dari
            perubahan.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/program">Lihat Program Kerja</Link>
            </Button>
            <Button asChild variant="secondary" className="border-border">
              <Link href="/kegiatan">Jelajahi Kegiatan</Link>
            </Button>
          </div>
        </div>

        {/* Right: Bento cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Stats Card */}
          <div className="col-span-2 md:col-span-2 rounded-lg border-3 border-border p-4">
            <h3 className="text-sm text-foreground/70 mb-3">Sekilas Angka</h3>
            <div className="grid grid-cols-3 gap-3">
              <Stat value="12+" label="Program" />
              <Stat value="3" label="Divisi" />
              <Stat value="30+" label="Anggota" />
            </div>
          </div>

          {/* Event Card */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="text-sm text-foreground/70">Kegiatan Terdekat</h3>
            <p className="mt-1 font-medium">Pengembangan Manajemen Organisasi</p>
            <p className="text-sm text-foreground/70">Selasa, 13.00 - 16.30</p>
            <Link
              href="/kegiatan"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              Detail kegiatan
              <ChevronRight />
            </Link>
          </div>

          {/* Announcement Card */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="text-sm text-foreground/70">Pengumuman</h3>
            <p className="mt-1 font-medium">Rekrutmen Anggota Baru</p>
            <p className="text-sm text-foreground/70">Daftar hingga 31 Desember</p>
            <Link
              href="/pengumuman"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              Lihat pengumuman
              <ChevronRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero visual */}
      <div className="mt-8 rounded-xl border border-border p-3 md:p-4">
        <div className="relative w-full overflow-hidden rounded-lg border border-border">
          <Image
            src="/hmif-wisuda72.jpg"
            alt="Mahasiswa informatika berkolaborasi di laboratorium"
            width={1280}
            height={480}
            className="h-56 sm:h-72 md:h-80 w-full object-cover"
            priority
          />
          <div
            className="absolute left-0 top-0 h-1 w-28 bg-accent"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 bottom-0 h-1 w-16 bg-primary"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-foreground/70">{label}</div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="fill-none stroke-current"
    >
      <path
        d="M9 18l6-6-6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
