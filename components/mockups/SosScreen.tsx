import React from 'react';

export const SosScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-4 pb-5 bg-gradient-to-b from-[var(--color-brand-wash)] to-[var(--color-surface-base)] text-left">
      {/* Header bar */}
      <div>
        <div className="flex items-center justify-between h-5 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)]" />
            <span className="text-[11px] font-semibold text-[var(--color-brand-primary)]" style={{ letterSpacing: '0.08em' }}>
              Jaipur Pilot
            </span>
          </div>
          <span className="text-[10px] font-medium px-2 py-[3px] rounded-full bg-emerald-100 text-emerald-800">
            GPS Active
          </span>
        </div>

        {/* Hindi headline copy */}
        <h4 lang="hi" className="text-[19px] font-bold text-[var(--color-text-primary)]" style={{ lineHeight: 1.5 }}>
          आपकी यात्रा, आपके नियंत्रण में
        </h4>
        <p className="text-[12px] text-[var(--color-text-tertiary)] italic mt-1.5">
          "Your journey, in your control"
        </p>
      </div>

      {/* SOS Button Display (Permitted file for alert/sos per Design.md §11.4) */}
      <div className="my-5 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-[96px] h-[96px] rounded-full bg-[var(--color-alert-sos)] opacity-12" style={{ filter: 'blur(8px)' }} />
          <div className="relative w-[96px] h-[96px] rounded-full bg-[var(--color-alert-sos)] text-[var(--color-surface-base)] flex flex-col items-center justify-center shadow-lg border-2 border-white cursor-pointer active:scale-95 transition-transform">
            <svg className="w-5 h-5 fill-current" style={{ marginBottom: 4 }} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span className="text-[13px] font-bold tracking-wider uppercase">SOS</span>
          </div>
        </div>
        <span className="mt-2.5 text-[11px] text-[var(--color-text-tertiary)]">
          Hold 2s for emergency contacts
        </span>
      </div>

      {/* Feature quick access cards inside mockup */}
      <div className="flex flex-col gap-2.5">
        <div className="p-3 rounded-xl bg-white border border-[var(--color-border-default)] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-7 h-7 shrink-0 rounded-lg bg-[var(--color-brand-wash)] flex items-center justify-center text-[var(--color-brand-primary)]">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[13px] text-[var(--color-text-primary)] truncate">Auto Fare Calculator</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Govt tariff reference</div>
            </div>
          </div>
          <span className="shrink-0 ml-2 font-mono font-bold text-[13px] text-[var(--color-brand-primary)]">₹120</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-[var(--color-border-default)] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-7 h-7 shrink-0 rounded-lg bg-[var(--color-brand-wash)] flex items-center justify-center text-[var(--color-brand-primary)]">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[13px] text-[var(--color-text-primary)] truncate">Verified Guide Check</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Licence # verified</div>
            </div>
          </div>
          <span className="shrink-0 ml-2 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]">
            Check
          </span>
        </div>
      </div>
    </div>
  );
};
