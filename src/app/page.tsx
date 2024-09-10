import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-verde-claro space-y-8 ">
      {/* Primeiro Card */}
      <Card className="bg-white flex flex-col items-center text-center p-4 shadow-lg border-2 border-verde-normal">
        <div className="m-6">
          <Image src={logo} alt="Logo" width={250} height={150} />
        </div>
        <CardContent>
          <div className="m-4">
          <Typography variant="h5" className="mb-4 text-black">
            Deseja se cadastrar na plataforma?
          </Typography>
          <div className="flex justify-center space-x-4">
            <Button
              variant="contained"
              color="primary"
              className="bg-verde-escuro"
            >
              Cadastrar-se
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-verde-normal hover:bg-verde-normalHover active:bg-verde-normalActive"
            >
              Login
            </Button>
          </div>
          </div>
          <div className="flex flex-col justify-center space-x-4">
            <Typography variant="h5" className="mb-4 text-black">
              Deseja solicitar serviço?
            </Typography>

            <Button
              variant="contained"
              color="primary"
              className="bg-verde-normal hover:bg-verde-normalHover active:bg-verde-normalActive"
            >
              Solicitar Serviço
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
