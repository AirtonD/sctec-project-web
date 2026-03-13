export const SEGMENTOS = [
  "Tecnologia",
  "Comércio",
  "Indústria",
  "Serviços",
  "Agronegócio",
] as const;

export type Segmento = (typeof SEGMENTOS)[number];

export type Status = "ativo" | "inativo";

export interface Empreendimento {
  id: string;
  nome: string;
  empreendedor: string;
  municipio: string;
  segmento: Segmento;
  email: string;
  status: Status;
}
