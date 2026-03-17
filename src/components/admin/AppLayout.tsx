import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  const isAuthenticated = localStorage.getItem("admin_authenticated") === "true";
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border bg-background px-4 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <span className="text-sm text-muted-foreground font-medium">Painel Administrativo</span>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
