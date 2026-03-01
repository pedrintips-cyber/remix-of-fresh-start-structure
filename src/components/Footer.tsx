const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <a href="#" className="flex items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" className="fill-primary" />
              <text x="16" y="22" textAnchor="middle" fill="white" fontWeight="bold" fontSize="20" fontFamily="Inter, sans-serif">V</text>
            </svg>
            <span className="text-lg font-bold text-foreground">vakinha</span>
          </a>
          <p className="max-w-md text-sm text-muted-foreground">
            A maior plataforma de vaquinhas online do Brasil. Mais de 10 anos ajudando milhares de pessoas a realizarem seus sonhos e causas.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition hover:text-foreground">Termos de uso</a>
            <a href="#" className="transition hover:text-foreground">Privacidade</a>
            <a href="#" className="transition hover:text-foreground">Ajuda</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Vakinha. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
