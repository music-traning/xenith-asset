'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Crown, ShieldCheck } from 'lucide-react';
import { INVITATION_PRICING_PLANS } from '@/data/lpContentData';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { triggerApplicationModal } from '@/components/modals/ApplicationModal';

export const PricingSection: React.FC = () => {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative bg-slate-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* 3-6 セクション見出し (h2) */}
        <SectionHeading
          id="pricing-heading"
          eyebrowEn="INVITATION-ONLY MEMBERSHIP TIERS"
          title="価値を理解できる方だけに提供する、2つの招待制プラン。"
          description="物件仲介手数料に依存しない独立系プラットフォームとして、オーナーの利益最大化に100%コミットするための会員制フィー体系を採用しています。"
        />

        {/* 2カラム料金カード (gap-8 lg:gap-12) */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          {INVITATION_PRICING_PLANS.map((plan, index) => {
            const isHighlighted = plan.isHighlighted;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
                className="flex"
              >
                <GlassCard
                  as="article"
                  highlighted={isHighlighted}
                  interactive={!isHighlighted}
                  className="flex w-full flex-col justify-between p-8 sm:p-10"
                >
                  <div>
                    {/* Family Office Plan ハイライトバッジ */}
                    {isHighlighted && plan.badgeText ? (
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-custom-gold/60 bg-custom-gold/15 px-4 py-1.5">
                        <Crown
                          className="h-3.5 w-3.5 text-custom-gold-light"
                          aria-hidden="true"
                        />
                        <span className="font-serif text-[11px] font-semibold tracking-[0.16em] text-custom-gold-light">
                          {plan.badgeText}
                        </span>
                      </div>
                    ) : (
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-950/60 px-4 py-1.5">
                        <ShieldCheck
                          className="h-3.5 w-3.5 text-slate-400"
                          aria-hidden="true"
                        />
                        <span className="font-serif text-[11px] font-medium tracking-[0.16em] text-slate-400">
                          PRIVATE CONCIERGE TIER
                        </span>
                      </div>
                    )}

                    {/* プラン名 (h3): Noto Serif JP + Cormorant Garamond */}
                    <h3 className="font-serif text-3xl font-semibold tracking-wide text-slate-50 sm:text-4xl">
                      {plan.planName}
                    </h3>

                    {/* 指定コピーライティング表記 */}
                    <p className="mt-3 font-sans text-base font-medium text-custom-gold-light">
                      {plan.subtitleJa}
                    </p>

                    {/* 価格内訳ディスプレイ (font-sans: Inter + Noto Sans JP) */}
                    <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-700/50 bg-slate-950 p-5 font-sans sm:grid-cols-2">
                      <div>
                        <dt className="text-[11px] font-normal text-slate-400">
                          初期導入・組成セットアップ費用
                        </dt>
                        <dd className="mt-1.5 text-2xl font-medium text-slate-50 sm:text-3xl">
                          {plan.setupFeeDisplay}
                        </dd>
                        <span className="text-[10px] font-normal text-slate-400">
                          （税別・入会審査通過時）
                        </span>
                      </div>
                      <div className="border-t border-slate-800 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                        <dt className="text-[11px] font-normal text-slate-400">
                          プラットフォーム月額利用料
                        </dt>
                        <dd className="mt-1.5 text-2xl font-medium text-custom-gold-light sm:text-3xl">
                          {plan.monthlyFeeDisplay}
                        </dd>
                        <span className="text-[10px] font-normal text-slate-400">
                          / 月（税別）
                        </span>
                      </div>
                    </dl>

                    <p className="mt-6 font-sans text-sm font-normal leading-relaxed text-slate-400">
                      {plan.summaryCopy}
                    </p>

                    <div className="mt-4 inline-block rounded-md border border-slate-700/50 bg-slate-950/60 px-3 py-1.5 font-sans text-xs font-normal text-slate-400">
                      {plan.targetAudience}
                    </div>

                    {/* 特典・機能リスト */}
                    <ul
                      aria-label={`${plan.planName} に含まれる機能と特典`}
                      className="mt-8 space-y-3.5 border-t border-slate-700/50 pt-6 font-sans"
                    >
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-3 text-xs font-normal leading-relaxed text-slate-50 sm:text-sm"
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              isHighlighted
                                ? 'bg-custom-gold/25 text-custom-gold-light'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 審査申込ボタン */}
                  <div className="mt-10 pt-2">
                    <GoldButton
                      onClick={triggerApplicationModal}
                      variant={isHighlighted ? 'primary' : 'outline'}
                      size="lg"
                      ariaLabel={`${plan.planName} の入会審査を申し込む`}
                      className="w-full"
                    >
                      <span>{plan.planName} の審査を申し込む</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </GoldButton>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
