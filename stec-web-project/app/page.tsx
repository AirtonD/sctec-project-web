import { EmpreendimentoTable } from "@/components/empreendimento-table";
import { mockEmpreendimentos } from "@/data/mock-empreendimentos";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">
          Empreendimentos em Santa Catarina
        </h1>
        <EmpreendimentoTable empreendimentos={mockEmpreendimentos} />
      </main>
    </div>
  );
}
