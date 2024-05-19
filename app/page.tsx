import Meditor from "@/components/Meditor";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-mono text-6xl font-bold">
        <span className="inline bg-gradient-to-br from-purple-300 to-blue-500 bg-clip-text text-transparent">
          Meditor
        </span>
      </h1>
      <h2 className="mt-4 text-2xl text-gray-500">
        A Medium-like editor built with TipTap and Tailwind CSS
      </h2>
      <div className="mt-12">
        <Card className="min-h-[400px] w-[800px] px-16 py-12">
          <Meditor />
        </Card>
      </div>
    </main>
  );
}
