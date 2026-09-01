'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartHandshake,
  LockKeyhole,
  PackageOpen,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const BETA_FORM_URL =
  'https://my.feishu.cn/share/base/form/shrcnXhe8ikq2Wk15JTTNwzHPdd';

const testerFit = [
  '18 岁以上',
  '愿意认真表达，而不是只看头像',
  '接受这是一次早期体验',
];

const betaFlow = [
  {
    title: '写下一段真实片刻',
    body: '不用介绍全部的你，只要一件具体的小事。',
  },
  {
    title: '拆开第一只盲盒',
    body: '先看见一个人的片刻，再决定要不要继续读下去。',
  },
  {
    title: '留下一段回声',
    body: '如果有一点好奇，就留下一句轻一点的回应。',
  },
];

const feedbackFocus = [
  '哪一句让你停了一下',
  '你是否愿意继续拆下一层',
  '哪个地方让你感到不安或困惑',
  '你会不会把它发给朋友',
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
          <Link className="beta-back-link" href="./">
            <ArrowLeft className="h-4 w-4" />
            返回体验 Demo
          </Link>
        </nav>

        <div className="beta-hero">
          <div className="beta-hero-copy">
            <p className="eyebrow">SELE private beta</p>
            <h1>有些人，适合晚一点看见。</h1>
            <p className="beta-hero-subtitle">
              <span>先认识一点，再决定要不要靠近。</span>
              <strong>SELE 正在邀请第一批体验者。</strong>
            </p>
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
          </div>
          <div className="beta-invite-card" aria-label="Heartbox beta card">
            <div className="share-card-seal">Sealed for beta</div>
            <h2>给你留了一只还没拆开的 Heartbox。</h2>
            <p>先别急着看见全部。读一句话，看看你会不会想多问一句。</p>
            <div className="beta-envelope-mini">
              <HeartHandshake className="h-5 w-5" />
              一段回声正在靠近。
            </div>
          </div>
        </div>

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

        <section className="beta-panel beta-flow-panel">
          <div>
            <p className="eyebrow">First time</p>
            <h2>第一次，可以这样开始</h2>
            <p>
              写下一段真实片刻；拆开第一只盲盒；如果有一点好奇，就留下一段回声。
            </p>
          </div>
          <div className="beta-flow">
            {betaFlow.map((item, index) => (
              <article key={item.title}>
                <span>{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="beta-panel" id="join-beta">
          <div className="beta-join">
            <div>
              <p className="eyebrow">Join beta</p>
              <h2>留下一种可以联系你的方式</h2>
              <p>
                申请信息会通过飞书表单收集，仅用于内测联系和体验反馈。
              </p>
            </div>
            <div className="beta-form">
              <p>打开申请表后，会在新标签页填写联系方式和申请理由。</p>
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

        <section className="beta-panel">
          <p className="eyebrow">Feedback</p>
          <h2>我们想听见什么</h2>
          <div className="beta-feedback-grid">
            {feedbackFocus.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
