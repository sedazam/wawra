import { createClient } from "@/lib/supabase/client";
import type { AudioFormValues } from "@/lib/validations/audio";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createAudioRecord(input: {
  values: AudioFormValues;
  audioUrl: string;
  coverImageUrl: string;
  categoryName: string;
  durationSeconds?: number;
}) {
  const {
    values,
    audioUrl,
    coverImageUrl,
    categoryName,
    durationSeconds = 0,
  } = input;

  const slug = slugify(values.title);

  if (!slug) {
    throw new Error("Could not generate a valid slug from the title.");
  }


  const supabase = createClient();
  const { data, error } = await supabase
    .from("audios")
    .insert({
      title: values.title,
      slug,
      description: values.description,
      speaker: values.speaker,
      category_slug: values.category,
      category_name: categoryName,
      audio_url: audioUrl,
      cover_image_url: coverImageUrl,
      duration_seconds: durationSeconds,
      is_published: values.isPublished,
      is_featured: values.isFeatured,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
