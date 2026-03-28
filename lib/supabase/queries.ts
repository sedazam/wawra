export async function getAudioById(id: string) {
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
