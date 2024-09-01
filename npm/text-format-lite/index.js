import { smartRemoveNewlines } from './formatter/smartRemoveNewlines.js';
import { capitalizeFirstLetter } from './formatter/capitalizeFirstLetter.js';
import { removeExtraSpaces } from './formatter/removeExtraSpaces.js';
import { fixIndentation } from './formatter/fixIndentation.js';
import { removeNonEnglish } from './formatter/removeNonEnglish.js';
import { wrapLines } from './formatter/wrapLines.js';
import { limitText } from './formatter/limitText.js';

// Text formatting options
export const option = {
  SmartRemoveNewlines: 'SmartRemoveNewlines',
  CapitalizeFirstLetter: 'CapitalizeFirstLetter',
  RemoveExtraSpaces: 'RemoveExtraSpaces',
  FixIndentation: 'FixIndentation',
  RemoveNonEnglish: 'RemoveNonEnglish',
  WrapLines: 'WrapLines',
  LimitText: 'LimitText',
  ALL: 'ALL'
};

export class Formatter {
  constructor() {
    this.formatters = [
      { option: option.SmartRemoveNewlines, func: smartRemoveNewlines },
      { option: option.CapitalizeFirstLetter, func: capitalizeFirstLetter },
      { option: option.RemoveExtraSpaces, func: removeExtraSpaces },
      { option: option.FixIndentation, func: fixIndentation },
      { option: option.RemoveNonEnglish, func: removeNonEnglish },
      { option: option.WrapLines, func: wrapLines },
      { option: option.LimitText, func: limitText }
    ];
  }

  format(text, options) {
    const applyAll = options.some(opt => opt.option === option.ALL);

    return this.formatters.reduce((formattedText, formatter) => {
      const optionConfig = options.find(opt => opt.option === formatter.option) || {};
      if (applyAll || optionConfig.option) {
        return formatter.func(formattedText, optionConfig.params);
      }
      return formattedText;
    }, text);
  }
}
