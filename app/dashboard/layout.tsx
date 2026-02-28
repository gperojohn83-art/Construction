import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar
        orgName={session.user.orgName ?? "BuildFlow"}
        userName={session.user.name ?? "User"}
        userEmail={session.user.email ?? ""}
        userImage={session.user.image}
        plan={session.user.plan ?? "FREE"}
        role={session.user.role ?? "VIEWER"}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          userName={session.user.name ?? "User"}
          userImage={session.user.image}
        />
        <main className="flex-1 overflow-y-auto p-7 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
