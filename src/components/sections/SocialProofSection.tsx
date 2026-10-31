'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PARTNER_BRAND_LOGOS } from '@/data/lpContentData';

export const SocialProofSection: React.FC = () => {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="relative border-y border-slate-700/50 bg-slate-950 py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="font-serif text-xs font-medium uppercase tracking-[0.28em] text-custom-gold">
            PROVEN TRACK RECORD &amp; ALLIANCE
          </p>
          <h2
            id="social-proof-heading"
            className="mt-3 font-serif text-xl font-medium tracking-wide text-slate-50 sm:text-2xl lg:text-[1.75rem]"
          >
            上場企業役員・医師を中心に、累計取扱高500億円を突破。
          </h2>
        </motion.header>

        {/* メディア・提携プライベートバンク 5社横並びロゴリスト */}
        <motion.ul
          aria-label="掲載メディアおよび提携金融・税務機関"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="mt-12 grid grid-cols-1 items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8"
        >
          {PARTNER_BRAND_LOGOS.map((brand) => (
            <li
              key={brand.id}
              className="group flex flex-col items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/40 px-5 py-6 shadow-glass backdrop-blur-md grayscale opacity-50 transition-all duration-300 ease-in-out hover:border-custom-gold/60 hover:grayscale-0 hover:opacity-100 hover:shadow-gold-glow"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded border border-custom-gold/50 bg-slate-950 font-serif text-xs font-semibold tracking-widest text-custom-gold-light"
                >
                  {brand.monogram}
                </span>
                <span className="font-serif text-xs font-semibold tracking-[0.18em] text-slate-50 sm:text-sm">
                  {brand.name}
                </span>
              </div>
              <span className="mt-2 font-sans text-[10px] font-normal tracking-[0.2em] text-slate-400 transition-colors duration-300 ease-in-out group-hover:text-custom-gold-light">
                {brand.category}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
