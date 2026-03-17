import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const weeklyRevenue = [
  { day: "Seg", receita: 4200 }, { day: "Ter", receita: 3800 },
  { day: "Qua", receita: 5100 }, { day: "Qui", receita: 4600 },
  { day: "Sex", receita: 6800 }, { day: "Sáb", receita: 8200 },
  { day: "Dom", receita: 3200 },
];

const categoryData = [
  { name: "Camisetas", value: 35 }, { name: "Calças", value: 25 },
  { name: "Acessórios", value: 20 }, { name: "Jaquetas", value: 12 },
  { name: "Calçados", value: 8 },
];

const COLORS = ["hsl(var(--primary))", "#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Receita Mensal" value="R$ 48.520" icon={DollarSign} change={12.5} />
        <StatCard title="Pedidos" value="384" icon={ShoppingCart} change={8.2} />
        <StatCard title="Clientes" value="1.247" icon={Users} change={3.1} />
        <StatCard title="Ticket Médio" value="R$ 126,35" icon={TrendingUp} change={-2.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader><CardTitle className="text-lg font-display">Receita Semanal</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                <Bar dataKey="receita" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader><CardTitle className="text-lg font-display">Por Categoria</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
