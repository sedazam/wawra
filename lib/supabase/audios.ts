// lib/supabase/audios.ts
// Supabase audio-related API helpers

import { supabase } from "./client";

export async function fetchAudios() {
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchAudioBySlug(slug: string) {
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

// Insert a new audio record
export async function createAudioRecord({
  values,
  audioUrl,
  coverImageUrl,
  categoryName,
}: {
  values: any;
  audioUrl: string;
  coverImageUrl: string;
  categoryName: string;
}) {
  const { data, error } = await supabase.from("audios").insert([
    {
      title: values.title,
      speaker: values.speaker,
      category: categoryName,
      description: values.description,
      is_featured: values.isFeatured,
      is_published: values.isPublished,
      audio_url: audioUrl,
      cover_url: coverImageUrl,
    },
  ]);
  if (error) throw error;
  return data;
}
