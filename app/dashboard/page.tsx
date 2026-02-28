import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { BudgetChart } from "@/components/dashboard/BudgetChart";
import { MonthlyStats } from "@/components/dashboard/MonthlyStats";

async function getDashboardData(organizationId: string) {
  const [
    projects,
    payments,
    invoices,
    notifications,
    changes,
  ] = await Promise.all([
    db.project.findMany({
      where: { organizationId },
      include: { _count: { select: { users: true } } },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    db.payment.findMany({
      where: {
        project: { organizationId },
        paidAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
      },
    }),
    db.invoice.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.notification.findMany({
      where: { userId: (await auth())?.user.id ?? "" },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    db.change.findMany({
      where: { project: { organizationId }, status: "PENDING" },
    }),
  ]);

  const activeProjects = projects.filter((p) => p.status === "ACTIVE").length;
  const delayedProjects = projects.filter((p) => p.status === "DELAYED").length;
  const totalBudget = projects.reduce(
    (sum, p) => sum + Number(p.budget ?? 0),
    0
  );
  const monthlyPayments = payments
    .filter((p) => p.type === "RECEIVED")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return {
    kpis: {
      activeProjects,
      totalBudget,
      monthlyPayments,
      delays: delayedProjects,
      completedProjects: projects.filter((p) => p.status === "COMPLETED").length,
      pendingChanges: changes.length,
      totalInvoices: invoices.length,
    },
    projects,
    notifications,
    invoices,
  };
}

export default async function DashboardPage() {
  const session = await auth();
  const orgId = session?.user.organizationId;

  if (!orgId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="font-syne text-xl mb-2">Καλώς ήρθατε στο BuildFlow!</h2>
          <p className="text-muted">Δημιουργήστε ή rejoins μια εταιρεία για να ξεκινήσετε.</p>
        </div>
      </div>
    );
  }

  const data = await getDashboardData(orgId);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-syne font-bold">Dashboard</h1>
        <p className="text-sm text-muted mt-1">
          Επισκόπηση όλων των έργων σας
        </p>
      </div>

      {/* KPIs */}
      <KpiCards kpis={data.kpis} />

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <RecentProjects projects={data.projects} />
        </div>
        <div>
          <ActivityFeed notifications={data.notifications} />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-5">
        <BudgetChart projects={data.projects} />
        <MonthlyStats kpis={data.kpis} />
      </div>
    </div>
  );
}
