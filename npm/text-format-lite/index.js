// Text formatting options
export const option = {
  SmartRemoveNewlines: 'SmartRemoveNewlines',
  TrimWhitespace: 'TrimWhitespace',
  CapitalizeFirstLetter: 'CapitalizeFirstLetter',
  RemoveExtraSpaces: 'RemoveExtraSpaces',
  FixIndentation: 'FixIndentation',
  RemoveNonEnglish: 'RemoveNonEnglish',
  ALL: 'ALL'
};

// Main formatting function
export function format(text, options) {
  let formattedText = text;

  const applyAll = options.includes(option.ALL);

  if (applyAll || options.includes(option.SmartRemoveNewlines)) {
    formattedText = formattedText.replace(/(?<!\n)\n(?!\n)/g, ' ').replace(/\n{2,}/g, '\n\n');
  }

  if (applyAll || options.includes(option.TrimWhitespace)) {
    formattedText = formattedText.trim();
  }

  if (applyAll || options.includes(option.CapitalizeFirstLetter)) {
    formattedText = formattedText.replace(/(?:^|\.\s+)([a-z])/g, (match) => match.toUpperCase());
  }

  if (applyAll || options.includes(option.RemoveExtraSpaces)) {
    formattedText = formattedText.replace(/\s+/g, ' ');
  }

  if (applyAll || options.includes(option.FixIndentation)) {
    formattedText = formattedText.split('\n').map(line => {
      const indentLevel = line.search(/\S/);
      return ' '.repeat(indentLevel) + line.trim();
    }).join('\n');
  }

  if (applyAll || options.includes(option.RemoveNonEnglish)) {
    formattedText = formattedText.replace(/[^\x00-\x7F]/g, "");
  }

  return formattedText;
}