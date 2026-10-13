'use client';

import React, { useState, useEffect } from 'react';
import SchoolMakerHeader, { CreatorSession } from '@/components/maker/SchoolMakerHeader';
import SchoolMakerAuthModal from '@/components/maker/SchoolMakerAuthModal';
import SchoolMakerWizard, { SchoolAppConfig } from '@/components/maker/SchoolMakerWizard';
import SchoolMakerGeneratedApp from '@/components/maker/SchoolMakerGeneratedApp';
import SchoolMakerFooter from '@/components/SchoolMakerFooter';

export default function SchoolMakerStudio() {
  const [session, setSession] = useState<CreatorSession | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentSchool, setCurrentSchool] = useState<SchoolAppConfig | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedSession = localStorage.getItem('schoolmaker_creator_session');
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      } else {
        setAuthModalOpen(true);
      }

      const storedSchool = localStorage.getItem('schoolmaker_current_school');
      if (storedSchool) {
        setCurrentSchool(JSON.parse(storedSchool));
      }
    } catch (err) {
      console.error('Failed to parse SchoolMaker local state', err);
    }
  }, []);

  const handleLoginSuccess = (newSession: CreatorSession) => {
    setSession(newSession);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('schoolmaker_creator_session');
    } catch (err) {
      console.error(err);
    }
    setSession(null);
    setAuthModalOpen(true);
  };

  const handleSchoolCreated = (config: SchoolAppConfig) => {
    setCurrentSchool(config);
  };

  const handleReconfigure = () => {
    setCurrentSchool(null);
  };

  const handleCreateNew = () => {
    try {
      localStorage.removeItem('schoolmaker_current_school');
    } catch (err) {
      console.error(err);
    }
    setCurrentSchool(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between font-sans">
      {/* Dedicated SchoolMaker App Header */}
      <SchoolMakerHeader
        session={session}
        onLoginClick={() => setAuthModalOpen(true)}
        onLogoutClick={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        {!isClient ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            Initializing SchoolMaker Studio...
          </div>
        ) : !session ? (
          /* Unauthenticated State */
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-3xl mx-auto shadow-md">
              ⚙️
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
                Extension for NexaCampus Platform
              </span>
              <h1 className="font-serif font-bold text-2xl md:text-3xl text-slate-900 mt-1.5">
                Create Your Official Institutional School App
              </h1>
              <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                Sign in with your verified phone number as Founder, President, Principal, or Administrator to configure smart attendance, bus fleet tracking, canteen, library, and student portals.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <span>Sign In with Phone Number</span>
                <span className="text-amber-400">→</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500 font-mono">
              <span>🔒 Encrypted Phone Verification</span>
              <span>⚡ Instant App Provisioning</span>
            </div>
          </div>
        ) : currentSchool ? (
          /* Generated School App View */
          <SchoolMakerGeneratedApp
            config={currentSchool}
            onReconfigure={handleReconfigure}
            onCreateNew={handleCreateNew}
          />
        ) : (
          /* Wizard Form */
          <SchoolMakerWizard
            session={session}
            onComplete={handleSchoolCreated}
          />
        )}
      </main>

      {/* Creator Login Dialog */}
      <SchoolMakerAuthModal
        isOpen={authModalOpen}
        onClose={session ? () => setAuthModalOpen(false) : undefined}
        onSuccess={handleLoginSuccess}
      />

      <SchoolMakerFooter />
    </div>
  );
}
