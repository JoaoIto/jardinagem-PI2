import React from 'react';
import { Card, CardContent, Typography, IconButton, Divider } from '@mui/material';
import { Visibility, Edit, CheckCircle, Cancel, ArrowUpward } from '@mui/icons-material';
import { Servico } from '@/app/interfaces/Servico';

// Função principal que renderiza a tela de agenda de serviços
export default function AgendaServicos() {
  const servicos: Servico[] = [
    {
      id: 1,
      cliente: 'Maria de Lurdes',
      telefone: '(63) 98521-0362',
      descricao: 'Iluminação do Jardim',
      valor: 'R$350,00',
      status: 'concluido',
    },
    {
      id: 2,
      cliente: 'Maria de Lurdes',
      telefone: '(63) 98521-0362',
      descricao: 'Iluminação do Jardim',
      valor: 'R$350,00',
      data: '20/08/2024',
      hora: '15:00',
      status: 'em-atendimento',
    },
    {
      id: 3,
      cliente: 'João da Silva',
      telefone: '(63) 98521-0362',
      descricao: 'Iluminação do Jardim',
      valor: 'R$350,00',
      data: '20/08/2024',
      hora: '15:00',
      status: 'aprovado',
    },
    {
      id: 4,
      cliente: 'Maria de Lurdes',
      telefone: '(63) 98521-0362',
      descricao: 'Iluminação do Jardim',
      valor: 'R$1350,00',
      data: '21/08/2024',
      hora: '8:30',
      status: 'aprovado',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-verde-background min-h-screen py-8">
      <Typography variant="h4" className="text-black font-bold mb-6">Agenda de Serviços</Typography>

      {/* Lista de Serviços */}
      <div className="space-y-6 w-4/5">
        {['concluido', 'em-atendimento', 'aprovado'].map((status) => (
          <div key={status}>
            <Typography variant="h6" className="text-black pl-4 mb-2 capitalize">
              {status === 'concluido' ? 'Concluídos' :
                status === 'em-atendimento' ? 'Em atendimento' : 'Aprovados'}
            </Typography>
            <div className="space-y-4">
              {servicos.filter(servico => servico.status === status).map(servico => (
                <Card key={servico.id} className="rounded-lg shadow-md bg-white">
                  <CardContent className="flex items-center justify-between">
                  <div className="flex gap-4 items-end">
                      <Typography variant="body1" className="font-bold">{servico.cliente}</Typography>
                      <Typography variant="body2">{servico.telefone}</Typography>
                      <Typography variant="body2">{servico.descricao}</Typography>
                      <Typography variant="body2">{servico.valor}</Typography>
                      {servico.data && servico.hora && (
                        <>
                          <Typography variant="body2">{servico.data}</Typography>
                          <Typography variant="body2">{servico.hora}</Typography>
                        </>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {/* Ícones de Ações */}
                      {status === 'concluido' ? (
                        <IconButton><Visibility /></IconButton>
                      ) : status === 'em-atendimento' ? (
                        <>
                          <IconButton><Edit /></IconButton>
                          <IconButton color="success"><CheckCircle /></IconButton>
                          <IconButton color="error"><Cancel /></IconButton>
                        </>
                      ) : status === 'aprovado' ? (
                        <>
                          <IconButton><Edit /></IconButton>
                          <IconButton><ArrowUpward /></IconButton>
                          <IconButton color="error"><Cancel /></IconButton>
                        </>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Divider className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

