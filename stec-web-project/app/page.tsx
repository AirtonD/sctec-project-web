"use client";

import { useState, useCallback } from "react";
import { EmpreendimentoTable } from "@/components/empreendimento-table";
import { EmpreendimentoFormDialog } from "@/components/empreendimento-form-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { mockEmpreendimentos } from "@/data/mock-empreendimentos";
import type { Empreendimento } from "@/types/empreendimento";
import { MapPin } from "lucide-react";

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
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-2">
            <MapPin className="size-5 text-muted-foreground" aria-hidden />
            <h1 className="text-lg font-semibold tracking-tight">
              Empreendimentos em Santa Catarina
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <EmpreendimentoFormDialog onSubmit={handleCreate} />
          </div>
        </div>
      </header>
      <main className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Listagem de empreendimentos
            </h2>
            <p className="text-sm text-muted-foreground">
              Gerencie os empreendimentos cadastrados em Santa Catarina
            </p>
          </div>
          <EmpreendimentoTable empreendimentos={empreendimentos} />
        </div>
      </main>
    </div>
  );
}
