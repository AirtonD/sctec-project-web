"use client";

import { useState, useCallback, useEffect } from "react";
import { EmpreendimentoTable } from "@/components/empreendimento-table";
import { EmpreendimentoFormDialog } from "@/components/empreendimento-form-dialog";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { mockEmpreendimentos } from "@/data/mock-empreendimentos";
import type { Empreendimento } from "@/types/empreendimento";
import { MapPin, Plus } from "lucide-react";

const STORAGE_KEY = "empreendimentos-sctec";

function loadEmpreendimentos(): Empreendimento[] {
    if (typeof window === "undefined") {
        return mockEmpreendimentos;
    }

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return mockEmpreendimentos;
        }

        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
            return parsed as Empreendimento[];
        }
    } catch {
        // ignore malformed payloads
    }

    return mockEmpreendimentos;
}

function generateId() {
    return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function Home() {
    const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>(loadEmpreendimentos);
    const [formOpen, setFormOpen] = useState(false);
    const [editingEmpreendimento, setEditingEmpreendimento] = useState<Empreendimento | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletingEmpreendimento, setDeletingEmpreendimento] = useState<Empreendimento | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(empreendimentos));
        } catch {
            // ignore write failures
        }
    }, [empreendimentos]);

    const handleCreate = useCallback((data: Omit<Empreendimento, "id">) => {
        const novo: Empreendimento = {
            ...data,
            id: generateId(),
        };
        setEmpreendimentos((prev) => [...prev, novo]);
    }, []);

    const handleUpdate = useCallback((updated: Empreendimento) => {
        setEmpreendimentos((prev) =>
            prev.map((e) => (e.id === updated.id ? updated : e))
        );
    }, []);

    const handleDelete = useCallback((emp: Empreendimento) => {
        setDeletingEmpreendimento(emp);
        setDeleteOpen(true);
    }, []);

    const confirmDelete = useCallback(() => {
        if (deletingEmpreendimento) {
            setEmpreendimentos((prev) =>
                prev.filter((e) => e.id !== deletingEmpreendimento.id)
            );
            setDeletingEmpreendimento(null);
        }
    }, [deletingEmpreendimento]);

    const handleEdit = useCallback((emp: Empreendimento) => {
        setEditingEmpreendimento(emp);
        setFormOpen(true);
    }, []);

    const handleNewClick = useCallback(() => {
        setEditingEmpreendimento(null);
        setFormOpen(true);
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
                        <Button onClick={handleNewClick}>
                            <Plus className="size-4" />
                            Novo empreendimento
                        </Button>
                        <EmpreendimentoFormDialog
                            open={formOpen}
                            onOpenChange={(open) => {
                                setFormOpen(open);
                                if (!open) setEditingEmpreendimento(null);
                            }}
                            empreendimento={editingEmpreendimento}
                            onSubmit={handleCreate}
                            onUpdate={handleUpdate}
                        />
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
                    <EmpreendimentoTable
                        empreendimentos={empreendimentos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <DeleteConfirmDialog
                        open={deleteOpen}
                        onOpenChange={(open) => {
                            setDeleteOpen(open);
                            if (!open) setDeletingEmpreendimento(null);
                        }}
                        nome={deletingEmpreendimento?.nome ?? ""}
                        onConfirm={confirmDelete}
                    />
                </div>
            </main>
        </div>
    );
}
