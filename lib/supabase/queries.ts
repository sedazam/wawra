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
