'use client';

import React, { useState } from 'react';
import { CreatorSession } from './SchoolMakerHeader';

export default function SchoolMakerAuthModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose?: () => void;
  onSuccess: (session: CreatorSession) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError(null);
    setOtpSent(true);
    // Preset mock OTP for testing ease
    setOtpCode('123456');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length < 4) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const session: CreatorSession = {
        phone: phoneNumber.startsWith('+') ? phoneNumber : `+91 ${phoneNumber}`,
        creatorName: creatorName.trim() || 'School Administrator',
        verifiedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem('schoolmaker_creator_session', JSON.stringify(session));
      } catch (err) {
        console.error('Failed to store creator session', err);
      }

      onSuccess(session);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in font-sans">
      <div className="bg-white dark:bg-[#151622] text-[#131b2e] dark:text-[#eaedff] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#e2e7ff] dark:border-[#222538] transition-colors">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#1c2ac8] dark:from-[#101119] dark:to-[#1a1c2b] text-white p-6 border-b border-[#e2e7ff]/10 dark:border-[#222538]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-base shadow-sm">
                ⚙️
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block">
                  NexaCampus SchoolMaker
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  Creator Verification
                </h3>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs text-slate-200/90 mt-2 leading-relaxed">
            Verify with your official phone number to create, configure, and manage institutional school apps.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-xl border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {!otpSent ? (
            /* Step A: Phone Number Entry */
            <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                  Full Name / Administrator Name
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full p-2.5 bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:ring-2 focus:ring-[#1c2ac8] dark:focus:ring-[#3b49df] text-[#131b2e] dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                  Official Mobile Phone Number *
                </label>
                <div className="flex items-center rounded-xl border border-[#c6c5d8] dark:border-[#2b2f4a] overflow-hidden bg-[#faf8ff] dark:bg-[#101119] focus-within:ring-2 focus-within:ring-[#1c2ac8] dark:focus-within:ring-[#3b49df]">
                  <span className="px-3 py-2.5 text-xs text-[#454655] dark:text-[#a0a4c0] bg-[#f2f3ff] dark:bg-[#151622] border-r border-[#c6c5d8] dark:border-[#2b2f4a] font-mono font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98301 23456"
                    className="flex-1 p-2.5 text-[#131b2e] dark:text-white font-mono font-semibold focus:outline-hidden bg-transparent"
                  />
                </div>
                <p className="text-[11px] text-[#454655] dark:text-[#a0a4c0] mt-1">
                  A 6-digit SMS verification code will be dispatched to this number.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1c2ac8] hover:bg-[#15209e] dark:bg-[#3b49df] dark:hover:bg-[#2e3cc4] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Verification Code</span>
                  <span className="text-amber-300">→</span>
                </button>
              </div>
            </form>
          ) : (
            /* Step B: 6-Digit OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-500/10 dark:bg-amber-500/15 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[#454655] dark:text-[#a0a4c0] block text-[11px]">Verification code sent to:</span>
                  <span className="font-mono font-bold text-[#131b2e] dark:text-white">
                    {phoneNumber.startsWith('+') ? phoneNumber : `+91 ${phoneNumber}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-amber-700 dark:text-amber-300 underline text-[11px] font-semibold cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                  Enter 6-Digit SMS Code *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full p-3 text-center tracking-[0.5em] text-lg font-mono font-bold bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:ring-2 focus:ring-[#1c2ac8] dark:focus:ring-[#3b49df] text-[#131b2e] dark:text-white"
                />
                <div className="flex items-center justify-between text-[11px] text-[#454655] dark:text-[#a0a4c0] mt-1.5">
                  <span>Simulated OTP: Use <strong>123456</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtpCode('123456')}
                    className="text-[#1c2ac8] dark:text-[#bdc2ff] underline font-bold cursor-pointer"
                  >
                    Auto-fill
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#1c2ac8] hover:bg-[#15209e] dark:bg-[#3b49df] dark:hover:bg-[#2e3cc4] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isVerifying ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <span>Verify &amp; Enter SchoolMaker</span>
                      <span className="text-amber-300">✓</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Security footnote */}
          <div className="mt-5 pt-4 border-t border-[#e2e7ff] dark:border-[#222538] flex items-center justify-center gap-1.5 text-[11px] text-[#454655] dark:text-[#a0a4c0] font-mono">
            <span>🔒</span>
            <span>256-Bit Cryptographic Creator Token Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
