import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/admin/StatusBadge";
import { toast } from "sonner";

const mockProducts = [
  { id: 1, name: "Camiseta Preta Básica", price: 79.9 },
  { id: 2, name: "Calça Jogger Navy", price: 149.9 },
  { id: 3, name: "Tênis Branco Classic", price: 249.9 },
  { id: 4, name: "Jaqueta Jeans Oversized", price: 199.9 },
  { id: 5, name: "Moletom Cinza Urban", price: 159.9 },
];

interface SaleItem { productId: number; name: string; price: number; qty: number; }

export default function Vendas() {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [delivery, setDelivery] = useState("retirada");
  const [payment, setPayment] = useState("cartao");
  const [installments, setInstallments] = useState(1);

  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);
  const discountValue = subtotal * (discount / 100);
  const total = subtotal - discountValue;

  const addItem = () => {
    const p = mockProducts.find(p => p.id === parseInt(selectedProduct));
    if (!p) return;
    const existing = items.find(i => i.productId === p.id);
    if (existing) {
      setItems(items.map(i => i.productId === p.id ? { ...i, qty: i.qty + qty } : i));
    } else {
      setItems([...items, { productId: p.id, name: p.name, price: p.price, qty }]);
    }
    setSelectedProduct(""); setQty(1);
  };

  const finalizeSale = () => {
    if (items.length === 0) { toast.error("Adicione itens à venda"); return; }
    toast.success(`Venda de R$ ${total.toFixed(2)} registrada!`);
    setItems([]); setDiscount(0); setCoupon("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">PDV — Registrar Venda</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-lg font-display">Itens da Venda</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Selecionar produto" /></SelectTrigger>
                  <SelectContent>{mockProducts.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.name} — R$ {p.price.toFixed(2)}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="number" min={1} value={qty} onChange={e => setQty(parseInt(e.target.value) || 1)} className="w-20" />
                <Button onClick={addItem} disabled={!selectedProduct}><Plus className="h-4 w-4" /></Button>
              </div>
              {items.length > 0 && (
                <Table>
                  <TableHeader><TableRow><TableHead>Produto</TableHead><TableHead>Qtd</TableHead><TableHead>Preço</TableHead><TableHead>Total</TableHead><TableHead /></TableRow></TableHeader>
                  <TableBody>
                    {items.map(i => (
                      <TableRow key={i.productId}>
                        <TableCell>{i.name}</TableCell>
                        <TableCell>{i.qty}</TableCell>
                        <TableCell>R$ {i.price.toFixed(2)}</TableCell>
                        <TableCell>R$ {(i.price * i.qty).toFixed(2)}</TableCell>
                        <TableCell><Button variant="ghost" size="icon" onClick={() => setItems(items.filter(x => x.productId !== i.productId))}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader><CardTitle className="text-lg font-display">Finalizar</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Desconto (%)</label>
              <Input type="number" min={0} max={100} value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Cupom</label>
              <Input placeholder="Código" value={coupon} onChange={e => setCoupon(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Entrega</label>
              <Select value={delivery} onValueChange={setDelivery}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="retirada">Retirada na loja</SelectItem>
                  <SelectItem value="entrega">Entrega</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Pagamento</label>
              <Select value={payment} onValueChange={setPayment}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {payment === "cartao" && (
              <div>
                <label className="text-sm font-medium text-foreground">Parcelas</label>
                <Select value={String(installments)} onValueChange={v => setInstallments(parseInt(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{[1,2,3,4,5,6].map(i => <SelectItem key={i} value={String(i)}>{i}x {i === 1 ? "à vista" : `R$ ${(total / i).toFixed(2)}`}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Desconto ({discount}%)</span><span>-R$ {discountValue.toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>R$ {total.toFixed(2)}</span></div>
            </div>
            <Button className="w-full" size="lg" onClick={finalizeSale}>Finalizar Venda</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
