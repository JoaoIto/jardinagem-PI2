// Tipagem de um serviço
export interface Servico {
    id: number;
    cliente: string;
    telefone: string;
    descricao: string;
    valor: string;
    data?: string;
    hora?: string;
    status: 'concluido' | 'em-atendimento' | 'aprovado';
  }