"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, Calendar, MessageSquare,
  GanttChartSquare, DollarSign, ShoppingCart, Handshake,
  FileText, Receipt, Image, Users, Settings, ChevronRight,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PLAN_CONFIG } from "@/types";

interface SidebarProps {
  orgName: string;
  userName: string;
  userEmail: string;
  userImage?: string | null;
  plan: string;
  role: string;
}

const NAV_SECTIONS = [
  {
    label: { el: "Γενικά", en: "General" },
    items: [
      { href: "/dashboard",  icon: LayoutDashboard, label: { el: "Dashboard",     en: "Dashboard" } },
      { href: "/projects",   icon: FolderKanban,    label: { el: "Έργα",          en: "Projects" } },
      { href: "/calendar",   icon: Calendar,        label: { el: "Ημερολόγιο",    en: "Calendar" } },
      { href: "/messages",   icon: MessageSquare,   label: { el: "Μηνύματα",      en: "Messages" }, badge: 4 },
    ],
  },
  {
    label: { el: "Έργο", en: "Project" },
    items: [
      { href: "/gantt",      icon: GanttChartSquare, label: { el: "Gantt Chart",   en: "Gantt Chart" } },
      { href: "/budget",     icon: DollarSign,       label: { el: "Προϋπολογισμός", en: "Budget" } },
      { href: "/orders",     icon: ShoppingCart,     label: { el: "Εντολές",       en: "Orders" } },
      { href: "/subcontracts",icon: Handshake,       label: { el: "Υπεργολαβίες", en: "Subcontracts" } },
      { href: "/documents",  icon: FileText,         label: { el: "Έγγραφα",       en: "Documents" } },
      { href: "/invoices",   icon: Receipt,          label: { el: "Τιμολόγια",     en: "Invoices" } },
      { href: "/photos",     icon: Image,            label: { el: "Φωτογραφίες",   en: "Photos" } },
    ],
  },
  {
    label: { el: "Διαχείριση", en: "Management" },
    items: [
      { href: "/team",       icon: Users,            label: { el: "Χρήστες",       en: "Team" } },
      { href: "/settings",   icon: Settings,         label: { el: "Ρυθμίσεις",     en: "Settings" } },
    ],
  },
];

export function Sidebar({ orgName, userName, userEmail, plan }: SidebarProps) {
  const pathname = usePathname();
  const planConfig = PLAN_CONFIG[plan as keyof typeof PLAN_CONFIG] ?? PLAN_CONFIG.FREE;

  // Initials
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="w-60 min-h-screen bg-surface border-r border-border flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <Building2 className="w-4 h-4 text-black" />
          </div>
          <div>
            <div className="font-syne font-extrabold text-lg leading-none">
              Build<span className="text-accent">Flow</span>
            </div>
            <div className="text-[9px] text-muted tracking-[2px] uppercase mt-0.5">
              Construction SaaS
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label.el} className="mb-2">
            <div className="text-[10px] font-medium tracking-[2px] uppercase text-muted px-3 py-2">
              {section.label.el}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "nav-item relative",
                      isActive && "active"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-accent rounded-r-sm" />
                    )}
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{item.label.el}</span>
                    {"badge" in item && item.badge && (
                      <span className="bg-accent text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-3">
        {/* Plan */}
        <div className="bg-accent/5 border border-accent/20 rounded-md p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent">
              {planConfig.name} Plan
            </span>
            <Link href="/settings/billing">
              <ChevronRight className="w-3 h-3 text-accent" />
            </Link>
          </div>
          <div className="text-[11px] text-muted">
            {planConfig.maxProjects === -1
              ? "Απεριόριστα έργα"
              : `${planConfig.maxProjects} έργα max`}
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-surface2 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold font-syne flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{userName}</div>
            <div className="text-[11px] text-muted truncate">{orgName}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
