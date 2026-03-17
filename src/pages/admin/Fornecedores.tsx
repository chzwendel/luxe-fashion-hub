import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StatusBadge, { type StatusType } from "@/components/admin/StatusBadge";
import { toast } from "sonner";

interface Supplier {
  id: number; name: string; cnpj: string; contact: string; phone: string;
  email: string; deadline: string; paymentTerms: string; status: StatusType;
}

const initialSuppliers: Supplier[] = [
  { id: 1, name: "Têxtil Brasil", cnpj: "12.345.678/0001-90", contact: "Maria", phone: "(11) 3333-0001", email: "contato@textilbrasil.com", deadline: "15 dias", paymentTerms: "30/60 dias", status: "ativo" },
  { id: 2, name: "Jeans & Co", cnpj: "23.456.789/0001-01", contact: "Roberto", phone: "(11) 3333-0002", email: "vendas@jeansco.com", deadline: "20 dias", paymentTerms: "30 dias", status: "ativo" },
  { id: 3, name: "CalçaBem", cnpj: "34.567.890/0001-12", contact: "Fernanda", phone: "(11) 3333-0003", email: "pedidos@calcabem.com", deadline: "25 dias", paymentTerms: "30/60/90 dias", status: "ativo" },
  { id: 4, name: "Acessórios Plus", cnpj: "45.678.901/0001-23", contact: "André", phone: "(11) 3333-0004", email: "vendas@acessoriosplus.com", deadline: "10 dias", paymentTerms: "À vista", status: "pendente" },
];

export default function Fornecedores() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", cnpj: "", contact: "", phone: "", email: "", deadline: "", paymentTerms: "" });

  const filtered = suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.cnpj.includes(search));

  const handleAdd = () => {
    if (!form.name || !form.cnpj) { toast.error("Nome e CNPJ obrigatórios"); return; }
    setSuppliers([...suppliers, { ...form, id: suppliers.length + 1, status: "ativo" as StatusType }]);
    setOpen(false); toast.success("Fornecedor cadastrado!");
    setForm({ name: "", cnpj: "", contact: "", phone: "", email: "", deadline: "", paymentTerms: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Fornecedores</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Novo Fornecedor</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Cadastrar Fornecedor</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Razão Social *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="CNPJ *" value={form.cnpj} onChange={e => setForm({ ...form, cnpj: e.target.value })} />
              <Input placeholder="Contato" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
              <Input placeholder="Telefone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="E-mail" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Prazo de entrega" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
              <Input placeholder="Condições de pagamento" value={form.paymentTerms} onChange={e => setForm({ ...form, paymentTerms: e.target.value })} />
              <Button onClick={handleAdd} className="w-full">Cadastrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou CNPJ..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead><TableHead>CNPJ</TableHead><TableHead>Contato</TableHead>
                  <TableHead>Prazo</TableHead><TableHead>Pagamento</TableHead><TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="font-mono text-sm">{s.cnpj}</TableCell>
                    <TableCell>{s.contact}</TableCell>
                    <TableCell>{s.deadline}</TableCell>
                    <TableCell>{s.paymentTerms}</TableCell>
                    <TableCell><StatusBadge status={s.status} /></TableCell>
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
