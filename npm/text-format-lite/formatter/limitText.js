export function limitText(text, limit, mode = 'characters') {
  if (!limit || limit <= 0) return text;

  switch (mode) {
    case 'characters':
      return text.slice(0, limit);
    case 'words':
      return text.split(/\s+/).slice(0, limit).join(' ');
    case 'sentences':
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
      return sentences.slice(0, limit).join(' ');
    default:
      return text;
  }
}