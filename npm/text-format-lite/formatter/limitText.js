export function limitText(text, params = { limit: 0, mode: 'characters' }) {
    const { limit, mode } = params;
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
