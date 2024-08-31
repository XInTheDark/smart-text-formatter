import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TextFormatter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [options, setOptions] = useState({
    smartRemoveNewlines: false,
    trimWhitespace: false,
    capitalizeFirstLetter: false,
    removeExtraSpaces: false,
    fixIndentation: false,
    removeNonEnglish: false,
    limitText: false,
  });
  const [limitType, setLimitType] = useState('characters');
  const [limitValue, setLimitValue] = useState('');
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      toast({
        description: "Text copied to clipboard!",
      });
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      toast({
        variant: "destructive",
        description: "Failed to copy text.",
      });
    });
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOptionChange = (option) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const formatText = () => {
    let formattedText = inputText;

    if (options.smartRemoveNewlines) {
      formattedText = formattedText.replace(/(?<!\n)\n(?!\n)/g, ' ').replace(/\n{2,}/g, '\n\n');
    }

    if (options.trimWhitespace) {
      formattedText = formattedText.trim();
    }

    if (options.capitalizeFirstLetter) {
      formattedText = formattedText.replace(/(?:^|\.\s+)([a-z])/g, (match) => match.toUpperCase());
    }

    if (options.removeExtraSpaces) {
      formattedText = formattedText.replace(/\s+/g, ' ');
    }

    if (options.fixIndentation) {
      formattedText = formattedText.split('\n').map(line => {
        const indentLevel = line.search(/\S/);
        return ' '.repeat(indentLevel) + line.trim();
      }).join('\n');
    }

    if (options.removeNonEnglish) {
      formattedText = formattedText.replace(/[^\x00-\x7F]/g, "");
    }

    if (options.limitText && limitValue) {
      const limit = parseInt(limitValue, 10);
      if (limitType === 'characters') {
        formattedText = formattedText.slice(0, limit);
      } else if (limitType === 'words') {
        formattedText = formattedText.split(/\s+/).slice(0, limit).join(' ');
      } else if (limitType === 'sentences') {
        formattedText = formattedText.match(/[^\.!\?]+[\.!\?]+/g)?.slice(0, limit).join(' ') || '';
      }
    }

    setOutputText(formattedText);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Intelligent Text Formatter</h1>
      <div className="space-y-4">
        <Textarea
          placeholder="Paste your text here..."
          value={inputText}
          onChange={handleInputChange}
          className="min-h-[200px]"
        />
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="smartRemoveNewlines"
              checked={options.smartRemoveNewlines}
              onCheckedChange={() => handleOptionChange('smartRemoveNewlines')}
            />
            <label htmlFor="smartRemoveNewlines">Smart Remove Newlines</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trimWhitespace"
              checked={options.trimWhitespace}
              onCheckedChange={() => handleOptionChange('trimWhitespace')}
            />
            <label htmlFor="trimWhitespace">Trim Whitespace</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="capitalizeFirstLetter"
              checked={options.capitalizeFirstLetter}
              onCheckedChange={() => handleOptionChange('capitalizeFirstLetter')}
            />
            <label htmlFor="capitalizeFirstLetter">Capitalize First Letter</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="removeExtraSpaces"
              checked={options.removeExtraSpaces}
              onCheckedChange={() => handleOptionChange('removeExtraSpaces')}
            />
            <label htmlFor="removeExtraSpaces">Remove Extra Spaces</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fixIndentation"
              checked={options.fixIndentation}
              onCheckedChange={() => handleOptionChange('fixIndentation')}
            />
            <label htmlFor="fixIndentation">Fix Indentation</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="removeNonEnglish"
              checked={options.removeNonEnglish}
              onCheckedChange={() => handleOptionChange('removeNonEnglish')}
            />
            <label htmlFor="removeNonEnglish">Remove Non-English Characters</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="limitText"
              checked={options.limitText}
              onCheckedChange={() => handleOptionChange('limitText')}
            />
            <label htmlFor="limitText">Limit Text</label>
          </div>
        </div>
        {options.limitText && (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Limit"
              value={limitValue}
              onChange={(e) => setLimitValue(e.target.value)}
              className="w-24"
            />
            <Select value={limitType} onValueChange={setLimitType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select limit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="characters">Characters</SelectItem>
                <SelectItem value="words">Words</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <Button onClick={formatText}>Format Text</Button>
        <div className="relative">
          <Textarea
            value={outputText}
            readOnly
            placeholder="Formatted text will appear here..."
            className="min-h-[200px] pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={copyToClipboard}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextFormatter;
