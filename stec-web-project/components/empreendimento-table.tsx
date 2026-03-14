"use client";

import type { Empreendimento } from "@/types/empreendimento";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface EmpreendimentoTableProps {
  empreendimentos: Empreendimento[];
  onEdit?: (empreendimento: Empreendimento) => void;
  onDelete?: (empreendimento: Empreendimento) => void;
}

export function EmpreendimentoTable({
  empreendimentos,
  onEdit,
  onDelete,
}: EmpreendimentoTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Empreendimentos em Santa Catarina</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empreendedor(a)</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              {(onEdit || onDelete) && (
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {empreendimentos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={onEdit || onDelete ? 7 : 6}
                  className="text-center text-muted-foreground py-8"
                >
                  Nenhum empreendimento cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              empreendimentos.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.nome}</TableCell>
                  <TableCell>{emp.empreendedor}</TableCell>
                  <TableCell>{emp.municipio}</TableCell>
                  <TableCell>{emp.segmento}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={emp.status === "ativo" ? "default" : "secondary"}
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>
                  {(onEdit || onDelete) && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => onEdit(emp)}
                            aria-label={`Editar ${emp.nome}`}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => onDelete(emp)}
                            aria-label={`Excluir ${emp.nome}`}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
