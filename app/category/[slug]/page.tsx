import { notFound } from "next/navigation";
import AudioCard from "@/components/audio/audio-card";
import PageContainer from "@/components/layout/page-container";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import {
  getCategoryBySlug,
  getPublishedAudiosByCategorySlug,
} from "@/lib/supabase/queries";
import { mapSupabaseAudio } from "@/lib/utils/map-audio";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let category;
  let audiosRaw;

  try {
    category = await getCategoryBySlug(slug);
    audiosRaw = await getPublishedAudiosByCategorySlug(slug);
  } catch {
    notFound();
  }

  const audios = audiosRaw.map(mapSupabaseAudio);

  return (
    <main className="min-h-screen bg-[#0B0B0F] pb-28">
      <SiteHeader />

      <PageContainer className="py-10 md:py-14">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-400">
            Category
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {category.name}
          </h1>
          <p className="max-w-2xl text-zinc-400">
            {category.description || "Browse all audio in this category."}
          </p>
        </div>

        {audios.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audios.map((audio) => (
              <AudioCard key={audio.id} audio={audio} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="text-lg font-semibold text-white">
              No audio in this category yet
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Add some published audio to see it here.
            </p>
          </div>
        )}
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
