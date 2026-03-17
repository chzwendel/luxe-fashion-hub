import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge, { type StatusType } from "@/components/admin/StatusBadge";
import { toast } from "sonner";

interface Product {
  id: number; name: string; category: string; brand: string; barcode: string;
  sizes: string[]; colors: string[]; costPrice: number; salePrice: number;
  margin: number; supplier: string; status: StatusType; stock: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Camiseta Preta Básica", category: "Camisetas", brand: "Urban", barcode: "7891234560001", sizes: ["P","M","G","GG"], colors: ["Preto"], costPrice: 25, salePrice: 79.9, margin: 219.6, supplier: "Têxtil Brasil", status: "ativo", stock: 150 },
  { id: 2, name: "Calça Jogger Navy", category: "Calças", brand: "Urban", barcode: "7891234560002", sizes: ["P","M","G"], colors: ["Azul Marinho"], costPrice: 45, salePrice: 149.9, margin: 233.1, supplier: "Jeans & Co", status: "ativo", stock: 80 },
  { id: 3, name: "Tênis Branco Classic", category: "Calçados", brand: "StepUp", barcode: "7891234560003", sizes: ["38","39","40","41","42"], colors: ["Branco"], costPrice: 85, salePrice: 249.9, margin: 194, supplier: "CalçaBem", status: "ativo", stock: 45 },
  { id: 4, name: "Jaqueta Jeans Oversized", category: "Jaquetas", brand: "Urban", barcode: "7891234560004", sizes: ["M","G","GG"], colors: ["Azul Claro"], costPrice: 60, salePrice: 199.9, margin: 233.2, supplier: "Jeans & Co", status: "ativo", stock: 30 },
  { id: 5, name: "Relógio Prata Minimal", category: "Acessórios", brand: "TimeLine", barcode: "7891234560005", sizes: ["Único"], colors: ["Prata"], costPrice: 120, salePrice: 349.9, margin: 191.6, supplier: "Acessórios Plus", status: "ativo", stock: 20 },
  { id: 6, name: "Moletom Cinza Urban", category: "Moletons", brand: "Urban", barcode: "7891234560006", sizes: ["P","M","G","GG"], colors: ["Cinza"], costPrice: 40, salePrice: 159.9, margin: 299.8, supplier: "Têxtil Brasil", status: "inativo", stock: 0 },
];

export default function Produtos() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Camisetas", brand: "", barcode: "", sizes: "P,M,G,GG", colors: "", costPrice: "", salePrice: "", supplier: "" });

  const categories = [...new Set(products.map(p => p.category))];
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
    const matchCat = catFilter === "all" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleAdd = () => {
    const cost = parseFloat(form.costPrice);
    const sale = parseFloat(form.salePrice);
    if (!form.name || !cost || !sale) { toast.error("Preencha os campos obrigatórios"); return; }
    const newProduct: Product = {
      id: products.length + 1, name: form.name, category: form.category, brand: form.brand,
      barcode: form.barcode || `789${Date.now()}`, sizes: form.sizes.split(",").map(s => s.trim()),
      colors: form.colors.split(",").map(c => c.trim()), costPrice: cost, salePrice: sale,
      margin: parseFloat((((sale - cost) / cost) * 100).toFixed(1)), supplier: form.supplier,
      status: "ativo", stock: 0,
    };
    setProducts([...products, newProduct]);
    setOpen(false);
    toast.success("Produto cadastrado!");
    setForm({ name: "", category: "Camisetas", brand: "", barcode: "", sizes: "P,M,G,GG", colors: "", costPrice: "", salePrice: "", supplier: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Produtos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Novo Produto</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Cadastrar Produto</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Nome *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Camisetas","Calças","Calçados","Jaquetas","Moletons","Acessórios"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="Marca" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
              <Input placeholder="Código de barras" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} />
              <Input placeholder="Tamanhos (P,M,G,GG)" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} />
              <Input placeholder="Cores (Preto,Branco)" value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Preço custo *" type="number" value={form.costPrice} onChange={e => setForm({ ...form, costPrice: e.target.value })} />
                <Input placeholder="Preço venda *" type="number" value={form.salePrice} onChange={e => setForm({ ...form, salePrice: e.target.value })} />
              </div>
              {form.costPrice && form.salePrice && (
                <p className="text-sm text-muted-foreground">Margem: {(((parseFloat(form.salePrice) - parseFloat(form.costPrice)) / parseFloat(form.costPrice)) * 100).toFixed(1)}%</p>
              )}
              <Input placeholder="Fornecedor" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} />
              <Button onClick={handleAdd} className="w-full">Cadastrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou código..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Categoria" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead><TableHead>Categoria</TableHead><TableHead>Marca</TableHead>
                  <TableHead>Tamanhos</TableHead><TableHead>Custo</TableHead><TableHead>Venda</TableHead>
                  <TableHead>Margem</TableHead><TableHead>Estoque</TableHead><TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>{p.brand}</TableCell>
                    <TableCell className="text-xs">{p.sizes.join(", ")}</TableCell>
                    <TableCell>R$ {p.costPrice.toFixed(2)}</TableCell>
                    <TableCell>R$ {p.salePrice.toFixed(2)}</TableCell>
                    <TableCell>{p.margin}%</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
