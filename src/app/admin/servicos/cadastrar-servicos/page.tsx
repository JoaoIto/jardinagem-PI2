"use client";
import { useState } from "react";
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
import Sidebar from "../../../components/Sidebar";

export default function CadastrarServico() {
  const [isEmpresa, setIsEmpresa] = useState(false);

  return (
    <div className="w-full h-full bg-verde-claro min-h-screen flex">
      <Sidebar />

      <div className="flex flex-col items-center justify-center flex-1 py-8 px-4 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
          <Typography variant="h4" align="center" gutterBottom>
            Agendar Serviço
          </Typography>

          <form className="space-y-4">
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
                    <FormControlLabel
                      value="Sim"
                      control={<Radio />}
                      label="Sim"
                    />
                    <FormControlLabel
                      value="Não"
                      control={<Radio />}
                      label="Não"
                    />
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
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <TextField
                  label="Nome"
                  name="nome"
                  fullWidth
                  variant="outlined"
                  value="Maria das Dores"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Select
                    label="Status"
                    labelId="status-label"
                    name="status"
                    defaultValue=""
                  >
                    <MenuItem value="">Selecione o status</MenuItem>
                    <MenuItem value="Em andamento">Em andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Telefone"
                  name="telefone"
                  fullWidth
                  variant="outlined"
                  value="(63) 98521-0362"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Data"
                  name="data"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue="2024-11-14"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Horário"
                  name="horario"
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue="10:30"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Select
                    labelId="servico-label"
                    name="servico"
                    defaultValue=""
                  >
                    <MenuItem value="">Selecione o serviço</MenuItem>
                    <MenuItem value="Poda de árvores">Poda de árvores</MenuItem>
                    <MenuItem value="Limpeza de jardins">Limpeza de jardins</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Valor total"
                  name="valor"
                  fullWidth
                  variant="outlined"
                  value="R$ 350,00"
                  InputProps={{
                    readOnly: true,
                  }}
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
                  defaultValue="---"
                />
              </Grid>

              <Grid item xs={12} className="flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="bg-verde"
                >
                  Agendar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}
