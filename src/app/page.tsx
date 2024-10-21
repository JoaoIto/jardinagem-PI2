"use client"

import Image, { StaticImageData } from "next/image"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Images to use in home page
import logo from "@/app/assets/logo.png"
import servico1 from "@/app/assets/imgs/servico1.png"
import servico2 from "@/app/assets/imgs/servico2.png"
import servico3 from "@/app/assets/imgs/servico3.png"
import servico4 from "@/app/assets/imgs/servico4.png"

const services = [
  { name: "Corte de Grama", image: servico1 },
  { name: "Poda de Plantas", image: servico2 },
  { name: "Iluminação do Jardim", image: servico3 },
  { name: "Paisagismo", image: servico4 },
]

interface CarouselProps {
  images: StaticImageData[]
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative w-full h-[500px]">
      <Image
        src={images[currentIndex]}
        alt={`Service ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <Button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-verde-normal hover:bg-verde-normalHover"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-verde-normal hover:bg-verde-normalHover"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

export default function Home() {
  const [isEmpresa, setIsEmpresa] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-verde-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-verde-claro backdrop-blur supports-[backdrop-filter]:bg-verde-claro/60">
        <div className="container flex h-14 items-center">
          <Image src={logo} alt="Logo" width={150} height={50} />
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <a className="text-sm font-medium text-black transition-colors hover:text-verde-normal" href="#quem-somos">
              Quem Somos
            </a>
            <a className="text-sm font-medium text-black transition-colors hover:text-verde-normal" href="#nossos-servicos">
              Nossos Serviços
            </a>
            <a
              className="text-sm font-medium text-verde-normal transition-colors hover:text-verde-normalHover"
              href="https://wa.me/5563984256317"
              target="_blank"
              rel="noopener noreferrer"
            >
              Whatsapp
            </a>
          </nav>
          <div className="ml-auto">
            <Button className="bg-verde-normal hover:bg-verde-normalHover active:bg-verde-normalActive text-white">
              Agende uma visita
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Conheça o nosso trabalho */}
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Conheça o nosso trabalho</h2>
          <Carousel images={[servico1, servico2, servico3, servico4]} />
        </section>

        {/* Quem Somos */}
        <section id="quem-somos" className="py-12 px-4 bg-verde-claro">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">Quem somos?</h2>
          <p className="max-w-2xl mx-auto text-center text-black">
            Lorem ipsum dolor sit amet consectetur. Ut semper diam urna in et vestibulum sit tempus
            semper. In cras rhoncus est mattis cras donec augue turpis scelerisque. Nascetur non
            condimentum velit id nisi sem. Turpis vulputate vitae pretium feugiat porttitor.
          </p>
        </section>

        {/* Nossos Serviços */}
        <section id="nossos-servicos" className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Nossos serviços</h2>
          <div className="flex justify-center space-x-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={150}
                  height={150}
                  className="rounded-full mb-2"
                />
                <p className="font-medium text-black">{service.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Agendamento */}
        <section className="py-12 px-4 bg-verde-claro">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Faça seu agendamento conosco</h2>
          <Card className="max-w-md mx-auto bg-white">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Preencha as informações:</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="empresa" 
                    checked={isEmpresa}
                    onCheckedChange={(checked) => setIsEmpresa(checked as boolean)}
                  />
                  <Label htmlFor="empresa" className="text-black">Empresa</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-black">Nome</Label>
                  <Input id="nome" placeholder="Ex: João Silva" className="bg-white text-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-black">Telefone</Label>
                  <Input id="telefone" placeholder="Ex: (63) 98425-6317" className="bg-white text-black" />
                </div>
                {isEmpresa && (
                  <div className="space-y-2">
                    <Label htmlFor="cnpj" className="text-black">CNPJ</Label>
                    <Input id="cnpj" placeholder="Ex: 12.345.678/0001-90" className="bg-white text-black" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="servico" className="text-black">Serviço</Label>
                  <Input id="servico" placeholder="Ex: Corte de Grama" className="bg-white text-black" />
                </div>
                <Button className="w-full bg-verde-normal hover:bg-verde-normalHover active:bg-verde-normalActive text-white">
                  Salvar
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0 bg-verde-claro">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <Image src={logo} alt="Logo" width={150} height={50} />
          <p className="text-center text-sm leading-loose text-black md:text-left">
            Copyright © 2024 L&L Prestadora de serviços. CNPJ nº xx.xxx.xxx/xxxx-xx
          </p>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm font-semibold text-black">Dúvidas? Entre em contato:</p>
            <a href="tel:+5563984256317" className="text-sm text-verde-normal hover:text-verde-normalHover">(63) 98425-6317</a>
            <a href="tel:+556332365984" className="text-sm text-verde-normal hover:text-verde-normalHover">(63) 3236-5984</a>
          </div>
        </div>
      </footer>
    </div>
  )
}