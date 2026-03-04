import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const allSizes = ["S", "M", "L", "XL"];
const allColors = ["black", "white", "beige", "gray"];
const colorLabels: Record<string, string> = { black: "Preto", white: "Branco", beige: "Bege", gray: "Cinza" };
const categoryLabels: Record<string, string> = { menswear: "Masculino", womenswear: "Feminino", accessories: "Acessórios" };
const allCategories = ["menswear", "womenswear", "accessories"] as const;

export default function ProductGrid() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    setter(selected.includes(value) ? selected.filter((s) => s !== value) : [...selected, value]);
  };

  const filtered = useMemo(() => {
    return products
      .filter((p) => !p.discontinued)
      .filter((p) => selectedSizes.length === 0 || p.sizes.some((s) => selectedSizes.includes(s)))
      .filter((p) => selectedColors.length === 0 || p.colors.some((c) => selectedColors.includes(c)))
      .filter((p) => !selectedCategory || p.category === selectedCategory);
  }, [selectedSizes, selectedColors, selectedCategory]);

  return (
    <section id="products" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-12 tracking-tight">COLEÇÃO</h2>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-56 shrink-0 space-y-8">
            <div>
              <h4 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground mb-4">CATEGORIA</h4>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {allCategories.map((c) => (
                  <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? "" : c)} className={`text-left font-body text-sm transition-colors duration-200 ${selectedCategory === c ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                    {categoryLabels[c]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground mb-4">TAMANHO</h4>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((s) => (
                  <button key={s} onClick={() => toggleFilter(s, selectedSizes, setSelectedSizes)} className={`w-10 h-10 text-xs font-display font-bold border transition-colors duration-200 ${selectedSizes.includes(s) ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:border-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground mb-4">COR</h4>
              <div className="flex flex-wrap gap-2">
                {allColors.map((c) => {
                  const colorMap: Record<string, string> = { black: "#141414", white: "#f5f5f5", beige: "#d4c4a8", gray: "#9ca3af" };
                  return (
                    <button key={c} onClick={() => toggleFilter(c, selectedColors, setSelectedColors)} className={`w-8 h-8 border-2 transition-all duration-200 ${selectedColors.includes(c) ? "border-foreground scale-110" : "border-transparent hover:border-muted-foreground"}`} style={{ backgroundColor: colorMap[c] }} title={colorLabels[c]} />
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground font-body py-20">Nenhum produto encontrado com esses filtros.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
