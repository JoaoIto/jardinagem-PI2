"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import { Eye, Edit, X, CheckCircle, ArrowUpDown } from "lucide-react"
import { useServicos } from "@/app/hooks/servicos/useServicos"
import { Servico } from "@/app/interfaces/Servico"
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

export default function ServiceListTable() {
  const router = useRouter();
  const { servicos, loading, setServicos, error } = useServicos()
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConcludeModalOpen, setIsConcludeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [servicoIdToCancel, setServicoIdToCancel] = useState<string | null>(null);
  const [servicoIdToConclude, setServicoIdToConclude] = useState<string | null>(null);
  const [servicoIdToEdit, setServicoIdToEdit] = useState<string | null>(null);

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erro: {error}</div>

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedServices = [...servicos].sort((a, b) => {
    if (!(sortColumn in a) || !(sortColumn in b)) return 0;

    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (aValue === undefined || bValue === undefined) return 0;

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

    return 0;
  });

  const filteredServices = sortedServices.filter(
    (servico) =>
      servico.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servico.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        servico._id === servicoIdToCancel ? { ...servico, status: "cancelado" as const } : servico
      );
      setServicos(updatedServicos);

      await fetch(`${process.env.API_ROUTE || 'http://localhost:3000/api'}/servicos/${servicoIdToCancel}`, {
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
        servico._id === servicoIdToConclude ? { ...servico, status: "concluido" as const } : servico
      );
      setServicos(updatedServicos);

      await fetch(`${process.env.API_ROUTE || 'http://localhost:3000/api'}/servicos/${servicoIdToConclude}`, {
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

  const handleEditService = async () => {
    if (servicoIdToEdit) {
      // Encontrar o serviço a ser editado
      const servicoToEdit = servicos.find((servico) => servico._id === servicoIdToEdit);

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


  return (
    <div className="container mx-auto py-10 px-4 bg-verde-background min-h-screen">
      <Typography variant="h4" className="text-3xl font-bold mb-6 text-center text-verde-normal">Lista de Serviços</Typography>
      <div className="mb-6">
        <Input
          placeholder="Pesquisar por cliente ou descrição"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>
      <div className="rounded-lg border-2 border-verde-normal overflow-hidden shadow-lg">
        <Table>
          <TableHeader className="bg-verde-normal">
            <TableRow>
              <TableHead className="text-white cursor-pointer" onClick={() => handleSort("cliente")}>
                Cliente <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="text-white cursor-pointer" onClick={() => handleSort("descricao")}>
                Descrição <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="text-white cursor-pointer" onClick={() => handleSort("valor")}>
                Valor <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="text-white cursor-pointer" onClick={() => handleSort("status")}>
                Data <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="text-white cursor-pointer" onClick={() => handleSort("status")}>
                Status <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="text-white">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((servico) => (
              <TableRow key={servico._id} className="hover:bg-gray-100">
                <TableCell>{servico.cliente}</TableCell>
                <TableCell>{servico.descricao}</TableCell>
                <TableCell>{servico.valorTotal}</TableCell>
                <TableCell>{servico.data}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    servico.status === "concluido" ? "bg-green-200 text-green-800" :
                    servico.status === "aprovado" ? "bg-blue-200 text-blue-800" :
                    servico.status === "em-atendimento" ? "bg-yellow-200 text-yellow-800" :
                    "bg-red-200 text-red-800"
                  }`}>
                    {servico.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Visualizar">
                        <Eye className="h-4 w-4 text-verde-normal" />
                      </Button>
                    <Button variant="ghost" size="icon" aria-label="Editar" onClick={() => handleEdit(servico._id)}>
                      <Edit className="h-4 w-4 text-verde-normal" />
                    </Button>
                    {servico.status === "aprovado" && (
                      <Button variant="ghost" size="icon" aria-label="Concluir" onClick={() => handleConclude(servico._id)}>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" aria-label="Cancelar" onClick={() => openCancelModal(servico._id)}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
  )
}