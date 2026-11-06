'use client';

import React, { useState } from 'react';
import { ArrowRight, Lock, PhoneOff, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ApplicationModal } from '@/components/modals/ApplicationModal';
import { Reveal } from '@/components/ui/Reveal';

export const CtaSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-28 lg:py-32"
    >
      {/* 視線を中央に集中させる深いラジアルグラデーション & 光彩 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[520px] w-[960px] rounded-full bg-gradient-radial from-custom-gold/20 via-custom-gold/5 to-transparent blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-custom-gold/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
        <Reveal>
          <GlassCard
            as="article"
            className="border-custom-gold/40 px-6 py-16 sm:px-14 sm:py-20"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-custom-gold/50 bg-slate-950 px-4 py-1.5">
              <Lock
                className="h-3.5 w-3.5 text-custom-gold-light"
                aria-hidden="true"
              />
              <span className="font-serif text-xs font-medium tracking-[0.22em] text-custom-gold-light">
                PRIVATE MEMBERSHIP APPLICATION
              </span>
            </div>

            {/* 3-8 見出し (h2): Noto Serif JP + Cormorant Garamond */}
            <h2
              id="cta-heading"
              className="mt-6 font-serif text-3xl font-semibold leading-[1.42] tracking-tight text-slate-50 sm:text-4xl lg:text-5xl"
            >
              次のステージへ、
              <br className="sm:hidden" />
              ポートフォリオを進化させる。
            </h2>

            <p className="mx-auto mt-6 max-w-2xl font-sans text-sm font-normal leading-[1.95] text-slate-400 sm:text-base">
              現在、審査品質および非公開物件の希少性維持のため、月間の新規メンバーシップ承認枠を制限しております。所定のオンライン審査完了後、専任コンシェルジュより暗号化回線にてご連絡いたします。
            </p>

            {/* Phase 3: クリックで ApplicationModal を起動するコンバージョンボタン */}
            <div className="mt-10 flex justify-center">
              <GoldButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                size="lg"
                scaleOnHover
                ariaLabel="完全審査制の非公開物件へのアクセス権申請モーダルを開く"
              >
                <span>【完全審査制】非公開物件へのアクセス権を申請する</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </GoldButton>
            </div>

            {/* 下部トラスト保証表記 */}
            <ul
              aria-label="セキュリティおよびプライバシー保証"
              className="mt-10 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 font-sans text-xs font-normal text-slate-400"
            >
              <li className="flex items-center gap-2">
                <PhoneOff
                  className="h-4 w-4 text-custom-gold"
                  aria-hidden="true"
                />
                <span>営業電話・無断訪問ゼロ保証</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck
                  className="h-4 w-4 text-custom-gold"
                  aria-hidden="true"
                />
                <span>NDA（秘密保持契約）自動締結・金融庁ガイドライン準拠暗号化</span>
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </div>

      {/* Phase 3: 完全審査制申し込みフォームモーダル */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
