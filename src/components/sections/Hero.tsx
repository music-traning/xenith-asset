'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Lock, PhoneOff, ShieldCheck } from 'lucide-react';
import { triggerApplicationModal } from '@/components/modals/ApplicationModal';

/**
 * 3. アニメーション要件:
 * 親コンテナで staggerChildren を設定し、見出し → サブテキスト → CTAボタン の順に
 * ラグジュアリーな間を持たせて静かに出現させる。
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.15,
    },
  },
};

/**
 * 各要素のフェードイン（下から上へ y: 24 -> 0, opacity: 0 -> 1, duration: 0.8, ease: "easeOut"）
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const Hero: React.FC = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 pt-28 pb-24 lg:pt-32 lg:pb-28"
    >
      {/* 1. 背景画像レイヤー: Core Web Vitals 最適化のため next/image (fill, priority) を使用 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/mv.jpg"
          alt="XENITH ASSET 象徴する重厚なモダニズム建築と静謐な間接照明のメインビジュアル"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          className="scale-[1.02] object-cover object-center brightness-95"
        />

        {/* 重厚なグラデーションオーバーレイ: テキスト可読性の担保と下部セクション(slate-950)へのシームレスな接続 */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-950" />

        {/* 中央テキスト背面の可読性をさらに高める微細なラジアルシェード */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.55)_0%,transparent_75%)]" />
      </div>

      {/* 2 & 3. メインコンテンツコンテナ（Framer Motion による時間差フェードイン） */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* ステータス・アイブロウバッジ */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-custom-gold/40 bg-slate-900/60 px-4 py-1.5 shadow-glass backdrop-blur-md">
              <Lock
                className="h-3.5 w-3.5 text-custom-gold"
                aria-hidden="true"
              />
              <span className="font-serif text-xs font-medium uppercase tracking-[0.24em] text-custom-gold-light">
                PRIVATE REAL ESTATE &amp; TAX INTELLIGENCE
              </span>
            </div>
          </motion.div>

          {/* 2. 見出し (h1): font-serif (Noto Serif JP + Cormorant Garamond), tracking-wide, leading-relaxed */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="max-w-4xl font-serif text-3xl font-semibold leading-relaxed tracking-wide text-slate-50 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.42]"
          >
            資産を<span className="text-custom-gold-light">「守る」</span>から
            <span className="text-custom-gold-light">「創る」</span>へ。
            <span className="mt-3 block text-2xl font-medium leading-relaxed tracking-wide text-slate-50/95 sm:text-3xl md:text-4xl lg:mt-4 lg:text-[2.35rem] lg:leading-[1.48]">
              限られた層のための、完全非公開・不動産投資プラットフォーム
            </span>
          </motion.h1>

          {/* 装飾セパレーター */}
          <motion.div
            variants={itemVariants}
            aria-hidden="true"
            className="my-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-custom-gold/70 to-transparent"
          />

          {/* 2. サブテキスト (p): font-sans (Noto Sans JP + Inter), tracking-wide, leading-relaxed */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl font-sans text-base font-normal leading-relaxed tracking-wide text-slate-300 sm:text-lg md:text-xl md:leading-[1.9]"
          >
            AIによる非公開物件のスコアリングと、税務最適化アルゴリズム。論理とデータが導き出す、資産防衛の最終解。
          </motion.p>

          {/* 4. CTAボタン: custom-gold (#C6A87C) 基調 + scale-105 + リッチなゴールドシャドウ + 矢印スライド */}
          <motion.div variants={itemVariants} className="mt-12">
            <button
              type="button"
              onClick={triggerApplicationModal}
              aria-label="完全審査制の非公開物件へのアクセス権を申請する"
              className="group relative inline-flex items-center justify-center gap-3.5 rounded-xl border border-custom-gold-light/40 bg-custom-gold px-8 py-4 font-sans text-sm font-medium tracking-wider text-slate-950 shadow-[0_0_15px_rgba(198,168,124,0.25)] transition-all duration-300 ease-out hover:scale-105 hover:bg-custom-gold-light hover:shadow-[0_0_28px_rgba(198,168,124,0.55)] active:bg-custom-gold-dark sm:px-10 sm:py-5 sm:text-base"
            >
              <span>【完全審査制】非公開物件へのアクセス権を申請する</span>
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </button>
          </motion.div>

          {/* 補足トラスト・ガバナンス指標 */}
          <motion.ul
            variants={itemVariants}
            aria-label="会員審査基準およびプライバシーポリシー"
            className="mt-12 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 border-t border-slate-700/50 pt-6 font-sans text-xs font-normal tracking-wide text-slate-400"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck
                className="h-4 w-4 text-custom-gold"
                aria-hidden="true"
              />
              <span>審査基準: 年収3,000万円以上・金融資産1億円以上</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneOff
                className="h-4 w-4 text-custom-gold"
                aria-hidden="true"
              />
              <span>営業電話・アポイント勧誘は一切行いません</span>
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
