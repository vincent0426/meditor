import { GitBranchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import HoverBorderGradientButton from "@/components/button/HoverBorderGradientButton";
import { cn } from "@/lib/utils";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <HoverBorderGradientButton>
        <Link href="https://github.com/vincent0426/meditor" className="flex items-center space-x-2" target="_blank">
          <GitBranchIcon size={24} className="text-black/50 dark:text-white/50" />
          <span>Find code</span>
        </Link>
      </HoverBorderGradientButton>
    </div>
  );
};

export default Navbar;