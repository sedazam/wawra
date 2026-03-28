import { createClient } from "@/lib/supabase/client";

function extractPathFromPublicUrl(publicUrl: string, bucketName: string) {
  try {
    const url = new URL(publicUrl);
    const marker = `/storage/v1/object/public/${bucketName}/`;
    const index = url.pathname.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return null;
  }
}

export async function deleteAudioAssets(input: {
  audioUrl?: string | null;
  coverImageUrl?: string | null;
}) {
  const supabase = createClient();

  const audioPath = input.audioUrl
    ? extractPathFromPublicUrl(input.audioUrl, "audios")
    : null;

  const coverPath = input.coverImageUrl
    ? extractPathFromPublicUrl(input.coverImageUrl, "covers")
    : null;

  if (audioPath) {
    console.log(
      "Attempting to remove audio file from 'audios' bucket:",
      audioPath,
    );
    const { error, data } = await supabase.storage
      .from("audios")
      .remove([audioPath]);
    if (error) {
      console.error("Failed to remove audio file:", error, data);
      throw error;
    }
    console.log("Audio file removed successfully:", data);
  }

  if (coverPath) {
    console.log(
      "Attempting to remove cover image from 'covers' bucket:",
      coverPath,
    );
    const { error, data } = await supabase.storage
      .from("covers")
      .remove([coverPath]);
    if (error) {
      console.error("Failed to remove cover image:", error, data);
      throw error;
    }
    console.log("Cover image removed successfully:", data);
  }
}
