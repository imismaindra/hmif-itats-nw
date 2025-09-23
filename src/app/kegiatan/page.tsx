import { HeroKegiatan } from "@/components/hero-kegiatan";
import { StatsSection } from "@/components/stats-section";
import { AktivitasGrid } from "@/components/aktivitas-grid";
export default function KegiatanPage() {

    return (
        <main className="min-h-screen bg-background">
            <HeroKegiatan />
            <StatsSection />
            <AktivitasGrid />
        </main>
    );
}