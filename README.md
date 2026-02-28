# 🏗️ BuildFlow — Construction Management SaaS

Modern web εφαρμογή διαχείρισης κατασκευαστικών έργων, φτιαγμένη με Next.js 15, TypeScript, Prisma και Tailwind CSS.

---

## 🚀 Γρήγορη Εκκίνηση (5 βήματα)

### 1. Προαπαιτούμενα
```bash
node --version  # >= 18
npm --version   # >= 9
```

### 2. Εγκατάσταση dependencies
```bash
cd buildflow
npm install
```

### 3. Ρύθμιση περιβάλλοντος
```bash
cp .env.example .env.local
# Άνοιξε .env.local και συμπλήρωσε τις τιμές
```

**Ελάχιστες απαιτούμενες μεταβλητές για ανάπτυξη:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/buildflow"
NEXTAUTH_SECRET="any-random-string-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Βάση Δεδομένων
```bash
# Εκκίνηση PostgreSQL (με Docker)
docker run --name buildflow-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=buildflow -p 5432:5432 -d postgres

# Δημιουργία πινάκων
npm run db:push

# Seed με demo δεδομένα
npm run db:seed
```

### 5. Εκκίνηση
```bash
npm run dev
# → http://localhost:3000
```

**Demo Login:**
- Email: `admin@buildflow.demo`
- Password: `demo1234`

---

## 📁 Δομή Project

```
buildflow/
├── app/                        # Next.js App Router
│   ├── auth/                   # Login, Register
│   ├── dashboard/              # Κεντρικό dashboard
│   ├── projects/               # Λίστα & ανά έργο
│   │   └── [id]/               # Project pages
│   │       ├── overview/       # Επισκόπηση
│   │       ├── budget/         # Προϋπολογισμός
│   │       ├── gantt/          # Gantt Chart
│   │       ├── documents/      # Έγγραφα
│   │       ├── photos/         # Φωτογραφίες
│   │       ├── orders/         # Εντολές
│   │       ├── payments/       # Πληρωμές
│   │       ├── subcontracts/   # Υπεργολαβίες
│   │       ├── changes/        # Αλλαγές
│   │       └── logs/           # Ημερολόγιο
│   ├── invoices/               # Τιμολόγια
│   ├── team/                   # Χρήστες
│   └── settings/               # Ρυθμίσεις & billing
│
├── components/
│   ├── layout/                 # Sidebar, Topbar
│   ├── dashboard/              # KPIs, Charts, Activity
│   ├── projects/               # Project components
│   ├── gantt/                  # Gantt Chart
│   └── invoices/               # Invoice components
│
├── lib/
│   ├── auth.ts                 # NextAuth config
│   ├── db.ts                   # Prisma client
│   └── utils.ts                # Helpers
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Demo data
│
└── types/
    └── index.ts                # TypeScript types
```

---

## 🏗️ Τεχνολογίες

| Κατηγορία | Τεχνολογία |
|-----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Gantt | dhtmlx-gantt |
| PDF | @react-pdf/renderer |
| Files | UploadThing |
| Payments | Stripe |
| State | Zustand |
| Validation | Zod |

---

## 💳 Subscription Plans

| Plan | Έργα | Χρήστες | Τιμή |
|------|------|---------|------|
| Free | 2 | 3 | €0 |
| Pro | 10 | ∞ | €49/μήνα |
| Enterprise | ∞ | ∞ | €149/μήνα |

---

## 🗺️ Roadmap

### Phase 1 (Τώρα) ✅
- [x] Auth (Login/Register/Google OAuth)
- [x] Dashboard με KPIs
- [x] Λίστα Έργων
- [x] Database Schema

### Phase 2 (Επόμενο)
- [ ] Project Overview page
- [ ] Gantt Chart (dhtmlx)
- [ ] Τιμολόγια με PDF export
- [ ] Διαχείριση Αρχείων (UploadThing)

### Phase 3
- [ ] Stripe Subscriptions
- [ ] Mobile PWA
- [ ] Email Notifications
- [ ] Multi-language (i18n)
- [ ] Analytics

---

## 🔧 Χρήσιμες εντολές

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:studio    # Prisma Studio (GUI για DB)
npm run db:migrate   # Νέο migration
npm run db:seed      # Demo data
npm run lint         # ESLint
```

---

## 📞 Επόμενα Βήματα

1. Ρύθμιση [Supabase](https://supabase.com) για PostgreSQL (δωρεάν)
2. Ρύθμιση [UploadThing](https://uploadthing.com) για αρχεία (δωρεάν)
3. Ρύθμιση [Stripe](https://stripe.com) για subscriptions (test mode)
4. Deploy στο [Vercel](https://vercel.com) (δωρεάν)
