/* ============================================================
   LinguaQuest — app.js (ALL-IN-ONE: Data + Logic + AI Tutor)
   ============================================================ */

/* ==================== DATA ==================== */
function expForLevel(lv) {
	return Math.floor(100 * Math.pow(1.15, lv - 1));
}

var TITLES = [
	{ lv: 1, title: '駆け出し冒険者' },
	{ lv: 5, title: '見習い言語士' },
	{ lv: 10, title: '言葉の旅人' },
	{ lv: 15, title: '知識の探求者' },
	{ lv: 20, title: '銀舌の語り部' },
	{ lv: 25, title: '言霊の使い手' },
	{ lv: 30, title: '多言語の賢者' },
	{ lv: 40, title: '言語の守護者' },
	{ lv: 50, title: '伝説の翻訳師' },
	{ lv: 60, title: '万語の大魔導士' },
	{ lv: 75, title: '言語神の代行者' },
	{ lv: 99, title: '全知の言語王' },
];

var ANCESTRIES = [
	{
		id: 'human',
		name: 'ヒューマン',
		icon: '🧑',
		rarity: 1,
		category: 'CORE',
		desc: '適応力に優れた汎用種族',
		heritages: [
			{
				id: 'versatile',
				name: '万能',
				bonus: {
					vocab: 5,
					grammar: 5,
					listening: 5,
					speaking: 5,
					reading: 5,
					writing: 5,
				},
				desc: '全スキル均等ボーナス',
			},
			{
				id: 'skilled',
				name: '熟練',
				bonus: { vocab: 15, grammar: 15 },
				desc: '語彙と文法に特化',
			},
			{
				id: 'ambitious',
				name: '野心家',
				bonus: { speaking: 20, writing: 10 },
				desc: '表現力重視',
			},
		],
	},
	{
		id: 'elf',
		name: 'エルフ',
		icon: '🧝',
		rarity: 2,
		category: 'CORE',
		desc: '長命で芸術と言語に秀でる',
		heritages: [
			{
				id: 'ancient',
				name: '古エルフ',
				bonus: { reading: 20, grammar: 15 },
				desc: '古典言語の理解力',
			},
			{
				id: 'woodland',
				name: '森エルフ',
				bonus: { listening: 20, vocab: 10 },
				desc: '自然音の聞き分け',
			},
			{
				id: 'high',
				name: 'ハイエルフ',
				bonus: { writing: 15, grammar: 15 },
				desc: '優雅な文章力',
			},
		],
	},
	{
		id: 'dwarf',
		name: 'ドワーフ',
		icon: '⛏️',
		rarity: 1,
		category: 'CORE',
		desc: '頑強で記憶力に優れる',
		heritages: [
			{
				id: 'forge',
				name: '鍛冶',
				bonus: { vocab: 20, writing: 10 },
				desc: '専門用語の記憶力',
			},
			{
				id: 'deep',
				name: '深淵',
				bonus: { reading: 15, listening: 15 },
				desc: '暗所での集中力',
			},
		],
	},
	{
		id: 'gnome',
		name: 'ノーム',
		icon: '🍄',
		rarity: 2,
		category: 'CORE',
		desc: '好奇心旺盛な小型種族',
		heritages: [
			{
				id: 'rock',
				name: '岩ノーム',
				bonus: { grammar: 20, reading: 10 },
				desc: '論理的思考',
			},
			{
				id: 'fey',
				name: '妖精ノーム',
				bonus: { speaking: 15, listening: 15 },
				desc: '音声模倣能力',
			},
		],
	},
	{
		id: 'halfling',
		name: 'ハーフリング',
		icon: '🦶',
		rarity: 1,
		category: 'CORE',
		desc: '幸運と順応性を持つ',
		heritages: [
			{
				id: 'gutsy',
				name: '豪胆',
				bonus: { speaking: 20, vocab: 10 },
				desc: '臆さず話す勇気',
			},
			{
				id: 'hillock',
				name: '丘陵',
				bonus: { listening: 15, reading: 15 },
				desc: '穏やかな学習',
			},
		],
	},
	{
		id: 'goblin',
		name: 'ゴブリン',
		icon: '👺',
		rarity: 1,
		category: 'CORE',
		desc: '素早い学習と応用力',
		heritages: [
			{
				id: 'razortooth',
				name: '鋭歯',
				bonus: { speaking: 20, vocab: 10 },
				desc: '素早い発話',
			},
			{
				id: 'unbreakable',
				name: '不屈',
				bonus: { grammar: 15, writing: 15 },
				desc: '粘り強い反復学習',
			},
		],
	},
	{
		id: 'orc',
		name: 'オーク',
		icon: '💪',
		rarity: 1,
		category: 'CORE',
		desc: '力強い意志と記憶力',
		heritages: [
			{
				id: 'hold',
				name: '砦育ち',
				bonus: { vocab: 20, speaking: 10 },
				desc: '力強い暗記力',
			},
			{
				id: 'badlands',
				name: '荒野育ち',
				bonus: { listening: 15, grammar: 15 },
				desc: 'サバイバル語彙',
			},
		],
	},
	{
		id: 'halfelf',
		name: 'ハーフエルフ',
		icon: '🌿',
		rarity: 2,
		category: 'CORE',
		desc: '二つの血統からの恩恵',
		heritages: [
			{
				id: 'sociable',
				name: '社交的',
				bonus: { speaking: 15, listening: 15 },
				desc: '会話の達人',
			},
			{
				id: 'lorekeeper',
				name: '伝承',
				bonus: { reading: 20, vocab: 10 },
				desc: '歴史的知識',
			},
		],
	},
	{
		id: 'halforc',
		name: 'ハーフオーク',
		icon: '🗡️',
		rarity: 1,
		category: 'CORE',
		desc: '強靭さと適応力の融合',
		heritages: [
			{
				id: 'mightymaw',
				name: '猛顎',
				bonus: { speaking: 20, grammar: 10 },
				desc: '声量と発声力',
			},
			{
				id: 'keen',
				name: '鋭敏',
				bonus: { listening: 20, reading: 10 },
				desc: '細部への注意力',
			},
		],
	},
	{
		id: 'leshy',
		name: 'レシー',
		icon: '🌱',
		rarity: 2,
		category: 'CORE',
		desc: '自然から生まれた植物種族',
		heritages: [
			{
				id: 'leaf',
				name: '葉',
				bonus: { listening: 20, speaking: 10 },
				desc: '風の言葉を聞く',
			},
			{
				id: 'fungus',
				name: '菌糸',
				bonus: { vocab: 15, grammar: 15 },
				desc: 'ネットワーク思考',
			},
		],
	},
	{
		id: 'catfolk',
		name: 'キャットフォーク',
		icon: '🐱',
		rarity: 2,
		category: 'UNCOMMON',
		desc: '猫の優雅さと好奇心',
		heritages: [
			{
				id: 'clawed',
				name: '爪持ち',
				bonus: { writing: 20, vocab: 10 },
				desc: '素早い筆記',
			},
			{
				id: 'hunting',
				name: '狩猟',
				bonus: { listening: 20, speaking: 10 },
				desc: '音声追跡能力',
			},
		],
	},
	{
		id: 'lizardfolk',
		name: 'リザードフォーク',
		icon: '🦎',
		rarity: 2,
		category: 'UNCOMMON',
		desc: '冷静な判断力と忍耐',
		heritages: [
			{
				id: 'swamp',
				name: '沼地',
				bonus: { reading: 15, grammar: 15 },
				desc: '集中持続力',
			},
			{
				id: 'sand',
				name: '砂漠',
				bonus: { vocab: 20, listening: 10 },
				desc: '環境適応語彙',
			},
		],
	},
	{
		id: 'tengu',
		name: 'テング',
		icon: '🐦',
		rarity: 3,
		category: 'UNCOMMON',
		desc: '声帯模倣の達人',
		heritages: [
			{
				id: 'skyborn',
				name: '天生',
				bonus: { speaking: 25, listening: 10 },
				desc: '完璧な発音模倣',
			},
			{
				id: 'stormwing',
				name: '嵐翼',
				bonus: { vocab: 15, writing: 15 },
				desc: '詩的表現力',
			},
		],
	},
	{
		id: 'ratfolk',
		name: 'ラットフォーク',
		icon: '🐀',
		rarity: 1,
		category: 'UNCOMMON',
		desc: '情報収集と暗記の達人',
		heritages: [
			{
				id: 'sewer',
				name: '下水道',
				bonus: { vocab: 25, reading: 5 },
				desc: '雑多な語彙力',
			},
			{
				id: 'longsnout',
				name: '長鼻',
				bonus: { listening: 20, grammar: 10 },
				desc: '鋭い聴覚',
			},
		],
	},
	{
		id: 'kobold',
		name: 'コボルド',
		icon: '🐲',
		rarity: 2,
		category: 'UNCOMMON',
		desc: '竜の血を引く小種族',
		heritages: [
			{
				id: 'dragonscale',
				name: '竜鱗',
				bonus: { grammar: 20, vocab: 10 },
				desc: '竜語の残滓',
			},
			{
				id: 'tunnelflame',
				name: '坑道炎',
				bonus: { reading: 15, writing: 15 },
				desc: '暗所筆写能力',
			},
		],
	},
	{
		id: 'kitsune',
		name: 'キツネ',
		icon: '🦊',
		rarity: 3,
		category: 'UNCOMMON',
		desc: '変化と多言語の才能',
		heritages: [
			{
				id: 'shapechanger',
				name: '変化',
				bonus: { speaking: 20, listening: 15 },
				desc: 'アクセント変化自在',
			},
			{
				id: 'celestial',
				name: '天狐',
				bonus: { reading: 20, writing: 15 },
				desc: '古文書の理解',
			},
		],
	},
	{
		id: 'automaton',
		name: 'オートマトン',
		icon: '🤖',
		rarity: 3,
		category: 'UNCOMMON',
		desc: '機械仕掛けの学習者',
		heritages: [
			{
				id: 'hunter',
				name: '狩猟型',
				bonus: { listening: 25, vocab: 10 },
				desc: '音声認識精度',
			},
			{
				id: 'mage',
				name: '魔導型',
				bonus: { grammar: 20, writing: 15 },
				desc: '構文解析能力',
			},
		],
	},
	{
		id: 'fetchling',
		name: 'フェッチリング',
		icon: '🌑',
		rarity: 3,
		category: 'UNCOMMON',
		desc: '影界から来た存在',
		heritages: [
			{
				id: 'bright',
				name: '光影',
				bonus: { reading: 20, listening: 15 },
				desc: '暗号解読能力',
			},
			{
				id: 'deep',
				name: '深影',
				bonus: { writing: 20, speaking: 15 },
				desc: '暗示的表現力',
			},
		],
	},
	{
		id: 'sprite',
		name: 'スプライト',
		icon: '✨',
		rarity: 3,
		category: 'UNCOMMON',
		desc: '妖精界の極小種族',
		heritages: [
			{
				id: 'dragonfly',
				name: '蜻蛉',
				bonus: { listening: 20, speaking: 15 },
				desc: '高速言語処理',
			},
			{
				id: 'luminous',
				name: '発光',
				bonus: { vocab: 15, grammar: 15, reading: 5 },
				desc: '知識照射',
			},
		],
	},
	{
		id: 'grippli',
		name: 'グリプリ',
		icon: '🐸',
		rarity: 2,
		category: 'UNCOMMON',
		desc: '樹上生活の蛙人族',
		heritages: [
			{
				id: 'poisonhide',
				name: '毒皮',
				bonus: { vocab: 20, grammar: 10 },
				desc: '薬学用語',
			},
			{
				id: 'windweb',
				name: '風網',
				bonus: { listening: 15, speaking: 15 },
				desc: '遠距離聴覚',
			},
		],
	},
	{
		id: 'android',
		name: 'アンドロイド',
		icon: '🤖',
		rarity: 4,
		category: 'RARE',
		desc: '古代文明の合成存在',
		heritages: [
			{
				id: 'polyglot',
				name: '多言語',
				bonus: { vocab: 20, grammar: 20 },
				desc: '言語DB搭載',
			},
			{
				id: 'artisan',
				name: '工匠',
				bonus: { writing: 25, reading: 10 },
				desc: '精密な文字出力',
			},
		],
	},
	{
		id: 'fleshwarp',
		name: 'フレッシュワープ',
		icon: '🧬',
		rarity: 4,
		category: 'RARE',
		desc: '魔法で変容した存在',
		heritages: [
			{
				id: 'created',
				name: '被造',
				bonus: { listening: 20, speaking: 15 },
				desc: '適応的発声器官',
			},
			{
				id: 'mutated',
				name: '変異',
				bonus: { vocab: 15, grammar: 15, writing: 5 },
				desc: '変容する理解力',
			},
		],
	},
	{
		id: 'strix',
		name: 'ストリックス',
		icon: '🦅',
		rarity: 4,
		category: 'RARE',
		desc: '翼を持つ空の民',
		heritages: [
			{
				id: 'nightglider',
				name: '夜翔',
				bonus: { listening: 25, reading: 10 },
				desc: '夜間学習効率UP',
			},
			{
				id: 'predator',
				name: '捕食者',
				bonus: { speaking: 20, vocab: 15 },
				desc: '鋭い発声と語彙',
			},
		],
	},
	{
		id: 'anadi',
		name: 'アナディ',
		icon: '🕷️',
		rarity: 4,
		category: 'RARE',
		desc: '蜘蛛と人の二重形態',
		heritages: [
			{
				id: 'snaring',
				name: '捕縛',
				bonus: { grammar: 25, writing: 10 },
				desc: '構文の網を張る',
			},
			{
				id: 'adaptive',
				name: '適応',
				bonus: { vocab: 15, listening: 15, speaking: 5 },
				desc: '環境言語吸収',
			},
		],
	},
	{
		id: 'conrasu',
		name: 'コンラス',
		icon: '🌀',
		rarity: 5,
		category: 'RARE',
		desc: '宇宙意志の結晶体',
		heritages: [
			{
				id: 'rite',
				name: '儀式',
				bonus: { grammar: 20, reading: 20 },
				desc: '宇宙の文法体系',
			},
			{
				id: 'grove',
				name: '聖林',
				bonus: { listening: 20, writing: 15, vocab: 5 },
				desc: '自然言語共鳴',
			},
		],
	},
	{
		id: 'goloma',
		name: 'ゴロマ',
		icon: '👁️',
		rarity: 4,
		category: 'RARE',
		desc: '全身に目を持つ種族',
		heritages: [
			{
				id: 'overlooked',
				name: '看過',
				bonus: { reading: 30 },
				desc: '超速読能力',
			},
			{
				id: 'visionguard',
				name: '視護',
				bonus: { vocab: 15, listening: 15, grammar: 5 },
				desc: '全方位情報収集',
			},
		],
	},
	{
		id: 'kashrishi',
		name: 'カシュリシ',
		icon: '🔮',
		rarity: 4,
		category: 'RARE',
		desc: '水晶角のテレパス種族',
		heritages: [
			{
				id: 'empathic',
				name: '共感',
				bonus: { listening: 25, speaking: 10 },
				desc: '感情言語の理解',
			},
			{
				id: 'shielded',
				name: '遮蔽',
				bonus: { grammar: 20, reading: 15 },
				desc: '雑念排除集中',
			},
		],
	},
	{
		id: 'poppet',
		name: 'ポペット',
		icon: '🪆',
		rarity: 5,
		category: 'RARE',
		desc: '魂を宿した人形',
		heritages: [
			{
				id: 'stuffed',
				name: '綿詰め',
				bonus: { vocab: 20, writing: 15 },
				desc: '知識を詰め込む',
			},
			{
				id: 'windup',
				name: 'ゼンマイ',
				bonus: { grammar: 15, speaking: 15, listening: 5 },
				desc: '正確な反復練習',
			},
		],
	},
	{
		id: 'shisk',
		name: 'シスク',
		icon: '🦔',
		rarity: 5,
		category: 'RARE',
		desc: '知識を守護する隠者種族',
		heritages: [
			{
				id: 'loremaster',
				name: '伝承師',
				bonus: { reading: 25, vocab: 15 },
				desc: '究極の読書家',
			},
			{
				id: 'quillcoat',
				name: '棘衣',
				bonus: { writing: 25, grammar: 10 },
				desc: '鋭い筆致',
			},
		],
	},
	{
		id: 'skeleton',
		name: 'スケルトン',
		icon: '💀',
		rarity: 5,
		category: 'RARE',
		desc: '不死の学習者',
		heritages: [
			{
				id: 'fodder',
				name: '量産',
				bonus: { vocab: 15, grammar: 15, reading: 5 },
				desc: '無限の反復耐性',
			},
			{
				id: 'sturdy',
				name: '頑丈',
				bonus: { writing: 20, speaking: 15 },
				desc: '不眠の学習',
			},
		],
	},
];

var CLASSES = [
	{
		id: 'wizard',
		name: 'ウィザード',
		icon: '🧙',
		desc: '文法の達人',
		subclasses: [
			{
				id: 'grammarian',
				name: '文法魔導士',
				bonus: { grammar: 30 },
				desc: '構文解析のエキスパート',
			},
			{
				id: 'etymologist',
				name: '語源学者',
				bonus: { vocab: 20, reading: 10 },
				desc: '言葉のルーツを追求',
			},
		],
	},
	{
		id: 'bard',
		name: 'バード',
		icon: '🎵',
		desc: '聴覚と発話に秀でる',
		subclasses: [
			{
				id: 'maestro',
				name: 'マエストロ',
				bonus: { listening: 25, speaking: 10 },
				desc: '音の指揮者',
			},
			{
				id: 'polyglot',
				name: 'ポリグロット',
				bonus: { speaking: 20, vocab: 15 },
				desc: '多言語の語り部',
			},
		],
	},
	{
		id: 'rogue',
		name: 'ローグ',
		icon: '🗡️',
		desc: '実践的スキル習得者',
		subclasses: [
			{
				id: 'thief',
				name: 'シーフ',
				bonus: { vocab: 25, listening: 10 },
				desc: '言葉を盗む才能',
			},
			{
				id: 'mastermind',
				name: 'マスターマインド',
				bonus: { grammar: 15, reading: 15, writing: 5 },
				desc: '戦略的学習者',
			},
		],
	},
	{
		id: 'cleric',
		name: 'クレリック',
		icon: '⛪',
		desc: '読解と精神力の守護者',
		subclasses: [
			{
				id: 'warpriest',
				name: '戦神官',
				bonus: { reading: 20, speaking: 15 },
				desc: '声高き朗読者',
			},
			{
				id: 'cloister',
				name: '隠修士',
				bonus: { reading: 25, writing: 10 },
				desc: '静寂の中の精読',
			},
		],
	},
	{
		id: 'fighter',
		name: 'ファイター',
		icon: '⚔️',
		desc: '反復練習の鬼',
		subclasses: [
			{
				id: 'drillmaster',
				name: '教練士',
				bonus: { vocab: 20, grammar: 15 },
				desc: '反復暗記の達人',
			},
			{
				id: 'shield',
				name: '盾衛',
				bonus: { listening: 15, speaking: 15, reading: 5 },
				desc: '防御的学習',
			},
		],
	},
	{
		id: 'ranger',
		name: 'レンジャー',
		icon: '🏹',
		desc: '独学と探索の達人',
		subclasses: [
			{
				id: 'hunter',
				name: 'ハンター',
				bonus: { listening: 25, vocab: 10 },
				desc: '言葉を狩る者',
			},
			{
				id: 'guide',
				name: 'ガイド',
				bonus: { speaking: 20, reading: 10, writing: 5 },
				desc: '言語の道案内',
			},
		],
	},
	{
		id: 'monk',
		name: 'モンク',
		icon: '🥋',
		desc: '規律ある反復修行者',
		subclasses: [
			{
				id: 'stance',
				name: '構え師',
				bonus: { grammar: 20, writing: 15 },
				desc: '形式の追求',
			},
			{
				id: 'meditation',
				name: '瞑想師',
				bonus: { listening: 20, reading: 15 },
				desc: '深い理解',
			},
		],
	},
	{
		id: 'druid',
		name: 'ドルイド',
		icon: '🌿',
		desc: '自然言語との対話者',
		subclasses: [
			{
				id: 'storm',
				name: '嵐',
				bonus: { listening: 25, speaking: 10 },
				desc: '自然音声学習',
			},
			{
				id: 'wild',
				name: '野性',
				bonus: { vocab: 20, grammar: 10, listening: 5 },
				desc: '直感的言語習得',
			},
		],
	},
	{
		id: 'sorcerer',
		name: 'ソーサラー',
		icon: '🔥',
		desc: '直感と天賦の才',
		subclasses: [
			{
				id: 'imperial',
				name: '帝血',
				bonus: { speaking: 25, grammar: 10 },
				desc: '支配的な弁舌',
			},
			{
				id: 'fey',
				name: '妖精血',
				bonus: { listening: 20, vocab: 15 },
				desc: '直感的語彙習得',
			},
		],
	},
	{
		id: 'alchemist',
		name: 'アルケミスト',
		icon: '⚗️',
		desc: '学習法の研究者',
		subclasses: [
			{
				id: 'bomber',
				name: '爆弾師',
				bonus: { vocab: 25, writing: 10 },
				desc: '爆発的暗記',
			},
			{
				id: 'chirurgeon',
				name: '外科師',
				bonus: { reading: 20, grammar: 15 },
				desc: '精密な読解',
			},
		],
	},
	{
		id: 'barbarian',
		name: 'バーバリアン',
		icon: '🪓',
		desc: 'パッションで学ぶ',
		subclasses: [
			{
				id: 'fury',
				name: '激怒',
				bonus: { speaking: 30 },
				desc: '情熱的な会話力',
			},
			{
				id: 'giant',
				name: '巨人の血',
				bonus: { vocab: 20, listening: 15 },
				desc: '豪快な語彙力',
			},
		],
	},
	{
		id: 'champion',
		name: 'チャンピオン',
		icon: '🛡️',
		desc: '正道の学習者',
		subclasses: [
			{
				id: 'paladin',
				name: 'パラディン',
				bonus: { grammar: 20, speaking: 15 },
				desc: '正しい言葉遣い',
			},
			{
				id: 'liberator',
				name: '解放者',
				bonus: { reading: 15, writing: 15, vocab: 5 },
				desc: '自由な表現',
			},
		],
	},
	{
		id: 'witch',
		name: 'ウィッチ',
		icon: '🧹',
		desc: '秘術と暗記の専門家',
		subclasses: [
			{
				id: 'hex',
				name: '呪術師',
				bonus: { vocab: 20, grammar: 15 },
				desc: '呪文詠唱記憶',
			},
			{
				id: 'ley',
				name: '地脈使い',
				bonus: { reading: 20, listening: 15 },
				desc: '地脈の知識',
			},
		],
	},
	{
		id: 'oracle',
		name: 'オラクル',
		icon: '🔮',
		desc: '予知と言語直感',
		subclasses: [
			{
				id: 'flames',
				name: '炎の神託',
				bonus: { speaking: 20, writing: 15 },
				desc: '熱き予言',
			},
			{
				id: 'lore',
				name: '伝承の神託',
				bonus: { reading: 25, vocab: 10 },
				desc: '知識の神託',
			},
		],
	},
	{
		id: 'investigator',
		name: 'インベスティゲーター',
		icon: '🔍',
		desc: '分析的な学習者',
		subclasses: [
			{
				id: 'forensic',
				name: '法医学',
				bonus: { reading: 20, grammar: 15 },
				desc: '証拠から学ぶ',
			},
			{
				id: 'empiricism',
				name: '経験主義',
				bonus: { listening: 20, vocab: 15 },
				desc: '実践的検証',
			},
		],
	},
	{
		id: 'swashbuckler',
		name: 'スワッシュバックラー',
		icon: '🤺',
		desc: '華麗な話術の使い手',
		subclasses: [
			{
				id: 'braggart',
				name: '自慢屋',
				bonus: { speaking: 25, vocab: 10 },
				desc: '堂々たる弁舌',
			},
			{
				id: 'fencer',
				name: '剣士',
				bonus: { grammar: 20, writing: 15 },
				desc: '鋭い言葉の剣',
			},
		],
	},
	{
		id: 'magus',
		name: 'メイガス',
		icon: '⚡',
		desc: '理論と実践の融合',
		subclasses: [
			{
				id: 'sparkling',
				name: '閃光',
				bonus: { grammar: 20, speaking: 15 },
				desc: '即興文法運用',
			},
			{
				id: 'starlit',
				name: '星光',
				bonus: { reading: 20, writing: 15 },
				desc: '読み書きの融合',
			},
		],
	},
	{
		id: 'summoner',
		name: 'サモナー',
		icon: '👻',
		desc: '分身で多角的に学ぶ',
		subclasses: [
			{
				id: 'beast',
				name: 'ビースト',
				bonus: { listening: 20, speaking: 15 },
				desc: '本能的聞き取り',
			},
			{
				id: 'construct',
				name: 'コンストラクト',
				bonus: { grammar: 25, reading: 10 },
				desc: '構造的理解',
			},
		],
	},
	{
		id: 'gunslinger',
		name: 'ガンスリンガー',
		icon: '🔫',
		desc: '速射暗記の名手',
		subclasses: [
			{
				id: 'sniper',
				name: 'スナイパー',
				bonus: { vocab: 25, reading: 10 },
				desc: '精密な単語射撃',
			},
			{
				id: 'drifter',
				name: 'ドリフター',
				bonus: { listening: 15, speaking: 15, writing: 5 },
				desc: '流浪の会話術',
			},
		],
	},
	{
		id: 'inventor',
		name: 'インベンター',
		icon: '🔧',
		desc: '学習ツール発明家',
		subclasses: [
			{
				id: 'armor',
				name: '装甲型',
				bonus: { grammar: 20, writing: 15 },
				desc: '堅牢な文法基盤',
			},
			{
				id: 'weapon',
				name: '武器型',
				bonus: { vocab: 25, speaking: 10 },
				desc: '切れ味鋭い語彙',
			},
		],
	},
	{
		id: 'thaumaturge',
		name: 'ソーマターグ',
		icon: '📿',
		desc: '万物の知識を操る',
		subclasses: [
			{
				id: 'tome',
				name: '聖典',
				bonus: { reading: 25, grammar: 10 },
				desc: '書物の理解者',
			},
			{
				id: 'amulet',
				name: '護符',
				bonus: { vocab: 20, listening: 15 },
				desc: '記憶のお守り',
			},
		],
	},
	{
		id: 'psychic',
		name: 'サイキック',
		icon: '🧠',
		desc: '精神力で言語を操る',
		subclasses: [
			{
				id: 'tangible',
				name: '有形思念',
				bonus: { writing: 25, grammar: 10 },
				desc: '思考を文字に',
			},
			{
				id: 'oscillating',
				name: '波動',
				bonus: { listening: 25, speaking: 10 },
				desc: '言語波の受信',
			},
		],
	},
	{
		id: 'kineticist',
		name: 'キネティシスト',
		icon: '🌊',
		desc: '元素力で学習を加速',
		subclasses: [
			{
				id: 'fire',
				name: '炎素',
				bonus: { speaking: 20, writing: 15 },
				desc: '燃える表現力',
			},
			{
				id: 'water',
				name: '水素',
				bonus: { listening: 20, reading: 15 },
				desc: '流れるように理解',
			},
		],
	},
];

var SPHERE_NODES = [
	{
		id: 'hub',
		zone: 'center',
		x: 400,
		y: 300,
		label: '出発点',
		type: 'hub',
		rarity: 1,
		icon: '🌟',
		prereq: [],
		reward: { exp: 0 },
		desc: '冒険の始まり',
	},
	{
		id: 'v1',
		zone: 'vocab',
		x: 250,
		y: 150,
		label: '基礎単語50',
		type: 'skill',
		rarity: 1,
		icon: '📝',
		prereq: ['hub'],
		reward: { exp: 20, vocab: 5 },
		desc: '最初の50語',
	},
	{
		id: 'v2',
		zone: 'vocab',
		x: 180,
		y: 100,
		label: '日常単語100',
		type: 'skill',
		rarity: 2,
		icon: '📖',
		prereq: ['v1'],
		reward: { exp: 40, vocab: 10 },
		desc: '日常会話の基本語彙',
	},
	{
		id: 'v3',
		zone: 'vocab',
		x: 120,
		y: 60,
		label: '単語マスター',
		type: 'skill',
		rarity: 3,
		icon: '🏆',
		prereq: ['v2'],
		reward: { exp: 80, vocab: 20 },
		desc: '語彙力の飛躍',
	},
	{
		id: 'v_boss',
		zone: 'vocab',
		x: 60,
		y: 30,
		label: '語彙の番人',
		type: 'boss',
		rarity: 4,
		icon: '🐉',
		prereq: ['v3'],
		reward: { exp: 200, vocab: 30, gold: 100 },
		desc: 'BOSS: 語彙テスト',
	},
	{
		id: 'v_chest',
		zone: 'vocab',
		x: 200,
		y: 50,
		label: '宝箱: レア単語集',
		type: 'chest',
		rarity: 3,
		icon: '🎁',
		prereq: ['v2'],
		reward: { exp: 50, gold: 50 },
		desc: '珍しい単語を入手',
	},
	{
		id: 'g1',
		zone: 'grammar',
		x: 550,
		y: 150,
		label: '基礎文法',
		type: 'skill',
		rarity: 1,
		icon: '📐',
		prereq: ['hub'],
		reward: { exp: 20, grammar: 5 },
		desc: '品詞と語順の基本',
	},
	{
		id: 'g2',
		zone: 'grammar',
		x: 620,
		y: 100,
		label: '時制マスター',
		type: 'skill',
		rarity: 2,
		icon: '⏰',
		prereq: ['g1'],
		reward: { exp: 40, grammar: 10 },
		desc: '過去・現在・未来',
	},
	{
		id: 'g3',
		zone: 'grammar',
		x: 680,
		y: 60,
		label: '複文構造',
		type: 'skill',
		rarity: 3,
		icon: '🔗',
		prereq: ['g2'],
		reward: { exp: 80, grammar: 20 },
		desc: '従属節と複合文',
	},
	{
		id: 'g_boss',
		zone: 'grammar',
		x: 740,
		y: 30,
		label: '文法の守護者',
		type: 'boss',
		rarity: 4,
		icon: '🐉',
		prereq: ['g3'],
		reward: { exp: 200, grammar: 30, gold: 100 },
		desc: 'BOSS: 文法総合テスト',
	},
	{
		id: 'g_event',
		zone: 'grammar',
		x: 600,
		y: 50,
		label: '文法チャレンジ',
		type: 'event',
		rarity: 2,
		icon: '⚡',
		prereq: ['g1'],
		reward: { exp: 60, grammar: 8 },
		desc: 'ランダム文法イベント',
	},
	{
		id: 'l1',
		zone: 'listening',
		x: 250,
		y: 400,
		label: '聞き取り入門',
		type: 'skill',
		rarity: 1,
		icon: '👂',
		prereq: ['hub'],
		reward: { exp: 20, listening: 5 },
		desc: 'ゆっくり音声に慣れる',
	},
	{
		id: 'l2',
		zone: 'listening',
		x: 180,
		y: 450,
		label: '自然速度',
		type: 'skill',
		rarity: 2,
		icon: '🎧',
		prereq: ['l1'],
		reward: { exp: 40, listening: 10 },
		desc: 'ネイティブスピード',
	},
	{
		id: 'l3',
		zone: 'listening',
		x: 120,
		y: 500,
		label: '多方言理解',
		type: 'skill',
		rarity: 3,
		icon: '🌍',
		prereq: ['l2'],
		reward: { exp: 80, listening: 20 },
		desc: '様々なアクセント',
	},
	{
		id: 'l_boss',
		zone: 'listening',
		x: 60,
		y: 540,
		label: '聴覚の試練',
		type: 'boss',
		rarity: 4,
		icon: '🐉',
		prereq: ['l3'],
		reward: { exp: 200, listening: 30, gold: 100 },
		desc: 'BOSS: リスニング試験',
	},
	{
		id: 's1',
		zone: 'speaking',
		x: 550,
		y: 400,
		label: '発声練習',
		type: 'skill',
		rarity: 1,
		icon: '🗣️',
		prereq: ['hub'],
		reward: { exp: 20, speaking: 5 },
		desc: '基本の発声と発音',
	},
	{
		id: 's2',
		zone: 'speaking',
		x: 620,
		y: 450,
		label: '会話実践',
		type: 'skill',
		rarity: 2,
		icon: '💬',
		prereq: ['s1'],
		reward: { exp: 40, speaking: 10 },
		desc: '日常会話の練習',
	},
	{
		id: 's3',
		zone: 'speaking',
		x: 680,
		y: 500,
		label: 'プレゼン力',
		type: 'skill',
		rarity: 3,
		icon: '🎤',
		prereq: ['s2'],
		reward: { exp: 80, speaking: 20 },
		desc: 'スピーチ力',
	},
	{
		id: 's_boss',
		zone: 'speaking',
		x: 740,
		y: 540,
		label: '弁論の覇者',
		type: 'boss',
		rarity: 4,
		icon: '🐉',
		prereq: ['s3'],
		reward: { exp: 200, speaking: 30, gold: 100 },
		desc: 'BOSS: スピーキング試験',
	},
	{
		id: 's_chest',
		zone: 'speaking',
		x: 600,
		y: 520,
		label: '宝箱: 慣用句集',
		type: 'chest',
		rarity: 3,
		icon: '🎁',
		prereq: ['s2'],
		reward: { exp: 50, gold: 50 },
		desc: '実用的な慣用句',
	},
	{
		id: 'r1',
		zone: 'reading',
		x: 300,
		y: 250,
		label: '文字認識',
		type: 'skill',
		rarity: 1,
		icon: '🔤',
		prereq: ['hub'],
		reward: { exp: 20, reading: 5 },
		desc: '文字と記号を学ぶ',
	},
	{
		id: 'r2',
		zone: 'reading',
		x: 230,
		y: 280,
		label: '短文読解',
		type: 'skill',
		rarity: 2,
		icon: '📄',
		prereq: ['r1'],
		reward: { exp: 40, reading: 10 },
		desc: '短い文章を読む',
	},
	{
		id: 'r3',
		zone: 'reading',
		x: 160,
		y: 310,
		label: '長文読解',
		type: 'skill',
		rarity: 3,
		icon: '📚',
		prereq: ['r2'],
		reward: { exp: 80, reading: 20 },
		desc: 'まとまった文章の理解',
	},
	{
		id: 'r_boss',
		zone: 'reading',
		x: 90,
		y: 340,
		label: '書物の守護竜',
		type: 'boss',
		rarity: 5,
		icon: '🐉',
		prereq: ['r3'],
		reward: { exp: 250, reading: 35, gold: 150 },
		desc: 'BOSS: 読解力の究極試練',
	},
	{
		id: 'w1',
		zone: 'writing',
		x: 500,
		y: 250,
		label: '筆記入門',
		type: 'skill',
		rarity: 1,
		icon: '✏️',
		prereq: ['hub'],
		reward: { exp: 20, writing: 5 },
		desc: '基本的な筆記練習',
	},
	{
		id: 'w2',
		zone: 'writing',
		x: 570,
		y: 280,
		label: '短文作成',
		type: 'skill',
		rarity: 2,
		icon: '📝',
		prereq: ['w1'],
		reward: { exp: 40, writing: 10 },
		desc: '短い文章を書く',
	},
	{
		id: 'w3',
		zone: 'writing',
		x: 640,
		y: 310,
		label: 'エッセイ',
		type: 'skill',
		rarity: 3,
		icon: '📜',
		prereq: ['w2'],
		reward: { exp: 80, writing: 20 },
		desc: '論理的な文章を書く',
	},
	{
		id: 'w_boss',
		zone: 'writing',
		x: 710,
		y: 340,
		label: '文筆の大賢者',
		type: 'boss',
		rarity: 5,
		icon: '🐉',
		prereq: ['w3'],
		reward: { exp: 250, writing: 35, gold: 150 },
		desc: 'BOSS: 筆記力の究極試練',
	},
	{
		id: 'w_event',
		zone: 'writing',
		x: 560,
		y: 330,
		label: '創作イベント',
		type: 'event',
		rarity: 2,
		icon: '⚡',
		prereq: ['w1'],
		reward: { exp: 60, writing: 8 },
		desc: 'ランダム創作チャレンジ',
	},
];

var JOB_SYNERGY = {
	wizard: ['grammar', 'reading'],
	bard: ['listening', 'speaking'],
	rogue: ['vocab', 'listening'],
	cleric: ['reading', 'writing'],
	fighter: ['vocab', 'grammar'],
	ranger: ['listening', 'vocab'],
	monk: ['grammar', 'writing'],
	druid: ['listening', 'reading'],
	sorcerer: ['speaking', 'grammar'],
	alchemist: ['vocab', 'writing'],
	barbarian: ['speaking', 'vocab'],
	champion: ['grammar', 'speaking'],
	witch: ['vocab', 'grammar'],
	oracle: ['speaking', 'reading'],
	investigator: ['reading', 'grammar'],
	swashbuckler: ['speaking', 'vocab'],
	magus: ['grammar', 'speaking'],
	summoner: ['listening', 'speaking'],
	gunslinger: ['vocab', 'reading'],
	inventor: ['grammar', 'writing'],
	thaumaturge: ['reading', 'vocab'],
	psychic: ['writing', 'listening'],
	kineticist: ['speaking', 'reading'],
};

console.log(
	'✅ Data loaded:',
	ANCESTRIES.length,
	'ancestries,',
	CLASSES.length,
	'classes,',
	SPHERE_NODES.length,
	'nodes',
);
/* ==================== STATE ==================== */
var DEFAULT_STATE = {
	name: '冒険者',
	ancestry: 'human',
	heritage: 'versatile',
	cls: 'wizard',
	subclass: 'grammarian',
	level: 1,
	exp: 0,
	gold: 0,
	hp: 100,
	maxHp: 100,
	skills: {
		vocab: 0,
		grammar: 0,
		listening: 0,
		speaking: 0,
		reading: 0,
		writing: 0,
	},
	timer: { logs: [], todayTotal: 0, target: 30 },
	calendar: {},
	vocab: { words: [], nextId: 1 },
	review: { queue: [], history: [] },
	sphere: { unlocked: ['hub'], activated: ['hub'] },
	settings: {},
};
var state = {};
function loadState() {
	try {
		var s = localStorage.getItem('linguaquest_state');
		if (s) {
			state = JSON.parse(s);
			for (var k in DEFAULT_STATE)
				if (!(k in state))
					state[k] = JSON.parse(JSON.stringify(DEFAULT_STATE[k]));
			if (!state.skills)
				state.skills = {
					vocab: 0,
					grammar: 0,
					listening: 0,
					speaking: 0,
					reading: 0,
					writing: 0,
				};
			if (!state.sphere)
				state.sphere = { unlocked: ['hub'], activated: ['hub'] };
			if (!state.sphere.activated) state.sphere.activated = ['hub'];
		} else state = JSON.parse(JSON.stringify(DEFAULT_STATE));
	} catch (e) {
		state = JSON.parse(JSON.stringify(DEFAULT_STATE));
	}
}
function saveState() {
	try {
		localStorage.setItem('linguaquest_state', JSON.stringify(state));
	} catch (e) {}
}
function resetState() {
	if (confirm('本当にすべてのデータをリセットしますか？')) {
		state = JSON.parse(JSON.stringify(DEFAULT_STATE));
		saveState();
		location.reload();
	}
}

/* ==================== UTILITIES ==================== */
function getAncestry(id) {
	return ANCESTRIES.find(function (a) {
		return a.id === (id || state.ancestry);
	});
}
function getHeritage(aId, hId) {
	var a = getAncestry(aId);
	return a
		? a.heritages.find(function (h) {
				return h.id === (hId || state.heritage);
			})
		: null;
}
function getClass(id) {
	return CLASSES.find(function (c) {
		return c.id === (id || state.cls);
	});
}
function getSubclass(cId, sId) {
	var c = getClass(cId);
	return c
		? c.subclasses.find(function (s) {
				return s.id === (sId || state.subclass);
			})
		: null;
}
function getTitle() {
	var t = TITLES[0].title;
	for (var i = 0; i < TITLES.length; i++)
		if (state.level >= TITLES[i].lv) t = TITLES[i].title;
	return t;
}
function calcBonuses() {
	var b = {
		vocab: 0,
		grammar: 0,
		listening: 0,
		speaking: 0,
		reading: 0,
		writing: 0,
	};
	var h = getHeritage(state.ancestry, state.heritage);
	var sc = getSubclass(state.cls, state.subclass);
	if (h && h.bonus) for (var k in h.bonus) b[k] = (b[k] || 0) + h.bonus[k];
	if (sc && sc.bonus) for (var k in sc.bonus) b[k] = (b[k] || 0) + sc.bonus[k];
	return b;
}
function skillLabel(k) {
	var m = {
		vocab: '語彙',
		grammar: '文法',
		listening: '聴解',
		speaking: '会話',
		reading: '読解',
		writing: '筆記',
	};
	return m[k] || k;
}
function todayKey(d) {
	var x = d || new Date();
	return (
		x.getFullYear() +
		'-' +
		String(x.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(x.getDate()).padStart(2, '0')
	);
}
function isNightTime() {
	var h = new Date().getHours();
	return h >= 22 || h < 5;
}
function getStreak() {
	var s = 0,
		d = new Date();
	for (var i = 0; i < 365; i++) {
		var k = todayKey(d);
		if (state.calendar[k] && state.calendar[k].studied) {
			s++;
			d.setDate(d.getDate() - 1);
		} else if (i === 0) {
			d.setDate(d.getDate() - 1);
		} else break;
	}
	return s;
}
function getStreakBonus() {
	var s = getStreak();
	if (s >= 30) return 0.15;
	if (s >= 14) return 0.1;
	if (s >= 7) return 0.05;
	return 0;
}
function logStudyToday(min) {
	var k = todayKey();
	if (!state.calendar[k]) state.calendar[k] = { studied: false, minutes: 0 };
	state.calendar[k].studied = true;
	state.calendar[k].minutes += min;
	saveState();
}
function esc(s) {
	if (!s) return '';
	var d = document.createElement('div');
	d.textContent = s;
	return d.innerHTML;
}
function addExp(skill, amount) {
	var bn = calcBonuses();
	var bp = (bn[skill] || 0) / 100;
	var nb = isNightTime() ? 0.1 : 0;
	var sb = getStreakBonus();
	var total = Math.floor(amount * (1 + bp + nb + sb));
	if (skill && state.skills[skill] !== undefined) state.skills[skill] += total;
	state.exp += total;
	var needed = expForLevel(state.level);
	while (state.exp >= needed && state.level < 99) {
		state.exp -= needed;
		state.level++;
		needed = expForLevel(state.level);
		state.maxHp = 100 + (state.level - 1) * 5;
		state.hp = state.maxHp;
		showToast('🎉 レベルアップ！ Lv.' + state.level, 'gold');
	}
	saveState();
	updateHUD();
	return total;
}

/* ==================== TOAST / HUD ==================== */
function showToast(msg, type) {
	var c = document.querySelector('.toast-container');
	if (!c) {
		c = document.createElement('div');
		c.className = 'toast-container';
		document.body.appendChild(c);
	}
	var t = document.createElement('div');
	t.className = 'toast' + (type ? ' ' + type : '');
	t.textContent = msg;
	c.appendChild(t);
	setTimeout(function () {
		t.remove();
	}, 4000);
}
function updateHUD() {
	var l = document.getElementById('header-level');
	var g = document.getElementById('header-gold');
	if (l) l.textContent = 'Lv.' + state.level;
	if (g) g.textContent = '💰 ' + state.gold + ' G';
}
function updateClock() {
	var el = document.getElementById('header-clock');
	if (el)
		el.textContent = new Date().toLocaleTimeString('ja-JP', {
			hour: '2-digit',
			minute: '2-digit',
		});
}
function initParticles() {
	var c = document.getElementById('particles');
	if (!c) return;
	for (var i = 0; i < 30; i++) {
		var p = document.createElement('div');
		p.className = 'particle';
		p.style.left = Math.random() * 100 + '%';
		p.style.animationDelay = Math.random() * 8 + 's';
		p.style.animationDuration = 6 + Math.random() * 6 + 's';
		c.appendChild(p);
	}
}

/* ==================== NAV ==================== */
var currentTab = 'home';
function initNav() {
	var btns = document.querySelectorAll('.nav-btn');
	for (var i = 0; i < btns.length; i++) {
		(function (b) {
			b.addEventListener('click', function () {
				if (b.dataset.tab) switchTab(b.dataset.tab);
			});
		})(btns[i]);
	}
}
function switchTab(tab) {
	currentTab = tab;
	var btns = document.querySelectorAll('.nav-btn');
	for (var i = 0; i < btns.length; i++)
		btns[i].classList.toggle('active', btns[i].dataset.tab === tab);
	var secs = document.querySelectorAll('.tab-content');
	for (var i = 0; i < secs.length; i++)
		secs[i].classList.toggle('active', secs[i].id === 'tab-' + tab);
	var r = {
		home: renderHome,
		timer: renderTimer,
		calendar: renderCalendar,
		vocab: renderVocab,
		review: renderReview,
		character: renderCharacter,
		sphere: renderSphere,
		report: renderReport,
	};
	if (r[tab]) r[tab]();
}

/* ==================== HOME ==================== */
function renderHome() {
	var el = document.getElementById('tab-home');
	if (!el) return;
	var needed = expForLevel(state.level);
	var pct = Math.min(100, Math.floor((state.exp / needed) * 100));
	var streak = getStreak();
	var bonuses = calcBonuses();
	var anc = getAncestry();
	var skillsHtml = '';
	var keys = [
		'vocab',
		'grammar',
		'listening',
		'speaking',
		'reading',
		'writing',
	];
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var v = state.skills[k] || 0;
		var b = bonuses[k] || 0;
		skillsHtml +=
			'<div class="stat-row"><span class="stat-label">' +
			skillLabel(k) +
			(b > 0 ? ' <span class="badge rarity-2">+' + b + '%</span>' : '') +
			'</span><span class="stat-value">' +
			v +
			'</span></div>';
	}
	var cal = state.calendar[todayKey()] || {};
	el.innerHTML =
		'<div class="card-grid"><div class="card"><h2>⚔️ 冒険者ステータス</h2><div class="char-portrait">' +
		(anc ? anc.icon : '🧑') +
		'</div><div class="char-name">' +
		state.name +
		'</div><div class="char-title">' +
		getTitle() +
		'</div><div class="stat-row"><span class="stat-label">レベル</span><span class="stat-value">Lv.' +
		state.level +
		'</span></div><div class="stat-row"><span class="stat-label">EXP</span><span class="stat-value">' +
		state.exp +
		' / ' +
		needed +
		'</span></div><div class="progress-bar"><div class="progress-fill" style="width:' +
		pct +
		'%"></div></div><div class="stat-row"><span class="stat-label">HP</span><span class="stat-value">' +
		state.hp +
		' / ' +
		state.maxHp +
		'</span></div><div class="stat-row"><span class="stat-label">ゴールド</span><span class="stat-value gold">💰 ' +
		state.gold +
		' G</span></div><div class="stat-row"><span class="stat-label">連続学習</span><span class="stat-value">' +
		streak +
		'日 🔥</span></div></div><div class="card"><h2>📊 スキル一覧</h2>' +
		skillsHtml +
		'</div><div class="card"><h2>🏠 クイックアクション</h2><p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:12px">今日も冒険を始めましょう！</p><div style="display:flex;flex-direction:column;gap:8px"><button class="btn-primary" onclick="switchTab(\'timer\')">⏱️ 学習タイマーを開始</button><button class="btn-secondary" onclick="switchTab(\'vocab\')">📖 単語帳を開く</button><button class="btn-secondary" onclick="switchTab(\'review\')">🔄 復習を始める</button><button class="btn-gold" onclick="document.getElementById(\'ai-tutor-toggle\').click()">🤖 AIチューターに質問</button></div></div><div class="card"><h2>📈 今日の学習</h2><div class="stat-row"><span class="stat-label">学習時間</span><span class="stat-value">' +
		(cal.minutes || 0) +
		'分</span></div><div class="stat-row"><span class="stat-label">登録単語数</span><span class="stat-value">' +
		state.vocab.words.length +
		'</span></div><div class="stat-row"><span class="stat-label">スフィア解放</span><span class="stat-value">' +
		state.sphere.unlocked.length +
		' / ' +
		SPHERE_NODES.length +
		'</span></div><div class="stat-row"><span class="stat-label">夜間ボーナス</span><span class="stat-value">' +
		(isNightTime() ? '✅ +10%' : '—') +
		'</span></div><div class="stat-row"><span class="stat-label">連続ボーナス</span><span class="stat-value">+' +
		Math.floor(getStreakBonus() * 100) +
		'%</span></div></div></div>';
}

/* ==================== TIMER ==================== */
var timerInterval = null,
	timerSeconds = 0,
	timerRunning = false;
function renderTimer() {
	var el = document.getElementById('tab-timer');
	if (!el) return;
	el.innerHTML =
		'<div class="card"><h2>⏱️ 学習タイマー</h2><div class="timer-display" id="timer-display">00:00:00</div><div class="timer-controls"><button class="btn-primary" onclick="startTimer()">▶ 開始</button><button class="btn-secondary" onclick="pauseTimer()">⏸ 一時停止</button><button class="btn-danger" onclick="stopTimer()">⏹ 終了＆記録</button></div><div class="form-group" style="margin-top:16px"><label>学習スキル:</label><select id="timer-skill"><option value="vocab">語彙</option><option value="grammar">文法</option><option value="listening">聴解</option><option value="speaking">会話</option><option value="reading">読解</option><option value="writing">筆記</option></select></div><div class="form-group"><label>目標 (分):</label><input type="number" id="timer-target" value="' +
		state.timer.target +
		'" min="1" max="480" onchange="state.timer.target=parseInt(this.value)||30;saveState()"></div></div><div class="card"><h2>📋 今日のログ</h2><div id="timer-logs">' +
		renderTimerLogs() +
		'</div></div>';
	updateTimerDisplay();
}
function updateTimerDisplay() {
	var el = document.getElementById('timer-display');
	if (!el) return;
	var h = Math.floor(timerSeconds / 3600);
	var m = Math.floor((timerSeconds % 3600) / 60);
	var s = timerSeconds % 60;
	el.textContent =
		String(h).padStart(2, '0') +
		':' +
		String(m).padStart(2, '0') +
		':' +
		String(s).padStart(2, '0');
}
function startTimer() {
	if (timerRunning) return;
	timerRunning = true;
	timerInterval = setInterval(function () {
		timerSeconds++;
		updateTimerDisplay();
	}, 1000);
	showToast('⏱️ タイマー開始！', '');
}
function pauseTimer() {
	if (!timerRunning) return;
	timerRunning = false;
	clearInterval(timerInterval);
	showToast('⏸ 一時停止', '');
}
function stopTimer() {
	if (timerSeconds < 10) {
		showToast('⚠️ 10秒以上学習してから記録', 'danger');
		return;
	}
	pauseTimer();
	var min = Math.ceil(timerSeconds / 60);
	var skill = (document.getElementById('timer-skill') || {}).value || 'vocab';
	var expG = addExp(skill, min * 2);
	var goldG = Math.floor(min / 5) * 10;
	state.gold += goldG;
	state.timer.logs.push({
		time: new Date().toISOString(),
		skill: skill,
		minutes: min,
		exp: expG,
		gold: goldG,
	});
	logStudyToday(min);
	saveState();
	showToast('✅ ' + min + '分記録！ +' + expG + 'EXP +' + goldG + 'G', 'gold');
	timerSeconds = 0;
	updateTimerDisplay();
	renderTimer();
}
function renderTimerLogs() {
	var today = todayKey();
	var logs = [];
	for (var i = 0; i < state.timer.logs.length; i++) {
		var l = state.timer.logs[i];
		if (l.time && l.time.indexOf(today) === 0) logs.push(l);
	}
	if (!logs.length)
		return '<p style="color:var(--text-dim);font-size:.85rem">まだ記録がありません</p>';
	var html =
		'<table class="styled-table"><thead><tr><th>時刻</th><th>スキル</th><th>時間</th><th>EXP</th><th>G</th></tr></thead><tbody>';
	for (var i = 0; i < logs.length; i++) {
		var l = logs[i];
		html +=
			'<tr><td>' +
			new Date(l.time).toLocaleTimeString('ja-JP', {
				hour: '2-digit',
				minute: '2-digit',
			}) +
			'</td><td>' +
			skillLabel(l.skill) +
			'</td><td>' +
			l.minutes +
			'分</td><td>+' +
			l.exp +
			'</td><td>+' +
			l.gold +
			'</td></tr>';
	}
	return html + '</tbody></table>';
}

/* ==================== CALENDAR ==================== */
function renderCalendar() {
	var el = document.getElementById('tab-calendar');
	if (!el) return;
	var now = new Date();
	var yr = now.getFullYear();
	var mo = now.getMonth();
	var dim = new Date(yr, mo + 1, 0).getDate();
	var fd = new Date(yr, mo, 1).getDay();
	var streak = getStreak();
	var hd = ['日', '月', '火', '水', '木', '金', '土'];
	var g = '';
	for (var i = 0; i < 7; i++)
		g += '<div class="calendar-cell header">' + hd[i] + '</div>';
	for (var i = 0; i < fd; i++) g += '<div class="calendar-cell"></div>';
	for (var d = 1; d <= dim; d++) {
		var k =
			yr +
			'-' +
			String(mo + 1).padStart(2, '0') +
			'-' +
			String(d).padStart(2, '0');
		var isT = d === now.getDate();
		var hasS = state.calendar[k] && state.calendar[k].studied;
		var mins = (state.calendar[k] && state.calendar[k].minutes) || 0;
		g +=
			'<div class="calendar-cell' +
			(isT ? ' today' : '') +
			(hasS ? ' has-study' : '') +
			'" title="' +
			k +
			': ' +
			mins +
			'分">' +
			d +
			'</div>';
	}
	var mStudy = 0;
	for (var d = 1; d <= dim; d++) {
		var k =
			yr +
			'-' +
			String(mo + 1).padStart(2, '0') +
			'-' +
			String(d).padStart(2, '0');
		if (state.calendar[k] && state.calendar[k].studied) mStudy++;
	}
	el.innerHTML =
		'<div class="card"><h2>📅 ' +
		yr +
		'年' +
		(mo + 1) +
		'月</h2><div class="stat-row"><span class="stat-label">連続学習</span><span class="stat-value">' +
		streak +
		'日 🔥</span></div><div class="stat-row"><span class="stat-label">今月の学習日数</span><span class="stat-value">' +
		mStudy +
		'日</span></div><div class="calendar-grid">' +
		g +
		'</div></div>';
}

/* ==================== VOCAB ==================== */
function renderVocab() {
	var el = document.getElementById('tab-vocab');
	if (!el) return;
	var w = state.vocab.words || [];
	el.innerHTML =
		'<div class="card"><h2>📖 単語帳 (' +
		w.length +
		'語)</h2><div class="form-row" style="margin-bottom:12px"><input type="text" id="vocab-word" placeholder="単語"><input type="text" id="vocab-meaning" placeholder="意味"><input type="text" id="vocab-example" placeholder="例文 (任意)"><button class="btn-primary btn-sm" onclick="addVocab()">追加</button></div><div id="vocab-list">' +
		renderVL(w) +
		'</div></div>';
}
function renderVL(w) {
	if (!w.length)
		return '<p style="color:var(--text-dim);font-size:.85rem">単語を追加しましょう！</p>';
	var html =
		'<table class="styled-table"><thead><tr><th>単語</th><th>意味</th><th>例文</th><th>復習</th><th></th></tr></thead><tbody>';
	var start = Math.max(0, w.length - 50);
	for (var i = w.length - 1; i >= start; i--) {
		var v = w[i];
		html +=
			'<tr><td><strong>' +
			esc(v.word) +
			'</strong></td><td>' +
			esc(v.meaning) +
			'</td><td style="font-size:.78rem;color:var(--text-dim)">' +
			esc(v.example || '') +
			'</td><td>' +
			(v.reviewCount || 0) +
			'回</td><td><button class="btn-danger btn-sm" onclick="deleteVocab(' +
			v.id +
			')">✕</button></td></tr>';
	}
	return html + '</tbody></table>';
}
function addVocab() {
	var wi = document.getElementById('vocab-word');
	var mi = document.getElementById('vocab-meaning');
	var ei = document.getElementById('vocab-example');
	var w = wi ? wi.value.trim() : '';
	var m = mi ? mi.value.trim() : '';
	var ex = ei ? ei.value.trim() : '';
	if (!w || !m) {
		showToast('⚠️ 単語と意味を入力', 'danger');
		return;
	}
	state.vocab.words.push({
		id: state.vocab.nextId++,
		word: w,
		meaning: m,
		example: ex,
		reviewCount: 0,
		added: new Date().toISOString(),
	});
	addExp('vocab', 5);
	state.gold += 2;
	saveState();
	showToast('📝 "' + w + '" を追加！ +5EXP +2G', '');
	renderVocab();
}
function deleteVocab(id) {
	var nw = [];
	for (var i = 0; i < state.vocab.words.length; i++)
		if (state.vocab.words[i].id !== id) nw.push(state.vocab.words[i]);
	state.vocab.words = nw;
	saveState();
	renderVocab();
}

/* ==================== REVIEW ==================== */
function renderReview() {
	var el = document.getElementById('tab-review');
	if (!el) return;
	var w = state.vocab.words;
	if (!w || !w.length) {
		el.innerHTML =
			'<div class="card"><h2>🔄 復習</h2><p style="color:var(--text-dim)">まず単語帳に単語を追加してください。</p></div>';
		return;
	}
	var word = w[Math.floor(Math.random() * w.length)];
	el.innerHTML =
		'<div class="card" style="text-align:center"><h2>🔄 復習クイズ</h2><p style="font-size:.85rem;color:var(--text-dim);margin-bottom:20px">単語の意味を思い出してください</p><div style="font-size:2rem;margin:20px 0;color:var(--accent-gold);font-weight:700">' +
		esc(word.word) +
		'</div><div id="review-answer" style="display:none;margin:16px 0"><p style="font-size:1.2rem;color:var(--accent-emerald);font-weight:600">' +
		esc(word.meaning) +
		'</p>' +
		(word.example
			? '<p style="font-size:.85rem;color:var(--text-dim);margin-top:8px">例: ' +
				esc(word.example) +
				'</p>'
			: '') +
		'</div><div id="review-buttons"><button class="btn-primary" onclick="showRevAns()">答えを見る</button></div><div id="review-result-buttons" style="display:none;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn-primary" onclick="revResult(' +
		word.id +
		',true)">✅ 覚えてた！</button><button class="btn-danger" onclick="revResult(' +
		word.id +
		',false)">❌ 忘れてた…</button><button class="btn-secondary" onclick="renderReview()">⏭ 次の単語</button></div><p style="font-size:.75rem;color:var(--text-dim);margin-top:16px">復習回数: ' +
		(word.reviewCount || 0) +
		'回</p></div>';
}
function showRevAns() {
	document.getElementById('review-answer').style.display = 'block';
	document.getElementById('review-buttons').style.display = 'none';
	document.getElementById('review-result-buttons').style.display = 'flex';
}
function revResult(id, ok) {
	var w = null;
	for (var i = 0; i < state.vocab.words.length; i++)
		if (state.vocab.words[i].id === id) {
			w = state.vocab.words[i];
			break;
		}
	if (w) w.reviewCount = (w.reviewCount || 0) + 1;
	if (ok) {
		addExp('vocab', 3);
		showToast('✅ 正解！', '');
	} else showToast('📖 次は覚えよう！', '');
	saveState();
	renderReview();
}

/* ==================== CHARACTER ==================== */
function renderCharacter() {
	var el = document.getElementById('tab-character');
	if (!el) return;
	var anc = getAncestry();
	var her = getHeritage(state.ancestry, state.heritage);
	var cls = getClass();
	var sc = getSubclass(state.cls, state.subclass);
	var bn = calcBonuses();
	var ancOpts = '';
	for (var i = 0; i < ANCESTRIES.length; i++) {
		var a = ANCESTRIES[i];
		var stars = '';
		for (var j = 0; j < a.rarity; j++) stars += '★';
		ancOpts +=
			'<option value="' +
			a.id +
			'"' +
			(a.id === state.ancestry ? ' selected' : '') +
			'>' +
			a.icon +
			' ' +
			a.name +
			' ' +
			stars +
			'</option>';
	}
	var herOpts = '';
	if (anc)
		for (var i = 0; i < anc.heritages.length; i++) {
			var h = anc.heritages[i];
			herOpts +=
				'<option value="' +
				h.id +
				'"' +
				(h.id === state.heritage ? ' selected' : '') +
				'>' +
				h.name +
				'</option>';
		}
	var clsOpts = '';
	for (var i = 0; i < CLASSES.length; i++) {
		var c = CLASSES[i];
		clsOpts +=
			'<option value="' +
			c.id +
			'"' +
			(c.id === state.cls ? ' selected' : '') +
			'>' +
			c.icon +
			' ' +
			c.name +
			'</option>';
	}
	var scOpts = '';
	if (cls)
		for (var i = 0; i < cls.subclasses.length; i++) {
			var s = cls.subclasses[i];
			scOpts +=
				'<option value="' +
				s.id +
				'"' +
				(s.id === state.subclass ? ' selected' : '') +
				'>' +
				s.name +
				'</option>';
		}
	var bonusHtml = '';
	var bkeys = [
		'vocab',
		'grammar',
		'listening',
		'speaking',
		'reading',
		'writing',
	];
	for (var i = 0; i < bkeys.length; i++) {
		var k = bkeys[i];
		if (bn[k] > 0)
			bonusHtml +=
				'<div class="stat-row"><span class="stat-label">' +
				skillLabel(k) +
				'</span><span class="stat-value" style="color:var(--rarity2)">+' +
				bn[k] +
				'%</span></div>';
	}
	if (!bonusHtml)
		bonusHtml =
			'<p style="color:var(--text-dim);font-size:.8rem">ボーナスなし</p>';
	var synergyHtml = '';
	if (JOB_SYNERGY[state.cls]) {
		var zones = JOB_SYNERGY[state.cls];
		var zNames = [];
		for (var i = 0; i < zones.length; i++) zNames.push(skillLabel(zones[i]));
		synergyHtml =
			'<h3 style="margin-top:16px">🌐 スフィア適性ゾーン</h3><p style="font-size:.85rem;color:var(--accent-teal)">' +
			zNames.join('、') +
			'</p>';
	}
	var detailHtml = '';
	if (anc)
		detailHtml +=
			'<div class="stat-row"><span class="stat-label">種族</span><span class="stat-value">' +
			anc.icon +
			' ' +
			anc.name +
			'</span></div><div class="stat-row"><span class="stat-label">カテゴリ</span><span class="stat-value"><span class="badge rarity-' +
			anc.rarity +
			'">' +
			anc.category +
			' ★' +
			anc.rarity +
			'</span></span></div><p style="font-size:.8rem;color:var(--text-dim);margin:6px 0">' +
			anc.desc +
			'</p>';
	if (her)
		detailHtml +=
			'<div class="stat-row"><span class="stat-label">ヘリテージ</span><span class="stat-value">' +
			her.name +
			'</span></div><p style="font-size:.8rem;color:var(--text-dim);margin:6px 0">' +
			her.desc +
			'</p>';
	if (cls)
		detailHtml +=
			'<div class="stat-row"><span class="stat-label">職業</span><span class="stat-value">' +
			cls.icon +
			' ' +
			cls.name +
			'</span></div><p style="font-size:.8rem;color:var(--text-dim);margin:6px 0">' +
			cls.desc +
			'</p>';
	if (sc)
		detailHtml +=
			'<div class="stat-row"><span class="stat-label">サブクラス</span><span class="stat-value">' +
			sc.name +
			'</span></div><p style="font-size:.8rem;color:var(--text-dim);margin:6px 0">' +
			sc.desc +
			'</p>';
	el.innerHTML =
		'<div class="card-grid"><div class="card"><h2>🧝 キャラクターシート</h2><div class="char-portrait">' +
		(anc ? anc.icon : '🧑') +
		'</div><div class="char-name">' +
		state.name +
		'</div><div class="char-title">' +
		getTitle() +
		'</div><div class="form-group"><label>冒険者名:</label><input type="text" value="' +
		esc(state.name) +
		'" onchange="state.name=this.value;saveState();renderCharacter()" maxlength="20"></div><div class="char-select-group"><div class="form-group"><label>種族:</label><select onchange="chAnc(this.value)">' +
		ancOpts +
		'</select></div><div class="form-group"><label>ヘリテージ:</label><select onchange="state.heritage=this.value;saveState();renderCharacter()">' +
		herOpts +
		'</select></div><div class="form-group"><label>職業:</label><select onchange="chCls(this.value)">' +
		clsOpts +
		'</select></div><div class="form-group"><label>サブクラス:</label><select onchange="state.subclass=this.value;saveState();renderCharacter()">' +
		scOpts +
		'</select></div></div></div><div class="card"><h2>📋 詳細情報</h2>' +
		detailHtml +
		'<h3 style="margin-top:16px">🎯 学習ボーナス</h3>' +
		bonusHtml +
		synergyHtml +
		'</div></div>';
}
function chAnc(id) {
	state.ancestry = id;
	var a = getAncestry(id);
	if (a && a.heritages.length) state.heritage = a.heritages[0].id;
	saveState();
	renderCharacter();
}
function chCls(id) {
	state.cls = id;
	var c = getClass(id);
	if (c && c.subclasses.length) state.subclass = c.subclasses[0].id;
	saveState();
	renderCharacter();
}

/* ==================== SPHERE GRID ==================== */
var ZONE_COLORS = {
	vocab: '#22c55e',
	grammar: '#3b82f6',
	listening: '#a855f7',
	speaking: '#ef4444',
	reading: '#f59e0b',
	writing: '#06b6d4',
	center: '#ffd700',
};
var RARITY_COLORS = {
	1: '#9ca3af',
	2: '#22c55e',
	3: '#3b82f6',
	4: '#a855f7',
	5: '#f59e0b',
};
function renderSphere() {
	var el = document.getElementById('tab-sphere');
	if (!el) return;
	var ulArr = state.sphere.unlocked || [];
	var acArr = state.sphere.activated || [];
	var ulSet = {};
	for (var i = 0; i < ulArr.length; i++) ulSet[ulArr[i]] = true;
	var acSet = {};
	for (var i = 0; i < acArr.length; i++) acSet[acArr[i]] = true;
	var lines = '';
	var nodes = '';
	for (var i = 0; i < SPHERE_NODES.length; i++) {
		var n = SPHERE_NODES[i];
		for (var j = 0; j < n.prereq.length; j++) {
			var pid = n.prereq[j];
			var p = null;
			for (var k = 0; k < SPHERE_NODES.length; k++)
				if (SPHERE_NODES[k].id === pid) {
					p = SPHERE_NODES[k];
					break;
				}
			if (p) {
				var active = acSet[n.id] && acSet[pid];
				lines +=
					'<line x1="' +
					p.x +
					'" y1="' +
					p.y +
					'" x2="' +
					n.x +
					'" y2="' +
					n.y +
					'" stroke="' +
					(active
						? ZONE_COLORS[n.zone] || '#22c55e'
						: 'rgba(255,255,255,0.1)') +
					'" stroke-width="' +
					(active ? 2 : 1) +
					'"/>';
			}
		}
	}
	for (var i = 0; i < SPHERE_NODES.length; i++) {
		var n = SPHERE_NODES[i];
		var isA = !!acSet[n.id];
		var isU = !!ulSet[n.id];
		var canU = false;
		if (!isA) {
			var allMet = true;
			for (var j = 0; j < n.prereq.length; j++)
				if (!acSet[n.prereq[j]]) {
					allMet = false;
					break;
				}
			canU = allMet;
		}
		var col = isA
			? ZONE_COLORS[n.zone] || '#22c55e'
			: isU
				? 'rgba(255,255,255,0.5)'
				: 'rgba(255,255,255,0.15)';
		var bc = canU
			? '#ffd700'
			: isA
				? RARITY_COLORS[n.rarity] || '#22c55e'
				: 'rgba(255,255,255,0.1)';
		var bg = isA
			? 'radial-gradient(circle,' + col + '33,' + col + '11)'
			: 'rgba(0,0,0,0.3)';
		var extra = '';
		if (canU)
			extra =
				'animation:pulse 1.5s infinite;box-shadow:0 0 12px rgba(255,215,0,0.4);';
		else if (isA) extra = 'box-shadow:0 0 10px ' + col + '44;';
		nodes +=
			'<div style="position:absolute;left:' +
			(n.x - 22) +
			'px;top:' +
			(n.y - 22) +
			'px;width:44px;height:44px;border-radius:50%;background:' +
			bg +
			';border:2px solid ' +
			bc +
			';display:flex;align-items:center;justify-content:center;font-size:1.2rem;cursor:' +
			(canU || isA ? 'pointer' : 'default') +
			';transition:all .3s;' +
			extra +
			'" title="' +
			n.label +
			': ' +
			n.desc +
			'" onclick="sphereClick(\'' +
			n.id +
			'\')">' +
			n.icon +
			'</div>';
	}
	var legendHtml = '';
	var zkeys = [
		'vocab',
		'grammar',
		'listening',
		'speaking',
		'reading',
		'writing',
		'center',
	];
	for (var i = 0; i < zkeys.length; i++) {
		var zk = zkeys[i];
		legendHtml +=
			'<div class="sphere-legend-item"><div class="sphere-legend-color" style="background:' +
			(ZONE_COLORS[zk] || '#fff') +
			'"></div><span>' +
			(skillLabel(zk) || zk) +
			'</span></div>';
	}
	el.innerHTML =
		'<div class="card"><h2>🌐 スフィア盤</h2><div class="stat-row"><span class="stat-label">解放済み</span><span class="stat-value">' +
		ulArr.length +
		' / ' +
		SPHERE_NODES.length +
		'</span></div><div class="stat-row"><span class="stat-label">有効化済み</span><span class="stat-value">' +
		acArr.length +
		'</span></div><div class="sphere-legend">' +
		legendHtml +
		'</div><div class="sphere-container" style="height:600px;position:relative"><svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">' +
		lines +
		'</svg>' +
		nodes +
		'</div></div>';
}
function sphereClick(id) {
	var n = null;
	for (var i = 0; i < SPHERE_NODES.length; i++)
		if (SPHERE_NODES[i].id === id) {
			n = SPHERE_NODES[i];
			break;
		}
	if (!n) return;
	var acArr = state.sphere.activated || [];
	var acSet = {};
	for (var i = 0; i < acArr.length; i++) acSet[acArr[i]] = true;
	if (acSet[id]) {
		showToast('ℹ️ ' + n.label + ': ' + n.desc, '');
		return;
	}
	var allMet = true;
	for (var i = 0; i < n.prereq.length; i++)
		if (!acSet[n.prereq[i]]) {
			allMet = false;
			break;
		}
	if (!allMet) {
		showToast('🔒 前提ノードを先に有効化してください', 'danger');
		return;
	}
	var ulSet = {};
	for (var i = 0; i < state.sphere.unlocked.length; i++)
		ulSet[state.sphere.unlocked[i]] = true;
	if (!ulSet[id]) state.sphere.unlocked.push(id);
	state.sphere.activated.push(id);
	if (n.reward) {
		var zone = n.zone === 'center' ? 'vocab' : n.zone;
		if (n.reward.exp) addExp(zone, n.reward.exp);
		if (n.reward.gold) state.gold += n.reward.gold;
		var sks = [
			'vocab',
			'grammar',
			'listening',
			'speaking',
			'reading',
			'writing',
		];
		for (var i = 0; i < sks.length; i++) {
			var sk = sks[i];
			if (n.reward[sk]) state.skills[sk] += n.reward[sk];
		}
	}
	saveState();
	updateHUD();
	var msgs = {
		boss: '🐉 BOSS撃破！',
		chest: '🎁 宝箱を開けた！',
		event: '⚡ イベントクリア！',
		skill: '⭐ スキル習得！',
		hub: '🌟 出発！',
	};
	showToast((msgs[n.type] || '✅') + ' ' + n.label, 'gold');
	renderSphere();
}

/* ==================== REPORT ==================== */
function renderReport() {
	var el = document.getElementById('tab-report');
	if (!el) return;
	var totalMin = 0;
	var totalDays = 0;
	var calKeys = Object.keys(state.calendar);
	for (var i = 0; i < calKeys.length; i++) {
		var v = state.calendar[calKeys[i]];
		totalMin += v.minutes || 0;
		if (v.studied) totalDays++;
	}
	var totalSkill = 0;
	var sks = ['vocab', 'grammar', 'listening', 'speaking', 'reading', 'writing'];
	for (var i = 0; i < sks.length; i++) totalSkill += state.skills[sks[i]] || 0;
	el.innerHTML =
		'<div class="card-grid"><div class="card"><h2>📊 総合レポート</h2><div class="stat-row"><span class="stat-label">総学習時間</span><span class="stat-value">' +
		totalMin +
		'分 (' +
		(totalMin / 60).toFixed(1) +
		'時間)</span></div><div class="stat-row"><span class="stat-label">学習日数</span><span class="stat-value">' +
		totalDays +
		'日</span></div><div class="stat-row"><span class="stat-label">総スキルポイント</span><span class="stat-value">' +
		totalSkill +
		'</span></div><div class="stat-row"><span class="stat-label">登録単語数</span><span class="stat-value">' +
		state.vocab.words.length +
		'</span></div><div class="stat-row"><span class="stat-label">スフィア解放率</span><span class="stat-value">' +
		Math.floor((state.sphere.unlocked.length / SPHERE_NODES.length) * 100) +
		'%</span></div></div><div class="card"><h2>🛠️ データ管理</h2><div style="display:flex;flex-direction:column;gap:8px"><button class="btn-secondary" onclick="exportData()">📤 データをエクスポート</button><button class="btn-secondary" onclick="document.getElementById(\'import-file\').click()">📥 データをインポート</button><input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)"><button class="btn-danger" onclick="resetState()">🗑️ データをリセット</button></div></div></div>';
}
function exportData() {
	var d = JSON.stringify(state, null, 2);
	var b = new Blob([d], { type: 'application/json' });
	var u = URL.createObjectURL(b);
	var a = document.createElement('a');
	a.href = u;
	a.download = 'linguaquest_' + todayKey() + '.json';
	a.click();
	URL.revokeObjectURL(u);
	showToast('📤 エクスポート完了！', '');
}
function importData(e) {
	var f = e.target.files[0];
	if (!f) return;
	var r = new FileReader();
	r.onload = function (ev) {
		try {
			state = JSON.parse(ev.target.result);
			saveState();
			location.reload();
		} catch (err) {
			showToast('⚠️ ファイルの読み込みに失敗', 'danger');
		}
	};
	r.readAsText(f);
}

/* ==================== AI TUTOR ==================== */
var AI_TUTOR = {
	defaultLangs: [
		{ code: 'en', name: '英語', flag: '🇬🇧', removable: false },
		{ code: 'yue', name: '広東語', flag: '🇭🇰', removable: false },
	],
	histories: {},
	currentLang: 'en',
	isStreaming: false,
	sidebarOpen: false,
	defaultSettings: {
		provider: 'gemini',
		geminiKey: '',
		geminiModel: 'gemini-2.5-flash',
		openrouterKey: '',
		openrouterModel: 'deepseek/deepseek-r1:free',
		openaiKey: '',
		openaiModel: 'gpt-4o',
		customEndpoint: '',
		customKey: '',
		customModel: '',
		languages: null,
	},
	buildSystemPrompt: function (langCode) {
		var langObj = null;
		var langs = this.getLangs();
		for (var i = 0; i < langs.length; i++)
			if (langs[i].code === langCode) {
				langObj = langs[i];
				break;
			}
		var langName = langObj ? langObj.name : langCode;
		var extra = '';
		if (langCode === 'yue')
			extra =
				'- 広東語の場合、粤拼（Jyutping）のローマ字表記と声調番号も必ず付けてください。\n- 例：「你好」(nei5 hou2) — こんにちは\n';
		if (langCode === 'en')
			extra =
				'- 英語の場合、発音のカタカナ表記も適宜付けてください。\n- 例：「Hello」(ハロー) — こんにちは\n';
		return (
			'あなたは「LinguaQuest」というRPG風言語学習アプリのAIチューターです。\n\n【基本ルール】\n- 応答言語は常に「日本語」です。\n- 教える対象言語は「' +
			langName +
			'」です。\n- ユーザーは日本語話者で、' +
			langName +
			'を学習中です。\n- 説明はすべて日本語で行い、' +
			langName +
			'の原文と日本語訳を併記してください。\n' +
			extra +
			'\n【役割】\n- 文法説明、単語の使い方、例文作成、会話練習、作文添削、発音指導。\n- レベルに合わせて難易度を調整。\n- 間違いは優しく訂正。\n- RPGの冒険者に語りかけるトーンで。\n- 簡潔に、でも必要な情報は省略しない。'
		);
	},
	getLangs: function () {
		var s = this.loadSettings();
		return s.languages || this.defaultLangs;
	},
	setLangs: function (langs) {
		var s = this.loadSettings();
		s.languages = langs;
		this.saveSettings(s);
	},
	addLang: function (code, name, flag) {
		if (!code || !name) return false;
		var langs = this.getLangs();
		for (var i = 0; i < langs.length; i++)
			if (langs[i].code === code) return false;
		langs.push({ code: code, name: name, flag: flag || '🌐', removable: true });
		this.setLangs(langs);
		return true;
	},
	removeLang: function (code) {
		var langs = this.getLangs();
		var nw = [];
		for (var i = 0; i < langs.length; i++)
			if (langs[i].code !== code || !langs[i].removable) nw.push(langs[i]);
		this.setLangs(nw);
		if (this.currentLang === code)
			this.currentLang = nw.length ? nw[0].code : 'en';
	},
	loadSettings: function () {
		try {
			var s = localStorage.getItem('lq_ai_settings');
			if (s) {
				var p = JSON.parse(s);
				for (var k in this.defaultSettings)
					if (!(k in p)) p[k] = this.defaultSettings[k];
				if (!p.languages)
					p.languages = JSON.parse(JSON.stringify(this.defaultLangs));
				return p;
			}
		} catch (e) {}
		var def = JSON.parse(JSON.stringify(this.defaultSettings));
		def.languages = JSON.parse(JSON.stringify(this.defaultLangs));
		return def;
	},
	saveSettings: function (settings) {
		try {
			localStorage.setItem('lq_ai_settings', JSON.stringify(settings));
		} catch (e) {}
	},
	loadHistory: function (lang) {
		try {
			var s = localStorage.getItem('lq_ai_hist_' + lang);
			return s ? JSON.parse(s) : [];
		} catch (e) {
			return [];
		}
	},
	saveHistory: function (lang, hist) {
		try {
			localStorage.setItem(
				'lq_ai_hist_' + lang,
				JSON.stringify(hist.slice(-100)),
			);
		} catch (e) {}
	},
	getEl: function (id) {
		return document.getElementById(id);
	},
	appendMsg: function (role, text) {
		var c = this.getEl('ai-chat-messages');
		if (!c) return null;
		var div = document.createElement('div');
		div.className = 'ai-msg ' + role;
		div.innerHTML = this.formatMsg(text);
		c.appendChild(div);
		c.scrollTop = c.scrollHeight;
		return div;
	},
	formatMsg: function (text) {
		if (!text) return '';
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(
				/`(.+?)`/g,
				"<code style='background:rgba(0,255,170,0.1);padding:1px 4px;border-radius:3px'>$1</code>",
			)
			.replace(/\n/g, '<br>');
	},
	setStatus: function (text) {
		var el = this.getEl('ai-status');
		if (el) el.textContent = text;
	},
	clearChat: function () {
		var c = this.getEl('ai-chat-messages');
		if (c) c.innerHTML = '';
	},
	callAPI: function (messages) {
		var settings = this.loadSettings();
		var provider = settings.provider || 'gemini';
		switch (provider) {
			case 'gemini':
				return this.callGemini(settings, messages);
			case 'openrouter':
				return this.callOpenRouter(settings, messages);
			case 'openai':
				return this.callOpenAI(settings, messages);
			case 'custom':
				return this.callCustom(settings, messages);
			default:
				return Promise.reject(new Error('不明なプロバイダー'));
		}
	},
	callGemini: function (settings, messages) {
		var key = settings.geminiKey;
		if (!key)
			return Promise.reject(
				new Error('Gemini APIキーが未設定です。⚙️設定から入力してください。'),
			);
		var model = settings.geminiModel || 'gemini-2.5-flash';
		var url =
			'https://generativelanguage.googleapis.com/v1beta/models/' +
			model +
			':generateContent?key=' +
			key;
		var systemText = '';
		var contents = [];
		for (var i = 0; i < messages.length; i++) {
			var m = messages[i];
			if (m.role === 'system') {
				systemText += m.content + '\n';
			} else {
				contents.push({
					role: m.role === 'assistant' ? 'model' : 'user',
					parts: [{ text: m.content }],
				});
			}
		}
		var body = {
			contents: contents,
			generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
		};
		if (systemText) body.systemInstruction = { parts: [{ text: systemText }] };
		return fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})
			.then(function (resp) {
				if (!resp.ok)
					return resp.text().then(function (t) {
						throw new Error(
							'Gemini エラー (' + resp.status + '): ' + t.substring(0, 200),
						);
					});
				return resp.json();
			})
			.then(function (data) {
				var text =
					data &&
					data.candidates &&
					data.candidates[0] &&
					data.candidates[0].content &&
					data.candidates[0].content.parts &&
					data.candidates[0].content.parts[0] &&
					data.candidates[0].content.parts[0].text;
				if (!text) throw new Error('Geminiから応答なし');
				return text;
			});
	},
	callOpenRouter: function (settings, messages) {
		var key = settings.openrouterKey;
		if (!key)
			return Promise.reject(new Error('OpenRouter APIキーが未設定です。'));
		var model = settings.openrouterModel || 'deepseek/deepseek-r1:free';
		return fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + key,
				'HTTP-Referer': location.href,
				'X-Title': 'LinguaQuest',
			},
			body: JSON.stringify({
				model: model,
				messages: messages,
				max_tokens: 1024,
				temperature: 0.7,
			}),
		})
			.then(function (resp) {
				if (!resp.ok)
					return resp.text().then(function (t) {
						throw new Error(
							'OpenRouter エラー (' + resp.status + '): ' + t.substring(0, 200),
						);
					});
				return resp.json();
			})
			.then(function (data) {
				return (
					(data.choices &&
						data.choices[0] &&
						data.choices[0].message &&
						data.choices[0].message.content) ||
					'応答なし'
				);
			});
	},
	callOpenAI: function (settings, messages) {
		var key = settings.openaiKey;
		if (!key) return Promise.reject(new Error('OpenAI APIキーが未設定です。'));
		var model = settings.openaiModel || 'gpt-4o';
		return fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + key,
			},
			body: JSON.stringify({
				model: model,
				messages: messages,
				max_tokens: 1024,
				temperature: 0.7,
			}),
		})
			.then(function (resp) {
				if (!resp.ok)
					return resp.text().then(function (t) {
						throw new Error(
							'OpenAI エラー (' + resp.status + '): ' + t.substring(0, 200),
						);
					});
				return resp.json();
			})
			.then(function (data) {
				return (
					(data.choices &&
						data.choices[0] &&
						data.choices[0].message &&
						data.choices[0].message.content) ||
					'応答なし'
				);
			});
	},
	callCustom: function (settings, messages) {
		var ep = settings.customEndpoint;
		if (!ep)
			return Promise.reject(new Error('カスタムエンドポイントが未設定です。'));
		var headers = { 'Content-Type': 'application/json' };
		if (settings.customKey)
			headers['Authorization'] = 'Bearer ' + settings.customKey;
		return fetch(ep + '/chat/completions', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				model: settings.customModel || 'default',
				messages: messages,
				max_tokens: 1024,
				temperature: 0.7,
			}),
		})
			.then(function (resp) {
				if (!resp.ok)
					return resp.text().then(function (t) {
						throw new Error(
							'Custom エラー (' + resp.status + '): ' + t.substring(0, 200),
						);
					});
				return resp.json();
			})
			.then(function (data) {
				return (
					(data.choices &&
						data.choices[0] &&
						data.choices[0].message &&
						data.choices[0].message.content) ||
					'応答なし'
				);
			});
	},
	sendMessage: function () {
		var self = this;
		var input = this.getEl('ai-input');
		if (!input) return;
		var text = input.value.trim();
		if (!text || this.isStreaming) return;
		input.value = '';
		this.isStreaming = true;
		var sendBtn = this.getEl('ai-send-btn');
		if (sendBtn) sendBtn.disabled = true;
		this.appendMsg('user', text);
		if (!this.histories[this.currentLang])
			this.histories[this.currentLang] = [];
		var hist = this.histories[this.currentLang];
		hist.push({ role: 'user', content: text });
		var loadingDiv = this.appendMsg('assistant', '考え中...');
		if (loadingDiv) loadingDiv.classList.add('loading');
		this.setStatus('🔄 応答を生成中...');
		var sp = this.buildSystemPrompt(this.currentLang);
		var apiMsgs = [{ role: 'system', content: sp }].concat(hist.slice(-20));
		this.callAPI(apiMsgs)
			.then(function (reply) {
				if (loadingDiv) loadingDiv.remove();
				self.appendMsg('assistant', reply);
				hist.push({ role: 'assistant', content: reply });
				self.histories[self.currentLang] = hist;
				self.saveHistory(self.currentLang, hist);
				addExp(self.currentLang === 'en' ? 'speaking' : 'vocab', 5);
				state.gold += 1;
				saveState();
				self.setStatus('✅ 応答完了 | +5 EXP +1 G');
			})
			.catch(function (err) {
				if (loadingDiv) loadingDiv.remove();
				self.appendMsg('system', '⚠️ エラー: ' + err.message);
				self.setStatus('❌ エラーが発生しました');
			})
			.finally(function () {
				self.isStreaming = false;
				if (sendBtn) sendBtn.disabled = false;
				input.focus();
			});
	},
	testConnection: function () {
		var self = this;
		var resultEl = this.getEl('ai-test-result');
		if (resultEl) {
			resultEl.style.background = 'rgba(0,255,170,0.05)';
			resultEl.style.color = 'var(--text-secondary)';
			resultEl.textContent = '🔄 接続テスト中...';
		}
		this.callAPI([
			{ role: 'system', content: 'テスト。一言だけ日本語で返して。' },
			{ role: 'user', content: '接続テスト' },
		])
			.then(function (reply) {
				if (resultEl) {
					resultEl.style.background = 'rgba(0,255,170,0.1)';
					resultEl.style.color = 'var(--accent-emerald)';
					resultEl.textContent =
						'✅ 接続成功: ' + (reply || '').substring(0, 80);
				}
			})
			.catch(function (err) {
				if (resultEl) {
					resultEl.style.background = 'rgba(239,68,68,0.1)';
					resultEl.style.color = 'var(--danger)';
					resultEl.textContent = '❌ ' + err.message;
				}
			});
	},
	switchLang: function (code) {
		this.currentLang = code;
		this.histories[code] = this.loadHistory(code);
		this.clearChat();
		var hist = this.histories[code] || [];
		if (!hist.length) {
			var langObj = null;
			var langs = this.getLangs();
			for (var i = 0; i < langs.length; i++)
				if (langs[i].code === code) {
					langObj = langs[i];
					break;
				}
			var langName = langObj ? langObj.name : code;
			this.appendMsg(
				'system',
				(langObj ? langObj.flag : '🌐') +
					' ' +
					langName +
					'チューターモードへようこそ！\n日本語で何でも質問してください。',
			);
		} else {
			for (var i = 0; i < hist.length; i++)
				this.appendMsg(hist[i].role, hist[i].content);
		}
		var lObj = null;
		var ls = this.getLangs();
		for (var i = 0; i < ls.length; i++)
			if (ls[i].code === code) {
				lObj = ls[i];
				break;
			}
		this.setStatus(
			(lObj ? lObj.flag : '🌐') + ' ' + (lObj ? lObj.name : code) + 'モード',
		);
	},
	toggleSidebar: function () {
		var sidebar = this.getEl('ai-tutor-sidebar');
		var toggle = this.getEl('ai-tutor-toggle');
		if (!sidebar) return;
		this.sidebarOpen = !this.sidebarOpen;
		if (this.sidebarOpen) sidebar.classList.add('open');
		else sidebar.classList.remove('open');
		if (toggle) {
			if (this.sidebarOpen) toggle.classList.add('hidden');
			else toggle.classList.remove('hidden');
		}
		if (
			this.sidebarOpen &&
			(!this.histories[this.currentLang] ||
				!this.histories[this.currentLang].length)
		)
			this.switchLang(this.currentLang);
	},
	openSettings: function () {
		var o = this.getEl('ai-settings-overlay');
		if (o) o.classList.remove('hidden');
		this.populateSettingsForm();
	},
	closeSettings: function () {
		var o = this.getEl('ai-settings-overlay');
		if (o) o.classList.add('hidden');
	},
	populateSettingsForm: function () {
		var s = this.loadSettings();
		var prov = this.getEl('ai-provider-select');
		if (prov) prov.value = s.provider || 'gemini';
		var fields = {
			geminiKey: 'gemini-api-key',
			geminiModel: 'gemini-model',
			openrouterKey: 'openrouter-api-key',
			openrouterModel: 'openrouter-model',
			openaiKey: 'openai-api-key',
			openaiModel: 'openai-model',
			customEndpoint: 'custom-endpoint',
			customKey: 'custom-api-key',
			customModel: 'custom-model',
		};
		for (var k in fields) {
			var el = this.getEl(fields[k]);
			if (el) el.value = s[k] || '';
		}
		this.showProviderFields(s.provider || 'gemini');
		this.renderLangList();
	},
	showProviderFields: function (provider) {
		var ps = ['gemini', 'openrouter', 'openai', 'custom'];
		for (var i = 0; i < ps.length; i++) {
			var el = this.getEl('provider-fields-' + ps[i]);
			if (el) {
				if (ps[i] === provider) el.classList.remove('hidden');
				else el.classList.add('hidden');
			}
		}
	},
	saveSettingsFromForm: function () {
		var s = this.loadSettings();
		s.provider = (this.getEl('ai-provider-select') || {}).value || 'gemini';
		s.geminiKey = (this.getEl('gemini-api-key') || {}).value || '';
		s.geminiModel =
			(this.getEl('gemini-model') || {}).value || 'gemini-2.5-flash';
		s.openrouterKey = (this.getEl('openrouter-api-key') || {}).value || '';
		s.openrouterModel =
			(this.getEl('openrouter-model') || {}).value ||
			'deepseek/deepseek-r1:free';
		s.openaiKey = (this.getEl('openai-api-key') || {}).value || '';
		s.openaiModel = (this.getEl('openai-model') || {}).value || 'gpt-4o';
		s.customEndpoint = (this.getEl('custom-endpoint') || {}).value || '';
		s.customKey = (this.getEl('custom-api-key') || {}).value || '';
		s.customModel = (this.getEl('custom-model') || {}).value || '';
		this.saveSettings(s);
		showToast('✅ AI設定を保存しました', '');
		this.closeSettings();
		this.populateLangSelect();
	},
	renderLangList: function () {
		var c = this.getEl('lang-list');
		if (!c) return;
		var langs = this.getLangs();
		var html = '';
		for (var i = 0; i < langs.length; i++) {
			var l = langs[i];
			html +=
				'<div class="lang-item"><span class="lang-flag">' +
				l.flag +
				'</span><span class="lang-name">' +
				l.name +
				' (' +
				l.code +
				')</span>' +
				(l.removable
					? '<button onclick="AI_TUTOR.removeLangUI(\'' +
						l.code +
						'\')">✕</button>'
					: '<span class="lang-default">デフォルト</span>') +
				'</div>';
		}
		c.innerHTML = html;
	},
	addLangUI: function () {
		var codeEl = this.getEl('new-lang-code');
		var nameEl = this.getEl('new-lang-name');
		var flagEl = this.getEl('new-lang-flag');
		var code = codeEl ? codeEl.value.trim().toLowerCase() : '';
		var name = nameEl ? nameEl.value.trim() : '';
		var flag = flagEl ? flagEl.value.trim() || '🌐' : '🌐';
		if (!code || !name) {
			showToast('⚠️ コードと表示名を入力', 'danger');
			return;
		}
		if (this.addLang(code, name, flag)) {
			showToast('✅ ' + flag + ' ' + name + ' を追加', '');
			this.renderLangList();
			this.populateLangSelect();
			if (codeEl) codeEl.value = '';
			if (nameEl) nameEl.value = '';
			if (flagEl) flagEl.value = '';
		} else showToast('⚠️ そのコードは既に存在', 'danger');
	},
	removeLangUI: function (code) {
		if (!confirm('この言語を削除しますか？')) return;
		this.removeLang(code);
		showToast('🗑️ 言語を削除', '');
		this.renderLangList();
		this.populateLangSelect();
	},
	populateLangSelect: function () {
		var sel = this.getEl('ai-lang-select');
		if (!sel) return;
		var langs = this.getLangs();
		var html = '';
		for (var i = 0; i < langs.length; i++) {
			var l = langs[i];
			html +=
				'<option value="' +
				l.code +
				'"' +
				(l.code === this.currentLang ? ' selected' : '') +
				'>' +
				l.flag +
				' ' +
				l.name +
				'</option>';
		}
		sel.innerHTML = html;
	},
	init: function () {
		var self = this;
		var toggleBtn = this.getEl('ai-tutor-toggle');
		if (toggleBtn)
			toggleBtn.addEventListener('click', function () {
				self.toggleSidebar();
			});
		var closeBtn = this.getEl('ai-close-btn');
		if (closeBtn)
			closeBtn.addEventListener('click', function () {
				self.toggleSidebar();
			});
		var settingsBtn = this.getEl('ai-settings-btn');
		if (settingsBtn)
			settingsBtn.addEventListener('click', function () {
				self.openSettings();
			});
		var sendBtn = this.getEl('ai-send-btn');
		if (sendBtn)
			sendBtn.addEventListener('click', function () {
				self.sendMessage();
			});
		var input = this.getEl('ai-input');
		if (input)
			input.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault();
					self.sendMessage();
				}
			});
		var langSel = this.getEl('ai-lang-select');
		if (langSel)
			langSel.addEventListener('change', function (e) {
				self.switchLang(e.target.value);
			});
		var provSel = this.getEl('ai-provider-select');
		if (provSel)
			provSel.addEventListener('change', function (e) {
				self.showProviderFields(e.target.value);
			});
		var saveBtn = this.getEl('ai-save-settings-btn');
		if (saveBtn)
			saveBtn.addEventListener('click', function () {
				self.saveSettingsFromForm();
			});
		var cancelBtn = this.getEl('ai-cancel-settings-btn');
		if (cancelBtn)
			cancelBtn.addEventListener('click', function () {
				self.closeSettings();
			});
		var testBtn = this.getEl('ai-test-btn');
		if (testBtn)
			testBtn.addEventListener('click', function () {
				self.testConnection();
			});
		var addLangBtn = this.getEl('add-lang-btn');
		if (addLangBtn)
			addLangBtn.addEventListener('click', function () {
				self.addLangUI();
			});
		this.populateLangSelect();
		this.histories[this.currentLang] = this.loadHistory(this.currentLang);
		console.log('✅ AI Tutor initialized');
	},
};

/* ==================== INIT ==================== */
document.addEventListener('DOMContentLoaded', function () {
	console.log('🚀 LinguaQuest initializing...');
	loadState();
	updateHUD();
	updateClock();
	setInterval(updateClock, 30000);
	initParticles();
	initNav();
	AI_TUTOR.init();
	switchTab('home');
	console.log('✅ LinguaQuest ready! Lv.' + state.level + ' ' + getTitle());
});
