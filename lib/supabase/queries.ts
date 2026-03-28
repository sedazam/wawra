import { createClient } from "@/lib/supabase/client";

export async function getPublishedAudios() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data ?? [];
}

export async function getAllAudios() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data ?? [];
}

export async function getAudioBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export async function getPublishedAudioBySlug(slug: string) {
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getRelatedPublishedAudios(
  categorySlug: string,
  excludeId: string,
) {
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("category_slug", categorySlug)
    .eq("is_published", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublishedAudiosByCategorySlug(categorySlug: string) {
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("category_slug", categorySlug)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
