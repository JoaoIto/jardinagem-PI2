"use client"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Scissors, TreesIcon as Tree, Sun, Flower2 } from 'lucide-react'

const services = [
  { name: "Corte de Grama", icon: Scissors },
  { name: "Poda de Plantas", icon: Tree },
  { name: "Iluminação do Jardim", icon: Sun },
  { name: "Paisagismo", icon: Flower2 },
]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
  }
  const IconComponent = services[currentIndex]?.icon;
  return (
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-verde-claro rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {IconComponent && <IconComponent size={120} className="text-verde-normal" />}
        </div>
        <h3 className="absolute bottom-4 left-0 right-0 text-center text-2xl font-bold text-black">
          {services[currentIndex].name}
        </h3>
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
          <div className="container mx-auto px-4 flex h-14 items-center justify-between">
            <div className="text-2xl font-bold text-verde-normal">L&L Serviços</div>
            <nav className="hidden md:flex items-center gap-4">
              <a className="text-sm font-medium text-black transition-colors hover:text-verde-normal" href="#quem-somos">
                Sobre
              </a>
              <a className="text-sm font-medium text-black transition-colors hover:text-verde-normal" href="#nossos-servicos">
                Serviços
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
            <div>
              <a
                  href="https://wa.me/5563984256317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-verde-normal hover:bg-verde-normalHover active:bg-verde-normalActive text-white px-4 py-2 rounded"
              >
                AGENDAR
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Conheça o nosso trabalho */}
          <section className="py-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">Conheça o nosso trabalho</h2>
            <Carousel />
          </section>

          {/* Quem Somos */}
          <section id="quem-somos" className="py-12 px-4 bg-verde-claro">
            <h2 className="text-3xl font-bold text-center mb-4 text-black">Quem somos?</h2>
            <p className="max-w-2xl mx-auto text-center text-black">
              Somos especialistas em transformar espaços verdes em verdadeiros oásis. Com anos de experiência em jardinagem e paisagismo, nossa equipe dedicada trabalha para criar e manter jardins deslumbrantes que elevam a beleza de qualquer ambiente.
            </p>
          </section>

          {/* Nossos Serviços */}
          <section id="nossos-servicos" className="py-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">Nossos serviços</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {services.map((service, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-verde-claro rounded-full p-4 inline-block mb-2">
                      {service.icon && <service.icon size={40} className="text-verde-normal" />}
                    </div>
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
        <footer className="border-t py-6 bg-verde-claro">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-bold text-verde-normal">L&L Serviços</div>
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

