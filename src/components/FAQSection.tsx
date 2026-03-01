import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Quem é a Regina?",
    answer: "Regina é uma mulher de 50 anos, moradora de Ubá-MG, que perdeu tudo na enchente de fevereiro de 2026. Sua casa foi completamente levada pela água e ela quase perdeu a vida ao ser arrastada pela correnteza. Ela se salvou ao se segurar em um poste de luz, com ajuda dos vizinhos.",
  },
  {
    question: "Como a doação vai ajudar a Regina?",
    answer: "Todo o valor arrecadado será destinado para a Regina recomeçar sua vida: encontrar um novo lar, comprar comida e itens básicos, repor móveis e eletrodomésticos essenciais e recuperar seus documentos perdidos.",
  },
  {
    question: "Como faço para doar?",
    answer: "Clique no botão 'Quero Ajudar', escolha o valor que sentir no coração e finalize pelo Pix: é só ler o QR Code ou copiar e colar a chave para concluir sua doação. Qualquer valor ajuda!",
  },
  {
    question: "Qual a meta da vaquinha?",
    answer: "A meta é R$ 100.000,00 para que a Regina consiga reconstruir sua vida do zero — moradia, alimentação, móveis e tudo que a enchente levou.",
  },
  {
    question: "A vaquinha é segura?",
    answer: "Sim! O Vakinha é a maior plataforma de vaquinhas online do Brasil, com mais de 10 anos de experiência. Todas as transações são protegidas e seguras.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-foreground">Tudo o que você precisa saber sobre a Vaquinha</h2>
      <div className="flex flex-col gap-2">
        {FAQ_ITEMS.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-border bg-card">
            <button
              className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-foreground transition hover:bg-secondary/50 sm:px-5 sm:py-4"
              aria-expanded={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="pr-2">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
