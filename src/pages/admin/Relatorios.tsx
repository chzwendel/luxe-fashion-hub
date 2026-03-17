import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const salesByPeriod = [
  { month: "Jan", vendas: 38200 }, { month: "Fev", vendas: 42100 },
  { month: "Mar", vendas: 48520 }, { month: "Abr", vendas: 35800 },
  { month: "Mai", vendas: 51200 }, { month: "Jun", vendas: 46800 },
];

const topSold = [
  { name: "Camiseta Preta Básica", qty: 312, revenue: 24928 },
  { name: "Calça Jogger Navy", qty: 198, revenue: 29680 },
  { name: "Tênis Branco Classic", qty: 145, revenue: 36236 },
  { name: "Moletom Cinza Urban", qty: 132, revenue: 21107 },
  { name: "Jaqueta Jeans", qty: 98, revenue: 19590 },
];

const staleItems = [
  { name: "Cinto Couro Marrom", lastSale: "15/01/2026", stock: 25, days: 61 },
  { name: "Boné Aba Reta", lastSale: "02/02/2026", stock: 18, days: 43 },
  { name: "Gravata Slim", lastSale: "20/02/2026", stock: 12, days: 25 },
];

const profitAnalysis = [
  { month: "Jan", receita: 38200, custo: 18100, lucro: 20100 },
  { month: "Fev", receita: 42100, custo: 19500, lucro: 22600 },
  { month: "Mar", receita: 48520, custo: 22000, lucro: 26520 },
  { month: "Abr", receita: 35800, custo: 17200, lucro: 18600 },
  { month: "Mai", receita: 51200, custo: 23800, lucro: 27400 },
  { month: "Jun", receita: 46800, custo: 21500, lucro: 25300 },
];

export default function Relatorios() {
  const [period, setPeriod] = useState("6m");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Relatórios</h1>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Último mês</SelectItem>
            <SelectItem value="3m">3 meses</SelectItem>
            <SelectItem value="6m">6 meses</SelectItem>
            <SelectItem value="1y">1 ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="vendas">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="produtos">Mais Vendidos</TabsTrigger>
          <TabsTrigger value="parados">Itens Parados</TabsTrigger>
          <TabsTrigger value="lucro">Análise de Lucro</TabsTrigger>
        </TabsList>

        <TabsContent value="vendas">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-lg font-display">Vendas por Período</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={salesByPeriod}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                  <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="produtos">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-lg font-display">Produtos Mais Vendidos</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead><TableHead>Produto</TableHead><TableHead>Qtd Vendida</TableHead><TableHead>Receita</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSold.map((p, i) => (
                    <TableRow key={p.name}>
                      <TableCell className="font-bold">{i + 1}º</TableCell>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.qty}</TableCell>
                      <TableCell>R$ {p.revenue.toLocaleString("pt-BR")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parados">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-lg font-display">Itens Parados</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead><TableHead>Última Venda</TableHead><TableHead>Estoque</TableHead><TableHead>Dias Parado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staleItems.map(p => (
                    <TableRow key={p.name}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.lastSale}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell><span className={`font-semibold ${p.days > 30 ? "text-red-500" : "text-yellow-600"}`}>{p.days} dias</span></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lucro">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle className="text-lg font-display">Análise de Lucro</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={profitAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                  <Line type="monotone" dataKey="receita" stroke="hsl(var(--primary))" strokeWidth={2} name="Receita" />
                  <Line type="monotone" dataKey="custo" stroke="#ef4444" strokeWidth={2} name="Custo" />
                  <Line type="monotone" dataKey="lucro" stroke="#22c55e" strokeWidth={2} name="Lucro" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
