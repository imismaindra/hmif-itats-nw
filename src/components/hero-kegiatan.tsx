export function HeroKegiatan() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 float-animation">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
              <div className="relative w-full h-full bg-card border-2 border-primary/20 rounded-full flex items-center justify-center glow-animation">
                <span className="text-4xl font-bold text-primary">HMIF</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Recap Kegiatan
            <br />
            <span className="text-primary">Himpunan Mahasiswa</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8 leading-relaxed">
            Dokumentasi lengkap program kerja dan kegiatan yang telah berhasil dilaksanakan oleh Himpunan Mahasiswa
            Teknologi Informasi
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-sm text-muted-foreground">PERIODE 2024 • FAKULTAS TEKNIK • UNIVERSITAS INDONESIA</div>
          </div>
        </div>
      </div>
    </section>
  )
}
