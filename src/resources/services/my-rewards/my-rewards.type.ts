export interface IMyReward {
  id_premio: number;
  nome: string;
  img_premio: string;
  data_resgate: string;
  qtde_pontos_resgate: number;
  codigo_voucher?: string;
  serial_numero?: string;
  url_premio?: string;
  instrucao_premio?: string;
}
