import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useFilterStore } from "@/store/filterStore";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { label: "MASCULINO", value: "menswear" },
  { label: "FEMININO", value: "womenswear" },
  { label: "ACESSÓRIOS", value: "accessories" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useFilterStore();

  const handleCategoryClick = (value: string) => {
    setSelectedCategory(selectedCategory === value ? "" : value);
    navigate("/");
    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="font-display font-black text-xl tracking-[0.3em] text-foreground">
          NOIR
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => handleCategoryClick(c.value)}
              className={`font-display text-xs font-bold tracking-[0.2em] transition-colors duration-300 ${selectedCategory === c.value ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {c.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-foreground hover:text-muted-foreground transition-colors">
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

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-border overflow-hidden">
            <div className="container mx-auto px-6 py-4">
              <input autoFocus type="text" placeholder="Buscar produtos..." className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden border-t border-border overflow-hidden">
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {categories.map((c) => (
                <button key={c.label} onClick={() => { handleCategoryClick(c.value); setMenuOpen(false); }} className={`font-display text-sm font-bold tracking-[0.2em] text-left ${selectedCategory === c.value ? "text-foreground" : "text-muted-foreground"}`}>
                  {c.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
