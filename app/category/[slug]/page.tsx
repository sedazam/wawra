import { notFound } from "next/navigation";
import AudioCard from "@/components/audio/audio-card";
import PageContainer from "@/components/layout/page-container";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { audios, categories } from "@/lib/queries/mock-data";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const filteredAudios = audios.filter(
    (audio) => audio.categoryId === category.id,
  );

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <SiteHeader />

      <PageContainer className="py-10 md:py-14">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-400">
            Category
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {category.name}
          </h1>
          <p className="max-w-2xl text-zinc-400">{category.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAudios.map((audio) => (
            <AudioCard key={audio.id} audio={audio} />
          ))}
        </div>
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
