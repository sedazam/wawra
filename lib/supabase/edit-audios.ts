import { createClient } from "@/lib/supabase/client";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function updateAudioMetadata(input: {
  id: string;
  title: string;
  speaker: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  isPublished: boolean;
  isFeatured: boolean;
}) {
  const supabase = createClient();

  const slug = slugify(input.title);

  if (!slug) {
    throw new Error("Could not generate a valid slug from the title.");
  }

  const { data, error } = await supabase
    .from("audios")
    .update({
      title: input.title,
      slug,
      speaker: input.speaker,
      description: input.description,
      category_slug: input.categorySlug,
      category_name: input.categoryName,
      is_published: input.isPublished,
      is_featured: input.isFeatured,
    })
    .eq("id", input.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
