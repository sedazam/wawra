import { supabase } from "@/lib/supabase/client";

export async function getPublishedAudios() {
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
