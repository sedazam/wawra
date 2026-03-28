import { requireAdmin } from "@/lib/auth/require-admin";
import AdminSidebar from "@/components/admin/admin-sidebar";
import UploadAudioForm from "@/components/admin/upload-audio-form";
import PageContainer from "@/components/layout/page-container";
import { categories } from "@/lib/queries/mock-data";

export default async function AdminUploadPage() {
  await requireAdmin();
  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <PageContainer className="py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <section className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Upload
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Upload New Audio
              </h1>
            </div>

            <UploadAudioForm categories={categories} />
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
