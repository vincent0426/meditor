import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface PlusButtonProps {
  showFloatingMenu: boolean;
  setShowFloatingMenu: (show: boolean) => void;
}

const PlusButton = forwardRef<HTMLButtonElement, PlusButtonProps>(
  ({ showFloatingMenu, setShowFloatingMenu }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          showFloatingMenu ? "text-gray-400" : "text-gray-300",
          "absolute right-6 rounded-full top-[-15.5px] bg-white active:text-gray-400"
        )}
        onClick={() => {
          setShowFloatingMenu(!showFloatingMenu);
        }}
      >
        <motion.div
          animate={{ rotate: showFloatingMenu ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlusCircle className="size-8 text-black text-opacity-[0.68]" strokeWidth={1} />
        </motion.div>
      </button>
    );
  }
);

PlusButton.displayName = "PlusButton";

export default PlusButton;
