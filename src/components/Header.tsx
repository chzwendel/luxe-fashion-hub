import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { label: "MENSWEAR", href: "/" },
  { label: "WOMENSWEAR", href: "/" },
  { label: "ACCESSORIES", href: "/" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="font-display font-black text-xl tracking-[0.3em] text-foreground">
          NOIR
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.href}
              className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            <Search size={20} />
          </button>
          <Link to="/cart" className="relative text-foreground hover:text-muted-foreground transition-colors">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-display font-bold w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {categories.map((c) => (
                <Link
                  key={c.label}
                  to={c.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-sm font-bold tracking-[0.2em] text-foreground"
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
