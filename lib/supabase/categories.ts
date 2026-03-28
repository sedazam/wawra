import { createClient } from "@/lib/supabase/client";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createCategory(input: {
  name: string;
  slug?: string;
  description?: string;
}) {
  const finalSlug = slugify(input.slug?.trim() || input.name);

  if (!input.name.trim()) {
    throw new Error("Category name is required.");
  }

  if (!finalSlug) {
    throw new Error("Could not generate a valid category slug.");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: input.name.trim(),
      slug: finalSlug,
      description: input.description?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
