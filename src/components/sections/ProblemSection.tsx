'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ProblemSection: React.FC = () => {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative overflow-hidden bg-slate-950 py-32"
    >
      {/* 静謐な縦軸ラインと微細な背景光 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between"
      >
        <div className="h-20 w-[1px] bg-gradient-to-b from-slate-700/60 to-transparent" />
        <div className="h-96 w-96 rounded-full bg-custom-gold/[0.06] blur-[140px]" />
        <div className="h-20 w-[1px] bg-gradient-to-t from-slate-700/60 to-transparent" />
      </div>

      <article className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="font-serif text-xs font-medium uppercase tracking-[0.32em] text-custom-gold">
            THE ILLUSION OF SURFACE YIELD
          </p>

          {/* 3-3 見出し (h2): Noto Serif JP の美しいカーニングで魅せるタイポグラフィ */}
          <h2
            id="problem-heading"
            className="mt-6 font-serif text-3xl font-semibold leading-[1.55] tracking-[0.04em] text-slate-50 sm:text-4xl lg:text-[2.75rem]"
          >
            「表面利回りの罠」に気づき始めた、
            <br className="hidden sm:inline" />
            すべての賢者たちへ。
          </h2>
        </motion.header>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto my-12 h-[1px] w-24 bg-gradient-to-r from-transparent via-custom-gold to-transparent"
        />

        {/* 3-3 サブテキスト (p) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto max-w-2xl font-serif text-lg font-medium leading-[2.25] tracking-[0.06em] text-slate-400 sm:text-xl"
        >
          節税目的の不動産投資が、結果的にキャッシュフローを圧迫している。市場に出回る頃には、本当に価値ある物件はすでに買われている。私たちは、その情報の非対称性をテクノロジーで破壊します。
        </motion.p>
      </article>
    </section>
  );
};
