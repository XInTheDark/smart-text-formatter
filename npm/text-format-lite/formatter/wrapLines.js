export function wrapLines(text, params = { limit: 0, mode: 'characters' }) {
    const { limit, mode } = params;
    if (!limit || limit <= 0) return text;

    const words = text.split(/\s+/);
    let result = '';
    let currentLine = '';

    if (mode === 'characters') {
        for (const word of words) {
            if ((currentLine + word).length > limit) {
                if (currentLine) {
                    result += currentLine.trim() + '\n';
                    currentLine = '';
                }
                if (word.length > limit) {
                    result += word.slice(0, limit) + '\n';
                    currentLine = word.slice(limit);
                } else {
                    currentLine = word;
                }
            } else {
                currentLine += (currentLine ? ' ' : '') + word;
            }
        }
    } else if (mode === 'words') {
        let wordCount = 0;
        for (const word of words) {
            if (wordCount + 1 > limit) {
                result += currentLine.trim() + '\n';
                currentLine = '';
                wordCount = 0;
            }
            currentLine += (currentLine ? ' ' : '') + word;
            wordCount++;
        }
    }

    if (currentLine) {
        result += currentLine.trim();
    }

    return result;
}
