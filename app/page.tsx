import type { Metadata } from "next";
import IconGenerator from "@/components/icon-generator";

export const metadata: Metadata = {
  title: "Chrome Extension Icon Generator",
  description:
    "Generate Chrome extension icons in various sizes from your image",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container max-w-4xl px-4 py-8 md:py-12">
        <IconGenerator />
      </div>
    </main>
  );
}
