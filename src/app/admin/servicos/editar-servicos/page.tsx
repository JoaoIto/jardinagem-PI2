"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function EditarServico() {
  const router = useRouter();
  const [isEmpresa, setIsEmpresa] = useState(false);
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("em-atendimento");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [observacao, setObservacao] = useState("");
  const [servicoId, setServicoId] = useState<string | null>(null); // Novo estado para armazenar o ID do serviço

  useEffect(() => {
    const servicoToEdit = sessionStorage.getItem("servicoToEdit");
    if (servicoToEdit) {
      const parsedServico = JSON.parse(servicoToEdit);
      setServicoId(parsedServico.id); // Armazena o ID do serviço
      setCliente(parsedServico.cliente);
      setTelefone(parsedServico.telefone);
      setCnpj(parsedServico.cnpj || "");
      setStatus(parsedServico.status);
      setValor(parsedServico.valor);
      setData(parsedServico.data || "");
      setHora(parsedServico.hora || "");
      setObservacao(parsedServico.descricao || "");
      setIsEmpresa(!!parsedServico.cnpj);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedServico = {
      cliente,
      telefone,
      cnpj: isEmpresa ? cnpj : undefined,
      status,
      valor,
      data,
      hora,
      descricao: observacao,
    };

    // Usa o ID do serviço na URL
    const response = await fetch(`http://localhost:3001/servicos/${servicoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedServico),
    });

    if (response.ok) {
      alert("Serviço atualizado com sucesso!");
      router.push("agenda-servicos")
    } else {
      alert("Erro ao atualizar serviço.");
    }
  };

  return (
    <div className="w-full h-full bg-verde-claro min-h-screen flex">
      <div className="flex flex-col items-center justify-center flex-1 py-8 px-4 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
          <Typography variant="h4" align="center" gutterBottom>
            Editar Serviço
          </Typography>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Empresa?</FormLabel>
                  <RadioGroup
                    row
                    name="empresa"
                    value={isEmpresa ? "Sim" : "Não"}
                    onChange={(e) => setIsEmpresa(e.target.value === "Sim")}
                  >
                    <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                    <FormControlLabel value="Não" control={<Radio />} label="Não" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {isEmpresa && (
                <Grid item xs={12}>
                  <TextField
                    label="CNPJ"
                    name="cnpj"
                    fullWidth
                    variant="outlined"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <TextField
                  label="Nome"
                  name="cliente"
                  fullWidth
                  variant="outlined"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Telefone"
                  name="telefone"
                  fullWidth
                  variant="outlined"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Data"
                  name="data"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Horário"
                  name="hora"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "concluido" | "em-atendimento" | "aprovado")}
                  >
                    <MenuItem value="em-atendimento">Em andamento</MenuItem>
                    <MenuItem value="concluido">Concluído</MenuItem>
                    <MenuItem value="aprovado">Aprovado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Valor total"
                  name="valor"
                  fullWidth
                  variant="outlined"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Observação"
                  name="observacao"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} className="flex justify-end">
                <Button type="submit" variant="contained" color="primary" className="bg-verde">
                  Atualizar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}
