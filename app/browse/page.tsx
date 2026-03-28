"use client";

import { useEffect, useState } from "react";
import AudioCard from "@/components/audio/audio-card";
import CategoryChip from "@/components/category/category-chip";
import PageContainer from "@/components/layout/page-container";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useAudioFilters } from "@/hooks/use-audio-filters";
import { supabase } from "@/lib/supabase/client";

export default function BrowsePage() {
  const [audios, setAudios] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: audioData } = await supabase
        .from("audios")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      setAudios(audioData ?? []);
      setCategories(categoryData ?? []);
    }

    loadData();
  }, []);

  const {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    sort,
    setSort,
    filteredAudios,
  } = useAudioFilters(
    audios.map((audio) => ({
      ...audio,
      categoryName: audio.category_name,
      categoryId: audio.category_slug,
      coverImageUrl: audio.cover_image_url,
      audioUrl: audio.audio_url,
      durationSeconds: audio.duration_seconds,
      isPublished: audio.is_published,
      isFeatured: audio.is_featured,
      createdAt: audio.created_at,
    })),
  );

  return (
    <main className="min-h-screen bg-[#0B0B0F] pb-28">
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
          <Input
            placeholder="Search audio, speakers, or topics..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as "newest" | "oldest" | "title")
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A–Z</option>
          </Select>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <CategoryChip
            label="All"
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />

          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.name}
              active={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
            />
          ))}
        </div>

        <p className="mb-8 text-sm text-zinc-500">
          {filteredAudios.length} result{filteredAudios.length === 1 ? "" : "s"}
        </p>

        {filteredAudios.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredAudios.map((audio) => (
              <AudioCard key={audio.id} audio={audio} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="text-lg font-semibold text-white">No audio found</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Try a different search term or category.
            </p>
          </div>
        )}
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
