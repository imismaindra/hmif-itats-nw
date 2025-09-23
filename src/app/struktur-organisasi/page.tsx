import OrganizationChart from "@/components/organization-chart";

export default function strukturOrganisasiPage(){
   return(
      <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
            Struktur organisasi
            <br />
            <span className="text-muted-foreground">Himpunan Mahasiswa Informatika </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Mengenal lebih dekat dengan para pengurus yang berdedikasi untuk kemajuan organisasi mahasiswa
          </p>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="py-16 px-4">
        <OrganizationChart />
      </section>

      {/* Footer Section */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="text-xl font-semibold">Bergabung dengan Kami</h3>
          <p className="text-muted-foreground">
            Tertarik untuk berkontribusi? Hubungi kami untuk informasi lebih lanjut tentang cara bergabung
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
            <span>Email: organisasi@mahasiswa.ac.id</span>
            <span className="hidden sm:block">•</span>
            <span>Instagram: @organisasimahasiswa</span>
          </div>
        </div>
      </footer>
    </main>
   )
}