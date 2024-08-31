export function removeNonEnglish(text) {
  return text.replace(/[^\x00-\x7F]/g, "");
}