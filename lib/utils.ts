import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { el, enUS } from "date-fns/locale";

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, locale: "el" | "en" = "el"): string {
  return new Intl.NumberFormat(locale === "el" ? "el-GR" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(
  date: Date | string,
  fmt = "dd/MM/yyyy",
  locale: "el" | "en" = "el"
): string {
  return format(new Date(date), fmt, {
    locale: locale === "el" ? el : enUS,
  });
}

// Format file size
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Status label translations
export const STATUS_LABELS = {
  el: {
    ACTIVE: "Ενεργό",
    COMPLETED: "Ολοκληρωμένο",
    ON_HOLD: "Σε Αναμονή",
    DELAYED: "Καθυστέρηση",
    CANCELLED: "Ακυρωμένο",
    DRAFT: "Πρόχειρο",
    SENT: "Απεστάλη",
    PAID: "Πληρώθηκε",
    OVERDUE: "Ληξιπρόθεσμο",
    PENDING: "Εκκρεμές",
    APPROVED: "Εγκρίθηκε",
    REJECTED: "Απορρίφθηκε",
    ORDERED: "Παραγγέλθηκε",
    DELIVERED: "Παραδόθηκε",
  },
  en: {
    ACTIVE: "Active",
    COMPLETED: "Completed",
    ON_HOLD: "On Hold",
    DELAYED: "Delayed",
    CANCELLED: "Cancelled",
    DRAFT: "Draft",
    SENT: "Sent",
    PAID: "Paid",
    OVERDUE: "Overdue",
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    ORDERED: "Ordered",
    DELIVERED: "Delivered",
  },
};

// Status → CSS class
export function statusClass(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: "status-active",
    COMPLETED: "status-completed",
    PAID: "status-active",
    APPROVED: "status-active",
    DELIVERED: "status-active",
    DELAYED: "status-delayed",
    OVERDUE: "status-delayed",
    REJECTED: "status-delayed",
    ON_HOLD: "status-pending",
    PENDING: "status-pending",
    DRAFT: "status-pending",
    SENT: "status-pending",
    ORDERED: "status-pending",
    CANCELLED: "status-cancelled",
  };
  return map[status] ?? "status-pending";
}

// Generate slug from name
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[αάâä]/g, "a").replace(/[εέ]/g, "e").replace(/[ηή]/g, "i")
    .replace(/[ιίϊΐ]/g, "i").replace(/[οό]/g, "o").replace(/[υύϋΰ]/g, "y")
    .replace(/[ωώ]/g, "o").replace(/[θ]/g, "th").replace(/[χ]/g, "ch")
    .replace(/[ψ]/g, "ps").replace(/[ξ]/g, "x")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Check plan limits
export function isWithinPlanLimit(
  plan: string,
  resource: "projects" | "users",
  current: number
): boolean {
  const limits: Record<string, Record<string, number>> = {
    FREE:       { projects: 2,  users: 3 },
    PRO:        { projects: 10, users: Infinity },
    ENTERPRISE: { projects: Infinity, users: Infinity },
  };
  return current < (limits[plan]?.[resource] ?? 0);
}
