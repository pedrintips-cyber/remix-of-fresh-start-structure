import { Heart, Search, User, Menu, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-1.5" aria-label="Vakinha">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" className="fill-primary" />
            <text x="16" y="22" textAnchor="middle" fill="white" fontWeight="bold" fontSize="20" fontFamily="Inter, sans-serif">V</text>
          </svg>
          <span className="text-xl font-bold text-foreground">vakinha</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {["Como ajudar", "Descubra", "Como funciona"].map((item) => (
            <button key={item} className="flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-primary">
              {item}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="flex items-center gap-1 rounded-full p-2 text-muted-foreground transition hover:bg-secondary" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground transition hover:bg-secondary" aria-label="Minha conta">
            <User className="h-5 w-5" />
            <span>Minha conta</span>
          </button>
          <a href="#" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">
            Criar vaquinha
          </a>
        </div>

        <button
          className="flex items-center rounded-lg p-2 text-foreground lg:hidden"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {["Como ajudar", "Descubra", "Como funciona"].map((item) => (
              <button key={item} className="text-left text-sm font-medium text-foreground transition hover:text-primary">
                {item}
              </button>
            ))}
            <hr className="border-border" />
            <button className="text-left text-sm font-medium text-foreground">Minha conta</button>
            <a href="#" className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-bold text-primary-foreground">
              Criar vaquinha
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
