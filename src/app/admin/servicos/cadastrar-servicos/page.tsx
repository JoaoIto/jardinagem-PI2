"use client";
import React, { useState } from "react";
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

export default function CadastrarServico() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const novoServico = {
      cliente,
      telefone,
      cnpj: isEmpresa ? cnpj : undefined,
      status,
      valor,
      data,
      hora,
      descricao: observacao,
    };

    const response = await fetch(`${process.env.API_ROUTE}/servicos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoServico),
    });

    if (response.ok) {
      alert("Serviço cadastrado com sucesso!");
      router.push('agenda-servicos')
    } else {
      alert("Erro ao cadastrar serviço.");
    }
  };

  return (
    <div className="py-10 px-4 bg-verde-background flex justify-center items-center self-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8 border-2 border-verde-normal">
        <Typography variant="h4" className="text-3xl font-bold mb-6 text-center text-verde-normal">Formulário de Cadastro de Serviços</Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                  placeholder="Digite o CNPJ"
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
                placeholder="Digite o nome do cliente"
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
                placeholder="Digite o telefone"
                name="telefone"
                fullWidth
                variant="outlined"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </Grid>
  
            <Grid item xs={6} md={3}>
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
  
            <Grid item xs={6} md={3}>
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
                  placeholder="Selecione o status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="em-atendimento">Em atendimento</MenuItem>
                  <MenuItem value="concluido">Concluído</MenuItem>
                  <MenuItem value="aprovado">Aprovado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12} md={6}>
              <TextField
                label="Valor total"
                placeholder="Digite o valor total"
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
                placeholder="Digite observações adicionais"
                name="observacao"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </Grid>
  
            <Grid item xs={12} className="flex justify-end mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="bg-verde-normal text-white font-semibold px-6 py-2 rounded-full hover:bg-verde-escuro transition-colors"
              >
                Agendar Serviço
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
