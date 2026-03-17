import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import StatusBadge, { type StatusType } from "@/components/admin/StatusBadge";
import { toast } from "sonner";

interface Client {
  id: number; name: string; cpf: string; email: string; phone: string;
  city: string; state: string; segment: string; totalPurchases: number;
  lastPurchase: string; marketingConsent: boolean; status: StatusType;
}

const initialClients: Client[] = [
  { id: 1, name: "João Silva", cpf: "123.456.789-00", email: "joao@email.com", phone: "(11) 99999-0001", city: "São Paulo", state: "SP", segment: "VIP", totalPurchases: 12450, lastPurchase: "15/03/2026", marketingConsent: true, status: "ativo" },
  { id: 2, name: "Pedro Santos", cpf: "234.567.890-11", email: "pedro@email.com", phone: "(21) 98888-0002", city: "Rio de Janeiro", state: "RJ", segment: "Social", totalPurchases: 3200, lastPurchase: "10/03/2026", marketingConsent: true, status: "ativo" },
  { id: 3, name: "Lucas Oliveira", cpf: "345.678.901-22", email: "lucas@email.com", phone: "(31) 97777-0003", city: "Belo Horizonte", state: "MG", segment: "Promoção", totalPurchases: 890, lastPurchase: "01/02/2026", marketingConsent: false, status: "ativo" },
  { id: 4, name: "Rafael Costa", cpf: "456.789.012-33", email: "rafael@email.com", phone: "(41) 96666-0004", city: "Curitiba", state: "PR", segment: "VIP", totalPurchases: 8900, lastPurchase: "12/03/2026", marketingConsent: true, status: "ativo" },
];

export default function Clientes() {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [segFilter, setSegFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", cpf: "", email: "", phone: "", city: "", state: "", segment: "Social", marketingConsent: true });

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.cpf.includes(search);
    const matchSeg = segFilter === "all" || c.segment === segFilter;
    return matchSearch && matchSeg;
  });

  const handleAdd = () => {
    if (!form.name || !form.cpf) { toast.error("Nome e CPF obrigatórios"); return; }
    setClients([...clients, { ...form, id: clients.length + 1, totalPurchases: 0, lastPurchase: "-", status: "ativo" }]);
    setOpen(false);
    toast.success("Cliente cadastrado!");
    setForm({ name: "", cpf: "", email: "", phone: "", city: "", state: "", segment: "Social", marketingConsent: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Clientes</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Novo Cliente</Button></DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Cadastrar Cliente</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Nome completo *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="CPF *" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} />
              <Input placeholder="E-mail" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Telefone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Cidade" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                <Input placeholder="Estado" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
              </div>
              <Select value={form.segment} onValueChange={v => setForm({ ...form, segment: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["VIP","Social","Promoção"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox checked={form.marketingConsent} onCheckedChange={v => setForm({ ...form, marketingConsent: !!v })} />
                <label className="text-sm">Autoriza marketing</label>
              </div>
              <Button onClick={handleAdd} className="w-full">Cadastrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou CPF..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={segFilter} onValueChange={setSegFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Segmento" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {["VIP","Social","Promoção"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead><TableHead>CPF</TableHead><TableHead>Cidade/UF</TableHead>
                  <TableHead>Segmento</TableHead><TableHead>Total Compras</TableHead><TableHead>Última Compra</TableHead>
                  <TableHead>Marketing</TableHead><TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="font-mono text-sm">{c.cpf}</TableCell>
                    <TableCell>{c.city}/{c.state}</TableCell>
                    <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.segment === "VIP" ? "bg-yellow-100 text-yellow-700" : c.segment === "Social" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{c.segment}</span></TableCell>
                    <TableCell>R$ {c.totalPurchases.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{c.lastPurchase}</TableCell>
                    <TableCell>{c.marketingConsent ? "✓" : "✗"}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
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
