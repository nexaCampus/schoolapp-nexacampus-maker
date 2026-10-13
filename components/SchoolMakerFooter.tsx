import React from 'react';

export default function SchoolMakerFooter() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow">
              NC
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                NexaCampus SchoolMaker Studio
              </p>
              <p className="text-slate-400 text-xs">
                Official Multi-Tenant App Creation Extension for <a href="https://github.com/nexaCampus/school-webapp" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">nexaCampus/school-webapp</a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-amber-300 border border-slate-700">
              🔒 256-Bit SSL Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-emerald-300 border border-slate-700">
              ✓ Multi-Tenant Compliant
            </span>
            <a
              href="https://school-webapp-self.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded transition-colors"
            >
              Main Campus Portal ↗
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 NexaCampus Systems. All rights reserved. Built to academic compliance standards.</p>
          <div className="flex items-center gap-4">
            <a href="https://school-webapp-self.vercel.app/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="https://school-webapp-self.vercel.app/terms" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="https://school-webapp-self.vercel.app/disclosures" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Mandatory Disclosures</a>
            <span>•</span>
            <a href="https://github.com/nexaCampus/schoolapp-nexacampus-maker" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">GitHub Repository</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
