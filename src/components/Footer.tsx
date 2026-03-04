export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display font-black text-xl tracking-[0.3em] mb-4">NOIR</h3>
            <p className="font-body text-sm text-background/60">Moda premium para o indivíduo moderno.</p>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] mb-4 text-background/40">LOJA</h4>
            <ul className="space-y-2 font-body text-sm text-background/60">
              <li className="hover:text-background transition-colors cursor-pointer">Masculino</li>
              <li className="hover:text-background transition-colors cursor-pointer">Feminino</li>
              <li className="hover:text-background transition-colors cursor-pointer">Acessórios</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] mb-4 text-background/40">SUPORTE</h4>
            <ul className="space-y-2 font-body text-sm text-background/60">
              <li className="hover:text-background transition-colors cursor-pointer">Perguntas Frequentes</li>
              <li className="hover:text-background transition-colors cursor-pointer">Entregas</li>
              <li className="hover:text-background transition-colors cursor-pointer">Trocas e Devoluções</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] mb-4 text-background/40">SIGA-NOS</h4>
            <ul className="space-y-2 font-body text-sm text-background/60">
              <li className="hover:text-background transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-background transition-colors cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="font-body text-xs text-background/40">© 2026 NOIR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
