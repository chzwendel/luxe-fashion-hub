export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display font-black text-xl tracking-[0.3em] mb-4">NOIR</h3>
            <p className="font-body text-sm text-background/60">
              Premium fashion for the modern individual.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] mb-4 text-background/40">SHOP</h4>
            <ul className="space-y-2 font-body text-sm text-background/60">
              <li className="hover:text-background transition-colors cursor-pointer">Menswear</li>
              <li className="hover:text-background transition-colors cursor-pointer">Womenswear</li>
              <li className="hover:text-background transition-colors cursor-pointer">Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] mb-4 text-background/40">SUPPORT</h4>
            <ul className="space-y-2 font-body text-sm text-background/60">
              <li className="hover:text-background transition-colors cursor-pointer">FAQ</li>
              <li className="hover:text-background transition-colors cursor-pointer">Shipping</li>
              <li className="hover:text-background transition-colors cursor-pointer">Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.2em] mb-4 text-background/40">FOLLOW</h4>
            <ul className="space-y-2 font-body text-sm text-background/60">
              <li className="hover:text-background transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-background transition-colors cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="font-body text-xs text-background/40">
            © 2026 NOIR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
