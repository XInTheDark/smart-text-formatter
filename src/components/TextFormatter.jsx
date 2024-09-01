import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Formatter, option } from 'text-format-lite';

const formatter = new Formatter();

const TextFormatter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [options, setOptions] = useState({
    [option.SmartRemoveNewlines.name]: false,
    [option.CapitalizeFirstLetter.name]: false,
    [option.RemoveExtraSpaces.name]: false,
    [option.FixIndentation.name]: false,
    [option.RemoveNonEnglish.name]: false,
    [option.WrapLines.name]: false,
    [option.LimitText.name]: false,
  });
  const [limitTextType, setLimitTextType] = useState('characters');
  const [wrapLinesType, setWrapLinesType] = useState('characters');
  const [limitTextValue, setLimitTextValue] = useState('');
  const [wrapLinesValue, setWrapLinesValue] = useState('');
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

  const handleOptionChange = (opt) => {
    setOptions((prev) => ({ ...prev, [opt]: !prev[opt] }));
  };

  const formatText = () => {
    const selectedOptions = Object.entries(options)
      .filter(([_, value]) => value)
      .map(([key, _]) => {
        if (key === option.WrapLines.name) {
          return { 
            name: key, 
            params: { 
              limit: parseInt(wrapLinesValue, 10) || 0, 
              mode: wrapLinesType 
            } 
          };
        }
        if (key === option.LimitText.name) {
          return { 
            name: key, 
            params: { 
              limit: parseInt(limitTextValue, 10) || 0, 
              mode: limitTextType 
            } 
          };
        }
        return { name: key };
      });

    const formattedText = formatter.format(inputText, selectedOptions);
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
              checked={options[option.SmartRemoveNewlines.name]}
              onCheckedChange={() => handleOptionChange(option.SmartRemoveNewlines.name)}
            />
            <label htmlFor="smartRemoveNewlines">Smart Remove Newlines</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="capitalizeFirstLetter"
              checked={options[option.CapitalizeFirstLetter.name]}
              onCheckedChange={() => handleOptionChange(option.CapitalizeFirstLetter.name)}
            />
            <label htmlFor="capitalizeFirstLetter">Capitalize First Letter</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="removeExtraSpaces"
              checked={options[option.RemoveExtraSpaces.name]}
              onCheckedChange={() => handleOptionChange(option.RemoveExtraSpaces.name)}
            />
            <label htmlFor="removeExtraSpaces">Remove Extra Spaces</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fixIndentation"
              checked={options[option.FixIndentation.name]}
              onCheckedChange={() => handleOptionChange(option.FixIndentation.name)}
            />
            <label htmlFor="fixIndentation">Fix Indentation</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="removeNonEnglish"
              checked={options[option.RemoveNonEnglish.name]}
              onCheckedChange={() => handleOptionChange(option.RemoveNonEnglish.name)}
            />
            <label htmlFor="removeNonEnglish">Remove Non-English Characters</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="limitText"
              checked={options[option.LimitText.name]}
              onCheckedChange={() => handleOptionChange(option.LimitText.name)}
            />
            <label htmlFor="limitText">Limit Text</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wrapLines"
              checked={options[option.WrapLines.name]}
              onCheckedChange={() => handleOptionChange(option.WrapLines.name)}
            />
            <label htmlFor="wrapLines">Wrap Lines</label>
          </div>
        </div>
        {options[option.LimitText.name] && (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Limit"
              value={limitTextValue}
              onChange={(e) => setLimitTextValue(e.target.value)}
              className="w-24"
            />
            <Select value={limitTextType} onValueChange={setLimitTextType}>
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
        {options[option.WrapLines.name] && (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Wrap at"
              value={wrapLinesValue}
              onChange={(e) => setWrapLinesValue(e.target.value)}
              className="w-24"
            />
            <Select value={wrapLinesType} onValueChange={setWrapLinesType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select wrap type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="characters">Characters</SelectItem>
                <SelectItem value="words">Words</SelectItem>
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
