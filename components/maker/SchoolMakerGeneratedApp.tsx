'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SchoolAppConfig, AVAILABLE_MODULES } from './SchoolMakerWizard';

export default function SchoolMakerGeneratedApp({
  config,
  onReconfigure,
  onCreateNew,
}: {
  config: SchoolAppConfig;
  onReconfigure: () => void;
  onCreateNew: () => void;
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeModuleModal, setActiveModuleModal] = useState<string | null>(null);

  const portalUrl = `https://${config.subdomain}.nexacampus.com`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Filter only enabled modules
  const enabledModuleList = AVAILABLE_MODULES.filter(
    (mod) => config.enabledModules[mod.id as keyof typeof config.enabledModules]
  );

  return (
    <div className="space-y-8 font-sans animate-in fade-in">
      {/* ============================================================ */}
      {/* CELEBRATION & INSTITUTIONAL CREATION BADGE                   */}
      {/* ============================================================ */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none text-9xl">
          🏛️
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>School App Provisioned Successfully</span>
            </div>

            <h1 className="font-serif font-bold text-2xl md:text-4xl text-oxford">
              {config.schoolName}
            </h1>

            <div className="flex items-center gap-2 text-xs font-serif italic text-slate-500">
              <span>“{config.motto}”</span>
            </div>

            {/* Creator & Institutional Meta Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded">
                <span className="text-oxford font-bold">Creator:</span>
                <span>{config.creatorName} ({config.creatorPosition})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded">
                <span className="text-oxford font-bold">Mobile:</span>
                <span>{config.creatorPhone}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded">
                <span className="text-oxford font-bold">Teachers:</span>
                <span>{config.teacherCount} Faculty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded">
                <span className="text-oxford font-bold">Board:</span>
                <span>{config.board}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded">
                <span className="text-oxford font-bold">Location:</span>
                <span>{config.city}, {config.state}</span>
              </div>
            </div>
          </div>

          {/* Quick Share / Launch Actions */}
          <div className="flex flex-col gap-2.5 flex-shrink-0">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Public App Address</span>
              <span className="font-mono font-bold text-xs text-oxford block">{portalUrl}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-bold transition-colors border border-slate-300"
              >
                {copiedLink ? 'Copied ✓' : 'Copy Link'}
              </button>
              <Link
                href={`/?tenant=${config.subdomain}`}
                className="px-5 py-2 bg-oxford hover:bg-slate-800 text-white rounded-md text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Launch App</span>
                <span className="text-amber-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LIVE GENERATED APP DASHBOARD PREVIEW                         */}
      {/* ============================================================ */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-burgundy">
              Live Interactive Instance
            </div>
            <h2 className="font-serif font-bold text-xl text-oxford mt-0.5">
              Generated Modular Suite ({enabledModuleList.length} Active Modules)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Only the specific module accesses you selected have been activated for {config.schoolName}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReconfigure}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-300 transition-colors"
            >
              Reconfigure Modules
            </button>
            <button
              onClick={onCreateNew}
              className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-200 transition-colors"
            >
              + Create Another School
            </button>
          </div>
        </div>

        {/* Generated Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enabledModuleList.map((mod) => (
            <div
              key={mod.id}
              onClick={() => setActiveModuleModal(mod.id)}
              className="p-5 rounded-xl border border-slate-200 hover:border-oxford hover:shadow-md transition-all bg-slate-50/70 hover:bg-white cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
                    Active Module
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {mod.category}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-oxford group-hover:text-burgundy transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-oxford">
                <span>Open {mod.title.split(' ')[0]} Simulator</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SIMULATED MODULE PREVIEW MODAL                               */}
      {/* ============================================================ */}
      {activeModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white text-slate-900 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-slate-300">
            <div className="bg-oxford text-white px-5 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-300 block">
                  {config.schoolName}
                </span>
                <h3 className="font-serif font-bold text-base text-white">
                  {AVAILABLE_MODULES.find((m) => m.id === activeModuleModal)?.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModuleModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <div className="font-bold text-oxford text-sm">
                  Module Status: Operational
                </div>
                <p className="text-slate-600">
                  This module has been provisioned specifically for {config.schoolName} with access permissions scoped to {config.teacherCount} teachers and enrolled scholars.
                </p>
              </div>

              {activeModuleModal === 'canteen' && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 space-y-2 font-mono">
                  <div className="font-bold text-amber-900">🍽️ Canteen RFID Terminal Active:</div>
                  <div>• Student Smart Meal Cards: Enabled</div>
                  <div>• Parent Top-Up Gateway: Online</div>
                  <div>• Daily Dietary Tracking: Zero-Peanut & Halal/Veg filter active</div>
                </div>
              )}

              {activeModuleModal === 'bus' && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-2 font-mono">
                  <div className="font-bold text-blue-900">🚌 Transit Fleet Radar:</div>
                  <div>• Live GPS Telematics Stream: Transmitting</div>
                  <div>• Designated Routes: Configured for {config.city} stops</div>
                  <div>• Bus Supervisor Helpline: Registered to {config.creatorPhone}</div>
                </div>
              )}

              {activeModuleModal === 'library' && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 space-y-2 font-mono">
                  <div className="font-bold text-purple-900">📚 Digital Library OPAC:</div>
                  <div>• Barcode Scan-to-Borrow: Enabled</div>
                  <div>• Automated Book Reservation: Active</div>
                  <div>• Overdue Notification SMS: Active</div>
                </div>
              )}

              {activeModuleModal === 'attendance' && (
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2 font-mono">
                  <div className="font-bold text-emerald-900">📋 Attendance Register:</div>
                  <div>• Period-Wise Logs: Connected for {config.teacherCount} teachers</div>
                  <div>• 75% Statutory Alert Threshold: Active</div>
                  <div>• Parent SMS Absentee Notification: Configured</div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setActiveModuleModal(null)}
                  className="px-4 py-2 bg-oxford text-white font-bold rounded shadow-xs"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
