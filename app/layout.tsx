import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://heartbox-blind-dating.vipg1888.chatgpt.site'),
  title: 'Heartbox 心动盲盒',
  description: '面向年轻成年用户的匿名人格探索、恋爱盲盒与关系成长产品。',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Heartbox 心动盲盒',
    description: '通过人格碎片、拆盲盒和匿名关系 Journey，拆开一个未知的人。',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heartbox 心动盲盒',
    description: '通过人格碎片、拆盲盒和匿名关系 Journey，拆开一个未知的人。',
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
