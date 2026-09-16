import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/about', label: '关于' },
  { href: '/beta', label: '内测' },
  { href: '/terms', label: '协议' },
];

const footerLinks = [
  { href: '/about', label: '关于 SELE' },
  { href: '/beta', label: '内测计划' },
  { href: '/privacy', label: '隐私政策' },
  { href: '/terms', label: '用户协议' },
  { href: '/contact', label: '联系我们' },
];

export function OfficialLayout({ children }: { children: ReactNode }) {
  return (
    <main className="official-site">
      <div className="grain" />
      <div className="official-shell">
        <header className="official-header">
          <Link className="official-brand" href="/" aria-label="SELE 首页">
            <SeleMark />
            <span>SELE</span>
          </Link>
          <nav className="official-nav" aria-label="主导航">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
        <footer className="official-footer">
          <div>
            <p className="official-footer-brand">SELE</p>
            <p>有些人，适合晚一点看见。</p>
          </div>
          <nav className="official-footer-links" aria-label="页脚导航">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="official-records">
            <p>网站名称：微光拾语</p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
            >
              沪ICP备2026046102号-1
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}

export function SeleMark() {
  return (
    <span className="official-logo" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M16.4 5.6C14.4 3.9 11 3.8 8.9 5.5C6.9 7.1 7.1 9.5 9 10.9C10 11.6 11 11.8 12.2 11.8" />
        <path d="M11.8 12.2C13 12.2 14 12.4 15 13.1C16.9 14.5 17.1 16.9 15.1 18.5C13 20.2 9.6 20.1 7.6 18.4" />
      </svg>
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="official-section-header">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
    </div>
  );
}

export function TextBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="official-text-block">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export function DocumentPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <OfficialLayout>
      <article className="official-document">
        <header>
          <p className="official-kicker">SELE</p>
          <h1>{title}</h1>
          {intro ? <p>{intro}</p> : null}
        </header>
        <div className="official-document-body">{children}</div>
      </article>
    </OfficialLayout>
  );
}
