import { formatDate } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}

const TYPE_ICONS: Record<string, string> = {
  payment: "💰",
  document: "📄",
  change: "⚠️",
  subcontract: "🤝",
  photo: "📸",
  invoice: "🧾",
  project: "🏗️",
  info: "ℹ️",
};

export function ActivityFeed({ notifications }: { notifications: Notification[] }) {
  return (
    <div className="card h-full">
      <div className="card-header">
        <h2 className="card-title">Πρόσφατη Δραστηριότητα</h2>
        {notifications.filter((n) => !n.isRead).length > 0 && (
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
            {notifications.filter((n) => !n.isRead).length} νέα
          </span>
        )}
      </div>
      <div className="divide-y divide-border">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-muted text-sm">
            Καμία δραστηριότητα ακόμα.
          </div>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className="flex gap-3 px-4 py-3 hover:bg-surface2 transition-colors">
              <div className="w-7 h-7 rounded-md bg-surface2 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                {TYPE_ICONS[notif.type] ?? "ℹ️"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{notif.title}</div>
                <div className="text-[11px] text-muted mt-0.5 line-clamp-1">{notif.body}</div>
                <div className="text-[10px] text-muted/70 mt-1">
                  {formatDate(notif.createdAt, "dd MMM, HH:mm")}
                </div>
              </div>
              {!notif.isRead && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
