'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  readonly id?: string;
  readonly eyebrowEn: string;
  readonly title: React.ReactNode;
  readonly description?: React.ReactNode;
  readonly align?: 'center' | 'left';
  readonly className?: string;
}

/**
 * 4-1 / 4-2 / 5-2. 共通UIコンポーネント: SectionHeading
 * - 見出し(h2): Noto Serif JP + Cormorant Garamond (font-serif font-semibold text-slate-50)
 * - サブテキスト(p): Noto Sans JP + Inter (font-sans font-normal text-slate-400)
 * - アニメーション: 無言の自信を感じさせる静かなフェードイン (duration: 0.8, ease: "easeOut")
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  eyebrowEn,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const alignClasses =
    align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left';

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`${alignClasses} ${className}`.trim()}
    >
      <p className="font-serif text-xs font-medium uppercase tracking-[0.28em] text-custom-gold">
        {eyebrowEn}
      </p>
      <h2
        id={id}
        className="mt-4 font-serif text-3xl font-semibold leading-[1.42] tracking-tight text-slate-50 sm:text-4xl lg:text-[2.5rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 font-sans text-base font-normal leading-relaxed text-slate-400">
          {description}
        </p>
      ) : null}
    </motion.header>
  );
};
