import { useState } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, RefreshCw, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StockMovement {
  id: number; product: string; type: "entrada" | "venda" | "troca" | "perda";
  qty: number; date: string; responsible: string; supplier?: string;
}

const movements: StockMovement[] = [
  { id: 1, product: "Camiseta Preta Básica", type: "entrada", qty: 50, date: "17/03/2026", responsible: "Carlos", supplier: "Têxtil Brasil" },
  { id: 2, product: "Calça Jogger Navy", type: "venda", qty: -3, date: "17/03/2026", responsible: "Ana" },
  { id: 3, product: "Tênis Branco Classic", type: "troca", qty: 1, date: "16/03/2026", responsible: "Bruno" },
  { id: 4, product: "Moletom Cinza Urban", type: "perda", qty: -2, date: "16/03/2026", responsible: "Carlos" },
  { id: 5, product: "Jaqueta Jeans Oversized", type: "venda", qty: -1, date: "15/03/2026", responsible: "Ana" },
  { id: 6, product: "Relógio Prata Minimal", type: "entrada", qty: 10, date: "15/03/2026", responsible: "Carlos", supplier: "Acessórios Plus" },
];

const lowStockAlerts = [
  { product: "Moletom Cinza Urban", current: 3, minimum: 10 },
  { product: "Relógio Prata Minimal", current: 5, minimum: 8 },
  { product: "Jaqueta Jeans Oversized", current: 7, minimum: 15 },
];

const typeConfig: Record<string, { label: string; color: string; icon: typeof ArrowUp }> = {
  entrada: { label: "Entrada", color: "text-green-600", icon: ArrowUp },
  venda: { label: "Venda", color: "text-blue-600", icon: ArrowDown },
  troca: { label: "Troca", color: "text-yellow-600", icon: RefreshCw },
  perda: { label: "Perda", color: "text-red-600", icon: AlertTriangle },
};

export default function Estoque() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = movements.filter(m => {
    const matchSearch = m.product.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || m.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Controle de Estoque</h1>

      {lowStockAlerts.length > 0 && (
        <Card className="border-l-4 border-l-yellow-500 border-none shadow-md">
          <CardHeader><CardTitle className="text-lg font-display flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-yellow-500" />Alertas de Estoque Baixo</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lowStockAlerts.map(a => (
                <div key={a.product} className="p-3 rounded-lg bg-yellow-50 text-sm">
                  <p className="font-medium text-foreground">{a.product}</p>
                  <p className="text-yellow-700">Atual: {a.current} | Mínimo: {a.minimum}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar produto..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="entrada">Entrada</SelectItem>
              <SelectItem value="venda">Venda</SelectItem>
              <SelectItem value="troca">Troca</SelectItem>
              <SelectItem value="perda">Perda</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead><TableHead>Tipo</TableHead><TableHead>Qtd</TableHead>
                <TableHead>Data</TableHead><TableHead>Responsável</TableHead><TableHead>Fornecedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(m => {
                const config = typeConfig[m.type];
                const Icon = config.icon;
                return (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.product}</TableCell>
                    <TableCell><span className={`flex items-center gap-1 ${config.color} font-medium text-sm`}><Icon className="h-3 w-3" />{config.label}</span></TableCell>
                    <TableCell className={m.qty > 0 ? "text-green-600" : "text-red-500"}>{m.qty > 0 ? `+${m.qty}` : m.qty}</TableCell>
                    <TableCell>{m.date}</TableCell>
                    <TableCell>{m.responsible}</TableCell>
                    <TableCell>{m.supplier || "-"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
