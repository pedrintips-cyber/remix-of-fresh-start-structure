import { Heart, Share2, Shield, Clock } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const PRESET_VALUES = [10, 25, 50, 75, 100, 150, 200, 400];

const DonationSidebar = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [customValue, setCustomValue] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handlePreset = (value: number) => {
    setSelectedValue(value);
    setCustomValue("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const capped = raw ? Math.min(parseInt(raw), 400).toString() : "";
    setCustomValue(capped);
    setSelectedValue(null);
  };

  const currentValue = selectedValue || (customValue ? parseInt(customValue) : 0);
  const canDonate = currentValue >= 10;

  return (
    <aside className="w-full lg:w-[370px] lg:flex-shrink-0">
      <div className="lg:sticky lg:top-20">
        <div className="flex flex-col gap-5">
          {/* Progress Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Arrecadado</span>
                <span className="text-3xl font-bold text-primary">R$ 0,00</span>
                <span className="text-sm text-muted-foreground">de R$ 100.000,00</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary animate-progress-fill"
                  style={{ "--progress-width": "0%" } as React.CSSProperties}
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progresso da arrecadação"
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                  <span className="text-sm text-foreground">
                    <strong>0</strong>{" "}
                    <span className="text-muted-foreground">Corações</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">
                    <strong>0</strong>{" "}
                    <span className="text-muted-foreground">Apoiadores</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-foreground">Escolha o valor da sua doação</h3>
                <p className="text-xs text-muted-foreground">Mínimo: R$ 10,00 · Máximo: R$ 400,00</p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_VALUES.map((value) => (
                  <button
                    key={value}
                    onClick={() => handlePreset(value)}
                    className={`rounded-lg border-2 px-1 py-2.5 text-sm font-bold transition ${
                      selectedValue === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    R${value}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Outro valor"
                  value={customValue}
                  onChange={handleCustomChange}
                  className="w-full rounded-lg border-2 border-border bg-card py-3 pl-10 pr-4 text-sm font-medium text-foreground transition focus:border-primary focus:outline-none"
                />
              </div>
              <button
                disabled={!canDonate}
                onClick={() => setCheckoutOpen(true)}
                className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Quero Ajudar
              </button>
            </div>
          </div>

          {/* Share Button */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-bold text-accent-foreground shadow-md transition hover:opacity-90 hover:shadow-lg">
            <Share2 className="h-5 w-5" aria-hidden="true" />
            Compartilhar
          </button>

          {/* Trust Badges */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Pagamento 100% seguro</p>
                <p className="text-xs text-muted-foreground">Seus dados estão protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Repasse em até 2 dias</p>
                <p className="text-xs text-muted-foreground">Via Pix ou transferência bancária</p>
              </div>
            </div>
          </div>

          {/* Creator */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organizador</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                R
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Regina</p>
                <p className="text-xs text-muted-foreground">Ubá, Minas Gerais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        donationValue={currentValue}
      />
    </aside>
  );
};

export default DonationSidebar;
