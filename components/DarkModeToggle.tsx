'use client';

import React, { useEffect, useState } from 'react';

export default function DarkModeToggle({ className = '' }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check whether dark mode is currently active
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const active =
      saved === 'dark' ||
      (!saved && prefersDark) ||
      document.documentElement.classList.contains('dark');

    setIsDark(active);
    if (active) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const willBeDark = !isCurrentlyDark;
    setIsDark(willBeDark);
    if (willBeDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-surface-container dark:bg-[#151622] text-on-surface hover:bg-surface-container-high dark:hover:bg-[#1a1c2b] border border-outline/20 dark:border-[#222538] shadow-sm active:scale-95 transition-all duration-200 cursor-pointer flex-shrink-0 z-20 group ${className}`}
    >
      {isDark ? (
        // Bright glowing sun icon in dark mode — clicking switches back to light mode
        <span className="material-symbols-outlined text-[20px] text-amber-400 group-hover:rotate-45 transition-transform duration-300">
          light_mode
        </span>
      ) : (
        // Sleek moon icon in light mode — clicking switches to dark mode
        <span className="material-symbols-outlined text-[19px] text-indigo-600 dark:text-[#bdc2ff] group-hover:-rotate-12 transition-transform duration-300">
          dark_mode
        </span>
      )}
    </button>
  );
}
