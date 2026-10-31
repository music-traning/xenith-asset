'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Cpu, LayoutDashboard, Scale } from 'lucide-react';
import { FEATURE_CARDS } from '@/data/lpContentData';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { FeatureCardItem } from '@/types/xenith';

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

function renderFeatureIcon(iconName: FeatureCardItem['iconName']): React.JSX.Element {
  switch (iconName) {
    case 'cpu':
      return <Cpu className="h-6 w-6 text-custom-gold" aria-hidden="true" />;
    case 'scale':
      return <Scale className="h-6 w-6 text-custom-gold" aria-hidden="true" />;
    case 'layout-dashboard':
      return (
        <LayoutDashboard className="h-6 w-6 text-custom-gold" aria-hidden="true" />
      );
  }
}

export const FeaturesSection: React.FC = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative bg-slate-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* 共通UI: SectionHeading */}
        <SectionHeading
          id="features-heading"
          eyebrowEn="CORE COMPETENCE & ARCHITECTURE"
          title="属人性を排除した、データドリブンな資産防衛。"
        />

        {/* 3カラムのカードグリッドUI (gap-8 lg:gap-12) */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-20 lg:gap-12"
        >
          {FEATURE_CARDS.map((feature) => (
            <motion.div key={feature.id} variants={cardVariants} className="flex">
              <GlassCard
                as="article"
                interactive
                className="group relative flex w-full flex-col justify-between p-8 lg:p-10"
              >
                {/* ホバー時に上辺に浮かび上がる微かなゴールド光彩 */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-custom-gold to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />

                <div>
                  {/* カード上部: ナンバリング & アイコン */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-950 transition-all duration-300 ease-in-out group-hover:border-custom-gold group-hover:shadow-gold-glow">
                      {renderFeatureIcon(feature.iconName)}
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-serif text-3xl font-semibold tracking-wider text-slate-400/50 transition-colors duration-300 ease-in-out group-hover:text-custom-gold"
                    >
                      {feature.indexLabel}
                    </span>
                  </div>

                  <p className="mt-6 font-serif text-xs font-medium tracking-[0.22em] text-custom-gold">
                    {feature.badgeEn}
                  </p>

                  {/* 特徴見出し (h3): Noto Serif JP + Cormorant Garamond */}
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-slate-50 lg:text-2xl">
                    {feature.title}
                  </h3>

                  {/* 特徴説明文 (p): Noto Sans JP + Inter (text-slate-400) */}
                  <p className="mt-4 font-sans text-sm font-normal leading-[1.9] text-slate-400">
                    {feature.description}
                  </p>
                </div>

                {/* カード下部: 定量スペック指標 */}
                <dl className="mt-8 border-t border-slate-700/50 pt-5 transition-colors duration-300 ease-in-out group-hover:border-custom-gold/40">
                  <dt className="font-sans text-[11px] font-normal text-slate-400">
                    {feature.metricLabel}
                  </dt>
                  <dd className="mt-1 font-sans text-sm font-medium tracking-wide text-custom-gold-light">
                    {feature.metricValue}
                  </dd>
                </dl>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
