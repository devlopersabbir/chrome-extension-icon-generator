import IconGenerator from "@/components/icon-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container max-w-4xl px-4 py-8 md:py-12">
        <IconGenerator />
      </div>
    </main>
  );
}
