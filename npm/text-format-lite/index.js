import { smartRemoveNewlines } from './formatter/smartRemoveNewlines.js';
import { trimWhitespace } from './formatter/trimWhitespace.js';
import { capitalizeFirstLetter } from './formatter/capitalizeFirstLetter.js';
import { removeExtraSpaces } from './formatter/removeExtraSpaces.js';
import { fixIndentation } from './formatter/fixIndentation.js';
import { removeNonEnglish } from './formatter/removeNonEnglish.js';

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

class Formatter {
  constructor() {
    this.formatters = [
      { option: option.SmartRemoveNewlines, func: smartRemoveNewlines },
      { option: option.TrimWhitespace, func: trimWhitespace },
      { option: option.CapitalizeFirstLetter, func: capitalizeFirstLetter },
      { option: option.RemoveExtraSpaces, func: removeExtraSpaces },
      { option: option.FixIndentation, func: fixIndentation },
      { option: option.RemoveNonEnglish, func: removeNonEnglish }
    ];
  }

  format(text, options) {
    const applyAll = options.includes(option.ALL);

    return this.formatters.reduce((formattedText, formatter) => {
      if (applyAll || options.includes(formatter.option)) {
        return formatter.func(formattedText);
      }
      return formattedText;
    }, text);
  }
}

export const formatter = new Formatter();
