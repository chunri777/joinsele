'use client';

import { useMemo, useState } from 'react';
import type { ElementType, ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Ban,
  Bell,
  BellOff,
  ChevronLeft,
  Copy,
  Feather,
  Flag,
  Heart,
  HeartHandshake,
  House,
  Keyboard,
  LockKeyhole,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PackageOpen,
  PenLine,
  Pin,
  Play,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import {
  type AppView,
  type BlindBox,
  type PersonalityFragment,
  type PostComment,
  type Relationship,
  type Topic,
  type UserHomeProfile,
  blindBoxes,
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
  userHomeProfiles,
  wallet as initialWallet,
} from '@/lib/heartbox-data';
import {
  type DirectConversation,
  type DirectMessage,
  type MessageTab,
  type SystemNotification,
  initialConversations,
  initialSystemNotifications,
  messageUserProfiles,
} from '@/lib/message-data';

const navItems: { id: AppView; label: string; icon: ElementType }[] = [
  { id: 'discover', label: '发现', icon: House },
  { id: 'circle', label: '此刻', icon: Sparkles },
  { id: 'create', label: '＋', icon: Plus },
  { id: 'messages', label: '消息', icon: MessageCircle },
  { id: 'mine', label: '我的', icon: UserRound },
];

type OnboardingStep = 'landing' | 'age' | 'prompt' | 'done';
type DetailView = 'home' | 'secretBox' | 'userMoments';
type CircleMode = 'hot' | 'latest' | 'following';
type MessageScreen = 'list' | 'chat';
type MessageConfirmAction = 'block' | 'delete' | null;
type HeartboxStep =
  | 'detail'
  | 'echo'
  | 'success'
  | 'closer'
  | 'closer4'
  | 'closer5'
  | 'waiting'
  | 'newMoment';

type HeartboxMoment = {
  id: string;
  code: string;
  body: string;
  note: string;
  age: string;
  city: string;
  interestTags: string[];
  timeTag: string;
  moreMoments: string[];
  personalityQuestion: {
    prompt: string;
    answer: string;
  };
  lifestyleFragments: string[];
  currentUnlockLevel: number;
};

type HeartboxUnlock = {
  id: string;
  title: string;
  hint: string;
  content: string;
  icon: ElementType;
};

const appUserProfiles = [...userHomeProfiles, ...messageUserProfiles];

const heartboxMoments: HeartboxMoment[] = [
  {
    id: 'moment_0087',
    code: '#0087',
    body:
      '有时候我会在深夜\n突然很想和一个人说话，\n\n但打开对话框又删掉，\n反复几次，\n\n最后还是把那句话\n留在了备忘录里。',
    note: '不知道你有没有过类似的时刻。\n如果有，我想听听你的。',
    age: '23',
    city: '上海',
    interestTags: ['摄影', '散步', '旧电影'],
    timeTag: '深夜',
    moreMoments: [
      'TA 最近反复想起的一件事：那天没有说出口的道别。',
      'TA 最近一次突然开心：在便利店听见一首很久没听的歌。',
    ],
    personalityQuestion: {
      prompt: '更喜欢被理解，还是被陪着？',
      answer: '先被陪着，等到愿意说时再被理解。',
    },
    lifestyleFragments: ['常在深夜保持清醒', '周末偏爱一个人散步', '社交不多，但重视长谈'],
    currentUnlockLevel: 0,
  },
  {
    id: 'moment_0142',
    code: '#0142',
    body:
      '我喜欢傍晚快黑下来的那几分钟，\n路灯还没有完全亮，\n城市像是短暂地松了一口气。\n\n那时候很适合散步，\n也适合把一些话慢慢说出来。',
    note: '如果你也会被这种时间打动，\n也许我们可以从这里开始。',
    age: '27',
    city: '广州',
    interestTags: ['散步', '城市观察', '做饭'],
    timeTag: '傍晚',
    moreMoments: [
      'TA 最近反复想起的一件事：一场没有目的地的傍晚散步。',
      'TA 最近一次突然开心：做的第一锅汤刚好合口味。',
    ],
    personalityQuestion: {
      prompt: '发生矛盾时更习惯沉默，还是解释？',
      answer: '会先安静一会儿，但最后还是想认真解释。',
    },
    lifestyleFragments: ['作息偏早', '喜欢慢节奏的城市角落', '周末常去市场或公园'],
    currentUnlockLevel: 0,
  },
  {
    id: 'moment_0215',
    code: '#0215',
    body:
      '最近我在练习把日子过慢一点。\n\n认真吃一顿饭，\n看完一本书的最后几页，\n在下雨前把窗户打开。\n\n好像人只要慢下来，\n就会更容易听见自己。',
    note: '我想知道，\n你最近有没有听见自己的某一句话。',
    age: '25',
    city: '北京',
    interestTags: ['阅读', '雨天', '独处'],
    timeTag: '雨前',
    moreMoments: [
      'TA 最近反复想起的一件事：一本书里被折起的那一页。',
      'TA 最近一次突然开心：下雨前及时收回了晾着的衣服。',
    ],
    personalityQuestion: {
      prompt: '最怕别人误解自己什么？',
      answer: '沉默不是冷淡，只是需要一点时间整理感受。',
    },
    lifestyleFragments: ['习惯早起阅读', '周末更愿意待在家里', '喜欢低频但稳定的联系'],
    currentUnlockLevel: 0,
  },
];

function getMomentUnlocks(moment: HeartboxMoment): HeartboxUnlock[] {
  return [
    {
      id: 'more',
      title: '更多文字片刻',
      hint: `TA 还留下了 ${moment.moreMoments.length} 段片刻`,
      content: moment.moreMoments[0],
      icon: Copy,
    },
    {
      id: 'tags',
      title: '兴趣标签',
      hint: '解锁更多兴趣与生活方式标签',
      content: moment.interestTags.join(' · '),
      icon: PenLine,
    },
    {
      id: 'personality',
      title: '轻人格问答',
      hint: '解锁 TA 对一个问题的回答',
      content: `${moment.personalityQuestion.prompt}\n${moment.personalityQuestion.answer}`,
      icon: MessageCircle,
    },
    {
      id: 'lifestyle',
      title: '生活方式碎片',
      hint: '解锁 TA 的日常节奏',
      content: moment.lifestyleFragments.join(' · '),
      icon: Feather,
    },
  ];
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function formatDuration(duration = 0) {
  const minutes = Math.floor(duration / 60);
  const seconds = String(duration % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function formatListTime(createdAt: string) {
  const date = new Date(createdAt);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return '昨天';
  return `${date.getMonth() + 1}.${String(date.getDate()).padStart(2, '0')}`;
}

function formatChatTime(createdAt: string) {
  return new Date(createdAt).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function shouldShowMessageTime(messages: DirectMessage[], index: number) {
  if (index === 0) return true;
  const currentTime = new Date(messages[index].createdAt).getTime();
  const previousTime = new Date(messages[index - 1].createdAt).getTime();
  return currentTime - previousTime > 30 * 60 * 1000;
}

export default function Home() {
  const [view, setView] = useState<AppView>('discover');
  const [onboardingStep, setOnboardingStep] =
    useState<OnboardingStep>('landing');
  const [selectedBoxId, setSelectedBoxId] = useState(blindBoxes[0].id);
  const [discoverDetailOpen, setDiscoverDetailOpen] = useState(false);
  const [heartboxStep, setHeartboxStep] = useState<HeartboxStep>('detail');
  const [selectedMomentIndex, setSelectedMomentIndex] = useState(0);
  const [echoDraft, setEchoDraft] = useState('');
  const [unlockedItemIds, setUnlockedItemIds] = useState<string[]>([]);
  const [freeOpens, setFreeOpens] = useState(
    initialWallet.dailyFreeOpensRemaining,
  );
  const [hearts, setHearts] = useState(initialWallet.hearts);
  const [showConversion, setShowConversion] = useState(false);
  const [likedFragments, setLikedFragments] = useState<string[]>([]);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id);
  const [topicMode, setTopicMode] = useState<CircleMode>('hot');
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
  const [conversationState, setConversationState] =
    useState<DirectConversation[]>(initialConversations);
  const [systemNotifications, setSystemNotifications] = useState<
    SystemNotification[]
  >(initialSystemNotifications);
  const [messageTab, setMessageTab] = useState<MessageTab>('all');
  const [messageScreen, setMessageScreen] = useState<MessageScreen>('list');
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [messageQuery, setMessageQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [messageDraft, setMessageDraft] = useState('');
  const [composerMode, setComposerMode] = useState<'text' | 'voice'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [messageConfirmAction, setMessageConfirmAction] =
    useState<MessageConfirmAction>(null);
  const [inviteStep, setInviteStep] = useState<
    'create' | 'card' | 'landing' | 'signup'
  >('create');
  const [detailView, setDetailView] = useState<DetailView | null>(null);
  const [selectedUserId, setSelectedUserId] = useState(userHomeProfiles[0].id);
  const [followedUserIds, setFollowedUserIds] = useState<string[]>(
    appUserProfiles
      .filter((profile) => profile.isFollowing)
      .map((profile) => profile.id),
  );

  const selectedBox =
    blindBoxes.find((box) => box.id === selectedBoxId) ?? blindBoxes[0];
  const selectedMoment =
    heartboxMoments[selectedMomentIndex % heartboxMoments.length];
  const selectedRelationship = relationships[0];
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
  const selectedUser =
    appUserProfiles.find((profile) => profile.id === selectedUserId) ??
    appUserProfiles[0];
  const selectedUserMoments = allFragments.filter(
    (fragment) => fragment.userId === selectedUser.id,
  );
  const activeConversation = conversationState.find(
    (item) => item.id === activeConversationId,
  );
  const orderedConversations = useMemo(
    () =>
      [...conversationState].sort((left, right) => {
        if (left.isPinned !== right.isPinned) return left.isPinned ? -1 : 1;
        return (
          new Date(right.lastMessageAt).getTime() -
          new Date(left.lastMessageAt).getTime()
        );
      }),
    [conversationState],
  );

  const onboarded = onboardingStep === 'done';

  function resetDemo() {
    setView('discover');
    setOnboardingStep('landing');
    setSelectedBoxId(blindBoxes[0].id);
    setDiscoverDetailOpen(false);
    setHeartboxStep('detail');
    setSelectedMomentIndex(0);
    setEchoDraft('');
    setUnlockedItemIds([]);
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
    setConversationState(initialConversations);
    setSystemNotifications(initialSystemNotifications);
    setMessageTab('all');
    setMessageScreen('list');
    setActiveConversationId(null);
    setMessageQuery('');
    setSearchOpen(false);
    setMessageDraft('');
    setComposerMode('text');
    setIsRecording(false);
    setPlayingMessageId(null);
    setChatMenuOpen(false);
    setMessageConfirmAction(null);
    setInviteStep('create');
    window.requestAnimationFrame(() => {
      document
        .getElementById('heartbox-shell')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function switchView(next: AppView) {
    setDetailView(null);
    if (next === 'messages') {
      setMessageScreen('list');
      setActiveConversationId(null);
      setChatMenuOpen(false);
    }
    setView(next);
    window.requestAnimationFrame(() => {
      document
        .getElementById('heartbox-shell')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function openUserProfile(userId: string) {
    setSelectedUserId(userId);
    setDetailView('home');
    window.requestAnimationFrame(() => {
      document
        .getElementById('heartbox-shell')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function closeDetailView() {
    setDetailView(null);
    window.requestAnimationFrame(() => {
      document
        .getElementById('heartbox-shell')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function toggleFollow(userId: string) {
    setFollowedUserIds((current) =>
      current.includes(userId)
        ? current.filter((item) => item !== userId)
        : [...current, userId],
    );
  }

  function beginOpening() {
    if (freeOpens < 1) {
      setShowConversion(true);
      return;
    }
    setDiscoverDetailOpen(true);
    setFreeOpens((value) => value - 1);
    setHeartboxStep('detail');
    setEchoDraft('');
    setUnlockedItemIds([]);
  }

  function resetOpening(boxId?: string) {
    if (boxId) setSelectedBoxId(boxId);
    setDiscoverDetailOpen(false);
    setHeartboxStep('detail');
    setEchoDraft('');
    setUnlockedItemIds([]);
  }

  function previewBox(boxId: string) {
    setSelectedBoxId(boxId);
    setDiscoverDetailOpen(true);
    setHeartboxStep('detail');
    setEchoDraft('');
    setUnlockedItemIds([]);
  }

  function putMomentBack(nextIndex?: number) {
    setSelectedMomentIndex(
      nextIndex ?? (selectedMomentIndex + 1) % heartboxMoments.length,
    );
    setHeartboxStep('newMoment');
    setEchoDraft('');
    setUnlockedItemIds([]);
  }

  function unlockMore() {
    const nextUnlock = getMomentUnlocks(selectedMoment).find(
      (item, index) =>
        index >= selectedMoment.currentUnlockLevel &&
        !unlockedItemIds.includes(item.id),
    );
    if (!nextUnlock) return;
    setUnlockedItemIds((current) => [...current, nextUnlock.id]);
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

  function openConversation(id: string) {
    setConversationState((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unreadCount: 0 } : item,
      ),
    );
    setActiveConversationId(id);
    setMessageScreen('chat');
    setMessageDraft('');
    setComposerMode('text');
    setChatMenuOpen(false);
    setMessageConfirmAction(null);
  }

  function closeConversation() {
    setMessageScreen('list');
    setActiveConversationId(null);
    setMessageDraft('');
    setIsRecording(false);
    setPlayingMessageId(null);
    setChatMenuOpen(false);
    setMessageConfirmAction(null);
  }

  function updateConversation(
    id: string,
    update: (conversation: DirectConversation) => DirectConversation,
  ) {
    setConversationState((current) =>
      current.map((item) => (item.id === id ? update(item) : item)),
    );
  }

  function sendDirectMessage() {
    const content = messageDraft.trim();
    if (!content || !activeConversation || activeConversation.isBlocked) return;
    const latestConversationTime = Math.max(
      Date.now(),
      ...conversationState.map((item) => new Date(item.lastMessageAt).getTime()),
    );
    const createdAt = new Date(latestConversationTime + 60_000).toISOString();
    const message: DirectMessage = {
      id: `direct_${Date.now()}`,
      sender: 'me',
      type: 'text',
      content,
      createdAt,
    };
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      messages: [...current.messages, message],
      lastMessage: content,
      lastMessageAt: createdAt,
      unreadCount: 0,
    }));
    setMessageDraft('');
  }

  function sendMockVoiceMessage() {
    if (!activeConversation || activeConversation.isBlocked) return;
    const latestConversationTime = Math.max(
      Date.now(),
      ...conversationState.map((item) => new Date(item.lastMessageAt).getTime()),
    );
    const createdAt = new Date(latestConversationTime + 60_000).toISOString();
    const duration = 24;
    const message: DirectMessage = {
      id: `voice_${Date.now()}`,
      sender: 'me',
      type: 'voice',
      content: '语音消息',
      duration,
      createdAt,
    };
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      messages: [...current.messages, message],
      lastMessage: `[语音] ${formatDuration(duration)}`,
      lastMessageAt: createdAt,
      unreadCount: 0,
    }));
  }

  function selectMessageTab(tab: MessageTab) {
    setMessageTab(tab);
    if (tab === 'system') {
      setSystemNotifications((current) =>
        current.map((item) => ({ ...item, isRead: true })),
      );
    }
  }

  function toggleConversationPin() {
    if (!activeConversation) return;
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      isPinned: !current.isPinned,
    }));
  }

  function toggleConversationMute() {
    if (!activeConversation) return;
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      isMuted: !current.isMuted,
    }));
  }

  function clearConversation() {
    if (!activeConversation) return;
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      messages: [],
      lastMessage: '',
      unreadCount: 0,
    }));
    setPlayingMessageId(null);
    setChatMenuOpen(false);
  }

  function confirmMessageAction() {
    if (!activeConversation || !messageConfirmAction) return;
    if (messageConfirmAction === 'block') {
      updateConversation(activeConversation.id, (current) => ({
        ...current,
        isBlocked: true,
        unreadCount: 0,
      }));
      setMessageConfirmAction(null);
      setChatMenuOpen(false);
      return;
    }
    setConversationState((current) =>
      current.filter((item) => item.id !== activeConversation.id),
    );
    closeConversation();
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
        <div
          className={cx(
            'app-frame',
            view === 'messages' && 'messages-app-frame',
            view === 'messages' &&
              messageScreen === 'chat' &&
              'message-chat-open',
          )}
        >
          <DesktopSidebar
            view={view}
            onSwitch={switchView}
            onReset={resetDemo}
          />
          <section
            className={cx(
              'main-stage',
              view === 'discover' && 'discover-stage',
              view === 'discover' &&
                discoverDetailOpen &&
                'heartbox-detail-stage',
              view === 'messages' && 'messages-stage',
            )}
          >
            {!detailView && view !== 'discover' && view !== 'messages' && (
              <MobileTopbar freeOpens={freeOpens} hearts={hearts} />
            )}
            {!detailView &&
              view !== 'messages' &&
              !(view === 'discover' && discoverDetailOpen) && (
                <TopStatus
                  view={view}
                  freeOpens={freeOpens}
                  hearts={hearts}
                  onOpenWallet={() => switchView('mine')}
                />
              )}
            <div className="view-stack">
              {detailView === 'home' && (
                <UserProfileView
                  profile={selectedUser}
                  moments={selectedUserMoments}
                  followed={followedUserIds.includes(selectedUser.id)}
                  likedFragments={likedFragments}
                  likedComments={likedComments}
                  comments={localComments}
                  onBack={closeDetailView}
                  onFollow={() => toggleFollow(selectedUser.id)}
                  onSecretBox={() => setDetailView('secretBox')}
                  onAllMoments={() => setDetailView('userMoments')}
                  onLike={(id) =>
                    setLikedFragments((current) =>
                      current.includes(id)
                        ? current.filter((item) => item !== id)
                        : [...current, id],
                    )
                  }
                  onComment={setCommentFragmentId}
                  onLikeComment={(id) =>
                    setLikedComments((current) =>
                      current.includes(id)
                        ? current.filter((item) => item !== id)
                        : [...current, id],
                    )
                  }
                  onTopic={setSelectedTopicId}
                  onExplore={() => switchView('discover')}
                  onOpenProfile={openUserProfile}
                />
              )}
              {detailView === 'secretBox' && (
                <SecretBoxView
                  profile={selectedUser}
                  onBack={() => setDetailView('home')}
                />
              )}
              {detailView === 'userMoments' && (
                <UserMomentsView
                  profile={selectedUser}
                  moments={selectedUserMoments}
                  likedFragments={likedFragments}
                  likedComments={likedComments}
                  comments={localComments}
                  onBack={() => setDetailView('home')}
                  onLike={(id) =>
                    setLikedFragments((current) =>
                      current.includes(id)
                        ? current.filter((item) => item !== id)
                        : [...current, id],
                    )
                  }
                  onComment={setCommentFragmentId}
                  onLikeComment={(id) =>
                    setLikedComments((current) =>
                      current.includes(id)
                        ? current.filter((item) => item !== id)
                        : [...current, id],
                    )
                  }
                  onTopic={setSelectedTopicId}
                  onExplore={() => switchView('discover')}
                  onOpenProfile={openUserProfile}
                />
              )}
              {!detailView && view === 'discover' &&
                (discoverDetailOpen ? (
                  <DiscoverBoxDetail
                    moment={selectedMoment}
                    momentIndex={selectedMomentIndex}
                    totalMoments={5}
                    step={heartboxStep}
                    echoDraft={echoDraft}
                    unlockedItemIds={unlockedItemIds}
                    onBack={() => resetOpening()}
                    onEcho={() => setHeartboxStep('echo')}
                    onEchoDraft={setEchoDraft}
                    onEchoSent={() => {
                      setEchoDraft('');
                      setHeartboxStep('success');
                    }}
                    onDetail={() => setHeartboxStep('detail')}
                    onExplore={() => {
                      setSelectedMomentIndex(
                        (selectedMomentIndex + 1) % heartboxMoments.length,
                      );
                      setHeartboxStep('detail');
                      setUnlockedItemIds([]);
                    }}
                    onCloser={() => setHeartboxStep('closer')}
                    onUnlockMore={unlockMore}
                    onCloserFour={() => setHeartboxStep('closer4')}
                    onCloserFive={() => setHeartboxStep('closer5')}
                    onWaitForEcho={() => setHeartboxStep('waiting')}
                    onPutBack={() => putMomentBack()}
                    onOpenAnother={beginOpening}
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
              {!detailView && view === 'circle' && (
                <CircleView
                  fragments={allFragments}
                  followedUserIds={followedUserIds}
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
                  onOpenProfile={openUserProfile}
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
              {!detailView && view === 'create' && (
                <CreateView
                  fragmentDraft={fragmentDraft}
                  inviteStep={inviteStep}
                  onDraft={setFragmentDraft}
                  onPublish={publishFragment}
                  onInviteStep={setInviteStep}
                  onCircle={() => switchView('circle')}
                />
              )}
              {!detailView && view === 'messages' && (
                <MessagesView
                  conversations={orderedConversations}
                  systemNotifications={systemNotifications}
                  activeConversation={activeConversation}
                  screen={messageScreen}
                  tab={messageTab}
                  query={messageQuery}
                  searchOpen={searchOpen}
                  messageDraft={messageDraft}
                  composerMode={composerMode}
                  isRecording={isRecording}
                  playingMessageId={playingMessageId}
                  menuOpen={chatMenuOpen}
                  confirmAction={messageConfirmAction}
                  onTab={selectMessageTab}
                  onQuery={setMessageQuery}
                  onToggleSearch={() => {
                    setSearchOpen((current) => !current);
                    setMessageQuery('');
                  }}
                  onSelect={openConversation}
                  onDraft={setMessageDraft}
                  onSend={sendDirectMessage}
                  onComposerMode={setComposerMode}
                  onVoiceStart={() => {
                    if (!activeConversation?.isBlocked) setIsRecording(true);
                  }}
                  onVoiceEnd={() => {
                    if (!isRecording) return;
                    setIsRecording(false);
                    sendMockVoiceMessage();
                  }}
                  onVoiceCancel={() => setIsRecording(false)}
                  onPlay={(id) =>
                    setPlayingMessageId((current) =>
                      current === id ? null : id,
                    )
                  }
                  onToggleMenu={() => setChatMenuOpen((current) => !current)}
                  onCloseMenu={() => setChatMenuOpen(false)}
                  onViewProfile={() => {
                    if (!activeConversation) return;
                    setChatMenuOpen(false);
                    openUserProfile(activeConversation.userId);
                  }}
                  onTogglePin={toggleConversationPin}
                  onClear={clearConversation}
                  onToggleMute={toggleConversationMute}
                  onAskConfirm={setMessageConfirmAction}
                  onCancelConfirm={() => setMessageConfirmAction(null)}
                  onConfirm={confirmMessageAction}
                  onClose={closeConversation}
                />
              )}
              {!detailView && view === 'mine' && (
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
      {onboarded &&
        !detailView &&
        !(view === 'discover' && discoverDetailOpen) &&
        !(view === 'messages' && messageScreen === 'chat') && (
          <MobileNav view={view} onSwitch={switchView} />
        )}
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
              setHeartboxStep('detail');
              setEchoDraft('');
              setUnlockedItemIds([]);
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
  step,
  fragmentDraft,
  onDraft,
  onStep,
  onFinish,
}: {
  step: OnboardingStep;
  fragmentDraft: string;
  onDraft: (value: string) => void;
  onStep: (step: OnboardingStep) => void;
  onFinish: () => void;
}) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  return (
    <section className="onboarding-shell">
      <div className="onboarding-card">
        {step === 'landing' && (
          <div className="onboarding-pane onboarding-door-pane">
            <BrandSignature />
            <div className="onboarding-door-visual" aria-hidden="true" />
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
              onClick={() => onStep('age')}
            >
              开始第一次体验 →
            </button>
            <button className="onboarding-text-link" type="button">
              了解 SELE
            </button>
          </div>
        )}
        {step === 'age' && (
          <div className="onboarding-pane onboarding-age-pane">
            <BrandSignature />
            <button
              className="onboarding-back"
              type="button"
              onClick={() => onStep('landing')}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="onboarding-age-badge">18+</div>
            <h1>
              SELE 是 18+
              <br />
              的空间。
            </h1>
            <i />
            <p>
              认真表达，
              <br />
              也认真靠近。
            </p>
            <label className="onboarding-check">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(event) => setAgeConfirmed(event.target.checked)}
              />
              <span />
              我已满 18 岁，并愿意以尊重的方式参与。
            </label>
            <button
              className="pill-primary onboarding-main-cta"
              type="button"
              disabled={!ageConfirmed}
              onClick={() => onStep('prompt')}
            >
              进入
            </button>
            <small className="onboarding-footnote">未成年人不可进入</small>
          </div>
        )}
        {step === 'prompt' && (
          <div className="onboarding-pane onboarding-prompt-pane">
            <BrandSignature />
            <button
              className="onboarding-back"
              type="button"
              onClick={() => onStep('age')}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h1>先留下一件小事。</h1>
            <p>
              不用介绍完整的你，
              <br />
              只留一个真实的片刻。
            </p>
            <textarea
              value={fragmentDraft}
              onChange={(event) => onDraft(event.target.value)}
              className="onboarding-textarea"
              maxLength={120}
              placeholder="最近让你停顿三秒的一件事。"
            />
            <div className="onboarding-input-meta">
              <span>
                <LockKeyhole className="h-3.5 w-3.5" />
                它只会用于匹配，不会公开展示。
              </span>
              <span>{fragmentDraft.length}/120</span>
            </div>
            <button
              className="pill-primary onboarding-main-cta"
              type="button"
              disabled={!fragmentDraft.trim()}
              onClick={onFinish}
            >
              放进盒子 →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function BrandSignature() {
  return (
    <div className="brand-signature onboarding-door-mark">
      <span className="brand-icon onboarding-brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M16.4 5.6C14.4 3.9 11 3.8 8.9 5.5C6.9 7.1 7.1 9.5 9 10.9C10 11.6 11 11.8 12.2 11.8" />
          <path d="M11.8 12.2C13 12.2 14 12.4 15 13.1C16.9 14.5 17.1 16.9 15.1 18.5C13 20.2 9.6 20.1 7.6 18.4" />
        </svg>
      </span>
      <span className="brand-copy onboarding-brand-type">
        <strong>SELE</strong>
        <small>Heartbox</small>
      </span>
    </div>
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
    title: '读一句心事',
    body: '从一句话开始认识',
    icon: MessageCircle,
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
  moment,
  momentIndex,
  totalMoments,
  step,
  echoDraft,
  unlockedItemIds,
  onBack,
  onEcho,
  onEchoDraft,
  onEchoSent,
  onDetail,
  onExplore,
  onCloser,
  onUnlockMore,
  onCloserFour,
  onCloserFive,
  onWaitForEcho,
  onPutBack,
  onOpenAnother,
}: {
  moment: HeartboxMoment;
  momentIndex: number;
  totalMoments: number;
  step: HeartboxStep;
  echoDraft: string;
  unlockedItemIds: string[];
  onBack: () => void;
  onEcho: () => void;
  onEchoDraft: (value: string) => void;
  onEchoSent: () => void;
  onDetail: () => void;
  onExplore: () => void;
  onCloser: () => void;
  onUnlockMore: () => void;
  onCloserFour: () => void;
  onCloserFive: () => void;
  onWaitForEcho: () => void;
  onPutBack: () => void;
  onOpenAnother: () => void;
}) {
  if (step === 'echo') {
    return (
      <EchoComposer
        draft={echoDraft}
        onBack={onDetail}
        onClose={onDetail}
        onDraft={onEchoDraft}
        onSubmit={onEchoSent}
      />
    );
  }

  if (step === 'success') {
    return (
      <EchoSuccess onExplore={onExplore} onPutBack={onPutBack} />
    );
  }

  if (step === 'closer') {
    return (
      <CloserView
        moment={moment}
        momentIndex={momentIndex}
        totalMoments={totalMoments}
        unlockedItemIds={unlockedItemIds}
        onBack={onDetail}
        onUnlockMore={onUnlockMore}
        onAdvance={onCloserFour}
      />
    );
  }

  if (step === 'closer4') {
    return (
      <CloserFourView onBack={onCloser} onAdvance={onCloserFive} />
    );
  }

  if (step === 'closer5') {
    return (
      <CloserFiveView
        onBack={onCloserFour}
        onWait={onWaitForEcho}
        onPutBack={onPutBack}
      />
    );
  }

  if (step === 'waiting') {
    return (
      <WaitingEchoView onExplore={onExplore} onBack={onBack} />
    );
  }

  if (step === 'newMoment') {
    return (
      <NewMomentView onOpen={onOpenAnother} onBack={onBack} />
    );
  }

  return (
    <MomentDetail
      moment={moment}
      momentIndex={momentIndex}
      totalMoments={totalMoments}
      onBack={onBack}
      onEcho={onEcho}
      onCloser={onCloser}
      onPutBack={onPutBack}
      onExplore={onExplore}
    />
  );
}

function DetailTopbar({
  title,
  subtitle,
  indexText,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  indexText?: string;
  onBack: () => void;
  right?: ReactNode;
}) {
  return (
    <header className="heartbox-flow-top">
      <div className="heartbox-flow-nav">
        <button aria-label="返回" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2>{title}</h2>
        {right ?? <span />}
      </div>
      {(subtitle || indexText) && (
        <div className="heartbox-flow-meta">
          {subtitle && <p>{subtitle}</p>}
          {indexText && <span>{indexText}</span>}
        </div>
      )}
    </header>
  );
}

function MomentDetail({
  moment,
  momentIndex,
  totalMoments,
  onBack,
  onEcho,
  onCloser,
  onPutBack,
  onExplore,
}: {
  moment: HeartboxMoment;
  momentIndex: number;
  totalMoments: number;
  onBack: () => void;
  onEcho: () => void;
  onCloser: () => void;
  onPutBack: () => void;
  onExplore: () => void;
}) {
  return (
    <div className="heartbox-flow-page">
      <DetailTopbar
        title="心动盲盒"
        subtitle="有些人，适合晚一点看见。"
        indexText={`${momentIndex + 1} / ${totalMoments}`}
        onBack={onBack}
        right={<button aria-label="更多">•••</button>}
      />

      <section className="moment-detail-card">
        <div className="moment-detail-head">
          <span>SELE</span>
          <span>{moment.code} · 今天</span>
        </div>
        <p className="moment-detail-source">来自一个陌生人的片刻</p>
        <i />
        <p className="moment-detail-body">{moment.body}</p>
        <p className="moment-detail-note">{moment.note}</p>
        <div className="moment-detail-tags">
          {[moment.age, moment.city, moment.interestTags[0], moment.timeTag].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
      </section>

      <div className="heartbox-primary-actions">
        <button className="heartbox-secondary-button" onClick={onEcho}>
          留下回声
          <MessageCircle className="h-4 w-4" />
        </button>
        <button className="heartbox-primary-button" onClick={onCloser}>
          继续靠近
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <div className="heartbox-soft-actions">
        <button onClick={onPutBack}>
          <PackageOpen className="h-4 w-4" />
          放回盒子
        </button>
        <button onClick={onExplore}>换一个片刻</button>
      </div>
    </div>
  );
}

function EchoComposer({
  draft,
  onBack,
  onClose,
  onDraft,
  onSubmit,
}: {
  draft: string;
  onBack: () => void;
  onClose: () => void;
  onDraft: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="heartbox-flow-page echo-compose-page">
      <DetailTopbar
        title="留下回声"
        onBack={onBack}
        right={<button aria-label="关闭" onClick={onClose}>×</button>}
      />

      <label className="echo-textarea-wrap">
        <textarea
          value={draft}
          maxLength={200}
          placeholder="把你想说的，留在这里……"
          onChange={(event) => onDraft(event.target.value)}
        />
        <span>{draft.length} / 200</span>
      </label>

      <div className="echo-privacy-note">
        <LockKeyhole className="h-5 w-5" />
        <p>
          你的回声会以匿名的方式送达。
          <br />
          如果 TA 也愿意回应，你们将解锁下一步。
        </p>
      </div>

      <button
        className="heartbox-primary-button echo-submit-button"
        disabled={draft.trim().length === 0}
        onClick={onSubmit}
      >
        发送回声
      </button>
    </div>
  );
}

function EchoSuccess({
  onExplore,
  onPutBack,
}: {
  onExplore: () => void;
  onPutBack: () => void;
}) {
  return (
    <div className="heartbox-flow-page echo-success-page">
      <button className="heartbox-floating-back" aria-label="返回" onClick={onExplore}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div className="echo-success-center">
        <div className="echo-success-check">✓</div>
        <h2>你的回声已经留下。</h2>
        <p>
          如果 TA 也愿意回应，
          <br />
          你们将解锁下一步。
        </p>
      </div>
      <div className="echo-success-actions">
        <button className="heartbox-secondary-button" onClick={onExplore}>
          继续探索其他片刻
        </button>
        <button className="heartbox-link-button" onClick={onPutBack}>
          <PackageOpen className="h-4 w-4" />
          放回盒子
        </button>
      </div>
    </div>
  );
}

function CloserView({
  moment,
  momentIndex,
  totalMoments,
  unlockedItemIds,
  onBack,
  onUnlockMore,
  onAdvance,
}: {
  moment: HeartboxMoment;
  momentIndex: number;
  totalMoments: number;
  unlockedItemIds: string[];
  onBack: () => void;
  onUnlockMore: () => void;
  onAdvance: () => void;
}) {
  const unlocks = getMomentUnlocks(moment);
  const isUnlocked = (itemId: string, index: number) =>
    index < moment.currentUnlockLevel || unlockedItemIds.includes(itemId);
  const allUnlocked = unlocks.every((item, index) =>
    isUnlocked(item.id, index),
  );
  return (
    <div className="heartbox-flow-page closer-page">
      <DetailTopbar
        title="再看一点"
        subtitle="你们的距离，又近了一点。"
        indexText={`3 / ${totalMoments}`}
        onBack={onBack}
      />

      <div className="closer-unlock-list">
        {unlocks.map((item, index) => {
          const Icon = item.icon;
          const unlocked = isUnlocked(item.id, index);
          return (
            <article
              key={item.id}
              className={cx('closer-unlock-card', unlocked && 'closer-unlock-open')}
            >
              <span className="closer-unlock-icon">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p className={cx(unlocked && 'closer-unlock-content')}>
                  {unlocked ? item.content : item.hint}
                </p>
                {unlocked && <small>已解锁</small>}
              </div>
              {!unlocked && <LockKeyhole className="h-5 w-5" />}
            </article>
          );
        })}
      </div>

      <button
        className="heartbox-primary-button closer-main-button"
        onClick={allUnlocked ? onAdvance : onUnlockMore}
      >
        {allUnlocked ? '继续靠近' : '继续靠近 · 解锁更多'}
        <ArrowRight className="h-5 w-5" />
      </button>
      <p className="closer-footnote">
        每一次靠近，都需要一点勇气。
        <br />
        但你可以慢一点。
      </p>
    </div>
  );
}

const closerFourFragments = [
  {
    title: '关系方式',
    prompt: 'TA 在关系里最在意什么',
    answer: '希望有话可以直接说，但也需要一点自己的空间。',
    icon: HeartHandshake,
  },
  {
    title: '靠近方式',
    prompt: 'TA 更习惯主动还是等待',
    answer: '大多数时候会先观察，但如果真的在意，也会主动靠近。',
    icon: Sparkles,
  },
  {
    title: '被理解的方式',
    prompt: 'TA 希望别人怎样理解自己',
    answer: '不需要马上给答案，先听完就已经很好。',
    icon: MessageCircle,
  },
];

function CloserFourView({
  onBack,
  onAdvance,
}: {
  onBack: () => void;
  onAdvance: () => void;
}) {
  return (
    <div className="heartbox-flow-page closer-page closer-four-page">
      <DetailTopbar
        title="再靠近一点"
        subtitle="还有一些事，只有靠近以后才会知道。"
        indexText="4 / 5"
        onBack={onBack}
      />

      <div className="closer-unlock-list closer-four-list">
        {closerFourFragments.map((item) => {
          const Icon = item.icon;
          return (
            <article className="closer-unlock-card closer-unlock-open" key={item.title}>
              <span className="closer-unlock-icon">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.prompt}</p>
                <p className="closer-unlock-content">{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>

      <button className="heartbox-primary-button closer-main-button" onClick={onAdvance}>
        继续靠近
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function CloserFiveView({
  onBack,
  onWait,
  onPutBack,
}: {
  onBack: () => void;
  onWait: () => void;
  onPutBack: () => void;
}) {
  return (
    <div className="heartbox-flow-page closer-page closer-final-page">
      <DetailTopbar
        title="已经很近了"
        subtitle="你已经看见了这个人更多的一点。"
        indexText="5 / 5"
        onBack={onBack}
      />

      <div className="closer-final-state">
        <div className="echo-success-check">✓</div>
        <h3>你已经看见了更多。</h3>
        <p>真正的靠近，不会只发生在一个人的选择里。</p>
      </div>

      <div className="closer-final-actions">
        <button className="heartbox-primary-button" onClick={onWait}>
          等待彼此的回声
        </button>
        <button className="heartbox-link-button" onClick={onPutBack}>
          <PackageOpen className="h-4 w-4" />
          放回盒子
        </button>
      </div>
    </div>
  );
}

function WaitingEchoView({
  onExplore,
  onBack,
}: {
  onExplore: () => void;
  onBack: () => void;
}) {
  return (
    <div className="heartbox-flow-page waiting-echo-page">
      <div className="closer-final-state">
        <div className="echo-success-check">✓</div>
        <h2>已经走到这里了。</h2>
        <p>
          如果 TA 也愿意回应，
          <br />
          你们会收到下一步。
        </p>
      </div>
      <div className="closer-final-actions">
        <button className="heartbox-secondary-button" onClick={onExplore}>
          继续看看其他片刻
        </button>
        <button className="heartbox-link-button" onClick={onBack}>
          返回发现页
        </button>
      </div>
    </div>
  );
}

function NewMomentView({
  onOpen,
  onBack,
}: {
  onOpen: () => void;
  onBack: () => void;
}) {
  return (
    <div className="heartbox-flow-page new-moment-page">
      <div className="new-moment-copy">
        <h2>新的片刻</h2>
        <p>盒子里，还有很多未被打开的故事。</p>
      </div>
      <div className="new-box-visual" aria-hidden="true">
        <span>SELE</span>
      </div>
      <div className="new-moment-question">
        <h3>是否拆开下一个？</h3>
        <p>每一次打开，都是一次新的遇见。</p>
      </div>
      <button className="heartbox-primary-button new-moment-button" onClick={onOpen}>
        拆开一个
      </button>
      <button className="heartbox-link-button" onClick={onBack}>
        返回发现页
      </button>
    </div>
  );
}
function CircleView({
  fragments,
  followedUserIds,
  likedFragments,
  likedComments,
  selectedTopic,
  topicMode,
  comments,
  onLike,
  onTopic,
  onTopicMode,
  onComment,
  onOpenProfile,
  onLikeComment,
  onExplore,
  onCreate,
}: {
  fragments: PersonalityFragment[];
  followedUserIds: string[];
  likedFragments: string[];
  likedComments: string[];
  selectedTopic: Topic;
  topicMode: CircleMode;
  comments: PostComment[];
  onLike: (id: string) => void;
  onTopic: (id: string) => void;
  onTopicMode: (mode: CircleMode) => void;
  onComment: (id: string) => void;
  onOpenProfile: (userId: string) => void;
  onLikeComment: (id: string) => void;
  onExplore: () => void;
  onCreate: () => void;
}) {
  const showingFollowing = topicMode === 'following';
  const topicPosts = showingFollowing
    ? fragments.filter((fragment) => followedUserIds.includes(fragment.userId))
    : fragments.filter((fragment) => fragment.topicId === selectedTopic.id);
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
            <h2>{showingFollowing ? '关注' : selectedTopic.name}</h2>
            <p>
              {showingFollowing
                ? '只看你在主页里选择关注的人。'
                : selectedTopic.description}
            </p>
          </div>
          <div className="topic-detail-meta">
            <span>
              {showingFollowing
                ? `${topicPosts.length} 个此刻`
                : `${selectedTopic.participants} 人参与`}
            </span>
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
              <button
                className={cx(topicMode === 'following' && 'topic-mode-active')}
                onClick={() => onTopicMode('following')}
              >
                关注
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
              onOpenProfile={onOpenProfile}
            />
          ))
        )}
      </section>
    </div>
  );
}

function getMomentSortValue(fragment: PersonalityFragment) {
  if (fragment.createdAt === '刚刚') return 1_000_000;
  if (fragment.createdAt.startsWith('今天')) return 900_000 + timeValue(fragment.createdAt);
  if (fragment.createdAt.startsWith('昨天')) return 800_000 + timeValue(fragment.createdAt);
  if (fragment.createdAt.startsWith('周五')) return 700_000 + timeValue(fragment.createdAt);
  return 0;
}

function timeValue(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  return Number(match[1]) * 60 + Number(match[2]);
}

function DetailHeader({
  title,
  meta,
  onBack,
}: {
  title: string;
  meta?: string;
  onBack: () => void;
}) {
  return (
    <header className="detail-header">
      <button className="detail-back" onClick={onBack} aria-label="返回">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div>
        <h1>{title}</h1>
        {meta && <span>{meta}</span>}
      </div>
    </header>
  );
}

function UserProfileView({
  profile,
  moments,
  followed,
  likedFragments,
  likedComments,
  comments,
  onBack,
  onFollow,
  onSecretBox,
  onAllMoments,
  onLike,
  onComment,
  onLikeComment,
  onTopic,
  onExplore,
  onOpenProfile,
}: {
  profile: UserHomeProfile;
  moments: PersonalityFragment[];
  followed: boolean;
  likedFragments: string[];
  likedComments: string[];
  comments: PostComment[];
  onBack: () => void;
  onFollow: () => void;
  onSecretBox: () => void;
  onAllMoments: () => void;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onLikeComment: (id: string) => void;
  onTopic: (id: string) => void;
  onExplore: () => void;
  onOpenProfile: (userId: string) => void;
}) {
  const sortedMoments = [...moments].sort(
    (a, b) => getMomentSortValue(b) - getMomentSortValue(a),
  );
  const recentMoments = sortedMoments.slice(0, 3);

  return (
    <div className="profile-page">
      <DetailHeader title={profile.name} onBack={onBack} />
      <section className="profile-identity">
        <div className="profile-avatar" aria-hidden="true">
          {profile.avatar}
        </div>
        <div className="profile-copy">
          <div className="profile-name-row">
            <h2>{profile.name}</h2>
            <button
              className={cx('profile-follow', followed && 'profile-following')}
              onClick={onFollow}
            >
              {followed ? '已关注' : '关注'}
            </button>
          </div>
          <p className="profile-meta">
            {profile.age} · {profile.city}
          </p>
          <p className="profile-bio">{profile.bio}</p>
          <div className="profile-tags">
            {profile.tags.map((tag) => (
              <span key={tag}># {tag}</span>
            ))}
          </div>
        </div>
      </section>

      <button className="secret-entry" onClick={onSecretBox}>
        <span>暗格</span>
        <small>{profile.secretBoxItems.length}</small>
        <ChevronLeft className="h-4 w-4" />
      </button>

      <section className="profile-section">
        <div className="profile-section-title">
          <h2>TA 的此刻</h2>
          <button onClick={onAllMoments}>查看全部 ›</button>
        </div>
        <div className="profile-moment-list">
          {recentMoments.map((fragment) => (
            <FragmentCard
              key={fragment.id}
              fragment={fragment}
              liked={likedFragments.includes(fragment.id)}
              likedComments={likedComments}
              comments={comments}
              variant="profile"
              onLike={() => onLike(fragment.id)}
              onComment={() => onComment(fragment.id)}
              onLikeComment={onLikeComment}
              onTopic={onTopic}
              onExplore={onExplore}
              onOpenProfile={onOpenProfile}
            />
          ))}
        </div>
      </section>

      <section className="profile-section profile-fragments">
        <h2>关于 TA 的一点点</h2>
        {profile.personalityFragments.slice(0, 3).map((item) => (
          <div className="profile-qa" key={item.question}>
            <p>{item.question}</p>
            <strong>“{item.answer}”</strong>
          </div>
        ))}
      </section>
    </div>
  );
}

function SecretBoxView({
  profile,
  onBack,
}: {
  profile: UserHomeProfile;
  onBack: () => void;
}) {
  return (
    <div className="profile-page secret-page">
      <DetailHeader
        title="暗格"
        meta={String(profile.secretBoxItems.length)}
        onBack={onBack}
      />
      <section className="secret-list">
        {profile.secretBoxItems.map((item) => (
          <article className="secret-item" key={item.id}>
            <p>“{item.content}”</p>
            <div>
              <span>{item.createdAt}</span>
              <button aria-label="更多">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function UserMomentsView({
  profile,
  moments,
  likedFragments,
  likedComments,
  comments,
  onBack,
  onLike,
  onComment,
  onLikeComment,
  onTopic,
  onExplore,
  onOpenProfile,
}: {
  profile: UserHomeProfile;
  moments: PersonalityFragment[];
  likedFragments: string[];
  likedComments: string[];
  comments: PostComment[];
  onBack: () => void;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onLikeComment: (id: string) => void;
  onTopic: (id: string) => void;
  onExplore: () => void;
  onOpenProfile: (userId: string) => void;
}) {
  const sortedMoments = [...moments].sort(
    (a, b) => getMomentSortValue(b) - getMomentSortValue(a),
  );

  return (
    <div className="profile-page">
      <DetailHeader title={`${profile.name}的此刻`} onBack={onBack} />
      <section className="profile-moment-list">
        {sortedMoments.map((fragment) => (
          <FragmentCard
            key={fragment.id}
            fragment={fragment}
            liked={likedFragments.includes(fragment.id)}
            likedComments={likedComments}
            comments={comments}
            variant="profile"
            onLike={() => onLike(fragment.id)}
            onComment={() => onComment(fragment.id)}
            onLikeComment={onLikeComment}
            onTopic={onTopic}
            onExplore={onExplore}
            onOpenProfile={onOpenProfile}
          />
        ))}
      </section>
    </div>
  );
}

function FragmentCard({
  fragment,
  liked,
  likedComments,
  comments,
  variant = 'public',
  onLike,
  onComment,
  onLikeComment,
  onTopic,
  onExplore,
  onOpenProfile,
}: {
  fragment: PersonalityFragment;
  liked: boolean;
  likedComments: string[];
  comments: PostComment[];
  variant?: 'public' | 'profile';
  onLike: () => void;
  onComment: () => void;
  onLikeComment: (id: string) => void;
  onTopic: (id: string) => void;
  onExplore: () => void;
  onOpenProfile: (userId: string) => void;
}) {
  const fragmentComments = comments.filter(
    (comment) => comment.fragmentId === fragment.id,
  );
  const author =
    userHomeProfiles.find((profile) => profile.id === fragment.userId)?.name ??
    profiles.find((profile) => profile.userId === fragment.userId)
      ?.displayName ?? '测试用户';
  const commentCount = Math.max(fragment.comments, fragmentComments.length);

  if (variant === 'profile') {
    return (
      <Panel className="post-card profile-post-card p-5 sm:p-6">
        <p className="post-meta">{fragment.createdAt}</p>
        <p className="post-body">“{fragment.answer}”</p>
        <div className="post-topics">
          {fragment.tags.slice(0, 3).map((tag) => (
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
        <div className="profile-post-actions">
          <button onClick={onComment}>
            <MessageCircle className="h-4 w-4" />
            {commentCount} 回声
          </button>
          <button
            className={cx(liked && 'profile-resonance-active')}
            onClick={onLike}
          >
            <Heart className="h-4 w-4" />
            {liked ? fragment.likes + 1 : fragment.likes} 共鸣
          </button>
          <button className="profile-reply-action" onClick={onComment}>
            回应
          </button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="post-card p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="post-meta">
            Post ·{' '}
            <button
              className="post-author-link"
              onClick={() => onOpenProfile(fragment.userId)}
            >
              {author}
            </button>{' '}
            · {fragment.createdAt}
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
        <button
          className="soft-command"
          onClick={() => onOpenProfile(fragment.userId)}
        >
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
  conversations,
  systemNotifications,
  activeConversation,
  screen,
  tab,
  query,
  searchOpen,
  messageDraft,
  composerMode,
  isRecording,
  playingMessageId,
  menuOpen,
  confirmAction,
  onTab,
  onQuery,
  onToggleSearch,
  onSelect,
  onDraft,
  onSend,
  onComposerMode,
  onVoiceStart,
  onVoiceEnd,
  onVoiceCancel,
  onPlay,
  onToggleMenu,
  onCloseMenu,
  onViewProfile,
  onTogglePin,
  onClear,
  onToggleMute,
  onAskConfirm,
  onCancelConfirm,
  onConfirm,
  onClose,
}: {
  conversations: DirectConversation[];
  systemNotifications: SystemNotification[];
  activeConversation?: DirectConversation;
  screen: MessageScreen;
  tab: MessageTab;
  query: string;
  searchOpen: boolean;
  messageDraft: string;
  composerMode: 'text' | 'voice';
  isRecording: boolean;
  playingMessageId: string | null;
  menuOpen: boolean;
  confirmAction: MessageConfirmAction;
  onTab: (tab: MessageTab) => void;
  onQuery: (value: string) => void;
  onToggleSearch: () => void;
  onSelect: (id: string) => void;
  onDraft: (value: string) => void;
  onSend: () => void;
  onComposerMode: (mode: 'text' | 'voice') => void;
  onVoiceStart: () => void;
  onVoiceEnd: () => void;
  onVoiceCancel: () => void;
  onPlay: (id: string) => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onViewProfile: () => void;
  onTogglePin: () => void;
  onClear: () => void;
  onToggleMute: () => void;
  onAskConfirm: (action: MessageConfirmAction) => void;
  onCancelConfirm: () => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const normalizedQuery = query.trim().toLocaleLowerCase('zh-CN');
  const filteredConversations = conversations.filter((conversation) => {
    if (tab === 'unread' && conversation.unreadCount < 1) return false;
    if (!normalizedQuery) return true;
    return [conversation.userName, conversation.lastMessage].some((value) =>
      value.toLocaleLowerCase('zh-CN').includes(normalizedQuery),
    );
  });
  const latestSystemNotification = [...systemNotifications].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  )[0];
  const showOfficialRow =
    tab === 'all' &&
    !!latestSystemNotification &&
    (!normalizedQuery ||
      [
        'sele 官方',
        latestSystemNotification.title,
        latestSystemNotification.content,
      ]
        .join(' ')
        .toLocaleLowerCase('zh-CN')
        .includes(normalizedQuery));
  const listRows: Array<
    | {
        kind: 'conversation';
        at: string;
        pinned: boolean;
        conversation: DirectConversation;
      }
    | {
        kind: 'system';
        at: string;
        pinned: false;
        notification: SystemNotification;
      }
  > = filteredConversations.map((conversation) => ({
    kind: 'conversation',
    at: conversation.lastMessageAt,
    pinned: conversation.isPinned,
    conversation,
  }));

  if (showOfficialRow) {
    listRows.push({
      kind: 'system',
      at: latestSystemNotification.createdAt,
      pinned: false,
      notification: latestSystemNotification,
    });
  }
  listRows.sort((left, right) => {
    if (left.pinned !== right.pinned) return left.pinned ? -1 : 1;
    return new Date(right.at).getTime() - new Date(left.at).getTime();
  });

  if (screen === 'list' || !activeConversation) {
    const isConversationEmpty = conversations.length === 0;
    const isUnreadEmpty =
      tab === 'unread' && filteredConversations.length === 0;
    const isSearchEmpty = !!normalizedQuery && listRows.length === 0;
    return (
      <section className="sele-messages-home" aria-label="消息">
        <header className="sele-messages-header">
          <h1>消息</h1>
          <button
            type="button"
            className={cx('sele-icon-button', searchOpen && 'is-active')}
            aria-label={searchOpen ? '关闭搜索' : '搜索消息'}
            onClick={onToggleSearch}
          >
            {searchOpen ? <X /> : <Search />}
          </button>
        </header>

        {searchOpen && (
          <label className="sele-message-search">
            <Search aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder="搜索会话"
              aria-label="搜索会话"
            />
          </label>
        )}

        <div className="sele-message-tabs" role="tablist" aria-label="消息分类">
          {(
            [
              ['all', '全部'],
              ['unread', '未读'],
              ['system', '系统'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              className={tab === value ? 'is-active' : undefined}
              onClick={() => onTab(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'system' ? (
          <div className="sele-system-list">
            {systemNotifications.map((notification) => (
              <article
                className={cx(
                  'sele-system-row',
                  !notification.isRead && 'is-unread',
                )}
                key={notification.id}
              >
                <span className="sele-system-icon" aria-hidden="true">
                  {notification.type === 'interaction' && <MessageCircle />}
                  {notification.type === 'follow' && <UserRound />}
                  {notification.type === 'heartbox' && <Heart />}
                  {notification.type === 'system' && <Bell />}
                </span>
                <span className="sele-system-copy">
                  <strong>{notification.title}</strong>
                  <span>{notification.content}</span>
                </span>
                <time>{formatListTime(notification.createdAt)}</time>
              </article>
            ))}
          </div>
        ) : isConversationEmpty || isUnreadEmpty || isSearchEmpty ? (
          <div className="sele-message-empty">
            <div className="sele-empty-echo" aria-hidden="true" />
            <h2>
              {isSearchEmpty
                ? '没有找到会话'
                : isUnreadEmpty && !isConversationEmpty
                  ? '没有未读消息'
                  : '还没有消息'}
            </h2>
            <p>
              {isConversationEmpty ? (
                <>
                  当有人向你靠近，
                  <br />
                  这里会亮起。
                </>
              ) : isSearchEmpty ? (
                '试试另一个名字或关键词。'
              ) : (
                '这里暂时很安静。'
              )}
            </p>
          </div>
        ) : (
          <div className="sele-conversation-list">
            {listRows.map((row) => {
              if (row.kind === 'system') {
                return (
                  <button
                    type="button"
                    className="sele-conversation-row sele-official-row"
                    key="sele-official"
                    onClick={() => onTab('system')}
                  >
                    <span className="sele-thread-avatar sele-official-avatar">
                      <Bell />
                    </span>
                    <span className="sele-thread-main">
                      <span className="sele-thread-name">SELE 官方</span>
                      <span className="sele-thread-preview">
                        {row.notification.title}
                      </span>
                    </span>
                    <span className="sele-thread-aside">
                      <time>{formatListTime(row.notification.createdAt)}</time>
                      {!row.notification.isRead && (
                        <span className="sele-unread-dot" aria-label="未读" />
                      )}
                    </span>
                  </button>
                );
              }
              const conversation = row.conversation;
              return (
                <button
                  type="button"
                  className="sele-conversation-row"
                  key={conversation.id}
                  onClick={() => onSelect(conversation.id)}
                >
                  <span className="sele-thread-avatar" aria-hidden="true">
                    {conversation.avatar}
                  </span>
                  <span className="sele-thread-main">
                    <span className="sele-thread-name">
                      {conversation.userName}
                      {conversation.isPinned && <Pin aria-label="已置顶" />}
                    </span>
                    <span className="sele-thread-preview">
                      {conversation.lastMessage || '还没有消息'}
                    </span>
                  </span>
                  <span className="sele-thread-aside">
                    <time>{formatListTime(conversation.lastMessageAt)}</time>
                    {conversation.isMuted ? (
                      <BellOff
                        className="sele-muted-icon"
                        aria-label="已关闭提醒"
                      />
                    ) : conversation.unreadCount > 0 ? (
                      <span
                        className="sele-unread-badge"
                        aria-label={`${conversation.unreadCount} 条未读`}
                      >
                        {conversation.unreadCount > 9
                          ? '9+'
                          : conversation.unreadCount}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      className="sele-chat-page"
      aria-label={`与${activeConversation.userName}的私信`}
    >
      <header className="sele-chat-header">
        <button
          className="sele-icon-button"
          type="button"
          aria-label="返回消息"
          onClick={onClose}
        >
          <ChevronLeft />
        </button>
        <button
          className="sele-chat-person"
          type="button"
          onClick={onViewProfile}
          aria-label={`查看${activeConversation.userName}的主页`}
        >
          <span className="sele-chat-avatar">{activeConversation.avatar}</span>
          <span>
            <strong>{activeConversation.userName}</strong>
          </span>
        </button>
        <button
          className={cx('sele-icon-button', menuOpen && 'is-active')}
          type="button"
          aria-label="更多操作"
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          <MoreHorizontal />
        </button>
      </header>

      <div className="sele-chat-body">
        {activeConversation.messages.length === 0 ? (
          <div className="sele-chat-empty">聊天记录已经清空。</div>
        ) : (
          activeConversation.messages.map((message, index) => (
            <div className="sele-message-group" key={message.id}>
              {shouldShowMessageTime(activeConversation.messages, index) && (
                <time className="sele-chat-time">
                  {formatChatTime(message.createdAt)}
                </time>
              )}
              <div
                className={cx(
                  'sele-chat-line',
                  message.sender === 'me' && 'is-me',
                )}
              >
                {message.type === 'voice' ? (
                  <button
                    type="button"
                    className={cx(
                      'sele-voice-bubble',
                      playingMessageId === message.id && 'is-playing',
                    )}
                    aria-label={
                      playingMessageId === message.id
                        ? '暂停语音消息'
                        : '播放语音消息'
                    }
                    onClick={() => onPlay(message.id)}
                  >
                    <span className="sele-voice-play">
                      <Play />
                    </span>
                    <span className="sele-waveform" aria-hidden="true">
                      {[5, 10, 7, 14, 9, 16, 6, 12, 8, 15, 6, 11].map(
                        (height, waveIndex) => (
                          <i
                            key={`${message.id}_${waveIndex}`}
                            style={{ height }}
                          />
                        ),
                      )}
                    </span>
                    <span className="sele-voice-duration">
                      {formatDuration(message.duration)}
                    </span>
                  </button>
                ) : (
                  <div className="sele-text-bubble">{message.content}</div>
                )}
              </div>
            </div>
          ))
        )}
        {activeConversation.isBlocked && (
          <div className="sele-blocked-note">你已经不再接收 TA 的消息。</div>
        )}
      </div>

      <footer className="sele-chat-composer-area">
        {activeConversation.isBlocked ? (
          <div className="sele-disabled-composer">已停止接收消息</div>
        ) : (
          <div className="sele-chat-composer">
            <button
              type="button"
              className="sele-composer-mode"
              aria-label={composerMode === 'text' ? '切换到语音' : '切换到文字'}
              onClick={() =>
                onComposerMode(composerMode === 'text' ? 'voice' : 'text')
              }
            >
              {composerMode === 'text' ? <Mic /> : <Keyboard />}
            </button>
            {composerMode === 'text' ? (
              <>
                <input
                  value={messageDraft}
                  onChange={(event) => onDraft(event.target.value)}
                  onKeyDown={(event) =>
                    event.key === 'Enter' &&
                    !event.nativeEvent.isComposing &&
                    onSend()
                  }
                  placeholder="输入一条消息……"
                  aria-label="输入一条消息"
                />
                <button
                  className="sele-send-button"
                  type="button"
                  onClick={onSend}
                  disabled={!messageDraft.trim()}
                  aria-label="发送消息"
                >
                  <Send />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={cx(
                    'sele-hold-to-talk',
                    isRecording && 'is-recording',
                  )}
                  onPointerDown={onVoiceStart}
                  onPointerUp={onVoiceEnd}
                  onPointerCancel={onVoiceCancel}
                  onPointerLeave={isRecording ? onVoiceCancel : undefined}
                >
                  <Mic />
                  {isRecording ? '松开发送' : '按住说话'}
                </button>
                <span className="sele-composer-spacer" aria-hidden="true" />
              </>
            )}
          </div>
        )}
      </footer>

      {menuOpen && (
        <>
          <button
            type="button"
            className="sele-chat-menu-backdrop"
            aria-label="关闭更多操作"
            onClick={onCloseMenu}
          />
          <div className="sele-chat-menu" role="dialog" aria-label="聊天操作">
            <button type="button" onClick={onViewProfile}>
              <UserRound />
              <span>查看主页</span>
            </button>
            <button type="button" onClick={onTogglePin}>
              <Pin />
              <span>
                {activeConversation.isPinned ? '取消置顶聊天' : '置顶聊天'}
              </span>
            </button>
            <button type="button" onClick={onClear}>
              <Trash2 />
              <span>清空聊天记录</span>
            </button>
            <button type="button" onClick={onToggleMute}>
              <BellOff />
              <span>关闭消息提醒</span>
              <span
                className={cx(
                  'sele-quiet-switch',
                  activeConversation.isMuted && 'is-on',
                )}
                role="switch"
                aria-checked={activeConversation.isMuted}
              >
                <i />
              </span>
            </button>
            <button
              type="button"
              className="is-danger"
              disabled={activeConversation.isBlocked}
              onClick={() => onAskConfirm('block')}
            >
              <Ban />
              <span>{activeConversation.isBlocked ? '已拉黑' : '拉黑'}</span>
            </button>
            <button
              type="button"
              className="is-danger"
              onClick={() => onAskConfirm('delete')}
            >
              <Trash2 />
              <span>删除对话</span>
            </button>
          </div>
        </>
      )}

      {confirmAction && (
        <div className="sele-confirm-backdrop" role="presentation">
          <div
            className="sele-confirm-dialog"
            role="alertdialog"
            aria-modal="true"
          >
            <h2>
              {confirmAction === 'block'
                ? '不再接收 TA 的消息？'
                : '删除这段对话？'}
            </h2>
            <p>
              {confirmAction === 'block'
                ? '确认后将无法继续发送消息。'
                : '聊天记录会从消息列表移除，不影响关注关系与其他内容。'}
            </p>
            <div>
              <button type="button" onClick={onCancelConfirm}>
                取消
              </button>
              <button type="button" className="is-danger" onClick={onConfirm}>
                {confirmAction === 'block' ? '确认拉黑' : '删除对话'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
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
              <p className="mt-4 max-w-2xl text-base leading-7">
                “{card.quote}”
              </p>
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
