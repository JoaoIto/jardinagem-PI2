"use client";
import { Servico } from "@/app/interfaces/Servico";
import { useEffect, useState } from "react";

export const useServicos = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch(`${process.env.API_ROUTE || 'http://localhost:3000/api'}/servicos`);
        if (!response.ok) {
          throw new Error('Erro ao buscar serviços');
        }
        const data: Servico[] = await response.json();
        setServicos(data);
      } catch (err: unknown) {
        // Verificando se o erro é uma instância de Error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  return { servicos, setServicos, loading, error };
};
