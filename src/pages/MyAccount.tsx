import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LogOut, Package, User } from "lucide-react";
import { motion } from "framer-motion";

const statusLabels: Record<string, { label: string; cls: string }> = {
  pendente: { label: "Pendente", cls: "bg-yellow-100 text-yellow-700" },
  confirmado: { label: "Confirmado", cls: "bg-blue-100 text-blue-700" },
  enviado: { label: "Enviado", cls: "bg-purple-100 text-purple-700" },
  entregue: { label: "Entregue", cls: "bg-green-100 text-green-700" },
  cancelado: { label: "Cancelado", cls: "bg-red-100 text-red-700" },
};

const paymentLabels: Record<string, string> = { pix: "PIX", cartao: "Cartão", boleto: "Boleto" };

export default function MyAccount() {
  const { user, logout, getPedidosByUser } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20 px-6 text-center">
          <p className="font-body text-muted-foreground mb-6">Você precisa estar logado para acessar sua conta.</p>
          <Button asChild><Link to="/login">Fazer Login</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const pedidos = getPedidosByUser(user.id);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-10">
              <h1 className="font-display font-black text-3xl text-foreground tracking-tight">MINHA CONTA</h1>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut size={16} /> Sair
              </Button>
            </div>

            {/* Profile */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <User size={18} className="text-muted-foreground" />
                <h2 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">Dados Pessoais</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Nome", value: user.nome },
                  { label: "E-mail", value: user.email },
                  { label: "CPF", value: user.cpf },
                  { label: "Telefone", value: user.telefone },
                  { label: "Endereço", value: user.endereco },
                  { label: "Cidade/UF", value: `${user.cidade}/${user.estado}` },
                  { label: "CEP", value: user.cep },
                  { label: "Membro desde", value: user.createdAt },
                ].map(f => (
                  <div key={f.label} className="border border-border p-4">
                    <span className="font-display text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase block mb-1">{f.label}</span>
                    <span className="font-body text-sm text-foreground">{f.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Orders */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Package size={18} className="text-muted-foreground" />
                <h2 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">Histórico de Pedidos</h2>
              </div>
              {pedidos.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground">Nenhum pedido realizado.</p>
              ) : (
                <div className="space-y-4">
                  {pedidos.map(p => {
                    const st = statusLabels[p.status_pedido];
                    return (
                      <div key={p.id} className="border border-border p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-display font-bold text-sm text-foreground">{p.numero_pedido}</span>
                            <span className="font-body text-xs text-muted-foreground ml-3">{p.createdAt}</span>
                          </div>
                          <span className={`px-3 py-1 text-xs font-display font-bold tracking-wider ${st.cls}`}>{st.label}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          {p.items.map((item, i) => (
                            <div key={i} className="flex justify-between font-body text-sm">
                              <span className="text-foreground/80">{item.quantidade}x {item.produto_nome} — {item.tamanho} / {item.cor}</span>
                              <span className="text-foreground">R$ {(item.valor_unitario * item.quantidade).toFixed(2).replace(".", ",")}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-border pt-3 flex items-center justify-between">
                          <span className="font-body text-xs text-muted-foreground">
                            {paymentLabels[p.forma_pagamento]} · Frete: {p.frete === 0 ? "Grátis" : `R$ ${p.frete.toFixed(2).replace(".", ",")}`}
                            {p.desconto > 0 && ` · Desconto: R$ ${p.desconto.toFixed(2).replace(".", ",")}`}
                          </span>
                          <span className="font-display font-bold text-foreground">R$ {p.valor_total.toFixed(2).replace(".", ",")}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
