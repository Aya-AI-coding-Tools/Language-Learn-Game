/* ============================================
   LinguaQuest - app.js (Complete Combined File)
   Part 1/3: Data + State + Utilities + Particles + HUD
   ============================================ */

// ========== DATA DEFINITIONS (formerly data.js) ==========

function expForLevel(lv) {
	return Math.floor(80 * Math.pow(lv, 1.45));
}

var TITLES = [
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

var ANCESTRIES = [
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
			{
				id: 'vine',
				name: '蔦のレッシー',
				bonus: { type: 'exp_grammar', value: 0.08 },
				desc: '文法EXP+8%',
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
			{
				id: 'jinxed',
				name: '呪いのテング',
				bonus: { type: 'boss_exp', value: 0.15 },
				desc: 'ボス報酬EXP+15%',
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
				id: 'warrior',
				name: '戦闘型',
				bonus: { type: 'streak_bonus', value: 0.1 },
				desc: '連続ボーナス+10%',
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
		id: 'automaton',
		name: 'オートマトン',
		desc: '古代文明の自動人形',
		heritages: [
			{
				id: 'hunter',
				name: '狩猟型',
				bonus: { type: 'quest_speed', value: 0.15 },
				desc: 'クエスト完了速度+15%',
			},
			{
				id: 'mage',
				name: '魔導型',
				bonus: { type: 'exp_all', value: 0.06 },
				desc: '全EXP+6%',
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
	{
		id: 'poppet',
		name: 'ポペット',
		desc: '命を与えられた人形種族',
		heritages: [
			{
				id: 'stuffed',
				name: 'ぬいぐるみ型',
				bonus: { type: 'exp_vocab', value: 0.1 },
				desc: '語彙EXP+10%',
			},
			{
				id: 'carved',
				name: '彫刻型',
				bonus: { type: 'exp_writing', value: 0.08 },
				desc: 'ライティングEXP+8%',
			},
			{
				id: 'stitched',
				name: '縫製型',
				bonus: { type: 'crit_exp', value: 0.06 },
				desc: 'EXPクリティカル率+6%',
			},
		],
	},
	{
		id: 'fetchling',
		name: 'フェッチリング',
		desc: '影界由来の半影種族',
		heritages: [
			{
				id: 'bright',
				name: '光のフェッチリング',
				bonus: { type: 'exp_reading', value: 0.1 },
				desc: '読解EXP+10%',
			},
			{
				id: 'deep',
				name: '深淵フェッチリング',
				bonus: { type: 'night_bonus', value: 0.18 },
				desc: '夜間EXP+18%',
			},
		],
	},
	{
		id: 'lizardfolk',
		name: 'リザードフォーク',
		desc: '冷静沈着な爬虫類種族',
		heritages: [
			{
				id: 'frilled',
				name: 'フリルリザード',
				bonus: { type: 'exp_grammar', value: 0.08 },
				desc: '文法EXP+8%',
			},
			{
				id: 'sandstrider',
				name: '砂漠リザード',
				bonus: { type: 'streak_bonus', value: 0.12 },
				desc: '連続ボーナス+12%',
			},
			{
				id: 'unseen',
				name: '隠密リザード',
				bonus: { type: 'exp_listening', value: 0.08 },
				desc: 'リスニングEXP+8%',
			},
		],
	},
	{
		id: 'ratfolk',
		name: 'ラットフォーク',
		desc: '社交的で知恵のあるネズミ種族',
		heritages: [
			{
				id: 'longsnout',
				name: '長鼻ラットフォーク',
				bonus: { type: 'exp_vocab', value: 0.12 },
				desc: '語彙EXP+12%',
			},
			{
				id: 'sewer',
				name: '下水ラットフォーク',
				bonus: { type: 'gold_bonus', value: 0.12 },
				desc: 'ゴールド+12%',
			},
		],
	},
	{
		id: 'hobgoblin',
		name: 'ホブゴブリン',
		desc: '規律と戦術の種族',
		heritages: [
			{
				id: 'elfbane',
				name: 'エルフベイン',
				bonus: { type: 'exp_all', value: 0.04 },
				desc: '全EXP+4%',
			},
			{
				id: 'warmarch',
				name: '戦軍ホブゴブリン',
				bonus: { type: 'quest_speed', value: 0.1 },
				desc: 'クエスト完了速度+10%',
			},
		],
	},
	{
		id: 'shoony',
		name: 'ショーニー',
		desc: '犬のような温厚な小型種族',
		heritages: [
			{
				id: 'paddler',
				name: '水掻きショーニー',
				bonus: { type: 'exp_listening', value: 0.1 },
				desc: 'リスニングEXP+10%',
			},
			{
				id: 'thickcoat',
				name: '厚毛ショーニー',
				bonus: { type: 'exp_reading', value: 0.08 },
				desc: '読解EXP+8%',
			},
		],
	},
	{
		id: 'grippli',
		name: 'グリプリ',
		desc: '樹上に住むカエル種族',
		heritages: [
			{
				id: 'poisonhide',
				name: '毒肌グリプリ',
				bonus: { type: 'boss_exp', value: 0.15 },
				desc: 'ボス報酬EXP+15%',
			},
			{
				id: 'windweb',
				name: '風膜グリプリ',
				bonus: { type: 'exp_speaking', value: 0.1 },
				desc: 'スピーキングEXP+10%',
			},
		],
	},
	{
		id: 'azarketi',
		name: 'アザルケティ',
		desc: '海中適応した水棲種族',
		heritages: [
			{
				id: 'ancient',
				name: '古代アザルケティ',
				bonus: { type: 'exp_grammar', value: 0.1 },
				desc: '文法EXP+10%',
			},
			{
				id: 'thalassic',
				name: '深海アザルケティ',
				bonus: { type: 'exp_vocab', value: 0.08 },
				desc: '語彙EXP+8%',
			},
			{
				id: 'benthic',
				name: '底棲アザルケティ',
				bonus: { type: 'night_bonus', value: 0.12 },
				desc: '夜間EXP+12%',
			},
		],
	},
	{
		id: 'strix',
		name: 'ストリックス',
		desc: '翼を持つ空の民',
		heritages: [
			{
				id: 'nightglider',
				name: '夜翔ストリックス',
				bonus: { type: 'night_bonus', value: 0.2 },
				desc: '夜間EXP+20%',
			},
			{
				id: 'predator',
				name: '猛禽ストリックス',
				bonus: { type: 'crit_exp', value: 0.1 },
				desc: 'EXPクリティカル率+10%',
			},
		],
	},
	{
		id: 'anadi',
		name: 'アナディ',
		desc: '蜘蛛に変化できる知的種族',
		heritages: [
			{
				id: 'adaptive',
				name: '適応アナディ',
				bonus: { type: 'exp_all', value: 0.05 },
				desc: '全EXP+5%',
			},
			{
				id: 'venomous',
				name: '毒牙アナディ',
				bonus: { type: 'boss_exp', value: 0.18 },
				desc: 'ボス報酬EXP+18%',
			},
		],
	},
	{
		id: 'conrasu',
		name: 'コンラス',
		desc: '宇宙エネルギーの結晶種族',
		heritages: [
			{
				id: 'rite',
				name: '儀式コンラス',
				bonus: { type: 'exp_writing', value: 0.12 },
				desc: 'ライティングEXP+12%',
			},
			{
				id: 'sharded',
				name: '破片コンラス',
				bonus: { type: 'streak_bonus', value: 0.15 },
				desc: '連続ボーナス+15%',
			},
		],
	},
	{
		id: 'fleshwarp',
		name: 'フレッシュワープ',
		desc: '肉体改造を受けた変異種族',
		heritages: [
			{
				id: 'created',
				name: '人造フレッシュワープ',
				bonus: { type: 'exp_all', value: 0.04 },
				desc: '全EXP+4%',
			},
			{
				id: 'mutated',
				name: '突然変異体',
				bonus: { type: 'crit_exp', value: 0.12 },
				desc: 'EXPクリティカル率+12%',
			},
		],
	},
	{
		id: 'kashrishi',
		name: 'カシュリシ',
		desc: '水晶角を持つサイ型種族',
		heritages: [
			{
				id: 'athamasi',
				name: 'アタマシ',
				bonus: { type: 'exp_reading', value: 0.12 },
				desc: '読解EXP+12%',
			},
			{
				id: 'xyloshi',
				name: 'キシロシ',
				bonus: { type: 'exp_listening', value: 0.1 },
				desc: 'リスニングEXP+10%',
			},
		],
	},
	{
		id: 'nagaji',
		name: 'ナガジ',
		desc: '蛇神に創られた蛇人種族',
		heritages: [
			{
				id: 'hooded',
				name: 'フードナガジ',
				bonus: { type: 'exp_speaking', value: 0.12 },
				desc: 'スピーキングEXP+12%',
			},
			{
				id: 'sacred',
				name: '聖なるナガジ',
				bonus: { type: 'exp_grammar', value: 0.1 },
				desc: '文法EXP+10%',
			},
			{
				id: 'venomshield',
				name: '毒盾ナガジ',
				bonus: { type: 'boss_exp', value: 0.15 },
				desc: 'ボス報酬EXP+15%',
			},
		],
	},
	{
		id: 'vanara',
		name: 'ヴァナラ',
		desc: '猿のような敏捷種族',
		heritages: [
			{
				id: 'bandulur',
				name: 'バンドゥル',
				bonus: { type: 'exp_vocab', value: 0.1 },
				desc: '語彙EXP+10%',
			},
			{
				id: 'wajaghand',
				name: 'ワジャガン',
				bonus: { type: 'quest_speed', value: 0.12 },
				desc: 'クエスト完了速度+12%',
			},
		],
	},
	{
		id: 'vishkanya',
		name: 'ヴィシュカニヤ',
		desc: '毒を操る蛇目の種族',
		heritages: [
			{
				id: 'elusive',
				name: '幻惑ヴィシュカニヤ',
				bonus: { type: 'gold_bonus', value: 0.15 },
				desc: 'ゴールド+15%',
			},
			{
				id: 'keen',
				name: '鋭敏ヴィシュカニヤ',
				bonus: { type: 'exp_listening', value: 0.12 },
				desc: 'リスニングEXP+12%',
			},
		],
	},
];

var CLASSES = [
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
		id: 'oracle',
		name: 'オラクル',
		desc: '謎めいた啓示を受ける預言者',
		subclasses: [
			{
				id: 'flames',
				name: '炎の神秘',
				bonus: { type: 'crit_exp', value: 0.12 },
				desc: 'EXPクリティカル率+12%',
			},
			{
				id: 'lore',
				name: '知識の神秘',
				bonus: { type: 'exp_grammar', value: 0.1 },
				desc: '文法EXP+10%',
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
		id: 'magus',
		name: 'メイガス',
		desc: '剣と魔法を融合させる戦士',
		subclasses: [
			{
				id: 'starlit',
				name: '星光のメイガス',
				bonus: { type: 'exp_all', value: 0.04 },
				desc: '全EXP+4%',
			},
			{
				id: 'sparkling',
				name: '閃光のメイガス',
				bonus: { type: 'streak_bonus', value: 0.12 },
				desc: '連続ボーナス+12%',
			},
		],
	},
	{
		id: 'gunslinger',
		name: 'ガンスリンガー',
		desc: '銃器の達人',
		subclasses: [
			{
				id: 'sniper',
				name: 'スナイパー',
				bonus: { type: 'crit_exp', value: 0.12 },
				desc: 'EXPクリティカル率+12%',
			},
			{
				id: 'drifter',
				name: 'ドリフター',
				bonus: { type: 'quest_speed', value: 0.1 },
				desc: 'クエスト完了速度+10%',
			},
		],
	},
	{
		id: 'inventor',
		name: 'インベンター',
		desc: '革新的な発明家',
		subclasses: [
			{
				id: 'armor',
				name: 'アーマー型',
				bonus: { type: 'exp_writing', value: 0.12 },
				desc: 'ライティングEXP+12%',
			},
			{
				id: 'weapon',
				name: 'ウェポン型',
				bonus: { type: 'boss_exp', value: 0.15 },
				desc: 'ボス報酬EXP+15%',
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
		id: 'thaumaturge',
		name: 'ソーマターグ',
		desc: '象徴と奇跡の使い手',
		subclasses: [
			{
				id: 'tome',
				name: '書のソーマターグ',
				bonus: { type: 'exp_reading', value: 0.12 },
				desc: '読解EXP+12%',
			},
			{
				id: 'chalice',
				name: '杯のソーマターグ',
				bonus: { type: 'gold_bonus', value: 0.15 },
				desc: 'ゴールド+15%',
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
			{
				id: 'earth',
				name: '地の操者',
				bonus: { type: 'exp_all', value: 0.04 },
				desc: '全EXP+4%',
			},
		],
	},
];

var SPHERE_NODES = [
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
		desc: 'The heart of your journey. All paths begin here.',
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
		desc: 'Basic vocabulary fundamentals.',
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
		desc: 'Intermediate word mastery.',
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
		desc: 'Advanced lexical knowledge.',
	},
	{
		id: 'v_boss',
		zone: 'vocab',
		x: 50,
		y: 60,
		label: 'BOSS',
		type: 'boss',
		rarity: 5,
		prereq: ['v3'],
		reward: { type: 'exp', value: 100, cat: 'vocab' },
		desc: 'Vocabulary Domain Guardian. Defeat to prove your mastery.',
	},
	{
		id: 'v_chest',
		zone: 'vocab',
		x: 150,
		y: 180,
		label: 'LOOT',
		type: 'chest',
		rarity: 4,
		prereq: ['v2'],
		reward: { type: 'gold', value: 50 },
		desc: 'A treasure chest of rare word cards.',
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
		desc: 'Essential grammar structures.',
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
		desc: 'Complex sentence patterns.',
	},
	{
		id: 'g3',
		zone: 'grammar',
		x: 700,
		y: 170,
		label: 'GRM III',
		type: 'skill',
		rarity: 3,
		prereq: ['g2'],
		reward: { type: 'exp', value: 30, cat: 'grammar' },
		desc: 'Master-level grammatical constructs.',
	},
	{
		id: 'g_boss',
		zone: 'grammar',
		x: 700,
		y: 60,
		label: 'BOSS',
		type: 'boss',
		rarity: 5,
		prereq: ['g3'],
		reward: { type: 'exp', value: 100, cat: 'grammar' },
		desc: 'Grammar Domain Guardian. The final test of structure.',
	},
	{
		id: 'g_event',
		zone: 'grammar',
		x: 600,
		y: 190,
		label: 'TRIAL',
		type: 'event',
		rarity: 4,
		prereq: ['g2'],
		reward: { type: 'exp', value: 40, cat: 'grammar' },
		desc: 'A grammar trial. Complete the challenge for bonus EXP.',
	},
	{
		id: 's1',
		zone: 'speaking',
		x: 180,
		y: 340,
		label: 'SPK I',
		type: 'skill',
		rarity: 1,
		prereq: ['hub'],
		reward: { type: 'exp', value: 10, cat: 'speaking' },
		desc: 'Basic pronunciation and phrases.',
	},
	{
		id: 's2',
		zone: 'speaking',
		x: 80,
		y: 380,
		label: 'SPK II',
		type: 'skill',
		rarity: 2,
		prereq: ['s1'],
		reward: { type: 'exp', value: 20, cat: 'speaking' },
		desc: 'Conversational fluency training.',
	},
	{
		id: 's3',
		zone: 'speaking',
		x: 80,
		y: 460,
		label: 'SPK III',
		type: 'skill',
		rarity: 3,
		prereq: ['s2'],
		reward: { type: 'exp', value: 30, cat: 'speaking' },
		desc: 'Advanced oral expression.',
	},
	{
		id: 's_boss',
		zone: 'speaking',
		x: 160,
		y: 480,
		label: 'BOSS',
		type: 'boss',
		rarity: 5,
		prereq: ['s3'],
		reward: { type: 'exp', value: 100, cat: 'speaking' },
		desc: 'Speaking Domain Guardian. Prove your voice.',
	},
	{
		id: 's_chest',
		zone: 'speaking',
		x: 170,
		y: 430,
		label: 'LOOT',
		type: 'chest',
		rarity: 4,
		prereq: ['s2'],
		reward: { type: 'gold', value: 50 },
		desc: 'A cache of dialogue practice scrolls.',
	},
	{
		id: 'l1',
		zone: 'listening',
		x: 540,
		y: 340,
		label: 'LSN I',
		type: 'skill',
		rarity: 1,
		prereq: ['hub'],
		reward: { type: 'exp', value: 10, cat: 'listening' },
		desc: 'Listening comprehension basics.',
	},
	{
		id: 'l2',
		zone: 'listening',
		x: 660,
		y: 380,
		label: 'LSN II',
		type: 'skill',
		rarity: 2,
		prereq: ['l1'],
		reward: { type: 'exp', value: 20, cat: 'listening' },
		desc: 'Intermediate aural processing.',
	},
	{
		id: 'l3',
		zone: 'listening',
		x: 660,
		y: 460,
		label: 'LSN III',
		type: 'skill',
		rarity: 3,
		prereq: ['l2'],
		reward: { type: 'exp', value: 30, cat: 'listening' },
		desc: 'Advanced listening and dictation.',
	},
	{
		id: 'l_boss',
		zone: 'listening',
		x: 580,
		y: 480,
		label: 'BOSS',
		type: 'boss',
		rarity: 5,
		prereq: ['l3'],
		reward: { type: 'exp', value: 100, cat: 'listening' },
		desc: 'Listening Domain Guardian. The ultimate ear test.',
	},
	{
		id: 'r1',
		zone: 'reading',
		x: 280,
		y: 50,
		label: 'RDG I',
		type: 'skill',
		rarity: 1,
		prereq: ['hub'],
		reward: { type: 'exp', value: 10, cat: 'reading' },
		desc: 'Reading fundamentals and decoding.',
	},
	{
		id: 'r2',
		zone: 'reading',
		x: 320,
		y: 10,
		label: 'RDG II',
		type: 'skill',
		rarity: 2,
		prereq: ['r1'],
		reward: { type: 'exp', value: 25, cat: 'reading' },
		desc: 'Passage analysis and inference.',
	},
	{
		id: 'r_event',
		zone: 'reading',
		x: 400,
		y: 30,
		label: 'TRIAL',
		type: 'event',
		rarity: 3,
		prereq: ['r1'],
		reward: { type: 'exp', value: 30, cat: 'reading' },
		desc: 'A reading comprehension trial.',
	},
	{
		id: 'w1',
		zone: 'writing',
		x: 320,
		y: 450,
		label: 'WRT I',
		type: 'skill',
		rarity: 1,
		prereq: ['hub'],
		reward: { type: 'exp', value: 10, cat: 'writing' },
		desc: 'Writing basics and character practice.',
	},
	{
		id: 'w2',
		zone: 'writing',
		x: 370,
		y: 500,
		label: 'WRT II',
		type: 'skill',
		rarity: 2,
		prereq: ['w1'],
		reward: { type: 'exp', value: 25, cat: 'writing' },
		desc: 'Structured composition skills.',
	},
	{
		id: 'w_event',
		zone: 'writing',
		x: 440,
		y: 480,
		label: 'TRIAL',
		type: 'event',
		rarity: 3,
		prereq: ['w1'],
		reward: { type: 'exp', value: 30, cat: 'writing' },
		desc: 'A writing challenge trial.',
	},
	{
		id: 'w_chest',
		zone: 'writing',
		x: 260,
		y: 490,
		label: 'LOOT',
		type: 'chest',
		rarity: 4,
		prereq: ['w2'],
		reward: { type: 'gold', value: 60 },
		desc: 'A chest of calligraphy and composition tools.',
	},
	{
		id: 'final_boss',
		zone: 'core',
		x: 370,
		y: 370,
		label: 'FINAL',
		type: 'boss',
		rarity: 5,
		prereq: ['v_boss', 'g_boss', 's_boss', 'l_boss'],
		reward: { type: 'title', value: '伝説の言語マスター' },
		desc: 'The Final Guardian. Only those who conquered all domains may challenge.',
	},
];

var JOB_SYNERGY = {
	fighter: ['speaking', 'vocab'],
	wizard: ['grammar', 'reading'],
	rogue: ['vocab', 'listening'],
	cleric: ['writing', 'grammar'],
	ranger: ['listening', 'speaking'],
	bard: ['speaking', 'writing'],
	monk: ['grammar', 'speaking'],
	druid: ['listening', 'vocab'],
	sorcerer: ['grammar', 'writing'],
	barbarian: ['vocab', 'speaking'],
	alchemist: ['reading', 'writing'],
	champion: ['speaking', 'grammar'],
	investigator: ['reading', 'vocab'],
	oracle: ['grammar', 'listening'],
	swashbuckler: ['speaking', 'vocab'],
	witch: ['writing', 'listening'],
	magus: ['grammar', 'vocab'],
	gunslinger: ['listening', 'speaking'],
	inventor: ['writing', 'reading'],
	summoner: ['vocab', 'grammar'],
	psychic: ['vocab', 'listening'],
	thaumaturge: ['reading', 'writing'],
	kineticist: ['grammar', 'speaking'],
};

console.log(
	'✅ data.js loaded:',
	ANCESTRIES.length,
	'ancestries,',
	CLASSES.length,
	'classes,',
	SPHERE_NODES.length,
	'nodes',
);

// ========== DEFAULT STATE ==========

var DEFAULT_STATE = {
	version: '1.0.0',
	character: null,
	level: 1,
	exp: 0,
	gold: 0,
	skills: {
		vocab: 0,
		grammar: 0,
		speaking: 0,
		listening: 0,
		reading: 0,
		writing: 0,
	},
	sphereUnlocked: ['hub'],
	quests: [],
	dailyDate: null,
	reviewDeck: [],
	streak: 0,
	lastStudy: null,
	totalSessions: 0,
	activityLog: [],
};

var state = {};

// ========== UTILITY FUNCTIONS ==========

function deepClone(obj) {
	try {
		return JSON.parse(JSON.stringify(obj));
	} catch (e) {
		console.error('deepClone error:', e);
		return obj;
	}
}

function saveState() {
	try {
		localStorage.setItem('lq_state', JSON.stringify(state));
	} catch (e) {
		console.error('saveState error:', e);
	}
}

function loadState() {
	try {
		var saved = localStorage.getItem('lq_state');
		if (saved) {
			var parsed = JSON.parse(saved);
			state = Object.assign(deepClone(DEFAULT_STATE), parsed);
		} else {
			state = deepClone(DEFAULT_STATE);
		}
	} catch (e) {
		console.error('loadState error:', e);
		state = deepClone(DEFAULT_STATE);
	}
}

function isNightTime() {
	var h = new Date().getHours();
	return h >= 21 || h < 6;
}

function getTitleForLevel(lv) {
	var t = '見習い冒険者';
	for (var i = 0; i < TITLES.length; i++) {
		if (lv >= TITLES[i].level) t = TITLES[i].title;
	}
	return t;
}

function getBonus(type) {
	var val = 0;
	if (state.character) {
		var anc = null;
		var cls = null;
		for (var i = 0; i < ANCESTRIES.length; i++) {
			if (ANCESTRIES[i].id === state.character.ancestryId) {
				anc = ANCESTRIES[i];
				break;
			}
		}
		for (var i = 0; i < CLASSES.length; i++) {
			if (CLASSES[i].id === state.character.classId) {
				cls = CLASSES[i];
				break;
			}
		}
		if (anc) {
			for (var j = 0; j < anc.heritages.length; j++) {
				if (
					anc.heritages[j].id === state.character.heritageId &&
					anc.heritages[j].bonus.type === type
				) {
					val += anc.heritages[j].bonus.value;
				}
			}
		}
		if (cls) {
			for (var j = 0; j < cls.subclasses.length; j++) {
				if (
					cls.subclasses[j].id === state.character.subclassId &&
					cls.subclasses[j].bonus.type === type
				) {
					val += cls.subclasses[j].bonus.value;
				}
			}
		}
	}
	return val;
}

function addExp(amount, category) {
	var catBonus = 0;
	if (category) {
		catBonus = getBonus('exp_' + category);
	}
	var allBonus = getBonus('exp_all');
	var nightBonus = isNightTime() ? getBonus('night_bonus') : 0;
	var streakBonus = state.streak >= 3 ? getBonus('streak_bonus') : 0;
	var critBonus = 0;
	var critRate = getBonus('crit_exp');
	if (Math.random() < critRate) {
		critBonus = 0.5;
		showToast('クリティカルEXP! +50%', 'exp');
	}
	var totalMult =
		1 + catBonus + allBonus + nightBonus + streakBonus + critBonus;
	var finalExp = Math.floor(amount * totalMult);
	state.exp += finalExp;
	if (category && state.skills[category] !== undefined) {
		state.skills[category] += finalExp;
	}
	while (state.exp >= expForLevel(state.level)) {
		state.exp -= expForLevel(state.level);
		state.level++;
		showToast(
			'レベルアップ! Lv.' + state.level + ' - ' + getTitleForLevel(state.level),
			'gold',
		);
	}
	updateHUD();
	saveState();
	return finalExp;
}

function addGold(amount) {
	var bonus = getBonus('gold_bonus');
	var total = Math.floor(amount * (1 + bonus));
	state.gold += total;
	updateHUD();
	saveState();
	return total;
}

function logActivity(msg) {
	state.activityLog.unshift({ time: Date.now(), msg: msg });
	if (state.activityLog.length > 50) state.activityLog.length = 50;
	saveState();
}

// ========== TOAST NOTIFICATION ==========

function showToast(msg, type) {
	var container = document.getElementById('toast-container');
	if (!container) return;
	var el = document.createElement('div');
	el.className = 'toast' + (type ? ' ' + type : '');
	el.textContent = msg;
	container.appendChild(el);
	setTimeout(function () {
		if (el.parentNode) el.parentNode.removeChild(el);
	}, 3500);
}

// ========== HUD ==========

function updateHUD() {
	var elLv = document.getElementById('hud-level');
	var elExp = document.getElementById('hud-exp');
	var elGold = document.getElementById('hud-gold');
	if (elLv) elLv.textContent = 'Lv.' + state.level;
	if (elExp)
		elExp.textContent = 'EXP ' + state.exp + '/' + expForLevel(state.level);
	if (elGold) elGold.textContent = 'Gold ' + state.gold;
}

function updateClock() {
	var el = document.getElementById('hud-clock');
	if (!el) return;
	var now = new Date();
	var hh = String(now.getHours()).padStart(2, '0');
	var mm = String(now.getMinutes()).padStart(2, '0');
	el.textContent = hh + ':' + mm;
	if (isNightTime()) {
		el.style.color = '#a855f7';
	} else {
		el.style.color = '';
	}
}

// ========== PARTICLES ==========

function initParticles() {
	var canvas = document.getElementById('particles-canvas');
	if (!canvas) return;
	var ctx = canvas.getContext('2d');
	var particles = [];
	var maxP = 60;

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resize();
	window.addEventListener('resize', resize);

	for (var i = 0; i < maxP; i++) {
		particles.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			r: Math.random() * 2 + 0.5,
			dx: (Math.random() - 0.5) * 0.4,
			dy: (Math.random() - 0.5) * 0.4,
			a: Math.random() * 0.4 + 0.1,
		});
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(80,200,120,' + p.a + ')';
			ctx.fill();
			p.x += p.dx;
			p.y += p.dy;
			if (p.x < 0) p.x = canvas.width;
			if (p.x > canvas.width) p.x = 0;
			if (p.y < 0) p.y = canvas.height;
			if (p.y > canvas.height) p.y = 0;
		}
		requestAnimationFrame(draw);
	}
	draw();
}

// ========== NAVIGATION ==========

function initNavigation() {
	var btns = document.querySelectorAll('.nav-btn');
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', function () {
			var tab = this.getAttribute('data-tab');
			showTab(tab);
		});
	}
}

function showTab(tabId) {
	var panels = document.querySelectorAll('.tab-panel');
	var btns = document.querySelectorAll('.nav-btn');
	for (var i = 0; i < panels.length; i++) {
		panels[i].classList.remove('active');
	}
	for (var i = 0; i < btns.length; i++) {
		btns[i].classList.remove('active');
		if (btns[i].getAttribute('data-tab') === tabId) {
			btns[i].classList.add('active');
		}
	}
	var target = document.getElementById('tab-' + tabId);
	if (target) target.classList.add('active');

	if (tabId === 'home') renderHome();
	if (tabId === 'character') renderCharacter();
	if (tabId === 'sphere') renderSphere();
	if (tabId === 'quests') renderQuests();
	if (tabId === 'review') renderReview();
}
/* ============================================
   LinguaQuest - app.js
   Part 2/3: Tab Rendering (Home, Character, Sphere, Quests, Review, Settings)
   ============================================ */

// ========== HOME TAB ==========

function renderHome() {
	var statsEl = document.getElementById('home-stats');
	var dailyEl = document.getElementById('daily-quest-list');
	var recentEl = document.getElementById('recent-activity');

	if (statsEl) {
		var items = [
			{ num: state.level, label: 'レベル' },
			{ num: state.gold, label: 'ゴールド' },
			{ num: state.sphereUnlocked.length, label: '解放ノード' },
			{ num: state.streak, label: '連続日数' },
			{ num: state.totalSessions, label: '総セッション' },
			{
				num: Object.keys(state.skills).reduce(function (s, k) {
					return s + state.skills[k];
				}, 0),
				label: '総スキルEXP',
			},
		];
		var html = '';
		for (var i = 0; i < items.length; i++) {
			html += '<div class="home-stat-item">';
			html += '<div class="home-stat-num">' + items[i].num + '</div>';
			html += '<div class="home-stat-label">' + items[i].label + '</div>';
			html += '</div>';
		}
		statsEl.innerHTML = html;
	}

	if (dailyEl) {
		generateDailyQuests();
		var dq = state.quests.filter(function (q) {
			return q.type === 'daily';
		});
		if (dq.length === 0) {
			dailyEl.innerHTML =
				'<p style="color:var(--text-muted);">デイリークエストを生成中…</p>';
		} else {
			var html = '';
			for (var i = 0; i < dq.length; i++) {
				var q = dq[i];
				var done = q.completed ? ' completed' : '';
				html += '<div class="quest-item' + done + '">';
				html += '<div><span class="quest-title">' + q.title + '</span></div>';
				html += '<div><span class="quest-reward">+' + q.reward + ' EXP</span> ';
				if (!q.completed) {
					html +=
						'<button class="quest-btn" onclick="completeQuest(\'' +
						q.id +
						'\')">達成</button>';
				} else {
					html += '<span style="color:var(--accent-1);">完了</span>';
				}
				html += '</div></div>';
			}
			dailyEl.innerHTML = html;
		}
	}

	if (recentEl) {
		if (state.activityLog.length === 0) {
			recentEl.innerHTML =
				'<p style="color:var(--text-muted);">まだ活動記録がありません。</p>';
		} else {
			var html = '';
			var show = state.activityLog.slice(0, 10);
			for (var i = 0; i < show.length; i++) {
				var d = new Date(show[i].time);
				var ts =
					String(d.getHours()).padStart(2, '0') +
					':' +
					String(d.getMinutes()).padStart(2, '0');
				html +=
					'<div style="padding:6px 0;border-bottom:1px solid rgba(80,200,120,0.08);font-size:0.85rem;">';
				html +=
					'<span style="color:var(--text-muted);margin-right:10px;">' +
					ts +
					'</span>';
				html += '<span>' + show[i].msg + '</span>';
				html += '</div>';
			}
			recentEl.innerHTML = html;
		}
	}
}

// ========== DAILY QUESTS ==========

function generateDailyQuests() {
	var today = new Date().toISOString().slice(0, 10);
	if (state.dailyDate === today) return;
	state.dailyDate = today;

	var templates = [
		{ title: '語彙を5つ学習する', reward: 20, cat: 'vocab' },
		{ title: '文法問題を3問解く', reward: 20, cat: 'grammar' },
		{ title: 'AIチューターと会話する', reward: 15, cat: 'speaking' },
		{ title: 'リスニング練習を1回行う', reward: 15, cat: 'listening' },
		{ title: '文章を1つ書く', reward: 20, cat: 'writing' },
		{ title: '復習デッキを5枚確認する', reward: 15, cat: 'reading' },
		{ title: 'スフィア盤のノードを1つ解放する', reward: 25, cat: 'vocab' },
		{ title: '10分間学習する', reward: 30, cat: 'speaking' },
	];

	var shuffled = templates.slice().sort(function () {
		return Math.random() - 0.5;
	});
	var picked = shuffled.slice(0, 4);
	var dailies = [];
	for (var i = 0; i < picked.length; i++) {
		dailies.push({
			id: 'daily_' + today + '_' + i,
			type: 'daily',
			title: picked[i].title,
			reward: picked[i].reward,
			cat: picked[i].cat,
			completed: false,
		});
	}

	state.quests = state.quests.filter(function (q) {
		return q.type !== 'daily';
	});
	state.quests = state.quests.concat(dailies);
	saveState();
}

function completeQuest(qid) {
	for (var i = 0; i < state.quests.length; i++) {
		if (state.quests[i].id === qid && !state.quests[i].completed) {
			state.quests[i].completed = true;
			var q = state.quests[i];
			var gained = addExp(q.reward, q.cat);
			addGold(Math.floor(q.reward / 2));
			showToast('クエスト完了! +' + gained + ' EXP', 'exp');
			logActivity('クエスト完了: ' + q.title);
			break;
		}
	}
	renderHome();
	renderQuests();
}

// ========== CHARACTER TAB ==========

function renderCharacter() {
	var display = document.getElementById('char-display');
	var creation = document.getElementById('char-creation');
	var info = document.getElementById('char-info');

	if (!display || !creation || !info) return;

	if (state.character) {
		display.style.display = 'block';
		creation.style.display = 'none';

		var anc = null;
		var cls = null;
		var her = null;
		var sub = null;

		for (var i = 0; i < ANCESTRIES.length; i++) {
			if (ANCESTRIES[i].id === state.character.ancestryId) {
				anc = ANCESTRIES[i];
				for (var j = 0; j < anc.heritages.length; j++) {
					if (anc.heritages[j].id === state.character.heritageId)
						her = anc.heritages[j];
				}
				break;
			}
		}
		for (var i = 0; i < CLASSES.length; i++) {
			if (CLASSES[i].id === state.character.classId) {
				cls = CLASSES[i];
				for (var j = 0; j < cls.subclasses.length; j++) {
					if (cls.subclasses[j].id === state.character.subclassId)
						sub = cls.subclasses[j];
				}
				break;
			}
		}

		var html = '';
		html +=
			'<div class="char-stat-row"><span class="char-stat-label">名前</span><span class="char-stat-value">' +
			state.character.name +
			'</span></div>';
		html +=
			'<div class="char-stat-row"><span class="char-stat-label">称号</span><span class="char-stat-value">' +
			getTitleForLevel(state.level) +
			'</span></div>';
		html +=
			'<div class="char-stat-row"><span class="char-stat-label">種族</span><span class="char-stat-value">' +
			(anc ? anc.name : '?') +
			'</span></div>';
		html +=
			'<div class="char-stat-row"><span class="char-stat-label">Heritage</span><span class="char-stat-value">' +
			(her ? her.name : '?') +
			'</span></div>';
		if (her)
			html +=
				'<div class="char-stat-row"><span class="char-stat-label">Heritage効果</span><span class="char-bonus-tag">' +
				her.desc +
				'</span></div>';
		html +=
			'<div class="char-stat-row"><span class="char-stat-label">職業</span><span class="char-stat-value">' +
			(cls ? cls.name : '?') +
			'</span></div>';
		html +=
			'<div class="char-stat-row"><span class="char-stat-label">Subclass</span><span class="char-stat-value">' +
			(sub ? sub.name : '?') +
			'</span></div>';
		if (sub)
			html +=
				'<div class="char-stat-row"><span class="char-stat-label">Subclass効果</span><span class="char-bonus-tag">' +
				sub.desc +
				'</span></div>';

		html +=
			'<div class="char-stat-row"><span class="char-stat-label">レベル</span><span class="char-stat-value">Lv.' +
			state.level +
			'</span></div>';
		html +=
			'<div class="char-stat-row"><span class="char-stat-label">EXP</span><span class="char-stat-value">' +
			state.exp +
			' / ' +
			expForLevel(state.level) +
			'</span></div>';
		html +=
			'<div class="exp-bar-container"><div class="exp-bar-fill" style="width:' +
			Math.min(100, (state.exp / expForLevel(state.level)) * 100) +
			'%"></div></div>';

		html += '<h3 style="margin-top:20px;color:var(--accent-1);">スキル</h3>';
		var skillNames = {
			vocab: '語彙',
			grammar: '文法',
			speaking: '会話',
			listening: '聴解',
			reading: '読解',
			writing: '作文',
		};
		var keys = Object.keys(state.skills);
		for (var i = 0; i < keys.length; i++) {
			html +=
				'<div class="char-stat-row"><span class="char-stat-label">' +
				(skillNames[keys[i]] || keys[i]) +
				'</span><span class="char-stat-value">' +
				state.skills[keys[i]] +
				' pts</span></div>';
		}

		html +=
			'<button class="btn-reroll" onclick="resetCharacter()">キャラクターリセット</button>';
		info.innerHTML = html;
	} else {
		display.style.display = 'none';
		creation.style.display = 'block';
		populateCreationForm();
	}
}

function populateCreationForm() {
	var ancSel = document.getElementById('char-ancestry-select');
	var herSel = document.getElementById('char-heritage-select');
	var clsSel = document.getElementById('char-class-select');
	var subSel = document.getElementById('char-subclass-select');

	if (!ancSel || !herSel || !clsSel || !subSel) return;

	ancSel.innerHTML = '';
	for (var i = 0; i < ANCESTRIES.length; i++) {
		var opt = document.createElement('option');
		opt.value = ANCESTRIES[i].id;
		opt.textContent = ANCESTRIES[i].name + ' - ' + ANCESTRIES[i].desc;
		ancSel.appendChild(opt);
	}

	clsSel.innerHTML = '';
	for (var i = 0; i < CLASSES.length; i++) {
		var opt = document.createElement('option');
		opt.value = CLASSES[i].id;
		opt.textContent = CLASSES[i].name + ' - ' + CLASSES[i].desc;
		clsSel.appendChild(opt);
	}

	function updateHeritages() {
		herSel.innerHTML = '';
		var aid = ancSel.value;
		for (var i = 0; i < ANCESTRIES.length; i++) {
			if (ANCESTRIES[i].id === aid) {
				for (var j = 0; j < ANCESTRIES[i].heritages.length; j++) {
					var h = ANCESTRIES[i].heritages[j];
					var opt = document.createElement('option');
					opt.value = h.id;
					opt.textContent = h.name + ' (' + h.desc + ')';
					herSel.appendChild(opt);
				}
				break;
			}
		}
		updateBonusPreview();
	}

	function updateSubclasses() {
		subSel.innerHTML = '';
		var cid = clsSel.value;
		for (var i = 0; i < CLASSES.length; i++) {
			if (CLASSES[i].id === cid) {
				for (var j = 0; j < CLASSES[i].subclasses.length; j++) {
					var s = CLASSES[i].subclasses[j];
					var opt = document.createElement('option');
					opt.value = s.id;
					opt.textContent = s.name + ' (' + s.desc + ')';
					subSel.appendChild(opt);
				}
				break;
			}
		}
		updateBonusPreview();
	}

	function updateBonusPreview() {
		var preview = document.getElementById('bonus-preview');
		if (!preview) return;
		var aid = ancSel.value;
		var hid = herSel.value;
		var cid = clsSel.value;
		var sid = subSel.value;
		var lines = [];

		for (var i = 0; i < ANCESTRIES.length; i++) {
			if (ANCESTRIES[i].id === aid) {
				for (var j = 0; j < ANCESTRIES[i].heritages.length; j++) {
					if (ANCESTRIES[i].heritages[j].id === hid) {
						lines.push('Heritage: ' + ANCESTRIES[i].heritages[j].desc);
					}
				}
				break;
			}
		}
		for (var i = 0; i < CLASSES.length; i++) {
			if (CLASSES[i].id === cid) {
				for (var j = 0; j < CLASSES[i].subclasses.length; j++) {
					if (CLASSES[i].subclasses[j].id === sid) {
						lines.push('Subclass: ' + CLASSES[i].subclasses[j].desc);
					}
				}
				break;
			}
		}

		if (JOB_SYNERGY[cid]) {
			lines.push('職業シナジー: ' + JOB_SYNERGY[cid].join(' / '));
		}

		preview.innerHTML =
			lines.length > 0 ? lines.join('<br>') : 'ボーナスプレビュー';
	}

	ancSel.addEventListener('change', updateHeritages);
	clsSel.addEventListener('change', updateSubclasses);
	herSel.addEventListener('change', updateBonusPreview);
	subSel.addEventListener('change', updateBonusPreview);

	updateHeritages();
	updateSubclasses();

	var createBtn = document.getElementById('btn-create-char');
	if (createBtn) {
		createBtn.onclick = function () {
			var name = document.getElementById('char-name-input').value.trim();
			if (!name) {
				showToast('名前を入力してください', 'error');
				return;
			}
			state.character = {
				name: name,
				ancestryId: ancSel.value,
				heritageId: herSel.value,
				classId: clsSel.value,
				subclassId: subSel.value,
			};
			saveState();
			logActivity('キャラクター作成: ' + name);
			showToast('キャラクターを作成しました!', 'gold');
			renderCharacter();
		};
	}
}

function resetCharacter() {
	if (
		confirm('キャラクターをリセットしますか？（EXPやゴールドは保持されます）')
	) {
		state.character = null;
		saveState();
		showToast('キャラクターをリセットしました', '');
		renderCharacter();
	}
}

// ========== SPHERE GRID TAB ==========

function renderSphere() {
	var grid = document.getElementById('sphere-grid');
	var infoBox = document.getElementById('sphere-info');
	if (!grid) return;

	grid.innerHTML = '';

	// Draw connecting lines first
	for (var i = 0; i < SPHERE_NODES.length; i++) {
		var node = SPHERE_NODES[i];
		for (var p = 0; p < node.prereq.length; p++) {
			var parentNode = null;
			for (var k = 0; k < SPHERE_NODES.length; k++) {
				if (SPHERE_NODES[k].id === node.prereq[p]) {
					parentNode = SPHERE_NODES[k];
					break;
				}
			}
			if (parentNode) {
				var line = document.createElement('div');
				line.className = 'sphere-line';

				var x1 = parentNode.x;
				var y1 = parentNode.y;
				var x2 = node.x;
				var y2 = node.y;
				var dx = x2 - x1;
				var dy = y2 - y1;
				var len = Math.sqrt(dx * dx + dy * dy);
				var angle = (Math.atan2(dy, dx) * 180) / Math.PI;

				line.style.left = x1 + 'px';
				line.style.top = y1 + 'px';
				line.style.width = len + 'px';
				line.style.transform = 'rotate(' + angle + 'deg)';

				var parentUnlocked = state.sphereUnlocked.indexOf(parentNode.id) >= 0;
				var childUnlocked = state.sphereUnlocked.indexOf(node.id) >= 0;
				if (parentUnlocked && childUnlocked) {
					line.classList.add('active');
				}

				grid.appendChild(line);
			}
		}
	}

	// Draw nodes
	for (var i = 0; i < SPHERE_NODES.length; i++) {
		var node = SPHERE_NODES[i];
		var el = document.createElement('div');
		el.className = 'sphere-node';
		el.setAttribute('data-type', node.type);
		el.setAttribute('data-rarity', node.rarity);
		el.setAttribute('data-id', node.id);

		var isUnlocked = state.sphereUnlocked.indexOf(node.id) >= 0;

		// Determine if node can be unlocked
		var canUnlock = false;
		if (!isUnlocked) {
			if (node.prereq.length === 0) {
				canUnlock = true;
			} else {
				canUnlock = true;
				for (var p = 0; p < node.prereq.length; p++) {
					if (state.sphereUnlocked.indexOf(node.prereq[p]) < 0) {
						canUnlock = false;
						break;
					}
				}
			}
		}

		if (isUnlocked) {
			el.classList.add('unlocked');
		} else if (!canUnlock) {
			el.classList.add('locked');
		}

		// Size by type
		var w = 44;
		var h = 44;
		var fontSize = '0.55rem';
		if (node.type === 'boss') {
			w = 56;
			h = 56;
			fontSize = '0.6rem';
		} else if (node.type === 'chest' || node.type === 'event') {
			w = 50;
			h = 50;
			fontSize = '0.55rem';
		} else if (node.type === 'hub') {
			w = 56;
			h = 56;
			fontSize = '0.65rem';
		}

		el.style.width = w + 'px';
		el.style.height = h + 'px';
		el.style.left = node.x - w / 2 + 'px';
		el.style.top = node.y - h / 2 + 'px';
		el.style.fontSize = fontSize;

		el.textContent = node.label;

		(function (n, unlocked, canUn) {
			el.addEventListener('click', function () {
				sphereClick(n, unlocked, canUn);
			});
			el.addEventListener('mouseenter', function () {
				if (infoBox) {
					var stars = '';
					for (var s = 0; s < n.rarity; s++) stars += '★';
					infoBox.innerHTML =
						'<strong>' +
						n.label +
						'</strong> ' +
						stars +
						'<br>' +
						'<em>Zone: ' +
						n.zone +
						' | Type: ' +
						n.type +
						'</em><br>' +
						n.desc;
				}
			});
		})(node, isUnlocked, canUnlock);

		grid.appendChild(el);
	}
}

function sphereClick(node, isUnlocked, canUnlock) {
	if (isUnlocked) {
		var msgs = {
			boss: 'BOSS DEFEATED!',
			chest: 'TREASURE UNLOCKED!',
			event: 'TRIAL CLEARED!',
			skill: 'SKILL ACQUIRED!',
			hub: 'JOURNEY BEGINS!',
		};
		showToast(msgs[node.type] || 'Already unlocked.', '');
		return;
	}

	if (!canUnlock) {
		showToast('前提ノードを先に解放してください', 'error');
		return;
	}

	// Unlock the node
	state.sphereUnlocked.push(node.id);

	// Apply reward
	if (node.reward) {
		if (node.reward.type === 'exp') {
			var gained = addExp(node.reward.value, node.reward.cat || null);
			showToast('NODE UNLOCKED: ' + node.label + ' +' + gained + ' EXP', 'exp');
		} else if (node.reward.type === 'gold') {
			var gained = addGold(node.reward.value);
			showToast(
				'NODE UNLOCKED: ' + node.label + ' +' + gained + ' Gold',
				'gold',
			);
		} else if (node.reward.type === 'title') {
			showToast('LEGENDARY TITLE ACQUIRED: ' + node.reward.value, 'gold');
		} else {
			showToast('NODE UNLOCKED: ' + node.label, 'exp');
		}
	}

	logActivity('ノード解放: ' + node.label + ' (' + node.zone + ')');
	saveState();
	renderSphere();
}

// ========== QUESTS TAB ==========

function renderQuests() {
	var list = document.getElementById('quest-list');
	if (!list) return;

	generateDailyQuests();

	if (state.quests.length === 0) {
		list.innerHTML =
			'<p style="color:var(--text-muted);">クエストがありません。ホームタブでデイリークエストを確認してください。</p>';
		return;
	}

	var html = '';
	for (var i = 0; i < state.quests.length; i++) {
		var q = state.quests[i];
		var done = q.completed ? ' completed' : '';
		html += '<div class="quest-item' + done + '">';
		html += '<div>';
		html += '<span class="quest-title">' + q.title + '</span>';
		html +=
			'<br><span style="font-size:0.75rem;color:var(--text-muted);">' +
			q.type +
			' | ' +
			(q.cat || '-') +
			'</span>';
		html += '</div>';
		html += '<div>';
		html += '<span class="quest-reward">+' + q.reward + ' EXP</span> ';
		if (!q.completed) {
			html +=
				'<button class="quest-btn" onclick="completeQuest(\'' +
				q.id +
				'\')">達成</button>';
		} else {
			html += '<span style="color:var(--accent-1);">完了</span>';
		}
		html += '</div></div>';
	}
	list.innerHTML = html;
}

// ========== REVIEW TAB ==========

var reviewState = {
	currentIndex: 0,
	showBack: false,
};

function renderReview() {
	var area = document.getElementById('review-area');
	if (!area) return;

	if (state.reviewDeck.length === 0) {
		generateSampleDeck();
	}

	var deck = state.reviewDeck;
	if (deck.length === 0) {
		area.innerHTML =
			'<p style="color:var(--text-muted);">復習カードがありません。学習を進めてカードを追加しましょう。</p>';
		return;
	}

	if (reviewState.currentIndex >= deck.length) {
		reviewState.currentIndex = 0;
	}

	var card = deck[reviewState.currentIndex];
	var html = '';

	html += '<div class="review-card-display" onclick="flipReviewCard()">';
	html += '<div class="review-front">' + card.front + '</div>';
	if (reviewState.showBack) {
		html += '<div class="review-back">' + card.back + '</div>';
	} else {
		html +=
			'<div style="color:var(--text-muted);font-size:0.8rem;margin-top:8px;">クリックして回答を表示</div>';
	}
	html += '</div>';

	html +=
		'<div style="text-align:center;color:var(--text-muted);font-size:0.8rem;margin-bottom:12px;">';
	html += reviewState.currentIndex + 1 + ' / ' + deck.length;
	html += '</div>';

	if (reviewState.showBack) {
		html += '<div class="review-btns">';
		html +=
			'<button class="review-btn easy" onclick="rateReviewCard(\'easy\')">簡単</button>';
		html +=
			'<button class="review-btn medium" onclick="rateReviewCard(\'medium\')">普通</button>';
		html +=
			'<button class="review-btn hard" onclick="rateReviewCard(\'hard\')">難しい</button>';
		html += '</div>';
	}

	area.innerHTML = html;
}

function generateSampleDeck() {
	state.reviewDeck = [
		{
			front: 'Hello',
			back: 'こんにちは',
			cat: 'vocab',
			interval: 1,
			nextReview: Date.now(),
		},
		{
			front: 'Thank you',
			back: 'ありがとう',
			cat: 'vocab',
			interval: 1,
			nextReview: Date.now(),
		},
		{
			front: 'Good morning',
			back: 'おはようございます',
			cat: 'vocab',
			interval: 1,
			nextReview: Date.now(),
		},
		{
			front: 'I like coffee',
			back: 'コーヒーが好きです',
			cat: 'grammar',
			interval: 1,
			nextReview: Date.now(),
		},
		{
			front: 'Where is the station?',
			back: '駅はどこですか？',
			cat: 'speaking',
			interval: 1,
			nextReview: Date.now(),
		},
		{
			front: 'Excuse me',
			back: 'すみません',
			cat: 'vocab',
			interval: 1,
			nextReview: Date.now(),
		},
		{
			front: 'How much is this?',
			back: 'これはいくらですか？',
			cat: 'speaking',
			interval: 1,
			nextReview: Date.now(),
		},
		{
			front: 'Nice to meet you',
			back: 'はじめまして',
			cat: 'vocab',
			interval: 1,
			nextReview: Date.now(),
		},
	];
	saveState();
}

function flipReviewCard() {
	reviewState.showBack = !reviewState.showBack;
	renderReview();
}

function rateReviewCard(rating) {
	var card = state.reviewDeck[reviewState.currentIndex];
	if (!card) return;

	if (rating === 'easy') {
		card.interval = Math.min(card.interval * 2.5, 30);
		addExp(5, card.cat);
	} else if (rating === 'medium') {
		card.interval = Math.min(card.interval * 1.5, 20);
		addExp(3, card.cat);
	} else {
		card.interval = 1;
		addExp(1, card.cat);
	}

	card.nextReview = Date.now() + card.interval * 86400000;
	addGold(1);

	reviewState.showBack = false;
	reviewState.currentIndex++;
	if (reviewState.currentIndex >= state.reviewDeck.length) {
		reviewState.currentIndex = 0;
		showToast('復習デッキ完了! 素晴らしい!', 'gold');
	}

	saveState();
	renderReview();
}

// ========== SETTINGS TAB ==========

function initSettings() {
	var btnExport = document.getElementById('btn-export');
	var btnImport = document.getElementById('btn-import');
	var importFile = document.getElementById('import-file');
	var btnReset = document.getElementById('btn-reset');

	if (btnExport) {
		btnExport.addEventListener('click', function () {
			try {
				var data = JSON.stringify(state, null, 2);
				var blob = new Blob([data], { type: 'application/json' });
				var url = URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download =
					'linguaquest_save_' + new Date().toISOString().slice(0, 10) + '.json';
				a.click();
				URL.revokeObjectURL(url);
				showToast('データをエクスポートしました', '');
			} catch (e) {
				showToast('エクスポートに失敗しました', 'error');
				console.error('Export error:', e);
			}
		});
	}

	if (btnImport && importFile) {
		btnImport.addEventListener('click', function () {
			importFile.click();
		});
		importFile.addEventListener('change', function (e) {
			var file = e.target.files[0];
			if (!file) return;
			var reader = new FileReader();
			reader.onload = function (ev) {
				try {
					var imported = JSON.parse(ev.target.result);
					state = Object.assign(deepClone(DEFAULT_STATE), imported);
					saveState();
					updateHUD();
					showToast('データをインポートしました', 'gold');
					showTab('home');
				} catch (err) {
					showToast(
						'インポートに失敗しました。ファイルを確認してください',
						'error',
					);
					console.error('Import error:', err);
				}
			};
			reader.readAsText(file);
			importFile.value = '';
		});
	}

	if (btnReset) {
		btnReset.addEventListener('click', function () {
			if (confirm('全データをリセットしますか？この操作は元に戻せません。')) {
				localStorage.removeItem('lq_state');
				localStorage.removeItem('lq_ai_settings');
				var keys = [];
				for (var i = 0; i < localStorage.length; i++) {
					var k = localStorage.key(i);
					if (k && k.indexOf('lq_') === 0) keys.push(k);
				}
				for (var i = 0; i < keys.length; i++) {
					localStorage.removeItem(keys[i]);
				}
				state = deepClone(DEFAULT_STATE);
				saveState();
				updateHUD();
				showToast('全データをリセットしました', '');
				showTab('home');
			}
		});
	}
}
/* ============================================
   LinguaQuest - app.js
   Part 3/3: AI Tutor + Initialization
   ============================================ */

// ========== AI TUTOR MODULE ==========

var AI_TUTOR = (function () {
	var defaultLangs = [
		{
			code: 'en',
			name: '英語',
			flag: '\uD83C\uDDEC\uD83C\uDDE7',
			removable: false,
		},
		{
			code: 'yue',
			name: '広東語',
			flag: '\uD83C\uDDED\uD83C\uDDF0',
			removable: false,
		},
		{
			code: 'ja',
			name: '日本語',
			flag: '\uD83C\uDDEF\uD83C\uDDF5',
			removable: false,
		},
		{
			code: 'it',
			name: 'イタリア語',
			flag: '\uD83C\uDDEE\uD83C\uDDF9',
			removable: false,
		},
	];

	var settings = {
		provider: 'gemini',
		geminiKey: '',
		geminiModel: 'gemini-2.5-flash',
		openrouterKey: '',
		openrouterModel: 'deepseek/deepseek-r1:free',
		openaiKey: '',
		openaiModel: 'gpt-4o',
		customEndpoint: '',
		customKey: '',
		customModel: 'default',
		languages: deepClone(defaultLangs),
	};

	var histories = {};
	var currentLang = 'en';
	var sidebarOpen = false;

	// --- Persistence ---

	function loadSettings() {
		try {
			var saved = localStorage.getItem('lq_ai_settings');
			if (saved) {
				var parsed = JSON.parse(saved);
				settings = Object.assign({}, settings, parsed);
				if (!settings.languages || settings.languages.length === 0) {
					settings.languages = deepClone(defaultLangs);
				}
			}
		} catch (e) {
			console.error('AI loadSettings error:', e);
		}
	}

	function saveSettings() {
		try {
			localStorage.setItem('lq_ai_settings', JSON.stringify(settings));
		} catch (e) {
			console.error('AI saveSettings error:', e);
		}
	}

	function loadHistory(lang) {
		try {
			var saved = localStorage.getItem('lq_ai_hist_' + lang);
			if (saved) {
				histories[lang] = JSON.parse(saved);
			} else {
				histories[lang] = [];
			}
		} catch (e) {
			console.error('AI loadHistory error:', e);
			histories[lang] = [];
		}
	}

	function saveHistory(lang) {
		try {
			var h = histories[lang] || [];
			if (h.length > 100) h = h.slice(h.length - 100);
			histories[lang] = h;
			localStorage.setItem('lq_ai_hist_' + lang, JSON.stringify(h));
		} catch (e) {
			console.error('AI saveHistory error:', e);
		}
	}

	// --- DOM Helpers ---

	function getEl(id) {
		return document.getElementById(id);
	}

	function appendMsg(role, text) {
		var area = getEl('ai-chat-messages');
		if (!area) return;
		var div = document.createElement('div');
		div.className = 'ai-msg ' + role;
		div.innerHTML = formatMsg(text);
		area.appendChild(div);
		area.scrollTop = area.scrollHeight;
	}

	function formatMsg(text) {
		if (!text) return '';
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\n/g, '<br>')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>');
	}

	function setStatus(msg) {
		var el = getEl('ai-status');
		if (el) el.textContent = msg;
	}

	function clearChat() {
		var area = getEl('ai-chat-messages');
		if (area) area.innerHTML = '';
	}

	// --- System Prompt ---

	function buildSystemPrompt(langCode) {
		var langName = langCode;
		for (var i = 0; i < settings.languages.length; i++) {
			if (settings.languages[i].code === langCode) {
				langName = settings.languages[i].name;
				break;
			}
		}

		var base =
			'あなたは「LinguaQuest」というRPG風言語学習アプリのAIチューターです。\n';
		base +=
			'ユーザーの主言語は日本語です。あなたは日本語で応答してください。\n';
		base +=
			'現在の学習対象言語は「' + langName + '」(' + langCode + ')です。\n';
		base += '以下のルールに従って学習をサポートしてください：\n';
		base +=
			'1. ユーザーが学習対象言語について質問したら、原文と日本語訳を併記してください。\n';
		base += '2. 間違いがあれば優しく訂正し、正しい表現を教えてください。\n';
		base += '3. 文法の説明は日本語で丁寧に行ってください。\n';
		base +=
			'4. 会話練習を求められたら、学習対象言語で会話し、必要に応じて日本語で補足してください。\n';
		base +=
			'5. RPGの世界観（冒険者、クエスト、スキルアップ等）を織り交ぜて楽しく教えてください。\n';
		base += '6. 回答は簡潔かつ実用的にしてください。\n';

		var extra = '';
		if (langCode === 'yue') {
			extra = '\n【広東語固有の補足】\n';
			extra +=
				'- 広東語（粤語）の場合、Jyutpingのローマ字表記と声調番号を併記してください。\n';
			extra += '- 例: 你好 (nei5 hou2) - こんにちは\n';
			extra +=
				'- 書き言葉（書面語）と話し言葉（口語）の違いがあれば注記してください。\n';
		} else if (langCode === 'en') {
			extra = '\n【英語固有の補足】\n';
			extra += '- 発音が難しい単語にはカタカナでの近似発音を添えてください。\n';
			extra += '- 例: through (スルー) - ～を通して\n';
			extra += '- イディオムやフレーズにはニュアンスの説明を加えてください。\n';
		} else if (langCode === 'ja') {
			extra = '\n【日本語固有の補足】\n';
			extra += '- 漢字にはふりがなを括弧内に併記してください。\n';
			extra += '- 例: 勉強(べんきょう) - study\n';
			extra +=
				'- 敬語（丁寧語・尊敬語・謙譲語）の使い分けを丁寧に解説してください。\n';
			extra +=
				'- 日本語が母語のユーザーが自国語を深く学ぶ前提で教えてください。\n';
		} else if (langCode === 'it') {
			extra = '\n【イタリア語固有の補足】\n';
			extra += '- 発音が難しい単語にはカタカナでの近似発音を添えてください。\n';
			extra += '- 例: buongiorno (ブオンジョルノ) - おはようございます\n';
			extra +=
				'- 動詞の活用（現在形・過去形・未来形等）は表形式で示すと分かりやすいです。\n';
			extra += '- 男性名詞/女性名詞の区別にも注意して説明してください。\n';
		}

		return base + extra;
	}

	// --- API Calls ---

	function callGemini(messages, callback) {
		var key = settings.geminiKey;
		var model = settings.geminiModel || 'gemini-2.5-flash';
		if (!key) {
			callback(
				'Gemini APIキーが設定されていません。設定画面でキーを入力してください。',
				true,
			);
			return;
		}

		var contents = [];
		for (var i = 0; i < messages.length; i++) {
			var m = messages[i];
			contents.push({
				role: m.role === 'assistant' ? 'model' : 'user',
				parts: [{ text: m.content }],
			});
		}

		var url =
			'https://generativelanguage.googleapis.com/v1beta/models/' +
			model +
			':generateContent?key=' +
			key;

		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: contents,
				generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
			}),
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				if (
					data.candidates &&
					data.candidates[0] &&
					data.candidates[0].content &&
					data.candidates[0].content.parts
				) {
					callback(data.candidates[0].content.parts[0].text, false);
				} else if (data.error) {
					callback(
						'Gemini API Error: ' +
							(data.error.message || JSON.stringify(data.error)),
						true,
					);
				} else {
					callback('Gemini: 予期しない応答形式です。', true);
				}
			})
			.catch(function (err) {
				callback('Gemini 接続エラー: ' + err.message, true);
			});
	}

	function callOpenRouter(messages, callback) {
		var key = settings.openrouterKey;
		var model = settings.openrouterModel || 'deepseek/deepseek-r1:free';
		if (!key) {
			callback('OpenRouter APIキーが設定されていません。', true);
			return;
		}

		var apiMessages = [];
		for (var i = 0; i < messages.length; i++) {
			apiMessages.push({
				role: messages[i].role,
				content: messages[i].content,
			});
		}

		fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + key,
				'HTTP-Referer': window.location.href,
				'X-Title': 'LinguaQuest',
			},
			body: JSON.stringify({
				model: model,
				messages: apiMessages,
				max_tokens: 1024,
				temperature: 0.7,
			}),
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				if (data.choices && data.choices[0] && data.choices[0].message) {
					callback(data.choices[0].message.content, false);
				} else if (data.error) {
					callback(
						'OpenRouter Error: ' +
							(data.error.message || JSON.stringify(data.error)),
						true,
					);
				} else {
					callback('OpenRouter: 予期しない応答形式です。', true);
				}
			})
			.catch(function (err) {
				callback('OpenRouter 接続エラー: ' + err.message, true);
			});
	}

	function callOpenAI(messages, callback) {
		var key = settings.openaiKey;
		var model = settings.openaiModel || 'gpt-4o';
		if (!key) {
			callback('OpenAI APIキーが設定されていません。', true);
			return;
		}

		var apiMessages = [];
		for (var i = 0; i < messages.length; i++) {
			apiMessages.push({
				role: messages[i].role,
				content: messages[i].content,
			});
		}

		fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + key,
			},
			body: JSON.stringify({
				model: model,
				messages: apiMessages,
				max_tokens: 1024,
				temperature: 0.7,
			}),
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				if (data.choices && data.choices[0] && data.choices[0].message) {
					callback(data.choices[0].message.content, false);
				} else if (data.error) {
					callback(
						'OpenAI Error: ' +
							(data.error.message || JSON.stringify(data.error)),
						true,
					);
				} else {
					callback('OpenAI: 予期しない応答形式です。', true);
				}
			})
			.catch(function (err) {
				callback('OpenAI 接続エラー: ' + err.message, true);
			});
	}

	function callCustom(messages, callback) {
		var ep = settings.customEndpoint;
		var key = settings.customKey;
		var model = settings.customModel || 'default';
		if (!ep) {
			callback('カスタムエンドポイントが設定されていません。', true);
			return;
		}

		var apiMessages = [];
		for (var i = 0; i < messages.length; i++) {
			apiMessages.push({
				role: messages[i].role,
				content: messages[i].content,
			});
		}

		var headers = { 'Content-Type': 'application/json' };
		if (key) headers['Authorization'] = 'Bearer ' + key;

		fetch(ep + '/chat/completions', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				model: model,
				messages: apiMessages,
				max_tokens: 1024,
				temperature: 0.7,
			}),
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				if (data.choices && data.choices[0] && data.choices[0].message) {
					callback(data.choices[0].message.content, false);
				} else if (data.error) {
					callback(
						'Custom API Error: ' +
							(data.error.message || JSON.stringify(data.error)),
						true,
					);
				} else {
					callback('Custom: 予期しない応答形式です。', true);
				}
			})
			.catch(function (err) {
				callback('Custom API 接続エラー: ' + err.message, true);
			});
	}

	// --- Send Message ---

	function sendMessage() {
		var input = getEl('ai-input');
		if (!input) return;

		var text = input.value.trim();
		if (!text) return;

		input.value = '';

		if (!histories[currentLang]) histories[currentLang] = [];
		histories[currentLang].push({ role: 'user', content: text });
		appendMsg('user', text);

		setStatus('考え中...');

		var sysPrompt = buildSystemPrompt(currentLang);
		var contextMessages = [];
		contextMessages.push({ role: 'user', content: sysPrompt });
		contextMessages.push({
			role: 'assistant',
			content:
				'了解しました。' +
				currentLang +
				'の学習をサポートします。何でも聞いてください！',
		});

		var hist = histories[currentLang];
		var start = Math.max(0, hist.length - 20);
		for (var i = start; i < hist.length; i++) {
			contextMessages.push(hist[i]);
		}

		function onResponse(reply, isError) {
			setStatus('');
			if (isError) {
				appendMsg('system', reply);
			} else {
				histories[currentLang].push({ role: 'assistant', content: reply });
				appendMsg('assistant', reply);
				saveHistory(currentLang);

				// Reward
				addExp(5, 'speaking');
				addGold(1);
				state.totalSessions++;
				saveState();
			}
		}

		var provider = settings.provider;
		if (provider === 'gemini') {
			callGemini(contextMessages, onResponse);
		} else if (provider === 'openrouter') {
			callOpenRouter(contextMessages, onResponse);
		} else if (provider === 'openai') {
			callOpenAI(contextMessages, onResponse);
		} else if (provider === 'custom') {
			callCustom(contextMessages, onResponse);
		} else {
			onResponse('不明なプロバイダです: ' + provider, true);
		}
	}

	// --- Test Connection ---

	function testConnection() {
		setStatus('接続テスト中...');
		var testMessages = [
			{
				role: 'user',
				content: 'テスト接続です。「接続成功」と返答してください。',
			},
		];

		function onTest(reply, isError) {
			if (isError) {
				setStatus('接続失敗');
				showToast('接続テスト失敗: ' + reply, 'error');
			} else {
				setStatus('接続成功!');
				showToast('接続テスト成功!', 'gold');
			}
		}

		var provider = settings.provider;
		if (provider === 'gemini') callGemini(testMessages, onTest);
		else if (provider === 'openrouter') callOpenRouter(testMessages, onTest);
		else if (provider === 'openai') callOpenAI(testMessages, onTest);
		else if (provider === 'custom') callCustom(testMessages, onTest);
		else onTest('不明なプロバイダです', true);
	}

	// --- Language Management ---

	function switchLang(code) {
		currentLang = code;
		if (!histories[currentLang]) loadHistory(currentLang);
		clearChat();

		// Show welcome message
		var langName = code;
		for (var i = 0; i < settings.languages.length; i++) {
			if (settings.languages[i].code === code) {
				langName =
					settings.languages[i].flag + ' ' + settings.languages[i].name;
				break;
			}
		}
		appendMsg(
			'system',
			langName + ' モードに切り替えました。学習を始めましょう！',
		);

		// Restore history
		var hist = histories[currentLang] || [];
		for (var i = 0; i < hist.length; i++) {
			appendMsg(hist[i].role, hist[i].content);
		}

		setStatus('');
	}

	function addLang(code, name) {
		if (!code || !name) return false;
		code = code.trim().toLowerCase();
		name = name.trim();
		for (var i = 0; i < settings.languages.length; i++) {
			if (settings.languages[i].code === code) return false;
		}
		settings.languages.push({
			code: code,
			name: name,
			flag: '\uD83C\uDDF3\uD83C\uDDFA',
			removable: true,
		});
		saveSettings();
		return true;
	}

	function removeLang(code) {
		for (var i = 0; i < settings.languages.length; i++) {
			if (
				settings.languages[i].code === code &&
				settings.languages[i].removable
			) {
				settings.languages.splice(i, 1);
				if (currentLang === code) {
					currentLang = settings.languages[0].code;
				}
				localStorage.removeItem('lq_ai_hist_' + code);
				delete histories[code];
				saveSettings();
				return true;
			}
		}
		return false;
	}

	// --- Sidebar Toggle ---

	function toggleSidebar() {
		var sb = getEl('ai-sidebar');
		if (!sb) return;
		sidebarOpen = !sidebarOpen;
		if (sidebarOpen) {
			sb.classList.add('open');
		} else {
			sb.classList.remove('open');
		}
	}

	// --- Settings UI ---

	function openSettings() {
		var overlay = getEl('ai-settings-overlay');
		if (overlay) overlay.classList.add('open');
		populateSettingsForm();
	}

	function closeSettings() {
		var overlay = getEl('ai-settings-overlay');
		if (overlay) overlay.classList.remove('open');
	}

	function populateSettingsForm() {
		var provSel = getEl('ai-provider-select');
		if (provSel) provSel.value = settings.provider;

		var fields = {
			'ai-gemini-key': 'geminiKey',
			'ai-gemini-model': 'geminiModel',
			'ai-openrouter-key': 'openrouterKey',
			'ai-openrouter-model': 'openrouterModel',
			'ai-openai-key': 'openaiKey',
			'ai-openai-model': 'openaiModel',
			'ai-custom-endpoint': 'customEndpoint',
			'ai-custom-key': 'customKey',
			'ai-custom-model': 'customModel',
		};

		var keys = Object.keys(fields);
		for (var i = 0; i < keys.length; i++) {
			var el = getEl(keys[i]);
			if (el) el.value = settings[fields[keys[i]]] || '';
		}

		updateProviderVisibility();
		renderLangList();
	}

	function updateProviderVisibility() {
		var prov = settings.provider;
		var groups = {
			gemini: ['fg-gemini-key', 'fg-gemini-model'],
			openrouter: ['fg-openrouter-key', 'fg-openrouter-model'],
			openai: ['fg-openai-key', 'fg-openai-model'],
			custom: ['fg-custom-ep', 'fg-custom-key', 'fg-custom-model'],
		};

		var allIds = [];
		var gKeys = Object.keys(groups);
		for (var i = 0; i < gKeys.length; i++) {
			allIds = allIds.concat(groups[gKeys[i]]);
		}

		for (var i = 0; i < allIds.length; i++) {
			var el = getEl(allIds[i]);
			if (el) el.style.display = 'none';
		}

		if (groups[prov]) {
			for (var i = 0; i < groups[prov].length; i++) {
				var el = getEl(groups[prov][i]);
				if (el) el.style.display = 'block';
			}
		}
	}

	function saveSettingsFromForm() {
		var provSel = getEl('ai-provider-select');
		if (provSel) settings.provider = provSel.value;

		var fields = {
			'ai-gemini-key': 'geminiKey',
			'ai-gemini-model': 'geminiModel',
			'ai-openrouter-key': 'openrouterKey',
			'ai-openrouter-model': 'openrouterModel',
			'ai-openai-key': 'openaiKey',
			'ai-openai-model': 'openaiModel',
			'ai-custom-endpoint': 'customEndpoint',
			'ai-custom-key': 'customKey',
			'ai-custom-model': 'customModel',
		};

		var keys = Object.keys(fields);
		for (var i = 0; i < keys.length; i++) {
			var el = getEl(keys[i]);
			if (el) settings[fields[keys[i]]] = el.value.trim();
		}

		saveSettings();
		showToast('設定を保存しました', 'gold');
		closeSettings();
	}

	function renderLangList() {
		var container = getEl('ai-lang-manager');
		if (!container) return;
		var html = '';
		for (var i = 0; i < settings.languages.length; i++) {
			var l = settings.languages[i];
			html += '<span class="lang-tag">';
			html += l.flag + ' ' + l.name + ' (' + l.code + ')';
			if (l.removable) {
				html +=
					' <button class="lang-remove" data-code="' + l.code + '">✕</button>';
			}
			html += '</span>';
		}
		container.innerHTML = html;

		var removeBtns = container.querySelectorAll('.lang-remove');
		for (var i = 0; i < removeBtns.length; i++) {
			removeBtns[i].addEventListener('click', function () {
				var code = this.getAttribute('data-code');
				if (confirm(code + ' を削除しますか？履歴も削除されます。')) {
					removeLang(code);
					renderLangList();
					populateLangSelect();
				}
			});
		}
	}

	function populateLangSelect() {
		var sel = getEl('ai-lang-select');
		if (!sel) return;
		sel.innerHTML = '';
		for (var i = 0; i < settings.languages.length; i++) {
			var l = settings.languages[i];
			var opt = document.createElement('option');
			opt.value = l.code;
			opt.textContent = l.flag + ' ' + l.name;
			if (l.code === currentLang) opt.selected = true;
			sel.appendChild(opt);
		}
	}

	// --- Initialize ---

	function init() {
		loadSettings();

		// Ensure default langs exist
		for (var d = 0; d < defaultLangs.length; d++) {
			var found = false;
			for (var s = 0; s < settings.languages.length; s++) {
				if (settings.languages[s].code === defaultLangs[d].code) {
					found = true;
					break;
				}
			}
			if (!found) {
				settings.languages.push(deepClone(defaultLangs[d]));
			}
		}
		saveSettings();

		currentLang = settings.languages[0].code;
		loadHistory(currentLang);
		populateLangSelect();

		// Sidebar toggle
		var toggleBtn = getEl('btn-ai-toggle');
		if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

		var closeBtn = getEl('btn-ai-close');
		if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);

		// Send
		var sendBtn = getEl('ai-send-btn');
		if (sendBtn) sendBtn.addEventListener('click', sendMessage);

		var inputEl = getEl('ai-input');
		if (inputEl) {
			inputEl.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault();
					sendMessage();
				}
			});
		}

		// Lang switch
		var langSel = getEl('ai-lang-select');
		if (langSel) {
			langSel.addEventListener('change', function () {
				switchLang(this.value);
			});
		}

		// Settings buttons
		var settingsBtn = getEl('btn-ai-settings');
		if (settingsBtn) settingsBtn.addEventListener('click', openSettings);

		var closeSettingsBtn = getEl('btn-close-ai-settings');
		if (closeSettingsBtn)
			closeSettingsBtn.addEventListener('click', closeSettings);

		var saveSettingsBtn = getEl('btn-save-ai-settings');
		if (saveSettingsBtn)
			saveSettingsBtn.addEventListener('click', saveSettingsFromForm);

		var testBtn = getEl('btn-test-ai');
		if (testBtn) testBtn.addEventListener('click', testConnection);

		// Provider change
		var provSel = getEl('ai-provider-select');
		if (provSel) {
			provSel.addEventListener('change', function () {
				settings.provider = this.value;
				updateProviderVisibility();
			});
		}

		// Add language
		var addLangBtn = getEl('btn-add-lang');
		if (addLangBtn) {
			addLangBtn.addEventListener('click', function () {
				var codeEl = getEl('ai-new-lang-code');
				var nameEl = getEl('ai-new-lang-name');
				if (!codeEl || !nameEl) return;
				var code = codeEl.value.trim();
				var name = nameEl.value.trim();
				if (!code || !name) {
					showToast('コードと名前を入力してください', 'error');
					return;
				}
				if (addLang(code, name)) {
					showToast(name + ' を追加しました', 'gold');
					codeEl.value = '';
					nameEl.value = '';
					renderLangList();
					populateLangSelect();
				} else {
					showToast('追加できません。コードが重複しています。', 'error');
				}
			});
		}

		// Show welcome
		var welcomeLang = settings.languages[0];
		if (welcomeLang) {
			appendMsg(
				'system',
				welcomeLang.flag +
					' ' +
					welcomeLang.name +
					' モードで起動しました。AIチューターに話しかけてみましょう！',
			);
		}

		// Restore history
		var hist = histories[currentLang] || [];
		for (var i = 0; i < hist.length; i++) {
			appendMsg(hist[i].role, hist[i].content);
		}

		console.log(
			'✅ AI Tutor initialized:',
			settings.languages.length,
			'languages',
		);
	}

	return {
		init: init,
		toggleSidebar: toggleSidebar,
		sendMessage: sendMessage,
		switchLang: switchLang,
		testConnection: testConnection,
	};
})();

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', function () {
	// Load state
	loadState();
	updateHUD();
	updateClock();
	setInterval(updateClock, 30000);

	// Particles
	initParticles();

	// Navigation
	initNavigation();

	// Settings
	initSettings();

	// Streak check
	(function checkStreak() {
		var today = new Date().toISOString().slice(0, 10);
		if (state.lastStudy) {
			var last = new Date(state.lastStudy);
			var diff = Math.floor((new Date(today) - last) / 86400000);
			if (diff === 1) {
				state.streak++;
				showToast('連続 ' + state.streak + ' 日目! 素晴らしい!', 'gold');
			} else if (diff > 1) {
				state.streak = 1;
			}
		} else {
			state.streak = 1;
		}
		state.lastStudy = today;
		saveState();
	})();

	// AI Tutor
	AI_TUTOR.init();

	// Show home tab
	showTab('home');

	console.log('✅ LinguaQuest ready! v' + state.version);
});
