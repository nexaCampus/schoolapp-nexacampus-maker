'use client';

import React from 'react';
import Link from 'next/link';

export interface CreatorSession {
  phone: string;
  creatorName: string;
  verifiedAt: string;
}

export default function SchoolMakerHeader({
  session,
  onLoginClick,
  onLogoutClick,
}: {
  session: CreatorSession | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}) {
  return (
    <header className="w-full bg-slate-900 text-white border-b border-slate-800 select-none font-sans sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <Link href="/maker" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-amber-400 transition-colors">
              ⚙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base md:text-lg text-white tracking-tight">
                  NexaCampus SchoolMaker
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] uppercase font-mono font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                  Studio v2.6
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono hidden md:block">
                Autonomous School App Provisioning & Builder Engine
              </span>
            </div>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:flex items-center gap-1 font-medium"
          >
            <span>← Public Portal</span>
          </Link>

          <Link
            href="/explore"
            className="text-xs text-slate-400 hover:text-amber-300 transition-colors hidden sm:flex items-center gap-1 font-medium"
          >
            <span>Explore Campuses</span>
          </Link>

          {session ? (
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <div className="text-left font-mono text-xs">
                <span className="text-slate-300 font-bold block leading-none">
                  {session.creatorName || 'School Creator'}
                </span>
                <span className="text-[10px] text-slate-400 leading-none">
                  {session.phone}
                </span>
              </div>
              <button
                onClick={onLogoutClick}
                className="ml-2 text-[10px] text-red-400 hover:text-red-300 underline font-sans"
                title="Sign out of SchoolMaker"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Creator Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
