import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const assetBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? '';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joinsele.cn'),
  title: 'SELE｜有些人，适合晚一点看见',
  description:
    'SELE 是一个关于人与人如何认识彼此的互联网产品探索。先认识一点，再决定要不要靠近。',
  icons: {
    icon: `${assetBasePath}/favicon.svg`,
  },
  openGraph: {
    title: 'SELE｜有些人，适合晚一点看见',
    description:
      'SELE 是一个关于人与人如何认识彼此的互联网产品探索。先认识一点，再决定要不要靠近。',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SELE｜有些人，适合晚一点看见',
    description:
      'SELE 是一个关于人与人如何认识彼此的互联网产品探索。先认识一点，再决定要不要靠近。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
