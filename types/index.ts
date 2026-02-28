// BuildFlow — Global TypeScript Types

export type Plan = "FREE" | "PRO" | "ENTERPRISE";
export type Role = "ADMIN" | "PROJECT_MANAGER" | "SUPERVISOR" | "SUBCONTRACTOR" | "VIEWER";
export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD" | "DELAYED" | "CANCELLED";
export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";
export type TaskType = "TASK" | "MILESTONE" | "PROJECT";
export type OrderStatus = "PENDING" | "ORDERED" | "DELIVERED" | "CANCELLED";
export type PaymentType = "RECEIVED" | "EXPENSE";
export type SubcontractStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";
export type ChangeStatus = "PENDING" | "APPROVED" | "REJECTED";
export type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";

// ─── Organization ───────────────────────────
export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  plan: Plan;
  stripeCustomerId?: string | null;
  planExpiresAt?: Date | null;
  createdAt: Date;
}

// ─── User ────────────────────────────────────
export interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  locale: "el" | "en";
  role?: Role;
  createdAt: Date;
}

// ─── Project ─────────────────────────────────
export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  client?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  status: ProjectStatus;
  startDate?: Date | null;
  endDate?: Date | null;
  budget?: number | null;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  // Computed
  progress?: number;
  spent?: number;
  usersCount?: number;
}

// ─── Task (Gantt) ─────────────────────────────
export interface Task {
  id: string;
  projectId: string;
  parentId?: string | null;
  title: string;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  progress: number;
  color?: string | null;
  type: TaskType;
  order: number;
  children?: Task[];
}

// ─── Invoice ─────────────────────────────────
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  client: string;
  clientAddress?: string | null;
  clientVat?: string | null;
  issueDate: Date;
  dueDate?: Date | null;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  status: InvoiceStatus;
  notes?: string | null;
  projectId?: string | null;
  project?: { name: string } | null;
  createdAt: Date;
}

// ─── Financial ───────────────────────────────
export interface Order {
  id: string;
  projectId: string;
  title: string;
  description?: string | null;
  supplier?: string | null;
  amount: number;
  status: OrderStatus;
  orderedAt?: Date | null;
  deliveredAt?: Date | null;
  createdAt: Date;
}

export interface Payment {
  id: string;
  projectId: string;
  title: string;
  amount: number;
  type: PaymentType;
  paidAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
}

export interface Subcontract {
  id: string;
  projectId: string;
  company: string;
  contactName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  description?: string | null;
  amount: number;
  status: SubcontractStatus;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt: Date;
}

export interface Change {
  id: string;
  projectId: string;
  title: string;
  description?: string | null;
  amount?: number | null;
  status: ChangeStatus;
  requestedAt: Date;
  approvedAt?: Date | null;
  createdAt: Date;
}

// ─── Dashboard KPIs ───────────────────────────
export interface DashboardKPIs {
  activeProjects: number;
  totalBudget: number;
  monthlyPayments: number;
  delays: number;
  completedProjects: number;
  totalUsers: number;
  totalDocuments: number;
  totalInvoices: number;
}

// ─── Subscription Plans ───────────────────────
export interface PlanConfig {
  name: string;
  maxProjects: number;
  maxUsers: number;
  features: string[];
  priceMonthly: number;
  priceYearly: number;
}

export const PLAN_CONFIG: Record<Plan, PlanConfig> = {
  FREE: {
    name: "Free",
    maxProjects: 2,
    maxUsers: 3,
    features: ["2 Έργα", "3 Χρήστες", "Βασικά εργαλεία", "1GB αποθήκευση"],
    priceMonthly: 0,
    priceYearly: 0,
  },
  PRO: {
    name: "Pro",
    maxProjects: 10,
    maxUsers: -1, // unlimited
    features: ["10 Έργα", "Απεριόριστοι χρήστες", "Gantt Chart", "PDF εξαγωγή", "50GB αποθήκευση", "Προτεραιότητα υποστήριξης"],
    priceMonthly: 49,
    priceYearly: 39,
  },
  ENTERPRISE: {
    name: "Enterprise",
    maxProjects: -1,
    maxUsers: -1,
    features: ["Απεριόριστα έργα", "Απεριόριστοι χρήστες", "Όλα τα features", "500GB αποθήκευση", "Dedicated support", "Custom integrations"],
    priceMonthly: 149,
    priceYearly: 119,
  },
};
