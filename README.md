# NexaCampus SchoolMaker Extension

Instant Subdomain Provisioning & Dynamic Module Configuration Engine.

# NexaCampus SchoolMaker (`schoolapp-nexacampus-maker`)

[![Extension for NexaCampus](https://img.shields.io/badge/Extension%20for-nexaCampus%2Fschool--webapp-0A192F.svg?style=flat-square&logo=github)](https://github.com/nexaCampus/school-webapp)
[![Live Production App](https://img.shields.io/badge/Production%20Studio-Live%20on%20Vercel-005036.svg?style=flat-square)](https://school-webapp-self.vercel.app/maker)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.27-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](./LICENSE)

> **Official Multi-Tenant School App Creator Studio & Extension for the NexaCampus Web App Platform.**  
> Enables School Founders, Presidents, Principals, Trustees, and IT Administrators to create, configure, and instantly provision custom accredited school portals with selective micro-module access.

---

## 🏛️ System Overview & Extension Architecture

**SchoolMaker** is designed as a modular extension of the core [NexaCampus School Web App](https://github.com/nexaCampus/school-webapp). While the primary `school-webapp` serves the live academic day-to-day operations (students, parents, teachers, timetable, notices), **SchoolMaker** operates as the administrative creation engine.

```
┌─────────────────────────────────────────────────────────────────────────┐
│               NexaCampus Ecosystem Architecture                         │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌─────────────────────────────────┐             ┌─────────────────────────────────┐
│     nexaCampus/school-webapp    │             │   schoolapp-nexacampus-maker    │
│       (Primary Web Twin)        │             │      (Creator Extension)        │
├─────────────────────────────────┤             ├─────────────────────────────────┤
│ • Student / Parent Dashboards   │ ◄────────── │ • Standalone Studio Package     │
│ • Academic Day-to-Day Modules   │  Extension  │ • Dedicated Phone Auth & OTP    │
│ • Live Route Guard (/maker)     │  Mounting   │ • Role & Capacity Configuration │
│ • Multi-Campus Discovery        │             │ • Modular Micro-Module Engine   │
└─────────────────────────────────┘             └─────────────────────────────────┘
```

### Key Differentiators
1. **Isolated Creator Authentication**: Independent from student/parent student-ID and Google OAuth flows. Creators log in via phone number with verified OTP.
2. **Dual-Mode Consumption**:
   - **Embedded Extension**: Consumed directly by `school-webapp` under `/maker`.
   - **Standalone Studio Application**: Can be booted independently via its own Next.js runner for dedicated SaaS onboarding.
3. **Strict Academic Aesthetic**: Built in accordance with the **Anti-AI Generated Design Manifesto**—no generic purple blobs or floating icons. Grounded Oxford Navy (`#0A192F`), Heritage Burgundy (`#721121`), Forest Cypress (`#1B382B`), and warm Parchment (`#FDFBF7`).

---

## 🚀 Creation Engine Workflow

The SchoolMaker wizard guides institutional leaders through four structured phases:

### Phase 1: Creator Phone Verification & Session Initialization
- **Phone Verification**: 10-digit mobile number entry with instant OTP verification.
- **Session Isolation**: Creator credentials are kept strictly separated from regular student sessions in `schoolmaker_creator_session`.
- **Account Controls**: Instant account switching and secure logout.

### Phase 2: Institutional Leadership Role & Governance
Creators select their official administrative post:
- 👑 **Founder / Chairman** — Vision, trust governance, and campus charter.
- 🏛️ **President** — Executive board administration and institutional oversight.
- 🎓 **Principal / Headmaster** — Academic governance, curriculum standards, and faculty leadership.
- 🛡️ **Trustee / Board Member** — Fiduciary compliance, infrastructure, and policy oversight.
- 📋 **Director** — Operational, administrative, and strategic campus expansion.
- 💻 **IT Administrator / Tech Lead** — Systems integration, portal deployment, and RBAC governance.

### Phase 3: School Profile & Institutional Sizing
High-density academic data collection:
- **Institution Name**: Official registered title (e.g., *St. Xavier's Collegiate School*, *Delhi Public School*).
- **Faculty Headcount**: Exact number of teachers present in the school (numeric counter + quick-select bands: 25, 60, 120, 250+).
- **Student Enrollment**: Target student body capacity.
- **Affiliation Board**: CISCE / ICSE, CBSE, State Board, International Baccalaureate (IB), Cambridge (CAIE).
- **Campus Location**: City and State / Territory.
- **Portal Subdomain**: Instant subdomain preview (e.g., `https://greenwood.nexacampus.com`).

### Phase 4: Selective Micro-Module Provisioning
Institutional leaders toggle precisely the micro-modules required for their campus:

| Module | Description | Access Scope |
|---|---|---|
| 🍱 **Canteen Access** | Smart meal pre-ordering, RFID wallet balance, dietary tags | Students, Staff, Kitchen |
| 🚌 **Bus & Fleet Access** | Live GPS telematics, route waypoints, driver dispatch | Transport Desk, Parents |
| 📚 **Library Access** | ISBN cataloging, digital issue slips, overdue tracking | Students, Librarians |
| 📋 **Attendance Access** | Period-wise roll call, RFID gates, parent notification | Class Teachers, Admin |
| 📖 **Homework Diary** | Daily assignments, worksheet attachments, completion audits | Teachers, Students |
| 📊 **Exams & Marksheets** | Term exam schedules, admit cards, GPA gradebook | Exam Cell, Parents |
| ⏰ **Timetable & Bell Stream** | Conflict-free master schedule, subject periods, break alerts | All Campus Roles |
| 💳 **Fee & Accounts Portal** | Online tuition settlement, fee receipt downloads | Accounts Office, Parents |
| 🎟️ **E-Hallpass Access** | Time-stamped hall movements, teacher digital signatures | Discipline Committee |
| 🎨 **Clubs & Societies** | Extracurricular registrations, events calendar | Club Mentors, Students |
| 🩺 **Health & Clinic** | Medical records, infirmary logs, emergency contact dispatch | Campus Nurse, Parents |
| 📢 **Circulars & Notices** | Timestamped official notices, downloadable signed circulars | Public, Faculty, Parents |
| 🤝 **Parent-Teacher Meeting (PTM)** | Slot booking, feedback summaries, teacher calendars | Parents, Faculty |
| 🛍️ **Uniform & Book Store** | Kit reservations, school bookstore requisition | Campus Store, Parents |
| 🔍 **Lost & Found** | Item claim board with custodial logs | Custodial Desk, Students |

---

## 💻 Integration Guide (Using as an Extension)

### 1. As an NPM Package / Workspace Dependency

Add `@nexacampus/schoolapp-maker` to your host project dependencies:

```bash
npm install git+https://github.com/nexaCampus/schoolapp-nexacampus-maker.git
```

### 2. Consuming Components in `school-webapp`

Import the modular components into any Next.js route:

```tsx
import React, { useState } from 'react';
import {
  SchoolMakerHeader,
  SchoolMakerAuthModal,
  SchoolMakerWizard,
  SchoolMakerGeneratedApp,
  type CreatorSession,
  type SchoolAppConfig,
} from '@nexacampus/schoolapp-maker';

export default function CustomMakerRoute() {
  const [session, setSession] = useState<CreatorSession | null>(null);
  const [school, setSchool] = useState<SchoolAppConfig | null>(null);

  return (
    <div>
      <SchoolMakerHeader
        session={session}
        onLoginClick={() => {/* open login */}}
        onLogoutClick={() => setSession(null)}
      />
      {!session ? (
        <p>Please log in with your phone number.</p>
      ) : school ? (
        <SchoolMakerGeneratedApp
          config={school}
          onReconfigure={() => setSchool(null)}
          onCreateNew={() => setSchool(null)}
        />
      ) : (
        <SchoolMakerWizard
          session={session}
          onComplete={(newConfig) => setSchool(newConfig)}
        />
      )}
    </div>
  );
}
```

---

## 🛠️ Standalone Development Setup

To run the SchoolMaker Studio independently:

### Prerequisites
- Node.js 18.x or 20.x+
- npm 9.x+

### Steps

```bash
# 1. Clone repository
git clone https://github.com/nexaCampus/schoolapp-nexacampus-maker.git
cd schoolapp-nexacampus-maker

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build and Verification

```bash
# Verify TypeScript definitions & compile production output
npm run build

# Start production server
npm start
```

---

## 📁 Repository Directory Structure

```
schoolapp-nexacampus-maker/
├── .gitignore
├── LICENSE                          # Apache-2.0 License
├── README.md                        # Institutional Extension Documentation
├── package.json                     # NPM package definition & Next.js scripts
├── tsconfig.json                    # Strict TypeScript configuration
├── tailwind.config.js               # Academic Fluidity design tokens
├── postcss.config.mjs               # PostCSS compilation config
├── index.ts                         # Root package extension barrel exports
├── app/
│   ├── layout.tsx                   # Studio root layout with Google typography
│   ├── globals.css                  # Tailored CSS variables & Tailwind directives
│   └── page.tsx                     # Standalone SchoolMaker Studio application
└── components/
    ├── SchoolMakerFooter.tsx        # Institutional footer with cross-repo links
    └── maker/
        ├── index.ts                 # Component library barrel export
        ├── SchoolMakerHeader.tsx    # Creator session bar with phone badge & logout
        ├── SchoolMakerAuthModal.tsx # Encrypted phone authentication & OTP modal
        ├── SchoolMakerWizard.tsx    # 3-step creation engine with role & module access
        └── SchoolMakerGeneratedApp.tsx # Interactive live portal simulator & dashboard
```

---

## 🛡️ Security, Privacy & Compliance

This extension enforces the security policies established in the NexaCampus platform:

- **Strict Route Isolation**: SchoolMaker routes (`/maker`) bypass regular student admission guards while maintaining independent creator verification.
- **Principle of Least Privilege**: Modules not selected during creation are completely disabled in the generated app state.
- **Data Classification**: Phone numbers and school metadata are kept encrypted in transit (TLS 1.3 / HTTPS) and strictly scoped to creator sessions.
- **No Third-Party Trackers**: Zero telemetry scripts or unverified third-party ad pixels.

---

## 🤝 Cross-Repository Links

- **Parent Application**: [nexaCampus/school-webapp](https://github.com/nexaCampus/school-webapp)
- **Production URL**: [https://school-webapp-self.vercel.app](https://school-webapp-self.vercel.app)
- **Live Maker Studio**: [https://school-webapp-self.vercel.app/maker](https://school-webapp-self.vercel.app/maker)

---

## 📄 License

Licensed under the **Apache License, Version 2.0**. See [LICENSE](./LICENSE) for full details.
