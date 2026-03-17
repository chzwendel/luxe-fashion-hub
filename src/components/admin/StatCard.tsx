import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  className?: string;
}

export default function StatCard({ title, value, icon: Icon, change, changeLabel, className }: StatCardProps) {
  return (
    <Card className={cn("border-none shadow-md bg-card", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold font-display text-foreground">{value}</p>
            {change !== undefined && (
              <p className={cn("text-xs font-medium", change >= 0 ? "text-green-600" : "text-red-500")}>
                {change >= 0 ? "+" : ""}{change}% {changeLabel || "vs ontem"}
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
