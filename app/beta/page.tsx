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
  '18+，愿意用匿名方式探索关系',
  '喜欢具体表达，而不是只看头像资料',
  '可以接受产品仍处于 Mock Demo 阶段',
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
  '你是否真的想继续拆第二层',
  '哪一个人格碎片让你停了一下',
  '关系 Journey 是期待感，还是像任务',
  '邀请朋友的分享卡是否值得截图转发',
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
              <span className="block text-base font-semibold">SELE</span>
              <span className="block text-xs text-[var(--muted-ink)]">
                Sele Private Beta
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
            <h1>我们在找第一批愿意认真拆开一个人的测试用户</h1>
            <p>
              Heartbox
              不是看脸滑卡，也不是另一个朋友圈。这里先写下一点真实的你，
              再拆开一个未知的人，最后决定要不要留下回声。
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
            <h2>有人觉得这里有一个你会想认识的人</h2>
            <p>先别急着看脸。拆开一段人格碎片，看看你会不会突然想多问一句。</p>
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
            <h2>这次内测只验证一件事</h2>
            <p>
              一个从没听过 Heartbox 的年轻用户，能不能自然走完： 写一点关于自己
              → 拆开一个人 → 喜欢就留下回声。
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
              <h2>留下一个可以联系你的方式</h2>
              <p>
                申请信息会通过飞书表单收集，用于后续内测联系和体验反馈。
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
