"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IconPreviewProps {
  size: number;
  image: string;
  onDownload: () => void;
}

export function IconPreview({ size, image, onDownload }: IconPreviewProps) {
  const containerSize = size < 48 ? 80 : size + 32;

  return (
    <motion.div
      className="flex flex-col items-center space-y-3"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div
        className="relative flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur"
        style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
      >
        <div
          className="relative"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`${size}x${size} icon preview`}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        className="w-full"
      >
        <Download className="mr-2 h-3 w-3" />
        {size}x{size} px
      </Button>
    </motion.div>
  );
}
