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
import { Eye, Edit, ArrowUpDown } from 'lucide-react'
import { useClientes } from "@/app/hooks/clientes/useClientes"
import { Typography } from "@mui/material"

export default function ClientListTable() {
    const { clientes, loading, error } = useClientes()
    const [sortColumn, setSortColumn] = useState("")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [searchTerm, setSearchTerm] = useState("")

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

    const sortedClientes = [...clientes].sort((a, b) => {
        if (!(sortColumn in a) || !(sortColumn in b)) return 0;

        const aValue = a[sortColumn as keyof typeof a];
        const bValue = b[sortColumn as keyof typeof b];

        if (aValue === undefined || bValue === undefined) return 0;

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

        return 0;
    });

    const filteredClientes = sortedClientes.filter(
        (cliente) =>
            cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto py-10 px-4 bg-green-50 min-h-screen">
            <Typography variant="h4" className="text-3xl font-bold mb-6 text-center text-green-700">Lista de Clientes</Typography>
            <div className="mb-6">
                <Input
                    placeholder="Pesquisar por nome ou email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md mx-auto"
                />
            </div>
            <div className="rounded-lg border-2 border-green-600 overflow-hidden shadow-lg">
                <Table>
                    <TableHeader className="bg-green-600">
                        <TableRow>
                            <TableHead className="text-white cursor-pointer" onClick={() => handleSort("nome")}>
                                Nome <ArrowUpDown className="inline h-4 w-4 ml-1" />
                            </TableHead>
                            <TableHead className="text-white cursor-pointer" onClick={() => handleSort("cpf")}>
                                CPF <ArrowUpDown className="inline h-4 w-4 ml-1" />
                            </TableHead>
                            <TableHead className="text-white cursor-pointer" onClick={() => handleSort("telefone")}>
                                Telefone <ArrowUpDown className="inline h-4 w-4 ml-1" />
                            </TableHead>
                            <TableHead className="text-white cursor-pointer" onClick={() => handleSort("email")}>
                                Email <ArrowUpDown className="inline h-4 w-4 ml-1" />
                            </TableHead>
                            <TableHead className="text-white cursor-pointer" onClick={() => handleSort("endereco")}>
                                Endereço <ArrowUpDown className="inline h-4 w-4 ml-1" />
                            </TableHead>
                            <TableHead className="text-white">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClientes.map((cliente) => (
                            <TableRow key={cliente._id} className="hover:bg-green-100">
                                <TableCell>{cliente.nome}</TableCell>
                                <TableCell>{cliente.cpf}</TableCell>
                                <TableCell>{cliente.telefone}</TableCell>
                                <TableCell>{cliente.email}</TableCell>
                                <TableCell>{cliente.endereco}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="icon" aria-label="Visualizar">
                                            <Eye className="h-4 w-4 text-green-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" aria-label="Editar">
                                            <Edit className="h-4 w-4 text-green-600" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

