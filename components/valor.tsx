"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import ViewCode from "./view-code";

// Tipagem para os dados de faturamento por estado
type EstadoFaturamento = {
  nome: string;
  valor: number;
};

// Dados de faturamento mensal por estado
const estadosFaturamento: EstadoFaturamento[] = [
  { nome: "SP", valor: 67836.43 },
  { nome: "RJ", valor: 36678.66 },
  { nome: "MG", valor: 29229.88 },
  { nome: "ES", valor: 27165.48 },
  { nome: "Outros", valor: 19849.53 },
];

// Função para calcular os percentuais
function calculatePercentuais(estados: EstadoFaturamento[]): {
  nome: string;
  percentual: string;
}[] {
  const total = estados.reduce((sum, estado) => sum + estado.valor, 0);

  return estados.map((estado) => ({
    nome: estado.nome,
    percentual: `${((estado.valor / total) * 100).toFixed(2)}%`,
  }));
}

export default function Valor() {
  const [result, setResult] = useState<{ nome: string; percentual: string }[]>(
    []
  );
  const [countdown, setCountdown] = useState<number>(0);

  const handleCalculate = useCallback(() => {
    if (result.length === 0) {
      const calculados = calculatePercentuais(estadosFaturamento);
      setResult(calculados);
      setCountdown(5);

      const clearResult = () => {
        setResult([]);
      };

      const updateCountdown = () => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(updateInterval);
            clearResult();
          }
          return prev - 1;
        });
      };

      const updateInterval = setInterval(updateCountdown, 1000);
      return () => clearInterval(updateInterval);
    }
  }, [result]);

  return (
    <section
      id="valor"
      className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4 md:px-6 md:py-0 pt-[55px] sm:pt-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row gap-6">
        <div className="flex h-auto w-full flex-1 flex-col items-center justify-center text-justify gap-2">
          <motion.h3
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="text-sm tracking-wide md:text-base lg:text-lg"
          >
            4º Dado o valor de faturamento mensal de uma distribuidora,
            detalhado por estado {"("}SP – R$67.836,43; RJ – R$36.678,66; MG –
            R$29.229,88; ES – R$27.165,48; Outros – R$19.849,53{")"}. Escreva um
            programa que calcule o percentual de representação que cada estado
            teve dentro do valor total mensal da distribuidora.
          </motion.h3>
          <motion.div
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full"
          >
            <Separator className="bg-primary" />
          </motion.div>
          <motion.div
            variants={fadeIn("bottom", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center items-center flex-col gap-4 w-full"
          >
            <p className="flex-1 w-full text-sm tracking-wide md:text-base lg:text-lg">
              Os dados de faturamento mensal por estado estão pré-carregados.
              Clique em Calcular para ver os percentuais.
            </p>
            <Button onClick={handleCalculate} className="w-full">
              {!result.length ? "Calcular" : countdown}
            </Button>
          </motion.div>
          <motion.div
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full"
          >
            <Separator className="bg-primary" />
          </motion.div>
          {result.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 mt-4">
              {result.map((item) => (
                <li key={item.nome}>
                  {item.nome}: {item.percentual}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 animate-pulse text-sm tracking-wide md:text-base lg:text-lg">
              Aguardando...
            </p>
          )}
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-2 md:flex-row">
          <motion.section
            variants={fadeIn("bottom", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex h-full w-full items-center justify-center"
          >
            <ViewCode
              codeString={`const calculatePercentuais = (estados: EstadoFaturamento[]): {
  nome: string;
  percentual: string;
}[] => {
  const total = estados.reduce((sum, estado) => sum + estado.valor, 0);
  
  return estados.map(estado => ({
    nome: estado.nome,
    percentual: \`\${((estado.valor / total) * 100).toFixed(2)}%\`
  }));
};`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
