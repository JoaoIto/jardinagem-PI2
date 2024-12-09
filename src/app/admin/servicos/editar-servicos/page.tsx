'use client'

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Checkbox } from "@/app/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { toast } from "@/app/components/ui/use-toast"
import { Grid, Typography } from "@mui/material"

const formSchema = z.object({
  isEmpresa: z.boolean().default(false),
  cnpj: z.string().optional().refine(
    (val) => !val || /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(val),
    { message: "CNPJ inválido" }
  ),
  cliente: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  telefone: z.string().regex(/^$$\d{2}$$ \d{5}-\d{4}$/, { message: "Telefone inválido" }),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data inválida" }),
  hora: z.string().regex(/^\d{2}:\d{2}$/, { message: "Hora inválida" }),
  status: z.enum(["em-atendimento", "concluido", "aprovado"]),
  valor: z.string().refine((val) => !isNaN(parseFloat(val)), { message: "Valor inválido" }),
  observacao: z.string().max(500, { message: "Observação deve ter no máximo 500 caracteres" }),
})

type FormValues = z.infer<typeof formSchema>

export default function EditarServico() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isEmpresa: false,
      cnpj: "",
      cliente: "",
      telefone: "",
      data: "",
      hora: "",
      status: "em-atendimento",
      valor: "",
      observacao: "",
    },
  })

  React.useEffect(() => {
    const servicoToEdit = sessionStorage.getItem("servicoToEdit")
    if (servicoToEdit) {
      const parsedServico = JSON.parse(servicoToEdit)
      form.reset({
        isEmpresa: !!parsedServico.cnpj,
        cnpj: parsedServico.cnpj || "",
        cliente: parsedServico.cliente,
        telefone: parsedServico.telefone,
        data: parsedServico.data || "",
        hora: parsedServico.hora || "",
        status: parsedServico.status,
        valor: parsedServico.valor,
        observacao: parsedServico.descricao || "",
      })
    }
  }, [form])

  async function onSubmit(data: FormValues) {
    try {
      const servicoToEdit = sessionStorage.getItem("servicoToEdit")
      if (!servicoToEdit) throw new Error("Nenhum serviço para editar")
      
      const { id } = JSON.parse(servicoToEdit)
      const response = await fetch(`${process.env.API_ROUTE || 'http://localhost:3000/api'}/servicos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          cnpj: data.isEmpresa ? data.cnpj : undefined,
          descricao: data.observacao,
        }),
      })

      if (!response.ok) throw new Error("Falha ao atualizar serviço")

      toast({
        title: "Serviço atualizado",
        description: "O serviço foi atualizado com sucesso.",
      })
      router.push("agenda-servicos")
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o serviço.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
        <Typography variant="h4" className="text-3xl font-bold mb-6 text-center text-verde-normal">Editar Serviço</Typography>
        </CardHeader>
        <CardContent className="bg-white shadow-lg rounded-lg p-8 border-2 border-verde-normal">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="isEmpresa"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Empresa</FormLabel>
                      <FormDescription>
                        Marque se o cliente é uma empresa
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch("isEmpresa") && (
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input placeholder="00.000.000/0000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="cliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hora"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="em-atendimento">Em atendimento</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                          <SelectItem value="aprovado">Aprovado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="R$ 0,00"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '')
                            const formattedValue = new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 2,
                            }).format(Number(value) / 100)
                            field.onChange(formattedValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="observacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observação</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite aqui qualquer observação relevante"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Grid item xs={12} className="flex justify-end mt-4">
              <Button
                type="submit"
                color="primary"
                className="bg-verde-normal text-white font-semibold px-6 py-2 rounded-full hover:bg-verde-escuro transition-colors"
              >
                Agendar Serviço
              </Button>
            </Grid>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}