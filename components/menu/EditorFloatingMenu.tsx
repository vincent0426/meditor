"use client";

import { Editor } from "@tiptap/core";
import { FloatingMenu } from "@tiptap/react";
import { motion } from "framer-motion";
import { Image as ImageLucide, List, ListOrdered, Minus } from "lucide-react";
import { useRef } from "react";

import PlusButton from "@/components/button/PlusButton";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { convertFileToBase64 } from "@/utils/convert-file-to-base64";

interface FloatingMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: JSX.Element;
}

interface EditorFloatingMenuProps {
  editor: Editor;
  showPlusButton: boolean;
  showFloatingMenu: boolean;
  setShowFloatingMenu: (show: boolean) => void;
}

function EditorFloatingMenu({
  editor,
  showPlusButton,
  showFloatingMenu,
  setShowFloatingMenu,
}: EditorFloatingMenuProps) {
  const hiddenFileInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  const ref = useOutsideClick(() => {
    setShowFloatingMenu(false);
  });

  const items: FloatingMenuItem[] = [
    {
      name: "image",
      isActive: () => editor.isActive("image"),
      command: () => {
        hiddenFileInput.current.click();
      },
      icon: <ImageLucide className="size-5 text-[#1a8917]" />,
    },
    {
      name: "bulletList",
      isActive: () => editor.isActive("bulletList"),
      command: () => editor.chain().focus().toggleBulletList().run(),
      icon: <List className="size-5 text-[#1a8917]" strokeWidth={1} />,
    },
    {
      name: "orderedList",
      isActive: () => editor.isActive("orderedList"),
      command: () => editor.chain().focus().toggleOrderedList().run(),
      icon: <ListOrdered className="size-5 text-[#1a8917]" strokeWidth={1} />,
    },
    {
      name: "horizontalRule",
      isActive: () => editor.isActive("horizontalRule"),
      command: () => editor.chain().focus().setHorizontalRule().run(),
      icon: <Minus className="size-5 text-[#1a8917]" strokeWidth={1} />,
    },
  ];

  const shouldFloatingMenuShow = (editor: Editor) => {
    const { selection } = editor.state;

    // If the selection is not empty, do not show the floating menu.
    // If depth is 1, it means the selection is in the top level of the document.
    // ol, ul depth will not be 1, so we need to check if the selection is in the top level.
    if (!selection.empty || selection.$head.parent.content.size > 0 || selection.$head.depth !== 1) {
      return false;
    }

    return true;
  };

  const addImage = async (e: React.FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const base64 = await convertFileToBase64(file);

    if (base64) {
      editor?.chain().focus().setImage({ src: base64 }).run();
    }
  };

  return (
    <FloatingMenu
      className={cn(showPlusButton ? "flex" : "hidden", "relative")}
      editor={editor}
      // don't show if current node is h1 or if current node is not empty
      shouldShow={() => shouldFloatingMenuShow(editor)}
      tippyOptions={{
        duration: 100,
      }}
    >
      <PlusButton
        ref={ref}
        showFloatingMenu={showFloatingMenu}
        setShowFloatingMenu={setShowFloatingMenu}
      />

      {/* This input component need to be placed here, otherwise it will be hidden
          when showFloatingMenu is false */}
      <input
        ref={hiddenFileInput}
        hidden
        accept="image/png, image/jpeg, image/jpg"
        type="file"
        onInput={(e) => {
          addImage(e);
        }}
      />

      {showFloatingMenu && (
        <div className="absolute -left-3 -top-5 z-[9999] flex h-10 w-fit items-center space-x-2 bg-white px-2">
          {items.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0 }}  // Start as invisible
              animate={{ opacity: 1 }}  // Become fully visible
              exit={{ opacity: 0 }}     // Become invisible on exit
              transition={{ duration: 0.2, delay: index * 0.01 }}  // Appear in quick succession
              className={cn(
                item.isActive() ? "text-gray-600" : "text-gray-400",
                "border-[#1a8917] border rounded-full size-8 flex items-center justify-center"
              )}
              onClick={item.command}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>
      )}
    </FloatingMenu>
  );
}

export default EditorFloatingMenu;
