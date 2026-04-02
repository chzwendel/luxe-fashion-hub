import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { validateCPF, formatCPF, formatPhone } from "@/lib/validators";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Preencha todos os campos"); return; }

    if (isLogin) {
      const success = login(email, password);
      if (success) { toast.success("Login realizado com sucesso!"); navigate("/"); }
      else toast.error("E-mail ou senha incorretos");
    } else {
      if (!name) { toast.error("Preencha seu nome"); return; }
      if (!cpf || !validateCPF(cpf)) { toast.error("CPF inválido"); return; }
      const result = register({ nome: name, cpf, email, senha: password, telefone, endereco: "", cidade: "", estado: "", cep: "" });
      if (result.success) { toast.success("Cadastro realizado com sucesso!"); navigate("/"); }
      else toast.error(result.error || "Erro ao cadastrar");
    }
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
                <>
                  <div>
                    <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Nome Completo</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="João da Silva"
                      className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">CPF</label>
                    <input type="text" value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} placeholder="000.000.000-00" maxLength={14}
                      className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Telefone</label>
                    <input type="tel" value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} placeholder="(00) 00000-0000" maxLength={15}
                      className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
                  </div>
                </>
              )}
              <div>
                <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="joao@email.com"
                  className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
              </div>
              <div>
                <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full h-12 px-4 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors" />
              </div>
              <Button type="submit" className="w-full" size="lg">{isLogin ? "Entrar" : "Criar Conta"}</Button>
            </form>

            {isLogin && (
              <p className="font-body text-xs text-muted-foreground text-center mt-4">
                Teste: joao@email.com / 123456
              </p>
            )}

            <div className="mt-8 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
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
