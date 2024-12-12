import { useState, useEffect } from 'react'
import { Cliente } from '@/app/interfaces/Cliente'

export function useClientes() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await fetch('http://localhost:3000/api/clientes')
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data = await response.json()
                setClientes(data)
                setLoading(false)
            } catch (err) {
                setError('Erro ao carregar os clientes')
                setLoading(false)
            }
        }

        fetchClientes()
    }, [])

    return { clientes, loading, error }
}

