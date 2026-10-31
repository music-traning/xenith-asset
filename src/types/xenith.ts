/**
 * XENITH ASSET - Strict Domain & UI Type Definitions
 * 富裕層向け不動産投資・資産管理SaaSプラットフォーム型定義
 */

export type AssetTier = 'PRIME_OFF_MARKET' | 'SOVEREIGN_CORE' | 'LEGACY_PRESERVATION';

export type TaxEntityStructure =
  | 'MEDICAL_CORP'
  | 'ASSET_HOLDING_CO'
  | 'INDIVIDUAL_HIGH_BRACKET';

export interface ScoreBreakdownAxis {
  readonly id: string;
  readonly labelJa: string;
  readonly labelEn: string;
  readonly deviationScore: number;
  readonly weightPercentage: number;
  readonly benchmarkDelta: string;
}

export interface TaxExitProjectionYear {
  readonly year: number;
  readonly cumulativeTaxShieldMM: number;
  readonly netEquityPositionMM: number;
  readonly postTaxIrrPercent: number;
}

export interface OffMarketAssetSimulation {
  readonly assetCode: string;
  readonly titleJa: string;
  readonly districtEn: string;
  readonly tier: AssetTier;
  readonly acquisitionPriceMM: number;
  readonly compositeDeviation: number;
  readonly confidenceInterval: string;
  readonly axes: readonly ScoreBreakdownAxis[];
  readonly exitSummary: {
    readonly targetHoldingYears: 10;
    readonly projectedExitValuationMM: number;
    readonly netAfterTaxGainMM: number;
    readonly postTaxIrrPercent: number;
    readonly cumulativeDepreciationShieldMM: number;
    readonly auditAlgorithmVersion: string;
  };
  readonly trajectory: readonly TaxExitProjectionYear[];
}

export interface HeroKpiMetric {
  readonly id: string;
  readonly labelJa: string;
  readonly labelEn: string;
  readonly value: string;
  readonly unit?: string;
  readonly caption: string;
}

export interface NavigationItem {
  readonly labelEn: string;
  readonly labelJa: string;
  readonly href: string;
}

/**
 * 3-1. Hero Section 背景パーティクル定義 (Hydration-safe deterministic particle)
 */
export interface AmbientParticle {
  readonly id: string;
  readonly topPercent: number;
  readonly leftPercent: number;
  readonly sizePx: number;
  readonly durationSec: number;
  readonly delaySec: number;
}

/**
 * 3-2. Social Proof メディア・提携プライベートバンク定義
 */
export interface PartnerBrandLogo {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly monogram: string;
}

/**
 * 3-4. Features (解決策・特徴3選) 定義
 */
export interface FeatureCardItem {
  readonly id: string;
  readonly indexLabel: string;
  readonly badgeEn: string;
  readonly title: string;
  readonly description: string;
  readonly metricLabel: string;
  readonly metricValue: string;
  readonly iconName: 'cpu' | 'scale' | 'layout-dashboard';
}

/**
 * 3-5. Dashboard UI Preview チャート＆トランザクション定義
 */
export interface PortfolioChartDataPoint {
  readonly period: string;
  readonly grossAssetValueMM: number; // 総資産評価額（百万円）
  readonly afterTaxNetEquityMM: number; // 税引後純資産（百万円）
  readonly benchmarkIndexMM: number; // 一般市場平均（百万円）
}

export type TransactionStatus = 'COMPLETED' | 'AUDIT_VERIFIED' | 'ESCROW_LOCKED';

export interface PortfolioTransactionRecord {
  readonly id: string;
  readonly date: string;
  readonly propertyTitle: string;
  readonly categoryJa: string;
  readonly aiScore: number;
  readonly amountDisplay: string;
  readonly taxImpactDisplay: string;
  readonly status: TransactionStatus;
}

/**
 * 3-6. Pricing (招待制プラン) 定義
 */
export interface InvitationPricingPlan {
  readonly id: string;
  readonly planName: string;
  readonly subtitleJa: string;
  readonly setupFeeDisplay: string;
  readonly monthlyFeeDisplay: string;
  readonly summaryCopy: string;
  readonly targetAudience: string;
  readonly features: readonly string[];
  readonly isHighlighted: boolean;
  readonly badgeText?: string;
}

/**
 * 3-7. FAQ (よくある質問) 定義
 */
export interface FaqItem {
  readonly id: string;
  readonly code: string;
  readonly question: string;
  readonly answer: string;
  readonly supplementaryNote?: string;
}
