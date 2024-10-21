"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Eye, Pencil, CheckCircle, X, ArrowUp } from "lucide-react";
import { Typography } from "@mui/material";
import { useServicos } from "@/app/hooks/servicos/useServicos";

const statusColors = {
  aprovado: "border-blue-500",
  concluido: "border-green-500",
  "em-atendimento": "border-yellow-500",
};

const statusTitles = {
  aprovado: "Aprovados",
  "em-atendimento": "Em atendimento",
  concluido: "Concluídos",
};

export default function AgendaServicos() {
  const { servicos } = useServicos();
  const [visible, setVisible] = useState(true); // Controla a visibilidade dos detalhes dos cards
  const [isVerticalLayout, setIsVerticalLayout] = useState(true); // Alterna entre layout vertical e horizontal

  return (
    <div className="flex flex-col items-center justify-center bg-verde-background min-h-screen py-8">
      <Typography variant="h4" className="text-black font-bold mb-6">
        Agenda de Serviços
      </Typography>

      {/* Botão para alternar entre layouts */}
      <div className="flex justify-start w-full lg:w-4/5 px-4 mb-4">
        <Button className="bg-verde-normal" onClick={() => setIsVerticalLayout(!isVerticalLayout)}>
          {isVerticalLayout ? "Mudar para Horizontal" : "Mudar para Vertical"}
        </Button>
      </div>

      {/* Renderização condicional com base no layout escolhido */}
      <div className={`${isVerticalLayout ? "flex flex-row" : "flex flex-col"} gap-4 w-full lg:w-4/5 px-4 overflow-auto`}>
        {Object.keys(statusTitles).map((status) => (
          <div key={status} className={`${isVerticalLayout ? "flex flex-col min-w-[300px]" : "space-y-6 w-full"}`}>
            <Typography variant="h6" className="text-black pl-4 mb-2 capitalize">
              {statusTitles[status as keyof typeof statusTitles]}
            </Typography>

            <div className="space-y-4">
              {servicos
                .filter((servico) => servico.status === status)
                .map((servico) => (
                  <Card
                    key={servico.id}
                    className={`rounded-lg shadow-md bg-white text-black overflow-hidden flex ${
                      statusColors[servico.status]
                    }`}
                  >
                    <div className={`w-2 border-4 ${statusColors[servico.status]}`} />
                    <CardContent className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between p-4">
                      <div className="flex flex-col lg:flex-row lg:gap-4">
                        <Typography variant="body1" className="font-bold">
                          {servico.cliente}
                        </Typography>

                        {/* Informações no desktop */}
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

                        {/* Informações no mobile com transição suave */}
                        <div
                          className={`lg:hidden flex flex-col gap-2 transition-all duration-300 ease-in-out ${
                            visible ? "opacity-100 max-h-[100px]" : "opacity-0 max-h-0"
                          } overflow-hidden`}
                        >
                          <Typography variant="body2">{servico.descricao}</Typography>
                          <Typography variant="body2">{servico.telefone}</Typography>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4 lg:mt-0">
                        {status === "concluido" && (
                          <Button variant="ghost" size="icon" aria-label="Visualizar">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {(status === "em-atendimento" || status === "aprovado") && (
                          <>
                            <Button variant="ghost" size="icon" aria-label="Editar">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            {status === "em-atendimento" ? (
                              <Button variant="ghost" size="icon" aria-label="Concluir">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" aria-label="Mover para cima">
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" aria-label="Cancelar">
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                        {/* Toggle para mostrar/ocultar gradualmente */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setVisible(!visible)}
                          aria-label={visible ? "Ocultar" : "Mostrar"}
                        >
                          {visible ? "Esconder" : "Mostrar"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
