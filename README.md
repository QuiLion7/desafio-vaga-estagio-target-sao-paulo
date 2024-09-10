# Desafios de Estágio

Este projeto responsivo de perguntas e respostas interativas, foi desenvolvido como parte de uma seleção para vaga de estágio.

![Print versão desktop](https://github.com/QuiLion7/desafio-vaga-estagio-target-sao-paulo/blob/main/app/images/desktop.png?raw=true)
![Print versão tablet](https://github.com/QuiLion7/desafio-vaga-estagio-target-sao-paulo/blob/main/app/images/tablet.png?raw=true)
![Print versão mobile](https://github.com/QuiLion7/desafio-vaga-estagio-target-sao-paulo/blob/main/app/images/mobile.png?raw=true)

## Funcionalidades

- **Navegação dinâmica** com transições suaves entre seções.
- **Animações interativas** para tornar a experiência do usuário mais envolvente.
- **Componentes lógicos interativos** como Fibonacci, Contagem, Soma, Lógica e Interruptor.
- **Formulário de Contato** com validação e integração ao WhatsApp para envio de mensagens.

## Stack utilizada

- **Next.js** - Framework de React para desenvolvimento full-stack
- **TypeScript** - Superset de JavaScript que adiciona tipagem estática
- **TailwindCSS** - Framework de CSS para estilização rápida e responsiva
- **Framer Motion** - Biblioteca para animações suaves em React
- **React Hook Form** - Gerenciamento de formulários em React
- **Zod** - Validação de esquemas de dados em TypeScript
- **React Scroll** - Para navegação suave entre as seções da página
- **Shadcn** - Biblioteca de componentes UI acessíveis e personalizáveis

## Uso/Exemplos

```javascript
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
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

- Faça um `fork` do projeto.
- Crie uma `nova branch`.
- Faça `commit` das suas alterações.
- Faça `push` para a branch.
- Abra um `pull request`.

## Autores

- [@QuiLion7](https://www.github.com/QuiLion7)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
