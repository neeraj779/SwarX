export const SUPPORTED_LANGUAGES = [
  "Hindi",
  "English",
  "Punjabi",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Bengali",
  "Kannada",
  "Bhojpuri",
  "Malayalam",
  "Urdu",
  "Haryanvi",
  "Rajasthani",
  "Odia",
  "Assamese",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type Language = Lowercase<SupportedLanguage>;
