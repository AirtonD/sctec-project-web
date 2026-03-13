export const SEGMENTOS = [
  "Tecnologia",
  "Comércio",
  "Indústria",
  "Serviços",
  "Agronegócio",
] as const;

export const MUNICIPIOS_SC = [
  "Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma",
  "Chapecó", "Itajaí", "Jaraguá do Sul", "Lages", "Palhoça",
  "Balneário Camboriú", "Brusque", "Tubarão", "Navegantes", "Concórdia",
  "Araranguá", "Camboriú", "Caçador", "Rio do Sul", "Laguna",
  "São Bento do Sul", "Curitibanos", "Içara", "Itapema", "Fraiburgo",
  "Xanxerê", "Mafra", "Canoinhas", "Imbituba", "Campos Novos",
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
