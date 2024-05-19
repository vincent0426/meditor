"use client";

import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import { BoldIcon, ItalicIcon, Link, Quote, Strikethrough, Type, UnderlineIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { LinkSelector } from "@/components/LinkSelector";
import { cn } from "@/lib/utils";

interface BubbleMenuItem {
  name: string;
  disable?: () => boolean;
  isActive: () => boolean;
  command: () => void;
  icon: JSX.Element;
}

interface EditorBubbleMenuProps {
  editor: Editor;
  showBubbleMenu: boolean;
  showLinkSelector: boolean;
  setShowLinkSelector: Dispatch<SetStateAction<boolean>>;
}

function EditorBubbleMenu({ editor, showBubbleMenu, showLinkSelector, setShowLinkSelector }: EditorBubbleMenuProps) {
  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      disable: () => editor.isActive("heading"),
      isActive: () => editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: <BoldIcon className="size-[21px]" />,
    },
    {
      name: "italic",
      disable: () => editor.isActive("heading"),
      isActive: () => editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: <ItalicIcon className="size-[21px]" />,
    },
    {
      name: "underline",
      disable: () => editor.isActive("heading"),
      isActive: () => editor.isActive("underline"),
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: <UnderlineIcon className="size-[21px]" />,
    },
    {
      name: "strike",
      disable: () => editor.isActive("heading"),
      isActive: () => editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: <Strikethrough className="size-[21px]" />,
    },
    {
      name: "link",
      disable: () => editor.isActive("heading"),
      isActive: () => editor.isActive("link"),
      command: () => {
        setShowLinkSelector(!showLinkSelector);
      },
      icon: <Link className="size-[21px]" />,
    },
    {
      name: "heading2",
      isActive: () => editor.isActive("heading", { level: 2 }),
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: <Type className="size-[21px]" />,
    },
    {
      name: "heading3",
      isActive: () => editor.isActive("heading", { level: 3 }),
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: <Type className="size-[15px]" />,
    },
    {
      name: "blockquote",
      isActive: () => editor.isActive("blockquote"),
      command: () => editor.chain().focus().toggleBlockquote().run(),
      icon: <Quote className="size-[21px]" />,
    },
  ];
  
  // calculate width of bubble menu by number of items
  const width = 40 * items.length;
  
  return (
    <BubbleMenu
      className={cn(
        showBubbleMenu ? "flex" : "hidden",
        `w-[${width}px]`,
        "z-9999 h-[44px] px-[10px] rounded-[5px] bg-[#262625] shadow-lg",
      )}
      editor={editor}
      tippyOptions={{
        moveTransition: "transform 0.15s ease-out",
      }}
    >
      {showLinkSelector ? 
        <LinkSelector editor={editor} showLinkSelector={showLinkSelector} setShowLinkSelector={setShowLinkSelector} /> 
        : <>
          {items.map((item) => (
            <>
              <button
                key={item.name}
                className={cn(
                  item.isActive() ? "text-[#b5e5a4]" : item.disable?.() ? "text-[#4d4d4d]" : "text-white",
                  "px-[7.5px]",
                )}
                disabled={item.disable?.()}
                onClick={item.command}
              >
                {item.icon}
              </button>
              {item.name === "link" && <div className="mx-2 my-auto h-[24px] w-[2px] bg-[#4d4d4d]" />}
            </>
          ))}
        </>
      }
    </BubbleMenu>
  );
}

export default EditorBubbleMenu;
