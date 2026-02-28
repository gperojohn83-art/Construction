import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrency, statusClass } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/utils";
import type { Project } from "@/types";

interface RecentProjectsProps {
  projects: (Project & { _count?: { users: number } })[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Τρέχοντα Έργα</h2>
        <Link
          href="/projects"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          Όλα <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="divide-y divide-border">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-muted text-sm">
            Δεν υπάρχουν έργα ακόμα.{" "}
            <Link href="/projects/new" className="text-primary hover:underline">
              Δημιουργήστε το πρώτο σας!
            </Link>
          </div>
        ) : (
          projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}/overview`}>
              <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface2 transition-colors cursor-pointer">
                {/* Color indicator */}
                <div
                  className="w-1 h-10 rounded-full flex-shrink-0"
                  style={{ background: project.color }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{project.name}</div>
                  <div className="text-[11px] text-muted mt-0.5 truncate">
                    {project.client ?? "—"}
                  </div>
                </div>

                {/* Budget */}
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold">
                    {project.budget ? formatCurrency(Number(project.budget)) : "—"}
                  </div>
                  <div className="text-[11px] text-muted">Π/Υ</div>
                </div>

                {/* Progress */}
                <div className="w-20 hidden md:block">
                  <div className="flex justify-between text-[10px] text-muted mb-1">
                    <span>Πρόοδος</span>
                    <span style={{ color: project.color }}>
                      {project.progress ?? 0}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${project.progress ?? 0}%`,
                        background: project.color,
                      }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <span className={`status-badge ${statusClass(project.status)}`}>
                    {STATUS_LABELS.el[project.status as keyof typeof STATUS_LABELS.el] ?? project.status}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
