export interface IProfile {
    id_participante: string,
    nome_participante: string,
    telefone_participante: string,
    email_participante: string,
    cargo_participante: string,
    bio_participante: string,
    metas_atingidas: number,
    desafios_concluidos: number,
    dias_ativos: number,
    nome_arquivo: string
}

export interface IProfileForm extends Pick<IProfile, 'nome_participante' | 'telefone_participante' | 'bio_participante'> { }