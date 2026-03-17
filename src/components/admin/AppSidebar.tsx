import {
  LayoutDashboard, ShoppingCart, Package, Users, Truck, UserCog,
  BarChart3, Store, TrendingUp, Boxes, LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Vendas", url: "/admin/dashboard-vendas", icon: TrendingUp },
  { title: "PDV", url: "/admin/vendas", icon: ShoppingCart },
];

const adminItems = [
  { title: "Produtos", url: "/admin/produtos", icon: Package },
  { title: "Clientes", url: "/admin/clientes", icon: Users },
  { title: "Estoque", url: "/admin/estoque", icon: Boxes },
  { title: "Fornecedores", url: "/admin/fornecedores", icon: Truck },
  { title: "Funcionários", url: "/admin/funcionarios", icon: UserCog },
  { title: "Relatórios", url: "/admin/relatorios", icon: BarChart3 },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/admin/login");
  };

  const renderItems = (items: typeof mainItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end={item.url === "/admin"}
            className="hover:bg-accent/50 rounded-lg px-3 py-2 flex items-center gap-3"
            activeClassName="bg-primary/10 text-primary font-semibold"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4 mb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary shrink-0" />
            {!collapsed && <span className="font-display font-bold text-lg">URBAN STYLES</span>}
          </div>
          {!collapsed && <p className="text-xs text-muted-foreground mt-1">Painel Administrativo</p>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administração</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(adminItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          {!collapsed && "Sair"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
