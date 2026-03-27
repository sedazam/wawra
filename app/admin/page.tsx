import AdminSidebar from "@/components/admin/admin-sidebar";
import StatsCard from "@/components/admin/stats-card";
import AudioTable from "@/components/admin/audio-table";
import PageContainer from "@/components/layout/page-container";
import { audios, categories } from "@/lib/queries/mock-data";

export default function AdminDashboardPage() {
  const publishedCount = audios.filter((audio) => audio.isPublished).length;
  const featuredCount = audios.filter((audio) => audio.isFeatured).length;

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <PageContainer className="py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <section className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Wawra Admin Overview
              </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatsCard label="Total Audios" value={audios.length} />
              <StatsCard label="Published" value={publishedCount} />
              <StatsCard label="Featured" value={featuredCount} />
              <StatsCard label="Categories" value={categories.length} />
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">
                Recent Audio
              </h2>
              <AudioTable audios={audios} />
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
