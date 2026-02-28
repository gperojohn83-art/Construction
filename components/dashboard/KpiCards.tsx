import { TrendingUp, TrendingDown, Building2, Wallet, CreditCard, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface KpiCardsProps {
  kpis: {
    activeProjects: number;
    totalBudget: number;
    monthlyPayments: number;
    delays: number;
    completedProjects: number;
    pendingChanges: number;
    totalInvoices: number;
  };
}

export function KpiCards({ kpis }: KpiCardsProps) {
  const cards = [
    {
      label: "Ενεργά Έργα",
      value: kpis.activeProjects.toString(),
      change: `+${kpis.completedProjects} ολοκληρωμένα`,
      trend: "up" as const,
      icon: Building2,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "hover:border-primary",
    },
    {
      label: "Συνολικός Π/Υ",
      value: formatCurrency(kpis.totalBudget),
      change: "Ενεργά έργα",
      trend: "up" as const,
      icon: Wallet,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "hover:border-accent",
    },
    {
      label: "Εισπράξεις Μήνα",
      value: formatCurrency(kpis.monthlyPayments),
      change: "Τρέχων μήνας",
      trend: "up" as const,
      icon: CreditCard,
      color: "text-success",
      bg: "bg-success/10",
      border: "hover:border-success",
    },
    {
      label: "Καθυστερήσεις",
      value: kpis.delays.toString(),
      change: kpis.pendingChanges > 0 ? `${kpis.pendingChanges} εκκρεμείς αλλαγές` : "Όλα εντός χρόνου",
      trend: kpis.delays > 0 ? ("down" as const) : ("up" as const),
      icon: AlertTriangle,
      color: kpis.delays > 0 ? "text-danger" : "text-success",
      bg: kpis.delays > 0 ? "bg-danger/10" : "bg-success/10",
      border: kpis.delays > 0 ? "hover:border-danger" : "hover:border-success",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={cn(
              "kpi-card relative overflow-hidden",
              card.border,
              `animation-delay-${i * 50}`
            )}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Background glow */}
            <div
              className={cn(
                "absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10",
                card.bg
              )}
            />
            <div className="flex items-start justify-between mb-3">
              <div className={cn("p-2 rounded-md", card.bg)}>
                <Icon className={cn("w-4 h-4", card.color)} />
              </div>
            </div>
            <div className="text-[11px] uppercase tracking-widest text-muted mb-2">
              {card.label}
            </div>
            <div className={cn("font-syne text-2xl font-extrabold mb-2", card.color)}>
              {card.value}
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-[11px]",
                card.trend === "up" ? "text-success" : "text-danger"
              )}
            >
              {card.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {card.change}
            </div>
          </div>
        );
      })}
    </div>
  );
}
