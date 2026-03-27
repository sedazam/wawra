export type AudioFormValues = {
  title: string;
  speaker: string;
  category: string;
  description: string;
  isFeatured: boolean;
  isPublished: boolean;
  audioFile: File | null;
  coverFile: File | null;
};

export type AudioFormErrors = Partial<Record<keyof AudioFormValues, string>>;

export function validateAudioForm(values: AudioFormValues): AudioFormErrors {
  const errors: AudioFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!values.speaker.trim()) {
    errors.speaker = "Speaker / Author is required.";
  }

  if (!values.category.trim()) {
    errors.category = "Please select a category.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!values.audioFile) {
    errors.audioFile = "Please upload an audio file.";
  }

  if (!values.coverFile) {
    errors.coverFile = "Please upload a cover image.";
  }

  return errors;
}
