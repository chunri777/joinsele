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
  '18+，愿意慢一点认识一个人',
  '相信一句具体的话，比一张照片更接近真实',
  '愿意把第一感受认真告诉我们',
];

const betaFlow = [
  {
    title: '写下一段人格碎片',
    body: '回答一个 Daily Prompt，不需要填写很长的资料。',
  },
  {
    title: '拆开第一只盲盒',
    body: '先看见一个人的片刻，再决定要不要继续靠近。',
  },
  {
    title: '留下回声',
    body: '如果有一点好奇，留下一句匿名回应，等待对方是否也回应。',
  },
];

const feedbackFocus = [
  '哪一句话让你停了一下',
  '你是否想继续拆开第二层',
  '回声是否让关系变得更轻',
  '这个邀请是否值得发给一个朋友',
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
            <p>
              先认识一点，再决定要不要靠近。SELE 正在邀请第一批体验者。
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
              一段回声正在等你
            </div>
          </div>
        </div>

        <section className="beta-grid">
          <div className="beta-panel">
            <p className="eyebrow">Who fits</p>
            <h2>适合参加的人</h2>
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
            <p className="eyebrow">Safety</p>
            <h2>内测边界</h2>
            <div className="beta-list">
              <p>
                <ShieldCheck className="h-4 w-4" />
                仅面向 18+ 成年用户
              </p>
              <p>
                <LockKeyhole className="h-4 w-4" />
                不鼓励过早交换联系方式
              </p>
              <p>
                <Sparkles className="h-4 w-4" />
                当前为产品 Demo，真实关系前仍需人工判断
              </p>
            </div>
          </div>
        </section>

        <section className="beta-panel beta-flow-panel">
          <div>
            <p className="eyebrow">10-minute test</p>
            <h2>这次内测，只想听见真实感受</h2>
            <p>
              你不需要理解复杂规则。写下一点自己，拆开一个人，喜欢就留下回声。
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
              <h2>留下一个可以收到邀请的方式</h2>
              <p>
                申请会进入飞书表单。我们会从第一批体验者开始，慢慢开放。
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
                打开飞书申请表
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="beta-panel">
          <p className="eyebrow">Feedback focus</p>
          <h2>我们最想听见的反馈</h2>
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
