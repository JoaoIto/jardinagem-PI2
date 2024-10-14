import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8  bg-verde-background">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between py-4 px-8 shadow-md">
        <Image src={logo} alt="Logo" width={150} height={50} />
        <nav className="flex space-x-4">
          <a
            href="#"
            className="relative font-bold text-gray-700 hover:text-green-700 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-green-700 before:transition-all before:duration-300 hover:before:w-full"
          >
            Quem Somos
          </a>
          <a
            href="#"
            className="relative font-bold text-gray-700 hover:text-green-700 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-green-700 before:transition-all before:duration-300 hover:before:w-full"
          >
            Nossos Serviços
          </a>
          <a
            href="https://wa.me/5563984256317"
            target="_blank"
            className="relative font-bold text-green-600 font-bold hover:underline before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-green-700 before:transition-all before:duration-300 hover:before:w-full"
          >
            Whatsapp
          </a>
          <Button
            variant="outlined"
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          >
            Agende uma visita
          </Button>
        </nav>
      </header>

      {/* Conheça o nosso trabalho */}
      <section className="text-center py-12">
        <Typography variant="h4" className="font-bold text-gray-700">
          Conheça o nosso trabalho
        </Typography>
        <div className="flex justify-center mt-8 space-x-6">
          <Image
            src="/image1.jpg"
            alt="Trabalho 1"
            width={200}
            height={150}
            className="rounded-lg"
          />
          <Image
            src="/image2.jpg"
            alt="Trabalho 2"
            width={200}
            height={150}
            className="rounded-lg"
          />
          <Image
            src="/image3.jpg"
            alt="Trabalho 3"
            width={200}
            height={150}
            className="rounded-lg"
          />
          <Image
            src="/image4.jpg"
            alt="Trabalho 4"
            width={200}
            height={150}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Quem Somos */}
      <section className="bg-gray-100 py-12">
        <Typography
          variant="h5"
          className="text-center font-bold text-gray-700"
        >
          Quem somos?
        </Typography>
        <div className="max-w-4xl mx-auto mt-6 text-center text-gray-600 px-4">
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur. Ut semper diam urna in et
            vestibulum sit tempus semper. In cras rhoncus est mattis cras donec
            augue turpis scelerisque.
          </Typography>
        </div>
      </section>

      {/* Nossos Serviços */}
      <section className="py-12">
        <Typography
          variant="h5"
          className="text-center font-bold text-gray-700"
        >
          Nossos serviços
        </Typography>
        <div className="flex justify-center mt-8 space-x-6">
          <Card className="w-48">
            <Image
              src="/service1.jpg"
              alt="Corte de Grama"
              width={192}
              height={192}
              className="rounded-full"
            />
            <CardContent>
              <Typography variant="h6" className="text-center">
                Corte de Grama
              </Typography>
            </CardContent>
          </Card>
          <Card className="w-48">
            <Image
              src="/service2.jpg"
              alt="Poda de Plantas"
              width={192}
              height={192}
              className="rounded-full"
            />
            <CardContent>
              <Typography variant="h6" className="text-center">
                Poda de Plantas
              </Typography>
            </CardContent>
          </Card>
          <Card className="w-48">
            <Image
              src="/service3.jpg"
              alt="Iluminação do Jardim"
              width={192}
              height={192}
              className="rounded-full"
            />
            <CardContent>
              <Typography variant="h6" className="text-center">
                Iluminação do Jardim
              </Typography>
            </CardContent>
          </Card>
          <Card className="w-48">
            <Image
              src="/service4.jpg"
              alt="Paisagismo"
              width={192}
              height={192}
              className="rounded-full"
            />
            <CardContent>
              <Typography variant="h6" className="text-center">
                Paisagismo
              </Typography>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Agendamento */}
      <section className="bg-green-100 py-12">
        <Typography
          variant="h5"
          className="text-center font-bold text-gray-700"
        >
          Faça seu agendamento conosco
        </Typography>
        <div className="max-w-md mx-auto mt-8 bg-green-200 p-8 rounded-lg shadow-md">
          <FormControlLabel
            control={<Checkbox name="empresa" />}
            label="Empresa"
          />
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Telefone"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Serviço"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            className="mt-4"
          >
            Salvar
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto flex justify-between px-4">
          <div>
            <Typography variant="body2" className="font-bold">
              Copyright © 2024 L&L Prestadora de serviços.
            </Typography>
            <Typography variant="body2">CNPJ nº xx.xxx.xxx/xxxx-xx</Typography>
          </div>
          <div className="flex flex-col items-end">
            <Typography variant="body2" className="font-bold">
              Dúvidas? Entre em contato:
            </Typography>
            <Typography variant="body2">
              <a href="tel:+5563984256317">(63) 98425-6317</a>
            </Typography>
            <Typography variant="body2">
              <a href="tel:+556332365984">(63) 3236-5984</a>
            </Typography>
          </div>
        </div>
      </footer>
    </div>
  );
}
