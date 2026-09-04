'use client';

import { useMemo, useState } from 'react';
import type { ElementType, ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Ban,
  Bell,
  ChevronLeft,
  Copy,
  Feather,
  Flag,
  Heart,
  HeartHandshake,
  Headphones,
  House,
  LockKeyhole,
  MessageCircle,
  PackageOpen,
  PenLine,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from 'lucide-react';
import {
  type AppView,
  type BlindBox,
  type Conversation,
  type PersonalityFragment,
  type PostComment,
  type Relationship,
  type Topic,
  blindBoxes,
  conversations,
  currentUser,
  dailyPrompt,
  invite,
  personalityCards,
  personalityFragments,
  postComments,
  profiles,
  referralRewards,
  relationships,
  stageMeta,
  topics,
  wallet as initialWallet,
} from '@/lib/heartbox-data';

const navItems: { id: AppView; label: string; icon: ElementType }[] = [
  { id: 'discover', label: '发现', icon: House },
  { id: 'circle', label: '此刻', icon: Sparkles },
  { id: 'create', label: '＋', icon: Plus },
  { id: 'messages', label: '消息', icon: MessageCircle },
  { id: 'mine', label: '我的', icon: UserRound },
];

const stageOrder = [
  'stranger',
  'echo',
  'resonance',
  'closer',
  'reveal',
] as const;
type OnboardingStep = 'landing' | 'age' | 'prompt' | 'done';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [view, setView] = useState<AppView>('discover');
  const [onboardingStep, setOnboardingStep] =
    useState<OnboardingStep>('landing');
  const [selectedBoxId, setSelectedBoxId] = useState(blindBoxes[0].id);
  const [discoverDetailOpen, setDiscoverDetailOpen] = useState(false);
  const [openingState, setOpeningState] = useState<
    'sealed' | 'opening' | 'first' | 'second' | 'echo' | 'matched'
  >('sealed');
  const [freeOpens, setFreeOpens] = useState(
    initialWallet.dailyFreeOpensRemaining,
  );
  const [hearts, setHearts] = useState(initialWallet.hearts);
  const [showConversion, setShowConversion] = useState(false);
  const [likedFragments, setLikedFragments] = useState<string[]>([]);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id);
  const [topicMode, setTopicMode] = useState<'hot' | 'latest'>('hot');
  const [commentFragmentId, setCommentFragmentId] = useState<string | null>(
    null,
  );
  const [localComments, setLocalComments] =
    useState<PostComment[]>(postComments);
  const [commentDraft, setCommentDraft] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(
    null,
  );
  const [fragmentDraft, setFragmentDraft] = useState('');
  const [publishedFragments, setPublishedFragments] = useState<
    PersonalityFragment[]
  >([]);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState(conversations[0].messages);
  const [messageDraft, setMessageDraft] = useState('');
  const [revealRequested, setRevealRequested] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [reported, setReported] = useState(false);
  const [inviteStep, setInviteStep] = useState<
    'create' | 'card' | 'landing' | 'signup'
  >('create');

  const selectedBox =
    blindBoxes.find((box) => box.id === selectedBoxId) ?? blindBoxes[0];
  const selectedRelationship =
    relationships.find((item) => item.id === selectedRelationshipId) ??
    relationships[0];
  const allFragments = [...publishedFragments, ...personalityFragments];
  const selectedTopic =
    topics.find((topic) => topic.id === selectedTopicId) ?? topics[0];
  const activeComments = useMemo(() => {
    if (!commentFragmentId) return [];
    return localComments.filter(
      (comment) => comment.fragmentId === commentFragmentId,
    );
  }, [commentFragmentId, localComments]);
  const myCard =
    personalityCards.find((card) => card.userId === currentUser.id) ??
    personalityCards[0];
  const myProfile =
    profiles.find((profile) => profile.userId === currentUser.id) ??
    profiles[0];
  const conversation: Conversation =
    conversations.find(
      (item) => item.relationshipId === selectedRelationship.id,
    ) ?? conversations[0];

  const sensitive = useMemo(
    () => /(微信|vx|wechat|手机号|电话|\d{11})/i.test(messageDraft),
    [messageDraft],
  );

  const onboarded = onboardingStep === 'done';

  function resetDemo() {
    setView('discover');
    setOnboardingStep('landing');
    setSelectedBoxId(blindBoxes[0].id);
    setDiscoverDetailOpen(false);
    setOpeningState('sealed');
    setFreeOpens(initialWallet.dailyFreeOpensRemaining);
    setHearts(initialWallet.hearts);
    setShowConversion(false);
    setLikedFragments([]);
    setLikedComments([]);
    setSelectedTopicId(topics[0].id);
    setTopicMode('hot');
    setCommentFragmentId(null);
    setLocalComments(postComments);
    setCommentDraft('');
    setReplyingToCommentId(null);
    setFragmentDraft('');
    setPublishedFragments([]);
    setSelectedRelationshipId(null);
    setMessages(conversations[0].messages);
    setMessageDraft('');
    setRevealRequested(false);
    setBlocked(false);
    setReported(false);
    setInviteStep('create');
    window.requestAnimationFrame(() => {
      document
        .getElementById('heartbox-shell')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function switchView(next: AppView) {
    setView(next);
    window.requestAnimationFrame(() => {
      document
        .getElementById('heartbox-shell')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function beginOpening() {
    if (freeOpens < 1) {
      setShowConversion(true);
      return;
    }
    setDiscoverDetailOpen(true);
    setFreeOpens((value) => value - 1);
    setOpeningState('opening');
    window.setTimeout(() => setOpeningState('first'), 720);
  }

  function resetOpening(boxId?: string) {
    if (boxId) setSelectedBoxId(boxId);
    setDiscoverDetailOpen(false);
    setOpeningState('sealed');
  }

  function previewBox(boxId: string) {
    setSelectedBoxId(boxId);
    setDiscoverDetailOpen(true);
    setOpeningState('sealed');
  }

  function publishFragment() {
    if (!fragmentDraft.trim()) return;
    setPublishedFragments((current) => [
      {
        id: `fragment_new_${Date.now()}`,
        userId: currentUser.id,
        prompt: dailyPrompt.title,
        answer: fragmentDraft.trim(),
        mood: '刚刚发生',
        tags: [selectedTopic.name, '#深夜才会说的话'],
        likes: 0,
        comments: 0,
        createdAt: '刚刚',
        topicId: selectedTopicId,
      },
      ...current,
    ]);
    setFragmentDraft('');
    setView('circle');
  }

  function sendChatMessage() {
    if (!messageDraft.trim()) return;
    setMessages((current) => [
      ...current,
      {
        id: `msg_new_${Date.now()}`,
        sender: 'me',
        body: messageDraft.trim(),
        createdAt: '现在',
      },
    ]);
    setMessageDraft('');
  }

  return (
    <main
      id="heartbox-shell"
      className="min-h-screen bg-[var(--cream)] text-[var(--ink)]"
    >
      <div className="grain" />
      {!onboarded ? (
        <OnboardingFlow
          step={onboardingStep}
          fragmentDraft={fragmentDraft}
          onDraft={setFragmentDraft}
          onStep={setOnboardingStep}
          onFinish={() => {
            if (fragmentDraft.trim()) {
              publishFragment();
            }
            setFreeOpens(initialWallet.dailyFreeOpensLimit);
            setOnboardingStep('done');
            setView('discover');
          }}
        />
      ) : (
        <div className="app-frame">
          <DesktopSidebar
            view={view}
            onSwitch={switchView}
            onReset={resetDemo}
          />
          <section
            className={cx('main-stage', view === 'discover' && 'discover-stage')}
          >
            {view !== 'discover' && (
              <MobileTopbar freeOpens={freeOpens} hearts={hearts} />
            )}
            <TopStatus
              view={view}
              freeOpens={freeOpens}
              hearts={hearts}
              onOpenWallet={() => switchView('mine')}
            />
            <div className="view-stack">
              {view === 'discover' &&
                (discoverDetailOpen ? (
                  <DiscoverBoxDetail
                    box={selectedBox}
                    openingState={openingState}
                    onBack={() => resetOpening()}
                    onOpen={beginOpening}
                    onSecondLayer={() => setOpeningState('second')}
                    onEcho={() => setOpeningState('echo')}
                    onMatched={() => {
                      setOpeningState('matched');
                      setSelectedRelationshipId(relationships[0].id);
                    }}
                    onLater={() => resetOpening(blindBoxes[1]?.id)}
                    onPass={() => resetOpening(blindBoxes[2]?.id)}
                    onNeedMore={() => setShowConversion(true)}
                    onMessages={() => switchView('messages')}
                  />
                ) : (
                  <DiscoverView
                    box={selectedBox}
                    boxes={blindBoxes}
                    freeOpens={freeOpens}
                    onOpen={beginOpening}
                    onSelectBox={previewBox}
                  />
                ))}
              {view === 'circle' && (
                <CircleView
                  fragments={allFragments}
                  likedFragments={likedFragments}
                  likedComments={likedComments}
                  selectedTopic={selectedTopic}
                  topicMode={topicMode}
                  onLike={(id) =>
                    setLikedFragments((current) =>
                      current.includes(id)
                        ? current.filter((item) => item !== id)
                        : [...current, id],
                    )
                  }
                  onTopic={setSelectedTopicId}
                  onTopicMode={setTopicMode}
                  onComment={setCommentFragmentId}
                  onLikeComment={(id) =>
                    setLikedComments((current) =>
                      current.includes(id)
                        ? current.filter((item) => item !== id)
                        : [...current, id],
                    )
                  }
                  comments={localComments}
                  onExplore={() => switchView('discover')}
                  onCreate={() => switchView('create')}
                />
              )}
              {view === 'create' && (
                <CreateView
                  fragmentDraft={fragmentDraft}
                  inviteStep={inviteStep}
                  onDraft={setFragmentDraft}
                  onPublish={publishFragment}
                  onInviteStep={setInviteStep}
                  onCircle={() => switchView('circle')}
                />
              )}
              {view === 'messages' && (
                <MessagesView
                  relationships={relationships}
                  selectedRelationship={selectedRelationship}
                  detailOpen={selectedRelationshipId !== null}
                  messages={
                    selectedRelationship.id === conversations[0].relationshipId
                      ? messages
                      : conversation.messages
                  }
                  messageDraft={messageDraft}
                  sensitive={sensitive}
                  revealRequested={revealRequested}
                  blocked={blocked}
                  reported={reported}
                  onSelect={(id) => setSelectedRelationshipId(id)}
                  onDraft={setMessageDraft}
                  onSend={sendChatMessage}
                  onReveal={() => setRevealRequested(true)}
                  onBlock={() => setBlocked(true)}
                  onReport={() => setReported(true)}
                  onClose={() => setSelectedRelationshipId(null)}
                />
              )}
              {view === 'mine' && (
                <MineView
                  profile={myProfile}
                  card={myCard}
                  freeOpens={freeOpens}
                  hearts={hearts}
                  onConversion={() => setShowConversion(true)}
                  onInvite={() => {
                    setInviteStep('create');
                    switchView('create');
                  }}
                  onReset={resetDemo}
                />
              )}
            </div>
          </section>
          <ContextPanel
            view={view}
            freeOpens={freeOpens}
            hearts={hearts}
            selectedBox={selectedBox}
            relationship={selectedRelationship}
            onMine={() => switchView('mine')}
            onInvite={() => switchView('create')}
          />
        </div>
      )}
      {onboarded && <MobileNav view={view} onSwitch={switchView} />}
      {showConversion && (
        <ConversionModal
          hearts={hearts}
          onClose={() => setShowConversion(false)}
          onInvite={() => {
            setShowConversion(false);
            setInviteStep('create');
            switchView('create');
          }}
          onUseHeart={() => {
            if (hearts >= 8) {
              setHearts((value) => value - 8);
              setShowConversion(false);
              setDiscoverDetailOpen(true);
              setOpeningState('opening');
              window.setTimeout(() => setOpeningState('first'), 720);
            }
          }}
          onPlus={() => {
            setShowConversion(false);
            switchView('mine');
          }}
        />
      )}
      {commentFragmentId && (
        <CommentModal
          fragment={
            allFragments.find(
              (fragment) => fragment.id === commentFragmentId,
            ) ?? allFragments[0]
          }
          comments={activeComments}
          draft={commentDraft}
          replyingToCommentId={replyingToCommentId}
          likedComments={likedComments}
          onDraft={setCommentDraft}
          onReply={setReplyingToCommentId}
          onLikeComment={(id) =>
            setLikedComments((current) =>
              current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
            )
          }
          onSubmit={() => {
            if (!commentDraft.trim()) return;
            setLocalComments((current) => [
              ...current,
              {
                id: `comment_new_${Date.now()}`,
                fragmentId: commentFragmentId ?? allFragments[0].id,
                author: '我',
                body: replyingToCommentId
                  ? `回复 ${activeComments.find((item) => item.id === replyingToCommentId)?.author ?? 'TA'}：${commentDraft.trim()}`
                  : commentDraft.trim(),
                likes: 0,
                createdAt: '刚刚',
                replies: [],
              },
            ]);
            setCommentDraft('');
            setReplyingToCommentId(null);
          }}
          onClose={() => {
            setCommentFragmentId(null);
            setCommentDraft('');
            setReplyingToCommentId(null);
          }}
        />
      )}
    </main>
  );
}

function DesktopSidebar({
  view,
  onSwitch,
  onReset,
}: {
  view: AppView;
  onSwitch: (view: AppView) => void;
  onReset: () => void;
}) {
  return (
    <aside className="desktop-sidebar">
      <button className="brand-lockup" onClick={() => onSwitch('discover')}>
        <span className="brand-mark">S</span>
        <span>
          <span className="block text-sm font-medium">SELE</span>
          <span className="block text-xs text-[var(--muted-ink)]">
            Heartbox
          </span>
        </span>
      </button>
      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSwitch(item.id)}
              className={cx(
                'side-nav-item',
                view === item.id && 'side-nav-item-active',
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label === '＋' ? '发布 / 投递' : item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[24px] border border-[var(--berry)]/12 bg-[var(--mist)]/35 p-4">
        <p className="text-sm font-medium text-[var(--wine)]">18+ 安全边界</p>
        <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">
          匿名探索、双向揭晓、举报拉黑常驻。Heart+ 不能绕过同意。
        </p>
        <Link className="reset-demo-button mt-4" href="beta">
          <Sparkles className="h-4 w-4" />
          Private Beta
        </Link>
        <button className="reset-demo-button mt-4" onClick={onReset}>
          <RefreshCw className="h-4 w-4" />
          Reset Demo
        </button>
      </div>
    </aside>
  );
}

function OnboardingFlow({
  onFinish: _onFinish,
}: {
  step: OnboardingStep;
  fragmentDraft: string;
  onDraft: (value: string) => void;
  onStep: (step: OnboardingStep) => void;
  onFinish: () => void;
}) {
  return (
    <section className="onboarding-shell">
      <div className="onboarding-card">
        <div className="onboarding-pane onboarding-door-pane">
          <div className="onboarding-door-mark">SELE</div>
          <div className="onboarding-door-visual" aria-hidden="true">
            <span />
          </div>
          <div className="onboarding-door-copy">
            <h1>
              有些人，
              <br />
              适合晚一点看见。
            </h1>
            <p>
              先认识一点，
              <br />
              再决定要不要靠近。
            </p>
          </div>
          <button
            className="pill-primary onboarding-main-cta"
            type="button"
            onClick={_onFinish}
          >
            开始第一次体验 →
          </button>
          <button className="onboarding-text-link" type="button">
            了解 SELE
          </button>
        </div>
      </div>
    </section>
  );
}

function MobileTopbar({
  freeOpens,
  hearts,
}: {
  freeOpens: number;
  hearts: number;
}) {
  return (
    <header className="mobile-topbar">
      <div className="brand-lockup">
        <span className="brand-mark">S</span>
        <span>
          <span className="block text-sm font-medium">SELE</span>
          <span className="block text-[11px] text-[var(--muted-ink)]">
            Heartbox
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <StatusPill icon={PackageOpen} label={`${freeOpens}/3`} />
        <StatusPill icon={Heart} label={`${hearts}`} />
      </div>
    </header>
  );
}

function TopStatus({
  view,
  freeOpens,
  hearts,
  onOpenWallet,
}: {
  view: AppView;
  freeOpens: number;
  hearts: number;
  onOpenWallet: () => void;
}) {
  const titles: Record<AppView, string> = {
    discover: '发现',
    circle: '此刻',
    create: '发布 / 投递',
    messages: '消息',
    mine: '我的',
  };
  return (
    <div className={cx('top-status', view === 'discover' && 'discover-top')}>
      <div>
        {view === 'discover' ? (
          <>
            <h1 className="mt-1 text-xl font-medium sm:text-3xl">
              {titles[view]}
            </h1>
            <p className="discover-subtitle">有些人，适合晚一点看见。</p>
          </>
        ) : (
          <>
            <p className="eyebrow">SELE Beta</p>
            <h1 className="mt-1 text-xl font-medium sm:text-3xl">
              {titles[view]}
            </h1>
          </>
        )}
      </div>
      {view === 'discover' ? (
        <div className="discover-top-actions">
          <button aria-label="通知">
            <Bell className="h-5 w-5" />
            <span />
          </button>
          <button aria-label="搜索">
            <Search className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button className="wallet-strip" onClick={onOpenWallet}>
          <span>
            <PackageOpen className="h-4 w-4" /> 今日 {freeOpens}/3
          </span>
          <span>
            <Heart className="h-4 w-4" /> {hearts}
          </span>
        </button>
      )}
    </div>
  );
}

const happeningCards = [
  {
    label: '影像碎片征集',
    title: '拍下你没有说出口的那一刻。',
    body: '用影像，留下没说的话。',
    tone: 'soft-light',
  },
  {
    label: '城市盲盒计划',
    title: '一座城市，会替人保留秘密。',
    body: '参与城市主题盲盒。',
    tone: 'rain-light',
  },
];

const quickEntrances = [
  {
    title: '回答一个问题',
    body: '一个问题，开启一次相遇',
    icon: Feather,
  },
  {
    title: '听一段声音',
    body: '声音，也可以表达',
    icon: Headphones,
  },
  {
    title: '写下一件小事',
    body: '不必完整，只要真实',
    icon: PenLine,
  },
];

const possibleMoments = [
  {
    title: '在等一段风经过',
    meta: '25 岁 · 北京',
    quote: '最近在学着和自己相处。',
    count: 3,
    tone: 'window',
  },
  {
    title: '收集傍晚的人',
    meta: '27 岁 · 广州',
    quote: '喜欢能把日常过成诗的人。',
    count: 2,
    tone: 'dusk',
  },
];

function DiscoverView(props: {
  box: BlindBox;
  boxes: BlindBox[];
  freeOpens: number;
  onOpen: () => void;
  onSelectBox: (boxId: string) => void;
}) {
  return (
    <div className="discover-page">
      <section className="discover-hero-card">
        <div className="discover-hero-copy">
          <p className="discover-card-label">
            今日心动盲盒 <PackageOpen className="h-4 w-4" />
          </p>
          <h2>
            拆开一个人
            <br />
            留下的片刻
          </h2>
          <p>
            你不会知道是谁，
            <br />
            但可以先认识一点点。
          </p>
          <button className="discover-open-button" onClick={props.onOpen}>
            拆开一个
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="discover-box-visual" aria-hidden="true">
          <span />
        </div>
        <p className="discover-open-count">今日剩余 {props.freeOpens} 次</p>
      </section>

      <section className="discover-section">
        <div className="discover-section-head">
          <h2>正在发生</h2>
          <button>
            查看全部
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="happening-showcase">
          <article
            className={cx(
              'happening-card happening-card-featured',
              `happening-${happeningCards[0].tone}`,
            )}
          >
            <span>{happeningCards[0].label}</span>
            <h3>{happeningCards[0].title}</h3>
            <p>{happeningCards[0].body}</p>
            <button>
              查看详情
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
          <div className="happening-dots" aria-label="正在发生轮播进度">
            {happeningCards.map((card, index) => (
              <span
                key={card.label}
                className={index === 0 ? 'happening-dot-active' : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="discover-section">
        <div className="discover-section-head">
          <h2>先认识一点</h2>
          <button>
            换一批
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <div className="quick-entrance-grid">
          {quickEntrances.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.title} className="quick-entrance-card">
                <Icon className="h-7 w-7" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="discover-section">
        <div className="discover-section-head">
          <h2>可能遇见的人</h2>
          <button>
            查看全部
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="possible-moment-list">
          {possibleMoments.map((moment, index) => (
            <button
              key={moment.title}
              className="possible-moment-row"
              onClick={() =>
                props.onSelectBox(props.boxes[index]?.id ?? props.box.id)
              }
            >
              <span className={cx('moment-thumb', `moment-${moment.tone}`)} />
              <span className="moment-copy">
                <strong>{moment.title}</strong>
                <small>{moment.meta}</small>
                <em>“{moment.quote}”</em>
              </span>
              <span className="moment-count">片刻 {moment.count}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function DiscoverBoxDetail({
  box,
  openingState,
  onBack,
  onOpen,
  onSecondLayer,
  onEcho,
  onMatched,
  onLater,
  onPass,
  onNeedMore,
  onMessages,
}: {
  box: BlindBox;
  openingState: 'sealed' | 'opening' | 'first' | 'second' | 'echo' | 'matched';
  onBack: () => void;
  onOpen: () => void;
  onSecondLayer: () => void;
  onEcho: () => void;
  onMatched: () => void;
  onLater: () => void;
  onPass: () => void;
  onNeedMore: () => void;
  onMessages: () => void;
}) {
  return (
    <div className="box-detail-page">
      <button className="box-detail-back" onClick={onBack}>
        <ChevronLeft className="h-4 w-4" />
        返回发现
      </button>
      <div className="box-detail-heading">
        <p className="eyebrow">Heartbox detail</p>
        <h2>先看见一点，再决定要不要靠近。</h2>
      </div>
      <UnboxingSurface
        box={box}
        openingState={openingState}
        onOpen={onOpen}
        onSecondLayer={onSecondLayer}
        onEcho={onEcho}
        onMatched={onMatched}
        onLater={onLater}
        onPass={onPass}
        onNeedMore={onNeedMore}
        onMessages={onMessages}
      />
    </div>
  );
}

function UnboxingSurface({
  box,
  openingState,
  onOpen,
  onSecondLayer,
  onEcho,
  onMatched,
  onLater,
  onPass,
  onNeedMore,
  onMessages,
}: {
  box: BlindBox;
  openingState: 'sealed' | 'opening' | 'first' | 'second' | 'echo' | 'matched';
  onOpen: () => void;
  onSecondLayer: () => void;
  onEcho: () => void;
  onMatched: () => void;
  onLater: () => void;
  onPass: () => void;
  onNeedMore: () => void;
  onMessages: () => void;
}) {
  const opened = openingState !== 'sealed' && openingState !== 'opening';
  return (
    <Panel className="unbox-panel">
      <div className="unbox-stage">
        <div
          className={cx(
            'sealed-envelope',
            openingState === 'opening' && 'sealed-envelope-opening',
            opened && 'sealed-envelope-opened',
          )}
        >
          <div className="seal-line" />
          <div className="wax-seal">
            <Heart className="h-7 w-7" />
          </div>
          <div className="envelope-copy">
            <p className="text-sm text-[var(--muted-ink)]">
              未拆封 · {box.theme}
            </p>
            <h3>{box.title}</h3>
            <p>
              {box.cityHint} · {box.ageHint} ·{' '}
              {box.hiddenTags.slice(0, 1).join(' / ')}
            </p>
            <div className="sealed-hint">
              {box.seal} · 封条下藏着一段人格碎片
            </div>
          </div>
        </div>
        {opened && (
          <div className="revealed-persona">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">First layer</p>
                <h3 className="mt-2 text-xl font-medium">
                  {box.firstLayer.alias}
                </h3>
                <p className="mt-1 text-[var(--soft-ink)]">
                  {box.firstLayer.archetype}
                </p>
              </div>
              <span className="rounded-full bg-[var(--mist)]/45 px-3 py-1 text-sm font-medium text-[var(--berry)]">
                第一层
              </span>
            </div>
            <blockquote className="mt-4 rounded-[18px] bg-white/65 p-4 text-base leading-7">
              “{box.firstLayer.fragment}”
            </blockquote>
            <div className="state-strip waiting-state mt-4">
              <LockKeyhole className="h-4 w-4" />
              真实身份、联系方式和精确位置仍被保护。继续探索只会解锁更多人格片段。
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {box.firstLayer.interests.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            {(openingState === 'second' ||
              openingState === 'echo' ||
              openingState === 'matched') && (
              <div className="second-layer">
                <p>
                  <strong>关系观：</strong>
                  {box.secondLayer.relationshipView}
                </p>
                <p>
                  <strong>边界：</strong>
                  {box.secondLayer.boundary}
                </p>
                <p>
                  <strong>人格问答：</strong>
                  {box.secondLayer.promptAnswer}
                </p>
                <div className="fragment-ribbon">
                  {box.fragments.slice(1, 4).map((fragment) => (
                    <span key={fragment}>{fragment}</span>
                  ))}
                </div>
              </div>
            )}
            {(openingState === 'echo' || openingState === 'matched') && (
              <div className="echo-result">
                <HeartHandshake className="h-5 w-5" />
                <span>
                  {openingState === 'matched'
                    ? '你们留下了彼此的回声。现在不用急着揭晓，先从一句匿名对话开始。'
                    : '你的回声已留在盒子里。TA 不会看到你的真实身份，只会知道有人被这一段打动。'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="unbox-actions">
        {openingState === 'sealed' && (
          <>
            <button className="pill-primary" onClick={onOpen}>
              拆开信封
            </button>
            <button className="pill-secondary" onClick={onNeedMore}>
              次数用完怎么办
            </button>
          </>
        )}
        {openingState === 'opening' && (
          <button className="pill-secondary">封条正在打开...</button>
        )}
        {openingState === 'first' && (
          <>
            <button className="pill-primary" onClick={onSecondLayer}>
              再看一层
            </button>
            <button className="pill-secondary" onClick={onEcho}>
              留下回声
            </button>
            <button className="pill-secondary" onClick={onLater}>
              先放回盒子
            </button>
          </>
        )}
        {openingState === 'second' && (
          <>
            <button className="pill-primary" onClick={onEcho}>
              留下回声
            </button>
            <button className="pill-secondary" onClick={onPass}>
              暂不继续，保护边界
            </button>
          </>
        )}
        {openingState === 'echo' && (
          <>
            <button className="pill-primary" onClick={onMatched}>
              模拟 TA 也回应
            </button>
            <button className="pill-secondary" onClick={onLater}>
              继续等回应
            </button>
          </>
        )}
        {openingState === 'matched' && (
          <>
            <button className="pill-primary" onClick={onMessages}>
              去匿名对话
            </button>
            <button className="pill-secondary" onClick={onLater}>
              再拆一个
            </button>
          </>
        )}
      </div>
    </Panel>
  );
}

function CircleView({
  fragments,
  likedFragments,
  likedComments,
  selectedTopic,
  topicMode,
  comments,
  onLike,
  onTopic,
  onTopicMode,
  onComment,
  onLikeComment,
  onExplore,
  onCreate,
}: {
  fragments: PersonalityFragment[];
  likedFragments: string[];
  likedComments: string[];
  selectedTopic: Topic;
  topicMode: 'hot' | 'latest';
  comments: PostComment[];
  onLike: (id: string) => void;
  onTopic: (id: string) => void;
  onTopicMode: (mode: 'hot' | 'latest') => void;
  onComment: (id: string) => void;
  onLikeComment: (id: string) => void;
  onExplore: () => void;
  onCreate: () => void;
}) {
  const topicPosts = fragments.filter(
    (fragment) => fragment.topicId === selectedTopic.id,
  );
  const visiblePosts =
    topicMode === 'hot'
      ? [...topicPosts].sort(
          (a, b) => b.likes + b.comments - (a.likes + a.comments),
        )
      : topicPosts;

  return (
    <div className="circle-layout">
      <section className="circle-topic-panel">
        <Panel className="h-fit p-5 sm:p-6">
          <p className="eyebrow">此刻</p>
          <h2 className="mt-3 text-xl font-medium leading-tight">
            看看大家此刻在想什么
          </h2>
          <p className="mt-3 text-sm text-[var(--soft-ink)]">
            读一句具体的生活片刻，再决定要不要回应。
          </p>
          <button className="pill-primary mt-5 w-full" onClick={onCreate}>
            发布 Post
          </button>
        </Panel>

        <Panel className="mt-4 p-5">
          <p className="eyebrow">Topics</p>
          <div className="topic-list">
            {topics.map((topic) => (
              <button
                key={topic.id}
                className={cx(
                  'topic-pill',
                  selectedTopic.id === topic.id && 'topic-pill-active',
                )}
                onClick={() => onTopic(topic.id)}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </Panel>
      </section>

      <section className="space-y-4">
        <Panel className="topic-detail-panel">
          <div>
            <p className="eyebrow">Topic detail</p>
            <h2>{selectedTopic.name}</h2>
            <p>{selectedTopic.description}</p>
          </div>
          <div className="topic-detail-meta">
            <span>{selectedTopic.participants} 人参与</span>
            <div>
              <button
                className={cx(topicMode === 'hot' && 'topic-mode-active')}
                onClick={() => onTopicMode('hot')}
              >
                热门
              </button>
              <button
                className={cx(topicMode === 'latest' && 'topic-mode-active')}
                onClick={() => onTopicMode('latest')}
              >
                最新
              </button>
            </div>
          </div>
        </Panel>
        <div className="daily-prompt-strip">
          <span>今日问题</span>
          <strong>{dailyPrompt.title}</strong>
        </div>
        {visiblePosts.length === 0 ? (
          <EmptyState
            title="这个话题还没有 Post"
            body="换个话题看看，或者写下第一段真实想法。"
            action="发布 Post"
            onAction={onCreate}
          />
        ) : (
          visiblePosts.map((fragment) => (
            <FragmentCard
              key={fragment.id}
              fragment={fragment}
              liked={likedFragments.includes(fragment.id)}
              likedComments={likedComments}
              comments={comments}
              onLike={() => onLike(fragment.id)}
              onComment={() => onComment(fragment.id)}
              onLikeComment={onLikeComment}
              onTopic={onTopic}
              onExplore={onExplore}
            />
          ))
        )}
      </section>
    </div>
  );
}

function FragmentCard({
  fragment,
  liked,
  likedComments,
  comments,
  onLike,
  onComment,
  onLikeComment,
  onTopic,
  onExplore,
}: {
  fragment: PersonalityFragment;
  liked: boolean;
  likedComments: string[];
  comments: PostComment[];
  onLike: () => void;
  onComment: () => void;
  onLikeComment: (id: string) => void;
  onTopic: (id: string) => void;
  onExplore: () => void;
}) {
  const fragmentComments = comments.filter(
    (comment) => comment.fragmentId === fragment.id,
  );
  const author =
    profiles.find((profile) => profile.userId === fragment.userId)
      ?.displayName ?? '测试用户';
  const commentCount = Math.max(fragment.comments, fragmentComments.length);

  return (
    <Panel className="post-card p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="post-meta">
            Post · {author} · {fragment.createdAt}
          </p>
          <p className="post-prompt">{fragment.prompt}</p>
          <p className="post-body">“{fragment.answer}”</p>
        </div>
        <span className="post-mood">{fragment.mood}</span>
      </div>
      <div className="post-topics">
        {fragment.tags.map((tag) => (
          <button
            className="topic-link"
            key={tag}
            onClick={() => {
              const topic = topics.find((item) => item.name === tag);
              if (topic) onTopic(topic.id);
            }}
          >
            {tag}
          </button>
        ))}
      </div>
      {fragmentComments[0] && (
        <div className="comment-preview">
          <button
            className={cx(
              'comment-like-mini',
              likedComments.includes(fragmentComments[0].id) &&
                'comment-like-active',
            )}
            onClick={() => onLikeComment(fragmentComments[0].id)}
          >
            ♡{' '}
            {likedComments.includes(fragmentComments[0].id)
              ? fragmentComments[0].likes + 1
              : fragmentComments[0].likes}
          </button>
          <span>
            {fragmentComments[0].author}：{fragmentComments[0].body}
          </span>
        </div>
      )}
      <div className="post-actions">
        <button
          className={cx('soft-command', liked && 'soft-command-active')}
          onClick={onLike}
        >
          <Heart className="h-4 w-4" />
          {liked ? fragment.likes + 1 : fragment.likes} Like
        </button>
        <button className="soft-command" onClick={onComment}>
          <MessageCircle className="h-4 w-4" />
          {commentCount} Comment
        </button>
        <button className="soft-command">
          查看 TA
          <UserRound className="h-4 w-4" />
        </button>
        <button className="soft-command" onClick={onExplore}>
          从碎片探索 TA
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Panel>
  );
}

function CreateView({
  fragmentDraft,
  inviteStep,
  onDraft,
  onPublish,
  onInviteStep,
  onCircle,
}: {
  fragmentDraft: string;
  inviteStep: 'create' | 'card' | 'landing' | 'signup';
  onDraft: (value: string) => void;
  onPublish: () => void;
  onInviteStep: (step: 'create' | 'card' | 'landing' | 'signup') => void;
  onCircle: () => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Panel className="p-5 sm:p-7">
        <p className="eyebrow">Personality fragment</p>
        <h2 className="mt-2 text-xl font-medium">写下今日人格碎片</h2>
        <p className="mt-3 text-[var(--soft-ink)]">{dailyPrompt.title}</p>
        <textarea
          className="mt-5 min-h-44 w-full resize-none rounded-[24px] border border-[var(--wine)]/10 bg-white/70 p-5 text-base leading-7 outline-none focus:border-[var(--berry)]"
          value={fragmentDraft}
          onChange={(event) => onDraft(event.target.value)}
          placeholder="不用像简介，也不用讨好谁。写一个真实片刻就好。"
        />
        {!fragmentDraft.trim() && (
          <div className="state-strip disabled-state mt-4">
            <ShieldAlert className="h-4 w-4" />
            先写下一段真实片刻，才能生成人格碎片。
          </div>
        )}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            className="pill-primary"
            disabled={!fragmentDraft.trim()}
            onClick={onPublish}
          >
            生成人格碎片
          </button>
          <button className="pill-secondary" onClick={onCircle}>
            去此刻看看
          </button>
        </div>
      </Panel>
      <Panel className="p-5 sm:p-6">
        <p className="eyebrow">Leave a box</p>
        <h2 className="mt-2 text-xl font-medium">给朋友留一个盲盒</h2>
        <InviteFlow step={inviteStep} onStep={onInviteStep} />
      </Panel>
    </div>
  );
}

function InviteFlow({
  step,
  onStep,
}: {
  step: 'create' | 'card' | 'landing' | 'signup';
  onStep: (step: 'create' | 'card' | 'landing' | 'signup') => void;
}) {
  const steps = [
    { id: 'create', label: '创建' },
    { id: 'card', label: '分享卡' },
    { id: 'landing', label: '落地页' },
    { id: 'signup', label: '人格卡' },
  ] as const;
  return (
    <div className="mt-5">
      <div className="invite-steps">
        {steps.map((item, index) => (
          <button
            key={item.id}
            className={cx(
              'invite-step',
              step === item.id && 'invite-step-active',
            )}
            onClick={() => onStep(item.id)}
          >
            {index + 1}. {item.label}
          </button>
        ))}
      </div>
      <div className="invite-card-preview">
        {step === 'create' && (
          <>
            <p className="eyebrow">Prompt</p>
            <h3>我猜你适合拆一个「慢热关系」盲盒。</h3>
            <p>给朋友留一句话，让分享不是拉人头，而是一次有趣的关系暗号。</p>
            <div className="share-card-seal">Only for you</div>
            <button
              className="pill-primary mt-5"
              onClick={() => onStep('card')}
            >
              生成分享卡
            </button>
          </>
        )}
        {step === 'card' && (
          <>
            <div className="share-card-seal">Heartbox sealed</div>
            <p className="text-sm text-white/70">{invite.shareTitle}</p>
            <h3>{invite.shareMessage}</h3>
            <div className="mt-5 rounded-[22px] border border-white/20 bg-white/12 p-4 text-sm text-white/82">
              <p>这不是注册链接，是一只给你留着的盲盒。</p>
              <p className="mt-2 font-medium text-white">
                邀请码：{invite.code}
              </p>
            </div>
            <button
              className="pill-primary mt-5"
              onClick={() => onStep('landing')}
            >
              <Copy className="h-4 w-4" />
              模拟朋友打开
            </button>
          </>
        )}
        {step === 'landing' && (
          <>
            <p className="eyebrow">WeChat ready</p>
            <h3>有人觉得这里有一个你会想认识的人</h3>
            <p>
              微信内置浏览器下展示保存图片、复制链接和浏览器打开提示；如果当前环境不支持唤起分享，就保留截图转发和复制链接。
            </p>
            <div className="state-strip waiting-state mt-4">
              <RefreshCw className="h-4 w-4" />
              邀请奖励将在对方完成人格卡并通过基础风控后发放。
            </div>
            <button
              className="pill-primary mt-5"
              onClick={() => onStep('signup')}
            >
              进入 Heartbox
            </button>
          </>
        )}
        {step === 'signup' && (
          <>
            <p className="eyebrow">New user</p>
            <h3>先回答一个人格 Prompt</h3>
            <p>
              完成 18+
              确认、基础人格卡和第一张人格碎片后，双方奖励进入待发放状态。
            </p>
            <button
              className="pill-secondary mt-5"
              onClick={() => onStep('create')}
            >
              再留一个盲盒
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function MessagesView({
  relationships,
  selectedRelationship,
  detailOpen,
  messages,
  messageDraft,
  sensitive,
  revealRequested,
  blocked,
  reported,
  onSelect,
  onDraft,
  onSend,
  onReveal,
  onBlock,
  onReport,
  onClose,
}: {
  relationships: Relationship[];
  selectedRelationship: Relationship;
  detailOpen: boolean;
  messages: Conversation['messages'];
  messageDraft: string;
  sensitive: boolean;
  revealRequested: boolean;
  blocked: boolean;
  reported: boolean;
  onSelect: (id: string) => void;
  onDraft: (value: string) => void;
  onSend: () => void;
  onReveal: () => void;
  onBlock: () => void;
  onReport: () => void;
  onClose: () => void;
}) {
  const messageEntrances = [
    { label: '匹配', value: relationships.length, icon: HeartHandshake },
    { label: '喜欢', value: 6, icon: Heart },
    { label: '评论', value: postComments.length, icon: MessageCircle },
    { label: '通知', value: 2, icon: ShieldCheck },
  ];

  if (!detailOpen) {
    return (
      <div className="message-home">
        <div className="message-entry-grid">
          {messageEntrances.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className="message-entry-card">
                <span>
                  <Icon className="h-5 w-5" />
                </span>
                <strong>{item.label}</strong>
                <small>{item.value}</small>
              </button>
            );
          })}
        </div>
        <Panel className="message-home-list p-3">
          {relationships.length === 0 ? (
            <EmptyState
              title="还没有会话"
              body="当你们留下彼此的回声，这里会出现一段新的匿名关系。"
              action="去发现盲盒"
              onAction={() => onSelect(selectedRelationship.id)}
            />
          ) : (
            relationships.map((relationship, index) => {
              const convo = conversations.find(
                (item) => item.relationshipId === relationship.id,
              );
              const lastMessage = convo?.messages.at(-1);
              return (
                <button
                  key={relationship.id}
                  className="message-thread-row"
                  onClick={() => onSelect(relationship.id)}
                >
                  <span className="thread-avatar">
                    <HeartHandshake className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="thread-title">
                      <strong>{relationship.alias}</strong>
                      <small>{stageMeta[relationship.stage].label}</small>
                    </span>
                    <span className="thread-preview">
                      {lastMessage?.body ?? relationship.nextUnlock}
                    </span>
                  </span>
                  <span className="thread-meta">
                    <small>{lastMessage?.createdAt ?? (index ? '昨天' : '刚刚')}</small>
                    {!!convo?.unread && <em>{convo.unread}</em>}
                  </span>
                </button>
              );
            })
          )}
        </Panel>
      </div>
    );
  }

  return (
    <div className="messages-grid">
      <Panel className="relationship-list p-3">
        {relationships.length === 0 ? (
          <EmptyState
            title="还没有匿名关系"
            body="拆开盲盒并收到双向回声后，这里会出现第一段关系 Journey。"
            action="去发现盲盒"
            onAction={() => onSelect(selectedRelationship.id)}
          />
        ) : (
          relationships.map((relationship) => (
            <button
              key={relationship.id}
              className={cx(
                'relationship-row',
                relationship.id === selectedRelationship.id &&
                  'relationship-row-active',
              )}
              onClick={() => onSelect(relationship.id)}
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--wine)] text-white">
                <HeartHandshake className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-left">
                <span className="block truncate font-medium">
                  {relationship.alias}
                </span>
                <span className="block truncate text-sm text-[var(--muted-ink)]">
                  {stageMeta[relationship.stage].label} · 有新的片段
                </span>
              </span>
            </button>
          ))
        )}
      </Panel>
      <Panel className="chat-panel">
        <div className="chat-header">
          <button className="mobile-back" onClick={onClose}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="eyebrow">Anonymous relationship</p>
            <h2 className="text-lg font-medium">
              {selectedRelationship.alias}
            </h2>
          </div>
          <span className="rounded-full bg-[var(--mist)]/45 px-3 py-1 text-sm text-[var(--berry)]">
            {stageMeta[selectedRelationship.stage].label}
          </span>
        </div>
        <div className="chat-body">
          {messages.length === 0 ? (
            <div className="no-message-state">
              <MessageCircle className="h-7 w-7" />
              <h3>还没有消息</h3>
              <p>
                先发一句轻一点的话。真实身份会继续被保护，直到双方都想靠近。
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cx(
                  'chat-line',
                  message.sender === 'me' && 'chat-line-me',
                  message.sender === 'system' && 'chat-line-system',
                )}
              >
                <div className="chat-bubble">{message.body}</div>
              </div>
            ))
          )}
          {revealRequested && (
            <div className="journey-notice">
              你已发送“我想认识真实的你”。只有对方也同意，才会进入揭晓。
            </div>
          )}
          {blocked && (
            <div className="journey-notice">
              关系已拉黑，后续不会再互相推荐。
            </div>
          )}
          {reported && (
            <div className="journey-notice">
              举报已提交，相关对话会进入安全复核。
            </div>
          )}
        </div>
        <div className="chat-input-area">
          {sensitive && (
            <div className="safety-warning">
              <ShieldAlert className="h-4 w-4" />
              检测到可能的联系方式。揭晓前建议不要交换微信、手机号或精确地址。
            </div>
          )}
          <div className="chat-composer">
            <input
              value={messageDraft}
              onChange={(event) => onDraft(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && onSend()}
              placeholder="继续匿名聊天..."
            />
            <button onClick={onSend} aria-label="发送消息">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Panel>
      <JourneyPanel
        relationship={selectedRelationship}
        revealRequested={revealRequested}
        onReveal={onReveal}
        onReport={onReport}
        onBlock={onBlock}
      />
    </div>
  );
}

function JourneyPanel({
  relationship,
  revealRequested,
  onReveal,
  onReport,
  onBlock,
}: {
  relationship: Relationship;
  revealRequested: boolean;
  onReveal: () => void;
  onReport: () => void;
  onBlock: () => void;
}) {
  return (
    <Panel className="journey-panel p-5">
      <p className="eyebrow">Relationship journey</p>
      <div className="current-stage-card">
        <span>现在是</span>
        <strong>{stageMeta[relationship.stage].label}</strong>
        <p>{stageMeta[relationship.stage].tone}</p>
      </div>
      <div className="mt-4 space-y-3">
        {stageOrder.map((stage) => (
          <div
            key={stage}
            className={cx(
              'journey-step',
              relationship.stage === stage && 'journey-step-active',
            )}
          >
            <span className="journey-dot" />
            <span>
              <span className="block font-medium">
                {stageMeta[stage].label}
              </span>
              <span className="text-sm text-[var(--muted-ink)]">
                {stageMeta[stage].unlock}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[22px] bg-white/55 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-[var(--wine)]">
            接下来可能发生
          </span>
          <span>慢慢来</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[var(--berry)]"
            style={{ width: `${relationship.progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--soft-ink)]">
          {relationship.nextUnlock}
        </p>
      </div>
      <div className="protected-list">
        <p>
          <LockKeyhole className="h-4 w-4" />{' '}
          仍受保护：真实姓名、联系方式、精确位置
        </p>
        <p>
          <Sparkles className="h-4 w-4" /> 已解锁：
          {relationship.unlockedFragments.join('、')}
        </p>
      </div>
      <div className="mt-4 space-y-2">
        <button className="action-row" onClick={onReveal}>
          <LockKeyhole className="h-5 w-5" />
          {revealRequested ? '已请求揭晓' : '我想认识真实的你'}
        </button>
        <button className="action-row" onClick={onReport}>
          <Flag className="h-5 w-5" />
          举报
        </button>
        <button className="action-row" onClick={onBlock}>
          <Ban className="h-5 w-5" />
          拉黑 / 结束关系
        </button>
      </div>
    </Panel>
  );
}

function MineView({
  profile,
  card,
  freeOpens,
  hearts,
  onConversion,
  onInvite,
  onReset,
}: {
  profile: (typeof profiles)[number];
  card: (typeof personalityCards)[number];
  freeOpens: number;
  hearts: number;
  onConversion: () => void;
  onInvite: () => void;
  onReset: () => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
      <section className="space-y-5">
        <Panel className="p-5 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="eyebrow">Personality card</p>
              <h2 className="mt-2 text-lg font-medium">{card.alias}</h2>
              <p className="mt-2 text-[var(--soft-ink)]">
                {profile.ageRange} · {profile.city} · {card.archetype}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7">“{card.quote}”</p>
            </div>
            <div className="rounded-[24px] bg-white/55 p-4 text-center">
              <p className="text-lg font-medium text-[var(--wine)]">
                {card.completeness}%
              </p>
              <p className="text-sm text-[var(--muted-ink)]">人格卡完整度</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {[...card.interests, ...card.relationshipValues].map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </Panel>
      </section>
      <aside className="space-y-5">
        <Panel className="p-5">
          <p className="eyebrow">Opens</p>
          <h3 className="mt-2 text-lg font-medium">我的次数</h3>
          <div className="mt-4 grid gap-3">
            <MiniStat label="今日免费拆盒" value={`${freeOpens}/3`} />
            <MiniStat label="Heart" value={String(hearts)} />
            <MiniStat label="Heart+" value="未开通" />
          </div>
          <button className="pill-primary mt-5 w-full" onClick={onConversion}>
            查看继续探索方式
          </button>
        </Panel>
        <Panel className="p-5">
          <p className="eyebrow">Invite</p>
          <h3 className="mt-2 text-lg font-medium">我的邀请</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">
            3 位朋友打开，2 位完成人格卡，1 个奖励待领取。
          </p>
          <button className="pill-secondary mt-4 w-full" onClick={onInvite}>
            继续邀请
          </button>
          <div className="mt-4 space-y-2">
            {referralRewards.map((reward) => (
              <div key={reward.id} className="reward-row">
                <span>{reward.title}</span>
                <strong>
                  {reward.status === 'ready'
                    ? '可领取'
                    : reward.status === 'claimed'
                      ? '已领取'
                      : '待完成'}
                </strong>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <p className="eyebrow">Privacy</p>
          <h3 className="mt-2 text-lg font-medium">安全与隐私</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--soft-ink)]">
            <p>
              <ShieldCheck className="mr-2 inline h-4 w-4 text-[var(--berry)]" />
              18+ 成年人限定
            </p>
            <p>
              <LockKeyhole className="mr-2 inline h-4 w-4 text-[var(--berry)]" />
              揭晓必须双方同意
            </p>
            <p>
              <Flag className="mr-2 inline h-4 w-4 text-[var(--berry)]" />
              举报拉黑常驻可用
            </p>
          </div>
        </Panel>
        <Panel className="p-5">
          <p className="eyebrow">Reset</p>
          <h3 className="mt-2 text-lg font-medium">体验重置</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">
            测试入口会恢复 onboarding、免费次数、第一只盲盒、回声状态、关系
            Journey 和邀请流程。
          </p>
          <button className="pill-secondary mt-4 w-full" onClick={onReset}>
            <RefreshCw className="h-4 w-4" />
            Reset Demo / 重新体验
          </button>
        </Panel>
      </aside>
    </div>
  );
}

function ContextPanel({
  view,
  freeOpens,
  hearts,
  selectedBox,
  relationship,
  onMine,
  onInvite,
}: {
  view: AppView;
  freeOpens: number;
  hearts: number;
  selectedBox: BlindBox;
  relationship: Relationship;
  onMine: () => void;
  onInvite: () => void;
}) {
  return (
    <aside className="context-panel">
      <Panel className="p-5">
        <p className="eyebrow">Today</p>
        <div className="mt-4 grid gap-3">
          <MiniStat label="免费拆盒" value={`${freeOpens}/3`} />
          <MiniStat label="Heart" value={String(hearts)} />
        </div>
        <button className="pill-secondary mt-4 w-full" onClick={onMine}>
          管理权益
        </button>
      </Panel>
      {view === 'discover' && (
        <Panel className="p-5">
          <p className="eyebrow">Selected box</p>
          <h3 className="mt-2 text-lg font-medium">{selectedBox.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--soft-ink)]">
            {selectedBox.theme} · {selectedBox.cityHint} ·{' '}
            {selectedBox.echoScore}% 回声
          </p>
        </Panel>
      )}
      {view === 'messages' && (
        <Panel className="p-5">
          <p className="eyebrow">Journey</p>
          <h3 className="mt-2 text-lg font-medium">
            {stageMeta[relationship.stage].label}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--soft-ink)]">
            {stageMeta[relationship.stage].tone}
          </p>
        </Panel>
      )}
      <Panel className="p-5">
        <p className="eyebrow">Private beta</p>
        <h3 className="mt-2 text-lg font-medium">准备给真实用户测试</h3>
        <Link className="pill-secondary mt-4 w-full" href="beta">
          查看内测页
        </Link>
      </Panel>
      <Panel className="p-5">
        <p className="eyebrow">Invite</p>
        <h3 className="mt-2 text-lg font-medium">
          有人觉得这里有一个你会想认识的人
        </h3>
        <button className="pill-primary mt-4 w-full" onClick={onInvite}>
          留一个盲盒
        </button>
      </Panel>
    </aside>
  );
}

function MobileNav({
  view,
  onSwitch,
}: {
  view: AppView;
  onSwitch: (view: AppView) => void;
}) {
  return (
    <nav className="mobile-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={cx(
              item.id === 'create' && 'mobile-nav-create',
              view === item.id && 'mobile-nav-active',
            )}
            onClick={() => onSwitch(item.id)}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function CommentModal({
  fragment,
  comments,
  draft,
  replyingToCommentId,
  likedComments,
  onDraft,
  onReply,
  onLikeComment,
  onSubmit,
  onClose,
}: {
  fragment: PersonalityFragment;
  comments: PostComment[];
  draft: string;
  replyingToCommentId: string | null;
  likedComments: string[];
  onDraft: (value: string) => void;
  onReply: (id: string | null) => void;
  onLikeComment: (id: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}) {
  const author =
    profiles.find((profile) => profile.userId === fragment.userId)
      ?.displayName ?? '测试用户';
  const replyingTo = comments.find(
    (comment) => comment.id === replyingToCommentId,
  );

  return (
    <div className="modal-backdrop">
      <div className="comment-modal">
        <div className="comment-modal-header">
          <div>
            <p className="eyebrow">Comments</p>
            <h2>{author} 的 Post</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="comment-modal-post">
          <p>{fragment.answer}</p>
          <span>{fragment.tags.slice(0, 1).join('')}</span>
        </div>
        <div className="comment-list">
          {comments.length === 0 ? (
            <div className="comment-empty">
              <MessageCircle className="h-6 w-6" />
              <p>还没有评论。你可以留下一句轻一点的回应。</p>
            </div>
          ) : (
            comments.map((comment) => (
              <article className="comment-item" key={comment.id}>
                <div className="comment-item-main">
                  <strong>{comment.author}</strong>
                  <p>{comment.body}</p>
                  <div className="comment-item-actions">
                    <button
                      className={cx(
                        likedComments.includes(comment.id) &&
                          'comment-like-active',
                      )}
                      onClick={() => onLikeComment(comment.id)}
                    >
                      ♡{' '}
                      {likedComments.includes(comment.id)
                        ? comment.likes + 1
                        : comment.likes}
                    </button>
                    <button onClick={() => onReply(comment.id)}>回复</button>
                    <span>{comment.createdAt}</span>
                  </div>
                </div>
                {comment.replies.length > 0 && (
                  <div className="reply-list">
                    {comment.replies.map((reply) => (
                      <div className="reply-item" key={reply.id}>
                        <strong>{reply.author}</strong>
                        <span>{reply.body}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </div>
        <div className="comment-composer-area">
          {replyingTo && (
            <div className="replying-chip">
              回复 {replyingTo.author}
              <button onClick={() => onReply(null)}>取消</button>
            </div>
          )}
          <div className="comment-composer">
            <input
              value={draft}
              onChange={(event) => onDraft(event.target.value)}
              placeholder="写一句回应..."
            />
            <button
              onClick={onSubmit}
              disabled={!draft.trim()}
              aria-label="发表评论"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversionModal({
  hearts,
  onClose,
  onInvite,
  onUseHeart,
  onPlus,
}: {
  hearts: number;
  onClose: () => void;
  onInvite: () => void;
  onUseHeart: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="modal-backdrop">
      <div className="conversion-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <p className="eyebrow">More openings</p>
        <h2 className="mt-2 text-lg font-medium">今天的免费拆盒用完了</h2>
        <p className="mt-3 text-[var(--soft-ink)]">
          你可以明天自动恢复，也可以用 Heart、邀请朋友或了解 Heart+ 继续探索。
        </p>
        <div className="mt-5 grid gap-3">
          <button className="conversion-option" onClick={onClose}>
            <RefreshCw className="h-5 w-5" />
            <span>
              <strong>明天恢复</strong>
              <small>每日免费次数会自动回来</small>
            </span>
          </button>
          <button className="conversion-option" onClick={onInvite}>
            <UsersRound className="h-5 w-5" />
            <span>
              <strong>邀请朋友获得机会</strong>
              <small>给朋友留一个 Heartbox 盲盒</small>
            </span>
          </button>
          <button className="conversion-option" onClick={onUseHeart}>
            <Heart className="h-5 w-5" />
            <span>
              <strong>使用 Heart</strong>
              <small>当前余额 {hearts}，只作为额外探索机会</small>
            </span>
          </button>
          <button className="conversion-option" onClick={onPlus}>
            <Sparkles className="h-5 w-5" />
            <span>
              <strong>了解 Heart+</strong>
              <small>更多每日拆盒，但不能绕过双方同意</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="mini-stat">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function StatusPill({
  icon: Icon,
  label,
}: {
  icon: ElementType;
  label: string;
}) {
  return (
    <span className="status-pill">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function EmptyState({
  title,
  body,
  action,
  onAction,
}: {
  title: string;
  body: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <Panel className="grid min-h-[360px] place-items-center p-8 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-[24px] bg-[var(--wine)] text-white">
          <Sparkles className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-lg font-medium">{title}</h3>
        <p className="mt-3 max-w-md text-[var(--soft-ink)]">{body}</p>
        <button className="pill-primary mt-6" onClick={onAction}>
          {action}
        </button>
      </div>
    </Panel>
  );
}

function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx('glass-panel', className)}>{children}</div>;
}
