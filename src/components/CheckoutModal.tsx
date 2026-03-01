import { useState } from "react";
import { X, ArrowLeft, Copy, Check, Shield, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";

type Step = "info" | "pix" | "success";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  donationValue: number;
}

const CheckoutModal = ({ open, onClose, donationValue }: CheckoutModalProps) => {
  const [step, setStep] = useState<Step>("info");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // PIX response data
  const [pixCode, setPixCode] = useState("");
  const [pixQrBase64, setPixQrBase64] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const formattedValue = donationValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-pix-payment", {
        body: {
          amount: donationValue * 100, // Convert to centavos
          name: anonymous ? "Doador Anônimo" : name,
          email,
          document: document.replace(/\D/g, ""),
          phone: phone.replace(/\D/g, ""),
        },
      });

      if (fnError) throw new Error(fnError.message);
      if (!data?.success) throw new Error(data?.error || "Erro ao processar pagamento");

      setPixCode(data.qr_code || "");
      setPixQrBase64(data.qr_code_base64 || "");
      setExpiresAt(data.expires_at || "");
      setStep("pix");
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Erro ao processar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = () => {
    setStep("success");
  };

  const handleClose = () => {
    setStep("info");
    setName("");
    setEmail("");
    setDocument("");
    setPhone("");
    setAnonymous(false);
    setCopied(false);
    setError("");
    setPixCode("");
    setPixQrBase64("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative z-10 mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card px-5 py-4">
          <div className="flex items-center gap-3">
            {step === "pix" && (
              <button
                onClick={() => setStep("info")}
                className="rounded-full p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-lg font-bold text-foreground">
              {step === "info" && "Finalizar doação"}
              {step === "pix" && "Pagamento via Pix"}
              {step === "success" && "Obrigado! 💚"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          {step === "info" && (
            <form onSubmit={handleSubmitInfo} className="flex flex-col gap-4">
              {/* Value display */}
              <div className="rounded-xl bg-primary/10 p-4 text-center">
                <p className="text-sm text-muted-foreground">Valor da doação</p>
                <p className="text-3xl font-bold text-primary">{formattedValue}</p>
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  Seu nome {!anonymous && <span className="text-destructive">*</span>}
                </label>
                <input
                  type="text"
                  placeholder="Como você quer aparecer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={anonymous}
                  required={!anonymous}
                  maxLength={100}
                  className="rounded-lg border-2 border-border bg-background px-4 py-3 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Anonymous toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary"
                />
                <span className="text-sm text-foreground">Doar anonimamente</span>
              </label>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  E-mail <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="rounded-lg border-2 border-border bg-background px-4 py-3 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* CPF */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  CPF <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  value={document}
                  onChange={(e) => setDocument(formatCPF(e.target.value))}
                  required
                  className="rounded-lg border-2 border-border bg-background px-4 py-3 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  Telefone <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  required
                  className="rounded-lg border-2 border-border bg-background px-4 py-3 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground">Pagamento 100% seguro via Paradise Pags</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Gerando Pix...
                  </>
                ) : (
                  "Continuar para pagamento"
                )}
              </button>
            </form>
          )}

          {step === "pix" && (
            <div className="flex flex-col items-center gap-5">
              {/* Value */}
              <div className="rounded-xl bg-primary/10 px-6 py-3 text-center">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">{formattedValue}</p>
              </div>

              {/* QR Code from API */}
              {pixQrBase64 ? (
                <img
                  src={pixQrBase64}
                  alt="QR Code Pix"
                  className="h-48 w-48 rounded-2xl border-2 border-border bg-white p-2"
                />
              ) : pixCode ? (
                <div className="rounded-2xl border-2 border-border bg-white p-3">
                  <QRCodeSVG value={pixCode} size={176} />
                </div>
              ) : (
                <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary">
                  <span className="text-xs text-muted-foreground">QR Code indisponível</span>
                </div>
              )}

              {expiresAt && (
                <p className="text-xs text-muted-foreground">
                  Expira em: <strong className="text-foreground">{expiresAt}</strong>
                </p>
              )}

              {/* Instructions */}
              <div className="w-full space-y-3">
                <p className="text-center text-sm text-muted-foreground">
                  Escaneie o QR Code acima ou copie o código Pix abaixo
                </p>

                {/* Pix code copy */}
                {pixCode && (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
                    <code className="flex-1 truncate text-xs text-muted-foreground">
                      {pixCode.substring(0, 40)}...
                    </code>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                )}

                {/* Steps */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="mb-2 text-sm font-semibold text-foreground">Como pagar:</p>
                  <ol className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">1</span>
                      Abra o app do seu banco
                    </li>
                    <li className="flex gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">2</span>
                      Escolha pagar com Pix
                    </li>
                    <li className="flex gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">3</span>
                      Escaneie o QR Code ou cole o código
                    </li>
                    <li className="flex gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">4</span>
                      Confirme o pagamento
                    </li>
                  </ol>
                </div>
              </div>

              <button
                onClick={handleConfirmPayment}
                className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition hover:opacity-90 hover:shadow-lg"
              >
                Já fiz o pagamento
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center gap-5 py-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-10 w-10 fill-primary text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Doação registrada!</h3>
                <p className="text-sm text-muted-foreground">
                  Obrigado{!anonymous && name ? `, ${name}` : ""}! Sua doação de{" "}
                  <strong className="text-primary">{formattedValue}</strong> vai ajudar
                  a reconstruir a cidade de Ubá.
                </p>
              </div>
              <div className="w-full rounded-xl border border-border bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground">
                  Um comprovante será enviado para <strong className="text-foreground">{email}</strong>
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <button
                  onClick={handleClose}
                  className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition hover:opacity-90 hover:shadow-lg"
                >
                  Voltar para a campanha
                </button>
                <button
                  onClick={handleClose}
                  className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:opacity-90"
                >
                  Compartilhar com amigos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
