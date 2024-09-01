import { useState } from 'react';
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
    const supportedOptions = [
        [option.SmartRemoveNewlines, "Smart Remove Newlines"],
        [option.CapitalizeFirstLetter, "Capitalize First Letter"],
        [option.RemoveExtraSpaces, "Remove Extra Spaces"],
        [option.FixIndentation, "Fix Indentation"],
        [option.RemoveNonEnglish, "Remove Non-English Characters"],
        [option.WrapLines, "Wrap Lines"],
        [option.LimitText, "Limit Text"],
    ];

    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [options, setOptions] = useState(
        supportedOptions.reduce((acc, opt) => ({ ...acc, [opt[0].name]: false }), {}));

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

    const optionComponent = (opt, userFriendlyName) => {
        return (
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={opt.name}
                    checked={options[opt.name]}
                    onCheckedChange={() => handleOptionChange(opt.name)}
                />
                <label htmlFor={opt.name}>{userFriendlyName}</label>
            </div>
        );
    }

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
                    {supportedOptions.map(([opt, userFriendlyName]) => (
                        optionComponent(opt, userFriendlyName)
                    ))}
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
