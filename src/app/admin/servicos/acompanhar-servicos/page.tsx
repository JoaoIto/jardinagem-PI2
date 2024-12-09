'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Pencil, CheckCircle, X } from 'lucide-react';
import { Typography } from '@mui/material';
import { useServicos } from '@/app/hooks/servicos/useServicos';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Servico } from '@/app/interfaces/Servico';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const statusColors = {
  aprovado: '#3b82f6', // blue-500
  concluido: '#22c55e', // green-500
  'em-atendimento': '#eab308', // yellow-500
  cancelado: '#ef4444', // red-500
};

export default function AcompanharServicos() {
  const router = useRouter();
  const { servicos, setServicos } = useServicos();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConcludeModalOpen, setIsConcludeModalOpen] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);

  // Convert servicos to events for the calendar
  const events = useMemo(() => {
    return servicos.map((servico) => {
      const { data, hora } = servico;

      // Parse the date
      let eventDate = moment(data, 'YYYY-MM-DD').toDate();

      if (hora) {
        const [hours, minutes] = hora.split(':').map(Number);
        eventDate.setHours(hours, minutes);
      }

      return {
        _id: servico._id,
        title: `${servico.cliente} - ${servico.descricao}`,
        start: eventDate,
        end: new Date(eventDate.getTime() + 60 * 60 * 1000), // 1 hour duration
        resource: { ...servico, status: servico.status || 'em-atendimento' }, // Default status
      };
    });
  }, [servicos]);

  const handleSelectEvent = (event: { resource: Servico }) => {
    setSelectedServico(event.resource);
  };

  const handleEdit = () => {
    if (selectedServico) {
      sessionStorage.setItem('servicoToEdit', JSON.stringify(selectedServico));
      router.push('editar-servicos');
    }
  };

  const handleConclude = () => {
    setIsConcludeModalOpen(true);
  };

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (selectedServico) {
      const updatedServicos = servicos.map((servico) =>
          servico._id === selectedServico._id ? { ...servico, status: 'cancelado' as const } : servico,
      );
      setServicos(updatedServicos);
      await updateServicoStatus(selectedServico._id, 'cancelado');
      setIsCancelModalOpen(false);
      setSelectedServico(null);
    }
  };

  const confirmConclude = async () => {
    if (selectedServico) {
      const updatedServicos = servicos.map((servico) =>
          servico._id === selectedServico._id ? { ...servico, status: 'concluido' as const } : servico,
      );
      setServicos(updatedServicos);
      await updateServicoStatus(selectedServico._id, 'concluido');
      setIsConcludeModalOpen(false);
      setSelectedServico(null);
    }
  };

  const updateServicoStatus = async (id: string, status: 'cancelado' | 'concluido') => {
    await fetch(`${process.env.API_ROUTE || 'http://localhost:3001'}/servicos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
  };

  const eventStyleGetter = (event: { resource: Servico }) => {
    const style = {
      backgroundColor: statusColors[event.resource.status],
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return { style };
  };

  return (
      <div className="flex flex-col items-center justify-center bg-verde-background min-h-screen py-8">
        <Typography variant="h4" className="text-verde-normal font-bold mb-6">
          Acompanhar Serviços
        </Typography>
        <div className="w-full max-w-6xl px-4">
          <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
          />
        </div>
        {selectedServico && (
            <div className="flex justify-center w-full mt-8">
              <Card className="w-full max-w-2xl shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <CardContent className="p-6">
                  <Typography variant="h5" className="font-bold text-2xl mb-4 text-verde-normal">
                    {selectedServico.cliente}
                  </Typography>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Typography variant="body2" className="text-gray-500 font-semibold">
                        Descrição
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {selectedServico.descricao}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500 font-semibold">
                        Data e Hora
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {selectedServico.data} - {selectedServico.hora}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500 font-semibold">
                        Valor
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {selectedServico.valorTotal}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500 font-semibold">
                        Telefone
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {selectedServico.telefone}
                      </Typography>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Typography variant="body2" className="text-gray-500 font-semibold">
                      Status
                    </Typography>
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                            statusColors[selectedServico.status]
                        }`}
                    >
                  {selectedServico.status}
                </span>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    {selectedServico.status === 'aprovado' && (
                        <Button variant="outline" size="sm" onClick={handleConclude}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Concluir
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
        )}
        <Dialog open={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)}>
          <DialogTitle>Confirmar Cancelamento</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja cancelar este serviço?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCancelModalOpen(false)}>Cancelar</Button>
            <Button onClick={confirmCancel} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isConcludeModalOpen} onClose={() => setIsConcludeModalOpen(false)}>
          <DialogTitle>Confirmar Conclusão</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja concluir este serviço?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsConcludeModalOpen(false)}>Cancelar</Button>
            <Button onClick={confirmConclude} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
