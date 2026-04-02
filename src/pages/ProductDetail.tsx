import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ThumbsUp, Star } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { motion } from "framer-motion";
import { toast } from "sonner";

const colorMap: Record<string, string> = { black: "#141414", white: "#f5f5f5", beige: "#d4c4a8", gray: "#9ca3af" };
const colorLabels: Record<string, string> = { black: "Preto", white: "Branco", beige: "Bege", gray: "Cinza" };

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const { user, getAvaliacoesByProduct, addAvaliacao } = useAuthStore();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewCurtida, setReviewCurtida] = useState<"S" | "N">("S");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20 px-6 text-center">
          <p className="font-body text-muted-foreground">Produto não encontrado.</p>
          <Link to="/" className="font-body text-sm text-foreground underline mt-4 inline-block">Voltar à loja</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const avaliacoes = getAvaliacoesByProduct(product.id);
  const avgRating = avaliacoes.length > 0 ? avaliacoes.reduce((s, a) => s + a.estrelas, 0) / avaliacoes.length : product.rating;
  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const handleAdd = () => {
    if (isSoldOut) return;
    addItem(product, selectedSize);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Faça login para avaliar"); return; }
    if (!reviewComment.trim()) { toast.error("Escreva um comentário"); return; }
    if (reviewStars < 1 || reviewStars > 5) { toast.error("Avaliação deve ser entre 1 e 5 estrelas"); return; }
    addAvaliacao({
      id_produto: product.id,
      id_usuarios: user.id,
      usuario_nome: user.nome,
      estrelas: reviewStars,
      comentario: reviewComment.trim(),
      curtida: reviewCurtida,
    });
    setReviewComment("");
    setReviewStars(5);
    toast.success("Avaliação enviada!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors mb-8">
            <ArrowLeft size={16} /> Voltar
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-square bg-card overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {isSoldOut && <Badge variant="soldOut" className="absolute top-4 left-4 text-sm">Esgotado</Badge>}
              {isLowStock && (
                <span className="absolute top-4 left-4 bg-amber-500/90 text-white text-xs font-display font-bold px-3 py-1.5 tracking-wider">
                  ÚLTIMAS UNIDADES
                </span>
              )}
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col">
              <p className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase mb-2">
                {product.marca} · {product.category === "menswear" ? "Masculino" : "Acessórios"}
              </p>
              <h1 className="font-display font-black text-2xl md:text-3xl text-foreground tracking-tight mb-3">{product.name}</h1>

              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={avgRating} />
                <span className="font-body text-xs text-muted-foreground">({avaliacoes.length} avaliações)</span>
              </div>

              <p className="font-display font-bold text-2xl text-foreground mb-6">
                R$ {product.valor_venda.toFixed(2).replace(".", ",")}
              </p>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground mb-3">
                    COR — {colorLabels[selectedColor] || selectedColor}
                  </h4>
                  <div className="flex gap-2">
                    {product.colors.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-10 h-10 border-2 transition-all duration-200 ${selectedColor === c ? "border-foreground scale-110" : "border-transparent hover:border-muted-foreground"}`}
                        style={{ backgroundColor: colorMap[c] || c }}
                        title={colorLabels[c] || c}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              <div className="mb-8">
                <h4 className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground mb-3">TAMANHO</h4>
                <div className="flex gap-2">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 text-sm font-display font-bold border transition-colors duration-200 ${selectedSize === s ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:border-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleAdd} disabled={isSoldOut} size="lg" className="w-full text-sm tracking-widest">
                {isSoldOut ? "ESGOTADO" : "ADICIONAR AO CARRINHO"}
              </Button>

              {product.codigo_barras && (
                <p className="font-body text-xs text-muted-foreground mt-4">Cód. barras: {product.codigo_barras}</p>
              )}
            </motion.div>
          </div>

          {/* Reviews section */}
          <section className="mt-20">
            <h2 className="font-display font-bold text-xl text-foreground mb-8 tracking-tight">AVALIAÇÕES DOS CLIENTES</h2>

            {avaliacoes.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground mb-8">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
            ) : (
              <div className="space-y-6 mb-12">
                {avaliacoes.map(a => (
                  <div key={a.id} className="border-b border-border pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-sm text-foreground">{a.usuario_nome}</span>
                        <StarRating rating={a.estrelas} />
                      </div>
                      <div className="flex items-center gap-2">
                        {a.curtida === "S" && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Heart size={14} className="fill-red-500 text-red-500" /> Recomenda
                          </span>
                        )}
                        <span className="font-body text-xs text-muted-foreground">{a.createdAt}</span>
                      </div>
                    </div>
                    <p className="font-body text-sm text-foreground/80 leading-relaxed">{a.comentario}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Review form */}
            <div className="bg-card p-8 max-w-xl">
              <h3 className="font-display font-bold text-sm tracking-[0.15em] text-foreground mb-6 uppercase">Deixe sua avaliação</h3>
              {!user ? (
                <p className="font-body text-sm text-muted-foreground">
                  <Link to="/login" className="text-foreground underline">Faça login</Link> para avaliar este produto.
                </p>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div>
                    <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-3">Estrelas</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} type="button" onClick={() => setReviewStars(n)}>
                          <Star size={24} className={`transition-colors ${n <= reviewStars ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-display text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase block mb-2">Comentário</label>
                    <textarea
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      placeholder="Conte sua experiência com o produto..."
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setReviewCurtida(reviewCurtida === "S" ? "N" : "S")} className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsUp size={16} className={reviewCurtida === "S" ? "fill-foreground text-foreground" : ""} />
                      {reviewCurtida === "S" ? "Recomendo" : "Não recomendo"}
                    </button>
                  </div>
                  <Button type="submit" className="tracking-widest text-xs">ENVIAR AVALIAÇÃO</Button>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
