"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface BudgetChartProps {
  projects: { budget?: number | null; status: string; name: string }[];
}

const COLORS = ["#3d7fff", "#f5a623", "#2de08e", "#ff4d6d", "#a855f7", "#06b6d4"];

export function BudgetChart({ projects }: BudgetChartProps) {
  const data = projects
    .filter((p) => p.budget && Number(p.budget) > 0)
    .map((p) => ({
      name: p.name.length > 20 ? p.name.slice(0, 20) + "…" : p.name,
      value: Number(p.budget),
    }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Κατανομή Προϋπολογισμού</h2>
        </div>
        <div className="card-body flex items-center justify-center h-48 text-muted text-sm">
          Δεν υπάρχουν δεδομένα ακόμα.
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Κατανομή Προϋπολογισμού</h2>
        <span className="text-sm font-syne font-bold text-accent">
          {formatCurrency(total)}
        </span>
      </div>
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="w-40 h-40 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    background: "#151820",
                    border: "1px solid #252a3a",
                    borderRadius: "8px",
                    color: "#e8eaf0",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-2.5">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-muted flex-1 truncate">{entry.name}</span>
                <span className="text-xs font-semibold">
                  {formatCurrency(entry.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
