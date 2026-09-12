import type { UserHomeProfile } from '@/lib/heartbox-data';

export type MessageTab = 'all' | 'unread' | 'system';

export type DirectMessage = {
  id: string;
  sender: 'me' | 'them';
  type: 'text' | 'voice';
  content: string;
  duration?: number;
  createdAt: string;
};

export type DirectConversation = {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  messages: DirectMessage[];
};

export type SystemNotification = {
  id: string;
  type: 'interaction' | 'follow' | 'heartbox' | 'system';
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
};

export const initialConversations: DirectConversation[] = [
  {
    id: 'conversation_001',
    userId: 'user_001',
    userName: '月与六便士',
    avatar: '月',
    lastMessage: '我刚看完你发的那段话，突然很有共鸣。',
    lastMessageAt: '2026-09-12T20:14:00+08:00',
    unreadCount: 2,
    isPinned: false,
    isMuted: false,
    isBlocked: false,
    messages: [
      {
        id: 'direct_001',
        sender: 'them',
        type: 'text',
        content: '我刚看完你发的那段话，突然很有共鸣。',
        createdAt: '2026-09-12T20:14:00+08:00',
      },
      {
        id: 'direct_002',
        sender: 'me',
        type: 'text',
        content: '真的吗？具体是哪一句？',
        createdAt: '2026-09-12T20:16:00+08:00',
      },
      {
        id: 'direct_003',
        sender: 'them',
        type: 'text',
        content: '是关于“把自己放回来”那段。感觉你写得很真诚。',
        createdAt: '2026-09-12T20:17:00+08:00',
      },
      {
        id: 'direct_004',
        sender: 'them',
        type: 'voice',
        content: '语音消息',
        duration: 24,
        createdAt: '2026-09-12T20:18:00+08:00',
      },
    ],
  },
  {
    id: 'conversation_002',
    userId: 'user_002',
    userName: '晚风停一下',
    avatar: '晚',
    lastMessage: '[语音] 0:11',
    lastMessageAt: '2026-09-12T18:40:00+08:00',
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    isBlocked: false,
    messages: [
      {
        id: 'direct_005',
        sender: 'me',
        type: 'text',
        content: '你说的那家旧书店，我周末也想去看看。',
        createdAt: '2026-09-12T18:18:00+08:00',
      },
      {
        id: 'direct_006',
        sender: 'them',
        type: 'voice',
        content: '语音消息',
        duration: 11,
        createdAt: '2026-09-12T18:40:00+08:00',
      },
    ],
  },
  {
    id: 'conversation_003',
    userId: 'user_003',
    userName: '北窗留灯',
    avatar: '北',
    lastMessage: '分享了一段刚好适合夜里听的歌。',
    lastMessageAt: '2026-09-12T16:20:00+08:00',
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isBlocked: false,
    messages: [
      {
        id: 'direct_007',
        sender: 'them',
        type: 'text',
        content: '今天的风很轻，走到河边时忽然想起你说过的话。',
        createdAt: '2026-09-12T15:48:00+08:00',
      },
      {
        id: 'direct_008',
        sender: 'me',
        type: 'text',
        content: '那就把这阵风也算作今天的一小段回声。',
        createdAt: '2026-09-12T16:02:00+08:00',
      },
      {
        id: 'direct_009',
        sender: 'them',
        type: 'text',
        content: '分享了一段刚好适合夜里听的歌。',
        createdAt: '2026-09-12T16:20:00+08:00',
      },
    ],
  },
  {
    id: 'conversation_004',
    userId: 'user_004',
    userName: '柚子',
    avatar: '柚',
    lastMessage: '好像我们喜欢的电影很像。',
    lastMessageAt: '2026-09-11T22:32:00+08:00',
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isBlocked: false,
    messages: [
      {
        id: 'direct_010',
        sender: 'them',
        type: 'text',
        content: '好像我们喜欢的电影很像。',
        createdAt: '2026-09-11T22:32:00+08:00',
      },
    ],
  },
  {
    id: 'conversation_005',
    userId: 'user_005',
    userName: '星辞',
    avatar: '星',
    lastMessage: '晚安，明天再慢慢说。',
    lastMessageAt: '2026-09-11T21:06:00+08:00',
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isBlocked: false,
    messages: [
      {
        id: 'direct_011',
        sender: 'me',
        type: 'text',
        content: '今天先到这里也很好。',
        createdAt: '2026-09-11T21:04:00+08:00',
      },
      {
        id: 'direct_012',
        sender: 'them',
        type: 'text',
        content: '晚安，明天再慢慢说。',
        createdAt: '2026-09-11T21:06:00+08:00',
      },
    ],
  },
];

export const initialSystemNotifications: SystemNotification[] = [
  {
    id: 'system_001',
    type: 'heartbox',
    title: '盲盒有了新的回声',
    content: '你们都愿意继续靠近，私信已经为你们打开。',
    createdAt: '2026-09-12T19:06:00+08:00',
    isRead: false,
  },
  {
    id: 'system_002',
    type: 'interaction',
    title: '有人回应了你的此刻',
    content: '“原来安静也可以是一种认真。”',
    createdAt: '2026-09-12T15:24:00+08:00',
    isRead: false,
  },
  {
    id: 'system_003',
    type: 'follow',
    title: '新的关注',
    content: '晚风停一下开始关注你。',
    createdAt: '2026-09-11T22:10:00+08:00',
    isRead: true,
  },
  {
    id: 'system_004',
    type: 'system',
    title: '账号安全提醒',
    content: '你的账号刚刚完成一次安全验证。',
    createdAt: '2026-09-10T09:18:00+08:00',
    isRead: true,
  },
  {
    id: 'system_005',
    type: 'system',
    title: 'SELE 产品更新',
    content: '私信语音现已开放给已经建立关系的用户。',
    createdAt: '2026-09-08T12:04:00+08:00',
    isRead: true,
  },
];

export const messageUserProfiles: UserHomeProfile[] = [
  {
    id: 'user_004',
    name: '柚子',
    avatar: '柚',
    age: 24,
    city: '杭州',
    bio: '喜欢旧电影和雨后的街道，\n也喜欢把话说得慢一点。',
    tags: ['旧电影', '散步', '咖啡'],
    isFollowing: false,
    moments: ['fragment_004'],
    secretBoxItems: [],
    personalityFragments: [
      {
        question: '舒服的关系是什么样？',
        answer: '不用不停说话，但始终知道彼此在。',
      },
    ],
  },
  {
    id: 'user_005',
    name: '星辞',
    avatar: '星',
    age: 26,
    city: '南京',
    bio: '低频，稳定，\n相信认真出现比热烈更难得。',
    tags: ['建筑', '夜跑', '纪录片'],
    isFollowing: false,
    moments: ['fragment_005'],
    secretBoxItems: [],
    personalityFragments: [
      {
        question: '最看重什么？',
        answer: '清楚的边界，和回来以后还接得上的话。',
      },
    ],
  },
];
