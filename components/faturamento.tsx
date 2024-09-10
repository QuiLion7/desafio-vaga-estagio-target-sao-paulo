"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import ViewCode from "./view-code";
import Link from "next/link";

type FaturamentoData = {
  dia: number;
  faturamento: number;
}[];

const faturamentoData: FaturamentoData = [
  { dia: 1, faturamento: 1000 },
  { dia: 2, faturamento: 2000 },
  { dia: 3, faturamento: 0 },
  { dia: 4, faturamento: 1500 },
  { dia: 5, faturamento: 1800 },
  { dia: 6, faturamento: 0 },
  { dia: 7, faturamento: 0 },
  { dia: 8, faturamento: 2500 },
  { dia: 9, faturamento: 3000 },
  { dia: 10, faturamento: 0 },
  { dia: 11, faturamento: 1700 },
  { dia: 12, faturamento: 1600 },
  { dia: 13, faturamento: 0 },
  { dia: 14, faturamento: 0 },
  { dia: 15, faturamento: 1900 },
  { dia: 16, faturamento: 2200 },
  { dia: 17, faturamento: 0 },
  { dia: 18, faturamento: 2100 },
  { dia: 19, faturamento: 2300 },
  { dia: 20, faturamento: 0 },
  { dia: 21, faturamento: 0 },
  { dia: 22, faturamento: 2400 },
  { dia: 23, faturamento: 2600 },
  { dia: 24, faturamento: 0 },
  { dia: 25, faturamento: 1700 },
  { dia: 26, faturamento: 2000 },
  { dia: 27, faturamento: 0 },
  { dia: 28, faturamento: 0 },
  { dia: 29, faturamento: 3000 },
  { dia: 30, faturamento: 3200 },
  { dia: 31, faturamento: 0 },
];

function calculateFaturamento(data: FaturamentoData): {
  menorValor: string;
  maiorValor: string;
  diasAcimaMedia: string;
} {
  const valoresValidos = data.filter((item) => item.faturamento > 0);

  const somaValores = valoresValidos.reduce(
    (acc, curr) => acc + curr.faturamento,
    0
  );
  const mediaMensal = somaValores / valoresValidos.length;

  const menorValor = Math.min(
    ...valoresValidos.map((item) => item.faturamento)
  );
  const maiorValor = Math.max(
    ...valoresValidos.map((item) => item.faturamento)
  );

  const diasAcimaMedia = valoresValidos.filter(
    (item) => item.faturamento > mediaMensal
  ).length;

  return {
    menorValor: `R$ ${menorValor.toFixed(2)}`,
    maiorValor: `R$ ${maiorValor.toFixed(2)}`,
    diasAcimaMedia: `${diasAcimaMedia} dia${diasAcimaMedia > 1 ? "s" : ""}`,
  };
}

export default function Faturamento() {
  const [result, setResult] = useState<{
    menorValor: string;
    maiorValor: string;
    diasAcimaMedia: string;
  }>({
    menorValor: "",
    maiorValor: "",
    diasAcimaMedia: "",
  });

  const [countdown, setCountdown] = useState<number>(0);

  const handleCalculate = useCallback(() => {
    if (!result.menorValor) {
      const { menorValor, maiorValor, diasAcimaMedia } =
        calculateFaturamento(faturamentoData);
      setResult({ menorValor, maiorValor, diasAcimaMedia });
      setCountdown(5);

      const clearResult = () => {
        setResult({
          menorValor: "",
          maiorValor: "",
          diasAcimaMedia: "",
        });
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
      id="faturamento"
      className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4 md:px-6 md:py-0 pt-[55px] sm:pt-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row gap-6">
        <div className="flex h-auto w-full flex-1 flex-col items-center justify-center text-justify gap-2 order-1 sm:order-2">
          <motion.h3
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="text-sm tracking-wide md:text-base lg:text-lg"
          >
            3º Dado um vetor que guarda o valor de faturamento diário de uma
            distribuidora, faça um programa, na linguagem que desejar, que
            calcule e retorne: <br />• O menor valor de faturamento ocorrido em
            um dia do mês; • O maior valor de faturamento ocorrido em um dia do
            mês; <br />• Número de dias no mês em que o valor de faturamento
            diário foi superior à média mensal.
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
              Os dados de faturamento mensal estão pré-carregados. Clique em
              Calcular para ver os resultados.
            </p>
            <div className="w-full text-sm tracking-wide md:text-base lg:text-lg flex justify-center items-center gap-2">
              <Button
                onClick={handleCalculate}
                className="w-full"
                disabled={countdown > 0}
              >
                {!result.menorValor ? "Calcular" : countdown}
              </Button>
              <Link
                href="https://github.com/QuiLion7/desafio-vaga-estagio-target-sao-paulo/blob/main/components/faturamento.tsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full">Ver json</Button>
              </Link>
            </div>
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
          {result.menorValor ? (
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Menor valor de faturamento: {result.menorValor}</li>
              <li>Maior valor de faturamento: {result.maiorValor}</li>
              <li>
                Número de dias acima da média mensal: {result.diasAcimaMedia}
              </li>
            </ul>
          ) : (
            <p className="mt-4 animate-pulse text-sm tracking-wide md:text-base lg:text-lg">
              Aguardando...
            </p>
          )}
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-2 md:flex-row order-2 sm:order-1">
          <motion.section
            variants={fadeIn("bottom", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex h-full w-full items-center justify-center"
          >
            <ViewCode
              codeString={`const [result, setResult] = useState<{
    menorValor: string;
    maiorValor: string;
    diasAcimaMedia: string;
  }>({
    menorValor: "",
    maiorValor: "",
    diasAcimaMedia: "",
  });
  
  const handleCalculate = useCallback(() => {
    if (!result.menorValor) {
      const { menorValor, maiorValor, diasAcimaMedia } =
        calculateFaturamento(faturamentoData);
      setResult({ menorValor, maiorValor, diasAcimaMedia });
      setCountdown(5);
    }
  }, [result]);`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
