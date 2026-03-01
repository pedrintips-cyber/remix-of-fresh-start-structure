import { Heart } from "lucide-react";
import coverImage from "@/assets/cover-sos-uba-regina.jpg";
import FAQSection from "./FAQSection";

const CampaignContent = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Cover Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          alt="S.O.S Ubá - Ajude a Regina a recomeçar"
          className="h-auto w-full object-cover"
          src={coverImage}
        />
        <button
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 shadow-md backdrop-blur-sm transition hover:bg-card"
          aria-label="Favoritar vaquinha"
        >
          <Heart className="h-5 w-5 text-foreground transition" />
        </button>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tragédias / Desastres / Acidentes
        </span>
        <h1 className="text-2xl font-bold leading-tight text-foreground lg:text-3xl text-balance">
          S.O.S UBÁ — Ajude a Regina a Recomeçar
        </h1>
        <span className="text-xs text-muted-foreground">ID: 5777785</span>
      </div>

      {/* CTA Button */}
      <button className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition hover:opacity-90 hover:shadow-xl lg:text-lg">
        QUERO AJUDAR A REGINA
      </button>

      {/* Tabs */}
      <div className="overflow-x-auto border-b border-border" role="tablist" aria-label="Seções da campanha">
        <div className="flex gap-1">
          <button role="tab" aria-selected="true" className="whitespace-nowrap border-b-2 border-primary px-4 py-3 text-sm font-medium text-primary transition">
            Sobre
          </button>
          <button role="tab" aria-selected="false" className="whitespace-nowrap px-4 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground">
            Quem ajudou
          </button>
        </div>
      </div>

      {/* Content */}
      <div role="tabpanel" aria-label="Sobre">
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground">
          <p>
            Na madrugada do dia 24/02/2026, a cidade de <strong>Ubá, Minas Gerais</strong>, foi devastada por uma enchente brutal. Entre as milhares de vítimas, está <strong>Regina, uma mulher de 50 anos</strong> que perdeu absolutamente tudo.
          </p>
          <p>
            A força da água invadiu sua casa e levou tudo: móveis, roupas, documentos, eletrodomésticos — sua vida inteira. <strong>Regina foi arrastada pela correnteza junto com os destroços</strong>. Ela só escapou da morte porque, em um ato desesperado, conseguiu se agarrar a um poste de luz no meio da enchente.
          </p>
          <p>
            Mesmo segurando firme, <strong>ela quase morreu eletrocutada</strong>. Foi graças aos vizinhos corajosos, que arriscaram suas próprias vidas, que Regina foi resgatada com vida.
          </p>
          <p>
            Hoje, com a água baixando, <strong>Regina não tem mais nada</strong>. Não tem casa, não tem comida, não tem onde dormir. Tudo o que ela construiu ao longo de 50 anos de vida foi levado em questão de minutos.
          </p>
          <p className="text-base font-semibold">
            Por isso, ela abriu esta vaquinha: para pedir ajuda a pessoas de bom coração que possam contribuir com qualquer valor para que ela consiga <strong>recomeçar sua vida</strong>.
          </p>
          <p>
            O dinheiro arrecadado será usado para:
          </p>
          <ul className="flex flex-col gap-2 pl-2">
            {[
              "Encontrar um novo lar para morar",
              "Comprar comida e itens básicos de sobrevivência",
              "Repor móveis e eletrodomésticos essenciais",
              "Recuperar documentos perdidos",
              "Reconstruir sua vida com dignidade",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="flex-shrink-0 text-base">🙏</span>
                <span><strong>{item}</strong></span>
              </li>
            ))}
          </ul>
          <p>
            <strong>Qualquer valor ajuda.</strong> R$ 5, R$ 10, R$ 50 — não importa o quanto, o que importa é o gesto. Cada doação é um tijolo na reconstrução da vida da Regina.
          </p>
          <p className="text-base font-bold text-primary">
            Não espere. Não ignore. Doe agora e ajude a Regina a se reerguer.
          </p>
          <p className="text-lg font-bold text-foreground">A Regina precisa de você. 💚</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {["#AJUDAREGINA", "#SOSUBA", "#UBAPEDESOCORRO", "#ENCHENTE2026"].map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <button className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition hover:opacity-90 hover:shadow-xl lg:text-lg">
        Quero Ajudar a Regina
      </button>

      {/* FAQ */}
      <FAQSection />
    </div>
  );
};

export default CampaignContent;
