import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeBlockSelectProps {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: (attrs: { language: string }) => void;
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
}

const CodeBlockSelect =  ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }: CodeBlockSelectProps) => (
  <NodeViewWrapper className="code-block">
    <pre className="relative m-0 !mt-[44px] box-border rounded-[4px] border border-[#E5E5E5] bg-[#F9F9F9] !p-[32px] text-[14px] text-black text-opacity-[.84]">
      <div className="absolute left-[12px] top-[8px] z-[999]">
        <Select defaultValue="null" onValueChange={value => updateAttributes({ language: value })}>
          <SelectTrigger className="foucs:ring-0 mt-0 h-[19px] w-[131.2px] border-0 bg-transparent p-0 ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">
            Auto
            </SelectItem>
            {extension.options.lowlight.listLanguages().map((lang, index) => (
              <SelectItem key={index} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

export default CodeBlockSelect;