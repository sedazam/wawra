import { createClient } from "@/lib/supabase/client";
import { deleteAudioAssets } from "@/lib/supabase/delete-audio-assets";

export async function deleteAudioById(id: string) {
  const supabase = createClient();

  console.log("deleteAudioById called with id:", id);
  const fetchResult = await supabase
    .from("audios")
    .select("id, audio_url, cover_image_url")
    .eq("id", id)
    .single();
  const { data: audio, error: fetchError, status, statusText } = fetchResult;
  console.log("Supabase fetch result:", fetchResult);

  if (fetchError) {
    console.error(
      "Failed to fetch audio for deletion:",
      fetchError,
      "status:",
      status,
      statusText,
    );
    throw fetchError;
  }

  try {
    await deleteAudioAssets({
      audioUrl: audio.audio_url,
      coverImageUrl: audio.cover_image_url,
    });
  } catch (assetError) {
    console.error("Failed to delete audio assets:", assetError);
    throw assetError;
  }

  const { error } = await supabase.from("audios").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete audio record:", error);
    throw error;
  }
}

export async function updateAudioFlags(input: {
  id: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}) {
  const supabase = createClient();
  const { id, ...updates } = input;

  const dbUpdates: Record<string, boolean> = {};

  if (typeof updates.isPublished === "boolean") {
    dbUpdates.is_published = updates.isPublished;
  }

  if (typeof updates.isFeatured === "boolean") {
    dbUpdates.is_featured = updates.isFeatured;
  }

  const { error } = await supabase
    .from("audios")
    .update(dbUpdates)
    .eq("id", id);

  if (error) {
    throw error;
  }
}
