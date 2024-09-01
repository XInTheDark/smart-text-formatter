export function fixIndentation(text) {
  const lines = text.split('\n');
  let inCodeBlock = false;

  const processedLines = lines.map(line => {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }

    if (inCodeBlock) {
      return line;
    }

    // Remove leading whitespace, but keep the newline if it's an empty line
    return line.replace(/^[\s\t]+/, '');
  });

  return processedLines.join('\n');
}
