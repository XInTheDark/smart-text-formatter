export function fixIndentation(text) {
  return text.split('\n').map(line => {
    const indentLevel = line.search(/\S/);
    return ' '.repeat(indentLevel) + line.trim();
  }).join('\n');
}