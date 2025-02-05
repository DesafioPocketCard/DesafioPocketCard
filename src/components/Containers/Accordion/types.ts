
interface IConfig {
    bgColor?: string
    title?: string
    body?: string
}

export interface IAccordion {
    configs: IConfig[];
    defaultOpen?: number;
    kerning?: boolean;
}