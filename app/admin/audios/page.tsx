import AdminSidebar from "@/components/admin/admin-sidebar";
import AudioTable from "@/components/admin/audio-table";
import PageContainer from "@/components/layout/page-container";
import { audios } from "@/lib/queries/mock-data";

export default function AdminAudiosPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <PageContainer className="py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <section className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Audios
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Manage Audios
              </h1>
            </div>
            <AudioTable audios={audios} />
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
