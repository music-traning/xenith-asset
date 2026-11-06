import React from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { CtaSection } from '@/components/sections/CtaSection';
import { DashboardPreviewSection } from '@/components/sections/DashboardPreviewSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { Hero } from '@/components/sections/Hero';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';

/**
 * XENITH ASSET - Landing Page Entry (Server Component)
 * Phase 2 の情報設計（3-1 〜 3-8）および Phase 3〜4 のデザインシステム仕様に基づき、
 * 全8セクションを上から順に配置。
 */
export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        {/* 3-1. Hero Section (FV：ファーストビュー) */}
        <Hero />

        {/* 3-2. Social Proof (権威付け・実績) */}
        <SocialProofSection />

        {/* 3-3. Problem (課題提起・共感) */}
        <ProblemSection />

        {/* 3-4. Features (解決策・特徴3選) */}
        <FeaturesSection />

        {/* 3-5. Dashboard UI Preview (機能詳細・ベネフィット) */}
        <DashboardPreviewSection />

        {/* 3-6. Pricing (料金表) */}
        <PricingSection />

        {/* 3-7. FAQ (よくある質問) */}
        <FaqSection />

        {/* 3-8. CTA (コンバージョンエリア) */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
