'use client';

import React, { useState } from 'react';
import { CreatorSession } from './SchoolMakerHeader';
import { sendMakerOTP, verifyMakerOTP } from '@/lib/api/makerClient';

const OTP_VERIFY_ERROR = 'Enter the Correct OTP and try again.';
const NETWORK_ERROR = 'Could not reach the verification service. Check your connection and try again.';
const SEND_ERROR = 'Could not dispatch the verification code. Please try again.';

function isNetworkFailure(err: unknown): boolean {
  const raw = err instanceof Error ? err.message : String(err ?? '');
  return (
    err instanceof TypeError ||
    /failed to fetch|networkerror|load failed|fetch failed|failed to load|ECONNREFUSED/i.test(raw)
  );
}

/** Dispatch step: never leak a raw transport error to the creator. */
function sendErrorMessage(err: unknown): string {
  if (isNetworkFailure(err)) return NETWORK_ERROR;
  const raw = err instanceof Error ? err.message : String(err ?? '');
  if (!raw || /failed to|internal|exception|status \d|\[object|undefined/i.test(raw)) {
    return SEND_ERROR;
  }
  return raw;
}

/** Verification step: every failure is an OTP problem from the creator's point of view. */
function verifyErrorMessage(): string {
  return OTP_VERIFY_ERROR;
}

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
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [devHint, setDevHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = phoneNumber.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError(null);
    setOtpError(null);
    setIsSendingOtp(true);

    const fullPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91 ${digitsOnly.slice(-10)}`;

    try {
      await sendMakerOTP(fullPhone, creatorName.trim() || 'School Administrator');
      setOtpSent(true);
      setOtpCode('');
      setDevHint(null);
    } catch (err: unknown) {
      setError(sendErrorMessage(err));
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length < 4) {
      setError(null);
      setOtpError('Enter the correct 6-digit OTP sent to your phone.');
      return;
    }

    setIsVerifying(true);
    setError(null);
    setOtpError(null);

    const fullPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91 ${phoneNumber.replace(/[^0-9]/g, '').slice(-10)}`;

    try {
      const res = await verifyMakerOTP(fullPhone, otpCode, creatorName.trim() || 'School Administrator');
      const session: CreatorSession = {
        phone: res.session.phone,
        creatorName: res.session.creatorName,
        verifiedAt: res.session.verifiedAt,
        token: res.token,
      };

      try {
        localStorage.setItem('schoolmaker_creator_session', JSON.stringify(session));
        if (res.token) {
          localStorage.setItem('schoolmaker_creator_token', res.token);
        }
      } catch (err) {
        console.error('Failed to store creator session', err);
      }

      // Ask the server to mint the signed creator cookie the edge guard trusts.
      try {
        await fetch('/api/auth/session', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'creator',
            phone: res.session.phone,
            token: res.token || '',
          }),
        });
      } catch {
        // Non-fatal: the studio still works in this tab.
      }

      onSuccess(session);
    } catch (err: unknown) {
      setError(null);
      setOtpError(verifyErrorMessage());
    } finally {
      setIsVerifying(false);
    }
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
                <h2 className="font-serif font-bold text-lg text-white">
                  Creator Verification
                </h2>
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
            Verify with your official phone number to create, configure, and manage institutional school apps backed by Go engine.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && !otpSent && (
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
                    placeholder="6289652321"
                    className="flex-1 p-2.5 text-[#131b2e] dark:text-white font-mono font-semibold focus:outline-hidden bg-transparent"
                  />
                </div>
                <p className="text-[11px] text-[#454655] dark:text-[#a0a4c0] mt-1">
                  A 6-digit WhatsApp verification code will be dispatched to this number.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="w-full py-3 bg-[#1c2ac8] hover:bg-[#15209e] dark:bg-[#3b49df] dark:hover:bg-[#2e3cc4] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSendingOtp ? (
                    <span>Dispatching WhatsApp OTP...</span>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <span className="text-amber-300">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Step B: 6-Digit OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[#454655] dark:text-[#a0a4c0] block text-[11px]">Verification code sent via WhatsApp to:</span>
                  <span className="font-mono font-bold text-[#131b2e] dark:text-white flex items-center gap-1.5 mt-0.5">
                    <span className="text-emerald-500 text-sm">💬</span>
                    {phoneNumber.startsWith('+') ? phoneNumber : `+91 ${phoneNumber}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtpCode('');
                  }}
                  className="text-emerald-700 dark:text-emerald-400 underline text-[11px] font-semibold cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] dark:text-[#eaedff] mb-1">
                  Enter 6-Digit WhatsApp Code *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtpCode(clean);
                    if (otpError) setOtpError(null);
                  }}
                  placeholder="• • • • • •"
                  className="w-full p-3 text-center tracking-[0.5em] text-lg font-mono font-bold bg-[#faf8ff] dark:bg-[#101119] border border-[#c6c5d8] dark:border-[#2b2f4a] rounded-xl focus:ring-2 focus:ring-[#1c2ac8] dark:focus:ring-[#3b49df] text-[#131b2e] dark:text-white placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400"
                />
                <div className="flex items-center justify-between text-[11px] text-[#454655] dark:text-[#a0a4c0] mt-1.5">
                  <span>Enter the 6-digit code received on your WhatsApp number.</span>
                </div>
                {otpError && (
                  <p className="mt-2 flex items-start gap-1.5 text-[11px] font-bold text-red-600 dark:text-red-400">
                    <span aria-hidden="true">⚠</span>
                    <span>{otpError}</span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#1c2ac8] hover:bg-[#15209e] dark:bg-[#3b49df] dark:hover:bg-[#2e3cc4] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isVerifying ? (
                    <span>Verifying WhatsApp OTP...</span>
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
