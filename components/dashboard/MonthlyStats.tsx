interface MonthlyStatsProps {
  kpis: {
    activeProjects: number;
    completedProjects: number;
    totalInvoices: number;
    pendingChanges: number;
  };
}

const STATS = [
  { key: "activeProjects",    icon: "🏗️", label: "Ενεργά",    color: "#3d7fff" },
  { key: "completedProjects", icon: "✅", label: "Ολοκλ.",   color: "#2de08e" },
  { key: "totalInvoices",     icon: "🧾", label: "Τιμολ.",   color: "#f5a623" },
  { key: "pendingChanges",    icon: "⚠️", label: "Αλλαγές",  color: "#ff4d6d" },
];

export function MonthlyStats({ kpis }: MonthlyStatsProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Στατιστικά</h2>
        <span className="text-xs text-muted">Τρέχων μήνας</span>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="bg-surface2 rounded-md p-4 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div
                className="font-syne text-2xl font-extrabold mb-1"
                style={{ color: stat.color }}
              >
                {kpis[stat.key as keyof typeof kpis]}
              </div>
              <div className="text-[10px] text-muted tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
