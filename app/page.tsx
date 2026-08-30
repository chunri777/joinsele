"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Ban,
  Bell,
  Check,
  ChevronLeft,
  Eye,
  EyeOff,
  Flag,
  HeartHandshake,
  LockKeyhole,
  MapPin,
  MessageCircle,
  PackageOpen,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";

type View = "discover" | "create" | "quiz" | "match" | "chat" | "mine" | "safety";

const navItems: { id: View; label: string }[] = [
  { id: "discover", label: "发现盲盒" },
  { id: "create", label: "创建盲盒" },
  { id: "quiz", label: "人格问答" },
  { id: "match", label: "匹配结果" },
  { id: "chat", label: "匿名聊天室" },
  { id: "mine", label: "我的盲盒" },
  { id: "safety", label: "安全中心" },
];

const interests = ["独立电影", "夜跑", "小酒馆", "城市散步", "Livehouse", "心理学", "做饭", "展览"];

const poolCards = [
  {
    name: "月台来信",
    city: "上海",
    age: "25-29",
    mbti: "INFJ",
    tags: ["电影", "夜跑", "慢热"],
    line: "希望先确认能不能自然地说废话，再谈心动。",
    match: 92,
  },
  {
    name: "雾里电台",
    city: "杭州",
    age: "23-26",
    mbti: "ENFP",
    tags: ["播客", "咖啡", "周末出逃"],
    line: "喜欢有边界感的人，也喜欢认真回复一段话的人。",
    match: 87,
  },
  {
    name: "晚风切片",
    city: "成都",
    age: "27-31",
    mbti: "INTP",
    tags: ["书店", "爵士", "猫"],
    line: "不赶进度，想认识一个能一起沉默也舒服的人。",
    match: 84,
  },
];

const history = [
  ["未署名的伞", "已聊天 9 轮", "互相揭晓了兴趣和城市区"],
  ["周三宇航员", "已结束", "对方主动关闭，资料已自动隐藏"],
  ["蓝莓回音", "待回应", "盲盒仍在 24 小时保护期内"],
];

const starters = [
  "最近一次觉得生活有电影感是什么时候？",
  "你在亲密关系里最看重的一个细节？",
  "如果周末只留给一个人，你会带 TA 去哪里？",
];

const initialMessages = [
  { from: "match", text: "我抽到了你的卡片，那个“能自然说废话”有点打中我。" },
  { from: "me", text: "那我们先从废话开始：今天你路过的天空是什么颜色？" },
  { from: "match", text: "偏灰蓝，但下班路上的灯很暖。你呢？" },
  { from: "me", text: "奶油色的办公室和莓果色的晚霞，听起来很像这个盲盒。" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [view, setView] = useState<View>("discover");
  const [step, setStep] = useState(0);
  const [matched, setMatched] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [reported, setReported] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const sensitive = useMemo(() => {
    return /(微信|vx|wechat|手机号|电话|\d{11})/i.test(message);
  }, [message]);

  function go(next: View) {
    setView(next);
    window.requestAnimationFrame(() => {
      document.getElementById("app-surface")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function sendMessage() {
    if (!message.trim()) return;
    setMessages((current) => [...current, { from: "me", text: message.trim() }]);
    setMessage("");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--ink)]">
      <div className="grain" />
      <header className="sticky top-0 z-40 border-b border-white/70 bg-[rgba(255,248,240,0.78)] px-4 py-3 backdrop-blur-2xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button className="flex items-center gap-3" onClick={() => go("discover")}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--wine)] text-sm font-semibold text-white shadow-[0_10px_28px_rgb(95_20_38/25%)]">
              Hb
            </span>
            <span className="text-left">
              <span className="block text-base font-semibold tracking-[0.02em]">Heartbox</span>
              <span className="block text-xs text-[var(--muted-ink)]">心动盲盒</span>
            </span>
          </button>
          <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/45 p-1 shadow-[0_12px_35px_rgb(80_20_35/7%)] lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm transition",
                  view === item.id
                    ? "bg-[var(--wine)] text-white shadow-[0_10px_22px_rgb(95_20_38/18%)]"
                    : "text-[var(--soft-ink)] hover:bg-white/70",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => go("create")}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--wine)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgb(95_20_38/18%)]"
          >
            <UserRoundPlus className="h-4 w-4" />
            创建
          </button>
        </div>
      </header>

      <section className="relative px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[calc(100vh-92px)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 max-w-3xl py-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--berry)]/15 bg-white/55 px-3 py-2 text-sm text-[var(--berry)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              18+ 年轻成年人的匿名恋爱盲盒
            </div>
            <h1 className="max-w-4xl text-[clamp(3.3rem,8vw,7.8rem)] font-semibold leading-[0.91] tracking-[-0.04em]">
              拆开一个
              <span className="block text-[var(--berry)]">未知的人</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--soft-ink)]">
              先用人格卡片认识彼此，不急着交换真实资料。投递一个匿名盲盒，遇见城市、兴趣和恋爱观刚好有回声的人。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => go("match")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--wine)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_42px_rgb(95_20_38/22%)]"
              >
                拆开一个盲盒
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => go("create")}
                className="inline-flex items-center justify-center rounded-full border border-[var(--wine)]/15 bg-white/60 px-6 py-4 text-base font-semibold text-[var(--wine)] backdrop-blur-xl"
              >
                先创建人格卡片
              </button>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <Metric title="18+" body="仅面向成年人" />
              <Metric title="0m" body="不展示精确定位" />
              <Metric title="匿名" body="手机号微信不公开" />
            </div>
          </div>
          <HeroStack />
        </div>
      </section>

      <section id="app-surface" className="relative px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="glass-panel h-fit p-3 lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cx(
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition",
                    view === item.id
                      ? "bg-[var(--wine)] text-white"
                      : "bg-white/45 text-[var(--soft-ink)] hover:bg-white/70",
                  )}
                >
                  {item.label}
                  {view === item.id && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-[var(--berry)]/10 bg-[var(--mist)]/35 p-4">
              <p className="text-sm font-semibold text-[var(--wine)]">安全边界</p>
              <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">
                不允许未成年人使用；不公开手机号、微信、精确定位；聊天内置敏感信息提醒。
              </p>
            </div>
          </aside>

          <div className="min-h-[680px]">
            {view === "discover" && <Discover onCreate={() => go("create")} onMatch={() => go("match")} />}
            {view === "create" && <CreateBox onNext={() => go("quiz")} />}
            {view === "quiz" && <Quiz step={step} setStep={setStep} onDone={() => go("match")} />}
            {view === "match" && (
              <MatchResult
                matched={matched}
                onMatch={() => setMatched(true)}
                onChat={() => go("chat")}
              />
            )}
            {view === "chat" && (
              <ChatRoom
                messages={messages}
                message={message}
                sensitive={sensitive}
                revealed={revealed}
                blocked={blocked}
                reported={reported}
                setMessage={setMessage}
                sendMessage={sendMessage}
                setRevealed={setRevealed}
                setBlocked={setBlocked}
                setReported={setReported}
              />
            )}
            {view === "mine" && <Mine onChat={() => go("chat")} />}
            {view === "safety" && <SafetyCenter reported={reported} blocked={blocked} />}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/50 p-4 backdrop-blur-xl">
      <p className="text-xl font-semibold text-[var(--wine)]">{title}</p>
      <p className="mt-1 text-sm text-[var(--muted-ink)]">{body}</p>
    </div>
  );
}

function HeroStack() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] py-8">
      <div className="absolute -left-10 top-16 h-52 w-52 rounded-full bg-[var(--mist)]/45 blur-3xl" />
      <div className="absolute bottom-6 right-0 h-72 w-72 rounded-full bg-[var(--berry)]/15 blur-3xl" />
      <div className="relative rotate-[-2deg] rounded-[34px] border border-white/75 bg-white/55 p-5 shadow-[0_34px_90px_rgb(80_20_35/16%)] backdrop-blur-2xl">
        <div className="rounded-[28px] bg-[linear-gradient(145deg,#6f1830,#a42d4a_46%,#efd7d8)] p-1">
          <div className="rounded-[24px] bg-[rgba(255,250,245,0.9)] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--muted-ink)]">匿名人格卡片</p>
                <h2 className="mt-2 text-3xl font-semibold">月台来信</h2>
              </div>
              <EyeOff className="h-6 w-6 text-[var(--berry)]" />
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {["25-29", "上海", "INFJ", "电影 / 夜跑"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/70 px-4 py-3 text-sm text-[var(--soft-ink)]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-white/70 p-5">
              <p className="text-sm text-[var(--muted-ink)]">恋爱观</p>
              <p className="mt-2 text-lg leading-7">慢一点也没关系。希望先确认能不能自然地说废话，再谈心动。</p>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-3xl border border-[var(--berry)]/10 bg-[var(--mist)]/35 px-5 py-4">
              <span className="text-sm text-[var(--soft-ink)]">互动达到 6 轮后可互相揭晓</span>
              <ShieldCheck className="h-5 w-5 text-[var(--berry)]" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-10 ml-auto w-[82%] rotate-[3deg] rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_24px_70px_rgb(80_20_35/12%)] backdrop-blur-2xl">
        <p className="text-sm font-medium text-[var(--berry)]">今日匹配池</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-4xl font-semibold">128</p>
          <p className="max-w-36 text-right text-sm text-[var(--muted-ink)]">个等待被温柔拆开的盲盒</p>
        </div>
      </div>
    </div>
  );
}

function Discover({ onCreate, onMatch }: { onCreate: () => void; onMatch: () => void }) {
  return (
    <section className="space-y-6">
      <Panel className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Discover pool</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">今晚的盲盒池</h2>
            <p className="mt-4 max-w-2xl text-[var(--soft-ink)]">
              系统会按年龄段、城市区、兴趣重叠和恋爱观关键词半随机匹配。先匿名聊天，再决定是否揭晓更多资料。
            </p>
          </div>
          <div className="flex gap-3">
            <button className="pill-secondary" onClick={onCreate}>创建我的盲盒</button>
            <button className="pill-primary" onClick={onMatch}>投递并匹配</button>
          </div>
        </div>
      </Panel>
      <div className="grid gap-4 xl:grid-cols-3">
        {poolCards.map((card) => (
          <Panel key={card.name} className="group p-5">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--wine)] text-white">
                <PackageOpen className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-[var(--mist)]/45 px-3 py-1 text-sm font-semibold text-[var(--berry)]">
                {card.match}% 回声
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold">{card.name}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-[var(--muted-ink)]">
              <MapPin className="h-4 w-4" />
              {card.city} · {card.age} · {card.mbti}
            </p>
            <p className="mt-5 min-h-16 text-[var(--soft-ink)]">{card.line}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--wine)]/10 bg-white/50 px-3 py-1 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function CreateBox({ onNext }: { onNext: () => void }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_0.82fr]">
      <Panel className="p-6 sm:p-8">
        <p className="eyebrow">Create box</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">创建匿名人格卡片</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field label="匿名昵称" value="月台来信" />
          <Field label="年龄段" value="25-29" />
          <Field label="城市" value="上海（仅城市，不展示精确定位）" />
          <Field label="MBTI（可选）" value="INFJ" />
        </div>
        <div className="mt-5">
          <label className="text-sm font-medium text-[var(--wine)]">兴趣</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {interests.map((item, index) => (
              <button
                key={item}
                className={cx("rounded-full px-4 py-2 text-sm", index < 4 ? "bg-[var(--wine)] text-white" : "bg-white/65 text-[var(--soft-ink)]")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-4">
          <Area label="恋爱观" value="慢一点也没关系。希望先确认能不能自然地说废话，再谈心动。" />
          <Area label="想认识的人" value="有边界感、愿意认真表达，也能接受彼此都有自己的生活。" />
        </div>
        <button className="pill-primary mt-7" onClick={onNext}>
          进入 3 个问题
        </button>
      </Panel>
      <Panel className="p-6">
        <p className="eyebrow">Preview</p>
        <div className="mt-4 rounded-[30px] bg-[linear-gradient(145deg,#5d1428,#a12c49,#edd5d8)] p-1">
          <div className="rounded-[26px] bg-[rgba(255,250,245,0.9)] p-6">
            <p className="text-sm text-[var(--muted-ink)]">你的匿名卡片</p>
            <h3 className="mt-3 text-3xl font-semibold">月台来信</h3>
            <p className="mt-4 text-[var(--soft-ink)]">25-29 · 上海 · INFJ</p>
            <p className="mt-8 text-xl leading-8">“不急着证明自己，先看看对方如何对待一次普通聊天。”</p>
          </div>
        </div>
        <div className="mt-5 rounded-3xl bg-white/55 p-5">
          <p className="font-semibold text-[var(--wine)]">发布前确认</p>
          <ul className="mt-3 space-y-3 text-sm text-[var(--soft-ink)]">
            <li>已确认本人 18 岁及以上。</li>
            <li>未填写手机号、微信、住址或工作单位。</li>
            <li>同意被举报或拉黑后限制互动。</li>
          </ul>
        </div>
      </Panel>
    </section>
  );
}

function Quiz({ step, setStep, onDone }: { step: number; setStep: (step: number) => void; onDone: () => void }) {
  const progress = ((step + 1) / starters.length) * 100;
  return (
    <Panel className="p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Persona questions</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">多步人格问答</h2>
        </div>
        <span className="rounded-full bg-white/60 px-4 py-2 text-sm text-[var(--soft-ink)]">{step + 1} / 3</span>
      </div>
      <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/60">
        <div className="h-full rounded-full bg-[var(--berry)]" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-8 rounded-[30px] bg-white/55 p-6">
        <p className="text-sm font-semibold text-[var(--berry)]">问题 {step + 1}</p>
        <h3 className="mt-4 text-2xl font-semibold">{starters[step]}</h3>
        <textarea
          className="mt-6 min-h-40 w-full resize-none rounded-3xl border border-[var(--wine)]/10 bg-[rgba(255,255,255,0.72)] p-5 text-base outline-none focus:border-[var(--berry)]"
          defaultValue={[
            "上周六凌晨散步，便利店门口有人给流浪猫倒水。那一刻觉得城市没有那么硬。",
            "看 TA 如何处理不一致。温柔不是永远同意，而是不同意时也不伤人。",
            "先去安静的展，再去吃一顿不用拍照也很好吃的饭。",
          ][step]}
        />
      </div>
      <div className="mt-7 flex justify-between">
        <button className="pill-secondary" onClick={() => setStep(Math.max(0, step - 1))}>
          <ChevronLeft className="h-4 w-4" />
          上一步
        </button>
        <button className="pill-primary" onClick={() => (step === 2 ? onDone() : setStep(step + 1))}>
          {step === 2 ? "投递盲盒" : "下一题"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Panel>
  );
}

function MatchResult({ matched, onMatch, onChat }: { matched: boolean; onMatch: () => void; onChat: () => void }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Panel className="flex min-h-[520px] flex-col items-center justify-center p-8 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-[32px] bg-[var(--wine)] text-white shadow-[0_26px_55px_rgb(95_20_38/24%)]">
          <PackageOpen className="h-11 w-11" />
        </div>
        <h2 className="mt-7 text-4xl font-semibold">{matched ? "盲盒已拆开" : "准备拆开一个未知的人"}</h2>
        <p className="mt-4 max-w-md text-[var(--soft-ink)]">
          {matched ? "系统基于兴趣重叠、城市区和恋爱观关键词，为你匹配到一张匿名人格卡。" : "点击后模拟进入匹配池，系统将半随机抽取一位合适对象。"}
        </p>
        <button className="pill-primary mt-8" onClick={matched ? onChat : onMatch}>
          {matched ? "进入匿名聊天" : "开始匹配"}
        </button>
      </Panel>
      <Panel className="p-6 sm:p-8">
        <p className="eyebrow">Match result</p>
        <h3 className="mt-3 text-3xl font-semibold">雾里电台</h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Metric title="92%" body="恋爱观回声" />
          <Metric title="6" body="共同兴趣" />
          <Metric title="24h" body="匿名保护期" />
        </div>
        <div className="mt-6 rounded-3xl bg-white/55 p-6">
          <p className="text-sm text-[var(--muted-ink)]">TA 的一段答案</p>
          <p className="mt-3 text-xl leading-8">“我喜欢让关系自然长出来，而不是把每一次聊天都变成考试。”</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {["城市区：华东", "年龄段：25-29", "兴趣：播客 / 电影", "揭晓条件：双方同意"].map((item) => (
            <div key={item} className="rounded-2xl bg-white/45 p-4 text-[var(--soft-ink)]">{item}</div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function ChatRoom(props: {
  messages: { from: string; text: string }[];
  message: string;
  sensitive: boolean;
  revealed: boolean;
  blocked: boolean;
  reported: boolean;
  setMessage: (value: string) => void;
  sendMessage: () => void;
  setRevealed: (value: boolean) => void;
  setBlocked: (value: boolean) => void;
  setReported: (value: boolean) => void;
}) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/70 p-5">
          <div>
            <p className="eyebrow">Anonymous chat</p>
            <h2 className="mt-1 text-2xl font-semibold">与「雾里电台」匿名聊天</h2>
          </div>
          <span className="rounded-full bg-[var(--mist)]/45 px-3 py-1 text-sm text-[var(--berry)]">4 / 6 轮</span>
        </div>
        <div className="space-y-4 p-5">
          {props.messages.map((item, index) => (
            <div key={`${item.text}-${index}`} className={cx("flex", item.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cx("max-w-[78%] rounded-[24px] px-5 py-3 leading-7", item.from === "me" ? "bg-[var(--wine)] text-white" : "bg-white/65 text-[var(--soft-ink)]")}>
                {item.text}
              </div>
            </div>
          ))}
          {props.revealed && (
            <div className="rounded-3xl border border-[var(--berry)]/15 bg-[var(--mist)]/35 p-5">
              <p className="font-semibold text-[var(--wine)]">双方已同意揭晓更多资料</p>
              <p className="mt-2 text-sm text-[var(--soft-ink)]">可见：真实名字首字母、城市区、更多兴趣。不显示手机号、微信或精确位置。</p>
            </div>
          )}
        </div>
        <div className="border-t border-white/70 p-5">
          {props.sensitive && (
            <div className="mb-3 flex items-start gap-3 rounded-2xl border border-[var(--berry)]/15 bg-[var(--mist)]/35 p-3 text-sm text-[var(--wine)]">
              <ShieldAlert className="mt-0.5 h-4 w-4" />
              检测到可能的手机号/微信等敏感信息。为保护隐私，建议在双方确认前不要交换外部联系方式。
            </div>
          )}
          <div className="flex gap-3">
            <input
              value={props.message}
              onChange={(event) => props.setMessage(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && props.sendMessage()}
              placeholder="继续匿名聊天..."
              className="min-w-0 flex-1 rounded-full border border-[var(--wine)]/10 bg-white/70 px-5 py-3 outline-none focus:border-[var(--berry)]"
            />
            <button className="grid h-12 w-12 place-items-center rounded-full bg-[var(--wine)] text-white" onClick={props.sendMessage}>
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Panel>
      <Panel className="h-fit p-5">
        <p className="eyebrow">Controls</p>
        <div className="mt-4 space-y-3">
          <button className="action-row" onClick={() => props.setRevealed(!props.revealed)}>
            <Eye className="h-5 w-5" />
            {props.revealed ? "收起揭晓资料" : "请求互相揭晓"}
          </button>
          <button className="action-row" onClick={() => props.setReported(true)}>
            <Flag className="h-5 w-5" />
            {props.reported ? "已提交举报" : "举报不适内容"}
          </button>
          <button className="action-row" onClick={() => props.setBlocked(!props.blocked)}>
            <Ban className="h-5 w-5" />
            {props.blocked ? "已拉黑，对话冻结" : "拉黑并停止匹配"}
          </button>
        </div>
        <div className="mt-5 rounded-3xl bg-white/55 p-5 text-sm leading-6 text-[var(--soft-ink)]">
          反骚扰保护：连续发送冒犯、索要联系方式、诱导线下见面会触发限流和人工复核。
        </div>
      </Panel>
    </section>
  );
}

function Mine({ onChat }: { onChat: () => void }) {
  return (
    <section className="space-y-6">
      <Panel className="p-6 sm:p-8">
        <p className="eyebrow">My boxes</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">我的盲盒 / 历史匹配</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <Metric title="1" body="投递中的盲盒" />
          <Metric title="8" body="累计匿名聊天" />
          <Metric title="2" body="互相揭晓" />
        </div>
      </Panel>
      <div className="grid gap-4">
        {history.map(([name, status, note]) => (
          <Panel key={name} className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-[var(--muted-ink)]">{status}</p>
              <p className="mt-3 text-[var(--soft-ink)]">{note}</p>
            </div>
            <button className="pill-secondary" onClick={onChat}>查看</button>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function SafetyCenter({ reported, blocked }: { reported: boolean; blocked: boolean }) {
  const rules = [
    ["18+ 成人限定", "注册与提示明确禁止未成年人使用，内容不面向未成年人交友。", ShieldCheck],
    ["隐私最小化", "只展示城市，不收集或公开精确定位、手机号、微信、住址。", LockKeyhole],
    ["敏感信息提醒", "聊天中出现联系方式关键词时给出提醒，降低冲动暴露隐私。", Bell],
    ["举报 / 拉黑", "用户可随时举报、拉黑，对话冻结并退出后续匹配。", Flag],
  ];
  return (
    <Panel className="p-6 sm:p-8">
      <p className="eyebrow">Safety center</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">安全中心</h2>
      <p className="mt-4 max-w-2xl text-[var(--soft-ink)]">
        Heartbox 的默认原则是先保护边界，再制造心动。这里把反骚扰、隐私和成年人限定作为产品底层约束，而不是事后说明。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {rules.map(([title, body, Icon]) => (
          <div key={title as string} className="rounded-3xl bg-white/55 p-5">
            <Icon className="h-6 w-6 text-[var(--berry)]" />
            <h3 className="mt-4 text-xl font-semibold">{title as string}</h3>
            <p className="mt-2 leading-7 text-[var(--soft-ink)]">{body as string}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-[var(--berry)]/15 bg-[var(--mist)]/35 p-5">
          <p className="font-semibold text-[var(--wine)]">当前演示状态</p>
          <p className="mt-2 text-[var(--soft-ink)]">举报：{reported ? "已提交" : "未触发"} · 拉黑：{blocked ? "已冻结" : "未触发"}</p>
        </div>
        <div className="rounded-3xl border border-[var(--wine)]/10 bg-white/55 p-5">
          <p className="font-semibold text-[var(--wine)]">隐私说明</p>
          <p className="mt-2 text-[var(--soft-ink)]">揭晓资料也必须双方同意，且不会显示外部联系方式。线下见面建议保持公共场所和可信联系人告知。</p>
        </div>
      </div>
    </Panel>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label>
      <span className="text-sm font-medium text-[var(--wine)]">{label}</span>
      <input className="mt-2 w-full rounded-2xl border border-[var(--wine)]/10 bg-white/65 px-4 py-3 outline-none focus:border-[var(--berry)]" defaultValue={value} />
    </label>
  );
}

function Area({ label, value }: { label: string; value: string }) {
  return (
    <label>
      <span className="text-sm font-medium text-[var(--wine)]">{label}</span>
      <textarea className="mt-2 min-h-28 w-full resize-none rounded-2xl border border-[var(--wine)]/10 bg-white/65 px-4 py-3 outline-none focus:border-[var(--berry)]" defaultValue={value} />
    </label>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("glass-panel", className)}>{children}</div>;
}
