/* Footer ringkas dengan accent top border */
export function HmifFooter() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="h-1 w-full bg-accent" aria-hidden="true"></div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary grid place-items-center text-sm font-semibold text-primary-foreground">
              HM
            </div>
            <span className="font-semibold tracking-wide">HMIF</span>
          </div>
          <p className="mt-3 text-sm text-foreground/70">
            Himpunan Mahasiswa Informatika. Kolaborasi, inovasi, dan dampak nyata untuk kampus dan masyarakat.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>
              <a href="/struktur" className="hover:text-foreground">
                Struktur Organisasi
              </a>
            </li>
            <li>
              <a href="/divisi" className="hover:text-foreground">
                Divisi
              </a>
            </li>
            <li>
              <a href="/program" className="hover:text-foreground">
                Program Kerja
              </a>
            </li>
            <li>
              <a href="/kegiatan" className="hover:text-foreground">
                Kegiatan
              </a>
            </li>
            <li>
              <a href="/pengumuman" className="hover:text-foreground">
                Pengumuman/Berita
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Kontak</h3>
          <p className="text-sm text-foreground/80">Sekretariat HMIF, Gedung Jurusan Informatika</p>
          <p className="text-sm text-foreground/80">Email: hima.informatika@example.ac.id</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 text-xs text-foreground/60">
          © {new Date().getFullYear()} HMIF. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
