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
  FixIndentation: { name: 'FixIndentation' },
  RemoveNonEnglish: { name: 'RemoveNonEnglish' },
  WrapLines: { name: 'WrapLines', params: { limit: 0, mode: 'characters' } },
  LimitText: { name: 'LimitText', params: { limit: 0, mode: 'characters' } },
  ALL: { name: 'ALL' }
};

export function format(text, options) {
  const formatters = {
    [option.SmartRemoveNewlines.name]: smartRemoveNewlines,
    [option.CapitalizeFirstLetter.name]: capitalizeFirstLetter,
    [option.RemoveExtraSpaces.name]: removeExtraSpaces,
    [option.FixIndentation.name]: fixIndentation,
    [option.RemoveNonEnglish.name]: removeNonEnglish,
    [option.WrapLines.name]: wrapLines,
    [option.LimitText.name]: limitText
  };

  const applyAll = options.some(opt => opt.name === option.ALL.name);

  return options.reduce((formattedText, opt) => {
    if (applyAll || formatters[opt.name]) {
      return formatters[opt.name](formattedText, opt.params);
    }
    return formattedText;
  }, text);
}
