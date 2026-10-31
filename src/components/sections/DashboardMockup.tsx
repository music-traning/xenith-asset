'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Building,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FolderKanban,
  Layers,
  Lock,
  PieChart,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import {
  PORTFOLIO_CHART_DATA,
  PORTFOLIO_TRANSACTIONS,
} from '@/data/lpContentData';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { triggerApplicationModal } from '@/components/modals/ApplicationModal';
import type { TransactionStatus } from '@/types/xenith';

export type DashboardTabId =
  | 'summary'
  | 'feed'
  | 'tax-simulator'
  | 'contracts'
  | 'exit-signal';

interface SidebarMenuItem {
  readonly id: DashboardTabId;
  readonly labelJa: string;
  readonly badgeCount?: string;
}

const SIDEBAR_MENU_ITEMS: readonly SidebarMenuItem[] = [
  { id: 'summary', labelJa: '資産サマリー' },
  { id: 'feed', labelJa: '水面下物件フィード', badgeCount: '3 NEW' },
  { id: 'tax-simulator', labelJa: '10年税務シミュレーター' },
  { id: 'contracts', labelJa: '電子契約・賃貸管理' },
  { id: 'exit-signal', labelJa: '出口売却シグナル', badgeCount: 'AI検知' },
] as const;

/**
 * 水面下物件フィード用データ定義
 */
interface OffMarketPropertyItem {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly locationEn: string;
  readonly imageUrl: string;
  readonly aiScore: number;
  readonly priceDisplay: string;
  readonly grossYield: string;
  readonly netAfterTaxIrr: string;
  readonly structureSpec: string;
  readonly statusLabel: string;
}

const OFF_MARKET_FEED_ITEMS: readonly OffMarketPropertyItem[] = [
  {
    id: 'prop-minami-aoyama',
    code: 'XN-MINATO-094',
    title: '港区南青山4丁目 プライムRC一棟レジデンス',
    locationEn: 'MINAMI-AOYAMA, MINATO-KU',
    imageUrl: '/images/minato-prime-residence.svg',
    aiScore: 78.4,
    priceDisplay: '¥480,000,000',
    grossYield: '4.62%',
    netAfterTaxIrr: '14.8%',
    structureSpec: 'RC造 地上5階建 / 2023年築 / 満室稼働中',
    statusLabel: 'First-Look 優先交渉可',
  },
  {
    id: 'prop-shoto',
    code: 'XN-SHIBUYA-112',
    title: '渋谷区松濤1丁目 低層ラグジュアリーレジデンス',
    locationEn: 'SHOTO, SHIBUYA-KU',
    imageUrl: '/images/shibuya-shoto-residence.svg',
    aiScore: 82.1,
    priceDisplay: '¥695,000,000',
    grossYield: '4.35%',
    netAfterTaxIrr: '15.6%',
    structureSpec: 'RC造 地上3階地下1階 / 2024年築',
    statusLabel: '完全非公開・売主直結',
  },
  {
    id: 'prop-ichibancho',
    code: 'XN-CHIYODA-058',
    title: '千代田区一番町 メディカル＆レジ複合一棟',
    locationEn: 'ICHIBANCHO, CHIYODA-KU',
    imageUrl: '/images/chiyoda-ichibancho-medical.svg',
    aiScore: 79.8,
    priceDisplay: '¥560,000,000',
    grossYield: '4.88%',
    netAfterTaxIrr: '15.1%',
    structureSpec: 'SRC造 地上7階建 / 医療テナント長期契約付',
    statusLabel: '医療法人スキーム最適',
  },
] as const;

/**
 * 10年税務シミュレーター用データ定義
 */
interface YearlyTaxBarItem {
  readonly yearLabel: string;
  readonly depreciationShieldMM: number;
  readonly cumulativeNetCashMM: number;
}

const TEN_YEAR_TAX_BARS: readonly YearlyTaxBarItem[] = [
  { yearLabel: 'Y1', depreciationShieldMM: 16.4, cumulativeNetCashMM: 28 },
  { yearLabel: 'Y2', depreciationShieldMM: 15.8, cumulativeNetCashMM: 56 },
  { yearLabel: 'Y3', depreciationShieldMM: 15.2, cumulativeNetCashMM: 86 },
  { yearLabel: 'Y4', depreciationShieldMM: 14.5, cumulativeNetCashMM: 118 },
  { yearLabel: 'Y5', depreciationShieldMM: 13.9, cumulativeNetCashMM: 152 },
  { yearLabel: 'Y6', depreciationShieldMM: 11.2, cumulativeNetCashMM: 184 },
  { yearLabel: 'Y7', depreciationShieldMM: 10.6, cumulativeNetCashMM: 218 },
  { yearLabel: 'Y8', depreciationShieldMM: 9.8, cumulativeNetCashMM: 254 },
  { yearLabel: 'Y9', depreciationShieldMM: 9.2, cumulativeNetCashMM: 292 },
  { yearLabel: 'Y10(出口)', depreciationShieldMM: 8.6, cumulativeNetCashMM: 334 },
] as const;

interface TaxBracketComparisonRow {
  readonly id: string;
  readonly schemeName: string;
  readonly effectiveTaxRate: string;
  readonly tenYearTaxShield: string;
  readonly exitCapitalGainsTax: string;
  readonly finalNetProceeds: string;
  readonly postTaxIrr: string;
  readonly isRecommended?: boolean;
}

const TAX_BRACKET_ROWS: readonly TaxBracketComparisonRow[] = [
  {
    id: 'holding-co',
    schemeName: '資産管理会社（ホールディングス）組成スキーム',
    effectiveTaxRate: '33.58%（法人実効税率）',
    tenYearTaxShield: '¥103,500,000',
    exitCapitalGainsTax: '株式譲渡・損金相殺最適化',
    finalNetProceeds: '+¥182,600,000',
    postTaxIrr: '15.6%',
    isRecommended: true,
  },
  {
    id: 'medical-corp',
    schemeName: '医療法人・開業医オーナー保有スキーム',
    effectiveTaxRate: '30.62%（医療法人税率）',
    tenYearTaxShield: '¥94,200,000',
    exitCapitalGainsTax: '減価償却・退職金原資充当',
    finalNetProceeds: '+¥168,400,000',
    postTaxIrr: '14.8%',
  },
  {
    id: 'individual-high',
    schemeName: '個人保有（最高税率帯・長期譲渡所得適用）',
    effectiveTaxRate: '55.94% → 出口20.315%',
    tenYearTaxShield: '¥86,400,000',
    exitCapitalGainsTax: '長期譲渡分離課税 20.315%',
    finalNetProceeds: '+¥154,000,000',
    postTaxIrr: '13.7%',
  },
] as const;

const CHART_WIDTH = 760;
const CHART_HEIGHT = 240;
const PADDING_X = 36;
const PADDING_Y = 24;
const MAX_VALUE_MM = 2000;

type FilterOption = 'ALL' | TransactionStatus;

function getCoordinates(
  values: readonly number[]
): ReadonlyArray<{ readonly x: number; readonly y: number }> {
  const usableWidth = CHART_WIDTH - PADDING_X * 2;
  const usableHeight = CHART_HEIGHT - PADDING_Y * 2;
  return values.map((val, idx) => {
    const x =
      PADDING_X + (idx / Math.max(1, values.length - 1)) * usableWidth;
    const y =
      PADDING_Y + usableHeight - (val / MAX_VALUE_MM) * usableHeight;
    return { x, y };
  });
}

function buildSmoothSvgPath(
  points: ReadonlyArray<{ readonly x: number; readonly y: number }>
): string {
  if (points.length === 0) return '';
  const first = points[0];
  if (!first) return '';
  let d = `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    if (!curr || !next) continue;
    const cpx1 = curr.x + (next.x - curr.x) * 0.45;
    const cpy1 = curr.y;
    const cpx2 = curr.x + (next.x - curr.x) * 0.55;
    const cpy2 = next.y;
    d += ` C ${cpx1.toFixed(1)} ${cpy1.toFixed(1)}, ${cpx2.toFixed(1)} ${cpy2.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
  }
  return d;
}

function renderStatusBadge(status: TransactionStatus): React.JSX.Element {
  switch (status) {
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-custom-gold/50 bg-custom-gold/15 px-2.5 py-0.5 font-sans text-[11px] font-medium text-custom-gold-light">
          <CheckCircle2 className="h-3 w-3 text-custom-gold" aria-hidden="true" />
          決済・登記完了
        </span>
      );
    case 'AUDIT_VERIFIED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-custom-gold-light/50 bg-custom-gold/20 px-2.5 py-0.5 font-sans text-[11px] font-medium text-slate-50">
          <FileCheck2
            className="h-3 w-3 text-custom-gold-light"
            aria-hidden="true"
          />
          税理士監査済
        </span>
      );
    case 'ESCROW_LOCKED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 font-sans text-[11px] font-normal text-slate-400">
          <Clock className="h-3 w-3 text-custom-gold" aria-hidden="true" />
          独占交渉ロック中
        </span>
      );
  }
}

function renderMenuIcon(id: DashboardTabId, isActive: boolean): React.JSX.Element {
  const iconClass = `h-4 w-4 shrink-0 transition-colors duration-300 ${
    isActive ? 'text-custom-gold' : 'text-slate-400 group-hover:text-slate-200'
  }`;
  switch (id) {
    case 'summary':
      return <PieChart className={iconClass} aria-hidden="true" />;
    case 'feed':
      return <Building className={iconClass} aria-hidden="true" />;
    case 'tax-simulator':
      return <TrendingUp className={iconClass} aria-hidden="true" />;
    case 'contracts':
      return <FolderKanban className={iconClass} aria-hidden="true" />;
    case 'exit-signal':
      return <Layers className={iconClass} aria-hidden="true" />;
  }
}

export const DashboardMockup: React.FC = () => {
  // Phase 2-1: 現在選択されているメニューIDの状態管理
  const [activeTab, setActiveTab] = useState<DashboardTabId>('summary');
  const [activePointIndex, setActivePointIndex] = useState<number>(
    PORTFOLIO_CHART_DATA.length - 1
  );
  const [statusFilter, setStatusFilter] = useState<FilterOption>('ALL');

  const grossCoords = getCoordinates(
    PORTFOLIO_CHART_DATA.map((d) => d.grossAssetValueMM)
  );
  const netEquityCoords = getCoordinates(
    PORTFOLIO_CHART_DATA.map((d) => d.afterTaxNetEquityMM)
  );

  const grossLinePath = buildSmoothSvgPath(grossCoords);
  const netEquityLinePath = buildSmoothSvgPath(netEquityCoords);

  const firstGrossCoord = grossCoords[0];
  const lastGrossCoord = grossCoords[grossCoords.length - 1];
  const baselineY = CHART_HEIGHT - PADDING_Y;

  const grossAreaPath =
    firstGrossCoord && lastGrossCoord
      ? `${grossLinePath} L ${lastGrossCoord.x.toFixed(1)} ${baselineY} L ${firstGrossCoord.x.toFixed(1)} ${baselineY} Z`
      : '';

  const activeDataPoint =
    PORTFOLIO_CHART_DATA[activePointIndex] ??
    PORTFOLIO_CHART_DATA[PORTFOLIO_CHART_DATA.length - 1];

  const filteredTransactions =
    statusFilter === 'ALL'
      ? PORTFOLIO_TRANSACTIONS
      : PORTFOLIO_TRANSACTIONS.filter((tx) => tx.status === statusFilter);

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="relative overflow-hidden bg-slate-950 py-24 lg:py-32"
    >
      {/* 背景ライティング */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-custom-gold/[0.06] blur-[160px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          id="dashboard-heading"
          eyebrowEn="EXECUTIVE PORTFOLIO CONSOLE"
          title="あなたのポートフォリオを、手のひらで掌握する。"
          description="左側のコンソールメニューを選択して、「資産サマリー」「水面下物件フィード」「10年税務シミュレーター」の各画面をリアルタイムに体験できます。"
        />

        {/* SaaS ダッシュボード画面モックアップ本体 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="mt-14 lg:mt-20"
        >
          <GlassCard
            as="article"
            className="overflow-hidden border-slate-700/50 bg-slate-800/40"
          >
            {/* アプリケーション・トップバー */}
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/50 bg-slate-950 px-5 py-4 font-sans sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-custom-gold" />
                </div>
                <span
                  className="ml-2 hidden h-4 w-[1px] bg-slate-800 sm:inline-block"
                  aria-hidden="true"
                />
                <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                  <Lock className="h-3.5 w-3.5 text-custom-gold" aria-hidden="true" />
                  <span className="font-sans text-[11px] font-normal text-slate-400">
                    console.xenith-asset.jp/portfolio/{activeTab}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <span className="hidden items-center gap-1.5 rounded-md border border-custom-gold/40 bg-custom-gold/10 px-3 py-1 text-[11px] font-medium text-custom-gold-light md:inline-flex">
                  <ShieldCheck
                    className="h-3.5 w-3.5 text-custom-gold"
                    aria-hidden="true"
                  />
                  税理士法人API リアルタイム同期中
                </span>
                <div className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-50">
                  <span className="h-2 w-2 rounded-full bg-custom-gold shadow-gold-glow" />
                  <span className="truncate">
                    医療法人社団 慶翔会 / K.Holdings 連結
                  </span>
                </div>
              </div>
            </header>

            {/* モバイル・タブレット用 横スクロールタブバー (lg未満で表示) */}
            <div
              role="tablist"
              aria-label="ダッシュボード表示切替（モバイル）"
              className="flex items-center gap-2 overflow-x-auto border-b border-slate-700/50 bg-slate-950/90 px-4 py-3 lg:hidden"
            >
              {SIDEBAR_MENU_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2 font-sans text-xs transition-all duration-300 ${
                      isActive
                        ? 'border-custom-gold bg-custom-gold/15 font-medium text-custom-gold-light shadow-gold-glow'
                        : 'border-slate-800 bg-slate-900/60 font-normal text-slate-400 hover:text-slate-50'
                    }`}
                  >
                    {renderMenuIcon(item.id, isActive)}
                    <span>{item.labelJa}</span>
                  </button>
                );
              })}
            </div>

            {/* ダッシュボード内部レイアウト */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Phase 2-2: 左サイドバー（選択状態のハイライト連動） */}
              <aside
                aria-label="ダッシュボード機能メニュー"
                className="hidden flex-col justify-between border-r border-slate-700/50 bg-slate-950/80 p-5 font-sans lg:col-span-3 lg:flex xl:col-span-2"
              >
                <nav aria-label="コンソールナビゲーション" className="space-y-6">
                  <div>
                    <p className="px-3 font-serif text-[10px] font-medium tracking-[0.22em] text-slate-400">
                      MAIN CONSOLE
                    </p>
                    <ul role="tablist" className="mt-3 space-y-1.5 text-xs">
                      {SIDEBAR_MENU_ITEMS.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                          <li key={item.id} role="presentation">
                            <button
                              type="button"
                              role="tab"
                              aria-selected={isActive}
                              onClick={() => setActiveTab(item.id)}
                              className={`group flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-all duration-300 ease-in-out ${
                                isActive
                                  ? 'border-custom-gold bg-custom-gold/15 font-medium text-custom-gold-light shadow-gold-glow'
                                  : 'border-transparent font-normal text-slate-400 hover:border-slate-800 hover:bg-slate-900 hover:text-slate-50'
                              }`}
                            >
                              <span className="flex items-center gap-2.5 truncate">
                                {renderMenuIcon(item.id, isActive)}
                                <span className="truncate">{item.labelJa}</span>
                              </span>

                              {item.badgeCount ? (
                                <span
                                  className={`ml-1 rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider ${
                                    isActive
                                      ? 'bg-custom-gold text-slate-950'
                                      : 'bg-slate-800 text-custom-gold-light'
                                  }`}
                                >
                                  {item.badgeCount}
                                </span>
                              ) : null}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </nav>

                {/* 専任コンシェルジュ認証シール */}
                <div className="mt-8 rounded-xl border border-slate-700/50 bg-slate-900 p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/concierge-emblem.svg"
                      alt="XENITH ASSET プライベートバンキング専任コンシェルジュ認証エンブレム"
                      width={36}
                      height={36}
                      className="h-9 w-9 shrink-0 rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-normal text-slate-400">
                        専任コンシェルジュ
                      </p>
                      <p className="truncate text-xs font-medium text-slate-50">
                        プライベートバンキング室
                      </p>
                    </div>
                  </div>
                  <p className="mt-2.5 flex items-center gap-1.5 text-[11px] font-normal text-custom-gold-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-custom-gold" />
                    直通暗号化チャット待機中
                  </p>
                </div>
              </aside>

              {/* Phase 2-3: 右側メインエリア（AnimatePresence による動的コンテンツ切り替え: y: 10 -> 0, opacity: 0 -> 1） */}
              <div className="min-h-[680px] p-5 font-sans sm:p-8 lg:col-span-9 xl:col-span-10">
                <AnimatePresence mode="wait">
                  {/* ==========================================
                      TAB 1: 資産サマリー (summary)
                  ========================================== */}
                  {activeTab === 'summary' ? (
                    <motion.div
                      key="tab-summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.32, ease: 'easeOut' }}
                      className="space-y-8"
                    >
                      {/* 上段: 資産残高の大きなタイポグラフィ & 主要KPI */}
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                        <div className="flex flex-col justify-between rounded-xl border border-slate-700/50 bg-slate-950 p-6 lg:col-span-5">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-xs font-normal text-slate-400">
                              <Wallet
                                className="h-4 w-4 text-custom-gold"
                                aria-hidden="true"
                              />
                              連結ポートフォリオ総資産残高
                            </span>
                            <span className="rounded border border-custom-gold/40 bg-custom-gold/15 px-2.5 py-0.5 font-sans text-xs font-medium text-custom-gold-light">
                              +18.4% YoY
                            </span>
                          </div>

                          <div className="my-5">
                            <div className="font-sans text-3xl font-medium tracking-tight text-slate-50 sm:text-4xl xl:text-5xl">
                              ¥1,842,000,000
                            </div>
                            <p className="mt-2 font-sans text-xs font-normal text-slate-400">
                              保有4棟（港区・渋谷区・千代田区） / 含み益{' '}
                              <span className="font-medium text-custom-gold-light">
                                +¥312,000,000
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
                            <span className="font-normal text-slate-400">
                              ポートフォリオ総合AI偏差値
                            </span>
                            <span className="font-sans text-sm font-medium text-custom-gold-light">
                              79.5 (Sランク・上位0.3%)
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7 lg:gap-8">
                          <div className="flex flex-col justify-between rounded-xl border border-slate-700/50 bg-slate-950 p-6">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-normal text-slate-400">
                                税引後純資産エクイティ（真の手残り）
                              </span>
                              <ArrowUpRight
                                className="h-4 w-4 text-custom-gold"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="my-4">
                              <span className="font-sans text-3xl font-medium text-custom-gold-light">
                                ¥964,000,000
                              </span>
                              <span className="mt-1.5 block text-xs font-normal text-slate-400">
                                実効税率・長期譲渡税引当控除後
                              </span>
                            </div>
                            <div className="border-t border-slate-800 pt-3 text-[11px] font-normal text-slate-400">
                              LTV比率: 47.6% / 平均借入金利: 0.68%
                            </div>
                          </div>

                          <div className="flex flex-col justify-between rounded-xl border border-slate-700/50 bg-slate-950 p-6">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-normal text-slate-400">
                                累計タックスシールド（減価償却・損金算入）
                              </span>
                              <Activity
                                className="h-4 w-4 text-custom-gold"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="my-4">
                              <span className="font-sans text-3xl font-medium text-slate-50">
                                ¥142,800,000
                              </span>
                              <span className="mt-1.5 block text-xs font-normal text-custom-gold-light">
                                次回推奨組替時期: 2028年 Q2
                              </span>
                            </div>
                            <div className="border-t border-slate-800 pt-3 text-[11px] font-normal text-slate-400">
                              稼働率: 99.2% (全48戸中47戸稼働)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 中段: 折れ線グラフ */}
                      <figure className="rounded-xl border border-slate-700/50 bg-slate-950 p-6">
                        <figcaption className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h3 className="font-serif text-lg font-medium text-slate-50">
                              資産評価額・税引後純資産トラジェクトリ（5年間推移）
                            </h3>
                            <p className="mt-1 font-sans text-xs font-normal text-slate-400">
                              各四半期ポイントを選択するとAI査定額と税引後純資産の内訳を表示します
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-5 font-sans text-xs">
                            <div className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-custom-gold" />
                              <span className="font-normal text-slate-400">
                                総資産評価額:{' '}
                                <strong className="font-sans text-sm font-medium text-slate-50">
                                  ¥{activeDataPoint?.grossAssetValueMM}M
                                </strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-custom-gold-light" />
                              <span className="font-normal text-slate-400">
                                税引後純資産:{' '}
                                <strong className="font-sans text-sm font-medium text-custom-gold-light">
                                  ¥{activeDataPoint?.afterTaxNetEquityMM}M
                                </strong>
                              </span>
                            </div>
                            <div className="rounded-md border border-slate-700/50 bg-slate-900 px-3 py-1 font-sans text-xs font-medium text-custom-gold-light">
                              {activeDataPoint?.period}
                            </div>
                          </div>
                        </figcaption>

                        <div className="mt-6 overflow-x-auto">
                          <div className="min-w-[640px]">
                            <svg
                              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                              className="h-60 w-full overflow-visible"
                              role="img"
                              aria-label="2021年第4四半期から2026年第3四半期までの総資産評価額および税引後純資産の推移を示す折れ線グラフ"
                            >
                              <defs>
                                <linearGradient
                                  id="xenithChampagneArea"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="0%"
                                    stopColor="#C6A87C"
                                    stopOpacity="0.32"
                                  />
                                  <stop
                                    offset="100%"
                                    stopColor="#C6A87C"
                                    stopOpacity="0.0"
                                  />
                                </linearGradient>
                              </defs>

                              {[0.2, 0.45, 0.7, 0.9].map((ratio, idx) => {
                                const y =
                                  PADDING_Y +
                                  ratio * (CHART_HEIGHT - PADDING_Y * 2);
                                return (
                                  <line
                                    key={idx}
                                    x1={PADDING_X}
                                    y1={y}
                                    x2={CHART_WIDTH - PADDING_X}
                                    y2={y}
                                    stroke="#1e293b"
                                    strokeDasharray="4 4"
                                    strokeWidth="1"
                                  />
                                );
                              })}

                              <path
                                d={grossAreaPath}
                                fill="url(#xenithChampagneArea)"
                              />

                              <motion.path
                                d={netEquityLinePath}
                                fill="none"
                                stroke="#E0CFA7"
                                strokeWidth="2"
                                strokeDasharray="6 3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.9, ease: 'easeOut' }}
                              />

                              <motion.path
                                d={grossLinePath}
                                fill="none"
                                stroke="#C6A87C"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.9, ease: 'easeOut' }}
                              />

                              {grossCoords.map((coord, idx) => {
                                const netCoord = netEquityCoords[idx];
                                const dataItem = PORTFOLIO_CHART_DATA[idx];
                                const isSelected = idx === activePointIndex;
                                if (!dataItem || !netCoord) return null;

                                return (
                                  <g
                                    key={dataItem.period}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${dataItem.period}: 総資産評価額 ${dataItem.grossAssetValueMM}百万円、税引後純資産 ${dataItem.afterTaxNetEquityMM}百万円`}
                                    className="cursor-pointer focus:outline-none"
                                    onMouseEnter={() => setActivePointIndex(idx)}
                                    onClick={() => setActivePointIndex(idx)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setActivePointIndex(idx);
                                      }
                                    }}
                                  >
                                    {isSelected ? (
                                      <line
                                        x1={coord.x}
                                        y1={PADDING_Y}
                                        x2={coord.x}
                                        y2={CHART_HEIGHT - PADDING_Y}
                                        stroke="#C6A87C"
                                        strokeOpacity="0.5"
                                        strokeDasharray="3 3"
                                      />
                                    ) : null}

                                    <circle
                                      cx={coord.x}
                                      cy={coord.y}
                                      r={isSelected ? 6 : 4}
                                      fill="#020617"
                                      stroke="#E0CFA7"
                                      strokeWidth={isSelected ? 3 : 2}
                                    />

                                    <circle
                                      cx={netCoord.x}
                                      cy={netCoord.y}
                                      r={isSelected ? 5 : 3.5}
                                      fill="#020617"
                                      stroke="#C6A87C"
                                      strokeWidth={isSelected ? 2.5 : 2}
                                    />

                                    <text
                                      x={coord.x}
                                      y={CHART_HEIGHT - 4}
                                      textAnchor="middle"
                                      className="fill-slate-400 font-sans text-[10px] font-normal"
                                    >
                                      {dataItem.period}
                                    </text>
                                  </g>
                                );
                              })}
                            </svg>
                          </div>
                        </div>
                      </figure>

                      {/* 下段: 最新トランザクション・データテーブル */}
                      <div className="rounded-xl border border-slate-700/50 bg-slate-950 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
                          <div>
                            <h3 className="font-serif text-lg font-medium text-slate-50">
                              最新トランザクション &amp; 税務監査ログ
                            </h3>
                            <p className="mt-1 font-sans text-xs font-normal text-slate-400">
                              水面下取得契約・月次NOI配当・出口売却決済のリアルタイム台帳
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 font-sans">
                            <button
                              type="button"
                              onClick={() => setStatusFilter('ALL')}
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all duration-300 ${
                                statusFilter === 'ALL'
                                  ? 'border-custom-gold bg-custom-gold/15 font-medium text-custom-gold-light'
                                  : 'border-slate-700/50 bg-slate-900 font-normal text-slate-400 hover:text-slate-50'
                              }`}
                            >
                              <SlidersHorizontal
                                className="h-3.5 w-3.5 text-custom-gold"
                                aria-hidden="true"
                              />
                              全スキーム ({PORTFOLIO_TRANSACTIONS.length})
                            </button>

                            <button
                              type="button"
                              onClick={() => setStatusFilter('COMPLETED')}
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all duration-300 ${
                                statusFilter === 'COMPLETED'
                                  ? 'border-custom-gold bg-custom-gold/15 font-medium text-custom-gold-light'
                                  : 'border-slate-700/50 bg-slate-900 font-normal text-slate-400 hover:text-slate-50'
                              }`}
                            >
                              決済完了のみ
                            </button>

                            <button
                              type="button"
                              onClick={() => setStatusFilter('AUDIT_VERIFIED')}
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all duration-300 ${
                                statusFilter === 'AUDIT_VERIFIED'
                                  ? 'border-custom-gold bg-custom-gold/15 font-medium text-custom-gold-light'
                                  : 'border-slate-700/50 bg-slate-900 font-normal text-slate-400 hover:text-slate-50'
                              }`}
                            >
                              税理士監査済
                            </button>

                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-900 px-3 py-1.5 text-xs font-normal text-slate-400">
                              <Download
                                className="h-3.5 w-3.5 text-custom-gold"
                                aria-hidden="true"
                              />
                              税理士提出用CSV
                            </span>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table
                            aria-label="ポートフォリオ最新トランザクションおよび税務監査ログ一覧"
                            className="w-full min-w-[720px] border-collapse text-left font-sans text-xs"
                          >
                            <thead>
                              <tr className="border-y border-slate-800 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                                <th scope="col" className="py-3.5 pr-4">
                                  TX ID / 日付
                                </th>
                                <th scope="col" className="py-3.5 px-4">
                                  対象非公開物件 / 区分
                                </th>
                                <th scope="col" className="py-3.5 px-4">
                                  AI偏差値
                                </th>
                                <th scope="col" className="py-3.5 px-4">
                                  金額
                                </th>
                                <th scope="col" className="py-3.5 px-4">
                                  税務アルゴリズム試算
                                </th>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 text-right"
                                >
                                  ステータス
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80">
                              {filteredTransactions.map((tx) => (
                                <tr
                                  key={tx.id}
                                  className="transition-colors duration-300 hover:bg-slate-900/60"
                                >
                                  <td className="py-4 pr-4 whitespace-nowrap">
                                    <div className="font-sans text-xs font-medium text-slate-50">
                                      {tx.id}
                                    </div>
                                    <div className="mt-0.5 text-[11px] font-normal text-slate-400">
                                      {tx.date}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="font-medium text-slate-50">
                                      {tx.propertyTitle}
                                    </div>
                                    <div className="mt-0.5 text-[11px] font-normal text-slate-400">
                                      {tx.categoryJa}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded border border-custom-gold/40 bg-custom-gold/10 px-2.5 py-0.5 font-sans text-sm font-medium text-custom-gold-light">
                                      {tx.aiScore.toFixed(1)}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap font-sans text-sm font-medium text-slate-50">
                                    {tx.amountDisplay}
                                  </td>
                                  <td className="py-4 px-4 whitespace-nowrap font-sans text-xs font-normal text-custom-gold-light">
                                    {tx.taxImpactDisplay}
                                  </td>
                                  <td className="py-4 pl-4 text-right whitespace-nowrap">
                                    {renderStatusBadge(tx.status)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}

                  {/* ==========================================
                      TAB 2: 水面下物件フィード (feed)
                  ========================================== */}
                  {activeTab === 'feed' ? (
                    <motion.div
                      key="tab-feed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.32, ease: 'easeOut' }}
                      className="space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
                        <div>
                          <div className="flex items-center gap-2">
                            <Sparkles
                              className="h-4 w-4 text-custom-gold"
                              aria-hidden="true"
                            />
                            <span className="font-serif text-xs tracking-[0.22em] text-custom-gold-light">
                              OFF-MARKET DEAL STREAM // CRAWLER VERIFIED
                            </span>
                          </div>
                          <h3 className="mt-1 font-serif text-xl font-semibold text-slate-50">
                            水面下物件フィード（AI偏差値75.0以上・厳選ディール）
                          </h3>
                        </div>
                        <span className="rounded-lg border border-custom-gold/40 bg-custom-gold/10 px-3.5 py-1.5 text-xs font-medium text-custom-gold-light">
                          一般市場流通前・NDA締結会員限定開示
                        </span>
                      </div>

                      {/* 3カラム物件カードグリッド */}
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {OFF_MARKET_FEED_ITEMS.map((prop) => (
                          <div
                            key={prop.id}
                            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/60 bg-slate-950 transition-all duration-300 hover:border-custom-gold hover:shadow-gold-glow"
                          >
                            <div>
                              {/* サムネイル画像 (next/image) */}
                              <div className="relative h-44 w-full overflow-hidden border-b border-slate-800">
                                <Image
                                  src={prop.imageUrl}
                                  alt={`${prop.title} のAI建築査定プレビュー`}
                                  width={640}
                                  height={360}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                                <span className="absolute top-3 left-3 rounded border border-custom-gold/50 bg-slate-950/90 px-2.5 py-1 font-sans text-[10px] font-medium text-custom-gold-light">
                                  {prop.statusLabel}
                                </span>
                                <div className="absolute right-3 bottom-3 rounded-lg border border-custom-gold/60 bg-slate-950/90 px-3 py-1 text-right backdrop-blur-md">
                                  <span className="block text-[9px] text-slate-400">
                                    AI偏差値
                                  </span>
                                  <span className="font-sans text-lg font-semibold text-custom-gold-light">
                                    {prop.aiScore.toFixed(1)}
                                  </span>
                                </div>
                              </div>

                              {/* 物件スペック詳細 */}
                              <div className="p-5">
                                <span className="font-serif text-[10px] tracking-[0.18em] text-custom-gold">
                                  {prop.locationEn}
                                </span>
                                <h4 className="mt-1 font-serif text-base font-semibold leading-snug text-slate-50">
                                  {prop.title}
                                </h4>
                                <p className="mt-1.5 text-[11px] text-slate-400">
                                  {prop.structureSpec}
                                </p>

                                <dl className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-center">
                                  <div>
                                    <dt className="text-[10px] text-slate-400">
                                      想定取得額
                                    </dt>
                                    <dd className="mt-0.5 font-sans text-xs font-medium text-slate-50">
                                      {prop.priceDisplay}
                                    </dd>
                                  </div>
                                  <div className="border-x border-slate-800 px-1">
                                    <dt className="text-[10px] text-slate-400">
                                      表面利回り
                                    </dt>
                                    <dd className="mt-0.5 font-sans text-xs font-medium text-slate-300">
                                      {prop.grossYield}
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="text-[10px] text-slate-400">
                                      税引後IRR
                                    </dt>
                                    <dd className="mt-0.5 font-sans text-xs font-semibold text-custom-gold-light">
                                      {prop.netAfterTaxIrr}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>

                            <div className="border-t border-slate-800 px-5 py-3.5">
                              <button
                                type="button"
                                onClick={triggerApplicationModal}
                                className="flex w-full items-center justify-between text-xs font-medium text-custom-gold-light transition-colors hover:text-slate-50"
                              >
                                <span>詳細な収支・鑑定書をリクエスト</span>
                                <ArrowUpRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}

                  {/* ==========================================
                      TAB 3: 10年税務シミュレーター (tax-simulator)
                  ========================================== */}
                  {activeTab === 'tax-simulator' ? (
                    <motion.div
                      key="tab-tax-simulator"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.32, ease: 'easeOut' }}
                      className="space-y-8"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
                        <div>
                          <div className="flex items-center gap-2">
                            <Scale
                              className="h-4 w-4 text-custom-gold"
                              aria-hidden="true"
                            />
                            <span className="font-serif text-xs tracking-[0.22em] text-custom-gold-light">
                              10-YEAR EXIT &amp; DEPRECIATION ENGINE
                            </span>
                          </div>
                          <h3 className="mt-1 font-serif text-xl font-semibold text-slate-50">
                            10年税務シミュレーター（減価償却・デッドクロス・出口譲渡税試算）
                          </h3>
                        </div>
                        <span className="rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs text-slate-300">
                          試算対象: 港区南青山4丁目 プライムRC一棟（¥480M）
                        </span>
                      </div>

                      {/* 10年間 累計税引後キャッシュ＆年間償却シールド 棒グラフ */}
                      <div className="rounded-xl border border-slate-700/50 bg-slate-950 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h4 className="font-serif text-base font-medium text-slate-50">
                              Year 1 〜 Year 10 累計税引後キャッシュフロー＆年間節税額（百万円）
                            </h4>
                            <p className="mt-0.5 text-xs text-slate-400">
                              設備償却期間の満了（Year 6）と長期譲渡税率適用による10年後売却エクイティを自動演算
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1.5 text-custom-gold-light">
                              <span className="h-2.5 w-2.5 rounded-sm bg-custom-gold" />
                              累計税引後キャッシュ
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-400">
                              <span className="h-2.5 w-2.5 rounded-sm bg-slate-700" />
                              年間タックスシールド
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-5 gap-3 sm:grid-cols-10">
                          {TEN_YEAR_TAX_BARS.map((bar, idx) => {
                            const cashHeightPercent = Math.min(
                              100,
                              Math.round((bar.cumulativeNetCashMM / 350) * 100)
                            );
                            return (
                              <div
                                key={bar.yearLabel}
                                className="flex flex-col items-center rounded-lg border border-slate-800/80 bg-slate-900/50 p-2.5"
                              >
                                <span className="font-sans text-[11px] font-medium text-custom-gold-light">
                                  ¥{bar.cumulativeNetCashMM}M
                                </span>
                                <div className="my-2 flex h-28 w-full items-end justify-center gap-1 rounded bg-slate-950 p-1.5">
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{
                                      height: `${Math.round(bar.depreciationShieldMM * 3.5)}%`,
                                    }}
                                    transition={{
                                      duration: 0.5,
                                      delay: idx * 0.04,
                                      ease: 'easeOut',
                                    }}
                                    className="w-1/3 rounded-t bg-slate-600"
                                    title={`年間節税額: ¥${bar.depreciationShieldMM}M`}
                                  />
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${cashHeightPercent}%` }}
                                    transition={{
                                      duration: 0.6,
                                      delay: idx * 0.04,
                                      ease: 'easeOut',
                                    }}
                                    className="w-2/3 rounded-t bg-champagne-gold"
                                    title={`累計税引後キャッシュ: ¥${bar.cumulativeNetCashMM}M`}
                                  />
                                </div>
                                <span className="font-sans text-[11px] font-medium text-slate-200">
                                  {bar.yearLabel}
                                </span>
                                <span className="mt-0.5 text-[9px] text-slate-400">
                                  節税¥{bar.depreciationShieldMM}M
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 税率・保有スキーム別 シミュレーション結果比較テーブル */}
                      <div className="rounded-xl border border-slate-700/50 bg-slate-950 p-6">
                        <h4 className="font-serif text-base font-medium text-slate-50">
                          保有スキーム・適用税率別 10年後最終手残り（真のキャッシュフロー）比較表
                        </h4>
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full min-w-[680px] border-collapse text-left font-sans text-xs">
                            <thead>
                              <tr className="border-y border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                                <th className="py-3 pr-4">保有スキーム</th>
                                <th className="py-3 px-4">適用税率基準</th>
                                <th className="py-3 px-4">10年累計節税額</th>
                                <th className="py-3 px-4">出口譲渡課税処理</th>
                                <th className="py-3 px-4">最終手残り純利益</th>
                                <th className="py-3 pl-4 text-right">
                                  税引後IRR
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80">
                              {TAX_BRACKET_ROWS.map((row) => (
                                <tr
                                  key={row.id}
                                  className={
                                    row.isRecommended
                                      ? 'bg-custom-gold/[0.08]'
                                      : 'hover:bg-slate-900/60'
                                  }
                                >
                                  <td className="py-4 pr-4 font-medium text-slate-50">
                                    <div className="flex items-center gap-2">
                                      <span>{row.schemeName}</span>
                                      {row.isRecommended ? (
                                        <span className="rounded border border-custom-gold/60 bg-custom-gold/20 px-2 py-0.5 text-[10px] text-custom-gold-light">
                                          最適スキーム
                                        </span>
                                      ) : null}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4 text-slate-300">
                                    {row.effectiveTaxRate}
                                  </td>
                                  <td className="py-4 px-4 font-medium text-slate-50">
                                    {row.tenYearTaxShield}
                                  </td>
                                  <td className="py-4 px-4 text-slate-400">
                                    {row.exitCapitalGainsTax}
                                  </td>
                                  <td className="py-4 px-4 font-sans text-sm font-semibold text-custom-gold-light">
                                    {row.finalNetProceeds}
                                  </td>
                                  <td className="py-4 pl-4 text-right font-sans text-sm font-semibold text-slate-50">
                                    {row.postTaxIrr}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}

                  {/* ==========================================
                      TAB 4 & 5: 電子契約・賃貸管理 / 出口売却シグナル
                  ========================================== */}
                  {activeTab === 'contracts' || activeTab === 'exit-signal' ? (
                    <motion.div
                      key={`tab-${activeTab}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.32, ease: 'easeOut' }}
                      className="space-y-6"
                    >
                      <div className="rounded-xl border border-custom-gold/40 bg-slate-950 p-8 text-center">
                        <span className="font-serif text-xs uppercase tracking-[0.24em] text-custom-gold">
                          {activeTab === 'contracts'
                            ? 'DIGITAL ESCROW & LEASE MANAGEMENT'
                            : 'AI EXIT TIMING & CAP-RATE RADAR'}
                        </span>
                        <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-50">
                          {activeTab === 'contracts'
                            ? '完全デジタル電子契約・月次NOI賃貸管理台帳'
                            : 'AI出口売却シグナル（キャップレート圧縮・デッドクロス検知）'}
                        </h3>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                          {activeTab === 'contracts'
                            ? '売買契約書の電子署名（クラウドサイン・法務局オンライン連携）から、毎月のレントロール・修繕履歴・税理士法人への仕訳データ自動連携までを一元管理します。'
                            : '周辺成約事例のキャップレート変動と、保有物件の減価償却デッドクロス到来時期を24時間監視し、税引後純利益が最大化される売却タイミングをアラート通知します。'}
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => setActiveTab('summary')}
                            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:border-custom-gold"
                          >
                            資産サマリーへ戻る
                          </button>
                          <button
                            type="button"
                            onClick={triggerApplicationModal}
                            className="rounded-xl bg-custom-gold px-6 py-2.5 text-xs font-semibold text-slate-950 transition-all hover:bg-custom-gold-light hover:shadow-gold-glow"
                          >
                            フル機能デモをリクエスト
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardMockup;
