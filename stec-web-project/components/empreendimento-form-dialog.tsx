"use client";

import { useState, useEffect } from "react";
import type { Empreendimento, Segmento, Status } from "@/types/empreendimento";
import { SEGMENTOS, MUNICIPIOS_SC } from "@/types/empreendimento";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

interface EmpreendimentoFormDialogProps {
  empreendimento?: Empreendimento | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (empreendimento: Omit<Empreendimento, "id">) => void;
  onUpdate?: (empreendimento: Empreendimento) => void;
}

const initialForm = {
  nome: "",
  empreendedor: "",
  municipio: "",
  segmento: "" as Segmento | "",
  email: "",
  status: "ativo" as Status,
};

export function EmpreendimentoFormDialog({
  empreendimento,
  open,
  onOpenChange,
  onSubmit,
  onUpdate,
}: EmpreendimentoFormDialogProps) {
  const [form, setForm] = useState(initialForm);
  const isEdit = !!empreendimento;

  useEffect(() => {
    if (open) {
      if (empreendimento) {
        setForm({
          nome: empreendimento.nome,
          empreendedor: empreendimento.empreendedor,
          municipio: empreendimento.municipio,
          segmento: empreendimento.segmento,
          email: empreendimento.email,
          status: empreendimento.status,
        });
      } else {
        setForm(initialForm);
      }
    } else {
      setForm(initialForm);
    }
  }, [open, empreendimento]);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
  };

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
    if (isEdit && empreendimento && onUpdate) {
      onUpdate({
        ...empreendimento,
        nome: form.nome.trim(),
        empreendedor: form.empreendedor.trim(),
        municipio: form.municipio,
        segmento: form.segmento,
        email: form.email.trim(),
        status: form.status,
      });
    } else {
      onSubmit({
        nome: form.nome.trim(),
        empreendedor: form.empreendedor.trim(),
        municipio: form.municipio,
        segmento: form.segmento,
        email: form.email.trim(),
        status: form.status,
      });
    }
    setForm(initialForm);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Editar empreendimento" : "Cadastrar empreendimento"}
            </DialogTitle>
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
                value={form.municipio}
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
                value={form.segmento}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{isEdit ? "Salvar alterações" : "Cadastrar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
