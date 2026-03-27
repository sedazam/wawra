import FeaturedHero from "@/components/audio/featured-hero";
import AudioCard from "@/components/audio/audio-card";
import PageContainer from "@/components/layout/page-container";
import SectionHeader from "@/components/layout/section-header";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { audios } from "@/lib/queries/mock-data";

export default function HomePage() {
  const featuredAudio = audios.find((audio) => audio.isFeatured) ?? audios[0];
  const recentAudios = audios.slice(0, 4);

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
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
