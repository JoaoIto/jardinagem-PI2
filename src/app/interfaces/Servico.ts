// Tipagem de um serviço
export interface Servico {
    _id: string;
    cliente: string;
    telefone: string;
    descricao: string;
    valorTotal: string;
    data?: string;
    hora?: string;
    status: 'concluido' | 'em-atendimento' | 'aprovado' | 'cancelado';
  }