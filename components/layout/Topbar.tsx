"use client";

import { useState } from "react";
import { Bell, Search, Plus, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TopbarProps {
  userName: string;
  userImage?: string | null;
}

const PAGE_ACTIONS: Record<string, { label: string; href: string }> = {
  "/dashboard":  { label: "+ Νέο Έργο",      href: "/projects/new" },
  "/projects":   { label: "+ Νέο Έργο",      href: "/projects/new" },
  "/invoices":   { label: "+ Νέο Τιμολόγιο", href: "/invoices/new" },
  "/team":       { label: "+ Νέος Χρήστης",  href: "/team/invite" },
};

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":    "Dashboard",
  "/projects":     "Έργα",
  "/invoices":     "Τιμολόγια",
  "/team":         "Ομάδα",
  "/settings":     "Ρυθμίσεις",
  "/calendar":     "Ημερολόγιο",
  "/messages":     "Μηνύματα",
  "/gantt":        "Gantt Chart",
  "/budget":       "Προϋπολογισμός",
  "/orders":       "Εντολές",
  "/subcontracts": "Υπεργολαβίες",
  "/documents":    "Έγγραφα",
  "/photos":       "Φωτογραφίες",
};

export function Topbar({ userName }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<"el" | "en">("el");
  const [search, setSearch] = useState("");

  const title =
    Object.entries(PAGE_TITLES).find(([path]) => pathname.startsWith(path))?.[1] ??
    "BuildFlow";

  const action =
    Object.entries(PAGE_ACTIONS).find(([path]) => pathname.startsWith(path))?.[1];

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center px-7 gap-4 flex-shrink-0">
      {/* Title */}
      <h1 className="font-syne text-lg font-bold flex-1 truncate">{title}</h1>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Αναζήτηση..."
          className="bg-surface2 border border-border rounded-md pl-8 pr-4 py-2 text-sm text-foreground
                     placeholder:text-muted outline-none focus:border-primary transition-colors w-52"
        />
      </div>

      {/* Language toggle */}
      <div className="flex bg-surface2 border border-border rounded-md overflow-hidden text-[11px] font-semibold">
        {(["el", "en"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={cn(
              "px-3 py-1.5 transition-colors uppercase",
              locale === lang
                ? "bg-accent text-black"
                : "text-muted hover:text-foreground"
            )}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 bg-surface2 border border-border rounded-md flex items-center justify-center hover:bg-border transition-colors">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full border border-surface" />
      </button>

      {/* CTA */}
      {action && (
        <button
          onClick={() => router.push(action.href)}
          className="bg-accent text-black font-syne font-bold text-sm px-4 py-2 rounded-md
                     hover:bg-accent/85 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          {action.label}
        </button>
      )}
    </header>
  );
}
