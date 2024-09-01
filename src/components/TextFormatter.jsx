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
    [option.SmartRemoveNewlines]: false,
    [option.TrimWhitespace]: false,
    [option.CapitalizeFirstLetter]: false,
    [option.RemoveExtraSpaces]: false,
    [option.FixIndentation]: false,
    [option.RemoveNonEnglish]: false,
  });
  const [wrapLines, setWrapLines] = useState(false);
  const [wrapType, setWrapType] = useState('characters');
  const [wrapLimit, setWrapLimit] = useState('');
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
      .map(([key, _]) => key);
    
    let formattedText = formatter.format(inputText, selectedOptions);
    
    if (wrapLines && wrapLimit) {
      formattedText = formatter.wrapLines(formattedText, parseInt(wrapLimit, 10), wrapType);
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
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={() => handleOptionChange(key)}
              />
              <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="wrapLines"
            checked={wrapLines}
            onCheckedChange={setWrapLines}
          />
          <label htmlFor="wrapLines">Wrap Lines</label>
        </div>
        {wrapLines && (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Limit"
              value={wrapLimit}
              onChange={(e) => setWrapLimit(e.target.value)}
              className="w-24"
            />
            <Select value={wrapType} onValueChange={setWrapType}>
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
