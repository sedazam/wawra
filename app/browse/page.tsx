import AudioCard from "@/components/audio/audio-card";
import PageContainer from "@/components/layout/page-container";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { audios } from "@/lib/queries/mock-data";

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <SiteHeader />

      <PageContainer className="py-10 md:py-14">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Browse Audio
          </h1>
          <p className="text-zinc-400">
            Discover podcasts, stories, lessons, and more.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audios.map((audio) => (
            <AudioCard key={audio.id} audio={audio} />
          ))}
        </div>
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
