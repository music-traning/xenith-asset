import type {
  FaqItem,
  FeatureCardItem,
  InvitationPricingPlan,
  PartnerBrandLogo,
  PortfolioChartDataPoint,
  PortfolioTransactionRecord,
} from '@/types/xenith';

/**
 * 3-2. Social Proof: メディア・提携プライベートバンクロゴ定義（5社横並び）
 */
export const PARTNER_BRAND_LOGOS: readonly PartnerBrandLogo[] = [
  {
    id: 'nikkei-wealth',
    name: 'NIKKEI WEALTH JOURNAL',
    category: 'ECONOMIC MEDIA',
    monogram: 'NW',
  },
  {
    id: 'forbes-japan',
    name: 'FORBES EXECUTIVE',
    category: 'GLOBAL WEALTH MEDIA',
    monogram: 'FE',
  },
  {
    id: 'helvetia-pb',
    name: 'HELVETIA PRIVATE BANK',
    category: 'ZURICH / TOKYO',
    monogram: 'HPB',
  },
  {
    id: 'sovereign-trust',
    name: 'SOVEREIGN CAPITAL TRUST',
    category: 'FAMILY OFFICE ADVISORY',
    monogram: 'SCT',
  },
  {
    id: 'medicus-wealth',
    name: 'MEDICUS PARTNERS',
    category: 'MEDICAL CORP TAX AUDIT',
    monogram: 'MP',
  },
] as const;

/**
 * 3-4. Features: 解決策・特徴3選（コピーライティング厳守）
 */
export const FEATURE_CARDS: readonly FeatureCardItem[] = [
  {
    id: 'ai-scoring',
    indexLabel: '01',
    badgeEn: 'OFF-MARKET AI SCORING',
    title: '水面下物件のAIスコアリング',
    description:
      '市場流通前の非公開データを独自クローラーで取得。過去数十万件の取引データに基づくAIが、期待利回りとリスクを瞬時に偏差値化します。',
    metricLabel: '解析対象データベース',
    metricValue: '420,000+ 件の成約・路線価履歴',
    iconName: 'cpu',
  },
  {
    id: 'tax-simulation',
    indexLabel: '02',
    badgeEn: '10-YEAR TAX SIMULATION',
    title: '10年後を見据えた税務シミュレーション',
    description:
      '税理士監修のアルゴリズムを統合。あなたの所得税率や法人税率を加味し、最終的な手残り（真のキャッシュフロー）を自動算出します。',
    metricLabel: 'アルゴリズム監修基準',
    metricValue: '公認会計士・税理士共同監修モデル',
    iconName: 'scale',
  },
  {
    id: 'digital-dashboard',
    indexLabel: '03',
    badgeEn: 'ALL-IN-ONE CLOUD SaaS',
    title: '完全デジタル・一元管理ダッシュボード',
    description:
      '契約手続きから日々の賃貸管理、出口戦略（売却）のタイミング検知まで、すべてをセキュアなSaaS上で完結。',
    metricLabel: '売却・組替シグナル検知',
    metricValue: '24時間 リアルタイム市場監視',
    iconName: 'layout-dashboard',
  },
] as const;

/**
 * 3-5. Dashboard UI Preview: ポートフォリオ資産推移チャートデータ
 */
export const PORTFOLIO_CHART_DATA: readonly PortfolioChartDataPoint[] = [
  {
    period: '2021 Q4',
    grossAssetValueMM: 620,
    afterTaxNetEquityMM: 240,
    benchmarkIndexMM: 210,
  },
  {
    period: '2022 Q2',
    grossAssetValueMM: 740,
    afterTaxNetEquityMM: 310,
    benchmarkIndexMM: 235,
  },
  {
    period: '2023 Q1',
    grossAssetValueMM: 890,
    afterTaxNetEquityMM: 395,
    benchmarkIndexMM: 260,
  },
  {
    period: '2023 Q4',
    grossAssetValueMM: 1080,
    afterTaxNetEquityMM: 490,
    benchmarkIndexMM: 295,
  },
  {
    period: '2024 Q3',
    grossAssetValueMM: 1290,
    afterTaxNetEquityMM: 615,
    benchmarkIndexMM: 330,
  },
  {
    period: '2025 Q2',
    grossAssetValueMM: 1520,
    afterTaxNetEquityMM: 768,
    benchmarkIndexMM: 372,
  },
  {
    period: '2026 Q3',
    grossAssetValueMM: 1842,
    afterTaxNetEquityMM: 964,
    benchmarkIndexMM: 418,
  },
] as const;

/**
 * 3-5. Dashboard UI Preview: 最新トランザクション・データテーブル
 */
export const PORTFOLIO_TRANSACTIONS: readonly PortfolioTransactionRecord[] = [
  {
    id: 'TX-2026-8901',
    date: '2026.10.28',
    propertyTitle: '港区南青山4丁目 プライムRC一棟レジデンス',
    categoryJa: '水面下取得・電子契約締結',
    aiScore: 78.4,
    amountDisplay: '¥480,000,000',
    taxImpactDisplay: '初年度償却圧縮 -¥14.2M',
    status: 'COMPLETED',
  },
  {
    id: 'TX-2026-8842',
    date: '2026.10.15',
    propertyTitle: '渋谷区松濤1丁目 低層ラグジュアリーレジデンス',
    categoryJa: '10年出口戦略・売却益確定',
    aiScore: 82.1,
    amountDisplay: '+¥695,000,000',
    taxImpactDisplay: '長期譲渡税率最適化 完了',
    status: 'AUDIT_VERIFIED',
  },
  {
    id: 'TX-2026-8790',
    date: '2026.10.01',
    propertyTitle: '千代田区一番町 メディカルビル一棟（医療法人保有）',
    categoryJa: '月次NOI配当・税務引当計上',
    aiScore: 76.9,
    amountDisplay: '+¥4,820,000',
    taxImpactDisplay: '実効税率30.62% 自動引当済',
    status: 'COMPLETED',
  },
  {
    id: 'TX-2026-8715',
    date: '2026.09.19',
    propertyTitle: '港区麻布永坂町 プレミアム商業・レジ複合棟',
    categoryJa: '非公開独占交渉権（LOI）ロック',
    aiScore: 80.5,
    amountDisplay: '¥620,000,000',
    taxImpactDisplay: '10年予想税引後IRR 15.4%',
    status: 'ESCROW_LOCKED',
  },
] as const;

/**
 * 3-6. Pricing: 招待制2プラン定義（コピーライティング厳守）
 */
export const INVITATION_PRICING_PLANS: readonly InvitationPricingPlan[] = [
  {
    id: 'executive-plan',
    planName: 'Executive Plan',
    subtitleJa: '初期費用 100万円・月額 5万円（コンシェルジュ付帯）',
    setupFeeDisplay: '¥1,000,000',
    monthlyFeeDisplay: '¥50,000',
    summaryCopy:
      '個人資産家・開業医・企業役員向け。水面下物件への優先アクセスと10年税務シミュレーション、専任コンシェルジュによるデジタル資産管理を提供します。',
    targetAudience: '推奨基準: 年収3,000万円以上 / 金融資産1億円以上',
    features: [
      '水面下・非公開物件データベースへの無制限アクセス',
      'AIプロパティスコアリング（期待利回り・リスク偏差値評価）',
      '10年後を見据えた税務・真のキャッシュフロー自動算出',
      '専任プライベート・コンシェルジュ付帯（チャット・オンライン対応）',
      '契約手続き・月次賃貸管理・売却タイミング検知SaaS機能',
    ],
    isHighlighted: false,
  },
  {
    id: 'family-office-plan',
    planName: 'Family Office Plan',
    subtitleJa: '初期費用 300万円・月額 15万円（税理士連携・完全オーダーメイド組成）',
    setupFeeDisplay: '¥3,000,000',
    monthlyFeeDisplay: '¥150,000',
    summaryCopy:
      '複数法人オーナー・医療法人理事長・一族資産承継向け。提携税理士法人との直接データ連携と、非公開一棟物件の完全オーダーメイド組成を実行します。',
    targetAudience: '推奨基準: 複数法人保有 / 純資産5億円以上・資産管理会社オーナー',
    features: [
      'Executive Planのすべての機能および最優先ディール割当権（First-Look権）',
      '顧問税理士・提携パートナー税理士とのAPIデータ連携・共同監査',
      '資産管理会社・医療法人・ホールディングス間の完全オーダーメイドスキーム組成',
      '複数物件ポートフォリオ全体のデッドクロス・組替シミュレーション',
      '事業承継・M&A・ホールディングス株式譲渡を見据えた出口戦略設計',
    ],
    isHighlighted: true,
    badgeText: 'MOST EXCLUSIVE / 税理士連携・完全オーダーメイド組成',
  },
] as const;

/**
 * 3-7. FAQ: よくある質問定義（コピーライティング厳守）
 */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'faq-eligibility',
    code: 'Q1',
    question: '誰でも登録できますか？',
    answer:
      'いいえ。質の高い非公開情報を提供するため、年収・金融資産の証明および面談による完全審査制とさせていただいております。',
    supplementaryNote:
      '審査プロセスにおける提出書類は金融機関水準の暗号化ストレージで厳重に保護され、審査完了後ただちに破棄または秘密保持契約（NDA）下で管理されます。',
  },
  {
    id: 'faq-principal',
    code: 'Q2',
    question: '元本は保証されますか？',
    answer:
      '投資である以上、リスクは存在します。しかし、当社のAIスコアリングはダウンサイドリスクの極小化に特化しており、データに基づいた論理的な意思決定をサポートします。',
    supplementaryNote:
      '空室率ストレス検証・金利上昇シナリオ・10年後の路線価およびキャップレート変動予測を全物件で事前に開示し、表面利回りに惑わされない精緻なリスク管理を実現します。',
  },
] as const;
