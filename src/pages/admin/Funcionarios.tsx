import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge, { type StatusType } from "@/components/admin/StatusBadge";
import { toast } from "sonner";

interface Employee {
  id: number; name: string; role: string; permission: string;
  email: string; phone: string; hireDate: string; status: StatusType;
}

const initialEmployees: Employee[] = [
  { id: 1, name: "Carlos Mendes", role: "Gerente", permission: "Admin", email: "carlos@urbanstyles.com", phone: "(11) 99999-1001", hireDate: "10/01/2024", status: "ativo" },
  { id: 2, name: "Ana Souza", role: "Vendedora", permission: "Vendedor", email: "ana@urbanstyles.com", phone: "(11) 99999-1002", hireDate: "15/03/2024", status: "ativo" },
  { id: 3, name: "Bruno Lima", role: "Vendedor", permission: "Vendedor", email: "bruno@urbanstyles.com", phone: "(11) 99999-1003", hireDate: "01/06/2024", status: "ativo" },
  { id: 4, name: "Daniela Rocha", role: "Caixa", permission: "Caixa", email: "daniela@urbanstyles.com", phone: "(11) 99999-1004", hireDate: "20/09/2024", status: "inativo" },
];

export default function Funcionarios() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Vendedor", permission: "Vendedor", email: "", phone: "" });

  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.name) { toast.error("Nome obrigatório"); return; }
    setEmployees([...employees, { ...form, id: employees.length + 1, hireDate: new Date().toLocaleDateString("pt-BR"), status: "ativo" as StatusType }]);
    setOpen(false); toast.success("Funcionário cadastrado!");
    setForm({ name: "", role: "Vendedor", permission: "Vendedor", email: "", phone: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Funcionários</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Novo Funcionário</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Cadastrar Funcionário</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Nome completo *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Select value={form.role} onValueChange={v => setForm({ ...form, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Gerente","Vendedor","Caixa","Estoquista"].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={form.permission} onValueChange={v => setForm({ ...form, permission: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Admin","Gerente","Vendedor","Caixa"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="E-mail" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Telefone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <Button onClick={handleAdd} className="w-full">Cadastrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar funcionário..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead><TableHead>Cargo</TableHead><TableHead>Permissão</TableHead>
                  <TableHead>E-mail</TableHead><TableHead>Admissão</TableHead><TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(e => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.role}</TableCell>
                    <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${e.permission === "Admin" ? "bg-red-100 text-red-700" : e.permission === "Gerente" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{e.permission}</span></TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{e.hireDate}</TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
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
