export function smartRemoveNewlines(text) {
  return text.replace(/(?<!\n)\n(?!\n)/g, ' ').replace(/\n{2,}/g, '\n\n');
}