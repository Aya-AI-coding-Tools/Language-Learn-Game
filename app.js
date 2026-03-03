/* ============================================
   LinguaQuest v2.0 - app.js
   Complete Rewrite with Mission Timer,
   AI Scheduler, Dashboard, Analytics
   ============================================ */

// ======================================================
// SECTION 1: DATA DEFINITIONS
// ======================================================

const VERSION = 'v2.0.0';

// --- Level: flat 100 XP per level ---
function expForLevel(lv) {
  return 100;
}
function totalExpForLevel(lv) {
  return (lv - 1) * 100;
}

const TITLES = [
  { level: 1, title: '見習い冒険者' },
  { level: 5, title: '駆け出しの学徒' },
  { level: 10, title: '言葉の探索者' },
  { level: 15, title: '知識の狩人' },
  { level: 20, title: '文法の守護者' },
  { level: 25, title: '語彙の魔術師' },
  { level: 30, title: '多言語の賢者' },
  { level: 40, title: '言霊の大魔導士' },
  { level: 50, title: '伝説の言語マスター' },
];

function getTitle(lv) {
  let t = TITLES[0].title;
  for (const ti of TITLES) {
    if (lv >= ti.level) t = ti.title;
  }
  return t;
}

// --- Missions Definition ---
const MISSIONS = [
  {
    id: 'italianoplus',
    name: 'ItalianoPlus 読書',
    desc: 'italianoplus.comで1ページ読書',
    language: 'italian',
    skill: 'reading',
    xp: 30,
    timerType: 'manual', // manual = button press per unit
    unit: '1ページ',
    url: 'https://italianoplus.com/',
    icon: '📖',
  },
  {
    id: 'chatgpt_italian',
    name: 'ChatGPT イタリア語',
    desc: 'ChatGPTで文法・スピーキング・リスニング練習',
    language: 'italian',
    skill: 'grammar',
    xp: 30,
    timerType: 'countdown',
    timerSeconds: 600, // 10min
    unit: '10分',
    url: 'https://chat.openai.com/',
    icon: '🤖',
  },
  {
    id: 'memrise_italian',
    name: 'Memrise イタリア語',
    desc: 'Memriseでイタリア語を学習',
    language: 'italian',
    skill: 'vocab',
    xp: 30,
    timerType: 'countdown',
    timerSeconds: 600,
    unit: '10分',
    url: 'https://www.memrise.com/',
    icon: '🧠',
  },
  {
    id: 'elsa_speak',
    name: 'ELSA SPEAK',
    desc: 'ELSA SPEAKで英語の体系的学習',
    language: 'english',
    skill: 'speaking',
    xp: 30,
    timerType: 'countdown',
    timerSeconds: 600,
    unit: '10分',
    url: 'https://elsaspeak.com/',
    icon: '🗣️',
  },
  {
    id: 'hello_ear',
    name: 'HelloEAR',
    desc: 'HelloEARで英作文の練習',
    language: 'english',
    skill: 'writing',
    xp: 50,
    timerType: 'countdown',
    timerSeconds: 600,
    unit: '10分',
    url: 'https://www.helloear.com/',
    icon: '✍️',
  },
  {
    id: 'cantonese_class',
    name: 'CantoneseClass101',
    desc: 'CantoneseClass101で広東語を学習',
    language: 'cantonese',
    skill: 'listening',
    xp: 30,
    timerType: 'countdown',
    timerSeconds: 600,
    unit: '10分',
    url: 'https://www.cantoneseclass101.com/',
    icon: '🎧',
  },
  {
    id: 'passive_listening',
    name: '聞き流し',
    desc: '音声を聞き流して耳を慣らす',
    language: 'all',
    skill: 'listening',
    xp: 20,
    timerType: 'countdown',
    timerSeconds: 1800, // 30min
    unit: '30分',
    url: '',
    icon: '🎵',
  },
];

// --- Ancestries (kept from v1, abbreviated here for space) ---
const ANCESTRIES = [
  {
    id: 'human',
    name: 'ヒューマン',
    desc: '適応力に優れた万能種族',
    heritages: [
      {
        id: 'versatile',
        name: '万能の血統',
        bonus: { type: 'exp_all', value: 0.05 },
        desc: '全EXP+5%',
      },
      {
        id: 'skilled',
        name: '技巧の血統',
        bonus: { type: 'skill_unlock_discount', value: 1 },
        desc: 'スキル解放コスト-1',
      },
    ],
  },
  {
    id: 'elf',
    name: 'エルフ',
    desc: '長命で知識に秀でた種族',
    heritages: [
      {
        id: 'ancient',
        name: '古代エルフ',
        bonus: { type: 'exp_vocab', value: 0.1 },
        desc: '語彙EXP+10%',
      },
      {
        id: 'woodland',
        name: '森林エルフ',
        bonus: { type: 'exp_listening', value: 0.1 },
        desc: 'リスニングEXP+10%',
      },
      {
        id: 'high',
        name: 'ハイエルフ',
        bonus: { type: 'exp_grammar', value: 0.1 },
        desc: '文法EXP+10%',
      },
    ],
  },
  {
    id: 'dwarf',
    name: 'ドワーフ',
    desc: '頑強で忍耐力のある種族',
    heritages: [
      {
        id: 'forge',
        name: '鍛冶ドワーフ',
        bonus: { type: 'gold_bonus', value: 0.1 },
        desc: 'ゴールド+10%',
      },
      {
        id: 'deep',
        name: '深層ドワーフ',
        bonus: { type: 'exp_reading', value: 0.1 },
        desc: '読解EXP+10%',
      },
    ],
  },
  {
    id: 'halfling',
    name: 'ハーフリング',
    desc: '幸運と器用さの種族',
    heritages: [
      {
        id: 'lucky',
        name: '幸運のハーフリング',
        bonus: { type: 'crit_exp', value: 0.08 },
        desc: 'EXPクリティカル率+8%',
      },
      {
        id: 'nimble',
        name: '俊敏のハーフリング',
        bonus: { type: 'quest_speed', value: 0.1 },
        desc: 'クエスト完了速度+10%',
      },
    ],
  },
  {
    id: 'gnome',
    name: 'ノーム',
    desc: '好奇心旺盛な発明種族',
    heritages: [
      {
        id: 'tinker',
        name: '発明ノーム',
        bonus: { type: 'exp_writing', value: 0.1 },
        desc: 'ライティングEXP+10%',
      },
      {
        id: 'forest',
        name: '森のノーム',
        bonus: { type: 'exp_speaking', value: 0.08 },
        desc: 'スピーキングEXP+8%',
      },
    ],
  },
  {
    id: 'orc',
    name: 'オーク',
    desc: '力強さと闘志の種族',
    heritages: [
      {
        id: 'hold',
        name: '砦オーク',
        bonus: { type: 'exp_all', value: 0.03 },
        desc: '全EXP+3%',
      },
      {
        id: 'badlands',
        name: '荒地オーク',
        bonus: { type: 'streak_bonus', value: 0.15 },
        desc: '連続ボーナス+15%',
      },
      {
        id: 'deep',
        name: '深淵オーク',
        bonus: { type: 'boss_exp', value: 0.2 },
        desc: 'ボス報酬EXP+20%',
      },
    ],
  },
  {
    id: 'goblin',
    name: 'ゴブリン',
    desc: '素早さと狡猾さの種族',
    heritages: [
      {
        id: 'irongut',
        name: '鉄腹ゴブリン',
        bonus: { type: 'gold_bonus', value: 0.15 },
        desc: 'ゴールド+15%',
      },
      {
        id: 'razortooth',
        name: '鋭牙ゴブリン',
        bonus: { type: 'exp_speaking', value: 0.1 },
        desc: 'スピーキングEXP+10%',
      },
    ],
  },
  {
    id: 'kitsune',
    name: 'キツネ',
    desc: '変化の術を持つ狐種族',
    heritages: [
      {
        id: 'celestial',
        name: '天狐',
        bonus: { type: 'exp_grammar', value: 0.12 },
        desc: '文法EXP+12%',
      },
      {
        id: 'dark',
        name: '闇狐',
        bonus: { type: 'night_bonus', value: 0.2 },
        desc: '夜間EXP+20%',
      },
    ],
  },
  {
    id: 'catfolk',
    name: 'キャットフォーク',
    desc: '猫のような俊敏種族',
    heritages: [
      {
        id: 'clawed',
        name: '爪キャットフォーク',
        bonus: { type: 'crit_exp', value: 0.1 },
        desc: 'EXPクリティカル率+10%',
      },
      {
        id: 'hunting',
        name: '狩猟キャットフォーク',
        bonus: { type: 'quest_speed', value: 0.12 },
        desc: 'クエスト完了速度+12%',
      },
    ],
  },
  {
    id: 'tengu',
    name: 'テング',
    desc: '鳥人の知恵深い種族',
    heritages: [
      {
        id: 'stormborn',
        name: '嵐のテング',
        bonus: { type: 'exp_listening', value: 0.12 },
        desc: 'リスニングEXP+12%',
      },
      {
        id: 'skyborn',
        name: '天空テング',
        bonus: { type: 'exp_all', value: 0.04 },
        desc: '全EXP+4%',
      },
    ],
  },
  {
    id: 'android',
    name: 'アンドロイド',
    desc: '精密な思考の機械種族',
    heritages: [
      {
        id: 'laborer',
        name: '労働型',
        bonus: { type: 'exp_writing', value: 0.12 },
        desc: 'ライティングEXP+12%',
      },
      {
        id: 'scholar',
        name: '学者型',
        bonus: { type: 'exp_reading', value: 0.12 },
        desc: '読解EXP+12%',
      },
    ],
  },
  {
    id: 'leshy',
    name: 'レッシー',
    desc: '植物から生まれた精霊種族',
    heritages: [
      {
        id: 'leaf',
        name: '葉のレッシー',
        bonus: { type: 'exp_vocab', value: 0.08 },
        desc: '語彙EXP+8%',
      },
      {
        id: 'fungus',
        name: '菌のレッシー',
        bonus: { type: 'night_bonus', value: 0.15 },
        desc: '夜間EXP+15%',
      },
    ],
  },
  {
    id: 'sprite',
    name: 'スプライト',
    desc: '妖精界の極小種族',
    heritages: [
      {
        id: 'dragonfly',
        name: 'トンボスプライト',
        bonus: { type: 'exp_speaking', value: 0.12 },
        desc: 'スピーキングEXP+12%',
      },
      {
        id: 'grig',
        name: 'グリグスプライト',
        bonus: { type: 'gold_bonus', value: 0.12 },
        desc: 'ゴールド+12%',
      },
    ],
  },
];

// --- Classes (kept from v1, abbreviated) ---
const CLASSES = [
  {
    id: 'fighter',
    name: 'ファイター',
    desc: '前線の戦士',
    subclasses: [
      {
        id: 'champion',
        name: 'チャンピオン',
        bonus: { type: 'exp_all', value: 0.03 },
        desc: '全EXP+3%',
      },
      {
        id: 'duelist',
        name: 'デュエリスト',
        bonus: { type: 'streak_bonus', value: 0.1 },
        desc: '連続ボーナス+10%',
      },
    ],
  },
  {
    id: 'wizard',
    name: 'ウィザード',
    desc: '知識と魔法の探究者',
    subclasses: [
      {
        id: 'evoker',
        name: '力術師',
        bonus: { type: 'exp_grammar', value: 0.1 },
        desc: '文法EXP+10%',
      },
      {
        id: 'diviner',
        name: '占術師',
        bonus: { type: 'exp_reading', value: 0.1 },
        desc: '読解EXP+10%',
      },
    ],
  },
  {
    id: 'rogue',
    name: 'ローグ',
    desc: '隠密と技巧の達人',
    subclasses: [
      {
        id: 'thief',
        name: 'シーフ',
        bonus: { type: 'gold_bonus', value: 0.15 },
        desc: 'ゴールド+15%',
      },
      {
        id: 'mastermind',
        name: 'マスターマインド',
        bonus: { type: 'exp_vocab', value: 0.1 },
        desc: '語彙EXP+10%',
      },
    ],
  },
  {
    id: 'bard',
    name: 'バード',
    desc: '歌と物語の魔法使い',
    subclasses: [
      {
        id: 'maestro',
        name: 'マエストロ',
        bonus: { type: 'exp_speaking', value: 0.12 },
        desc: 'スピーキングEXP+12%',
      },
      {
        id: 'polymath',
        name: 'ポリマス',
        bonus: { type: 'exp_all', value: 0.05 },
        desc: '全EXP+5%',
      },
    ],
  },
  {
    id: 'cleric',
    name: 'クレリック',
    desc: '信仰と癒しの司祭',
    subclasses: [
      {
        id: 'warpriest',
        name: '戦司祭',
        bonus: { type: 'exp_all', value: 0.04 },
        desc: '全EXP+4%',
      },
      {
        id: 'cloistered',
        name: '修道院司祭',
        bonus: { type: 'exp_writing', value: 0.1 },
        desc: 'ライティングEXP+10%',
      },
    ],
  },
  {
    id: 'ranger',
    name: 'レンジャー',
    desc: '自然と追跡の達人',
    subclasses: [
      {
        id: 'hunter',
        name: 'ハンター',
        bonus: { type: 'quest_speed', value: 0.12 },
        desc: 'クエスト完了速度+12%',
      },
      {
        id: 'warden',
        name: 'ウォーデン',
        bonus: { type: 'exp_listening', value: 0.1 },
        desc: 'リスニングEXP+10%',
      },
    ],
  },
  {
    id: 'monk',
    name: 'モンク',
    desc: '肉体と精神の鍛錬者',
    subclasses: [
      {
        id: 'sensei',
        name: '先生',
        bonus: { type: 'exp_grammar', value: 0.08 },
        desc: '文法EXP+8%',
      },
      {
        id: 'student',
        name: '修行者',
        bonus: { type: 'streak_bonus', value: 0.12 },
        desc: '連続ボーナス+12%',
      },
    ],
  },
  {
    id: 'druid',
    name: 'ドルイド',
    desc: '大自然の守護者',
    subclasses: [
      {
        id: 'storm',
        name: '嵐のドルイド',
        bonus: { type: 'exp_listening', value: 0.12 },
        desc: 'リスニングEXP+12%',
      },
      {
        id: 'wild',
        name: '野生ドルイド',
        bonus: { type: 'night_bonus', value: 0.15 },
        desc: '夜間EXP+15%',
      },
    ],
  },
  {
    id: 'sorcerer',
    name: 'ソーサラー',
    desc: '生まれながらの魔力の持ち主',
    subclasses: [
      {
        id: 'imperial',
        name: '帝国血統',
        bonus: { type: 'exp_grammar', value: 0.12 },
        desc: '文法EXP+12%',
      },
      {
        id: 'aberrant',
        name: '異常血統',
        bonus: { type: 'crit_exp', value: 0.1 },
        desc: 'EXPクリティカル率+10%',
      },
    ],
  },
  {
    id: 'barbarian',
    name: 'バーバリアン',
    desc: '怒りの力を操る戦士',
    subclasses: [
      {
        id: 'fury',
        name: '激怒の狂戦士',
        bonus: { type: 'boss_exp', value: 0.2 },
        desc: 'ボス報酬EXP+20%',
      },
      {
        id: 'spirit',
        name: '霊魂の狂戦士',
        bonus: { type: 'exp_vocab', value: 0.08 },
        desc: '語彙EXP+8%',
      },
    ],
  },
  {
    id: 'alchemist',
    name: 'アルケミスト',
    desc: '薬品と変成の達人',
    subclasses: [
      {
        id: 'bomber',
        name: 'ボマー',
        bonus: { type: 'exp_all', value: 0.04 },
        desc: '全EXP+4%',
      },
      {
        id: 'chirurgeon',
        name: '外科医',
        bonus: { type: 'exp_reading', value: 0.1 },
        desc: '読解EXP+10%',
      },
    ],
  },
  {
    id: 'champion',
    name: 'チャンピオン',
    desc: '神の意志を体現する聖騎士',
    subclasses: [
      {
        id: 'paladin',
        name: 'パラディン',
        bonus: { type: 'exp_all', value: 0.05 },
        desc: '全EXP+5%',
      },
      {
        id: 'redeemer',
        name: 'リディーマー',
        bonus: { type: 'exp_speaking', value: 0.1 },
        desc: 'スピーキングEXP+10%',
      },
    ],
  },
  {
    id: 'investigator',
    name: 'インベスティゲーター',
    desc: '推理と分析の専門家',
    subclasses: [
      {
        id: 'forensic',
        name: '法医学者',
        bonus: { type: 'exp_reading', value: 0.12 },
        desc: '読解EXP+12%',
      },
      {
        id: 'empiricist',
        name: '経験主義者',
        bonus: { type: 'exp_vocab', value: 0.1 },
        desc: '語彙EXP+10%',
      },
    ],
  },
  {
    id: 'swashbuckler',
    name: 'スワッシュバックラー',
    desc: '華麗な剣技の使い手',
    subclasses: [
      {
        id: 'battledancer',
        name: 'バトルダンサー',
        bonus: { type: 'exp_speaking', value: 0.1 },
        desc: 'スピーキングEXP+10%',
      },
      {
        id: 'wit',
        name: 'ウィット',
        bonus: { type: 'gold_bonus', value: 0.12 },
        desc: 'ゴールド+12%',
      },
    ],
  },
  {
    id: 'witch',
    name: 'ウィッチ',
    desc: '使い魔と契約した魔女',
    subclasses: [
      {
        id: 'night',
        name: '夜のウィッチ',
        bonus: { type: 'night_bonus', value: 0.2 },
        desc: '夜間EXP+20%',
      },
      {
        id: 'wild',
        name: '野生のウィッチ',
        bonus: { type: 'exp_writing', value: 0.1 },
        desc: 'ライティングEXP+10%',
      },
    ],
  },
  {
    id: 'psychic',
    name: 'サイキック',
    desc: '精神の力を操る超能力者',
    subclasses: [
      {
        id: 'tangible',
        name: '触覚型',
        bonus: { type: 'exp_vocab', value: 0.12 },
        desc: '語彙EXP+12%',
      },
      {
        id: 'oscillating',
        name: '振動型',
        bonus: { type: 'exp_listening', value: 0.12 },
        desc: 'リスニングEXP+12%',
      },
    ],
  },
  {
    id: 'kineticist',
    name: 'キネティシスト',
    desc: '元素の力を操る術者',
    subclasses: [
      {
        id: 'fire',
        name: '炎の操者',
        bonus: { type: 'crit_exp', value: 0.1 },
        desc: 'EXPクリティカル率+10%',
      },
      {
        id: 'water',
        name: '水の操者',
        bonus: { type: 'exp_grammar', value: 0.1 },
        desc: '文法EXP+10%',
      },
    ],
  },
  {
    id: 'summoner',
    name: 'サモナー',
    desc: '幻獣を召喚する契約者',
    subclasses: [
      {
        id: 'angel',
        name: '天使の召喚師',
        bonus: { type: 'exp_all', value: 0.05 },
        desc: '全EXP+5%',
      },
      {
        id: 'dragon',
        name: '竜の召喚師',
        bonus: { type: 'boss_exp', value: 0.2 },
        desc: 'ボス報酬EXP+20%',
      },
    ],
  },
];

// --- Sphere Nodes (abbreviated, same structure as v1) ---
const SPHERE_NODES = [
  {
    id: 'hub',
    zone: 'core',
    x: 370,
    y: 250,
    label: 'START',
    type: 'hub',
    rarity: 3,
    prereq: [],
    reward: { type: 'unlock', value: 'all' },
    desc: '冒険の起点。すべての道はここから。',
  },
  {
    id: 'v1',
    zone: 'vocab',
    x: 200,
    y: 120,
    label: 'VOC I',
    type: 'skill',
    rarity: 1,
    prereq: ['hub'],
    reward: { type: 'exp', value: 10, cat: 'vocab' },
    desc: '基礎語彙力',
  },
  {
    id: 'v2',
    zone: 'vocab',
    x: 100,
    y: 80,
    label: 'VOC II',
    type: 'skill',
    rarity: 2,
    prereq: ['v1'],
    reward: { type: 'exp', value: 20, cat: 'vocab' },
    desc: '中級語彙力',
  },
  {
    id: 'v3',
    zone: 'vocab',
    x: 50,
    y: 170,
    label: 'VOC III',
    type: 'skill',
    rarity: 3,
    prereq: ['v2'],
    reward: { type: 'exp', value: 30, cat: 'vocab' },
    desc: '上級語彙力',
  },
  {
    id: 'g1',
    zone: 'grammar',
    x: 540,
    y: 120,
    label: 'GRM I',
    type: 'skill',
    rarity: 1,
    prereq: ['hub'],
    reward: { type: 'exp', value: 10, cat: 'grammar' },
    desc: '基礎文法',
  },
  {
    id: 'g2',
    zone: 'grammar',
    x: 640,
    y: 80,
    label: 'GRM II',
    type: 'skill',
    rarity: 2,
    prereq: ['g1'],
    reward: { type: 'exp', value: 20, cat: 'grammar' },
    desc: '中級文法',
  },
  {
    id: 'l1',
    zone: 'listening',
    x: 200,
    y: 380,
    label: 'LSN I',
    type: 'skill',
    rarity: 1,
    prereq: ['hub'],
    reward: { type: 'exp', value: 10, cat: 'listening' },
    desc: '基礎リスニング',
  },
  {
    id: 'l2',
    zone: 'listening',
    x: 100,
    y: 420,
    label: 'LSN II',
    type: 'skill',
    rarity: 2,
    prereq: ['l1'],
    reward: { type: 'exp', value: 20, cat: 'listening' },
    desc: '中級リスニング',
  },
  {
    id: 's1',
    zone: 'speaking',
    x: 540,
    y: 380,
    label: 'SPK I',
    type: 'skill',
    rarity: 1,
    prereq: ['hub'],
    reward: { type: 'exp', value: 10, cat: 'speaking' },
    desc: '基礎スピーキング',
  },
  {
    id: 's2',
    zone: 'speaking',
    x: 640,
    y: 420,
    label: 'SPK II',
    type: 'skill',
    rarity: 2,
    prereq: ['s1'],
    reward: { type: 'exp', value: 20, cat: 'speaking' },
    desc: '中級スピーキング',
  },
  {
    id: 'r1',
    zone: 'reading',
    x: 100,
    y: 250,
    label: 'READ I',
    type: 'skill',
    rarity: 1,
    prereq: ['hub'],
    reward: { type: 'exp', value: 10, cat: 'reading' },
    desc: '基礎読解',
  },
  {
    id: 'w1',
    zone: 'writing',
    x: 640,
    y: 250,
    label: 'WRT I',
    type: 'skill',
    rarity: 1,
    prereq: ['hub'],
    reward: { type: 'exp', value: 10, cat: 'writing' },
    desc: '基礎ライティング',
  },
];

// ======================================================
// SECTION 2: STATE MANAGEMENT
// ======================================================

const STORAGE_KEY = 'linguaquest_v2';

function defaultState() {
  return {
    version: VERSION,
    character: null,
    level: 1,
    exp: 0,
    gold: 0,
    streak: 0,
    lastStudyDate: null,
    sphereUnlocked: ['hub'],
    // Mission logs: array of { missionId, timestamp, xpEarned, language, skill }
    missionLog: [],
    // Today's completion counts per mission
    todayMissions: {},
    todayDate: null,
    // Scheduler
    schedule: {}, // { 'Mon': [{time, missionId, duration}], ... }
    schedulerConfig: {
      dailyMinutes: 120,
      startTime: '09:00',
      priority: 'balanced',
    },
    notifications: { enabled: false, timing: 10 },
    // AI settings
    aiProvider: 'gemini',
    aiKeys: {},
    aiModels: {},
    aiCustomEndpoint: '',
    languages: [
      { code: 'it', name: 'イタリア語' },
      { code: 'en', name: '英語' },
      { code: 'yue', name: '広東語' },
    ],
    // Weakness tracking
    skillStats: {
      vocab: { totalXp: 0, sessions: 0 },
      grammar: { totalXp: 0, sessions: 0 },
      listening: { totalXp: 0, sessions: 0 },
      speaking: { totalXp: 0, sessions: 0 },
      reading: { totalXp: 0, sessions: 0 },
      writing: { totalXp: 0, sessions: 0 },
    },
    langStats: {
      italian: { totalXp: 0, sessions: 0, totalMinutes: 0 },
      english: { totalXp: 0, sessions: 0, totalMinutes: 0 },
      cantonese: { totalXp: 0, sessions: 0, totalMinutes: 0 },
    },
    // Weekly data for heatmap (last 28 days)
    dailyLog: [], // [{date, totalXp, totalMinutes, missions:[]}]
  };
}

let S = defaultState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(S));
  } catch (e) {
    console.warn('Save failed', e);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const loaded = JSON.parse(raw);
      S = Object.assign(defaultState(), loaded);
    }
  } catch (e) {
    console.warn('Load failed', e);
    S = defaultState();
  }
}

// ======================================================
// SECTION 3: UTILITY FUNCTIONS
// ======================================================

function $(id) {
  return document.getElementById(id);
}
function qs(sel) {
  return document.querySelector(sel);
}
function qsa(sel) {
  return document.querySelectorAll(sel);
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function dayOfWeek(dateStr) {
  const d = new Date(dateStr);
  return ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
}

function isNight() {
  const h = new Date().getHours();
  return h >= 20 || h < 6;
}

function showToast(msg, type = 'success') {
  const c = $('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function showXpPopup(xp, x, y) {
  const el = document.createElement('div');
  el.className = 'xp-popup';
  el.textContent = `+${xp} XP`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

function showLevelUp(newLevel) {
  const overlay = document.createElement('div');
  overlay.className = 'levelup-overlay';
  overlay.innerHTML = `<div class="lvup-text">⚔️ LEVEL ${newLevel} ⚔️</div>`;
  document.body.appendChild(overlay);
  showToast(`🎉 レベル${newLevel}に到達！ ${getTitle(newLevel)}`, 'levelup');
  setTimeout(() => overlay.remove(), 2500);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function ensureTodayReset() {
  const today = todayStr();
  if (S.todayDate !== today) {
    S.todayMissions = {};
    S.todayDate = today;
    // Streak check
    if (S.lastStudyDate) {
      const last = new Date(S.lastStudyDate);
      const now = new Date(today);
      const diff = Math.floor((now - last) / 86400000);
      if (diff > 1) S.streak = 0;
    }
    saveState();
  }
}

// ======================================================
// SECTION 4: XP & LEVEL SYSTEM
// ======================================================

function applyBonuses(baseXp, missionDef) {
  let xp = baseXp;
  if (!S.character) return xp;

  const bonuses = [];
  // Heritage bonus
  const anc = ANCESTRIES.find((a) => a.id === S.character.ancestry);
  if (anc) {
    const her = anc.heritages.find((h) => h.id === S.character.heritage);
    if (her) bonuses.push(her.bonus);
  }
  // Subclass bonus
  const cls = CLASSES.find((c) => c.id === S.character.class);
  if (cls) {
    const sub = cls.subclasses.find((s) => s.id === S.character.subclass);
    if (sub) bonuses.push(sub.bonus);
  }

  for (const b of bonuses) {
    if (b.type === 'exp_all') xp *= 1 + b.value;
    if (b.type === `exp_${missionDef.skill}`) xp *= 1 + b.value;
    if (b.type === 'night_bonus' && isNight()) xp *= 1 + b.value;
    if (b.type === 'streak_bonus' && S.streak > 0) xp *= 1 + b.value;
    if (b.type === 'crit_exp' && Math.random() < b.value) xp *= 2; // Critical!
  }

  return Math.round(xp);
}

function grantXp(amount, missionDef, event) {
  const finalXp = applyBonuses(amount, missionDef);
  S.exp += finalXp;

  // Update stats
  if (S.skillStats[missionDef.skill]) {
    S.skillStats[missionDef.skill].totalXp += finalXp;
    S.skillStats[missionDef.skill].sessions += 1;
  }
  const langKey = missionDef.language === 'all' ? null : missionDef.language;
  if (langKey && S.langStats[langKey]) {
    S.langStats[langKey].totalXp += finalXp;
    S.langStats[langKey].sessions += 1;
    S.langStats[langKey].totalMinutes += (missionDef.timerSeconds || 0) / 60;
  }

  // Mission log
  S.missionLog.push({
    missionId: missionDef.id,
    timestamp: Date.now(),
    xpEarned: finalXp,
    language: missionDef.language,
    skill: missionDef.skill,
  });

  // Today counts
  S.todayMissions[missionDef.id] = (S.todayMissions[missionDef.id] || 0) + 1;
  S.lastStudyDate = todayStr();

  // Update daily log
  updateDailyLog(finalXp, missionDef);

  // Level up check
  while (S.exp >= 100) {
    S.exp -= 100;
    S.level += 1;
    showLevelUp(S.level);
  }

  // Streak
  S.streak = Math.max(S.streak, 1);
  const yesterdayStr = new Date(Date.now() - 86400000)
    .toISOString()
    .slice(0, 10);
  if (
    S.lastStudyDate === yesterdayStr ||
    (S.todayMissions && Object.keys(S.todayMissions).length === 1)
  ) {
    // keep streak
  }

  // Show popup
  if (event) {
    showXpPopup(
      finalXp,
      event.clientX || window.innerWidth / 2,
      event.clientY || window.innerHeight / 2,
    );
  }

  showToast(`+${finalXp} XP (${missionDef.name})`, 'xp');
  saveState();
  updateHUD();
}

function updateDailyLog(xp, missionDef) {
  const today = todayStr();
  let entry = S.dailyLog.find((d) => d.date === today);
  if (!entry) {
    entry = { date: today, totalXp: 0, totalMinutes: 0, missions: [] };
    S.dailyLog.push(entry);
  }
  entry.totalXp += xp;
  entry.totalMinutes += (missionDef.timerSeconds || 0) / 60;
  entry.missions.push(missionDef.id);
  // Keep only last 90 days
  if (S.dailyLog.length > 90) S.dailyLog = S.dailyLog.slice(-90);
}

// ======================================================
// SECTION 5: UI - HUD & NAVIGATION
// ======================================================

function updateHUD() {
  $('hud-level').textContent = `Lv.${S.level}`;
  $('hud-exp').textContent = `EXP ${S.exp}/100`;
  $('hud-gold').textContent = `Gold ${S.gold}`;
  $('hud-streak').textContent = `🔥 ${S.streak}日`;
  const now = new Date();
  $('hud-clock').textContent =
    `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function initNavigation() {
  qsa('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      qsa('.nav-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      qsa('.tab-panel').forEach((p) => p.classList.remove('active'));
      const tab = $(`tab-${btn.dataset.tab}`);
      if (tab) tab.classList.add('active');
      // Refresh tab content
      const tabName = btn.dataset.tab;
      if (tabName === 'missions') renderMissions();
      if (tabName === 'scheduler') renderScheduler();
      if (tabName === 'dashboard') renderDashboard();
      if (tabName === 'home') renderHome();
      if (tabName === 'character') renderCharacter();
      if (tabName === 'sphere') renderSphere();
    });
  });
}

// ======================================================
// SECTION 6: MISSIONS + TIMER SYSTEM
// ======================================================

const activeTimers = {}; // { missionId: { interval, remaining, total } }

function renderMissions() {
  const list = $('mission-list');
  if (!list) return;
  list.innerHTML = '';

  for (const m of MISSIONS) {
    const count = S.todayMissions[m.id] || 0;
    const isActive = !!activeTimers[m.id];
    const circumference = 2 * Math.PI * 52; // radius=52 for timer circle

    const card = document.createElement('div');
    card.className = `mission-card ${isActive ? 'active' : ''}`;
    card.dataset.missionId = m.id;

    const timerTotal = m.timerType === 'countdown' ? m.timerSeconds : 0;
    const remaining = isActive ? activeTimers[m.id].remaining : timerTotal;
    const progress = timerTotal > 0 ? (timerTotal - remaining) / timerTotal : 0;
    const offset = circumference * (1 - progress);

    card.innerHTML = `
      <div class="mission-info">
        <h4>${m.icon} ${m.name}</h4>
        <p style="font-size:0.8rem;color:var(--text-secondary);margin:0.2rem 0;">${m.desc}</p>
        <div class="mission-meta">
          <span class="mission-lang lang-${m.language}">${
            m.language === 'italian'
              ? '🇮🇹 イタリア語'
              : m.language === 'english'
                ? '🇬🇧 英語'
                : m.language === 'cantonese'
                  ? '🇭🇰 広東語'
                  : '🌐 全言語'
          }</span>
          <span>⚡ ${m.xp} XP / ${m.unit}</span>
          <span>今日: ${count}回完了</span>
        </div>
        ${m.url ? `<a href="${m.url}" target="_blank" rel="noopener" style="font-size:0.75rem;color:var(--accent-cyan);">🔗 サイトを開く</a>` : ''}
      </div>
      <div class="mission-timer-area">
        ${
          m.timerType === 'countdown'
            ? `
          <div class="timer-circle">
            <svg viewBox="0 0 120 120">
              <circle class="timer-bg" cx="60" cy="60" r="52"/>
              <circle class="timer-progress" cx="60" cy="60" r="52"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                id="timer-ring-${m.id}"/>
            </svg>
            <div class="timer-text" id="timer-text-${m.id}">${formatTime(remaining)}</div>
          </div>
        `
            : `
          <div style="text-align:center;font-size:0.85rem;color:var(--text-secondary);">
            手動完了
          </div>
        `
        }
        <div class="mission-btn-group">
          ${
            m.timerType === 'countdown'
              ? `
            <button class="btn-start-mission" data-mission="${m.id}" ${isActive ? 'disabled' : ''}>
              ${isActive ? '⏳ 進行中...' : '▶ 開始'}
            </button>
            <button class="btn-stop-mission" data-mission="${m.id}" style="${isActive ? '' : 'display:none;'}">⏹ 中止</button>
            <button class="btn-complete-mission ${activeTimers[m.id]?.remaining === 0 ? 'show' : ''}" data-mission="${m.id}">✅ 完了</button>
          `
              : `
            <button class="btn-complete-mission show" data-mission="${m.id}">✅ 完了 (+${m.xp} XP)</button>
          `
          }
        </div>
      </div>
    `;
    list.appendChild(card);
  }

  // Bind events
  list.querySelectorAll('.btn-start-mission').forEach((btn) => {
    btn.addEventListener('click', (e) =>
      startMissionTimer(btn.dataset.mission, e),
    );
  });
  list.querySelectorAll('.btn-stop-mission').forEach((btn) => {
    btn.addEventListener('click', () => stopMissionTimer(btn.dataset.mission));
  });
  list.querySelectorAll('.btn-complete-mission').forEach((btn) => {
    btn.addEventListener('click', (e) =>
      completeMission(btn.dataset.mission, e),
    );
  });

  renderMissionTodaySummary();
}

function startMissionTimer(missionId, event) {
  const m = MISSIONS.find((x) => x.id === missionId);
  if (!m || m.timerType !== 'countdown') return;
  if (activeTimers[missionId]) return;

  const total = m.timerSeconds;
  let remaining = total;
  const circumference = 2 * Math.PI * 52;

  const ring = $(`timer-ring-${missionId}`);
  const text = $(`timer-text-${missionId}`);

  activeTimers[missionId] = {
    remaining,
    total,
    interval: setInterval(() => {
      remaining -= 1;
      activeTimers[missionId].remaining = remaining;

      if (text) text.textContent = formatTime(remaining);
      if (ring) {
        const progress = (total - remaining) / total;
        ring.setAttribute('stroke-dashoffset', circumference * (1 - progress));
      }

      if (remaining <= 0) {
        clearInterval(activeTimers[missionId].interval);
        // Auto-show complete button
        const card = document.querySelector(
          `.mission-card[data-mission-id="${missionId}"]`,
        );
        if (card) {
          const completeBtn = card.querySelector('.btn-complete-mission');
          if (completeBtn) completeBtn.classList.add('show');
        }
        // Auto complete
        completeMission(missionId, event);
      }
    }, 1000),
  };

  // Update UI
  renderMissions();
  showToast(`⏱ ${m.name} タイマー開始！`, 'success');
}

function stopMissionTimer(missionId) {
  if (activeTimers[missionId]) {
    clearInterval(activeTimers[missionId].interval);
    delete activeTimers[missionId];
    renderMissions();
    showToast('タイマー中止', 'error');
  }
}

function completeMission(missionId, event) {
  const m = MISSIONS.find((x) => x.id === missionId);
  if (!m) return;

  // Clean up timer
  if (activeTimers[missionId]) {
    clearInterval(activeTimers[missionId].interval);
    delete activeTimers[missionId];
  }

  grantXp(m.xp, m, event);
  renderMissions();
}

function renderMissionTodaySummary() {
  const container = $('mission-today-summary');
  if (!container) return;
  let html = '';
  let totalXp = 0;
  for (const m of MISSIONS) {
    const count = S.todayMissions[m.id] || 0;
    const xp = count * m.xp;
    totalXp += xp;
    html += `<div class="mission-today-item">
      <span>${m.icon} ${m.name}</span>
      <span class="mission-count">${count}回 (+${xp} XP)</span>
    </div>`;
  }
  html += `<div class="mission-today-item" style="font-weight:700;border-top:2px solid var(--accent-gold);margin-top:0.5rem;padding-top:0.5rem;">
    <span>合計</span>
    <span class="mission-count" style="font-size:1rem;">+${totalXp} XP</span>
  </div>`;
  container.innerHTML = html;
}

// ======================================================
// SECTION 7: AI SCHEDULER
// ======================================================

function renderScheduler() {
  // Config fields
  $('daily-available-time').value = S.schedulerConfig.dailyMinutes;
  $('study-start-time').value = S.schedulerConfig.startTime;
  $('priority-language').value = S.schedulerConfig.priority;
  $('enable-notifications').checked = S.notifications.enabled;
  $('reminder-timing').value = S.notifications.timing;

  renderWeeklySchedule();

  // Bind events
  $('btn-generate-schedule').onclick = generateAISchedule;
  $('btn-manual-schedule').onclick = () =>
    showToast('スケジュールを直接クリックして編集できます', 'success');
  $('daily-available-time').onchange = (e) => {
    S.schedulerConfig.dailyMinutes = parseInt(e.target.value);
    saveState();
  };
  $('study-start-time').onchange = (e) => {
    S.schedulerConfig.startTime = e.target.value;
    saveState();
  };
  $('priority-language').onchange = (e) => {
    S.schedulerConfig.priority = e.target.value;
    saveState();
  };
  $('enable-notifications').onchange = (e) => {
    S.notifications.enabled = e.target.checked;
    if (e.target.checked) requestNotificationPermission();
    saveState();
  };
  $('reminder-timing').onchange = (e) => {
    S.notifications.timing = parseInt(e.target.value);
    saveState();
  };
}

function renderWeeklySchedule() {
  const container = $('weekly-schedule');
  if (!container) return;

  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0

  let html = '';
  for (let i = 0; i < 7; i++) {
    const dayName = days[i];
    const isToday = i === todayIdx;
    const schedItems = S.schedule[dayName] || [];

    html += `<div class="schedule-day">
      <div class="schedule-day-header ${isToday ? 'today' : ''}" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
        <span>${isToday ? '▶ ' : ''}${dayName}曜日</span>
        <span style="font-size:0.8rem;color:var(--text-dim);">${schedItems.length}タスク</span>
      </div>
      <div class="schedule-day-body" style="${isToday ? '' : 'display:none;'}">`;

    if (schedItems.length === 0) {
      html += `<div style="color:var(--text-dim);font-size:0.85rem;padding:0.5rem 0;">スケジュール未設定</div>`;
    } else {
      for (const item of schedItems) {
        const m = MISSIONS.find((x) => x.id === item.missionId);
        html += `<div class="schedule-item">
          <span class="schedule-time">${item.time}</span>
          <span class="schedule-task">${m ? m.icon + ' ' + m.name : item.missionId}</span>
          <span class="schedule-xp">${m ? m.xp + 'XP' : ''}</span>
        </div>`;
      }
    }
    html += `</div></div>`;
  }
  container.innerHTML = html;
}

async function generateAISchedule() {
  const config = S.schedulerConfig;
  const skillData = S.skillStats;
  const langData = S.langStats;
  const recentLog = S.dailyLog.slice(-14);

  // Build prompt for AI
  const prompt = `あなたは語学学習のAIスケジューラーです。以下の情報に基づいて、最適な1週間の学習スケジュールをJSON形式で生成してください。

## 学習者情報
- レベル: ${S.level}
- 連続学習日数: ${S.streak}日
- 1日の学習可能時間: ${config.dailyMinutes}分
- 学習開始時刻: ${config.startTime}
- 優先言語: ${config.priority}

## 利用可能なミッション
${MISSIONS.map((m) => `- ${m.id}: ${m.name} (${m.language}, ${m.skill}, ${m.xp}XP, ${m.timerType === 'countdown' ? m.timerSeconds / 60 + '分' : '手動'})`).join('\n')}

## スキル別累計データ
${Object.entries(skillData)
  .map(([k, v]) => `- ${k}: ${v.totalXp}XP, ${v.sessions}回`)
  .join('\n')}

## 言語別累計データ
${Object.entries(langData)
  .map(
    ([k, v]) =>
      `- ${k}: ${v.totalXp}XP, ${v.sessions}回, ${Math.round(v.totalMinutes)}分`,
  )
  .join('\n')}

## 直近14日間の学習ログ
${recentLog.map((d) => `${d.date}: ${d.totalXp}XP, ${d.totalMinutes}分, ${d.missions.join(',')}`).join('\n') || 'データなし'}

## 出力形式
以下のJSON形式で出力してください。他のテキストは不要です。
{
  "月": [{"time": "09:00", "missionId": "chatgpt_italian", "duration": 10}],
  "火": [...],
  "水": [...],
  "木": [...],
  "金": [...],
  "土": [...],
  "日": [...]
}

## ルール
1. 弱いスキル（セッション数が少ない）を重点的にスケジューリングする
2. ${config.priority !== 'balanced' ? config.priority + 'の学習時間を多めに配分する' : '3言語をバランスよく配分する'}
3. 1日の合計が${config.dailyMinutes}分を超えないようにする
4. 各セッションの間に5分の休憩を入れる
5. 停滞を防ぐため、同じミッションが連続しないようにする
6. 週末は平日より多めにスケジューリングしてよい`;

  showToast('🤖 AIがスケジュールを生成中...', 'success');
  $('btn-generate-schedule').disabled = true;

  try {
    const response = await callAI(prompt);
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const schedule = JSON.parse(jsonMatch[0]);
      S.schedule = schedule;
      saveState();
      renderWeeklySchedule();
      showToast('✅ スケジュール生成完了！', 'success');
    } else {
      showToast('❌ AIの応答からスケジュールを抽出できませんでした', 'error');
    }
  } catch (e) {
    console.error('Schedule generation failed:', e);
    showToast(
      '❌ スケジュール生成に失敗しました。API設定を確認してください。',
      'error',
    );
    // Fallback: generate basic schedule
    generateFallbackSchedule();
  }
  $('btn-generate-schedule').disabled = false;
}

function generateFallbackSchedule() {
  const config = S.schedulerConfig;
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const schedule = {};

  const [startH, startM] = config.startTime.split(':').map(Number);

  for (const day of days) {
    const items = [];
    let currentMinutes = startH * 60 + startM;
    const isWeekend = day === '土' || day === '日';
    const dayBudget = isWeekend
      ? config.dailyMinutes * 1.2
      : config.dailyMinutes;
    let used = 0;

    // Distribute missions
    const missionOrder =
      config.priority === 'italian'
        ? [
            'italianoplus',
            'chatgpt_italian',
            'memrise_italian',
            'elsa_speak',
            'cantonese_class',
            'hello_ear',
            'passive_listening',
          ]
        : config.priority === 'english'
          ? [
              'elsa_speak',
              'hello_ear',
              'italianoplus',
              'chatgpt_italian',
              'memrise_italian',
              'cantonese_class',
              'passive_listening',
            ]
          : config.priority === 'cantonese'
            ? [
                'cantonese_class',
                'italianoplus',
                'chatgpt_italian',
                'elsa_speak',
                'memrise_italian',
                'hello_ear',
                'passive_listening',
              ]
            : [
                'italianoplus',
                'chatgpt_italian',
                'elsa_speak',
                'cantonese_class',
                'memrise_italian',
                'hello_ear',
                'passive_listening',
              ];

    for (const mid of missionOrder) {
      const m = MISSIONS.find((x) => x.id === mid);
      if (!m) continue;
      const dur = m.timerType === 'countdown' ? m.timerSeconds / 60 : 10;
      if (used + dur > dayBudget) break;

      const h = Math.floor(currentMinutes / 60);
      const min = currentMinutes % 60;
      items.push({
        time: `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
        missionId: mid,
        duration: dur,
      });
      currentMinutes += dur + 5; // +5 min break
      used += dur;
    }
    schedule[day] = items;
  }

  S.schedule = schedule;
  saveState();
  renderWeeklySchedule();
  showToast('📋 基本スケジュールを生成しました（AI未使用）', 'success');
}

// ======================================================
// SECTION 8: DASHBOARD & ANALYTICS
// ======================================================

function renderDashboard() {
  renderDashOverview();
  renderLanguageChart();
  renderSkillRadar();
  renderHeatmap();
  renderStreakGraph();
  renderAIInsights();

  $('btn-ai-analyze').onclick = runAIAnalysis;
}

function renderDashOverview() {
  const container = $('dash-overview-content');
  if (!container) return;

  const totalSessions = S.missionLog.length;
  const totalXp = S.missionLog.reduce((s, l) => s + l.xpEarned, 0);
  const last7 = S.dailyLog.filter((d) => {
    const diff = (new Date(todayStr()) - new Date(d.date)) / 86400000;
    return diff < 7;
  });
  const weekXp = last7.reduce((s, d) => s + d.totalXp, 0);
  const weekMin = Math.round(last7.reduce((s, d) => s + d.totalMinutes, 0));

  container.innerHTML = `
    <div class="stat-row"><span>レベル</span><span class="stat-value gold">Lv.${S.level} ${getTitle(S.level)}</span></div>
    <div class="stat-row"><span>総セッション数</span><span class="stat-value blue">${totalSessions}</span></div>
    <div class="stat-row"><span>累計獲得XP</span><span class="stat-value gold">${totalXp}</span></div>
    <div class="stat-row"><span>今週のXP</span><span class="stat-value green">${weekXp}</span></div>
    <div class="stat-row"><span>今週の学習時間</span><span class="stat-value blue">${weekMin}分</span></div>
    <div class="stat-row"><span>連続学習</span><span class="stat-value ${S.streak >= 7 ? 'gold' : S.streak >= 3 ? 'green' : 'red'}">🔥 ${S.streak}日</span></div>
  `;
}

function renderLanguageChart() {
  const canvas = $('chart-language');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const langs = [
    { key: 'italian', name: 'イタリア語', color: '#69f0ae' },
    { key: 'english', name: '英語', color: '#4fc3f7' },
    { key: 'cantonese', name: '広東語', color: '#ff8a80' },
  ];

  const maxXp = Math.max(
    ...langs.map((l) => S.langStats[l.key]?.totalXp || 0),
    1,
  );
  const barWidth = 80;
  const startX = 60;
  const maxBarH = 140;

  // Axes
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, 160);
  ctx.lineTo(380, 160);
  ctx.stroke();

  langs.forEach((l, i) => {
    const xp = S.langStats[l.key]?.totalXp || 0;
    const h = (xp / maxXp) * maxBarH;
    const x = startX + i * 110;

    // Bar
    const grad = ctx.createLinearGradient(x, 160 - h, x, 160);
    grad.addColorStop(0, l.color);
    grad.addColorStop(1, l.color + '33');
    ctx.fillStyle = grad;
    ctx.fillRect(x, 160 - h, barWidth, h);

    // Border
    ctx.strokeStyle = l.color;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, 160 - h, barWidth, h);

    // Label
    ctx.fillStyle = '#e0e6ff';
    ctx.font = '11px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText(l.name, x + barWidth / 2, 178);
    ctx.fillStyle = l.color;
    ctx.font = 'bold 12px Orbitron';
    ctx.fillText(`${xp}XP`, x + barWidth / 2, 160 - h - 8);
  });
}

function renderSkillRadar() {
  const canvas = $('chart-radar');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const skills = [
    'vocab',
    'grammar',
    'listening',
    'speaking',
    'reading',
    'writing',
  ];
  const labels = [
    '語彙',
    '文法',
    'リスニング',
    'スピーキング',
    '読解',
    'ライティング',
  ];
  const cx = 150,
    cy = 150,
    maxR = 110;
  const n = skills.length;

  const maxVal = Math.max(
    ...skills.map((s) => S.skillStats[s]?.totalXp || 0),
    1,
  );

  // Grid
  for (let ring = 1; ring <= 4; ring++) {
    const r = (ring / 4) * maxR;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.stroke();
  }

  // Axes + labels
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x = cx + maxR * Math.cos(angle);
    const y = cy + maxR * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.stroke();

    const lx = cx + (maxR + 20) * Math.cos(angle);
    const ly = cy + (maxR + 20) * Math.sin(angle);
    ctx.fillStyle = '#8892b0';
    ctx.font = '11px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labels[i], lx, ly);
  }

  // Data polygon
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const val = (S.skillStats[skills[idx]]?.totalXp || 0) / maxVal;
    const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
    const x = cx + val * maxR * Math.cos(angle);
    const y = cy + val * maxR * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.fillStyle = 'rgba(79,195,247,0.2)';
  ctx.fill();
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Data points
  for (let i = 0; i < n; i++) {
    const val = (S.skillStats[skills[i]]?.totalXp || 0) / maxVal;
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x = cx + val * maxR * Math.cos(angle);
    const y = cy + val * maxR * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#4fc3f7';
    ctx.fill();
  }
}

function renderHeatmap() {
  const container = $('heatmap-container');
  if (!container) return;

  const dayLabels = ['月', '火', '水', '木', '金', '土', '日'];
  let html = dayLabels
    .map((d) => `<div class="heatmap-label">${d}</div>`)
    .join('');

  // Last 28 days
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today - i * 86400000);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const entry = S.dailyLog.find((x) => x.date === ds);
    const xp = entry?.totalXp || 0;
    const level =
      xp === 0
        ? 0
        : xp < 30
          ? 1
          : xp < 60
            ? 2
            : xp < 100
              ? 3
              : xp < 200
                ? 4
                : 5;
    html += `<div class="heatmap-cell" data-level="${level}" title="${ds}: ${xp}XP"></div>`;
  }
  container.innerHTML = html;
}

function renderStreakGraph() {
  const canvas = $('chart-streak');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const last14 = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today - i * 86400000);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const entry = S.dailyLog.find((x) => x.date === ds);
    last14.push({ date: ds, xp: entry?.totalXp || 0 });
  }

  const maxXp = Math.max(...last14.map((d) => d.xp), 1);
  const w = canvas.width,
    h = canvas.height;
  const pad = 30;
  const graphW = w - pad * 2;
  const graphH = h - pad * 2;

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  for (let i = 0; i < 4; i++) {
    const y = pad + (graphH / 3) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(w - pad, y);
    ctx.stroke();
  }

  // Line
  ctx.beginPath();
  last14.forEach((d, i) => {
    const x = pad + (graphW / 13) * i;
    const y = pad + graphH - (d.xp / maxXp) * graphH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#69f0ae';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Fill
  ctx.lineTo(pad + graphW, pad + graphH);
  ctx.lineTo(pad, pad + graphH);
  ctx.closePath();
  ctx.fillStyle = 'rgba(105,240,174,0.1)';
  ctx.fill();

  // Points + labels
  last14.forEach((d, i) => {
    const x = pad + (graphW / 13) * i;
    const y = pad + graphH - (d.xp / maxXp) * graphH;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = d.xp > 0 ? '#69f0ae' : '#ff5252';
    ctx.fill();

    if (i % 2 === 0) {
      ctx.fillStyle = '#5a6380';
      ctx.font = '9px "Noto Sans JP"';
      ctx.textAlign = 'center';
      ctx.fillText(d.date.slice(5), x, h - 5);
    }
  });
}

function renderAIInsights() {
  const container = $('ai-insights-content');
  if (!container) return;

  // Local analysis (no API needed)
  const insights = generateLocalInsights();
  container.textContent = insights;
}

function generateLocalInsights() {
  const skills = S.skillStats;
  const langs = S.langStats;
  const log = S.dailyLog;

  let text = '=== ローカル分析結果 ===\n\n';

  // Weakness detection
  const skillEntries = Object.entries(skills).sort(
    (a, b) => a[1].totalXp - b[1].totalXp,
  );
  const weakest = skillEntries[0];
  const strongest = skillEntries[skillEntries.length - 1];
  text += `📊 最も弱いスキル: ${weakest[0]} (${weakest[1].totalXp}XP)\n`;
  text += `💪 最も強いスキル: ${strongest[0]} (${strongest[1].totalXp}XP)\n\n`;

  // Language balance
  const langEntries = Object.entries(langs).sort(
    (a, b) => a[1].totalXp - b[1].totalXp,
  );
  text += `🌐 言語バランス:\n`;
  for (const [k, v] of langEntries) {
    text += `  ${k}: ${v.totalXp}XP, ${v.sessions}回, ${Math.round(v.totalMinutes)}分\n`;
  }

  // Plateau detection
  const last7 = log.slice(-7);
  const prev7 = log.slice(-14, -7);
  const recentAvg =
    last7.length > 0
      ? last7.reduce((s, d) => s + d.totalXp, 0) / last7.length
      : 0;
  const prevAvg =
    prev7.length > 0
      ? prev7.reduce((s, d) => s + d.totalXp, 0) / prev7.length
      : 0;

  text += `\n📈 トレンド:\n`;
  text += `  直近7日平均: ${Math.round(recentAvg)} XP/日\n`;
  text += `  前週平均: ${Math.round(prevAvg)} XP/日\n`;

  if (recentAvg < prevAvg * 0.7 && prevAvg > 0) {
    text += `  ⚠️ 停滞の兆候が検出されました！学習内容を変更することをお勧めします。\n`;
  } else if (recentAvg > prevAvg * 1.3) {
    text += `  🚀 素晴らしい成長トレンドです！この調子を維持しましょう。\n`;
  } else {
    text += `  ✅ 安定した学習ペースです。\n`;
  }

  // Recommendation
  text += `\n💡 推奨アクション:\n`;
  text += `  - ${weakest[0]}のセッションを増やしましょう\n`;
  if (
    langEntries[0][1].sessions <
    langEntries[langEntries.length - 1][1].sessions * 0.5
  ) {
    text += `  - ${langEntries[0][0]}の学習時間が不足しています\n`;
  }
  if (S.streak < 3) {
    text += `  - 毎日の学習習慣を確立しましょう（目標: 7日連続）\n`;
  }

  return text;
}

async function runAIAnalysis() {
  const prompt = `あなたは語学学習コーチです。以下のデータを分析し、具体的なアドバイスを日本語で提供してください。

## 学習者データ
- レベル: ${S.level}, 連続学習: ${S.streak}日
- スキル別XP: ${JSON.stringify(S.skillStats)}
- 言語別XP: ${JSON.stringify(S.langStats)}
- 直近14日のログ: ${JSON.stringify(S.dailyLog.slice(-14))}

## 分析してほしい内容
1. 弱点分析: どのスキル・言語が遅れているか
2. 停滞予測: 今後2週間で停滞しそうなポイント
3. 最適化提案: 学習配分の改善案
4. モチベーション維持: 具体的な短期目標の提案
5. 学習カーブ予測: 現在のペースで到達できるレベル予測

簡潔に、箇条書きで回答してください。`;

  showToast('🤖 AIが分析中...', 'success');
  $('btn-ai-analyze').disabled = true;

  try {
    const response = await callAI(prompt);
    $('ai-insights-content').textContent = response;
  } catch (e) {
    console.error('AI analysis failed:', e);
    $('ai-insights-content').textContent = generateLocalInsights();
    showToast('❌ AI分析に失敗。ローカル分析を表示しています。', 'error');
  }
  $('btn-ai-analyze').disabled = false;
}

// ======================================================
// SECTION 9: AI API COMMUNICATION
// ======================================================

async function callAI(prompt) {
  const provider = S.aiProvider;

  if (provider === 'gemini') {
    const key = S.aiKeys.gemini;
    const model = S.aiModels.gemini || 'gemini-2.5-flash';
    if (!key) throw new Error('Gemini APIキーが未設定です');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    });
    if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  }

  if (provider === 'openai') {
    const key = S.aiKeys.openai;
    const model = S.aiModels.openai || 'gpt-4o';
    if (!key) throw new Error('OpenAI APIキーが未設定です');
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No response';
  }

  if (provider === 'openrouter') {
    const key = S.aiKeys.openrouter;
    const model = S.aiModels.openrouter || 'deepseek/deepseek-r1:free';
    if (!key) throw new Error('OpenRouter APIキーが未設定です');
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        'HTTP-Referer': window.location.href,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });
    if (!res.ok) throw new Error(`OpenRouter API error: ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No response';
  }

  if (provider === 'custom') {
    const key = S.aiKeys.custom;
    const model = S.aiModels.custom;
    const endpoint = S.aiCustomEndpoint;
    if (!endpoint) throw new Error('カスタムエンドポイントが未設定です');
    const headers = { 'Content-Type': 'application/json' };
    if (key) headers['Authorization'] = `Bearer ${key}`;
    const res = await fetch(endpoint + '/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: model || 'default',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });
    if (!res.ok) throw new Error(`Custom API error: ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No response';
  }

  throw new Error('未知のAPIプロバイダ: ' + provider);
}

// ======================================================
// SECTION 10: NOTIFICATION / REMINDER SYSTEM
// ======================================================

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        showToast('🔔 通知が有効になりました', 'success');
      } else {
        showToast('通知が拒否されました', 'error');
        S.notifications.enabled = false;
        saveState();
      }
    });
  }
}

function sendNotification(title, body) {
  if (!S.notifications.enabled) return;
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: './LLG_icon.ico',
      badge: './LLG_icon.ico',
    });
  }
}

// Check schedule and send reminders
function scheduleReminderLoop() {
  setInterval(() => {
    if (!S.notifications.enabled) return;
    const now = new Date();
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const dayName = days[now.getDay()];
    const todaySchedule = S.schedule[dayName] || [];
    const reminderMin = S.notifications.timing;

    for (const item of todaySchedule) {
      const [h, m] = item.time.split(':').map(Number);
      const taskTime = h * 60 + m;
      const nowMin = now.getHours() * 60 + now.getMinutes();
      const diff = taskTime - nowMin;

      if (diff === reminderMin) {
        const mission = MISSIONS.find((x) => x.id === item.missionId);
        if (mission) {
          sendNotification(
            `🎯 ${mission.name} まであと${reminderMin}分`,
            `${mission.desc} (${mission.xp}XP)`,
          );
        }
      }
    }
  }, 60000); // Check every minute
}

// ======================================================
// SECTION 11: CHARACTER CREATION (kept from v1, adapted)
// ======================================================

function renderCharacter() {
  if (S.character) {
    renderCharacterDisplay();
    $('char-display').style.display = 'block';
    $('char-creation').style.display = 'none';
  } else {
    $('char-display').style.display = 'none';
    $('char-creation').style.display = 'block';
    initCharCreation();
  }
}

function renderCharacterDisplay() {
  const c = S.character;
  if (!c) return;
  const anc = ANCESTRIES.find((a) => a.id === c.ancestry);
  const her = anc?.heritages.find((h) => h.id === c.heritage);
  const cls = CLASSES.find((x) => x.id === c.class);
  const sub = cls?.subclasses.find((s) => s.id === c.subclass);

  $('char-info').innerHTML = `
    <div style="text-align:center;margin-bottom:1rem;">
      <div style="font-size:2rem;margin-bottom:0.5rem;">⚔️</div>
      <div style="font-family:var(--font-display);font-size:1.5rem;color:var(--accent-gold);">${c.name}</div>
      <div style="color:var(--text-secondary);font-size:0.9rem;">${getTitle(S.level)}</div>
    </div>
    <div class="char-stat-grid">
      <div class="char-stat-item">
        <div class="stat-label">レベル</div>
        <div class="stat-val">Lv.${S.level}</div>
      </div>
      <div class="char-stat-item">
        <div class="stat-label">種族</div>
        <div class="stat-val">${anc?.name || c.ancestry}</div>
        <div style="font-size:0.7rem;color:var(--text-secondary);">${her?.name || ''} - ${her?.desc || ''}</div>
      </div>
      <div class="char-stat-item">
        <div class="stat-label">職業</div>
        <div class="stat-val">${cls?.name || c.class}</div>
        <div style="font-size:0.7rem;color:var(--text-secondary);">${sub?.name || ''} - ${sub?.desc || ''}</div>
      </div>
      <div class="char-stat-item">
        <div class="stat-label">EXP</div>
        <div class="stat-val">${S.exp} / 100</div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill fill-gold" style="width:${S.exp}%;"></div>
        </div>
      </div>
      <div class="char-stat-item">
        <div class="stat-label">ゴールド</div>
        <div class="stat-val">${S.gold} G</div>
      </div>
      <div class="char-stat-item">
        <div class="stat-label">連続学習</div>
        <div class="stat-val">🔥 ${S.streak}日</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:1rem;">
      <button class="btn-danger" id="btn-delete-char">キャラクター削除</button>
    </div>
  `;

  $('btn-delete-char').onclick = () => {
    if (
      confirm('本当にキャラクターを削除しますか？（学習データは保持されます）')
    ) {
      S.character = null;
      saveState();
      renderCharacter();
    }
  };
}

function initCharCreation() {
  const ancSelect = $('char-ancestry-select');
  const herSelect = $('char-heritage-select');
  const clsSelect = $('char-class-select');
  const subSelect = $('char-subclass-select');

  // Populate ancestry
  ancSelect.innerHTML = ANCESTRIES.map(
    (a) => `<option value="${a.id}">${a.name} - ${a.desc}</option>`,
  ).join('');

  // Populate class
  clsSelect.innerHTML = CLASSES.map(
    (c) => `<option value="${c.id}">${c.name} - ${c.desc}</option>`,
  ).join('');

  function updateHeritages() {
    const anc = ANCESTRIES.find((a) => a.id === ancSelect.value);
    herSelect.innerHTML = (anc?.heritages || [])
      .map((h) => `<option value="${h.id}">${h.name} - ${h.desc}</option>`)
      .join('');
    updateBonusPreview();
  }

  function updateSubclasses() {
    const cls = CLASSES.find((c) => c.id === clsSelect.value);
    subSelect.innerHTML = (cls?.subclasses || [])
      .map((s) => `<option value="${s.id}">${s.name} - ${s.desc}</option>`)
      .join('');
    updateBonusPreview();
  }

  function updateBonusPreview() {
    const anc = ANCESTRIES.find((a) => a.id === ancSelect.value);
    const her = anc?.heritages.find((h) => h.id === herSelect.value);
    const cls = CLASSES.find((c) => c.id === clsSelect.value);
    const sub = cls?.subclasses.find((s) => s.id === subSelect.value);
    let html = '<strong>ボーナスプレビュー:</strong><br>';
    if (her) html += `🏠 ${her.name}: ${her.desc}<br>`;
    if (sub) html += `⚔️ ${sub.name}: ${sub.desc}`;
    $('bonus-preview').innerHTML = html;
  }

  ancSelect.onchange = updateHeritages;
  clsSelect.onchange = updateSubclasses;
  herSelect.onchange = updateBonusPreview;
  subSelect.onchange = updateBonusPreview;

  updateHeritages();
  updateSubclasses();

  $('btn-create-char').onclick = () => {
    const name = $('char-name-input').value.trim();
    if (!name) {
      showToast('名前を入力してください', 'error');
      return;
    }
    S.character = {
      name,
      ancestry: ancSelect.value,
      heritage: herSelect.value,
      class: clsSelect.value,
      subclass: subSelect.value,
      createdAt: Date.now(),
    };
    saveState();
    showToast(`🎉 ${name} が誕生しました！`, 'levelup');
    renderCharacter();
  };
}

// ======================================================
// SECTION 12: SPHERE GRID (kept from v1, adapted)
// ======================================================

function renderSphere() {
  const grid = $('sphere-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Draw connections
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '740');
  svg.setAttribute('height', '500');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';

  for (const node of SPHERE_NODES) {
    for (const preId of node.prereq) {
      const pre = SPHERE_NODES.find((n) => n.id === preId);
      if (!pre) continue;
      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line',
      );
      line.setAttribute('x1', pre.x + 20);
      line.setAttribute('y1', pre.y + 20);
      line.setAttribute('x2', node.x + 20);
      line.setAttribute('y2', node.y + 20);
      const unlocked =
        S.sphereUnlocked.includes(node.id) && S.sphereUnlocked.includes(preId);
      line.setAttribute(
        'stroke',
        unlocked ? 'rgba(79,195,247,0.5)' : 'rgba(255,255,255,0.08)',
      );
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
    }
  }
  grid.appendChild(svg);

  // Draw nodes
  const zoneColors = {
    core: '#ffd54f',
    vocab: '#b388ff',
    grammar: '#4fc3f7',
    listening: '#69f0ae',
    speaking: '#ff8a80',
    reading: '#ffab40',
    writing: '#18ffff',
  };

  for (const node of SPHERE_NODES) {
    const el = document.createElement('div');
    const unlocked = S.sphereUnlocked.includes(node.id);
    const canUnlock =
      !unlocked && node.prereq.every((p) => S.sphereUnlocked.includes(p));
    const color = zoneColors[node.zone] || '#fff';

    el.style.cssText = `
      position: absolute;
      left: ${node.x}px; top: ${node.y}px;
      width: 40px; height: 40px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.6rem; font-weight: 700;
      cursor: ${canUnlock ? 'pointer' : 'default'};
      transition: all 0.3s;
      border: 2px solid ${unlocked ? color : canUnlock ? color + '80' : 'rgba(255,255,255,0.1)'};
      background: ${unlocked ? color + '30' : 'rgba(255,255,255,0.03)'};
      color: ${unlocked ? color : canUnlock ? color + '80' : 'rgba(255,255,255,0.2)'};
      ${canUnlock ? `box-shadow: 0 0 12px ${color}40;` : ''}
    `;
    el.textContent = node.label;
    el.title = `${node.label}: ${node.desc}`;

    if (canUnlock) {
      el.addEventListener('click', () => unlockSphereNode(node));
    }

    if (unlocked) {
      el.addEventListener('click', () => {
        $('sphere-info').innerHTML =
          `<strong>${node.label}</strong>: ${node.desc}<br>
          <span style="color:var(--accent-gold);">報酬: ${node.reward.type === 'exp' ? node.reward.value + ' XP (' + node.reward.cat + ')' : node.reward.type === 'gold' ? node.reward.value + ' Gold' : '解放済み'}</span>`;
      });
    }

    grid.appendChild(el);
  }
}

function unlockSphereNode(node) {
  if (S.sphereUnlocked.includes(node.id)) return;
  S.sphereUnlocked.push(node.id);

  // Apply reward
  if (node.reward.type === 'exp') {
    S.exp += node.reward.value;
    while (S.exp >= 100) {
      S.exp -= 100;
      S.level++;
      showLevelUp(S.level);
    }
    showToast(`✨ ${node.label} 解放！ +${node.reward.value} XP`, 'xp');
  } else if (node.reward.type === 'gold') {
    S.gold += node.reward.value;
    showToast(`💰 ${node.label} 解放！ +${node.reward.value} Gold`, 'success');
  } else {
    showToast(`✨ ${node.label} 解放！`, 'success');
  }

  saveState();
  updateHUD();
  renderSphere();
}

// ======================================================
// SECTION 13: HOME TAB
// ======================================================

function renderHome() {
  renderHomeStats();
  renderTodaySchedulePreview();
  renderRecentActivity();
  renderWeaknessAlert();
}

function renderHomeStats() {
  const container = $('home-stats');
  if (!container) return;
  const todayXp = Object.entries(S.todayMissions).reduce(
    (sum, [mid, count]) => {
      const m = MISSIONS.find((x) => x.id === mid);
      return sum + (m ? m.xp * count : 0);
    },
    0,
  );
  const todaySessions = Object.values(S.todayMissions).reduce(
    (s, c) => s + c,
    0,
  );

  container.innerHTML = `
    <div class="char-stat-grid">
      <div class="char-stat-item"><div class="stat-label">今日のXP</div><div class="stat-val">${todayXp}</div></div>
      <div class="char-stat-item"><div class="stat-label">今日のセッション</div><div class="stat-val">${todaySessions}</div></div>
      <div class="char-stat-item"><div class="stat-label">レベル</div><div class="stat-val">Lv.${S.level}</div></div>
      <div class="char-stat-item"><div class="stat-label">連続学習</div><div class="stat-val">🔥${S.streak}日</div></div>
    </div>
  `;
}

function renderTodaySchedulePreview() {
  const container = $('today-schedule-preview');
  if (!container) return;
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const dayName = days[new Date().getDay()];
  const todayItems = S.schedule[dayName] || [];

  if (todayItems.length === 0) {
    container.innerHTML =
      '<div style="color:var(--text-dim);font-size:0.85rem;">スケジュール未設定 — スケジューラータブで生成しましょう</div>';
    return;
  }

  let html = '';
  for (const item of todayItems) {
    const m = MISSIONS.find((x) => x.id === item.missionId);
    const done = (S.todayMissions[item.missionId] || 0) > 0;
    html += `<div class="schedule-item" style="${done ? 'opacity:0.5;text-decoration:line-through;' : ''}">
      <span class="schedule-time">${item.time}</span>
      <span class="schedule-task">${m ? m.icon + ' ' + m.name : item.missionId}</span>
      <span>${done ? '✅' : '⬜'}</span>
    </div>`;
  }
  container.innerHTML = html;
}

function renderRecentActivity() {
  const container = $('recent-activity');
  if (!container) return;
  const recent = S.missionLog.slice(-10).reverse();
  if (recent.length === 0) {
    container.innerHTML =
      '<div style="color:var(--text-dim);font-size:0.85rem;">まだ活動がありません</div>';
    return;
  }
  let html = '';
  for (const log of recent) {
    const m = MISSIONS.find((x) => x.id === log.missionId);
    const time = new Date(log.timestamp);
    const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
    html += `<div class="mission-today-item">
      <span>${m ? m.icon : '📝'} ${m?.name || log.missionId} <span style="color:var(--text-dim);font-size:0.75rem;">${timeStr}</span></span>
      <span class="mission-count">+${log.xpEarned} XP</span>
    </div>`;
  }
  container.innerHTML = html;
}

function renderWeaknessAlert() {
  const container = $('weakness-alert');
  if (!container) return;

  const skills = Object.entries(S.skillStats).sort(
    (a, b) => a[1].totalXp - b[1].totalXp,
  );
  const weakest = skills[0];
  const langs = Object.entries(S.langStats).sort(
    (a, b) => a[1].sessions - b[1].sessions,
  );
  const weakLang = langs[0];

  // Plateau check
  const last7 = S.dailyLog.slice(-7);
  const prev7 = S.dailyLog.slice(-14, -7);
  const recentAvg =
    last7.length > 0
      ? last7.reduce((s, d) => s + d.totalXp, 0) / last7.length
      : 0;
  const prevAvg =
    prev7.length > 0
      ? prev7.reduce((s, d) => s + d.totalXp, 0) / prev7.length
      : 0;
  const isPlateau = prevAvg > 0 && recentAvg < prevAvg * 0.7;

  let html = '';
  if (S.missionLog.length === 0) {
    html =
      '<div style="color:var(--text-dim);font-size:0.85rem;">データがまだ不足しています。ミッションを完了して分析を開始しましょう。</div>';
  } else {
    if (isPlateau) {
      html += `<div style="color:var(--accent-red);margin-bottom:0.5rem;">🚨 停滞警告: 直近7日の学習量が前週より${Math.round((1 - recentAvg / prevAvg) * 100)}%減少しています</div>`;
    }
    html += `<div style="margin-bottom:0.3rem;">📉 弱点スキル: <strong style="color:var(--accent-orange);">${weakest[0]}</strong> (${weakest[1].totalXp} XP / ${weakest[1].sessions}回)</div>`;
    html += `<div>🌐 不足言語: <strong style="color:var(--accent-orange);">${weakLang[0]}</strong> (${weakLang[1].sessions}回)</div>`;
  }
  container.innerHTML = html;
}

// ======================================================
// SECTION 14: REVIEW TAB (kept minimal from v1)
// ======================================================

function renderReview() {
  const area = $('review-area');
  if (!area) return;
  area.innerHTML = `
    <div style="color:var(--text-secondary);text-align:center;padding:2rem;">
      <div style="font-size:2rem;margin-bottom:1rem;">📚</div>
      <p>復習デッキ機能は今後のアップデートで拡張予定です。</p>
      <p>現在はAIチューターを使って復習ができます。</p>
    </div>
  `;
}

// ======================================================
// SECTION 15: AI SIDEBAR & CHAT
// ======================================================

function initAISidebar() {
  $('btn-ai-toggle').onclick = () => $('ai-sidebar').classList.toggle('open');
  $('btn-ai-close').onclick = () => $('ai-sidebar').classList.remove('open');
  $('btn-ai-settings').onclick = () =>
    $('ai-settings-overlay').classList.add('open');
  $('btn-close-ai-settings').onclick = () =>
    $('ai-settings-overlay').classList.remove('open');

  // Language select
  const langSelect = $('ai-lang-select');
  langSelect.innerHTML = S.languages
    .map((l) => `<option value="${l.code}">${l.name}</option>`)
    .join('');

  // Send message
  $('ai-send-btn').onclick = sendAIMessage;
  $('ai-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAIMessage();
    }
  });

  // Settings
  initAISettings();
}

async function sendAIMessage() {
  const input = $('ai-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const lang = $('ai-lang-select').value;
  const langName = S.languages.find((l) => l.code === lang)?.name || lang;

  // Add user message
  addChatMessage(msg, 'user');

  const systemPrompt = `あなたは${langName}の優秀な語学チューターです。学習者のレベルはLv.${S.level}（${getTitle(S.level)}）です。
${langName}について質問されたら丁寧に教えてください。文法の説明、発音のコツ、例文、会話練習など幅広く対応してください。
回答は${langName}と日本語の両方を使い、わかりやすく解説してください。`;

  $('ai-status').textContent = '応答を生成中...';

  try {
    const fullPrompt = `${systemPrompt}\n\nユーザー: ${msg}`;
    const response = await callAI(fullPrompt);
    addChatMessage(response, 'bot');
    $('ai-status').textContent = '';
  } catch (e) {
    addChatMessage(
      '❌ エラーが発生しました。API設定を確認してください。',
      'bot',
    );
    $('ai-status').textContent = 'エラー: ' + e.message;
  }
}

function addChatMessage(text, role) {
  const area = $('ai-chat-messages');
  const div = document.createElement('div');
  div.className = `ai-msg ${role}`;
  div.textContent = text;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function initAISettings() {
  // Load current settings into fields
  $('ai-provider-select').value = S.aiProvider;
  $('ai-gemini-key').value = S.aiKeys.gemini || '';
  $('ai-gemini-model').value = S.aiModels.gemini || 'gemini-2.5-flash';
  $('ai-openrouter-key').value = S.aiKeys.openrouter || '';
  $('ai-openrouter-model').value =
    S.aiModels.openrouter || 'deepseek/deepseek-r1:free';
  $('ai-openai-key').value = S.aiKeys.openai || '';
  $('ai-openai-model').value = S.aiModels.openai || 'gpt-4o';
  $('ai-custom-endpoint').value = S.aiCustomEndpoint || '';
  $('ai-custom-key').value = S.aiKeys.custom || '';
  $('ai-custom-model').value = S.aiModels.custom || '';

  // Show/hide fields based on provider
  function updateProviderFields() {
    const p = $('ai-provider-select').value;
    $('fg-gemini-key').style.display = p === 'gemini' ? 'block' : 'none';
    $('fg-gemini-model').style.display = p === 'gemini' ? 'block' : 'none';
    $('fg-openrouter-key').style.display =
      p === 'openrouter' ? 'block' : 'none';
    $('fg-openrouter-model').style.display =
      p === 'openrouter' ? 'block' : 'none';
    $('fg-openai-key').style.display = p === 'openai' ? 'block' : 'none';
    $('fg-openai-model').style.display = p === 'openai' ? 'block' : 'none';
    $('fg-custom-ep').style.display = p === 'custom' ? 'block' : 'none';
    $('fg-custom-key').style.display = p === 'custom' ? 'block' : 'none';
    $('fg-custom-model').style.display = p === 'custom' ? 'block' : 'none';
  }
  $('ai-provider-select').onchange = updateProviderFields;
  updateProviderFields();

  // Save button
  $('btn-save-ai-settings').onclick = () => {
    S.aiProvider = $('ai-provider-select').value;
    S.aiKeys = {
      gemini: $('ai-gemini-key').value,
      openrouter: $('ai-openrouter-key').value,
      openai: $('ai-openai-key').value,
      custom: $('ai-custom-key').value,
    };
    S.aiModels = {
      gemini: $('ai-gemini-model').value,
      openrouter: $('ai-openrouter-model').value,
      openai: $('ai-openai-model').value,
      custom: $('ai-custom-model').value,
    };
    S.aiCustomEndpoint = $('ai-custom-endpoint').value;
    saveState();
    showToast('AI設定を保存しました', 'success');
    $('ai-settings-overlay').classList.remove('open');
  };

  // Test button
  $('btn-test-ai').onclick = async () => {
    try {
      $('ai-status').textContent = '接続テスト中...';
      const result = await callAI(
        'こんにちは。テストです。短く返答してください。',
      );
      showToast('✅ 接続成功: ' + result.slice(0, 50), 'success');
      $('ai-status').textContent = '接続成功';
    } catch (e) {
      showToast('❌ 接続失敗: ' + e.message, 'error');
      $('ai-status').textContent = '接続失敗: ' + e.message;
    }
  };

  // Language manager
  renderLangManager();

  $('btn-add-lang').onclick = () => {
    const code = $('ai-new-lang-code').value.trim();
    const name = $('ai-new-lang-name').value.trim();
    if (!code || !name) {
      showToast('コードと名前を入力してください', 'error');
      return;
    }
    if (S.languages.find((l) => l.code === code)) {
      showToast('このコードは既に存在します', 'error');
      return;
    }
    S.languages.push({ code, name });
    S.langStats[code] = { totalXp: 0, sessions: 0, totalMinutes: 0 };
    $('ai-new-lang-code').value = '';
    $('ai-new-lang-name').value = '';
    saveState();
    renderLangManager();
    // Update lang selects
    $('ai-lang-select').innerHTML = S.languages
      .map((l) => `<option value="${l.code}">${l.name}</option>`)
      .join('');
    showToast(`${name}を追加しました`, 'success');
  };
}

function renderLangManager() {
  const container = $('ai-lang-manager');
  if (!container) return;
  container.innerHTML = S.languages
    .map(
      (l) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:0.3rem 0;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span>${l.name} (${l.code})</span>
      <button class="btn-icon" onclick="removeLang('${l.code}')" title="削除">🗑</button>
    </div>
  `,
    )
    .join('');
}

// Global function for inline onclick
window.removeLang = function (code) {
  if (S.languages.length <= 1) {
    showToast('最低1つの言語が必要です', 'error');
    return;
  }
  S.languages = S.languages.filter((l) => l.code !== code);
  saveState();
  renderLangManager();
  showToast('言語を削除しました', 'success');
};

// ======================================================
// SECTION 16: DATA MANAGEMENT (Export/Import/Reset)
// ======================================================

function initDataManagement() {
  $('btn-export').onclick = () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linguaquest_${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('データをエクスポートしました', 'success');
  };

  $('btn-import').onclick = () => $('import-file').click();
  $('import-file').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        S = Object.assign(defaultState(), data);
        saveState();
        showToast('データをインポートしました', 'success');
        location.reload();
      } catch (err) {
        showToast('❌ インポートに失敗しました', 'error');
      }
    };
    reader.readAsText(file);
  };

  $('btn-reset').onclick = () => {
    if (
      confirm('⚠️ すべてのデータをリセットしますか？この操作は取り消せません。')
    ) {
      localStorage.removeItem(STORAGE_KEY);
      S = defaultState();
      saveState();
      showToast('データをリセットしました', 'success');
      location.reload();
    }
  };
}

// ======================================================
// SECTION 17: PARTICLES (kept from v1)
// ======================================================

function initParticles() {
  const canvas = $('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const count = 50;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      a: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,195,247,${p.a})`;
      ctx.fill();
    }
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79,195,247,${0.08 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ======================================================
// SECTION 18: CLOCK UPDATE
// ======================================================

function startClock() {
  setInterval(() => {
    const now = new Date();
    $('hud-clock').textContent =
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }, 30000);
}

// ======================================================
// SECTION 19: APP INITIALIZATION
// ======================================================

function init() {
  loadState();
  ensureTodayReset();

  // Version display
  $('app-version').textContent = VERSION;

  // Init all systems
  initNavigation();
  initParticles();
  initAISidebar();
  initDataManagement();
  startClock();
  scheduleReminderLoop();

  // Render initial tab
  updateHUD();
  renderHome();
  renderCharacter();

  console.log(`🎮 LinguaQuest ${VERSION} initialized`);
}

// Start
document.addEventListener('DOMContentLoaded', init);
