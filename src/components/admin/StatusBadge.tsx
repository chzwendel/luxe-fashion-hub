import { cn } from "@/lib/utils";

type StatusType = "ativo" | "inativo" | "pendente" | "concluido" | "cancelado" | "em_andamento";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  ativo: { label: "Ativo", className: "bg-green-100 text-green-700" },
  inativo: { label: "Inativo", className: "bg-muted text-muted-foreground" },
  pendente: { label: "Pendente", className: "bg-yellow-100 text-yellow-700" },
  concluido: { label: "Concluído", className: "bg-blue-100 text-blue-700" },
  cancelado: { label: "Cancelado", className: "bg-red-100 text-red-700" },
  em_andamento: { label: "Em andamento", className: "bg-purple-100 text-purple-700" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", config.className, className)}>
      {config.label}
    </span>
  );
}

export type { StatusType };
