import FeaturedHero from "@/components/audio/featured-hero";
import AudioCard from "@/components/audio/audio-card";
import CategoryCard from "@/components/category/category-card";
import PageContainer from "@/components/layout/page-container";
import SectionHeader from "@/components/layout/section-header";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { audios, categories } from "@/lib/queries/mock-data";

export default function HomePage() {
  const featuredAudio = audios.find((audio) => audio.isFeatured) ?? audios[0];
  const recentAudios = [...audios]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);
  // If 'rating' does not exist, use an alternative property such as 'createdAt' or another numeric property.
  // Replace 'someNumericProperty' with an actual property name from AudioItem, or add 'rating' to AudioItem type and data.
  const editorsPicks = [...audios]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <SiteHeader />

      <PageContainer>
        <FeaturedHero audio={featuredAudio} />

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
              <CategoryCard key={category.id} category={category} />
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
