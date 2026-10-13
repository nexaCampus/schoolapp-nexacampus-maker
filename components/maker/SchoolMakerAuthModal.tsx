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
      <div className="bg-white text-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-300">
        {/* Modal Top Header */}
        <div className="bg-oxford text-white p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-base">
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
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Verify with your official phone number to create, configure, and manage institutional school apps.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {!otpSent ? (
            /* Step A: Phone Number Entry */
            <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name / Administrator Name
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-oxford text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Official Mobile Phone Number *
                </label>
                <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-oxford">
                  <span className="px-3 py-2.5 text-xs text-slate-600 bg-slate-100 border-r border-slate-200 font-mono font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98301 23456"
                    className="flex-1 p-2.5 text-slate-900 font-mono font-semibold focus:outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  A 6-digit SMS verification code will be dispatched to this number.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-oxford hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Verification Code</span>
                  <span className="text-amber-400">→</span>
                </button>
              </div>
            </form>
          ) : (
            /* Step B: 6-Digit OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[11px]">Verification code sent to:</span>
                  <span className="font-mono font-bold text-oxford">
                    {phoneNumber.startsWith('+') ? phoneNumber : `+91 ${phoneNumber}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-amber-800 underline text-[11px] font-semibold"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Enter 6-Digit SMS Code *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full p-3 text-center tracking-[0.5em] text-lg font-mono font-bold bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-oxford text-oxford"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                  <span>Simulated OTP: Use <strong>123456</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtpCode('123456')}
                    className="text-oxford underline font-bold"
                  >
                    Auto-fill
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-oxford hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isVerifying ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <span>Verify & Enter SchoolMaker</span>
                      <span className="text-amber-400">✓</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Security footnote */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <span>🔒</span>
            <span>256-Bit Cryptographic Creator Token Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
