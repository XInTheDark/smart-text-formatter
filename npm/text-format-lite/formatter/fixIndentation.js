export function fixIndentation(text, params = { maxIndent: 16, multipleOf: 4 }) {
    // Intelligently fixes indentation that considers context.
    // Code blocks are ignored since their indentation rules are too complex.

    let lines = text.split('\n');
    let isCodeBlock = false;
    let indentLevels = [];
    let indentOffset = Infinity;

    // First determine the indentation level of each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('```')) {
            isCodeBlock = !isCodeBlock;
        }

        if (isCodeBlock) {
            indentLevels.push(null);
        } else {
            const indent = line.match(/^\s*/)[0].length;
            indentLevels.push(indent);
            indentOffset = Math.min(indentOffset, indent);
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!indentLevels[i]) {
            continue;
        }
        let indent = Math.min(Math.max(indentLevels[i] - indentOffset, 0), params.maxIndent);
        indent = Math.round(indent / params.multipleOf) * params.multipleOf;

        lines[i] = ' '.repeat(indent) + line.replace(/^\s*/, '');
    }

    return lines.join('\n');
}
