export type RelationshipStage =
  | 'stranger'
  | 'echo'
  | 'resonance'
  | 'closer'
  | 'reveal';

export type AppView = 'discover' | 'circle' | 'create' | 'messages' | 'mine';

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
  membership: 'free' | 'heart_plus';
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
  topicId: string;
  prompt: string;
  answer: string;
  mood: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
};

export type Topic = {
  id: string;
  name: string;
  description: string;
  participants: number;
};

export type PostComment = {
  id: string;
  fragmentId: string;
  author: string;
  body: string;
  likes: number;
  createdAt: string;
  replies: {
    id: string;
    author: string;
    body: string;
    likes: number;
    createdAt: string;
  }[];
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
  fragments: string[];
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
  state:
    | 'sealed'
    | 'opening'
    | 'first_layer'
    | 'second_layer'
    | 'echo_sent'
    | 'matched';
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
  sender: 'me' | 'them' | 'system';
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
  status: 'ready' | 'pending' | 'claimed';
  reward: string;
};

export const stageMeta: Record<
  RelationshipStage,
  { label: string; unlock: string; tone: string }
> = {
  stranger: {
    label: '陌生',
    unlock: '第一段人格碎片',
    tone: '你们还隔着一层信封，先不用急着说明自己是谁。',
  },
  echo: {
    label: '回声',
    unlock: '新的生活片段',
    tone: '你们留下了彼此的回声，可以慢慢听见更多细节。',
  },
  resonance: {
    label: '共鸣',
    unlock: '关系观与相处方式',
    tone: '对话开始有了共同语境，但真实身份仍然被保护。',
  },
  closer: {
    label: '靠近',
    unlock: '有限真实信息请求',
    tone: '你们可以认真确认是否想再靠近一点。',
  },
  reveal: {
    label: '揭晓',
    unlock: '双方同意后的有限资料',
    tone: '只有双向选择才会进入揭晓。',
  },
};

export const currentUser: User = {
  id: 'user_me',
  handle: 'lq',
  ageVerified: true,
  membership: 'free',
};

export const profiles: Profile[] = [
  {
    id: 'profile_me',
    userId: 'user_me',
    displayName: '月台来信',
    ageRange: '25-29',
    city: '上海',
    pronouns: 'TA',
    safetyNote: '只展示城市，不公开精确定位和外部联系方式。',
  },
  {
    id: 'profile_001',
    userId: 'user_001',
    displayName: '小明',
    ageRange: '23-26',
    city: '杭州',
    pronouns: 'TA',
    safetyNote: '愿意慢慢聊，揭晓前不交换联系方式。',
  },
  {
    id: 'profile_002',
    userId: 'user_002',
    displayName: '小花',
    ageRange: '27-31',
    city: '成都',
    pronouns: 'TA',
    safetyNote: '线下见面前希望先建立稳定聊天。',
  },
  {
    id: 'profile_003',
    userId: 'user_003',
    displayName: '小刘',
    ageRange: '24-29',
    city: '南京',
    pronouns: 'TA',
    safetyNote: '慢热，偏好先匿名聊一阵。',
  },
  {
    id: 'profile_004',
    userId: 'user_004',
    displayName: '小陈',
    ageRange: '22-27',
    city: '广州',
    pronouns: 'TA',
    safetyNote: '不接受催促见面，愿意从日常开始。',
  },
  {
    id: 'profile_005',
    userId: 'user_005',
    displayName: '小林',
    ageRange: '26-30',
    city: '北京',
    pronouns: 'TA',
    safetyNote: '揭晓前不交换工作单位和联系方式。',
  },
];

export const personalityCards: PersonalityCard[] = [
  {
    id: 'card_me',
    userId: 'user_me',
    alias: '月台来信',
    archetype: '慢热观察者',
    interests: ['独立电影', '城市散步', '小酒馆', '心理学'],
    relationshipValues: ['边界感', '认真回复', '不急着证明'],
    completeness: 82,
    quote: '希望先确认能不能自然地说废话，再谈心动。',
  },
  {
    id: 'card_001',
    userId: 'user_001',
    alias: '小明',
    archetype: '城市文艺型',
    interests: ['播客', '咖啡', '展览', 'Livehouse'],
    relationshipValues: ['轻松表达', '尊重节奏', '稳定好奇'],
    completeness: 91,
    quote: '我喜欢让关系自然长出来，而不是把每一次聊天都变成考试。',
  },
  {
    id: 'card_002',
    userId: 'user_002',
    alias: '小花',
    archetype: '户外行动型',
    interests: ['徒步', '菜市场', '爵士', '做饭'],
    relationshipValues: ['行动力', '稳定在场', '不催促'],
    completeness: 88,
    quote: '收藏了很多想去的地方，但真正出发的时候总是一个人。',
  },
  {
    id: 'card_003',
    userId: 'user_003',
    alias: '小刘',
    archetype: '慢热安静型',
    interests: ['独立电影', '心理学', '深夜散步'],
    relationshipValues: ['边界感', '认真倾听', '不急着定义'],
    completeness: 86,
    quote: '体贴不是把人围住，而是知道什么时候靠近。',
  },
  {
    id: 'card_004',
    userId: 'user_004',
    alias: '小陈',
    archetype: '幽默松弛型',
    interests: ['脱口秀', '骑车', '路边摊', '冷笑话'],
    relationshipValues: ['能一起笑', '低压力', '真诚但不沉重'],
    completeness: 83,
    quote: '我能把很糟的一天讲成段子，但也希望有人听懂我在逞强。',
  },
  {
    id: 'card_005',
    userId: 'user_005',
    alias: '小林',
    archetype: '理性克制型',
    interests: ['建筑', '纪录片', '长跑', '手冲咖啡'],
    relationshipValues: ['清楚沟通', '尊重隐私', '长期主义'],
    completeness: 89,
    quote: '比起热闹，我更相信一个人愿意稳定地出现。',
  },
];

export const personalityFragments: PersonalityFragment[] = [
  {
    id: 'fragment_daily_me',
    userId: 'user_me',
    topicId: 'topic_heart',
    prompt: '最近一次让你心动是什么时候？',
    answer:
      '下班路上有人把伞往陌生人那边偏了一点。没有对视，但那一秒城市变软了。',
    mood: '柔软',
    tags: ['#最近一次心动', '#深夜才会说的话'],
    likes: 36,
    comments: 8,
    createdAt: '今天 20:12',
  },
  {
    id: 'fragment_001',
    userId: 'user_001',
    topicId: 'topic_walk',
    prompt: '如果今晚有人陪你散步，你想去哪里？',
    answer:
      '想沿着河边走，不安排目的地。最好两个人都不用急着找话题，偶尔说一句也够。',
    mood: '松弛',
    tags: ['#如果不先看照片', '#慢热的人怎么开始一段关系'],
    likes: 128,
    comments: 21,
    createdAt: '今天 18:44',
  },
  {
    id: 'fragment_002',
    userId: 'user_002',
    topicId: 'topic_alone',
    prompt: '你认为舒服的关系是什么样？',
    answer:
      '是可以不同频，但不互相消耗。忙的时候各自生活，靠近的时候认真在场。',
    mood: '清醒',
    tags: ['#你什么时候开始喜欢一个人生活', '#舒服的关系是什么'],
    likes: 96,
    comments: 14,
    createdAt: '昨天 23:08',
  },
  {
    id: 'fragment_003',
    userId: 'user_003',
    topicId: 'topic_slow',
    prompt: '你最容易被什么样的细节打动？',
    answer:
      '记得我随口说过不吃香菜，也记得给自己留一点空间。体贴不是把人围住。',
    mood: '笃定',
    tags: ['#慢热的人怎么开始一段关系', '#舒服的关系是什么'],
    likes: 74,
    comments: 12,
    createdAt: '昨天 21:31',
  },
  {
    id: 'fragment_004',
    userId: 'user_004',
    topicId: 'topic_night',
    prompt: '如果今晚有人陪你散步，你想去哪里？',
    answer:
      '去那条很多坡的路。走累了就买两瓶汽水，坐在便利店门口假装我们在拍青春片。',
    mood: '轻快',
    tags: ['#深夜才会说的话', '#如果今晚有人陪你散步'],
    likes: 41,
    comments: 5,
    createdAt: '昨天 19:06',
  },
  {
    id: 'fragment_005',
    userId: 'user_005',
    topicId: 'topic_alone',
    prompt: '你认为舒服的关系是什么样？',
    answer:
      '是两个人都不用靠消失来证明自由。忙的时候说一声，回来以后还接得上话。',
    mood: '克制',
    tags: ['#你什么时候开始喜欢一个人生活', '#舒服的关系是什么'],
    likes: 52,
    comments: 6,
    createdAt: '周五 22:40',
  },
  {
    id: 'fragment_006',
    userId: 'user_002',
    topicId: 'topic_trip',
    prompt: '最近一次让你心动是什么时候？',
    answer: '爬到半山腰时对面递来一颗橘子，没有问我累不累，只说先吃点甜的。',
    mood: '明亮',
    tags: ['#一个人旅行会上瘾吗', '#最近一次心动'],
    likes: 47,
    comments: 4,
    createdAt: '周五 17:18',
  },
];

export const blindBoxes: BlindBox[] = [
  {
    id: 'box_001',
    ownerUserId: 'user_001',
    title: '河边没有目的地',
    theme: '深夜电台',
    seal: '今晚 23:00 前有效',
    cityHint: '华东城市',
    ageHint: '23-26',
    hiddenTags: ['播客', '咖啡', '周末出逃'],
    echoScore: 92,
    fragments: [
      '下雨的时候我反而喜欢不打伞走一小段。',
      '比起一起吃饭，我可能更想和一个人漫无目的走两个小时。',
      '我会把喜欢的展览票根夹进书里，但很少主动讲给别人听。',
      '舒服的沉默对我来说，比漂亮的开场白更难得。',
    ],
    firstLayer: {
      alias: '小明',
      archetype: '城市文艺型',
      fragment: '最好两个人都不用急着找话题，偶尔说一句也够。',
      interests: ['播客', '河边散步', '展览'],
    },
    secondLayer: {
      relationshipView: '喜欢自然长出来的关系，不想把聊天变成考试。',
      boundary: '揭晓前不交换微信和精确地址。',
      promptAnswer: '舒服的关系是可以沉默，也可以突然认真聊一个小时。',
    },
  },
  {
    id: 'box_002',
    ownerUserId: 'user_002',
    title: '周三也想逃离地面',
    theme: '城市散步',
    seal: '今日推荐',
    cityHint: '西南城市',
    ageHint: '27-31',
    hiddenTags: ['书店', '爵士', '做饭'],
    echoScore: 86,
    fragments: [
      '收藏了很多想去的地方，但真正出发的时候总是一个人。',
      '我会在出门前查好路线，也会在路上临时改主意。',
      '比起打卡，我更喜欢记住某个转弯处的风。',
      '做饭时如果有人负责洗菜，我会觉得那天已经很亲密。',
    ],
    firstLayer: {
      alias: '小花',
      archetype: '户外行动型',
      fragment:
        '爬到半山腰时对面递来一颗橘子，没有问我累不累，只说先吃点甜的。',
      interests: ['徒步', '菜市场', '做饭'],
    },
    secondLayer: {
      relationshipView: '重视稳定、边界和幽默感。',
      boundary: '不接受催促揭晓或连续轰炸式消息。',
      promptAnswer: '理想的周末是逛菜场、做饭、看一部不太热门的电影。',
    },
  },
  {
    id: 'box_003',
    ownerUserId: 'user_003',
    title: '给慢热的人一盏灯',
    theme: '慢热关系',
    seal: '新鲜投递',
    cityHint: '同城附近',
    ageHint: '24-29',
    hiddenTags: ['独立电影', '心理学', 'Livehouse'],
    echoScore: 89,
    fragments: [
      '我回复慢不是冷淡，是需要把感受放清楚再递出去。',
      '下班后最想去的地方，是能听见自己呼吸的路。',
      '我不太会热场，但会记得你上次没说完的那句话。',
      '体贴不是把人围住，而是知道什么时候靠近。',
    ],
    firstLayer: {
      alias: '小刘',
      archetype: '慢热安静型',
      fragment: '我回复慢不是冷淡，是需要把感受放清楚再递出去。',
      interests: ['独立电影', '心理学', 'Livehouse'],
    },
    secondLayer: {
      relationshipView: '希望两个人都能保留自己的生活，同时认真回应彼此。',
      boundary: '线下见面前需要足够多的匿名聊天。',
      promptAnswer:
        '最近心动是看到一个人认真听完朋友很长的倾诉，没有急着给建议。',
    },
  },
  {
    id: 'box_004',
    ownerUserId: 'user_004',
    title: '便利店门口的汽水',
    theme: '轻松回声',
    seal: '今晚新投递',
    cityHint: '华南城市',
    ageHint: '22-27',
    hiddenTags: ['骑车', '脱口秀', '路边摊'],
    echoScore: 84,
    fragments: [
      '我能把很糟的一天讲成段子，但也希望有人听懂我在逞强。',
      '去很多坡的路散步，走累了就买汽水坐一会儿。',
      '喜欢开玩笑，但不拿别人的认真开玩笑。',
      '如果两个人都能放松地尴尬，我会觉得很安全。',
    ],
    firstLayer: {
      alias: '小陈',
      archetype: '幽默松弛型',
      fragment: '我能把很糟的一天讲成段子，但也希望有人听懂我在逞强。',
      interests: ['脱口秀', '骑车', '路边摊'],
    },
    secondLayer: {
      relationshipView:
        '希望关系轻一点，但不是随便。能一起笑，也能认真接住彼此。',
      boundary: '不喜欢试探式冷暴力，也不想太早被要求给承诺。',
      promptAnswer: '今晚想去很多坡的路，走累了就买汽水坐在便利店门口。',
    },
  },
  {
    id: 'box_005',
    ownerUserId: 'user_005',
    title: '北窗留着一盏灯',
    theme: '克制心动',
    seal: '适合慢读',
    cityHint: '北方城市',
    ageHint: '26-30',
    hiddenTags: ['建筑', '长跑', '纪录片'],
    echoScore: 81,
    fragments: [
      '我不太相信突如其来的热烈，但相信一个人愿意稳定地出现。',
      '跑步到第七公里时，脑子里反而会变得很安静。',
      '喜欢看建筑，不是因为宏大，是因为每扇窗都暗示着一种生活。',
      '舒服的关系是不靠消失证明自由，回来以后还接得上话。',
    ],
    firstLayer: {
      alias: '小林',
      archetype: '理性克制型',
      fragment: '我不太相信突如其来的热烈，但相信一个人愿意稳定地出现。',
      interests: ['建筑', '纪录片', '长跑'],
    },
    secondLayer: {
      relationshipView:
        '重视清楚沟通和稳定边界。慢一点没有关系，但不要失联式试探。',
      boundary: '揭晓前不会提供工作单位、联系方式或精确住址。',
      promptAnswer: '舒服的关系是忙的时候说一声，回来以后还接得上话。',
    },
  },
];

export const relationships: Relationship[] = [
  {
    id: 'rel_001',
    userAId: 'user_me',
    userBId: 'user_001',
    stage: 'resonance',
    progress: 64,
    alias: '小明',
    unlockedFragments: ['河边没有目的地', '舒服的关系是不急着证明'],
    nextUnlock: '再多认识一点，也许会听见新的回声。',
    revealRequestedByMe: false,
    revealRequestedByThem: true,
  },
  {
    id: 'rel_002',
    userAId: 'user_me',
    userBId: 'user_002',
    stage: 'echo',
    progress: 38,
    alias: '小花',
    unlockedFragments: ['忙的时候各自生活，靠近时认真在场'],
    nextUnlock: '如果你们都愿意停留，下一段生活片段会自然出现。',
    revealRequestedByMe: false,
    revealRequestedByThem: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'convo_001',
    relationshipId: 'rel_001',
    unread: 2,
    messages: [
      {
        id: 'msg_001',
        sender: 'them',
        body: '我抽到了你的卡片，那个“自然地说废话”有点打中我。',
        createdAt: '20:16',
      },
      {
        id: 'msg_002',
        sender: 'me',
        body: '那我们先从废话开始：今天你路过的天空是什么颜色？',
        createdAt: '20:18',
      },
      {
        id: 'msg_003',
        sender: 'them',
        body: '偏灰蓝，但下班路上的灯很暖。你呢？',
        createdAt: '20:21',
      },
      {
        id: 'msg_004',
        sender: 'system',
        body: '你们已进入「共鸣」阶段，解锁一张新的人格碎片。',
        createdAt: '20:24',
      },
    ],
  },
];

export const topics: Topic[] = [
  {
    id: 'topic_heart',
    name: '#最近一次心动',
    description: '那些很小、但让你突然停一下的瞬间。',
    participants: 182,
  },
  {
    id: 'topic_alone',
    name: '#你什么时候开始喜欢一个人生活',
    description: '关于独处、自由和仍然想被理解的矛盾时刻。',
    participants: 146,
  },
  {
    id: 'topic_slow',
    name: '#慢热的人怎么开始一段关系',
    description: '慢一点靠近，也可以是认真对待关系的方式。',
    participants: 119,
  },
  {
    id: 'topic_night',
    name: '#深夜才会说的话',
    description: '白天说不出口的东西，有时会在夜里变轻。',
    participants: 98,
  },
  {
    id: 'topic_trip',
    name: '#一个人旅行会上瘾吗',
    description: '出发、绕路、临时改主意，以及想有人一起看的风景。',
    participants: 87,
  },
  {
    id: 'topic_walk',
    name: '#如果不先看照片',
    description: '先被一句话吸引，再决定要不要认识一个人。',
    participants: 154,
  },
  {
    id: 'topic_stroll',
    name: '#如果今晚有人陪你散步',
    description: '关于夜路、城市、沉默和那些不用刻意找话题的人。',
    participants: 103,
  },
  {
    id: 'topic_comfort',
    name: '#舒服的关系是什么',
    description: '不消耗、不表演，也不靠忽冷忽热证明吸引。',
    participants: 137,
  },
];

export const postComments: PostComment[] = [
  {
    id: 'comment_001',
    fragmentId: 'fragment_001',
    author: '小陈',
    body: '“偶尔说一句也够”这句很懂，散步有时候就是不用表演。',
    likes: 12,
    createdAt: '18:52',
    replies: [
      {
        id: 'reply_001',
        author: '小明',
        body: '对，我有点怕把聊天变成汇报。',
        likes: 5,
        createdAt: '18:56',
      },
    ],
  },
  {
    id: 'comment_002',
    fragmentId: 'fragment_002',
    author: '小林',
    body: '不同频但不互相消耗，这个标准其实挺难得。',
    likes: 9,
    createdAt: '23:18',
    replies: [],
  },
  {
    id: 'comment_003',
    fragmentId: 'fragment_004',
    author: '小花',
    body: '便利店门口那种停一下的感觉，比精心安排更像约会。',
    likes: 7,
    createdAt: '19:20',
    replies: [
      {
        id: 'reply_002',
        author: '小陈',
        body: '对，最好汽水还要是冰的。',
        likes: 3,
        createdAt: '19:22',
      },
    ],
  },
];

export const wallet: Wallet = {
  userId: 'user_me',
  dailyFreeOpensRemaining: 1,
  dailyFreeOpensLimit: 3,
  hearts: 42,
  heartPlus: {
    active: false,
    label: '未开通',
    benefits: ['更多每日免费拆盒', '高级筛选', '悔拆 / 找回', '特殊主题盲盒'],
  },
};

export const invite: Invite = {
  id: 'invite_001',
  userId: 'user_me',
  code: 'HEART-LQ-0829',
  link: 'https://heartbox.app/i/HEART-LQ-0829',
  shareTitle: '给你留了一个 Heartbox 盲盒',
  shareMessage:
    '有人觉得这里有一个你会想认识的人。先别急着看脸，拆开一段人格碎片。',
};

export const referralRewards: ReferralReward[] = [
  {
    id: 'reward_001',
    inviteId: 'invite_001',
    title: '第 1 位朋友完成人格卡',
    status: 'claimed',
    reward: '+1 次免费拆盒',
  },
  {
    id: 'reward_002',
    inviteId: 'invite_001',
    title: '第 3 位朋友通过有效注册',
    status: 'ready',
    reward: '+16 Heart',
  },
  {
    id: 'reward_003',
    inviteId: 'invite_001',
    title: '第 5 位朋友发出第一张人格碎片',
    status: 'pending',
    reward: '特殊主题盲盒',
  },
];

export const dailyPrompt = {
  title: '最近一次让你心动是什么时候？',
  helper: '写一段不需要完美的真实片刻，它会成为你的人格碎片。',
  examples: [
    '一个人认真听完我说废话',
    '凌晨便利店门口的暖灯',
    '朋友没有追问，只是陪我走了一段',
  ],
};

export const themes = [
  {
    id: 'theme_001',
    title: '今晚还没睡的人',
    count: 28,
    note: '适合慢慢聊起',
  },
  {
    id: 'theme_002',
    title: '最近也想出去走走的人',
    count: 34,
    note: '从生活半径开始',
  },
  {
    id: 'theme_003',
    title: '慢热的人',
    count: 19,
    note: '不急着证明自己',
  },
  {
    id: 'theme_004',
    title: '一个人旅行过的人',
    count: 23,
    note: '把好奇留给路上',
  },
];
