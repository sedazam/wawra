import AudioCard from "@/components/audio/audio-card";
import CategoryChip from "@/components/category/category-chip";
import PageContainer from "@/components/layout/page-container";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import Input from "@/components/ui/input";
import { audios, categories } from "@/lib/queries/mock-data";

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <SiteHeader />

      <PageContainer className="py-10 md:py-14">
        <div className="mb-10 space-y-3">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Browse Audio
          </h1>

          <p className="max-w-2xl text-zinc-400">
            Discover podcasts, stories, lessons, reflections, and more in one
            clean listening space.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
          <Input placeholder="Search audio, speakers, or topics..." />

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-400">
            Newest first
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <CategoryChip label="All" active />
          {categories.map((category) => (
            <CategoryChip key={category.id} label={category.name} />
          ))}
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
