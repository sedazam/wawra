import { notFound } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";
import EditAudioForm from "@/components/admin/edit-audio-form";
import PageContainer from "@/components/layout/page-container";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getAudioById, getCategories } from "@/lib/supabase/queries";

type EditAudioPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAudioPage({ params }: EditAudioPageProps) {
  await requireAdmin();

  const { id } = await params;

  let audioRaw;
  let categoriesRaw;

  try {
    audioRaw = await getAudioById(id);
    categoriesRaw = await getCategories();
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <PageContainer className="py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <section className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Edit
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">Edit Audio</h1>
            </div>

            <EditAudioForm
              audio={{
                id: audioRaw.id,
                title: audioRaw.title,
                speaker: audioRaw.speaker,
                description: audioRaw.description,
                categorySlug: audioRaw.category_slug,
                isPublished: audioRaw.is_published,
                isFeatured: audioRaw.is_featured,
              }}
              categories={categoriesRaw.map((category) => ({
                id: category.id,
                name: category.name,
                slug: category.slug,
                description: category.description,
              }))}
            />
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
