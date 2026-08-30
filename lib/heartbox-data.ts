export type RelationshipStage = "stranger" | "echo" | "resonance" | "closer" | "reveal";

export type AppView = "discover" | "circle" | "create" | "messages" | "mine";

export type Profile = {
  id: string;
  userId: string;
  displayName: string;
  ageRange: string;
  city: string;
  pronouns: string;
  safetyNote: string;
};

export type User = {
  id: string;
  handle: string;
  ageVerified: boolean;
  membership: "free" | "heart_plus";
};

export type PersonalityCard = {
  id: string;
  userId: string;
  alias: string;
  archetype: string;
  interests: string[];
  relationshipValues: string[];
  completeness: number;
  quote: string;
};

export type PersonalityFragment = {
  id: string;
  userId: string;
  prompt: string;
  answer: string;
  mood: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
};

export type BlindBox = {
  id: string;
  ownerUserId: string;
  title: string;
  theme: string;
  seal: string;
  cityHint: string;
  ageHint: string;
  hiddenTags: string[];
  echoScore: number;
  firstLayer: {
    alias: string;
    archetype: string;
    fragment: string;
    interests: string[];
  };
  secondLayer: {
    relationshipView: string;
    boundary: string;
    promptAnswer: string;
  };
};

export type BoxOpening = {
  id: string;
  boxId: string;
  openerUserId: string;
  state: "sealed" | "opening" | "first_layer" | "second_layer" | "echo_sent" | "matched";
  usedFreeOpen: boolean;
};

export type Relationship = {
  id: string;
  userAId: string;
  userBId: string;
  stage: RelationshipStage;
  progress: number;
  alias: string;
  unlockedFragments: string[];
  nextUnlock: string;
  revealRequestedByMe: boolean;
  revealRequestedByThem: boolean;
};

export type Message = {
  id: string;
  sender: "me" | "them" | "system";
  body: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  relationshipId: string;
  unread: number;
  messages: Message[];
};

export type Wallet = {
  userId: string;
  dailyFreeOpensRemaining: number;
  dailyFreeOpensLimit: number;
  hearts: number;
  heartPlus: {
    active: boolean;
    label: string;
    benefits: string[];
  };
};

export type Invite = {
  id: string;
  userId: string;
  code: string;
  link: string;
  shareTitle: string;
  shareMessage: string;
};

export type ReferralReward = {
  id: string;
  inviteId: string;
  title: string;
  status: "ready" | "pending" | "claimed";
  reward: string;
};

export const stageMeta: Record<RelationshipStage, { label: string; unlock: string; tone: string }> = {
  stranger: {
    label: "陌生",
    unlock: "基础人格信息",
    tone: "刚刚拆开，先确认边界和聊天节奏。",
  },
  echo: {
    label: "回声",
    unlock: "更多兴趣和生活片段",
    tone: "你们开始对彼此的表达产生回应。",
  },
  resonance: {
    label: "共鸣",
    unlock: "关系观与相处方式",
    tone: "对话不再只是问答，开始有共同语境。",
  },
  closer: {
    label: "靠近",
    unlock: "有限真实信息请求",
    tone: "可以认真确认是否想认识真实的对方。",
  },
  reveal: {
    label: "揭晓",
    unlock: "双方同意后的有限资料",
    tone: "只有双向选择才会进入揭晓。",
  },
};

export const currentUser: User = {
  id: "user_me",
  handle: "lq",
  ageVerified: true,
  membership: "free",
};

export const profiles: Profile[] = [
  {
    id: "profile_me",
    userId: "user_me",
    displayName: "月台来信",
    ageRange: "25-29",
    city: "上海",
    pronouns: "TA",
    safetyNote: "只展示城市，不公开精确定位和外部联系方式。",
  },
  {
    id: "profile_001",
    userId: "user_001",
    displayName: "雾里电台",
    ageRange: "23-26",
    city: "杭州",
    pronouns: "TA",
    safetyNote: "愿意慢慢聊，揭晓前不交换联系方式。",
  },
  {
    id: "profile_002",
    userId: "user_002",
    displayName: "周三宇航员",
    ageRange: "27-31",
    city: "成都",
    pronouns: "TA",
    safetyNote: "线下见面前希望先建立稳定聊天。",
  },
];

export const personalityCards: PersonalityCard[] = [
  {
    id: "card_me",
    userId: "user_me",
    alias: "月台来信",
    archetype: "慢热观察者",
    interests: ["独立电影", "城市散步", "小酒馆", "心理学"],
    relationshipValues: ["边界感", "认真回复", "不急着证明"],
    completeness: 82,
    quote: "希望先确认能不能自然地说废话，再谈心动。",
  },
  {
    id: "card_001",
    userId: "user_001",
    alias: "雾里电台",
    archetype: "周末出逃型",
    interests: ["播客", "咖啡", "展览", "Livehouse"],
    relationshipValues: ["轻松表达", "尊重节奏", "稳定好奇"],
    completeness: 91,
    quote: "我喜欢让关系自然长出来，而不是把每一次聊天都变成考试。",
  },
];

export const personalityFragments: PersonalityFragment[] = [
  {
    id: "fragment_daily_me",
    userId: "user_me",
    prompt: "最近一次让你心动是什么时候？",
    answer: "下班路上有人把伞往陌生人那边偏了一点。没有对视，但那一秒城市变软了。",
    mood: "柔软",
    tags: ["城市散步", "心动细节"],
    likes: 36,
    comments: 8,
    createdAt: "今天 20:12",
  },
  {
    id: "fragment_001",
    userId: "user_001",
    prompt: "如果今晚有人陪你散步，你想去哪里？",
    answer: "想沿着河边走，不安排目的地。最好两个人都不用急着找话题，偶尔说一句也够。",
    mood: "松弛",
    tags: ["夜路", "慢热"],
    likes: 128,
    comments: 21,
    createdAt: "今天 18:44",
  },
  {
    id: "fragment_002",
    userId: "user_002",
    prompt: "你认为舒服的关系是什么样？",
    answer: "是可以不同频，但不互相消耗。忙的时候各自生活，靠近的时候认真在场。",
    mood: "清醒",
    tags: ["边界感", "长期关系"],
    likes: 96,
    comments: 14,
    createdAt: "昨天 23:08",
  },
  {
    id: "fragment_003",
    userId: "user_003",
    prompt: "你最容易被什么样的细节打动？",
    answer: "记得我随口说过不吃香菜，也记得给自己留一点空间。体贴不是把人围住。",
    mood: "笃定",
    tags: ["细节控", "相处方式"],
    likes: 74,
    comments: 12,
    createdAt: "昨天 21:31",
  },
];

export const blindBoxes: BlindBox[] = [
  {
    id: "box_001",
    ownerUserId: "user_001",
    title: "河边没有目的地",
    theme: "深夜电台",
    seal: "今晚 23:00 前有效",
    cityHint: "华东城市",
    ageHint: "23-26",
    hiddenTags: ["播客", "咖啡", "周末出逃"],
    echoScore: 92,
    firstLayer: {
      alias: "雾里电台",
      archetype: "周末出逃型",
      fragment: "最好两个人都不用急着找话题，偶尔说一句也够。",
      interests: ["播客", "河边散步", "展览"],
    },
    secondLayer: {
      relationshipView: "喜欢自然长出来的关系，不想把聊天变成考试。",
      boundary: "揭晓前不交换微信和精确地址。",
      promptAnswer: "舒服的关系是可以沉默，也可以突然认真聊一个小时。",
    },
  },
  {
    id: "box_002",
    ownerUserId: "user_002",
    title: "周三也想逃离地面",
    theme: "城市散步",
    seal: "今日推荐",
    cityHint: "西南城市",
    ageHint: "27-31",
    hiddenTags: ["书店", "爵士", "做饭"],
    echoScore: 86,
    firstLayer: {
      alias: "周三宇航员",
      archetype: "安静行动派",
      fragment: "忙的时候各自生活，靠近的时候认真在场。",
      interests: ["书店", "爵士", "做饭"],
    },
    secondLayer: {
      relationshipView: "重视稳定、边界和幽默感。",
      boundary: "不接受催促揭晓或连续轰炸式消息。",
      promptAnswer: "理想的周末是逛菜场、做饭、看一部不太热门的电影。",
    },
  },
  {
    id: "box_003",
    ownerUserId: "user_003",
    title: "给慢热的人一盏灯",
    theme: "慢热关系",
    seal: "新鲜投递",
    cityHint: "同城附近",
    ageHint: "24-29",
    hiddenTags: ["独立电影", "心理学", "Livehouse"],
    echoScore: 89,
    firstLayer: {
      alias: "晚风切片",
      archetype: "慢热共情者",
      fragment: "体贴不是把人围住，而是知道什么时候靠近。",
      interests: ["独立电影", "心理学", "Livehouse"],
    },
    secondLayer: {
      relationshipView: "希望两个人都能保留自己的生活，同时认真回应彼此。",
      boundary: "线下见面前需要足够多的匿名聊天。",
      promptAnswer: "最近心动是看到一个人认真听完朋友很长的倾诉，没有急着给建议。",
    },
  },
];

export const relationships: Relationship[] = [
  {
    id: "rel_001",
    userAId: "user_me",
    userBId: "user_001",
    stage: "resonance",
    progress: 64,
    alias: "雾里电台",
    unlockedFragments: ["河边没有目的地", "舒服的关系是不急着证明"],
    nextUnlock: "再完成 2 轮有效对话，解锁靠近阶段",
    revealRequestedByMe: false,
    revealRequestedByThem: true,
  },
  {
    id: "rel_002",
    userAId: "user_me",
    userBId: "user_002",
    stage: "echo",
    progress: 38,
    alias: "周三宇航员",
    unlockedFragments: ["忙的时候各自生活，靠近时认真在场"],
    nextUnlock: "互相回复一个关系观问题",
    revealRequestedByMe: false,
    revealRequestedByThem: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: "convo_001",
    relationshipId: "rel_001",
    unread: 2,
    messages: [
      {
        id: "msg_001",
        sender: "them",
        body: "我抽到了你的卡片，那个“自然地说废话”有点打中我。",
        createdAt: "20:16",
      },
      {
        id: "msg_002",
        sender: "me",
        body: "那我们先从废话开始：今天你路过的天空是什么颜色？",
        createdAt: "20:18",
      },
      {
        id: "msg_003",
        sender: "them",
        body: "偏灰蓝，但下班路上的灯很暖。你呢？",
        createdAt: "20:21",
      },
      {
        id: "msg_004",
        sender: "system",
        body: "你们已进入「共鸣」阶段，解锁一张新的人格碎片。",
        createdAt: "20:24",
      },
    ],
  },
];

export const wallet: Wallet = {
  userId: "user_me",
  dailyFreeOpensRemaining: 1,
  dailyFreeOpensLimit: 3,
  hearts: 42,
  heartPlus: {
    active: false,
    label: "未开通",
    benefits: ["更多每日免费拆盒", "高级筛选", "悔拆 / 找回", "特殊主题盲盒"],
  },
};

export const invite: Invite = {
  id: "invite_001",
  userId: "user_me",
  code: "HEART-LQ-0829",
  link: "https://heartbox.app/i/HEART-LQ-0829",
  shareTitle: "给你留了一个 Heartbox 盲盒",
  shareMessage: "有人觉得这里有一个你会想认识的人。先别急着看脸，拆开一段人格碎片。",
};

export const referralRewards: ReferralReward[] = [
  {
    id: "reward_001",
    inviteId: "invite_001",
    title: "第 1 位朋友完成人格卡",
    status: "claimed",
    reward: "+1 次免费拆盒",
  },
  {
    id: "reward_002",
    inviteId: "invite_001",
    title: "第 3 位朋友通过有效注册",
    status: "ready",
    reward: "+16 Heart",
  },
  {
    id: "reward_003",
    inviteId: "invite_001",
    title: "第 5 位朋友发出第一张人格碎片",
    status: "pending",
    reward: "特殊主题盲盒",
  },
];

export const dailyPrompt = {
  title: "最近一次让你心动是什么时候？",
  helper: "写一段不需要完美的真实片刻，它会成为你的人格碎片。",
  examples: ["一个人认真听完我说废话", "凌晨便利店门口的暖灯", "朋友没有追问，只是陪我走了一段"],
};

export const themes = [
  { id: "theme_001", title: "深夜电台", count: 28, note: "适合慢慢聊起的人" },
  { id: "theme_002", title: "城市散步", count: 34, note: "从路线和生活半径开始" },
  { id: "theme_003", title: "慢热关系", count: 19, note: "给不急着证明的人" },
  { id: "theme_004", title: "周末出逃", count: 23, note: "把好奇心留给小旅行" },
];
