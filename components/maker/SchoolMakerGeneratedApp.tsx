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
      <div className="bg-white dark:bg-[#151622] p-6 md:p-8 rounded-3xl border border-[#e2e7ff] dark:border-[#222538] shadow-[0_8px_30px_rgba(28,42,200,0.06)] dark:shadow-none relative overflow-hidden transition-colors">
        {/* Subtle Watermark */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 dark:opacity-10 pointer-events-none text-9xl">
          🏛️
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>School App Provisioned Successfully</span>
            </div>

            <h1 className="font-serif font-bold text-2xl md:text-4xl text-[#131b2e] dark:text-white">
              {config.schoolName}
            </h1>

            <div className="flex items-center gap-2 text-xs font-serif italic text-[#454655] dark:text-[#a0a4c0]">
              <span>“{config.motto}”</span>
            </div>

            {/* Creator & Institutional Meta Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#454655] dark:text-[#a0a4c0]">
              <div className="flex items-center gap-1.5 bg-[#f2f3ff] dark:bg-[#101119] border border-[#e2e7ff] dark:border-[#222538] px-2.5 py-1 rounded-lg">
                <span className="text-[#131b2e] dark:text-white font-bold">Creator:</span>
                <span>{config.creatorName} ({config.creatorPosition})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f2f3ff] dark:bg-[#101119] border border-[#e2e7ff] dark:border-[#222538] px-2.5 py-1 rounded-lg">
                <span className="text-[#131b2e] dark:text-white font-bold">Mobile:</span>
                <span>{config.creatorPhone}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f2f3ff] dark:bg-[#101119] border border-[#e2e7ff] dark:border-[#222538] px-2.5 py-1 rounded-lg">
                <span className="text-[#131b2e] dark:text-white font-bold">Teachers:</span>
                <span>{config.teacherCount} Faculty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f2f3ff] dark:bg-[#101119] border border-[#e2e7ff] dark:border-[#222538] px-2.5 py-1 rounded-lg">
                <span className="text-[#131b2e] dark:text-white font-bold">Board:</span>
                <span>{config.board}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f2f3ff] dark:bg-[#101119] border border-[#e2e7ff] dark:border-[#222538] px-2.5 py-1 rounded-lg">
                <span className="text-[#131b2e] dark:text-white font-bold">Location:</span>
                <span>{config.city}, {config.state}</span>
              </div>
            </div>
          </div>

          {/* Quick Share / Launch Actions */}
          <div className="flex flex-col gap-2.5 flex-shrink-0">
            <div className="bg-[#faf8ff] dark:bg-[#101119] p-3 rounded-xl border border-[#e2e7ff] dark:border-[#222538] text-right">
              <span className="text-[10px] font-mono text-[#454655] dark:text-[#a0a4c0] block uppercase">Public App Address</span>
              <span className="font-mono font-bold text-xs text-[#1c2ac8] dark:text-[#bdc2ff] block">{portalUrl}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#f2f3ff] dark:bg-[#1a1c2b] hover:bg-[#e4e7ff] dark:hover:bg-[#222538] text-[#131b2e] dark:text-[#eaedff] rounded-xl text-xs font-bold transition-colors border border-[#e2e7ff] dark:border-[#262a40] cursor-pointer"
              >
                {copiedLink ? 'Copied ✓' : 'Copy Link'}
              </button>
              <Link
                href={`/?tenant=${config.subdomain}`}
                className="px-5 py-2 bg-[#1c2ac8] hover:bg-[#15209e] dark:bg-[#3b49df] dark:hover:bg-[#2e3cc4] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
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
      <div className="bg-white dark:bg-[#151622] p-6 md:p-8 rounded-3xl border border-[#e2e7ff] dark:border-[#222538] shadow-xs space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e2e7ff] dark:border-[#222538] pb-4 gap-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#721121] dark:text-red-400">
              Live Interactive Instance
            </div>
            <h2 className="font-serif font-bold text-xl text-[#131b2e] dark:text-white mt-0.5">
              Generated Modular Suite ({enabledModuleList.length} Active Modules)
            </h2>
            <p className="text-xs text-[#454655] dark:text-[#a0a4c0] mt-0.5">
              Only the specific module accesses you selected have been activated for {config.schoolName}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReconfigure}
              className="px-3.5 py-1.5 text-xs font-bold text-[#131b2e] dark:text-[#eaedff] bg-[#f2f3ff] hover:bg-[#e4e7ff] dark:bg-[#101119] dark:hover:bg-[#1a1c2b] rounded-lg border border-[#e2e7ff] dark:border-[#222538] transition-colors cursor-pointer"
            >
              Reconfigure Modules
            </button>
            <button
              onClick={onCreateNew}
              className="px-3.5 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 rounded-lg border border-amber-500/30 transition-colors cursor-pointer"
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
              className="p-5 rounded-2xl border border-[#e2e7ff] dark:border-[#222538] hover:border-[#1c2ac8] dark:hover:border-[#3b49df] hover:shadow-md transition-all bg-[#faf8ff] dark:bg-[#101119] hover:bg-white dark:hover:bg-[#151622] cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                    Active Module
                  </span>
                  <span className="text-[10px] font-mono text-[#454655] dark:text-[#a0a4c0]">
                    {mod.category}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#131b2e] dark:text-white group-hover:text-[#1c2ac8] dark:group-hover:text-[#bdc2ff] transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-[#454655] dark:text-[#a0a4c0] mt-1.5 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e2e7ff] dark:border-[#222538] flex items-center justify-between text-xs font-bold text-[#1c2ac8] dark:text-[#bdc2ff]">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#151622] text-[#131b2e] dark:text-[#eaedff] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#e2e7ff] dark:border-[#222538] transition-colors">
            <div className="bg-gradient-to-r from-[#0A192F] to-[#1c2ac8] dark:from-[#101119] dark:to-[#1a1c2b] text-white px-6 py-4 flex items-center justify-between border-b border-[#e2e7ff]/10 dark:border-[#222538]">
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
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-[#faf8ff] dark:bg-[#101119] p-4 rounded-xl border border-[#e2e7ff] dark:border-[#222538] space-y-2">
                <div className="font-bold text-[#131b2e] dark:text-white text-sm">
                  Module Status: Operational
                </div>
                <p className="text-[#454655] dark:text-[#a0a4c0]">
                  This module has been provisioned specifically for {config.schoolName} with access permissions scoped to {config.teacherCount} teachers and enrolled scholars.
                </p>
              </div>

              {activeModuleModal === 'canteen' && (
                <div className="p-4 bg-amber-500/10 dark:bg-amber-500/15 rounded-xl border border-amber-500/30 space-y-2 font-mono text-[#131b2e] dark:text-[#eaedff]">
                  <div className="font-bold text-amber-900 dark:text-amber-300">🍽️ Canteen RFID Terminal Active:</div>
                  <div>• Student Smart Meal Cards: Enabled</div>
                  <div>• Parent Top-Up Gateway: Online</div>
                  <div>• Daily Dietary Tracking: Zero-Peanut &amp; Halal/Veg filter active</div>
                </div>
              )}

              {activeModuleModal === 'bus' && (
                <div className="p-4 bg-blue-500/10 dark:bg-blue-500/15 rounded-xl border border-blue-500/30 space-y-2 font-mono text-[#131b2e] dark:text-[#eaedff]">
                  <div className="font-bold text-blue-900 dark:text-blue-300">🚌 Transit Fleet Radar:</div>
                  <div>• Live GPS Telematics Stream: Transmitting</div>
                  <div>• Designated Routes: Configured for {config.city} stops</div>
                  <div>• Bus Supervisor Helpline: Registered to {config.creatorPhone}</div>
                </div>
              )}

              {activeModuleModal === 'library' && (
                <div className="p-4 bg-purple-500/10 dark:bg-purple-500/15 rounded-xl border border-purple-500/30 space-y-2 font-mono text-[#131b2e] dark:text-[#eaedff]">
                  <div className="font-bold text-purple-900 dark:text-purple-300">📚 Digital Library OPAC:</div>
                  <div>• Barcode Scan-to-Borrow: Enabled</div>
                  <div>• Automated Book Reservation: Active</div>
                  <div>• Overdue Notification SMS: Active</div>
                </div>
              )}

              {activeModuleModal === 'attendance' && (
                <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-xl border border-emerald-500/30 space-y-2 font-mono text-[#131b2e] dark:text-[#eaedff]">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300">📋 Attendance Register:</div>
                  <div>• Period-Wise Logs: Connected for {config.teacherCount} teachers</div>
                  <div>• 75% Statutory Alert Threshold: Active</div>
                  <div>• Parent SMS Absentee Notification: Configured</div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setActiveModuleModal(null)}
                  className="px-5 py-2 bg-[#1c2ac8] hover:bg-[#15209e] dark:bg-[#3b49df] dark:hover:bg-[#2e3cc4] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
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
