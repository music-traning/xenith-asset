import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-950 py-16 text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 sm:flex-row lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-custom-gold/50 bg-slate-800/40 font-serif text-sm font-semibold text-custom-gold-light">
            X
          </div>
          <span className="font-serif text-sm font-semibold tracking-[0.24em] text-slate-50">
            XENITH ASSET
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-8 font-sans text-xs font-normal text-slate-400">
          <a
            href="#problem"
            className="transition-all duration-300 ease-in-out hover:text-custom-gold-light"
          >
            フィロソフィー
          </a>
          <a
            href="#features"
            className="transition-all duration-300 ease-in-out hover:text-custom-gold-light"
          >
            3つの特徴
          </a>
          <a
            href="#dashboard"
            className="transition-all duration-300 ease-in-out hover:text-custom-gold-light"
          >
            ダッシュボード
          </a>
          <a
            href="#pricing"
            className="transition-all duration-300 ease-in-out hover:text-custom-gold-light"
          >
            招待制プラン
          </a>
          <a
            href="#faq"
            className="transition-all duration-300 ease-in-out hover:text-custom-gold-light"
          >
            FAQ
          </a>
        </div>

        <p className="font-sans text-xs font-normal tracking-wider text-slate-400">
          &copy; {new Date().getFullYear()} XENITH ASSET Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
