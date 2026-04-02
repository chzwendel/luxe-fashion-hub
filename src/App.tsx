import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AppLayout from "./components/admin/AppLayout";
import Dashboard from "./pages/admin/Dashboard";
import DashboardVendas from "./pages/admin/DashboardVendas";
import Produtos from "./pages/admin/Produtos";
import Clientes from "./pages/admin/Clientes";
import Vendas from "./pages/admin/Vendas";
import Estoque from "./pages/admin/Estoque";
import Fornecedores from "./pages/admin/Fornecedores";
import Funcionarios from "./pages/admin/Funcionarios";
import Relatorios from "./pages/admin/Relatorios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Loja */}
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/minha-conta" element={<MyAccount />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard-vendas" element={<DashboardVendas />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path="fornecedores" element={<Fornecedores />} />
            <Route path="funcionarios" element={<Funcionarios />} />
            <Route path="relatorios" element={<Relatorios />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
