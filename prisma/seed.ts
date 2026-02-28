import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding BuildFlow database...");

  // Create demo organization
  const org = await db.organization.upsert({
    where: { slug: "demo-company" },
    update: {},
    create: {
      name: "Demo Κατασκευαστική ΑΕ",
      slug: "demo-company",
      plan: "PRO",
    },
  });

  // Create admin user
  const hashedPass = await bcrypt.hash("demo1234", 10);
  const user = await db.user.upsert({
    where: { email: "admin@buildflow.demo" },
    update: {},
    create: {
      name: "Γιώργης Χαρτοφύλακας",
      email: "admin@buildflow.demo",
      password: hashedPass,
      locale: "el",
    },
  });

  // Connect user to org
  await db.organizationUser.upsert({
    where: { organizationId_userId: { organizationId: org.id, userId: user.id } },
    update: {},
    create: {
      organizationId: org.id,
      userId: user.id,
      role: "ADMIN",
    },
  });

  // Create demo projects
  const projectsData = [
    {
      name: "Συγκρότημα Κατοικιών Βάρης",
      client: "Δήμος Βάρης-Βούλας",
      address: "Βάρη, Αττική",
      status: "ACTIVE",
      budget: 820000,
      color: "#3d7fff",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-06-30"),
    },
    {
      name: "Αποθηκευτικό Κέντρο Ασπρόπυργος",
      client: "Logistics SA",
      address: "Ασπρόπυργος, Αττική",
      status: "ACTIVE",
      budget: 560000,
      color: "#f5a623",
      startDate: new Date("2024-11-01"),
      endDate: new Date("2025-07-31"),
    },
    {
      name: "Ανακαίνιση Γραφείων Μαρούσι",
      client: "TechCorp AE",
      address: "Μαρούσι, Αττική",
      status: "DELAYED",
      budget: 180000,
      color: "#ff4d6d",
      startDate: new Date("2024-12-01"),
      endDate: new Date("2025-03-31"),
    },
    {
      name: "Ξενοδοχείο Μύκονος Phase 2",
      client: "Aegean Hotels",
      address: "Μύκονος, Κυκλάδες",
      status: "ACTIVE",
      budget: 1200000,
      color: "#2de08e",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2025-04-30"),
    },
  ];

  const projects = [];
  for (const pData of projectsData) {
    const project = await db.project.create({
      data: {
        ...pData,
        organizationId: org.id,
        status: pData.status as "ACTIVE" | "DELAYED",
      },
    });
    projects.push(project);

    // Add user to project
    const orgUser = await db.organizationUser.findFirst({
      where: { organizationId: org.id, userId: user.id },
    });
    if (orgUser) {
      await db.projectUser.create({
        data: { projectId: project.id, orgUserId: orgUser.id, projectRole: "MANAGER" },
      });
    }
  }

  // Seed Gantt tasks for first project
  if (projects[0]) {
    await db.task.createMany({
      data: [
        { projectId: projects[0].id, title: "Θεμέλια",    startDate: new Date("2024-09-01"), endDate: new Date("2024-11-30"), progress: 100, color: "#3d7fff", type: "TASK", order: 1 },
        { projectId: projects[0].id, title: "Σκελετός",   startDate: new Date("2024-12-01"), endDate: new Date("2025-03-31"), progress: 65,  color: "#3d7fff", type: "TASK", order: 2 },
        { projectId: projects[0].id, title: "Εξωτερικά",  startDate: new Date("2025-04-01"), endDate: new Date("2025-05-31"), progress: 0,   color: "#3d7fff", type: "TASK", order: 3 },
        { projectId: projects[0].id, title: "Παράδοση",   startDate: new Date("2025-06-30"), endDate: new Date("2025-06-30"), progress: 0,   color: "#f5a623", type: "MILESTONE", order: 4 },
      ],
    });
  }

  // Seed invoices
  await db.invoice.createMany({
    data: [
      {
        organizationId: org.id,
        projectId: projects[0]?.id,
        number: "INV-2025-042",
        client: "Δήμος Βάρης-Βούλας",
        clientAddress: "Βάρη, Αττική 16672",
        issueDate: new Date("2025-02-22"),
        dueDate: new Date("2025-03-22"),
        items: JSON.stringify([{ id: "1", description: "Εργασίες Σκελετού - Φεβρουάριος", quantity: 1, unitPrice: 19758, total: 19758 }]),
        subtotal: 19758,
        vatRate: 24,
        vatAmount: 4742,
        total: 24500,
        status: "PAID",
      },
      {
        organizationId: org.id,
        projectId: projects[2]?.id,
        number: "INV-2025-041",
        client: "TechCorp AE",
        clientAddress: "Μαρούσι, Αττική 15124",
        issueDate: new Date("2025-02-15"),
        dueDate: new Date("2025-03-15"),
        items: JSON.stringify([{ id: "1", description: "Αποξήλωση & Προετοιμασία", quantity: 1, unitPrice: 6613, total: 6613 }]),
        subtotal: 6613,
        vatRate: 24,
        vatAmount: 1587,
        total: 8200,
        status: "SENT",
      },
    ],
  });

  // Seed notifications
  await db.notification.createMany({
    data: [
      { userId: user.id, title: "Νέα Πληρωμή", body: "Εισπράχθηκε €24,500 από Δήμο Βάρης", type: "payment", isRead: false },
      { userId: user.id, title: "Καθυστέρηση Έργου", body: "Ανακαίνιση Μαρούσι: 2 εβδομάδες πίσω", type: "change", isRead: false },
      { userId: user.id, title: "Νέο Έγγραφο", body: "Ανέβηκε σχέδιο θεμελίωσης στη Βάρη", type: "document", isRead: true },
      { userId: user.id, title: "Νέος Υπεργολάβος", body: "Κ. Νικολάου προστέθηκε στην Βάρη", type: "subcontract", isRead: true },
    ],
  });

  console.log("✅ Seed complete!");
  console.log("📧 Login: admin@buildflow.demo");
  console.log("🔑 Password: demo1234");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
