export interface IProfile {
  nome_participante: string;
  cargo_participante: string;
  bio_participante: string;
  email_participante: string;
  telefone_participante: string;
  nome_arquivo: string;
  metas_atingidas: number;
  desafios_concluidos: number;
  dias_ativos: number;
}

export interface IProfileForm {
  nome_participante: string;
  telefone_participante: string;
  bio_participante: string;
}
