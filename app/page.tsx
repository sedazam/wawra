import FeaturedHero from "@/components/audio/featured-hero";
import AudioCard from "@/components/audio/audio-card";
import CategoryCard from "@/components/category/category-card";
import PageContainer from "@/components/layout/page-container";
import SectionHeader from "@/components/layout/section-header";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { getPublishedAudios, getCategories } from "@/lib/supabase/queries";

export default async function HomePage() {
  const audios = await getPublishedAudios();
  const categories = await getCategories();

  const featuredAudio = audios.find((audio) => audio.is_featured) ?? audios[0];
  const recentAudios = audios.slice(0, 4);
  const editorsPicks = audios.slice(1, 4);

  return (
    <main className="min-h-screen bg-[#0B0B0F] pb-28">
      <SiteHeader />

      <PageContainer>
        {featuredAudio ? <FeaturedHero audio={featuredAudio} /> : null}

        <section className="py-8 md:py-10">
          <SectionHeader
            title="Recently Added"
            actionLabel="View all"
            actionHref="/browse"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentAudios.map((audio) => (
              <AudioCard key={audio.id} audio={audio} />
            ))}
          </div>
        </section>

        <section className="py-8 md:py-10">
          <SectionHeader title="Categories" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={{
                  id: category.id,
                  name: category.name,
                  slug: category.slug,
                  description: category.description,
                  count: 0,
                }}
              />
            ))}
          </div>
        </section>

        <section className="py-8 md:py-10">
          <SectionHeader
            title="Editor’s Picks"
            actionLabel="Browse all"
            actionHref="/browse"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {editorsPicks.map((audio) => (
              <AudioCard key={audio.id} audio={audio} />
            ))}
          </div>
        </section>
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
