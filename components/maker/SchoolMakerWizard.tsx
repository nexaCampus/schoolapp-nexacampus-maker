'use client';

import React, { useState } from 'react';
import { CreatorSession } from './SchoolMakerHeader';

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
  };
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
    icon: 'restaurant',
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
  const [schoolName, setSchoolName] = useState('Greenwood Centennial Academy');
  const [teacherCount, setTeacherCount] = useState('48');
  const [studentCapacity, setStudentCapacity] = useState('1,850');
  const [board, setBoard] = useState('CBSE');
  const [city, setCity] = useState('Kolkata');
  const [state, setState] = useState('West Bengal');
  const [subdomain, setSubdomain] = useState('greenwood');
  const [motto, setMotto] = useState('Veritas et Virtus (Truth & Virtue)');
  const [themeColor, setThemeColor] = useState('#0A192F');

  // Section 3: Enabled Modules (User requested canteen, bus, library, attendance, etc.)
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
      updated[m.id] = ['canteen', 'bus', 'library', 'attendance', 'diary', 'exams', 'timetable', 'fees', 'notices'].includes(m.id);
    });
    setModuleSelection(updated);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const positionObj = POSITION_OPTIONS.find((p) => p.id === selectedPosition) || POSITION_OPTIONS[0];

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
      subdomain: subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''),
      motto: motto.trim(),
      themeColor,
      enabledModules: {
        canteen: Boolean(moduleSelection.canteen),
        bus: Boolean(moduleSelection.bus),
        library: Boolean(moduleSelection.library),
        attendance: Boolean(moduleSelection.attendance),
        diary: Boolean(moduleSelection.diary),
        exams: Boolean(moduleSelection.exams),
        timetable: Boolean(moduleSelection.timetable),
        fees: Boolean(moduleSelection.fees),
        hallpass: Boolean(moduleSelection.hallpass),
        clubs: Boolean(moduleSelection.clubs),
        health: Boolean(moduleSelection.health),
        notices: Boolean(moduleSelection.notices),
        ptm: Boolean(moduleSelection.ptm),
        store: Boolean(moduleSelection.store),
        lostfound: Boolean(moduleSelection.lostfound),
      },
    };

    try {
      localStorage.setItem('schoolmaker_current_school', JSON.stringify(config));
    } catch (err) {
      console.error('Failed to save school config', err);
    }

    onComplete(config);
  };

  const selectedCount = Object.values(moduleSelection).filter(Boolean).length;

  return (
    <form onSubmit={handleGenerate} className="space-y-8 font-sans">
      {/* Overview Banner */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
            <span>Verified Phone: {session.phone}</span>
            <span>•</span>
            <span>Creator: {session.creatorName}</span>
          </div>
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-oxford mt-1">
            Build Your School App in 3 Simple Steps
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Select your leadership designation, add school metadata, and toggle which functional modules to activate for your students, parents, and teachers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold font-mono">
            {selectedCount} of {AVAILABLE_MODULES.length} Modules Active
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* STEP 1: WHICH POSITION ARE YOU? (FOUNDER / PRESIDENT / PRINCIPAL) */}
      {/* ============================================================ */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-burgundy">
              Step 1 of 3
            </span>
            <h3 className="font-serif font-bold text-lg md:text-xl text-oxford mt-0.5">
              Which Position Are You in the School?
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Select One Option</span>
        </div>

        <p className="text-xs text-slate-600">
          Your designation will be inscribed on your school app&apos;s verified welcome charter, administrative sign-offs, and compliance documents.
        </p>

        {/* Position Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POSITION_OPTIONS.map((pos) => {
            const isSelected = selectedPosition === pos.id;
            return (
              <div
                key={pos.id}
                onClick={() => setSelectedPosition(pos.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-oxford bg-slate-50/80 shadow-xs ring-1 ring-oxford'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-2xl flex-shrink-0 pt-0.5">{pos.icon}</div>
                <div>
                  <div className="font-serif font-bold text-sm text-oxford leading-snug">
                    {pos.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {pos.desc}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        isSelected
                          ? 'bg-oxford text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isSelected ? 'Selected ✓' : 'Select'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* STEP 2: SCHOOL DETAILS (NAME, TEACHER COUNT, BOARD, LOCATION) */}
      {/* ============================================================ */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-burgundy">
              Step 2 of 3
            </span>
            <h3 className="font-serif font-bold text-lg md:text-xl text-oxford mt-0.5">
              School Name & Teacher Roster Strength
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Institutional Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* School Name */}
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">
              Official Name of the School *
            </label>
            <input
              type="text"
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. Greenwood Centennial Academy"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-oxford font-serif font-bold text-sm text-oxford"
            />
          </div>

          {/* Number of Teachers */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
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
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-oxford font-mono text-slate-900 font-bold"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Total teaching faculty across junior and senior wings.
            </p>
          </div>

          {/* Board Affiliation */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Affiliation Board *
            </label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-oxford text-slate-900 font-medium"
            >
              <option value="CBSE">CBSE (Central Board)</option>
              <option value="ICSE">CISCE / ICSE & ISC</option>
              <option value="Cambridge">Cambridge International / IGCSE</option>
              <option value="State Board">State Secondary Education Board</option>
              <option value="IB">International Baccalaureate (IB)</option>
            </select>
          </div>

          {/* Enrolled Scholars Capacity */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Approximate Enrolled Scholars *
            </label>
            <input
              type="text"
              value={studentCapacity}
              onChange={(e) => setStudentCapacity(e.target.value)}
              placeholder="e.g. 1,850"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-oxford font-mono text-slate-900 font-semibold"
            />
          </div>

          {/* City & State */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              City & Territory *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Kolkata)"
                className="w-1/2 p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
              />
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State (e.g. West Bengal)"
                className="w-1/2 p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
              />
            </div>
          </div>

          {/* Subdomain */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Target Subdomain Identifier *
            </label>
            <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden bg-white text-xs">
              <input
                type="text"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="w-1/2 p-2.5 font-mono font-bold text-oxford focus:outline-hidden"
              />
              <span className="w-1/2 p-2.5 bg-slate-100 text-slate-500 font-mono text-[11px] border-l border-slate-200">
                .nexacampus.com
              </span>
            </div>
          </div>

          {/* Institutional Motto */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              School Motto
            </label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              placeholder="e.g. Veritas et Virtus"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white italic font-serif"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* STEP 3: WHAT THINGS ARE REQUIRED? (CANTEEN, BUS, LIBRARY...)  */}
      {/* ============================================================ */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-burgundy">
              Step 3 of 3
            </span>
            <h3 className="font-serif font-bold text-lg md:text-xl text-oxford mt-0.5">
              Select Module Access Required for Your App
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose the exact tools needed for your school: Canteen access, Bus tracking, Library catalog, Attendance register, and more.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={selectEssentialModules}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              Core Essentials
            </button>
            <button
              type="button"
              onClick={selectAllModules}
              className="px-3 py-1.5 text-xs font-bold text-oxford bg-amber-100 hover:bg-amber-200 rounded-md transition-colors"
            >
              Select All (15)
            </button>
          </div>
        </div>

        {/* Feature Checkboxes / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AVAILABLE_MODULES.map((mod) => {
            const isEnabled = Boolean(moduleSelection[mod.id]);
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  isEnabled
                    ? 'border-oxford bg-slate-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white opacity-75'
                }`}
              >
                {/* Checkbox Icon */}
                <div className="pt-0.5 flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${
                      isEnabled
                        ? 'bg-oxford text-white'
                        : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {isEnabled ? '✓' : ''}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-oxford">
                      {mod.title}
                    </h4>
                    {mod.popular && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-amber-100 text-amber-900">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {mod.desc}
                  </p>
                  <div className="pt-1">
                    <span className="text-[10px] font-mono text-slate-400">
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
      <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-serif font-bold text-base text-amber-300">
            Ready to Generate {schoolName}?
          </div>
          <div className="text-xs text-slate-300 mt-0.5 font-mono">
            Creator Role: {POSITION_OPTIONS.find((p) => p.id === selectedPosition)?.title} • {teacherCount} Teachers • {selectedCount} Active Modules
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Generate School App Now</span>
          <span className="text-base">🚀</span>
        </button>
      </div>
    </form>
  );
}
