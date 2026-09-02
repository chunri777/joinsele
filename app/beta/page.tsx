'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Check,
  HeartHandshake,
  LockKeyhole,
  PenLine,
  PackageOpen,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const BETA_FORM_URL =
  'https://my.feishu.cn/share/base/form/shrcnXhe8ikq2Wk15JTTNwzHPdd';

const testerFit = [
  '18 岁以上',
  '愿意认真表达',
  '愿意给未知留一点时间',
];

const betaFlow = [
  {
    title: '写下一件小事',
    body: '不用介绍全部的你，只要一件具体的小事。',
  },
  {
    title: '拆开一只盲盒',
    body: '先看见片刻，再决定要不要继续。',
  },
  {
    title: '留下一段回声',
    body: '有一点好奇，就轻轻回应一句。',
  },
];

export default function PrivateBetaPage() {
  return (
    <main className="beta-shell">
      <div className="grain" />
      <section className="beta-frame">
        <nav className="beta-nav">
          <Link className="brand-lockup" href="./">
            <span className="brand-mark">S</span>
            <span>
              <span className="block text-sm font-medium">SELE</span>
              <span className="block text-xs text-[var(--muted-ink)]">
                Heartbox
              </span>
            </span>
          </Link>
          <a className="beta-back-link" href="#join-beta">
            Private Beta
          </a>
        </nav>

        <div className="beta-hero">
          <div className="beta-hero-copy">
            <p className="eyebrow">SELE private beta</p>
            <h1>
              有一段话，
              <br />
              还没有被打开。
            </h1>
            <div className="beta-hero-rule" aria-hidden="true" />
            <div className="beta-envelope-mini">
              <HeartHandshake className="h-5 w-5" />
              <span>一段回声正在靠近</span>
              <span className="echo-dots" aria-hidden="true">
                <span>·</span>
                <span>·</span>
                <span>·</span>
              </span>
            </div>
          </div>
          <div className="beta-invite-card" aria-label="Heartbox beta card">
            <div className="beta-door" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>

        <section className="beta-intro-card">
          <div>
            <p className="eyebrow">SELE private beta</p>
            <h2>有些人，适合晚一点看见。</h2>
            <p className="beta-hero-subtitle">
              <span>先认识一点，再决定要不要靠近。</span>
              <strong>SELE 正在邀请第一批体验者。</strong>
            </p>
          </div>
          <div className="beta-actions">
            <a className="pill-primary" href="#join-beta">
              申请内测
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link className="pill-secondary" href="./">
              直接体验 Demo
              <PackageOpen className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="beta-panel beta-flow-panel">
          <div>
            <p className="eyebrow">First time</p>
            <h2>第一次，可以这样开始</h2>
          </div>
          <div className="beta-flow">
            {betaFlow.map((item, index) => (
              <article key={item.title}>
                <span>{index + 1}</span>
                {index === 0 ? (
                  <PenLine className="beta-flow-icon h-6 w-6" />
                ) : index === 1 ? (
                  <PackageOpen className="beta-flow-icon h-6 w-6" />
                ) : (
                  <HeartHandshake className="beta-flow-icon h-6 w-6" />
                )}
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="beta-grid">
          <div className="beta-panel">
            <p className="eyebrow">For whom</p>
            <h2>适合这样的人</h2>
            <div className="beta-list">
              {testerFit.map((item) => (
                <p key={item}>
                  <Check className="h-4 w-4" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="beta-panel">
            <p className="eyebrow">Pace</p>
            <h2>慢一点，也可以</h2>
            <div className="beta-list">
              <p>
                <ShieldCheck className="h-4 w-4" />
                匿名开始
              </p>
              <p>
                <LockKeyhole className="h-4 w-4" />
                双方同意后才靠近
              </p>
              <p>
                <Sparkles className="h-4 w-4" />
                不默认公开真实姓名、联系方式和位置
              </p>
            </div>
          </div>
        </section>

        <section className="beta-panel" id="join-beta">
          <div className="beta-join">
            <div>
              <p className="eyebrow">Join beta</p>
              <h2>留下一种可以联系你的方式</h2>
              <p>申请会通过飞书表单完成，仅用于内测联系。</p>
            </div>
            <div className="beta-form">
              <a
                className="pill-primary"
                href={BETA_FORM_URL}
                target="_blank"
                rel="noreferrer"
              >
                打开申请表
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
