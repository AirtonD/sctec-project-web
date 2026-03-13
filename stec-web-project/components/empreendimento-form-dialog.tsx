"use client";

import { useState } from "react";
import type { Empreendimento, Segmento, Status } from "@/types/empreendimento";
import { SEGMENTOS, MUNICIPIOS_SC } from "@/types/empreendimento";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface EmpreendimentoFormDialogProps {
  onSubmit: (empreendimento: Omit<Empreendimento, "id">) => void;
}

const initialForm = {
  nome: "",
  empreendedor: "",
  municipio: "",
  segmento: "" as Segmento | "",
  email: "",
  status: "ativo" as Status,
};

export function EmpreendimentoFormDialog({ onSubmit }: EmpreendimentoFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.nome.trim() ||
      !form.empreendedor.trim() ||
      !form.municipio ||
      !form.segmento ||
      !form.email.trim()
    ) {
      return;
    }
    onSubmit({
      nome: form.nome.trim(),
      empreendedor: form.empreendedor.trim(),
      municipio: form.municipio,
      segmento: form.segmento,
      email: form.email.trim(),
      status: form.status,
    });
    setForm(initialForm);
    setOpen(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setForm(initialForm);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="size-4" />
            Novo empreendimento
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cadastrar empreendimento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do empreendimento</Label>
              <Input
                id="nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Ex: TechSC Soluções"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="empreendedor">Empreendedor(a) responsável</Label>
              <Input
                id="empreendedor"
                value={form.empreendedor}
                onChange={(e) => setForm({ ...form, empreendedor: e.target.value })}
                placeholder="Ex: Maria Silva"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Município de Santa Catarina</Label>
              <Select
                value={form.municipio || undefined}
                onValueChange={(v) => setForm({ ...form, municipio: v ?? "" })}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o município" />
                </SelectTrigger>
                <SelectContent>
                  {MUNICIPIOS_SC.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Segmento de atuação</Label>
              <Select
                value={form.segmento || undefined}
                onValueChange={(v) => setForm({ ...form, segmento: (v ?? "") as Segmento })}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  {SEGMENTOS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail ou meio de contato</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Ex: contato@empresa.com.br"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v as Status })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
