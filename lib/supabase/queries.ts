export async function getPublishedAudiosByCategorySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("category_slug", slug)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
export async function getCategoryBySlug(slug: string) {
  const supabase = createClient();
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
import { createClient } from "@/lib/supabase/client";

export async function getAudioById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getCategories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}
