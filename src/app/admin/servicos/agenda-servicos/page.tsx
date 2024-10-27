"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Eye, Pencil, CheckCircle, X } from "lucide-react";
import { Typography } from "@mui/material";
import { useServicos } from "@/app/hooks/servicos/useServicos";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useRouter } from "next/navigation";
import { Servico } from "@/app/interfaces/Servico";

const statusColors = {
  aprovado: "border-blue-500",
  concluido: "border-green-500",
  "em-atendimento": "border-yellow-500",
  cancelado: "border-red-500"
};

const statusTitles = {
  aprovado: "Aprovados",
  "em-atendimento": "Em atendimento",
  concluido: "Concluídos",
  cancelado: "Cancelado"
};

export default function AgendaServicos() {
  const router = useRouter();
  const { servicos, setServicos } = useServicos();
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
  const [isVerticalLayout, setIsVerticalLayout] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConcludeModalOpen, setIsConcludeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [servicoIdToCancel, setServicoIdToCancel] = useState<string | null>(null);
  const [servicoIdToConclude, setServicoIdToConclude] = useState<string | null>(null);
  const [servicoIdToEdit, setServicoIdToEdit] = useState<string | null>(null);

  // Função para permitir o drop
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Função para iniciar o drag
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, servicoId: string) => {
    event.dataTransfer.setData("servicoId", servicoId.toString());
  };

  // Funções dos botões de ação
  const handleEdit = (servicoId: string) => {
    setServicoIdToEdit(servicoId);
    setIsEditModalOpen(true);
  };

  const handleConclude = (servicoId: string) => {
    setServicoIdToConclude(servicoId);
    setIsConcludeModalOpen(true);
  };

  const openCancelModal = (servicoId: string) => {
    setServicoIdToCancel(servicoId);
    setIsCancelModalOpen(true);
  };

  // Função para lidar com o drop
  const handleCancel = async () => {
    if (servicoIdToCancel) {
      console.log(`Cancelar serviço ${servicoIdToCancel}`);
      const updatedServicos: Servico[] = servicos.map((servico) =>
        servico.id === servicoIdToCancel ? { ...servico, status: "cancelado" as const } : servico
      );
      setServicos(updatedServicos);
  
      await fetch(`${process.env.API_ROUTE}/servicos/${servicoIdToCancel}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelado" }),
      });
  
      // Fechar o modal após cancelar
      setIsCancelModalOpen(false);
      setServicoIdToCancel(null);
    }
  };
  
  const handleConcludeService = async () => {
    if (servicoIdToConclude) {
      console.log(`Concluir serviço ${servicoIdToConclude}`);
      const updatedServicos: Servico[] = servicos.map((servico) =>
        servico.id === servicoIdToConclude ? { ...servico, status: "concluido" as const } : servico
      );
      setServicos(updatedServicos);
  
      await fetch(`${process.env.API_ROUTE}/servicos/${servicoIdToConclude}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "concluido" }),
      });
  
      // Fechar o modal após concluir
      setIsConcludeModalOpen(false);
      setServicoIdToConclude(null);
    }
  };
  
  // Função para lidar com o drop
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>, newStatus: 'concluido' | 'em-atendimento' | 'aprovado' | 'cancelado') => {
    event.preventDefault();
    const servicoId = event.dataTransfer.getData("servicoId");
    const updatedServico = servicos.find((servico) => servico.id === servicoId);
  
    if (updatedServico) {
      const updatedServicos: Servico[] = servicos.map((servico) =>
        servico.id === servicoId ? { ...servico, status: newStatus } : servico
      );
      setServicos(updatedServicos);
  
      // Atualizar o status do serviço na API
      await fetch(`${process.env.API_ROUTE}/servicos/${servicoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
    }
  };  
  
  const handleEditService = async () => {
    if (servicoIdToEdit) {
      // Encontrar o serviço a ser editado
      const servicoToEdit = servicos.find((servico) => servico.id === servicoIdToEdit);
      
      if (servicoToEdit) {
        // Armazenar no sessionStorage
        sessionStorage.setItem("servicoToEdit", JSON.stringify(servicoToEdit));
  
        // Redirecionar para a tela de edição
        router.push('editar-servicos'); // Substitua pela rota correta
  
        // Fechar o modal após editar
        setIsEditModalOpen(false);
        setServicoIdToEdit(null);
      }
    }
  };  

  const routerCadastrarServico = () =>  {
    router.push('cadastrar-servicos')
  }
  return (
    <div className="flex flex-col items-center justify-center bg-verde-background min-h-screen py-8">
      <Typography variant="h4" className="text-verde-normal font-bold mb-6">
        Agenda de Serviços
      </Typography>
 <div className="flex">
      {/* Botão para alternar entre layouts */}
      <div className="flex justify-start w-full lg:w-4/5 px-4 mb-4">
        <Button className="bg-verde-normal" onClick={() => setIsVerticalLayout(!isVerticalLayout)}>
          {isVerticalLayout ? "Mudar para Horizontal" : "Mudar para Vertical"}
        </Button>
      </div>

      {/* Botão para cadastrar novo servico */}
      <div className="flex justify-start w-full lg:w-4/5 px-4 mb-4">
        <Button className="bg-blue-600" onClick={() => routerCadastrarServico()}>
          Cadastrar serviço
        </Button>
      </div>
      </div>
      <div className={`${isVerticalLayout ? "flex flex-row" : "flex flex-col"} gap-4 w-full lg:w-4/5 px-4 overflow-auto`}>
      {Object.keys(statusTitles).map((status) => {
  // Verificação de tipo para garantir que 'status' seja um dos valores válidos
  const statusKey = status as keyof typeof statusTitles;

  // Se o status não for um dos valores válidos, podemos ignorar ou lidar de outra forma
  if (!["concluido", "em-atendimento", "aprovado", "cancelado"].includes(statusKey)) {
    return null; // Ou qualquer outra lógica que você queira aplicar
  }

  return (
    <div
      key={status}
      className={`${isVerticalLayout ? "flex flex-col min-w-[300px]" : "space-y-6 w-full"}`}
      onDrop={(e) => handleDrop(e, statusKey)}
      onDragOver={allowDrop}
      onDragEnter={() => setHoveredStatus(statusKey)}
      onDragLeave={() => setHoveredStatus(null)}
      style={{
        backgroundColor: hoveredStatus === statusKey ? "rgba(0, 0, 0, 0.1)" : "transparent",
      }}
    >
      <Typography variant="h6" className="text-black pl-4 mb-2 capitalize">
        {statusTitles[statusKey]}
      </Typography>

      <div className="space-y-4">
        {servicos
          .filter((servico) => servico.status === statusKey)
          .map((servico) => (
            <Card
              key={servico.id}
              className={`rounded-lg shadow-md bg-white text-black overflow-hidden flex ${statusColors[servico.status]}`}
              draggable
              onDragStart={(e) => handleDragStart(e, servico.id)}
            >
              <div className={`w-2 border-4 ${statusColors[servico.status]}`} />
              <CardContent className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between p-4">
                <div className="flex flex-col lg:flex-row lg:gap-4">
                  <Typography variant="body1" className="font-bold">
                    {servico.cliente}
                  </Typography>

                  <div className="hidden lg:flex gap-4 items-center">
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

                  <div className={`lg:hidden flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden`}>
                    <Typography variant="body2">{servico.descricao}</Typography>
                    <Typography variant="body2">{servico.telefone}</Typography>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 lg:mt-0">
                  {statusKey === "concluido" && (
                    <Button variant="ghost" size="icon" aria-label="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" aria-label="Editar" onClick={() => handleEdit(servico.id)}>
                    <Pencil className="h-4 w-4 text-slate-500" />
                  </Button>
                  {statusKey === "aprovado" && (
                    <Button variant="ghost" size="icon" aria-label="Concluir" onClick={() => handleConclude(servico.id)}>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" aria-label="Cancelar" onClick={() => openCancelModal(servico.id)}>
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
})}


      </div>

      {/* Modal de confirmação para cancelar */}
      <Dialog open={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)}>
        <DialogTitle>Confirmar Cancelamento</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja cancelar este serviço?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCancelModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleCancel} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmação para concluir */}
      <Dialog open={isConcludeModalOpen} onClose={() => setIsConcludeModalOpen(false)}>
        <DialogTitle>Confirmar Conclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja concluir este serviço?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConcludeModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleConcludeService} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmação para edição */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Confirmar Edição</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja editar este serviço?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditService} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
