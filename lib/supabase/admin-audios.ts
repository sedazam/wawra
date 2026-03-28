import { createClient } from "@/lib/supabase/client";

export async function deleteAudioById(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("audios").delete().eq("id", id);
  if (error) {
    throw error;
  }
}

export async function updateAudioFlags(input: {
  id: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}) {
  const { id, ...updates } = input;
  const supabase = createClient();
  const { error } = await supabase.from("audios").update(updates).eq("id", id);
  if (error) {
    throw error;
  }
}
