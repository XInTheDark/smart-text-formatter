export function fixIndentation(text) {
  const lines = text.split('\n');
  const indentedLines = [];
  let currentIndentLevel = 0;
  const listMarkers = /^(\s*)([*\-+]|\d+\.)\s/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimRight();
    const nextLine = lines[i + 1] ? lines[i + 1].trimRight() : '';
    const listMatch = line.match(listMarkers);

    if (line.startsWith('#')) {
      // Headers reset indentation
      currentIndentLevel = 0;
      indentedLines.push(line);
    } else if (listMatch) {
      // List items
      const [, existingIndent, marker] = listMatch;
      const indentedLine = ' '.repeat(currentIndentLevel) + existingIndent + marker + ' ' + line.substring(listMatch[0].length).trim();
      indentedLines.push(indentedLine);

      // Check if next line is a nested list item
      if (nextLine && nextLine.match(listMarkers) && nextLine.search(/\S/) > line.search(/\S/)) {
        currentIndentLevel += 2;
      }
    } else if (line.trim() === '') {
      // Empty lines
      indentedLines.push('');
    } else {
      // Regular text
      const indentedLine = ' '.repeat(currentIndentLevel) + line.trim();
      indentedLines.push(indentedLine);
    }

    // Decrease indent level if next line is a list item with less indentation
    if (nextLine && nextLine.match(listMarkers) && nextLine.search(/\S/) < line.search(/\S/)) {
      currentIndentLevel = Math.max(0, currentIndentLevel - 2);
    }
  }

  return indentedLines.join('\n');
}
