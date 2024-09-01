import { smartRemoveNewlines } from './formatter/smartRemoveNewlines.js';
import { capitalizeFirstLetter } from './formatter/capitalizeFirstLetter.js';
import { removeExtraSpaces } from './formatter/removeExtraSpaces.js';
import { fixIndentation } from './formatter/fixIndentation.js';
import { removeNonEnglish } from './formatter/removeNonEnglish.js';
import { wrapLines } from './formatter/wrapLines.js';
import { limitText } from './formatter/limitText.js';

// Text formatting options
export const option = {
  SmartRemoveNewlines: { name: 'SmartRemoveNewlines' },
  CapitalizeFirstLetter: { name: 'CapitalizeFirstLetter' },
  RemoveExtraSpaces: { name: 'RemoveExtraSpaces' },
  FixIndentation: { name: 'FixIndentation', params: { maxIndent: 16, multipleOf: 4 } },
  RemoveNonEnglish: { name: 'RemoveNonEnglish' },
  WrapLines: { name: 'WrapLines', params: { limit: 0, mode: 'characters' } },
  LimitText: { name: 'LimitText', params: { limit: 0, mode: 'characters' } },
  ALL: { name: 'ALL' }
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
    let formattedText = text;

    for (const opt of options) {
      const formatter = this.formatters.find((f) => f.option.name === opt.name);
      if (formatter) {
        formattedText = formatter.func(formattedText, opt.params);
      }
      else {
        console.error(`Unknown option: ${option}`);
      }
    }

    return formattedText;
  }
}
