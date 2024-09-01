export function capitalizeFirstLetter(text) {
    return text.replace(/(?:^|\.\s+)([a-z])/g, (match) => match.toUpperCase());
}