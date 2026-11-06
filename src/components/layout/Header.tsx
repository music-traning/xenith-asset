'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Lock, Menu, ShieldCheck, X } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@/data/heroSimulationData';
import { triggerApplicationModal } from '@/components/modals/ApplicationModal';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // 強制リフローを避けるため、マウント直後の同期ジオメトリ読み取りを行わず passive scroll イベントのみで検知
  useEffect(() => {
    let ticking = false;
    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // フルスクリーンメニュー展開時の背面スクロールロック
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (): void => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenApplicationModal = (): void => {
    setIsMobileMenuOpen(false);
    triggerApplicationModal();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'border-b border-white/10 bg-slate-950/80 py-3 shadow-glass backdrop-blur-md'
            : 'border-b border-transparent bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-12">
          {/* ロゴ: モバイル(md未満)ではアイコン＋1行テキストのみ */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="XENITH ASSET トップへ戻る"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-custom-gold/50 bg-slate-900/60 backdrop-blur-md transition-all duration-300 ease-in-out group-hover:border-custom-gold-light group-hover:shadow-gold-glow">
              <span className="font-serif text-lg font-semibold tracking-widest text-custom-gold-light">
                X
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-custom-gold shadow-gold-glow" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold tracking-[0.22em] text-slate-50 sm:text-lg">
                XENITH ASSET
              </span>
              <span className="hidden font-sans text-[10px] font-normal tracking-[0.18em] text-slate-400 md:block">
                PRIVATE WEALTH QUANTITATIVE SaaS
              </span>
            </div>
          </a>

          {/* デスクトップナビゲーション (md以上で表示) */}
          <nav
            className="hidden items-center gap-7 md:flex lg:gap-10"
            aria-label="グローバルナビゲーション"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex flex-col items-start transition-all duration-300 ease-in-out"
              >
                <span className="font-serif text-[10px] font-medium tracking-[0.22em] text-custom-gold transition-colors duration-300 group-hover:text-custom-gold-light">
                  {item.labelEn}
                </span>
                <span className="mt-0.5 font-sans text-xs font-normal tracking-wider text-slate-300 transition-colors duration-300 group-hover:text-slate-50">
                  {item.labelJa}
                </span>
              </a>
            ))}
          </nav>

          {/* デスクトップ右側CTA (md以上で表示) */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 px-3.5 py-1.5 backdrop-blur-md xl:flex">
              <ShieldCheck
                className="h-3.5 w-3.5 text-custom-gold"
                aria-hidden="true"
              />
              <span className="font-sans text-[11px] font-normal tracking-wider text-slate-300">
                金融資産1億円以上・完全招待制
              </span>
            </div>

            <button
              type="button"
              onClick={handleOpenApplicationModal}
              aria-label="非公開物件へのアクセス権審査を申請する"
              className="group inline-flex items-center gap-2 rounded-xl border border-custom-gold/60 bg-slate-900/50 px-5 py-2.5 font-sans text-xs font-medium tracking-wider text-slate-50 backdrop-blur-md transition-all duration-300 ease-in-out hover:border-custom-gold-light hover:bg-custom-gold/15 hover:text-custom-gold-light hover:shadow-gold-glow"
            >
              <Lock className="h-3.5 w-3.5 text-custom-gold" aria-hidden="true" />
              <span>アクセス権を申請</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-custom-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* モバイル用ハンバーガーメニューアイコン (md未満のみ表示) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="メニューを開く"
            aria-expanded={isMobileMenuOpen}
            aria-controls="fullscreen-mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-slate-900/60 text-slate-50 backdrop-blur-md transition-all duration-300 hover:border-custom-gold md:hidden"
          >
            <Menu className="h-5 w-5 text-custom-gold-light" />
          </button>
        </div>
      </header>

      {/* フルスクリーン・オーバーレイメニュー（開いている時のみDOMマウントし初期DOMサイズを削減） */}
      {isMobileMenuOpen ? (
        <div
          id="fullscreen-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="モバイルフルスクリーンナビゲーション"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-slate-950/95 px-6 py-6 backdrop-blur-xl md:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-custom-gold/10 blur-[120px]"
          />

          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-custom-gold/50 bg-slate-900">
                <span className="font-serif text-lg font-semibold text-custom-gold-light">
                  X
                </span>
              </div>
              <span className="font-serif text-base font-semibold tracking-[0.22em] text-slate-50">
                XENITH ASSET
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="メニューを閉じる"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-slate-900 text-slate-50 transition-colors hover:border-custom-gold"
            >
              <X className="h-5 w-5 text-custom-gold-light" />
            </button>
          </div>

          <nav
            aria-label="モバイルナビゲーション"
            className="relative z-10 my-auto flex flex-col items-center justify-center space-y-7 text-center"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMobileNavClick}
                className="group flex flex-col items-center"
              >
                <span className="font-serif text-xs tracking-[0.28em] text-custom-gold">
                  {item.labelEn}
                </span>
                <span className="mt-1 font-serif text-2xl font-medium tracking-wider text-slate-50 transition-colors duration-300 group-hover:text-custom-gold-light sm:text-3xl">
                  {item.labelJa}
                </span>
              </a>
            ))}
          </nav>

          <div className="relative z-10 border-t border-white/10 pt-6 text-center">
            <button
              type="button"
              onClick={handleOpenApplicationModal}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-custom-gold-light/40 bg-custom-gold px-6 py-4 font-sans text-sm font-semibold tracking-wider text-slate-950 shadow-gold-glow transition-all duration-300 hover:bg-custom-gold-light"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span>【完全審査制】アクセス権を申請する</span>
            </button>
            <p className="mt-3 font-sans text-[11px] text-slate-400">
              年収3,000万円以上・金融資産1億円以上 / 完全招待制
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};
