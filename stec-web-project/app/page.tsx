"use client";

import { useState, useCallback } from "react";
import { EmpreendimentoTable } from "@/components/empreendimento-table";
import { EmpreendimentoFormDialog } from "@/components/empreendimento-form-dialog";
import { mockEmpreendimentos } from "@/data/mock-empreendimentos";
import type { Empreendimento } from "@/types/empreendimento";

function generateId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function Home() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>(mockEmpreendimentos);

  const handleCreate = useCallback((data: Omit<Empreendimento, "id">) => {
    const novo: Empreendimento = {
      ...data,
      id: generateId(),
    };
    setEmpreendimentos((prev) => [...prev, novo]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Empreendimentos em Santa Catarina
          </h1>
          <EmpreendimentoFormDialog onSubmit={handleCreate} />
        </div>
        <EmpreendimentoTable empreendimentos={empreendimentos} />
      </main>
    </div>
  );
}
