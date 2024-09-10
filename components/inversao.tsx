"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ViewCode from "./view-code";

// Função para inverter uma string
function invertString(str: string): string {
  let inverted = "";
  for (let i = str.length - 1; i >= 0; i--) {
    inverted += str[i];
  }
  return inverted;
}

export default function Inversao() {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  const handleInvert = useCallback(() => {
    if (inputValue.trim().length > 0) {
      const inverted = invertString(inputValue);
      setResult(inverted);
      setCountdown(5);
      setInputValue("");

      const clearResult = () => {
        setResult("");
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
  }, [inputValue]);

  return (
    <section
      id="inversao"
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
            5º Escreva um programa que inverta os caracteres de um string. Essa
            string pode ser informada através de qualquer entrada de sua
            preferência ou pode ser previamente definida no código, e deve ser
            evitado usar funções prontas {"("}por exemplo, reverse{")"}.
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
              Digite e inverta caracteres.
            </p>
            <div className="flex justify-center items-center w-full gap-2">
              <Input
                type="text"
                placeholder="Digite uma string"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={countdown > 0}
                className="rounded-xl focus:border-b-2 w-full text-center"
              />
              <Button
                className="w-full"
                onClick={handleInvert}
                disabled={countdown > 0}
              >
                {!result ? "Inverter" : countdown}
              </Button>
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
          {result ? (
            <motion.p
              variants={fadeIn("top", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-4 text-sm tracking-wide md:text-base lg:text-lg"
            >
              Invertendo temos: {result}
            </motion.p>
          ) : (
            <motion.p
              variants={fadeIn("top", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-4 animate-pulse text-sm tracking-wide md:text-base lg:text-lg"
            >
              Aguardando...
            </motion.p>
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
              codeString={`function invertString(str: string): string {
  let inverted = "";
  for (let i = str.length - 1; i >= 0; i--) {
    inverted += str[i];
  }
  return inverted;
}`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
