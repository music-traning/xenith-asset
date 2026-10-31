import type {
  AmbientParticle,
  HeroKpiMetric,
  NavigationItem,
  OffMarketAssetSimulation,
  TaxEntityStructure,
} from '@/types/xenith';

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    labelEn: '01 / PHILOSOPHY',
    labelJa: '表面利回りの罠',
    href: '#problem',
  },
  {
    labelEn: '02 / FEATURES',
    labelJa: '3つのコア優位性',
    href: '#features',
  },
  {
    labelEn: '03 / DASHBOARD',
    labelJa: '資産掌握UI',
    href: '#dashboard',
  },
  {
    labelEn: '04 / MEMBERSHIP',
    labelJa: '招待制プラン',
    href: '#pricing',
  },
  {
    labelEn: '05 / FAQ',
    labelJa: 'よくある質問',
    href: '#faq',
  },
] as const;

/**
 * Hydrationエラーを起こさない決定論的（Deterministic）なパーティクル座標データ
 */
export const HERO_AMBIENT_PARTICLES: readonly AmbientParticle[] = [
  { id: 'pt-1', topPercent: 14, leftPercent: 12, sizePx: 3, durationSec: 7.5, delaySec: 0.2 },
  { id: 'pt-2', topPercent: 26, leftPercent: 28, sizePx: 2, durationSec: 9.2, delaySec: 1.1 },
  { id: 'pt-3', topPercent: 18, leftPercent: 64, sizePx: 4, durationSec: 8.4, delaySec: 0.6 },
  { id: 'pt-4', topPercent: 38, leftPercent: 82, sizePx: 2.5, durationSec: 10.1, delaySec: 1.8 },
  { id: 'pt-5', topPercent: 52, leftPercent: 18, sizePx: 3.5, durationSec: 8.8, delaySec: 0.9 },
  { id: 'pt-6', topPercent: 68, leftPercent: 44, sizePx: 2, durationSec: 7.9, delaySec: 2.2 },
  { id: 'pt-7', topPercent: 74, leftPercent: 76, sizePx: 3, durationSec: 9.6, delaySec: 1.4 },
  { id: 'pt-8', topPercent: 31, leftPercent: 48, sizePx: 2.5, durationSec: 11.0, delaySec: 0.4 },
  { id: 'pt-9', topPercent: 82, leftPercent: 24, sizePx: 3, durationSec: 8.2, delaySec: 1.7 },
  { id: 'pt-10', topPercent: 22, leftPercent: 88, sizePx: 2, durationSec: 9.0, delaySec: 2.5 },
  { id: 'pt-11', topPercent: 60, leftPercent: 91, sizePx: 3.5, durationSec: 10.4, delaySec: 0.8 },
  { id: 'pt-12', topPercent: 44, leftPercent: 7, sizePx: 2.5, durationSec: 8.6, delaySec: 1.3 },
] as const;

export const HERO_KPI_METRICS: readonly HeroKpiMetric[] = [
  {
    id: 'off-market-ratio',
    labelEn: 'OFF-MARKET EXCLUSIVITY',
    labelJa: '独自クローラー非公開物件比率',
    value: '94.2',
    unit: '%',
    caption: '一般市場に出回る前の水面下プライム収益不動産のみを厳選査定',
  },
  {
    id: 'tax-precision',
    labelEn: 'TAX SIMULATION HORIZON',
    labelJa: '税理士監修 出口戦略予測',
    value: '10',
    unit: 'Years',
    caption: '減価償却・デッドクロス・譲渡税率まで加味した真の手残りを自動算出',
  },
  {
    id: 'cold-call-zero',
    labelEn: 'ZERO SOLICITATION POLICY',
    labelJa: '執拗な営業電話・対面勧誘',
    value: '0',
    unit: 'Calls',
    caption: 'すべての検証・契約・賃貸管理をセキュアなSaaS上で完結',
  },
] as const;

export const ENTITY_LABELS: Record<
  TaxEntityStructure,
  { readonly labelJa: string; readonly badgeEn: string; readonly effectiveTaxRate: string }
> = {
  MEDICAL_CORP: {
    labelJa: '医療法人・開業医スキーム',
    badgeEn: 'MEDICAL CORP',
    effectiveTaxRate: '実効税率 30.62% 基準',
  },
  ASSET_HOLDING_CO: {
    labelJa: '資産管理会社（HD）スキーム',
    badgeEn: 'HOLDING CO.',
    effectiveTaxRate: '実効税率 33.58% 基準',
  },
  INDIVIDUAL_HIGH_BRACKET: {
    labelJa: '個人最高税率帯（長期譲渡）',
    badgeEn: 'HIGH NET WORTH INDIV.',
    effectiveTaxRate: '所得税+住民税 55.94% 基準',
  },
};

export const HERO_SIMULATION_BY_ENTITY: Record<
  TaxEntityStructure,
  OffMarketAssetSimulation
> = {
  MEDICAL_CORP: {
    assetCode: 'XN-MINATO-094',
    titleJa: '港区南青山 4丁目 プライムRC一棟レジデンス（完全非公開）',
    districtEn: 'MINAMI-AOYAMA, MINATO-KU / TOKYO',
    tier: 'PRIME_OFF_MARKET',
    acquisitionPriceMM: 480,
    compositeDeviation: 78.4,
    confidenceInterval: '99.1% CI (過去数十万件の取引・路線価・賃貸需要モデル)',
    axes: [
      {
        id: 'liquidity',
        labelJa: '10年後売却流動性・キャップレート耐性',
        labelEn: 'EXIT LIQUIDITY',
        deviationScore: 81.2,
        weightPercentage: 35,
        benchmarkDelta: '+21.4 vs 都心5区RC平均',
      },
      {
        id: 'tax-depreciation',
        labelJa: '設備償却配分・デッドクロス遅延効率',
        labelEn: 'TAX SHIELD EFFICIENCY',
        deviationScore: 77.6,
        weightPercentage: 35,
        benchmarkDelta: '+16.8 vs 標準木造・RCスキーム',
      },
      {
        id: 'yield-stability',
        labelJa: '実質NOI安定性・ダウンサイドリスク耐性',
        labelEn: 'NOI RESILIENCE',
        deviationScore: 75.9,
        weightPercentage: 30,
        benchmarkDelta: '+14.2 vs 港区平均稼働モデル',
      },
    ],
    exitSummary: {
      targetHoldingYears: 10,
      projectedExitValuationMM: 542,
      netAfterTaxGainMM: 168.4,
      postTaxIrrPercent: 14.8,
      cumulativeDepreciationShieldMM: 94.2,
      auditAlgorithmVersion: 'TAX-ENGINE v4.2 (公認会計士・税理士共同監修)',
    },
    trajectory: [
      { year: 1, cumulativeTaxShieldMM: 14.2, netEquityPositionMM: 112, postTaxIrrPercent: 8.4 },
      { year: 3, cumulativeTaxShieldMM: 38.6, netEquityPositionMM: 154, postTaxIrrPercent: 11.2 },
      { year: 5, cumulativeTaxShieldMM: 59.8, netEquityPositionMM: 198, postTaxIrrPercent: 12.9 },
      { year: 7, cumulativeTaxShieldMM: 76.4, netEquityPositionMM: 239, postTaxIrrPercent: 13.8 },
      { year: 10, cumulativeTaxShieldMM: 94.2, netEquityPositionMM: 312, postTaxIrrPercent: 14.8 },
    ],
  },
  ASSET_HOLDING_CO: {
    assetCode: 'XN-MINATO-094',
    titleJa: '港区南青山 4丁目 プライムRC一棟レジデンス（完全非公開）',
    districtEn: 'MINAMI-AOYAMA, MINATO-KU / TOKYO',
    tier: 'PRIME_OFF_MARKET',
    acquisitionPriceMM: 480,
    compositeDeviation: 79.6,
    confidenceInterval: '99.1% CI (過去数十万件の取引・路線価・賃貸需要モデル)',
    axes: [
      {
        id: 'liquidity',
        labelJa: '10年後売却流動性・M&A株式譲渡適性',
        labelEn: 'EXIT LIQUIDITY & M&A',
        deviationScore: 83.0,
        weightPercentage: 35,
        benchmarkDelta: '+23.1 vs 都心5区RC平均',
      },
      {
        id: 'tax-depreciation',
        labelJa: '損金算入・グループ通算キャッシュ留保率',
        labelEn: 'HOLDING TAX SHIELD',
        deviationScore: 79.4,
        weightPercentage: 35,
        benchmarkDelta: '+18.5 vs 個人保有スキーム',
      },
      {
        id: 'yield-stability',
        labelJa: '実質NOI安定性・ダウンサイドリスク耐性',
        labelEn: 'NOI RESILIENCE',
        deviationScore: 75.9,
        weightPercentage: 30,
        benchmarkDelta: '+14.2 vs 港区平均稼働モデル',
      },
    ],
    exitSummary: {
      targetHoldingYears: 10,
      projectedExitValuationMM: 542,
      netAfterTaxGainMM: 182.6,
      postTaxIrrPercent: 15.6,
      cumulativeDepreciationShieldMM: 103.5,
      auditAlgorithmVersion: 'TAX-ENGINE v4.2 (公認会計士・税理士共同監修)',
    },
    trajectory: [
      { year: 1, cumulativeTaxShieldMM: 15.8, netEquityPositionMM: 116, postTaxIrrPercent: 9.1 },
      { year: 3, cumulativeTaxShieldMM: 42.4, netEquityPositionMM: 162, postTaxIrrPercent: 11.9 },
      { year: 5, cumulativeTaxShieldMM: 65.1, netEquityPositionMM: 211, postTaxIrrPercent: 13.6 },
      { year: 7, cumulativeTaxShieldMM: 84.0, netEquityPositionMM: 256, postTaxIrrPercent: 14.7 },
      { year: 10, cumulativeTaxShieldMM: 103.5, netEquityPositionMM: 334, postTaxIrrPercent: 15.6 },
    ],
  },
  INDIVIDUAL_HIGH_BRACKET: {
    assetCode: 'XN-MINATO-094',
    titleJa: '港区南青山 4丁目 プライムRC一棟レジデンス（完全非公開）',
    districtEn: 'MINAMI-AOYAMA, MINATO-KU / TOKYO',
    tier: 'PRIME_OFF_MARKET',
    acquisitionPriceMM: 480,
    compositeDeviation: 76.8,
    confidenceInterval: '99.1% CI (過去数十万件の取引・路線価・賃貸需要モデル)',
    axes: [
      {
        id: 'liquidity',
        labelJa: '10年後売却流動性・長期譲渡税率20.315%適用',
        labelEn: 'CAPITAL GAINS SPREAD',
        deviationScore: 80.5,
        weightPercentage: 35,
        benchmarkDelta: '+35.6pt 税率圧縮 (総合課税比)',
      },
      {
        id: 'tax-depreciation',
        labelJa: '損益通算・耐用年数最適化キャッシュフロー',
        labelEn: 'INCOME TAX SHIELD',
        deviationScore: 74.8,
        weightPercentage: 35,
        benchmarkDelta: '+15.1 vs 一般収益物件',
      },
      {
        id: 'yield-stability',
        labelJa: '実質NOI安定性・ダウンサイドリスク耐性',
        labelEn: 'NOI RESILIENCE',
        deviationScore: 75.9,
        weightPercentage: 30,
        benchmarkDelta: '+14.2 vs 港区平均稼働モデル',
      },
    ],
    exitSummary: {
      targetHoldingYears: 10,
      projectedExitValuationMM: 542,
      netAfterTaxGainMM: 154.0,
      postTaxIrrPercent: 13.7,
      cumulativeDepreciationShieldMM: 86.4,
      auditAlgorithmVersion: 'TAX-ENGINE v4.2 (公認会計士・税理士共同監修)',
    },
    trajectory: [
      { year: 1, cumulativeTaxShieldMM: 12.9, netEquityPositionMM: 108, postTaxIrrPercent: 7.8 },
      { year: 3, cumulativeTaxShieldMM: 35.2, netEquityPositionMM: 147, postTaxIrrPercent: 10.4 },
      { year: 5, cumulativeTaxShieldMM: 54.0, netEquityPositionMM: 186, postTaxIrrPercent: 11.8 },
      { year: 7, cumulativeTaxShieldMM: 70.1, netEquityPositionMM: 229, postTaxIrrPercent: 12.9 },
      { year: 10, cumulativeTaxShieldMM: 86.4, netEquityPositionMM: 295, postTaxIrrPercent: 13.7 },
    ],
  },
};
