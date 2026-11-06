import type { Metadata, Viewport } from 'next';
import { JapaneseFontLoader } from '@/components/layout/JapaneseFontLoader';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://xenith-asset.vercel.app';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * SNS共有・SEO・Faviconを統合管理する動的メタデータ基盤
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'XENITH ASSET | 富裕層向け完全非公開・不動産投資プラットフォーム',
    template: '%s | XENITH ASSET',
  },
  description:
    'AIによる非公開物件のスコアリングと、税務最適化アルゴリズム。論理とデータが導き出す、資産防衛の最終解。',
  keywords: [
    'XENITH ASSET',
    'ゼニス・アセット',
    '富裕層資産管理',
    '非公開不動産',
    'AIスコアリング',
    '税務シミュレーション',
    '出口戦略',
    '医療法人節税',
    '資産管理会社',
  ],
  authors: [{ name: 'XENITH ASSET Quantitative Engineering Team' }],
  creator: 'XENITH ASSET Inc.',
  publisher: 'XENITH ASSET Inc.',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    siteName: 'XENITH ASSET',
    title: 'XENITH ASSET | 資産を「守る」から「創る」へ。',
    description:
      'AIによる非公開物件のスコアリングと、税務最適化アルゴリズム。論理とデータが導き出す、資産防衛の最終解。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XENITH ASSET - Private Wealth & Real Estate Intelligence SaaS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XENITH ASSET | 富裕層向け完全非公開・不動産投資プラットフォーム',
    description:
      'AIによる非公開物件のスコアリングと、税務最適化アルゴリズム。論理とデータが導き出す、資産防衛の最終解。',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="dark"
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/mv.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen bg-slate-900 font-sans font-normal text-slate-50 antialiased">
        <JapaneseFontLoader />
        {children}
      </body>
    </html>
  );
}
