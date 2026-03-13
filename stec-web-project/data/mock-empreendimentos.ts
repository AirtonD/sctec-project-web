import type { Empreendimento } from "@/types/empreendimento";

export const mockEmpreendimentos: Empreendimento[] = [
  {
    id: "1",
    nome: "TechSC Soluções",
    empreendedor: "Maria Silva",
    municipio: "Florianópolis",
    segmento: "Tecnologia",
    email: "contato@techsc.com.br",
    status: "ativo",
  },
  {
    id: "2",
    nome: "Agro Sul Catarinense",
    empreendedor: "João Santos",
    municipio: "Chapecó",
    segmento: "Agronegócio",
    email: "vendas@agrosul.sc",
    status: "ativo",
  },
  {
    id: "3",
    nome: "Confecções Litoral",
    empreendedor: "Ana Oliveira",
    municipio: "Joinville",
    segmento: "Indústria",
    email: "ana@confeccoeslitoral.com.br",
    status: "inativo",
  },
];
