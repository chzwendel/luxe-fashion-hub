import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }
    if (!isLogin && !name) {
      toast.error("Preencha seu nome");
      return;
    }
    toast.success(isLogin ? "Login realizado com sucesso!" : "Cadastro realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display font-black text-3xl text-foreground mb-2 tracking-tight text-center">
              {isLogin ? "ENTRAR" : "CRIAR CONTA"}
            </h1>
            <p className="font-body text-sm text-muted-foreground text-center mb-10">
              {isLogin ? "Acesse sua conta URBAN STYLES" : "Cadastre-se para uma experiência completa"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="João da Silva"
                    className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="joao@email.com"
                  className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? "Entrar" : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Voltar para a loja
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
