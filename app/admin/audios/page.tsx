import { requireAdmin } from "@/lib/auth/require-admin";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AudioTable from "@/components/admin/audio-table";
import PageContainer from "@/components/layout/page-container";
import { getAllAudios } from "@/lib/supabase/queries";

export default async function AdminAudiosPage() {
  await requireAdmin();
  const audiosRaw = await getAllAudios();

  const audios = audiosRaw.map((audio) => ({
    ...audio,
    categoryName: audio.category_name,
    categoryId: audio.category_slug,
    coverImageUrl: audio.cover_image_url,
    audioUrl: audio.audio_url,
    durationSeconds: audio.duration_seconds,
    isPublished: audio.is_published,
    isFeatured: audio.is_featured,
    createdAt: audio.created_at,
  }));

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <PageContainer className="py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <section className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Library
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
