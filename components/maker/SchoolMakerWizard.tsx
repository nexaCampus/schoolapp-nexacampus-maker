'use client';

import React, { useState, useEffect } from 'react';
import { CreatorSession } from './SchoolMakerHeader';
import { checkSlugAvailability, provisionSchool } from '@/lib/api/makerClient';
import { CANONICAL_APP_HOST } from '@/lib/tenantUrls';

export interface SchoolAppConfig {
  // Creator Profile
  creatorPhone: string;
  creatorName: string;
  creatorPosition: string;

  // School Core Details
  schoolName: string;
  teacherCount: string;
  studentCapacity: string;
  board: string;
  city: string;
  state: string;
  subdomain: string;
  motto: string;
  themeColor: string;

  // Selected Modules / Feature Access
  enabledModules: {
    canteen: boolean;
    bus: boolean;
    library: boolean;
    attendance: boolean;
    diary: boolean;
    exams: boolean;
    timetable: boolean;
    fees: boolean;
    hallpass: boolean;
    clubs: boolean;
    health: boolean;
    notices: boolean;
    ptm: boolean;
    store: boolean;
    lostfound: boolean;
    // Canonical aliases
    bus_transport?: boolean;
    homework_diary?: boolean;
    exams_reports?: boolean;
    timetable_bell?: boolean;
    fee_ledger?: boolean;
    ehallpass?: boolean;
    clubs_houses?: boolean;
    medical_infirmary?: boolean;
    circulars_notices?: boolean;
    store_uniforms?: boolean;
    lost_found?: boolean;
  };

  // Live Domain Metadata from Go Backend
  studentDomain?: string;
  adminDomain?: string;
  vercelFallbackDomain?: string;
  pathFallbackStudent?: string;
  pathFallbackAdmin?: string;
}

export const POSITION_OPTIONS = [
  {
    id: 'founder',
    title: 'Founder / Co-Founder',
    desc: 'Institution Visionary & Primary Founder',
    icon: '🏛️',
  },
  {
    id: 'president',
    title: 'President / Chairman',
    desc: 'Governing Body & Managing Board President',
    icon: '👑',
  },
  {
    id: 'principal',
    title: 'Principal / Head of Institution',
    desc: 'Chief Academic Administrator & Council Head',
    icon: '🎓',
  },
  {
    id: 'trustee',
    title: 'Trustee / Board Member',
    desc: 'Education Trust & SMC Committee Member',
    icon: '📜',
  },
  {
    id: 'director',
    title: 'Academic Director / Vice-Principal',
    desc: 'Senior Academic Oversight & Curriculum Head',
    icon: '📚',
  },
  {
    id: 'it_head',
    title: 'IT Administrator / Systems Lead',
    desc: 'Digital Infrastructure & Operations Head',
    icon: '💻',
  },
];

export const AVAILABLE_MODULES = [
  {
    id: 'canteen',
    title: 'Canteen Access',
    desc: 'RFID smart cashless dining wallet, daily meal menus, parent pre-orders & allergy safeguards.',
    category: 'Logistics & Dining',
    popular: true,
  },
  {
    id: 'bus',
    title: 'Bus / Transport Access',
    desc: 'Live GPS fleet radar, stop-by-stop morning/afternoon schedules, and emergency supervisor contacts.',
    category: 'Transit & Fleet',
    popular: true,
  },
  {
    id: 'library',
    title: 'Library Access',
    desc: 'OPAC digital catalog, barcode scan-to-borrow, book reservations & overdue fine ledgers.',
    category: 'Academics & Media',
    popular: true,
  },
  {
    id: 'attendance',
    title: 'Attendance Access',
    desc: 'Biometric & RFID period logs, daily muster roll, and 75% statutory compliance tracking.',
    category: 'Student Records',
    popular: true,
  },
  {
    id: 'diary',
    title: 'Homework & Daily Diary',
    desc: 'Daily subject assignments, teacher annotations, and digital submission receipts.',
    category: 'Academics',
    popular: true,
  },
  {
    id: 'exams',
    title: 'Examinations & Report Cards',
    desc: 'Terminal marksheet generation, digital admit cards, grade cards, and board topper walls.',
    category: 'Academics',
    popular: true,
  },
  {
    id: 'timetable',
    title: 'Timetable & Bell Stream',
    desc: 'Period countdown stream, room allocations, teacher substitution board & bell timings.',
    category: 'Academics',
    popular: true,
  },
  {
    id: 'fees',
    title: 'Fee Remittance & Ledger',
    desc: 'Quarterly dues calculation, UPI/NetBanking payment portal, and digital tax receipts.',
    category: 'Finance',
    popular: true,
  },
  {
    id: 'hallpass',
    title: 'E-Hallpass Movement System',
    desc: 'Corridor movement tracking, active countdown timers, and restroom authorization passes.',
    category: 'Safety & Discipline',
    popular: false,
  },
  {
    id: 'clubs',
    title: 'Student Clubs & Houses',
    desc: 'Robotics club, debating society, sports houses, and student merit points leaderboard.',
    category: 'Co-Curricular',
    popular: false,
  },
  {
    id: 'health',
    title: 'Medical & Infirmary Records',
    desc: 'Resident medical officer logs, allergy profiles, blood group ledger & emergency first-aid.',
    category: 'Wellness',
    popular: false,
  },
  {
    id: 'notices',
    title: 'Circulars & Notice Board',
    desc: 'Official gazette bulletins with verifiable reference codes and instant PDF attachments.',
    category: 'Administration',
    popular: true,
  },
  {
    id: 'ptm',
    title: 'Parent-Teacher Meetings (PTM)',
    desc: 'Conference slot scheduling, teacher remarks, and parent feedback minutes.',
    category: 'Community',
    popular: false,
  },
  {
    id: 'store',
    title: 'School Store & Uniforms',
    desc: 'Curriculum booklists, institutional uniforms, and student kit order fulfillment.',
    category: 'Campus Commerce',
    popular: false,
  },
  {
    id: 'lostfound',
    title: 'Lost & Found Registry',
    desc: 'Campus lost item photo registry and verified student reclamation logs.',
    category: 'Campus Service',
    popular: false,
  },
];

export default function SchoolMakerWizard({
  session,
  onComplete,
}: {
  session: CreatorSession;
  onComplete: (config: SchoolAppConfig) => void;
}) {
  // Section 1: Creator Position
  const [selectedPosition, setSelectedPosition] = useState('founder');

  // Section 2: School Core Details
  const [schoolName, setSchoolName] = useState('');
  const [teacherCount, setTeacherCount] = useState('50');
  const [studentCapacity, setStudentCapacity] = useState('1,200');
  const [board, setBoard] = useState('CBSE');
  const [city, setCity] = useState('');
  const [state, setState] = useState('West Bengal');
  const [subdomain, setSubdomain] = useState('');
  const [motto, setMotto] = useState('');
  const [themeColor, setThemeColor] = useState('#0A192F');

  // Subdomain validation state
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [slugReason, setSlugReason] = useState<string | null>(null);

  // Section 3: Enabled Modules (All 15)
  const [moduleSelection, setModuleSelection] = useState<Record<string, boolean>>({
    canteen: true,
    bus: true,
    library: true,
    attendance: true,
    diary: true,
    exams: true,
    timetable: true,
    fees: true,
    hallpass: false,
    clubs: true,
    health: true,
    notices: true,
    ptm: true,
    store: false,
    lostfound: false,
  });

  // Provisioning modal & console execution state
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningStep, setProvisioningStep] = useState(0);
  const [provisionError, setProvisionError] = useState<string | null>(null);

  // Real-time debounced slug checking
  useEffect(() => {
    const clean = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!clean || clean.length < 3) {
      setSlugAvailable(null);
      setSlugReason(clean.length > 0 ? 'Minimum 3 characters required' : null);
      return;
    }

    setSlugChecking(true);
    const timer = setTimeout(async () => {
      try {
        const res = await checkSlugAvailability(clean);
        setSlugAvailable(res.available);
        setSlugReason(res.reason || null);
      } catch {
        setSlugAvailable(true);
      } finally {
        setSlugChecking(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [subdomain]);

  const toggleModule = (id: string) => {
    setModuleSelection((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectAllModules = () => {
    const updated: Record<string, boolean> = {};
    AVAILABLE_MODULES.forEach((m) => {
      updated[m.id] = true;
    });
    setModuleSelection(updated);
  };

  const selectEssentialModules = () => {
    const updated: Record<string, boolean> = {};
    AVAILABLE_MODULES.forEach((m) => {
      updated[m.id] = [
        'canteen',
        'bus',
        'library',
        'attendance',
        'diary',
        'exams',
        'timetable',
        'fees',
        'notices',
      ].includes(m.id);
    });
    setModuleSelection(updated);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanSlug = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanSlug) {
      alert('Please enter a valid subdomain identifier.');
      return;
    }

    const positionObj = POSITION_OPTIONS.find((p) => p.id === selectedPosition) || POSITION_OPTIONS[0];

    // Build complete active modules map with canonical aliases
    const fullActiveModules: Record<string, boolean> = {
      canteen: Boolean(moduleSelection.canteen),
      bus: Boolean(moduleSelection.bus),
      bus_transport: Boolean(moduleSelection.bus),
      library: Boolean(moduleSelection.library),
      attendance: Boolean(moduleSelection.attendance),
      diary: Boolean(moduleSelection.diary),
      homework_diary: Boolean(moduleSelection.diary),
      exams: Boolean(moduleSelection.exams),
      exams_reports: Boolean(moduleSelection.exams),
      timetable: Boolean(moduleSelection.timetable),
      timetable_bell: Boolean(moduleSelection.timetable),
      fees: Boolean(moduleSelection.fees),
      fee_ledger: Boolean(moduleSelection.fees),
      hallpass: Boolean(moduleSelection.hallpass),
      ehallpass: Boolean(moduleSelection.hallpass),
      clubs: Boolean(moduleSelection.clubs),
      clubs_houses: Boolean(moduleSelection.clubs),
      health: Boolean(moduleSelection.health),
      medical_infirmary: Boolean(moduleSelection.health),
      notices: Boolean(moduleSelection.notices),
      circulars_notices: Boolean(moduleSelection.notices),
      ptm: Boolean(moduleSelection.ptm),
      store: Boolean(moduleSelection.store),
      store_uniforms: Boolean(moduleSelection.store),
      lostfound: Boolean(moduleSelection.lostfound),
      lost_found: Boolean(moduleSelection.lostfound),
    };

    setIsProvisioning(true);
    setProvisionError(null);
    setProvisioningStep(1); // 1. Validating Tenant Slug

    try {
      // Step 2 timer simulation while backend processes
      setTimeout(() => setProvisioningStep(2), 600); // 2. Persisting Profile & 15 Modules
      setTimeout(() => setProvisioningStep(3), 1200); // 3. Provisioning Vercel Subdomains

      const res = await provisionSchool({
        creatorPhone: session.phone,
        creatorName: session.creatorName,
        creatorPosition: positionObj.title,
        schoolName: schoolName.trim(),
        teacherCount: teacherCount.trim(),
        enrolledScholars: studentCapacity.trim(),
        affiliationBoard: board,
        city: city.trim(),
        stateTerritory: state.trim(),
        subdomainSlug: cleanSlug,
        schoolMotto: motto.trim(),
        activeModules: fullActiveModules,
        themeColor,
      });

      setProvisioningStep(4); // 4. Generating URLs

      const config: SchoolAppConfig = {
        creatorPhone: session.phone,
        creatorName: session.creatorName,
        creatorPosition: positionObj.title,
        schoolName: schoolName.trim(),
        teacherCount: teacherCount.trim(),
        studentCapacity: studentCapacity.trim(),
        board,
        city: city.trim(),
        state: state.trim(),
        subdomain: cleanSlug,
        motto: motto.trim(),
        themeColor,
        enabledModules: fullActiveModules as SchoolAppConfig['enabledModules'],
        studentDomain: res.student_domain,
        adminDomain: res.admin_domain,
        vercelFallbackDomain: res.vercel_fallback_domain,
        pathFallbackStudent: res.path_fallback_student,
        pathFallbackAdmin: res.path_fallback_admin,
      };

      try {
        localStorage.setItem('schoolmaker_current_school', JSON.stringify(config));
      } catch (err) {
        console.error('Failed to save school config', err);
      }

      setTimeout(() => {
        setIsProvisioning(false);
        onComplete(config);
      }, 700);
    } catch (err: unknown) {
      setProvisionError(err instanceof Error ? err.message : 'Provisioning failed. Check Go backend connection.');
      setIsProvisioning(false);
    }
  };

  const selectedCount = Object.values(moduleSelection).filter(Boolean).length;
  const cleanSubdomain = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '') || 'your-school';

  return (
    <>
      <form onSubmit={handleGenerate} className="space-y-8 font-sans">
        {/* Overview Banner */}
        <div className="bg-white dark:bg-[#151622] p-6 md:p-8 rounded-2xl border border-[#e2e7ff] dark:border-[#222538] shadow-[0_8px_24px_rgba(28,42,200,0.04)] dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              <span>Verified Phone: {session.phone}</span>
              <span>•</span>
              <span>Creator: {session.creatorName}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#131b2e] dark:text-white mt-1">
              Build Your School App in 3 Simple Steps
            </h2>
            <p className="text-xs text-[#454655] dark:text-[#a0a4c0] mt-1">
              Select your leadership designation, add school metadata, and toggle which functional modules to activate for your students, parents, and teachers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
              {selectedCount} of {AVAILABLE_MODULES.length} Modules Active
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STEP 1: LEADERSHIP POSITION                                  */}
        {/* ============================================================ */}
        <div className="bg-white dark:bg-[#151622] p-6 md:p-8 rounded-2xl border border-[#e2e7ff] dark:border-[#222538] shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-[#e2e7ff] dark:border-[#222538] pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#721121] dark:text-red-400">
                Step 1 of 3
              </span>
              <h3 className="font-serif font-bold text-lg md:text-xl text-[#131b2e] dark:text-white mt-0.5">
                Which Position Are You in the School?
              </h3>
            </div>
            <span className="text-xs text-[#454655] dark:text-[#a0a4c0] font-mono">Select One Option</span>
          </div>

          <p className="text-xs text-[#454655] dark:text-[#a0a4c0]">
            Your designation will be inscribed on your school app&apos;s verified welcome charter, administrative sign-offs, and compliance documents.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {POSITION_OPTIONS.map((pos) => {
              const isSelected = selectedPosition === pos.id;
              return (
                <div
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#1c2ac8] dark:border-[#3b49df] bg-[#eef0ff]/80 dark:bg-[#3b49df]/15 shadow-xs'
                      : 'border-[#e2e7ff] dark:border-[#222538] hover:border-[#bdc2ff] dark:hover:border-[#3b49df]/40 bg-white dark:bg-[#151622]'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{pos.icon}</span>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs md:text-sm text-[#131b2e] dark:text-white">
                      {pos.title}
                    </h4>
                    <p className="text-[11px] text-[#454655] dark:text-[#a0a4c0] leading-snug">
                      {pos.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* STEP 2: SCHOOL NAME & ROSTER STRENGTH                        */}
        {/* ============================================================ */}
        <div className="bg-white dark:bg-[#151622] p-6 md:p-8 rounded-2xl border border-[#e2e7ff] dark:border-[#222538] shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-[#e2e7ff] dark:border-[#222538] pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#721121] dark:text-red-400">
                Step 2 of 3
              </span>
              <h3 className="font-serif font-bold text-lg md:text-xl text-[#131b2e] dark:text-white mt-0.5">
                School Name &amp; Teacher Roster Strength
              </h3>
            </div>
            <span className="text-xs text-[#454655] dark:text-[#a0a4c0] font-mono">Institutional Profile</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* School Name */}
            <div className="md:col-span-2">
              <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                Official Name of the School *
              </label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. Greenwood Centennial Academy"
                className="w-full p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:bg-white dark:focus:bg-[#101119] focus:ring-2 focus:ring-[#1c2ac8] dark:focus:ring-[#3b49df] font-serif font-bold text-sm text-[#131b2e] dark:text-white"
              />
            </div>

            {/* Number of Teachers */}
            <div>
              <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                Number of Teachers in the School *
              </label>
              <input
                type="number"
                min={1}
                max={1000}
                required
                value={teacherCount}
                onChange={(e) => setTeacherCount(e.target.value)}
                placeholder="e.g. 48"
                className="w-full p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:bg-white dark:focus:bg-[#101119] focus:ring-2 focus:ring-[#1c2ac8] dark:focus:ring-[#3b49df] font-mono text-[#131b2e] dark:text-white font-bold"
              />
              <p className="text-[11px] text-[#454655] dark:text-[#a0a4c0] mt-1">
                Total teaching faculty across junior and senior wings.
              </p>
            </div>

            {/* Board Affiliation */}
            <div>
              <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                Affiliation Board *
              </label>
              <select
                aria-label="Affiliation board"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:bg-white dark:focus:bg-[#101119] focus:ring-2 focus:ring-[#1c2ac8] dark:focus:ring-[#3b49df] text-[#131b2e] dark:text-white font-medium"
              >
                <option value="CBSE">CBSE (Central Board)</option>
                <option value="CISCE">CISCE / ICSE &amp; ISC</option>
                <option value="Cambridge">Cambridge International / IGCSE</option>
                <option value="State Board">State Secondary Education Board</option>
                <option value="IB">International Baccalaureate (IB)</option>
              </select>
            </div>

            {/* Enrolled Scholars Capacity */}
            <div>
              <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                Approximate Enrolled Scholars *
              </label>
              <input
                type="text"
                value={studentCapacity}
                onChange={(e) => setStudentCapacity(e.target.value)}
                placeholder="e.g. 1,850"
                className="w-full p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:bg-white dark:focus:bg-[#101119] focus:ring-2 focus:ring-[#1c2ac8] dark:focus:ring-[#3b49df] font-mono text-[#131b2e] dark:text-white font-semibold"
              />
            </div>

            {/* City & State */}
            <div>
              <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                City &amp; Territory *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City (e.g. Kolkata)"
                  className="w-1/2 p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:bg-white text-[#131b2e] dark:text-white font-medium"
                />
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State (e.g. West Bengal)"
                  className="w-1/2 p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:bg-white text-[#131b2e] dark:text-white font-medium"
                />
              </div>
            </div>

            {/* Target Subdomain Identifier (Issue 3: .nexacampus.school) */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-[#131b2e] dark:text-[#eaedff]">
                  Target Subdomain Identifier *
                </label>
                {slugChecking ? (
                  <span className="text-[10px] font-mono text-[#454655] dark:text-[#a0a4c0]">Checking...</span>
                ) : slugAvailable === true ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ Available on .nexacampus.school
                  </span>
                ) : slugAvailable === false ? (
                  <span className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400">
                    ✗ {slugReason || 'Slug unavailable'}
                  </span>
                ) : null}
              </div>

              <div className="flex items-center rounded-xl border border-[#c6c5d8] dark:border-[#2b2f4a] overflow-hidden bg-[#faf8ff] dark:bg-[#101119] text-xs focus-within:ring-2 focus-within:ring-[#1c2ac8] dark:focus-within:ring-[#3b49df]">
                <input
                  type="text"
                  required
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="e.g. lcgvm, vidyamandir, dps"
                  className="w-1/2 p-2.5 font-mono font-bold text-[#131b2e] dark:text-white focus:outline-hidden bg-transparent"
                />
                <span className="w-1/2 p-2.5 bg-[#f2f3ff] dark:bg-[#151622] text-[#454655] dark:text-[#a0a4c0] font-mono text-xs font-bold border-l border-[#c6c5d8] dark:border-[#2b2f4a]">
                  .nexacampus.school
                </span>
              </div>

              {/* Live Preview of 3 Provisioned URLs (Issue 3 Requirement) */}
              <div className="mt-2.5 p-3 rounded-xl bg-[#f2f3ff]/60 dark:bg-[#101119] border border-[#e2e7ff] dark:border-[#222538] space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-[#454655] dark:text-[#a0a4c0]">
                  <span className="font-sans font-bold text-[#131b2e] dark:text-white">Student &amp; Public Portal:</span>
                  <span className="text-[#1c2ac8] dark:text-[#bdc2ff] font-bold">
                    https://{cleanSubdomain}.nexacampus.school
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#454655] dark:text-[#a0a4c0]">
                  <span className="font-sans font-bold text-[#131b2e] dark:text-white">Admin Portal (Custom):</span>
                  <span className="text-amber-700 dark:text-amber-300 font-bold">
                    https://{cleanSubdomain}.admin.nexacampus.school
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#454655] dark:text-[#a0a4c0]">
                  <span className="font-sans font-bold text-[#131b2e] dark:text-white">Instant Vercel Fallback:</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    https://{cleanSubdomain}.{CANONICAL_APP_HOST}
                  </span>
                </div>
              </div>
            </div>

            {/* Institutional Motto */}
            <div>
              <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                School Motto
              </label>
              <input
                type="text"
                value={motto}
                onChange={(e) => setMotto(e.target.value)}
                placeholder="e.g. Veritas et Virtus"
                className="w-full p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:bg-white italic font-serif text-[#131b2e] dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STEP 3: 15 DYNAMIC MODULES (ISSUE 4)                         */}
        {/* ============================================================ */}
        <div className="bg-white dark:bg-[#151622] p-6 md:p-8 rounded-2xl border border-[#e2e7ff] dark:border-[#222538] shadow-xs space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e2e7ff] dark:border-[#222538] pb-3 gap-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#721121] dark:text-red-400">
                Step 3 of 3
              </span>
              <h3 className="font-serif font-bold text-lg md:text-xl text-[#131b2e] dark:text-white mt-0.5">
                Select Module Access Required for Your App (15 Modules)
              </h3>
              <p className="text-xs text-[#454655] dark:text-[#a0a4c0] mt-0.5">
                Choose the exact modules needed for your school: Canteen access, Bus tracking, Library catalog, Attendance register, and more.
              </p>
            </div>

            {/* Preset Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectEssentialModules}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#131b2e] dark:text-[#eaedff] bg-[#f2f3ff] hover:bg-[#e4e7ff] dark:bg-[#101119] dark:hover:bg-[#1a1c2b] border border-[#e2e7ff] dark:border-[#222538] rounded-lg transition-colors cursor-pointer"
              >
                Core Essentials
              </button>
              <button
                type="button"
                onClick={selectAllModules}
                className="px-3.5 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
              >
                Select All (15)
              </button>
            </div>
          </div>

          {/* 15 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AVAILABLE_MODULES.map((mod) => {
              const isEnabled = Boolean(moduleSelection[mod.id]);
              return (
                <div
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                    isEnabled
                      ? 'border-[#1c2ac8] dark:border-[#3b49df] bg-[#eef0ff]/70 dark:bg-[#3b49df]/15 shadow-xs'
                      : 'border-[#e2e7ff] dark:border-[#222538] hover:border-[#bdc2ff] dark:hover:border-[#3b49df]/40 bg-white/70 dark:bg-[#151622]/70'
                  }`}
                >
                  <div className="pt-0.5 flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${
                        isEnabled
                          ? 'bg-[#1c2ac8] dark:bg-[#3b49df] text-white'
                          : 'border border-[#c6c5d8] dark:border-[#2b2f4a] bg-white dark:bg-[#101119]'
                      }`}
                    >
                      {isEnabled ? '✓' : ''}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-[#131b2e] dark:text-white">
                        {mod.title}
                      </h4>
                      {mod.popular && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#454655] dark:text-[#a0a4c0] leading-relaxed">
                      {mod.desc}
                    </p>
                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-[#454655] dark:text-[#a0a4c0]">
                        Category: {mod.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button Bar */}
        <div className="p-6 bg-gradient-to-r from-[#0A192F] via-[#101a38] to-[#1c2ac8] dark:from-[#151622] dark:via-[#13141f] dark:to-[#1a1c2b] text-white rounded-2xl shadow-xl border border-[#e2e7ff]/10 dark:border-[#222538] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="font-serif font-bold text-base text-amber-300">
              Ready to Generate {schoolName}?
            </div>
            <div className="text-xs text-slate-200/90 mt-0.5 font-mono">
              Creator: {POSITION_OPTIONS.find((p) => p.id === selectedPosition)?.title} • {teacherCount} Teachers • {selectedCount} Active Modules
            </div>
          </div>

          <button
            type="submit"
            disabled={isProvisioning}
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
          >
            <span>Generate School App Now</span>
            <span className="text-base">🚀</span>
          </button>
        </div>
      </form>

      {/* ============================================================ */}
      {/* PROVISIONING STEP-BY-STEP CONSOLE MODAL (ISSUE 1 REQUIREMENT) */}
      {/* ============================================================ */}
      {isProvisioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in font-sans">
          <div className="bg-[#0A192F] border border-cyan-500/30 text-white w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md animate-pulse">
                ⚙️
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  NexaCampus Cloud Provisioner v2.5
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  Provisioning {schoolName}
                </h3>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${provisioningStep >= 1 ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 text-slate-500'}`}>
                <span>{provisioningStep > 1 ? '✓' : provisioningStep === 1 ? '⏳' : '○'}</span>
                <span>1. Validating Tenant Slug ({cleanSubdomain})</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${provisioningStep >= 2 ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 text-slate-500'}`}>
                <span>{provisioningStep > 2 ? '✓' : provisioningStep === 2 ? '⏳' : '○'}</span>
                <span>2. Persisting Institutional Profile &amp; {selectedCount} Modules</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${provisioningStep >= 3 ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 text-slate-500'}`}>
                <span>{provisioningStep > 3 ? '✓' : provisioningStep === 3 ? '⏳' : '○'}</span>
                <span>3. Provisioning Vercel &amp; Hostinger Subdomains</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${provisioningStep >= 4 ? 'border-emerald-400 bg-emerald-950/40 text-emerald-200' : 'border-slate-800 text-slate-500'}`}>
                <span>{provisioningStep >= 4 ? '✓' : '○'}</span>
                <span>4. Generating Student &amp; Admin Portal URLs</span>
              </div>
            </div>

            {provisionError && (
              <div className="p-3 bg-red-950/60 text-red-300 border border-red-500/40 rounded-xl text-xs">
                {provisionError}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
