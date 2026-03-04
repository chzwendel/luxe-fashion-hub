import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

type Props = { product: Product; index: number };

export default function ProductCard({ product, index }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const addItem = useCartStore((s) => s.addItem);
  const isSoldOut = product.stock === 0;

  const handleAdd = () => {
    if (isSoldOut) return;
    addItem(product, selectedSize);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      {/* Image container */}
      <div className="relative bg-card aspect-square overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {isSoldOut && (
          <Badge variant="soldOut" className="absolute top-4 left-4">
            Sold Out
          </Badge>
        )}

        {/* Quick add overlay */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100">
            <div className="w-full flex flex-col gap-2">
              {/* Size selector */}
              <div className="flex gap-1 justify-center">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-9 h-9 text-xs font-display font-bold transition-colors duration-200 ${
                      selectedSize === s
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground hover:bg-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Button onClick={handleAdd} size="sm" className="w-full">
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-display font-bold text-sm tracking-wide text-foreground">
        {product.name}
      </h3>
      <p className="font-body text-sm text-muted-foreground mt-1">
        R$ {product.price.toFixed(2).replace(".", ",")}
      </p>
    </motion.div>
  );
}
