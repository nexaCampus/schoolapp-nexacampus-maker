import React from 'react';

export default function SchoolMakerFooter() {
  return (
    <footer className="w-full bg-white dark:bg-[#151622] border-t border-[#e2e7ff] dark:border-[#222538] text-[#454655] dark:text-[#a0a4c0] py-10 mt-auto font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#e2e7ff] dark:border-[#222538] text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow">
              NC
            </div>
            <div>
              <p className="font-bold text-[#131b2e] dark:text-white text-sm">
                NexaCampus SchoolMaker Studio
              </p>
              <p className="text-[#454655] dark:text-[#a0a4c0] text-xs">
                Official Multi-Tenant App Creation Extension for <a href="https://github.com/nexaCampus/school-webapp" target="_blank" rel="noopener noreferrer" className="text-[#1c2ac8] dark:text-amber-300 hover:underline">nexaCampus/school-webapp</a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#454655] dark:text-[#a0a4c0]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f2f3ff] dark:bg-[#101119] text-amber-800 dark:text-amber-300 border border-[#e2e7ff] dark:border-[#222538]">
              🔒 256-Bit SSL Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f2f3ff] dark:bg-[#101119] text-emerald-800 dark:text-emerald-300 border border-[#e2e7ff] dark:border-[#222538]">
              ✓ Multi-Tenant Compliant
            </span>
            <a
              href="https://school-webapp-self.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#1c2ac8] hover:bg-[#15209e] dark:bg-[#3b49df] dark:hover:bg-[#2e3cc4] text-white font-bold rounded-lg transition-colors"
            >
              Main Campus Portal ↗
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#454655] dark:text-[#a0a4c0]">
          <p>© 2026 NexaCampus Systems. All rights reserved. Built to academic compliance standards.</p>
          <div className="flex items-center gap-4">
            <a href="https://school-webapp-self.vercel.app/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c2ac8] dark:hover:text-amber-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="https://school-webapp-self.vercel.app/terms" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c2ac8] dark:hover:text-amber-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="https://school-webapp-self.vercel.app/disclosures" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c2ac8] dark:hover:text-amber-300 transition-colors">Mandatory Disclosures</a>
            <span>•</span>
            <a href="https://github.com/nexaCampus/schoolapp-nexacampus-maker" target="_blank" rel="noopener noreferrer" className="hover:text-[#1c2ac8] dark:hover:text-amber-300 transition-colors">GitHub Repository</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
