"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Leaf } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically handle authentication
        // For this example, we'll just redirect
        router.push("http://localhost:3000/admin/servicos/acompanhar-servicos")
    }

    return (
        <div className="min-h-screen bg-verde-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <Leaf className="h-12 w-12 text-verde-normal" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-verde-normal">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-verde-normal">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white border-verde-normal focus:border-verde-normalHover"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-verde-normal">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white border-verde-normal focus:border-verde-normalHover"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-verde-normal hover:bg-verde-normalHover active:bg-verde-normalActive text-white"
                        >
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

