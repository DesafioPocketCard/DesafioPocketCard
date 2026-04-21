export interface IGift {
  id_premio: string;
  nome_premio: string;
  valor_pontos: number;
  descricao_premio: string;
  nome_arquivo: string;
  id_grupo_premio?: string;
}

export interface ICategory {
  id_grupo_premio: string;
  nome_grupo_premio: string;
  codigo_externo?: string;
  nome_arquivo?: string;
}
