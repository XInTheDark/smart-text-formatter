# text-format-lite

Format text intelligently.

## Overview

This is a lightweight and intelligent text formatting tool. It supports various text formatting options that you can
easily apply to the input.

Examples of supported text formatting options include:

- Smart Remove Newlines
- Remove Extra Spaces
- Fix Indentation
- Wrap Text by characters or words
- ... and much more! We're constantly adding new options.

## Getting Started

The module exports two useful things: `option` and `Formatter`.

`option` contains all the available formatting options. For example, `option.SmartRemoveNewlines` is a function that
removes newlines intelligently.
You can also just inspect the `option` object to see all available options.

`Formatter` is a class that you can use to format text. Usage is very simple:

1. Create a new instance of `Formatter`
2. Call the `format` method with the text, and an array of the desired options.

Note that the options will be applied in the order they are specified in the array. You can also apply the same option
multiple times.

Here's an example:

```js
import { option, Formatter } from 'text-format-lite';

const formatter = new Formatter();
const formattedText = formatter.format(' hello, world!  ', [option.RemoveExtraSpaces, option.CapitalizeFirstLetter]);
console.log(formattedText); // Output: Hello, world!
```

## Customizing Options

Some options have a `params` property that you can use to customize the behavior.
For example, the `WrapLines` and `LimitText` options let you specify the number of characters or words to wrap the text
by.

You can check the `params` property of an option to see what customization options are available, as well as their
default values.

Here's an example of customizing the `LimitText` option:

```js
import { option, Formatter } from 'text-format-lite';

const formatter = new Formatter();
const formattedText = formatter.format('hello, world!', [{
    ...option.LimitText,
    params: { limit: 5, mode: 'characters' }
}]);
console.log(formattedText); // Output: hello
```

## Contributing

We welcome contributions! If you have an idea for a new text formatting option or want to improve an existing one, feel
free to submit a pull request.