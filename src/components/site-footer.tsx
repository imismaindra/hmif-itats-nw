import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold mb-3">Tentang HMIF ITATS</h3>
            <p className="text-sm text-muted-foreground">
              Wadah kolaborasi dan pengembangan mahasiswa Informatika. Berkarya, berdampak, dan bertumbuh bersama.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/struktur-organisasi" className="text-sm hover:underline">
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link href="/divisi" className="text-sm hover:underline">
                  Divisi
                </Link>
              </li>
              <li>
                <Link href="/program-kerja" className="text-sm hover:underline">
                  Program Kerja
                </Link>
              </li>
              <li>
                <Link href="/kegiatan" className="text-sm hover:underline">
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-sm hover:underline">
                  Pengumuman & Berita
                </Link>
              </li>
            </ul>
          </div>
          <div id="kontak">
            <h3 className="text-sm font-semibold mb-3">Kontak</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: hmif@example.ac.id</li>
              <li>Alamat: Jl. Arief Rahman Hakim No.100, Klampis Ngasem, Kec. Sukolilo, Surabaya, Jawa Timur 60117</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Ikuti Kami</h3>
            <div className="flex items-center gap-3">
              <Link href="https://www.instagram.com/hmif_itats/" target="_blank" aria-label="Instagram HMIF" className="hover:underline text-sm">
                Instagram
              </Link>
              <Link href="#" aria-label="LinkedIn HMIF" className="hover:underline text-sm">
                LinkedIn
              </Link>
              <Link href="#" aria-label="YouTube HMIF" className="hover:underline text-sm">
                YouTube
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} HMIF. Semua hak dilindungi.</p>
          <p>UI berbasis design tokens: primary biru, accent amber, netral yang bersih.</p>
        </div>
      </div>
    </footer>
  )
}
