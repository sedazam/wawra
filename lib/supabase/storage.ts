import { createClient } from "@/lib/supabase/client";

export async function uploadAudioFile(file: File) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("audios")
    .upload(fileName, file, { upsert: false });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("audios").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function uploadCoverFile(file: File) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("covers")
    .upload(fileName, file, { upsert: false });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("covers").getPublicUrl(fileName);
  return data.publicUrl;
}
