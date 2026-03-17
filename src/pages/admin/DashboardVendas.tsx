import { useState } from "react";
import { Target, TrendingUp, ShoppingBag, Award } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

const topProducts = [
  { name: "Camiseta Preta Básica", qty: 145 },
  { name: "Calça Jogger Navy", qty: 98 },
  { name: "Tênis Branco Classic", qty: 87 },
  { name: "Moletom Cinza", qty: 72 },
  { name: "Jaqueta Jeans", qty: 65 },
];

const salesHistory = [
  { id: "V001", date: "17/03/2026", seller: "Carlos", items: 3, total: 459.9, payment: "Cartão" },
  { id: "V002", date: "17/03/2026", seller: "Ana", items: 1, total: 189.9, payment: "PIX" },
  { id: "V003", date: "16/03/2026", seller: "Carlos", items: 5, total: 892.5, payment: "Cartão" },
  { id: "V004", date: "16/03/2026", seller: "Bruno", items: 2, total: 310.0, payment: "PIX" },
  { id: "V005", date: "15/03/2026", seller: "Ana", items: 4, total: 645.6, payment: "Boleto" },
];

export default function DashboardVendas() {
  const [sellerFilter, setSellerFilter] = useState("all");
  const [voucherName, setVoucherName] = useState("");
  const [voucherValue, setVoucherValue] = useState("");

  const filtered = sellerFilter === "all" ? salesHistory : salesHistory.filter(s => s.seller === sellerFilter);
  const metaDiaria = 5000;
  const vendidoHoje = salesHistory.filter(s => s.date === "17/03/2026").reduce((a, b) => a + b.total, 0);
  const percentMeta = ((vendidoHoje / metaDiaria) * 100).toFixed(0);

  const generateVoucher = () => {
    if (!voucherName || !voucherValue) { toast.error("Preencha todos os campos"); return; }
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("URBAN STYLES", 105, 30, { align: "center" });
    doc.setFontSize(14);
    doc.text("Vale Mercadoria", 105, 45, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Cliente: ${voucherName}`, 20, 70);
    doc.text(`Valor: R$ ${parseFloat(voucherValue).toFixed(2)}`, 20, 85);
    doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, 20, 100);
    doc.text(`Código: VM-${Date.now().toString(36).toUpperCase()}`, 20, 115);
    doc.save(`vale-${voucherName.toLowerCase().replace(/\s/g, "-")}.pdf`);
    toast.success("Vale gerado com sucesso!");
    setVoucherName(""); setVoucherValue("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Painel de Vendas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Meta Diária" value={`${percentMeta}%`} icon={Target} change={vendidoHoje >= metaDiaria ? 100 : -1} />
        <StatCard title="Ticket Médio" value="R$ 126,35" icon={TrendingUp} change={4.2} />
        <StatCard title="P.A. (Peças/Atend.)" value="2,8" icon={ShoppingBag} change={1.5} />
        <StatCard title="Vendas Hoje" value={`R$ ${vendidoHoje.toFixed(2)}`} icon={Award} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader><CardTitle className="text-lg font-display">Ranking de Produtos</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} className="text-xs" />
                <Tooltip />
                <Bar dataKey="qty" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-display">Vale Mercadoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Nome do cliente" value={voucherName} onChange={e => setVoucherName(e.target.value)} />
            <Input placeholder="Valor (R$)" type="number" value={voucherValue} onChange={e => setVoucherValue(e.target.value)} />
            <Button onClick={generateVoucher} className="w-full">Gerar Vale (PDF)</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-display">Histórico de Vendas</CardTitle>
          <Select value={sellerFilter} onValueChange={setSellerFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Vendedor" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Carlos">Carlos</SelectItem>
              <SelectItem value="Ana">Ana</SelectItem>
              <SelectItem value="Bruno">Bruno</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Data</TableHead><TableHead>Vendedor</TableHead>
                <TableHead>Itens</TableHead><TableHead>Total</TableHead><TableHead>Pagamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-sm">{s.id}</TableCell>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>{s.seller}</TableCell>
                  <TableCell>{s.items}</TableCell>
                  <TableCell>R$ {s.total.toFixed(2)}</TableCell>
                  <TableCell>{s.payment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
