export function mapSupabaseAudio(audio: any) {
  return {
    ...audio,
    categoryName: audio.category_name,
    categoryId: audio.category_slug,
    coverImageUrl: audio.cover_image_url,
    audioUrl: audio.audio_url,
    durationSeconds: audio.duration_seconds,
    isPublished: audio.is_published,
    isFeatured: audio.is_featured,
    createdAt: audio.created_at,
  };
}
