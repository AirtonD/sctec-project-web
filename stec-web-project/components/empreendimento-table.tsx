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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmpreendimentoTableProps {
  empreendimentos: Empreendimento[];
}

export function EmpreendimentoTable({ empreendimentos }: EmpreendimentoTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-base">Empreendimentos cadastrados</CardTitle>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {empreendimentos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
