import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

type CheckoutStep = "cart" | "identification" | "payment";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit" | "boleto">("credit");
  const [installments, setInstallments] = useState(1);
  const cartTotal = total();

  const stepLabels: Record<CheckoutStep, string> = { cart: "Carrinho", identification: "Identificação", payment: "Pagamento" };
  const steps: CheckoutStep[] = ["cart", "identification", "payment"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`font-display text-xs tracking-[0.15em] uppercase ${step === s ? "text-foreground font-bold" : "text-muted-foreground"}`}>{stepLabels[s]}</span>
                {i < steps.length - 1 && <span className="text-muted-foreground">—</span>}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === "cart" && (
              <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                {items.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="font-body text-muted-foreground mb-6">Seu carrinho está vazio.</p>
                    <Button variant="outline" asChild><Link to="/">Continuar Comprando</Link></Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.product.id + item.selectedSize} className="flex gap-4 border-b border-border pb-6">
                          <div className="w-24 h-24 bg-card overflow-hidden shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-bold text-sm text-foreground">{item.product.name}</h3>
                            <p className="font-body text-xs text-muted-foreground mt-1">Tamanho: {item.selectedSize}</p>
                            <p className="font-body text-sm text-foreground mt-1">R$ {item.product.price.toFixed(2).replace(".", ",")}</p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground transition-colors"><Trash2 size={16} /></button>
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"><Minus size={14} /></button>
                              <span className="font-display text-sm font-bold w-6 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"><Plus size={14} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
                      <span className="font-display font-bold text-lg text-foreground">R$ {cartTotal.toFixed(2).replace(".", ",")}</span>
                      <Button onClick={() => setStep("identification")}>Continuar</Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {step === "identification" && (
              <motion.div key="identification" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-body transition-colors mb-4"><ArrowLeft size={16} /> Voltar</button>
                {[
                  { label: "Nome Completo", type: "text", placeholder: "João da Silva" },
                  { label: "E-mail", type: "email", placeholder: "joao@email.com" },
                  { label: "CPF", type: "text", placeholder: "000.000.000-00" },
                  { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000" },
                  { label: "Endereço", type: "text", placeholder: "Rua, número" },
                  { label: "Cidade", type: "text", placeholder: "São Paulo" },
                  { label: "CEP", type: "text", placeholder: "00000-000" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
                  </div>
                ))}
                <div className="pt-4">
                  <Button onClick={() => setStep("payment")} className="w-full">Continuar para Pagamento</Button>
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <button onClick={() => setStep("identification")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-body transition-colors mb-4"><ArrowLeft size={16} /> Voltar</button>

                <div>
                  <h3 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-4">Forma de Pagamento</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {([{ id: "pix" as const, label: "PIX" }, { id: "credit" as const, label: "Cartão" }, { id: "boleto" as const, label: "Boleto" }]).map((m) => (
                      <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`h-14 border text-sm font-display font-bold tracking-wider transition-colors duration-200 ${paymentMethod === m.id ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:border-foreground"}`}>{m.label}</button>
                    ))}
                  </div>
                </div>

                {paymentMethod === "pix" && (
                  <div className="bg-card p-8 text-center">
                    <div className="w-40 h-40 bg-foreground/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="font-display text-xs text-muted-foreground">QR Code</span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground">Escaneie o QR Code ou copie a chave PIX</p>
                    <p className="font-display font-bold text-lg text-foreground mt-2">R$ {cartTotal.toFixed(2).replace(".", ",")}</p>
                  </div>
                )}

                {paymentMethod === "credit" && (
                  <div className="space-y-4">
                    {[{ label: "Número do Cartão", placeholder: "0000 0000 0000 0000" }, { label: "Nome no Cartão", placeholder: "Nome impresso no cartão" }].map((f) => (
                      <div key={f.label}>
                        <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">{f.label}</label>
                        <input placeholder={f.placeholder} className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Validade</label>
                        <input placeholder="MM/AA" className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">CVV</label>
                        <input placeholder="000" className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Parcelas</label>
                      <select value={installments} onChange={(e) => setInstallments(Number(e.target.value))} className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground focus:border-foreground outline-none transition-colors appearance-none">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n}x R$ {(cartTotal / n).toFixed(2).replace(".", ",")}{n === 1 ? " (à vista)" : ""}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="bg-card p-8 text-center">
                    <p className="font-body text-sm text-muted-foreground mb-2">Um boleto será gerado no valor de</p>
                    <p className="font-display font-bold text-lg text-foreground">R$ {cartTotal.toFixed(2).replace(".", ",")}</p>
                    <p className="font-body text-xs text-muted-foreground mt-4">Confirmação do pagamento em 1 a 3 dias úteis</p>
                  </div>
                )}

                <div className="border-t border-border pt-6">
                  <div className="flex justify-between mb-6">
                    <span className="font-display font-bold text-foreground">Total</span>
                    <span className="font-display font-bold text-lg text-foreground">R$ {cartTotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => { clearCart(); setStep("cart"); }}>Finalizar Compra</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
