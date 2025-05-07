"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileUploader } from "./file-uploader";
import { IconPreview } from "./icon-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Copy, FileCode2 } from "lucide-react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { toast } from "sonner";

export default function IconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("logo.png");
  const codeRef = useRef<HTMLPreElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async (size: number) => {
    if (!image) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const img = document.createElement("img");
      img.src = image;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      ctx.drawImage(img, 0, 0, size, size);

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `icon${size}.png`;
      link.click();

      toast(`${size}x${size}px icon has been downloaded.`);
    } catch (error: any) {
      console.log("error", error);
      toast("Download Failed");
    }
  };

  const handleDownloadAll = async () => {
    if (!image) return;

    try {
      const sizes = [16, 32, 48, 128];
      const zip = new JSZip();
      const iconsFolder = zip.folder("icons");

      if (!iconsFolder) return;

      for (const size of sizes) {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        if (!ctx) continue;

        const img = document.createElement("img");
        img.src = image;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        ctx.drawImage(img, 0, 0, size, size);

        const dataUrl = canvas.toDataURL("image/png");
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");

        iconsFolder.file(`icon${size}.png`, base64Data, { base64: true });
      }

      const content = await zip.generateAsync({ type: "blob" });
      FileSaver.saveAs(content, "chrome-extension-icons.zip");

      toast("All icons have been downloaded as a ZIP file.");
    } catch (error: any) {
      console.log("error", error);
      toast("There was an error downloading the icons.");
    }
  };

  const copyManifestCode = () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent;
      if (text) {
        navigator.clipboard.writeText(text);
        toast("Manifest code has been copied to clipboard.");
      }
    }
  };

  const manifestCode = `"icons": {
  "16": "icons/icon16.png",
  "32": "icons/icon32.png",
  "48": "icons/icon48.png",
  "128": "icons/icon128.png"
},`;

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500">
          <FileCode2 className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Chrome Extension Icon Generator
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full"
      >
        <FileUploader onImageUpload={handleImageUpload} fileName={fileName} />
      </motion.div>

      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full space-y-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <IconPreview
              size={128}
              image={image}
              onDownload={() => handleDownload(128)}
            />
            <IconPreview
              size={48}
              image={image}
              onDownload={() => handleDownload(48)}
            />
            <IconPreview
              size={32}
              image={image}
              onDownload={() => handleDownload(32)}
            />
            <IconPreview
              size={16}
              image={image}
              onDownload={() => handleDownload(16)}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleDownloadAll}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>

          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Copy this code into your manifest.json file
                </h3>
                <Button variant="ghost" size="sm" onClick={copyManifestCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-md bg-black p-4">
                <pre ref={codeRef} className="text-sm text-cyan-400">
                  {manifestCode}
                </pre>
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                After putting the icons folder into your project.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <a
                href="https://developer.chrome.com/docs/extensions/mv3/manifest/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileCode2 className="mr-2 h-4 w-4" />
                Extension Docs
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
