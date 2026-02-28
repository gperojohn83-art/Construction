import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatCurrency, statusClass, STATUS_LABELS, formatDate } from "@/lib/utils";
import { Plus, MapPin, Users, Calendar } from "lucide-react";

async function getProjects(orgId: string) {
  return db.project.findMany({
    where: { organizationId: orgId },
    include: {
      _count: { select: { users: true, tasks: true, documents: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export default async function ProjectsPage() {
  const session = await auth();
  const projects = await getProjects(session!.user.organizationId);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-syne font-bold">Έργα</h1>
          <p className="text-sm text-muted mt-1">{projects.length} έργα συνολικά</p>
        </div>
        <Link href="/projects/new">
          <button className="bg-accent text-black font-syne font-bold text-sm px-4 py-2 rounded-md hover:bg-accent/85 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Νέο Έργο
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface border border-border rounded-md p-1 w-fit">
        {["Όλα", "Ενεργά", "Ολοκληρωμένα", "Καθυστερημένα"].map((tab, i) => (
          <div key={tab} className={`page-tab ${i === 0 ? "active" : ""}`}>{tab}</div>
        ))}
      </div>

      {projects.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">🏗️</div>
          <h3 className="font-syne text-lg font-bold mb-2">Κανένα έργο ακόμα</h3>
          <p className="text-muted text-sm mb-6">Δημιουργήστε το πρώτο σας έργο για να ξεκινήσετε.</p>
          <Link href="/projects/new">
            <button className="bg-accent text-black font-syne font-bold text-sm px-5 py-2.5 rounded-md hover:bg-accent/85 transition-colors">
              + Νέο Έργο
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}/overview`}>
              <div className="card group hover:-translate-y-1 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 cursor-pointer">
                {/* Color top bar */}
                <div
                  className="h-1.5 rounded-t-lg"
                  style={{ background: project.color }}
                />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-syne font-bold text-base truncate group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted mt-0.5 truncate">
                        {project.client ?? "—"}
                      </p>
                    </div>
                    <span className={`status-badge ${statusClass(project.status)} ml-2 flex-shrink-0`}>
                      {STATUS_LABELS.el[project.status as keyof typeof STATUS_LABELS.el]}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-surface2 rounded-md p-3 text-center">
                      <div className="text-xs text-muted mb-0.5">Π/Υ</div>
                      <div className="font-syne font-bold text-sm" style={{ color: project.color }}>
                        {project.budget ? formatCurrency(Number(project.budget)) : "—"}
                      </div>
                    </div>
                    <div className="bg-surface2 rounded-md p-3 text-center">
                      <div className="text-xs text-muted mb-0.5">Λήξη</div>
                      <div className="font-syne font-bold text-sm">
                        {project.endDate ? formatDate(project.endDate, "MMM ''yy") : "—"}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] text-muted mb-1.5">
                      <span>Πρόοδος</span>
                      <span style={{ color: project.color }} className="font-semibold">
                        {project.progress ?? 0}%
                      </span>
                    </div>
                    <div className="progress-bar h-1.5">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${project.progress ?? 0}%`,
                          background: project.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-4 text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project._count.users}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project._count.tasks} tasks
                    </span>
                    {project.address && (
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{project.address}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
