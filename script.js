// ============================================================
// LinguaQuest app.js — Complete (compressed data)
// ============================================================

// === ANCESTRIES (30) ===
const A_ = [
	[
		'human',
		'Human/ヒューマン',
		'万能種族',
		'👤',
		'Core',
		[
			['versatile', 'Versatile/万能型', '全EXP+3%'],
			['skilled', 'Skilled/技巧型', 'Vocabコスト-1'],
			['ambitious', 'Ambitious/野心型', 'LVアップ結晶+2'],
		],
	],
	[
		'elf',
		'Elf/エルフ',
		'文法と読解に才能',
		'🧝',
		'Core',
		[
			['ancient', 'Ancient Elf/古代', 'Grammarコスト-2'],
			['woodland', 'Woodland/森', 'Listening+5%'],
			['cavern', 'Cavern/洞窟', '復習間隔+0.5日'],
			['seer', 'Seer/予見', 'イベント報酬+20%'],
		],
	],
	[
		'dwarf',
		'Dwarf/ドワーフ',
		'継続学習に強い',
		'⛏️',
		'Core',
		[
			['forge', 'Forge/炉', 'ストリークEXP+10%'],
			['strong', 'Strong-Blooded/強血', 'ポモドーロEXP+5%'],
			['rock', 'Rock/岩', 'Writingコスト-1'],
		],
	],
	[
		'gnome',
		'Gnome/ノーム',
		'好奇心旺盛',
		'🍄',
		'Core',
		[
			['fey', 'Fey-Touched/妖精', '新単語EXP+3'],
			['sensate', 'Sensate/感覚', '画像記憶+10%'],
			['umbral', 'Umbral/影', '夜間EXP+8%'],
			['wellspring', 'Wellspring/泉', '結晶+10%'],
		],
	],
	[
		'halfling',
		'Halfling/ハーフリング',
		'幸運と機転',
		'🦶',
		'Core',
		[
			['gutsy', 'Gutsy/度胸', 'ボスEXP+15%'],
			['hillock', 'Hillock/丘', 'Quick EXP+10%'],
			['nomadic', 'Nomadic/放浪', '多言語+20%'],
		],
	],
	[
		'goblin',
		'Goblin/ゴブリン',
		'素早い学習者',
		'👺',
		'Core',
		[
			['charhide', 'Charhide/焦皮', '連続正解+12%'],
			['irongut', 'Irongut/鉄腹', 'ストリーク保護1日'],
			['razortooth', 'Razortooth/剃刀', 'Speaking+5%'],
			['unbreakable', 'Unbreakable/不壊', '全コスト-1'],
		],
	],
	[
		'orc',
		'Orc/オーク',
		'困難なノードに挑む',
		'💪',
		'Core',
		[
			['badlands', 'Badlands/荒野', '★4+EXP+10%'],
			['hold', 'Hold-Scarred/傷痕', '失敗ペナ半減'],
			['rainfall', 'Rainfall/雨', 'Listeningコスト-2'],
		],
	],
	[
		'leshy',
		'Leshy/レシー',
		'着実に成長',
		'🌿',
		'Core',
		[
			['fungus', 'Fungus/菌糸', '復習間隔+1日'],
			['leaf', 'Leaf/葉', '朝学習EXP+8%'],
			['vine', 'Vine/蔓', '隣接ノード割引'],
		],
	],
	[
		'kobold',
		'Kobold/コボルド',
		'効率的パス発見',
		'🐉',
		'Uncommon',
		[
			['caveclimber', 'Caveclimber/洞窟', '隠しルート+15%'],
			['dragonscaled', 'Dragonscaled/竜鱗', '属性EXP+8%'],
			['tunnelflood', 'Tunnelflood/洪水', '3ノード同時で結晶+3'],
		],
	],
	[
		'catfolk',
		'Catfolk/キャットフォーク',
		'反射神経優秀',
		'🐱',
		'Uncommon',
		[
			['clawed', 'Clawed/爪', 'FC速度+5%'],
			['hunting', 'Hunting/狩猟', 'Listening+7%'],
			['ninelives', 'Nine Lives/九命', '失敗2回無効'],
		],
	],
	[
		'tengu',
		'Tengu/テング',
		'発音と語彙に才能',
		'🐦‍⬛',
		'Uncommon',
		[
			['jinxed', 'Jinxed/呪われ', 'イベント+20%'],
			['mountainkeeper', 'Mountainkeeper/山守', 'Speaking+7%'],
			['skyborn', 'Skyborn/空生まれ', 'Vocab+8%'],
			['stormtossed', 'Stormtossed/嵐', 'ボス報酬+25%'],
		],
	],
	[
		'kitsune',
		'Kitsune/キツネ',
		'多言語切替得意',
		'🦊',
		'Uncommon',
		[
			['celestial', 'Celestial/天使い', '切替EXP+5'],
			['dark_k', 'Dark Fields/闇野', '夜間+10%'],
			['earthly', 'Earthly/地の野', '復習+5%'],
			['frozen', 'Frozen Wind/凍風', '7日連続+5%'],
		],
	],
	[
		'ratfolk',
		'Ratfolk/ラットフォーク',
		'単語関連付け',
		'🐀',
		'Uncommon',
		[
			['deeprat', 'Deep Rat/深淵', 'グループ+3/語'],
			['longsnout', 'Longsnout/長鼻', 'CSV+10%'],
			['sewer', 'Sewer/下水', '全コスト-1'],
		],
	],
	[
		'fetchling',
		'Fetchling/フェッチリング',
		'文法パターン発見',
		'🌑',
		'Uncommon',
		[
			['bright', 'Bright/輝影', 'Grammar+8%'],
			['deep_f', 'Deep/深影', '★5コスト-3'],
			['liminal', 'Liminal/境界', '共通ノード+10%'],
		],
	],
	[
		'automaton',
		'Automaton/オートマトン',
		'反復学習の達人',
		'🤖',
		'Uncommon',
		[
			['hunter_auto', 'Hunter/狩猟', 'ポモドーロ連続+8%'],
			['mage_auto', 'Mage/魔導', '可視範囲+1'],
			['warrior_auto', 'Warrior/戦士', 'ボス難易度軽減'],
		],
	],
	[
		'poppet',
		'Poppet/ポペット',
		'記憶力抜群',
		'🧸',
		'Uncommon',
		[
			['ghost_p', 'Ghost/幽霊', '忘却曲線-10%'],
			['royal', 'Royal/王族', '称号時結晶+5'],
			['stuffed', 'Stuffed/ぬいぐるみ', '休憩後+5%'],
		],
	],
	[
		'sprite',
		'Sprite/スプライト',
		'素早いセッション向き',
		'✨',
		'Uncommon',
		[
			['draxie', 'Draxie', 'Quick+15%'],
			['grig', 'Grig/グリグ', '音楽記憶+5%'],
			['luminous', 'Luminous/光', '演出+EXP+3%'],
			['pixie', 'Pixie/ピクシー', 'ボーナスイベント+15%'],
		],
	],
	[
		'strix',
		'Strix/ストリクス',
		'夜行種族',
		'🦅',
		'Rare',
		[
			['nightglider', 'Nightglider/夜滑空', '夜間+12%'],
			['predator', 'Predator/捕食者', '5連続でEXP2倍'],
			['scavenger', 'Scavenger/屍食い', '宝箱報酬2倍'],
		],
	],
	[
		'grippli',
		'Grippli/グリプリ',
		'粘り強い反復',
		'🐸',
		'Rare',
		[
			['poisonhide', 'Poisonhide/毒皮', 'Hard+15%'],
			['snaptongue', 'Snaptongue/弾舌', '発音+8%'],
			['windweb', 'Windweb/風糸', 'Writing+7%'],
		],
	],
	[
		'azarketi',
		'Azarketi/アザルケティ',
		'リスニング抜群',
		'🌊',
		'Rare',
		[
			['benthic', 'Benthic/深海', '長文Listening+10%'],
			['river', 'River/河川', '30分連続+8%'],
			['thalassic', 'Thalassic/外洋', 'Listeningコスト-2'],
		],
	],
	[
		'conrasu',
		'Conrasu/コンラス',
		'体系的学習',
		'🔮',
		'Rare',
		[
			['rite_know', 'Knowing/知の儀式', 'Grammar+10%'],
			['rite_light', 'Light/光の儀式', '全ノード可視'],
			['rite_passage', 'Passage/通過儀式', 'ボスクリア結晶+5'],
		],
	],
	[
		'fleshwarp',
		'Fleshwarp/フレッシュワープ',
		'枠を超える学習',
		'🧬',
		'Rare',
		[
			['created', 'Created/被造物', 'カスタム+5%'],
			['mutated', 'Mutated/突然変異', '20%でスキル1.5倍'],
			['shapewrought', 'Shapewrought/形鋳', 'Heritage変更可'],
		],
	],
	[
		'ganzi',
		'Ganzi/ガンジ',
		'予測不能ボーナス',
		'🎲',
		'Rare',
		[
			['keened', 'Keened/鋭敏', '正解時EXPランダム倍'],
			['mutable', 'Mutable/可変', '毎日ランダム+20%'],
			['offbalance', 'Offbalance/不均衡', '予想外接続10%'],
		],
	],
	[
		'ghoran',
		'Ghoran/ゴーラン',
		'知識の種を蒔く',
		'🌸',
		'Rare',
		[
			['enchanting', 'Enchanting/魅惑', '共有+10%'],
			['strong_oak', 'Strong Oak/強樫', '30日連続+10%'],
			['thorned', 'Thorned/棘', '失敗→成功+15%'],
		],
	],
	[
		'goloma',
		'Goloma/ゴロマ',
		'ミスを素早く修正',
		'👁️',
		'Rare',
		[
			['frightful', 'Frightful/恐怖', 'ミス検出+10%'],
			['insightful', 'Insightful/洞察', '復習最適化'],
			['vicious', 'Vicious/凶暴', 'ボス2連勝3倍'],
		],
	],
	[
		'kashrishi',
		'Kashrishi/カシリシ',
		'結晶の扱いに長ける',
		'💎',
		'Rare',
		[
			['athamasi', 'Athamasi', '結晶+20%'],
			['nascent', 'Nascent/新生', '新ノードEXP+5'],
			['trogloshi', 'Trogloshi', '暗記+8%'],
		],
	],
	[
		'nagaji',
		'Nagaji/ナガジ',
		'集中と忍耐',
		'🐍',
		'Rare',
		[
			['hooded', 'Hooded/冠蛇', '集中+10%'],
			['sacred', 'Sacred/聖蛇', '復習正解+5%'],
			['whipfang', 'Whipfang/鞭牙', 'Speaking速度+12%'],
		],
	],
	[
		'shisk',
		'Shisk/シスク',
		'知識の守護者',
		'📚',
		'Rare',
		[
			['lorekeeper', 'Lorekeeper/伝承', 'マスター間隔+50%'],
			['quillcoat', 'Quillcoat/針衣', 'Writing+10%'],
			['spellkeeper', 'Spellkeeper/呪文', 'Grammarコスト-2'],
		],
	],
	[
		'vanara',
		'Vanara/ヴァナラ',
		'俊敏な思考と模倣',
		'🐒',
		'Rare',
		[
			['bandaagee', 'Bandaagee', '模倣+10%'],
			['lahkgyan', 'Lahkgyan', '新手法+8%'],
			['wajaghand', 'Wajaghand', 'Vocab全+7%'],
		],
	],
	[
		'vishkanya',
		'Vishkanya/ヴィシュカニャ',
		'ニュアンスを捉える',
		'💜',
		'Rare',
		[
			['elusive', 'Elusive/逃げ水', 'イベント選択肢+1'],
			['old_venom', 'Old Venom/古毒', '難単語記憶+15%'],
			['prismatic', 'Prismatic/虹彩', '多言語切替+8%'],
		],
	],
	[
		'anadi',
		'Anadi/アナディ',
		'知識のネットワーク',
		'🕷️',
		'Rare',
		[
			['adaptive_a', 'Adaptive/適応', '種族変更可'],
			['snaring', 'Snaring/罠', '連続正解で指数EXP'],
			['venomous', 'Venomous/毒', '間違い優先+正解2倍'],
		],
	],
];
const ANCESTRIES = A_.map((a) => ({
	id: a[0],
	name: a[1],
	desc: a[2],
	icon: a[3],
	category: a[4],
	heritages: a[5].map((h) => ({ id: h[0], name: h[1], desc: h[2] })),
}));

// === CLASSES (23) ===
const C_ = [
	[
		'fighter',
		'Fighter/ファイター',
		'Speaking特化',
		'⚔️',
		'Martial',
		[
			['duelist', 'Duelist/決闘士', '会話+10%'],
			['shieldwall', 'Shieldwall/盾壁', '文法耐性+15%'],
			['weaponmaster', 'Weapon Master/武器', 'Speakingコスト-3'],
		],
		{ speaking: -2, vocab: 0, grammar: 1, listening: 0, writing: 1 },
	],
	[
		'rogue',
		'Rogue/ローグ',
		'効率の達人',
		'🗡️',
		'Martial',
		[
			['thief', 'Thief/盗賊', 'EXP5%吸収'],
			['mastermind', 'Mastermind/策士', '計画+8%'],
			['scoundrel', 'Scoundrel/悪漢', 'ボス弱点+20%'],
		],
		{ speaking: 0, vocab: -1, grammar: 0, listening: 0, writing: -1 },
	],
	[
		'ranger',
		'Ranger/レンジャー',
		'Listening特化',
		'🏹',
		'Martial',
		[
			['hunter_r', 'Hunter/狩人', 'Listening+12%'],
			['outwit', 'Outwit/知恵', 'イベント正解+15%'],
			['precision', 'Precision/精密', '発音+10%'],
		],
		{ speaking: 0, vocab: 0, grammar: 1, listening: -3, writing: 1 },
	],
	[
		'barbarian',
		'Barbarian/バーバリアン',
		'短期集中の王',
		'🪓',
		'Martial',
		[
			['fury', 'Fury/激怒', 'Quick+20%'],
			['giant', 'Giant/巨人', 'EXP上限+50%'],
			['spirit_b', 'Spirit/精霊', '怒りゲージ蓄積'],
		],
		{ speaking: -1, vocab: 0, grammar: 2, listening: 0, writing: 1 },
	],
	[
		'monk',
		'Monk/モンク',
		'規律正しい反復',
		'👊',
		'Martial',
		[
			['crane', 'Crane/鶴', '復習+12%'],
			['mountain', 'Mountain/山', 'ストリーク2倍'],
			['tiger', 'Tiger/虎', 'Speaking連続+15%'],
		],
		{ speaking: 0, vocab: 1, grammar: 0, listening: 0, writing: -2 },
	],
	[
		'champion',
		'Champion/チャンピオン',
		'学習の守護者',
		'🛡️',
		'Martial',
		[
			['paladin', 'Paladin', 'ログイン+10EXP'],
			['liberator', 'Liberator/解放', 'ロックコスト-2'],
			['redeemer', 'Redeemer/贖い', 'Again次回2倍'],
		],
		{ speaking: 0, vocab: 0, grammar: -1, listening: 0, writing: -1 },
	],
	[
		'swashbuckler',
		'Swashbuckler/スワッシュバックラー',
		'華麗なる剣士',
		'🤺',
		'Martial',
		[
			['braggart', 'Braggart/自慢', 'スタイルP→EXP'],
			['fencer', 'Fencer/フェンサー', '速答+15%'],
			['gymnast', 'Gymnast/体操', '切替速度+8%'],
		],
		{ speaking: -2, vocab: 1, grammar: 1, listening: 0, writing: 0 },
	],
	[
		'gunslinger',
		'Gunslinger/ガンスリンガー',
		'一撃必中',
		'🔫',
		'Martial',
		[
			['drifter', 'Drifter/流れ者', '多言語同時+10%'],
			['sniper', 'Sniper/狙撃', 'ノーヒント3倍'],
			['vanguard', 'Vanguard/前衛', '最速解放+5'],
		],
		{ speaking: 0, vocab: -2, grammar: 0, listening: 1, writing: 0 },
	],
	[
		'wizard',
		'Wizard/ウィザード',
		'Grammar体系理解',
		'🧙',
		'Caster',
		[
			['abjuration', 'Abjuration/防護', '忘却-15%'],
			['evocation', 'Evocation/力術', 'Grammar+15%'],
			['divination', 'Divination/占術', '最適復習予測'],
			['universalist', 'Universalist/万能', '全+5%'],
		],
		{ speaking: 1, vocab: 0, grammar: -3, listening: 1, writing: 0 },
	],
	[
		'cleric',
		'Cleric/クレリック',
		'復習と記憶定着',
		'⛪',
		'Caster',
		[
			['healing', 'Healing/癒し', '忘れかけ+20%'],
			['harmful', 'Harmful/害', '特訓+15%'],
			['warpriest', 'Warpriest/戦神官', '複合+10%'],
		],
		{ speaking: 0, vocab: -1, grammar: 0, listening: 0, writing: -1 },
	],
	[
		'bard',
		'Bard/バード',
		'Listening&Speaking二刀流',
		'🎵',
		'Caster',
		[
			['maestro', 'Maestro', '音声全+12%'],
			['polymath', 'Polymath/博学', '交互学習+8%'],
			['enigma', 'Enigma/謎', 'イベント報酬+30%'],
		],
		{ speaking: -1, vocab: 0, grammar: 0, listening: -1, writing: 1 },
	],
	[
		'sorcerer',
		'Sorcerer/ソーサラー',
		'直感的学習',
		'🔥',
		'Caster',
		[
			['draconic', 'Draconic/竜血', '広東語+15%'],
			['imperial', 'Imperial/帝血', '英語+15%'],
			['fey_s', 'Fey/妖精血', '宝箱+25%'],
			['divine_s', 'Divine/神血', '復習連続+10%'],
		],
		{ speaking: 0, vocab: 0, grammar: 0, listening: -1, writing: -1 },
	],
	[
		'druid',
		'Druid/ドルイド',
		'バランス型成長',
		'🌙',
		'Caster',
		[
			['storm', 'Storm/嵐', '集中+12%'],
			['wild', 'Wild/野生', '3秒以内+20%'],
			['leaf_d', 'Leaf/葉', 'Vocab全+8%'],
		],
		{ speaking: 0, vocab: -1, grammar: -1, listening: 0, writing: 0 },
	],
	[
		'witch',
		'Witch/ウィッチ',
		'予測不能な効果',
		'🧹',
		'Caster',
		[
			['curse', 'Curse/呪い', '間違い+25%'],
			['hex', 'Lesson/教訓', '開始時バフ'],
			['familiar', 'Familiar/使い魔', '1時間+1結晶'],
		],
		{ speaking: 0, vocab: 0, grammar: -2, listening: 0, writing: 0 },
	],
	[
		'oracle',
		'Oracle/オラクル',
		'代償と引き換えに強力',
		'🔮',
		'Caster',
		[
			['bones', 'Bones/骸骨', '忘却回収+30%'],
			['flames', 'Flames/炎', '全+10%間隔-10%'],
			['cosmos', 'Cosmos/宇宙', '隠しノード+25%'],
		],
		{ speaking: 0, vocab: 0, grammar: 0, listening: -2, writing: 0 },
	],
	[
		'alchemist',
		'Alchemist/アルケミスト',
		'知識の錬金術師',
		'⚗️',
		'Caster',
		[
			['bomber', 'Bomber/爆弾', '短期集中+18%'],
			['chirurgeon', 'Chirurgeon/外科', '弱点分析'],
			['mutagenist', 'Mutagenist/変異', '一時2倍(結晶3)'],
		],
		{ speaking: 0, vocab: -1, grammar: 0, listening: 0, writing: -1 },
	],
	[
		'investigator',
		'Investigator/インヴェスティゲーター',
		'文脈と推理',
		'🔍',
		'Hybrid',
		[
			['empiricism', 'Empiricism/経験', '文脈推測+20%'],
			['forensic', 'Forensic/法医', 'パターン分析'],
			['interrogation', 'Interrogation/尋問', '質問形式+12%'],
		],
		{ speaking: 0, vocab: 0, grammar: -1, listening: -1, writing: 0 },
	],
	[
		'magus',
		'Magus/メイガス',
		'Speaking+Grammar複合',
		'⚡',
		'Hybrid',
		[
			['laughing', 'Laughing Shadow/笑う影', '複合+15%'],
			['sparkling', 'Sparkling Targe/閃盾', '復習重視+10%'],
			['starlit', 'Starlit Span/星光', 'Listening+Reading+12%'],
		],
		{ speaking: -1, vocab: 0, grammar: -1, listening: 0, writing: 0 },
	],
	[
		'summoner',
		'Summoner/サモナー',
		'Vocab圧倒',
		'👻',
		'Hybrid',
		[
			['angel', 'Angel/天使', 'Vocab+15%間隔+20%'],
			['dragon_e', 'Dragon/竜', '広東語Vocab+20%'],
			['phantom', 'Phantom/幻影', '暗記全+12%'],
		],
		{ speaking: 1, vocab: -3, grammar: 0, listening: 0, writing: 1 },
	],
	[
		'inventor',
		'Inventor/インヴェンター',
		'ツールカスタマイズ',
		'🔧',
		'Hybrid',
		[
			['armor_i', 'Armor/防具', 'ストリーク保護+2'],
			['construct', 'Construct/構造体', '自動復習最適化'],
			['weapon_i', 'Weapon/武器', 'ノード効果+20%'],
		],
		{ speaking: 0, vocab: 0, grammar: 0, listening: -1, writing: -1 },
	],
	[
		'psychic',
		'Psychic/サイキック',
		'記憶術の達人',
		'🧠',
		'Hybrid',
		[
			['conscious', 'Conscious/意識', '記憶+12%'],
			['subconscious', 'Subconscious/無意識', 'パッシブ+15%'],
			['oscillating', 'Oscillating/振動波', 'EXP変動+10~30%'],
		],
		{ speaking: 0, vocab: -2, grammar: 0, listening: 0, writing: 0 },
	],
	[
		'thaumaturge',
		'Thaumaturge/サウマタージ',
		'隠された法則発見',
		'📿',
		'Hybrid',
		[
			['tome', 'Tome/書物', 'Reading+Writing+12%'],
			['chalice', 'Chalice/聖杯', '復習完了やる気回復'],
			['lantern', 'Lantern/灯火', '未発見照明'],
		],
		{ speaking: 0, vocab: 0, grammar: -1, listening: 0, writing: -1 },
	],
	[
		'kineticist',
		'Kineticist/キネティシスト',
		'属性ノードの達人',
		'🌀',
		'Hybrid',
		[
			['fire_g', 'Fire Gate/火門', '火+20%コスト-2'],
			['water_g', 'Water Gate/水門', '水+20%コスト-2'],
			['air_g', 'Air Gate/風門', '風+20%コスト-2'],
			['earth_g', 'Earth Gate/地門', '地+20%コスト-2'],
		],
		{ speaking: 0, vocab: 0, grammar: 0, listening: 0, writing: 0 },
	],
];
const CLASSES = C_.map((c) => ({
	id: c[0],
	name: c[1],
	desc: c[2],
	icon: c[3],
	category: c[4],
	subclasses: c[5].map((s) => ({ id: s[0], name: s[1], desc: s[2] })),
	synergy: c[6],
}));

// === TITLES ===
const TITLES = [
	{ minLv: 1, t: '見習い冒険者' },
	{ minLv: 5, t: '言葉の旅人' },
	{ minLv: 10, t: '知識の探索者' },
	{ minLv: 15, t: '文法の守護者' },
	{ minLv: 20, t: '語彙の魔術師' },
	{ minLv: 25, t: '多言語の使徒' },
	{ minLv: 30, t: '言霊の覚醒者' },
	{ minLv: 35, t: 'スフィアの支配者' },
	{ minLv: 40, t: '言語の賢者' },
	{ minLv: 50, t: '言霊の王' },
	{ minLv: 60, t: '次元を超えし者' },
	{ minLv: 80, t: '創世の言霊' },
	{ minLv: 99, t: '∞ 言語の彼方 ∞' },
];

// === APP CORE ===
const App = {
	SK: {
		log: 'lq_log',
		streak: 'lq_streak',
		best: 'lq_best',
		vocab: 'lq_vocab',
		exp: 'lq_exp',
		lv: 'lq_lv',
		cry: 'lq_cry',
		pts: 'lq_pts',
		char: 'lq_char',
		tree: 'lq_tree',
	},
	init() {
		const d = { exp: 0, lv: 1, cry: 10, pts: 5, streak: 0, best: 0 };
		for (const [k, v] of Object.entries(d))
			if (localStorage.getItem(this.SK[k]) === null)
				localStorage.setItem(this.SK[k], v);
		if (!localStorage.getItem(this.SK.log))
			localStorage.setItem(this.SK.log, '{}');
		if (!localStorage.getItem(this.SK.vocab))
			localStorage.setItem(this.SK.vocab, '[]');
		if (!localStorage.getItem(this.SK.char))
			localStorage.setItem(
				this.SK.char,
				JSON.stringify({
					ancestry: null,
					heritage: null,
					cls: null,
					subclass: null,
				}),
			);
		if (!localStorage.getItem(this.SK.tree))
			localStorage.setItem(this.SK.tree, '{}');
		this.startClocks();
		this.particles();
	},
	todayKey() {
		const d = new Date();
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	},
	getLog() {
		return JSON.parse(localStorage.getItem(this.SK.log) || '{}');
	},
	saveLog(l) {
		localStorage.setItem(this.SK.log, JSON.stringify(l));
	},
	logStudy(lang, mins) {
		const l = this.getLog(),
			k = this.todayKey();
		if (!l[k]) l[k] = { EN: 0, YUE: 0 };
		l[k][lang] = (l[k][lang] || 0) + mins;
		this.saveLog(l);
		this.updateStreak();
	},
	updateStreak() {
		const l = this.getLog(),
			today = this.todayKey();
		if (!l[today]) return;
		let s = 1,
			d = new Date();
		while (true) {
			d.setDate(d.getDate() - 1);
			const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
			if (l[k] && (l[k].EN > 0 || l[k].YUE > 0)) s++;
			else break;
		}
		localStorage.setItem(this.SK.streak, s);
		localStorage.setItem(this.SK.best, Math.max(s, this.getBest()));
	},
	getStreak() {
		return parseInt(localStorage.getItem(this.SK.streak)) || 0;
	},
	getBest() {
		return parseInt(localStorage.getItem(this.SK.best)) || 0;
	},
	getExp() {
		return parseInt(localStorage.getItem(this.SK.exp)) || 0;
	},
	getLv() {
		return parseInt(localStorage.getItem(this.SK.lv)) || 1;
	},
	getCry() {
		return parseInt(localStorage.getItem(this.SK.cry)) || 0;
	},
	getPts() {
		return parseInt(localStorage.getItem(this.SK.pts)) || 0;
	},
	expNeeded(lv) {
		return Math.floor(100 * Math.pow(1.15, lv - 1));
	},
	addExp(a) {
		let e = this.getExp() + a,
			l = this.getLv();
		while (e >= this.expNeeded(l)) {
			e -= this.expNeeded(l);
			l++;
			this.addCry(2);
			this.addPts(1);
		}
		localStorage.setItem(this.SK.exp, e);
		localStorage.setItem(this.SK.lv, l);
	},
	addCry(n) {
		localStorage.setItem(this.SK.cry, this.getCry() + n);
	},
	spendCry(n) {
		const c = this.getCry();
		if (c >= n) {
			localStorage.setItem(this.SK.cry, c - n);
			return true;
		}
		return false;
	},
	addPts(n) {
		localStorage.setItem(this.SK.pts, this.getPts() + n);
	},
	spendPts(n) {
		const p = this.getPts();
		if (p >= n) {
			localStorage.setItem(this.SK.pts, p - n);
			return true;
		}
		return false;
	},
	getVocab() {
		return JSON.parse(localStorage.getItem(this.SK.vocab) || '[]');
	},
	saveVocab(v) {
		localStorage.setItem(this.SK.vocab, JSON.stringify(v));
	},
	getChar() {
		return JSON.parse(localStorage.getItem(this.SK.char) || '{}');
	},
	saveChar(c) {
		localStorage.setItem(this.SK.char, JSON.stringify(c));
	},
	getTree() {
		return JSON.parse(localStorage.getItem(this.SK.tree) || '{}');
	},
	saveTree(t) {
		localStorage.setItem(this.SK.tree, JSON.stringify(t));
	},
	getTitle() {
		const lv = this.getLv();
		let t = TITLES[0].t;
		for (const e of TITLES) if (lv >= e.minLv) t = e.t;
		return t;
	},
	getClassSynergy() {
		const ch = this.getChar();
		const cls = CLASSES.find((c) => c.id === ch.cls);
		return cls
			? cls.synergy
			: { speaking: 0, vocab: 0, grammar: 0, listening: 0, writing: 0 };
	},
	startClocks() {
		const u = () => {
			const n = new Date();
			const f = (tz) =>
				n.toLocaleTimeString('en-GB', {
					timeZone: tz,
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				});
			document.getElementById('clock-tokyo').textContent = f('Asia/Tokyo');
			document.getElementById('clock-hk').textContent = f('Asia/Hong_Kong');
		};
		u();
		setInterval(u, 1000);
	},
	particles() {
		const c = document.getElementById('particles');
		for (let i = 0; i < 25; i++) {
			const p = document.createElement('div');
			p.className = 'particle';
			const s = Math.random() * 3 + 1;
			p.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 10}s;background:${['#d4a843', '#50e3a4', '#fbbf24', '#34d399'][Math.floor(Math.random() * 4)]}`;
			c.appendChild(p);
		}
	},
};

// === ROUTER ===
const Router = {
	pages: [
		'home',
		'timer',
		'calendar',
		'vocab',
		'review',
		'character',
		'sphere',
		'report',
	],
	go(page) {
		this.pages.forEach((p) => {
			document
				.getElementById('page-' + p)
				.classList.toggle('active', p === page);
		});
		document
			.querySelectorAll('.nav button')
			.forEach((b) => b.classList.toggle('active', b.dataset.page === page));
		const m = {
			home: () => HomePage.render(),
			timer: () => TimerApp.init(),
			calendar: () => CalendarApp.render(),
			vocab: () => VocabApp.render(),
			review: () => ReviewApp.init(),
			character: () => CharApp.render(),
			sphere: () => SphereGrid.init(),
			report: () => ReportApp.render(),
		};
		if (m[page]) m[page]();
	},
	init() {
		document
			.querySelectorAll('.nav button')
			.forEach((b) =>
				b.addEventListener('click', () => this.go(b.dataset.page)),
			);
	},
};

// === HOME ===
const HomePage = {
	render() {
		const lv = App.getLv(),
			exp = App.getExp(),
			need = App.expNeeded(lv),
			streak = App.getStreak(),
			best = App.getBest();
		const ch = App.getChar(),
			anc = ANCESTRIES.find((a) => a.id === ch.ancestry),
			cls = CLASSES.find((c) => c.id === ch.cls);
		document.getElementById('home-status').innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
        <div>
          <div style="font-size:1.3rem;font-weight:900;color:var(--accent)">こんにちは、冒険者</div>
          <div style="font-size:.78rem;color:var(--text2)">今日も言葉の冒険に出かけよう</div>
          <div style="font-size:.72rem;color:var(--text3);margin-top:4px">${anc ? anc.icon + ' ' + anc.name : '種族未選択'} ・ ${cls ? cls.icon + ' ' + cls.name : '職業未選択'}</div>
          <div style="font-size:.72rem;color:var(--gold);margin-top:2px">称号: ${App.getTitle()}</div>
        </div>
        <div style="text-align:center">
          <div style="font-family:var(--font2);font-size:2rem;font-weight:900;color:var(--gold)">${streak}</div>
          <div style="font-size:.68rem;color:var(--text3)">日連続 (Best: ${best})</div>
        </div>
      </div>
      <div style="margin-top:16px">
        <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text2)"><span>LV ${lv}</span><span>${exp}/${need} EXP</span></div>
        <div class="progress"><div class="progress-bar gold" style="width:${((exp / need) * 100).toFixed(1)}%"></div></div>
        <div style="display:flex;gap:16px;margin-top:8px;font-size:.75rem;color:var(--text2)"><span>💎 ${App.getCry()}</span><span>⭐ ${App.getPts()}</span></div>
      </div>`;
		const log = App.getLog(),
			today = App.todayKey(),
			td = log[today] || { EN: 0, YUE: 0 };
		document.getElementById('home-today').innerHTML =
			`<div class="stat-row"><div class="stat"><div class="stat-value">${td.EN || 0}</div><div class="stat-label">🇺🇸 English (分)</div></div><div class="stat"><div class="stat-value">${td.YUE || 0}</div><div class="stat-label">🇭🇰 廣東話 (分)</div></div></div>`;
		document.getElementById('home-schedule').innerHTML =
			`<div style="font-size:.82rem;color:var(--text2);line-height:2"><div>🔴 🇺🇸 English — Speaking + Writing</div><div>🔴 🇭🇰 廣東話 — 会話 + 声調練習</div><div>⬜ 🔄 復習 — フラッシュカード</div></div>`;
		const vocab = App.getVocab(),
			due = vocab.filter(
				(v) => v.next_review && new Date(v.next_review) <= new Date(),
			);
		document.getElementById('home-review-queue').innerHTML =
			due.length > 0
				? due
						.slice(0, 5)
						.map(
							(v) =>
								`<div class="vocab-item"><div class="vocab-info"><span class="vocab-word">${v.word}</span> <span class="vocab-meaning">${v.meaning_jp}</span></div></div>`,
						)
						.join('') +
					(due.length > 5
						? `<div style="font-size:.75rem;color:var(--text3);margin-top:8px">...他${due.length - 5}件</div>`
						: '')
				: '<div style="color:var(--text3);font-size:.82rem">復習待ちなし 🎉</div>';
	},
};

// === TIMER ===
const TimerApp = {
	mode: 'full',
	lang: 'EN',
	phases: [],
	phaseIdx: 0,
	seconds: 0,
	total: 0,
	running: false,
	paused: false,
	interval: null,
	init() {
		this.setupMode(this.mode);
		document.getElementById('timer-mode-full').onclick = () =>
			this.setupMode('full');
		document.getElementById('timer-mode-short').onclick = () =>
			this.setupMode('short');
		document.getElementById('timer-lang').onchange = (e) => {
			this.lang = e.target.value;
		};
		document.getElementById('timer-start').onclick = () => this.start();
		document.getElementById('timer-pause').onclick = () => this.togglePause();
		document.getElementById('timer-reset').onclick = () => this.reset();
	},
	setupMode(m) {
		this.mode = m;
		this.reset();
		this.phases =
			m === 'full'
				? [
						{ type: 'study', dur: 900 },
						{ type: 'rest', dur: 1800 },
						{ type: 'study', dur: 900 },
					]
				: [{ type: 'study', dur: 900 }];
		this.phaseIdx = 0;
		this.loadPhase();
		document.getElementById('timer-mode-full').className =
			'btn ' + (m === 'full' ? 'btn-primary' : 'btn-secondary') + ' btn-sm';
		document.getElementById('timer-mode-short').className =
			'btn ' + (m === 'short' ? 'btn-primary' : 'btn-secondary') + ' btn-sm';
		document.getElementById('timer-session-info').textContent =
			m === 'full' ? 'Full: 15分学習→30分休憩→15分学習' : 'Quick: 15分学習のみ';
	},
	loadPhase() {
		const p = this.phases[this.phaseIdx];
		this.seconds = p.dur;
		this.total = p.dur;
		this.updateDisplay();
		const fg = document.getElementById('timer-progress'),
			d = document.querySelector('.timer-display');
		if (p.type === 'rest') {
			fg.classList.add('rest');
			d.classList.add('rest');
		} else {
			fg.classList.remove('rest');
			d.classList.remove('rest');
		}
		document.getElementById('timer-label').textContent =
			p.type === 'study' ? '学習タイム ⚔️' : '休憩タイム ☕';
	},
	start() {
		if (this.running && !this.paused) return;
		this.running = true;
		this.paused = false;
		document.getElementById('timer-start').disabled = true;
		document.getElementById('timer-pause').disabled = false;
		this.interval = setInterval(() => this.tick(), 1000);
	},
	tick() {
		if (this.seconds <= 0) {
			this.phaseComplete();
			return;
		}
		this.seconds--;
		this.updateDisplay();
	},
	phaseComplete() {
		clearInterval(this.interval);
		const p = this.phases[this.phaseIdx];
		if (p.type === 'study') {
			App.logStudy(this.lang, 15);
			App.addExp(30);
			App.addCry(1);
			App.addPts(1);
		}
		this.phaseIdx++;
		if (this.phaseIdx < this.phases.length) {
			this.loadPhase();
			this.start();
		} else {
			this.running = false;
			document.getElementById('timer-start').disabled = false;
			document.getElementById('timer-pause').disabled = true;
			document.getElementById('timer-label').textContent = '完了！🎉';
		}
	},
	togglePause() {
		if (this.paused) {
			this.paused = false;
			this.interval = setInterval(() => this.tick(), 1000);
			document.getElementById('timer-pause').textContent = '⏸ PAUSE';
		} else {
			this.paused = true;
			clearInterval(this.interval);
			document.getElementById('timer-pause').textContent = '▶ RESUME';
		}
	},
	reset() {
		clearInterval(this.interval);
		this.running = false;
		this.paused = false;
		this.phaseIdx = 0;
		if (this.phases.length) this.loadPhase();
		document.getElementById('timer-start').disabled = false;
		document.getElementById('timer-pause').disabled = true;
		document.getElementById('timer-pause').textContent = '⏸ PAUSE';
	},
	updateDisplay() {
		const m = Math.floor(this.seconds / 60),
			s = this.seconds % 60;
		document.getElementById('timer-time').textContent =
			`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
		document.getElementById('timer-progress').style.strokeDashoffset =
			2 * Math.PI * 115 * (1 - this.seconds / this.total);
	},
};

// === CALENDAR ===
const CalendarApp = {
	year: new Date().getFullYear(),
	month: new Date().getMonth(),
	render() {
		this.drawCal();
		document.getElementById('cal-prev').onclick = () => {
			this.month--;
			if (this.month < 0) {
				this.month = 11;
				this.year--;
			}
			this.drawCal();
		};
		document.getElementById('cal-next').onclick = () => {
			this.month++;
			if (this.month > 11) {
				this.month = 0;
				this.year++;
			}
			this.drawCal();
		};
	},
	drawCal() {
		const mn = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		document.getElementById('cal-month').textContent =
			`${mn[this.month]} ${this.year}`;
		const g = document.getElementById('cal-grid');
		g.innerHTML = ['日', '月', '火', '水', '木', '金', '土']
			.map((d) => `<div class="cal-header">${d}</div>`)
			.join('');
		const first = new Date(this.year, this.month, 1).getDay(),
			days = new Date(this.year, this.month + 1, 0).getDate(),
			log = App.getLog(),
			today = App.todayKey();
		for (let i = 0; i < first; i++)
			g.innerHTML += `<div class="cal-cell empty"></div>`;
		for (let d = 1; d <= days; d++) {
			const k = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
				e = log[k],
				t = e ? (e.EN || 0) + (e.YUE || 0) : 0;
			let c = 'cal-cell';
			if (k === today) c += ' today';
			if (t > 30) c += ' studied-heavy';
			else if (t > 0) c += ' studied';
			g.innerHTML += `<div class="${c}" data-date="${k}">${d}</div>`;
		}
		g.querySelectorAll('.cal-cell[data-date]').forEach((c) =>
			c.addEventListener('click', () => this.showDetail(c.dataset.date)),
		);
		document.getElementById('cal-detail').innerHTML =
			'<div style="color:var(--text3);font-size:.82rem">日付をクリック</div>';
	},
	showDetail(date) {
		const log = App.getLog(),
			e = log[date] || { EN: 0, YUE: 0 };
		document.getElementById('cal-detail').innerHTML =
			`<div style="font-size:.85rem;color:var(--accent);font-weight:700;margin-bottom:8px">${date}</div><div style="font-size:.82rem;color:var(--text2)">🇺🇸 ${e.EN || 0}分 / 🇭🇰 ${e.YUE || 0}分 / 合計 ${(e.EN || 0) + (e.YUE || 0)}分</div>`;
	},
};

// === VOCAB ===
const VocabApp = {
	lang: 'EN',
	render() {
		this.drawList();
		document.querySelectorAll('#vocab-tabs button').forEach((b) =>
			b.addEventListener('click', () => {
				this.lang = b.dataset.lang;
				document
					.querySelectorAll('#vocab-tabs button')
					.forEach((x) => x.classList.remove('active'));
				b.classList.add('active');
				this.drawList();
			}),
		);
		document.getElementById('vocab-add-btn').onclick = () =>
			document.getElementById('vocab-modal').classList.add('show');
		document.getElementById('v-cancel').onclick = () =>
			document.getElementById('vocab-modal').classList.remove('show');
		document.getElementById('v-save').onclick = () => this.addWord();
		document.getElementById('vocab-csv-import').onclick = () =>
			document.getElementById('vocab-csv-file').click();
		document.getElementById('vocab-csv-file').onchange = (e) =>
			this.importCSV(e);
		document.getElementById('vocab-csv-export').onclick = () =>
			this.exportCSV();
	},
	drawList() {
		const v = App.getVocab().filter((w) => w.language === this.lang),
			list = document.getElementById('vocab-list');
		if (!v.length) {
			list.innerHTML =
				'<div class="vocab-empty">単語がありません。追加してみましょう！</div>';
			return;
		}
		list.innerHTML = v
			.map(
				(w) =>
					`<div class="vocab-item"><div class="vocab-info"><div class="vocab-word">${w.word}</div><div class="vocab-meaning">${w.meaning_jp}</div><div class="vocab-meta">${w.pronunciation || ''}</div></div><button class="btn btn-danger btn-sm" onclick="VocabApp.del('${w.id}')">✕</button></div>`,
			)
			.join('');
	},
	addWord() {
		const v = App.getVocab(),
			w = {
				id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
				language: document.getElementById('v-lang').value,
				word: document.getElementById('v-word').value.trim(),
				meaning_jp: document.getElementById('v-meaning').value.trim(),
				pronunciation: document.getElementById('v-pron').value.trim(),
				example: document.getElementById('v-example').value.trim(),
				date_added: new Date().toISOString(),
				next_review: new Date().toISOString(),
				interval_days: 1,
				ease_factor: 2.5,
				review_count: 0,
			};
		if (!w.word || !w.meaning_jp) return;
		v.push(w);
		App.saveVocab(v);
		App.addExp(3);
		document.getElementById('vocab-modal').classList.remove('show');
		['v-word', 'v-meaning', 'v-pron', 'v-example'].forEach(
			(id) => (document.getElementById(id).value = ''),
		);
		this.drawList();
	},
	del(id) {
		App.saveVocab(App.getVocab().filter((v) => v.id !== id));
		this.drawList();
	},
	importCSV(e) {
		const f = e.target.files[0];
		if (!f) return;
		const r = new FileReader();
		r.onload = (ev) => {
			const lines = ev.target.result.split('\n').filter((l) => l.trim()),
				v = App.getVocab();
			lines.forEach((line, i) => {
				if (i === 0 && line.toLowerCase().includes('word')) return;
				const p = line
					.split(',')
					.map((s) => (s || '').trim().replace(/^"|"$/g, ''));
				if (p[1] && p[2])
					v.push({
						id:
							Date.now().toString(36) +
							Math.random().toString(36).slice(2, 6) +
							i,
						language: p[0] || 'EN',
						word: p[1],
						meaning_jp: p[2],
						pronunciation: p[3] || '',
						example: p[4] || '',
						date_added: new Date().toISOString(),
						next_review: new Date().toISOString(),
						interval_days: 1,
						ease_factor: 2.5,
						review_count: 0,
					});
			});
			App.saveVocab(v);
			this.drawList();
		};
		r.readAsText(f);
		e.target.value = '';
	},
	exportCSV() {
		const v = App.getVocab().filter((w) => w.language === this.lang);
		let csv = 'language,word,meaning_jp,pronunciation,example\n';
		v.forEach(
			(w) =>
				(csv += `${w.language},"${w.word}","${w.meaning_jp}","${w.pronunciation || ''}","${w.example || ''}"\n`),
		);
		const b = new Blob([csv], { type: 'text/csv' }),
			a = document.createElement('a');
		a.href = URL.createObjectURL(b);
		a.download = `lq_${this.lang}.csv`;
		a.click();
	},
};

// === REVIEW (SM-2) ===
const ReviewApp = {
	queue: [],
	current: null,
	flipped: false,
	init() {
		document.getElementById('review-start').onclick = () => this.startReview();
		document.getElementById('flashcard').onclick = () => this.flip();
		document
			.querySelectorAll('#review-buttons button')
			.forEach((b) =>
				b.addEventListener('click', () =>
					this.score(parseInt(b.dataset.score)),
				),
			);
	},
	startReview() {
		const now = new Date();
		this.queue = App.getVocab().filter(
			(v) => v.next_review && new Date(v.next_review) <= now,
		);
		if (!this.queue.length) {
			document.getElementById('review-status').innerHTML =
				'<div style="color:var(--green);text-align:center;padding:40px">復習する単語なし 🎉</div>';
			return;
		}
		this.queue.sort(() => Math.random() - 0.5);
		this.next();
	},
	next() {
		if (!this.queue.length) {
			document.getElementById('review-status').innerHTML =
				'<div style="color:var(--green);text-align:center;padding:40px">復習完了！🎉</div>';
			document.getElementById('review-buttons').style.display = 'none';
			return;
		}
		this.current = this.queue.shift();
		this.flipped = false;
		document.getElementById('flashcard-inner').classList.remove('flipped');
		document.getElementById('fc-word').textContent = this.current.word;
		document.getElementById('fc-pron').textContent =
			this.current.pronunciation || '';
		document.getElementById('fc-meaning').textContent = this.current.meaning_jp;
		document.getElementById('fc-example').textContent =
			this.current.example || '';
		document.getElementById('review-buttons').style.display = 'none';
		document.getElementById('review-status').innerHTML =
			`<div style="font-size:.82rem;color:var(--text2)">残り: ${this.queue.length + 1}語</div>`;
	},
	flip() {
		if (!this.current) return;
		this.flipped = !this.flipped;
		document
			.getElementById('flashcard-inner')
			.classList.toggle('flipped', this.flipped);
		if (this.flipped)
			document.getElementById('review-buttons').style.display = 'flex';
	},
	score(q) {
		if (!this.current) return;
		const v = App.getVocab(),
			item = v.find((w) => w.id === this.current.id);
		if (item) {
			let ef = item.ease_factor || 2.5,
				iv = item.interval_days || 1;
			if (q === 1) {
				iv = 1;
				ef = Math.max(1.3, ef - 0.2);
			} else if (q === 2) {
				iv = Math.max(1, Math.round(iv * 1.2));
				ef = Math.max(1.3, ef - 0.15);
			} else if (q === 3) {
				iv = Math.round(iv * ef);
			} else {
				iv = Math.round(iv * ef * 1.3);
				ef += 0.15;
			}
			const nx = new Date();
			nx.setDate(nx.getDate() + iv);
			item.interval_days = iv;
			item.ease_factor = ef;
			item.review_count = (item.review_count || 0) + 1;
			item.next_review = nx.toISOString();
			App.saveVocab(v);
			App.addExp(q >= 3 ? 5 : 2);
		}
		this.next();
	},
};

// === CHARACTER ===
const CharApp = {
	selAnc: null,
	selHer: null,
	selCls: null,
	selSub: null,
	ancFilter: 'All',
	clsFilter: 'All',
	render() {
		const ch = App.getChar();
		this.selAnc = ch.ancestry;
		this.selHer = ch.heritage;
		this.selCls = ch.cls;
		this.selSub = ch.subclass;
		this.drawCurrent();
		this.drawAncFilters();
		this.drawAncs();
		this.drawClsFilters();
		this.drawClasses();
		this.drawSynergy();
		if (this.selAnc) this.drawHeritages(this.selAnc);
		if (this.selCls) this.drawSubclasses(this.selCls);
	},
	drawCurrent() {
		const a = ANCESTRIES.find((x) => x.id === this.selAnc),
			c = CLASSES.find((x) => x.id === this.selCls);
		const h = a ? a.heritages.find((x) => x.id === this.selHer) : null,
			s = c ? c.subclasses.find((x) => x.id === this.selSub) : null;
		document.getElementById('char-current').innerHTML =
			`<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center"><div style="text-align:center"><div style="font-size:3rem">${a ? a.icon : '❓'}</div><div style="font-size:.82rem;font-weight:700;color:var(--accent)">${a ? a.name : '種族未選択'}</div><div style="font-size:.68rem;color:var(--gold)">${h ? h.name : '-'}</div></div><div style="font-size:1.5rem;color:var(--text3)">×</div><div style="text-align:center"><div style="font-size:3rem">${c ? c.icon : '❓'}</div><div style="font-size:.82rem;font-weight:700;color:var(--accent)">${c ? c.name : '職業未選択'}</div><div style="font-size:.68rem;color:var(--gold)">${s ? s.name : '-'}</div></div><div style="margin-left:auto;text-align:right"><div style="font-size:.72rem;color:var(--text3)">LV ${App.getLv()} ${App.getTitle()}</div><div style="font-size:.72rem;color:var(--text3)">💎${App.getCry()} ⭐${App.getPts()}</div></div></div>`;
	},
	drawAncFilters() {
		const cats = ['All', 'Core', 'Uncommon', 'Rare'];
		document.getElementById('ancestry-filters').innerHTML = cats
			.map(
				(c) =>
					`<button class="${c === this.ancFilter ? 'active' : ''}" onclick="CharApp.fAnc('${c}')">${c}</button>`,
			)
			.join('');
	},
	fAnc(c) {
		this.ancFilter = c;
		this.drawAncFilters();
		this.drawAncs();
	},
	drawAncs() {
		const f =
			this.ancFilter === 'All'
				? ANCESTRIES
				: ANCESTRIES.filter((a) => a.category === this.ancFilter);
		document.getElementById('ancestry-grid').innerHTML = f
			.map(
				(a) =>
					`<div class="char-card ${a.id === this.selAnc ? 'selected' : ''}" onclick="CharApp.pickAnc('${a.id}')"><span class="cat-badge ${a.category.toLowerCase()}">${a.category}</span><div class="icon">${a.icon}</div><div class="name">${a.name}</div><div class="desc">${a.desc}</div></div>`,
			)
			.join('');
	},
	pickAnc(id) {
		this.selAnc = id;
		this.selHer = null;
		this.save();
		this.drawAncs();
		this.drawCurrent();
		this.drawHeritages(id);
		this.drawSynergy();
	},
	drawHeritages(aid) {
		const a = ANCESTRIES.find((x) => x.id === aid);
		if (!a) {
			document.getElementById('heritage-section').style.display = 'none';
			return;
		}
		document.getElementById('heritage-section').style.display = 'block';
		document.getElementById('heritage-list').innerHTML = a.heritages
			.map(
				(h) =>
					`<div class="heritage-item ${h.id === this.selHer ? 'selected' : ''}" onclick="CharApp.pickHer('${h.id}')"><div class="h-name">${h.name}</div><div class="h-desc">${h.desc}</div></div>`,
			)
			.join('');
	},
	pickHer(id) {
		this.selHer = id;
		this.save();
		this.drawHeritages(this.selAnc);
		this.drawCurrent();
	},
	drawClsFilters() {
		const cats = ['All', 'Martial', 'Caster', 'Hybrid'];
		document.getElementById('class-filters').innerHTML = cats
			.map(
				(c) =>
					`<button class="${c === this.clsFilter ? 'active' : ''}" onclick="CharApp.fCls('${c}')">${c}</button>`,
			)
			.join('');
	},
	fCls(c) {
		this.clsFilter = c;
		this.drawClsFilters();
		this.drawClasses();
	},
	drawClasses() {
		const f =
			this.clsFilter === 'All'
				? CLASSES
				: CLASSES.filter((c) => c.category === this.clsFilter);
		document.getElementById('class-grid').innerHTML = f
			.map(
				(c) =>
					`<div class="char-card ${c.id === this.selCls ? 'selected' : ''}" onclick="CharApp.pickCls('${c.id}')"><span class="cat-badge ${c.category.toLowerCase()}">${c.category}</span><div class="icon">${c.icon}</div><div class="name">${c.name}</div><div class="desc">${c.desc}</div></div>`,
			)
			.join('');
	},
	pickCls(id) {
		this.selCls = id;
		this.selSub = null;
		this.save();
		this.drawClasses();
		this.drawCurrent();
		this.drawSubclasses(id);
		this.drawSynergy();
	},
	drawSubclasses(cid) {
		const c = CLASSES.find((x) => x.id === cid);
		if (!c) {
			document.getElementById('subclass-section').style.display = 'none';
			return;
		}
		document.getElementById('subclass-section').style.display = 'block';
		document.getElementById('subclass-list').innerHTML = c.subclasses
			.map(
				(s) =>
					`<div class="heritage-item ${s.id === this.selSub ? 'selected' : ''}" onclick="CharApp.pickSub('${s.id}')"><div class="h-name">${s.name}</div><div class="h-desc">${s.desc}</div></div>`,
			)
			.join('');
	},
	pickSub(id) {
		this.selSub = id;
		this.save();
		this.drawSubclasses(this.selCls);
		this.drawCurrent();
	},
	save() {
		App.saveChar({
			ancestry: this.selAnc,
			heritage: this.selHer,
			cls: this.selCls,
			subclass: this.selSub,
		});
	},
	drawSynergy() {
		const syn = App.getClassSynergy(),
			labels = {
				speaking: '🔥 Speaking',
				listening: '💧 Listening',
				vocab: '⚡ Vocab',
				grammar: '🌙 Grammar',
				writing: '🌿 Writing',
			};
		let rows = '';
		for (const [k, label] of Object.entries(labels)) {
			const v = syn[k] || 0;
			rows += `<tr><td>${label}</td><td class="${v < 0 ? 'positive' : v > 0 ? 'negative' : 'neutral'}">${v < 0 ? 'コスト' + v : v > 0 ? 'コスト+' + v : '±0'}</td></tr>`;
		}
		document.getElementById('synergy-display').innerHTML =
			`<div style="font-size:.78rem;color:var(--text2);margin-bottom:8px">職業によりスフィア盤コストが変動</div><table class="synergy-table"><thead><tr><th>スキル分岐</th><th>コスト修正</th></tr></thead><tbody>${rows}</tbody></table>`;
	},
};

// === SPHERE GRID (Placeholder — Part 2で拡張) ===
const SphereGrid = {
	init() {
		const c = document.getElementById('sphere-canvas'),
			ctx = c.getContext('2d');
		const container = document.getElementById('sphere-container');
		c.width = container.clientWidth;
		c.height = container.clientHeight;
		ctx.fillStyle = '#0c1a0e';
		ctx.fillRect(0, 0, c.width, c.height);
		ctx.fillStyle = '#d4a843';
		ctx.font = 'bold 16px Orbitron, sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText(
			'スフィア盤 — Part 2 で完全版を追加',
			c.width / 2,
			c.height / 2 - 10,
		);
		ctx.fillStyle = '#8fb5a6';
		ctx.font = '13px sans-serif';
		ctx.fillText(
			'💎 結晶: ' + App.getCry() + ' | ⭐ ポイント: ' + App.getPts(),
			c.width / 2,
			c.height / 2 + 20,
		);
		document.getElementById('sphere-crystals').textContent =
			'💎 ' + App.getCry();
		document.getElementById('sphere-points').textContent = '⭐ ' + App.getPts();
	},
};

// === REPORT ===
const ReportApp = {
	days: 7,
	render() {
		document.querySelectorAll('#report-period button').forEach((b) => {
			b.addEventListener('click', () => {
				this.days = parseInt(b.dataset.days);
				document
					.querySelectorAll('#report-period button')
					.forEach((x) => x.classList.remove('active'));
				b.classList.add('active');
				this.render();
			});
		});
		const log = App.getLog(),
			data = [];
		let totalEN = 0,
			totalYUE = 0;
		for (let i = this.days - 1; i >= 0; i--) {
			const d = new Date();
			d.setDate(d.getDate() - i);
			const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
			const e = log[k] || { EN: 0, YUE: 0 };
			totalEN += e.EN || 0;
			totalYUE += e.YUE || 0;
			data.push({
				date: k.slice(5),
				en: e.EN || 0,
				yue: e.YUE || 0,
				total: (e.EN || 0) + (e.YUE || 0),
			});
		}
		const maxT = Math.max(...data.map((d) => d.total), 1);
		document.getElementById('report-summary').innerHTML =
			`<div style="display:flex;gap:24px;flex-wrap:wrap"><div style="text-align:center"><div style="font-family:var(--font2);font-size:1.5rem;font-weight:900;color:var(--accent)">${totalEN + totalYUE}</div><div style="font-size:.68rem;color:var(--text3)">合計(分)</div></div><div style="text-align:center"><div style="font-family:var(--font2);font-size:1.5rem;font-weight:900;color:var(--accent)">${totalEN}</div><div style="font-size:.68rem;color:var(--text3)">🇺🇸 EN</div></div><div style="text-align:center"><div style="font-family:var(--font2);font-size:1.5rem;font-weight:900;color:var(--accent)">${totalYUE}</div><div style="font-size:.68rem;color:var(--text3)">🇭🇰 YUE</div></div></div>`;
		document.getElementById('report-bar').innerHTML = data
			.map(
				(d) =>
					`<div class="report-bar-item" style="height:${Math.max(4, (d.total / maxT) * 100)}%"><span class="bar-value">${d.total}</span><span class="bar-label">${d.date}</span></div>`,
			)
			.join('');
		const vocab = App.getVocab();
		document.getElementById('report-skills').innerHTML =
			`<div style="font-size:.82rem;color:var(--text2);line-height:2"><div>📚 総単語数: ${vocab.length}</div><div>🇺🇸 EN: ${vocab.filter((v) => v.language === 'EN').length}語</div><div>🇭🇰 YUE: ${vocab.filter((v) => v.language === 'YUE').length}語</div><div>🔥 LV: ${App.getLv()}</div><div>⭐ 総EXP: ${App.getExp()}</div></div>`;
		const streak = App.getStreak(),
			best = App.getBest(),
			achievements = [
				{
					icon: '🔥',
					name: '初めの一歩',
					desc: '初回学習完了',
					done: totalEN + totalYUE > 0,
				},
				{ icon: '📅', name: '3日連続', desc: '3日連続学習', done: best >= 3 },
				{ icon: '🗓️', name: '7日連続', desc: '1週間連続', done: best >= 7 },
				{ icon: '🏆', name: '30日連続', desc: '1ヶ月連続', done: best >= 30 },
				{
					icon: '📖',
					name: '語彙10',
					desc: '10単語登録',
					done: vocab.length >= 10,
				},
				{
					icon: '📚',
					name: '語彙50',
					desc: '50単語登録',
					done: vocab.length >= 50,
				},
				{
					icon: '⚔️',
					name: 'LV10到達',
					desc: 'レベル10',
					done: App.getLv() >= 10,
				},
				{
					icon: '👑',
					name: 'LV25到達',
					desc: 'レベル25',
					done: App.getLv() >= 25,
				},
			];
		document.getElementById('report-achievements').innerHTML = achievements
			.map(
				(a) =>
					`<div class="achievement-item ${a.done ? 'unlocked' : 'locked'}"><div class="a-icon">${a.icon}</div><div><div class="a-name">${a.name}</div><div class="a-desc">${a.desc}</div></div></div>`,
			)
			.join('');
	},
};

// === BOOT ===
document.addEventListener('DOMContentLoaded', () => {
	App.init();
	Router.init();
	HomePage.render();
});
// ============================================================
//  LinguaQuest — app.js (Complete Application Logic)
//  Home / Timer / Calendar / Vocab / Review / Character / Sphere / Report
// ============================================================

// ============================================================
//  STATE MANAGEMENT
// ============================================================
const DEFAULT_STATE = {
	// Character
	playerName: 'Adventurer',
	ancestry: null,
	heritage: null,
	playerClass: null,
	subclass: null,
	level: 1,
	exp: 0,
	hp: 100,
	maxHp: 100,
	gold: 0,
	// Skills
	skills: {
		vocab: { exp: 0, level: 1 },
		grammar: { exp: 0, level: 1 },
		listening: { exp: 0, level: 1 },
		speaking: { exp: 0, level: 1 },
		reading: { exp: 0, level: 1 },
		writing: { exp: 0, level: 1 },
	},
	// Vocab
	vocabList: [],
	// Timer
	timerSessions: [],
	todayStudyMinutes: 0,
	// Calendar
	calendarData: {},
	streak: 0,
	bestStreak: 0,
	// Sphere
	unlockedNodes: [],
	spherePoints: 0,
	// Stats
	totalStudyMinutes: 0,
	totalReviews: 0,
	totalCorrect: 0,
	daysActive: 0,
	// Settings
	createdAt: new Date().toISOString(),
};

let state = {};

function loadState() {
	try {
		const saved = localStorage.getItem('linguaquest_state');
		if (saved) {
			state = JSON.parse(saved);
			// Merge missing keys from default
			for (const k in DEFAULT_STATE) {
				if (!(k in state))
					state[k] = JSON.parse(JSON.stringify(DEFAULT_STATE[k]));
			}
			if (!state.skills)
				state.skills = JSON.parse(JSON.stringify(DEFAULT_STATE.skills));
		} else {
			state = JSON.parse(JSON.stringify(DEFAULT_STATE));
		}
	} catch (e) {
		state = JSON.parse(JSON.stringify(DEFAULT_STATE));
	}
}

function saveState() {
	localStorage.setItem('linguaquest_state', JSON.stringify(state));
}

// ============================================================
//  UTILITY
// ============================================================
function $(sel) {
	return document.querySelector(sel);
}
function $$(sel) {
	return document.querySelectorAll(sel);
}
function el(tag, cls, html) {
	const e = document.createElement(tag);
	if (cls) e.className = cls;
	if (html !== undefined) e.innerHTML = html;
	return e;
}

function getTitle(lv) {
	let t = TITLES[0];
	for (const ti of TITLES) {
		if (lv >= ti.lv) t = ti;
	}
	return t.name;
}

function getAncestryById(id) {
	return ANCESTRIES.find((a) => a.id === id);
}
function getClassById(id) {
	return CLASSES.find((c) => c.id === id);
}
function getHeritageById(ancestryId, herId) {
	const a = getAncestryById(ancestryId);
	return a ? a.heritages.find((h) => h.id === herId) : null;
}
function getSubclassById(classId, subId) {
	const c = getClassById(classId);
	return c ? c.subclasses.find((s) => s.id === subId) : null;
}

function calcBonuses() {
	const bonuses = {};
	const add = (eff) => {
		if (!eff) return;
		for (const k in eff) bonuses[k] = (bonuses[k] || 0) + eff[k];
	};
	if (state.ancestry) {
		const a = getAncestryById(state.ancestry);
		if (a) add(a.baseBonus);
	}
	if (state.ancestry && state.heritage) {
		const h = getHeritageById(state.ancestry, state.heritage);
		if (h) add(h.effect);
	}
	if (state.playerClass) {
		const c = getClassById(state.playerClass);
		if (c) add(c.baseBonus);
	}
	if (state.playerClass && state.subclass) {
		const s = getSubclassById(state.playerClass, state.subclass);
		if (s) add(s.effect);
	}
	return bonuses;
}

function addExp(skill, amount) {
	const bonuses = calcBonuses();
	let mult = 1;
	mult += bonuses.expAll || 0;
	if (
		skill &&
		bonuses['exp' + skill.charAt(0).toUpperCase() + skill.slice(1)]
	) {
		mult += bonuses['exp' + skill.charAt(0).toUpperCase() + skill.slice(1)];
	}
	// Night bonus
	const hour = new Date().getHours();
	if ((hour >= 22 || hour < 5) && bonuses.nightBonus)
		mult += bonuses.nightBonus;
	// Streak bonus
	if (state.streak > 0 && bonuses.streakBonus) mult += bonuses.streakBonus;

	const finalExp = Math.round(amount * mult);

	// Add to skill
	if (skill && state.skills[skill]) {
		state.skills[skill].exp += finalExp;
		while (state.skills[skill].exp >= expForLevel(state.skills[skill].level)) {
			state.skills[skill].exp -= expForLevel(state.skills[skill].level);
			state.skills[skill].level++;
		}
	}

	// Add to total
	state.exp += finalExp;
	while (state.exp >= expForLevel(state.level)) {
		state.exp -= expForLevel(state.level);
		state.level++;
	}

	// Sphere points every 2 levels
	state.spherePoints = Math.floor(state.level / 2);

	saveState();
	return finalExp;
}

function todayKey() {
	const d = new Date();
	return (
		d.getFullYear() +
		'-' +
		String(d.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(d.getDate()).padStart(2, '0')
	);
}

// ============================================================
//  NAVIGATION
// ============================================================
let currentTab = 'home';

function initNav() {
	$$('.nav-item').forEach((item) => {
		item.addEventListener('click', () => {
			const tab = item.dataset.tab;
			if (tab) switchTab(tab);
		});
	});
}

function switchTab(tab) {
	currentTab = tab;

	$$('.nav-item').forEach((n) =>
		n.classList.toggle('active', n.dataset.tab === tab),
	);

	$$('.section').forEach((s) =>
		s.classList.toggle('active', s.id === 'section-' + tab),
	);
	// Render
	switch (tab) {
		case 'home':
			renderHome();
			break;
		case 'timer':
			renderTimer();
			break;
		case 'calendar':
			renderCalendar();
			break;
		case 'vocab':
			renderVocab();
			break;
		case 'review':
			renderReview();
			break;
		case 'character':
			renderCharacter();
			break;
		case 'sphere':
			renderSphere();
			break;
		case 'report':
			renderReport();
			break;
	}
}

// ============================================================
//  HOME
// ============================================================
function renderHome() {
	const sec = $('#section-home');
	if (!sec) return;

	const a = state.ancestry ? getAncestryById(state.ancestry) : null;
	const c = state.playerClass ? getClassById(state.playerClass) : null;
	const title = getTitle(state.level);
	const expNeeded = expForLevel(state.level);
	const expPct = Math.min(100, Math.round((state.exp / expNeeded) * 100));

	// Today info
	const today = todayKey();
	const todayMin = state.calendarData[today] || 0;

	sec.innerHTML = `
    <div class="card">
      <h2>${a ? a.icon : '⚔️'} ${state.playerName}</h2>
      <p style="opacity:0.7">${title}</p>
      <p>Lv. ${state.level} ${c ? c.name : '未選択'}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${expPct}%"></div></div>
      <p style="font-size:0.85rem;opacity:0.7">EXP: ${state.exp} / ${expNeeded}</p>
    </div>
    <div class="card">
      <h3>Today's Activity</h3>
      <p>Study Time: ${todayMin} min</p>
      <p>Streak: ${state.streak} days (Best: ${state.bestStreak})</p>
      <p>Gold: ${state.gold} G</p>
    </div>
    <div class="card">
      <h3>Skills</h3>
      ${Object.entries(state.skills)
				.map(([k, v]) => {
					const sExpNeeded = expForLevel(v.level);
					const sPct = Math.min(100, Math.round((v.exp / sExpNeeded) * 100));
					return `<div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;font-size:0.9rem">
            <span>${k.charAt(0).toUpperCase() + k.slice(1)}</span>
            <span>Lv.${v.level}</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${sPct}%"></div></div>
        </div>`;
				})
				.join('')}
    </div>
    <div class="card">
      <h3>Quick Actions</h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" onclick="switchTab('timer')">Start Timer</button>
        <button class="btn" onclick="switchTab('review')">Review</button>
        <button class="btn" onclick="switchTab('vocab')">Vocab</button>
      </div>
    </div>
  `;
}

// ============================================================
//  TIMER
// ============================================================
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let timerTargetMinutes = 25;

function renderTimer() {
	const sec = $('#section-timer');
	if (!sec) return;

	const mm = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
	const ss = String(timerSeconds % 60).padStart(2, '0');

	sec.innerHTML = `
    <div class="card" style="text-align:center">
      <h2>Study Timer</h2>
      <div style="font-size:4rem;font-family:'Orbitron',monospace;margin:20px 0" id="timer-display">${mm}:${ss}</div>
      <div style="margin-bottom:16px">
        <label>Target: <select id="timer-target" style="background:#1a2e28;color:#e8dcc8;border:1px solid #50e3a4;padding:4px 8px;border-radius:4px">
          ${[15, 25, 30, 45, 60, 90].map((m) => `<option value="${m}" ${m === timerTargetMinutes ? 'selected' : ''}>${m} min</option>`).join('')}
        </select></label>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn" id="btn-timer-start">${timerRunning ? 'Pause' : 'Start'}</button>
        <button class="btn btn-secondary" id="btn-timer-reset">Reset</button>
        <button class="btn" id="btn-timer-finish">Finish & Log</button>
      </div>
      <div style="margin-top:16px">
        <label>Skill: <select id="timer-skill" style="background:#1a2e28;color:#e8dcc8;border:1px solid #50e3a4;padding:4px 8px;border-radius:4px">
          <option value="vocab">Vocab</option>
          <option value="grammar">Grammar</option>
          <option value="listening">Listening</option>
          <option value="speaking">Speaking</option>
          <option value="reading">Reading</option>
          <option value="writing">Writing</option>
        </select></label>
      </div>
    </div>
    <div class="card">
      <h3>Recent Sessions</h3>
      <div id="timer-history"></div>
    </div>
  `;

	// Event listeners
	$('#btn-timer-start').addEventListener('click', toggleTimer);
	$('#btn-timer-reset').addEventListener('click', resetTimer);
	$('#btn-timer-finish').addEventListener('click', finishTimer);
	$('#timer-target').addEventListener('change', (e) => {
		timerTargetMinutes = parseInt(e.target.value);
	});

	renderTimerHistory();
}

function toggleTimer() {
	if (timerRunning) {
		clearInterval(timerInterval);
		timerRunning = false;
	} else {
		timerRunning = true;
		timerInterval = setInterval(() => {
			timerSeconds++;
			updateTimerDisplay();
		}, 1000);
	}
	const btn = $('#btn-timer-start');
	if (btn) btn.textContent = timerRunning ? 'Pause' : 'Start';
}

function resetTimer() {
	clearInterval(timerInterval);
	timerRunning = false;
	timerSeconds = 0;
	updateTimerDisplay();
	const btn = $('#btn-timer-start');
	if (btn) btn.textContent = 'Start';
}

function updateTimerDisplay() {
	const disp = $('#timer-display');
	if (!disp) return;
	const mm = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
	const ss = String(timerSeconds % 60).padStart(2, '0');
	disp.textContent = mm + ':' + ss;
}

function finishTimer() {
	clearInterval(timerInterval);
	timerRunning = false;

	const minutes = Math.floor(timerSeconds / 60);
	if (minutes < 1) {
		alert('At least 1 minute needed!');
		return;
	}

	const skillSel = $('#timer-skill');
	const skill = skillSel ? skillSel.value : 'vocab';

	// Log session
	const session = {
		date: new Date().toISOString(),
		minutes: minutes,
		skill: skill,
	};
	state.timerSessions.unshift(session);
	if (state.timerSessions.length > 50) state.timerSessions.pop();

	// Update calendar
	const today = todayKey();
	state.calendarData[today] = (state.calendarData[today] || 0) + minutes;
	state.totalStudyMinutes += minutes;

	// Update streak
	updateStreak();

	// Grant EXP
	const expGained = addExp(skill, minutes * 10);
	state.gold += Math.floor(minutes * 2);

	timerSeconds = 0;
	saveState();
	renderTimer();
	alert(`Session logged! +${expGained} EXP, +${Math.floor(minutes * 2)} Gold`);
}

function updateStreak() {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const yKey =
		yesterday.getFullYear() +
		'-' +
		String(yesterday.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(yesterday.getDate()).padStart(2, '0');

	if (state.calendarData[todayKey()] && state.calendarData[todayKey()] > 0) {
		if (state.calendarData[yKey] && state.calendarData[yKey] > 0) {
			// Continue streak (already counted)
		} else {
			// Check if streak was already incremented today
		}
	}

	// Recalculate streak from today backwards
	let streak = 0;
	const d = new Date();
	while (true) {
		const k =
			d.getFullYear() +
			'-' +
			String(d.getMonth() + 1).padStart(2, '0') +
			'-' +
			String(d.getDate()).padStart(2, '0');
		if (state.calendarData[k] && state.calendarData[k] > 0) {
			streak++;
			d.setDate(d.getDate() - 1);
		} else {
			break;
		}
	}
	state.streak = streak;
	if (streak > state.bestStreak) state.bestStreak = streak;
}

function renderTimerHistory() {
	const cont = $('#timer-history');
	if (!cont) return;
	if (!state.timerSessions.length) {
		cont.innerHTML = "<p style='opacity:0.5'>No sessions yet</p>";
		return;
	}
	cont.innerHTML = state.timerSessions
		.slice(0, 10)
		.map((s) => {
			const d = new Date(s.date);
			return `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(80,227,164,0.1)">
      <span>${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</span>
      <span>${s.skill}</span>
      <span>${s.minutes} min</span>
    </div>`;
		})
		.join('');
}

// ============================================================
//  CALENDAR
// ============================================================
function renderCalendar() {
	const sec = $('#section-calendar');
	if (!sec) return;

	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	let calGrid = '';
	const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	calGrid += dayLabels
		.map(
			(d) =>
				`<div style="text-align:center;font-size:0.75rem;opacity:0.5;padding:4px">${d}</div>`,
		)
		.join('');

	// Empty cells
	for (let i = 0; i < firstDay; i++) {
		calGrid += `<div></div>`;
	}

	for (let d = 1; d <= daysInMonth; d++) {
		const key =
			year +
			'-' +
			String(month + 1).padStart(2, '0') +
			'-' +
			String(d).padStart(2, '0');
		const mins = state.calendarData[key] || 0;
		const isToday = d === now.getDate();
		let bg = 'transparent';
		if (mins > 0)
			bg =
				mins >= 60
					? 'rgba(80,227,164,0.4)'
					: mins >= 30
						? 'rgba(80,227,164,0.25)'
						: 'rgba(80,227,164,0.12)';
		const border = isToday ? 'border:2px solid #f0c040' : '';
		calGrid += `<div style="text-align:center;padding:8px;border-radius:6px;background:${bg};${border};font-size:0.85rem" title="${mins} min">
      ${d}${mins > 0 ? `<div style="font-size:0.65rem;opacity:0.6">${mins}m</div>` : ''}
    </div>`;
	}

	sec.innerHTML = `
    <div class="card">
      <h2>${monthNames[month]} ${year}</h2>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:16px">
        ${calGrid}
      </div>
    </div>
    <div class="card">
      <h3>Monthly Stats</h3>
      <p>Total this month: ${Object.entries(state.calendarData)
				.filter(([k]) =>
					k.startsWith(year + '-' + String(month + 1).padStart(2, '0')),
				)
				.reduce((sum, [, v]) => sum + v, 0)} min</p>
      <p>Active days: ${Object.entries(state.calendarData).filter(([k, v]) => k.startsWith(year + '-' + String(month + 1).padStart(2, '0')) && v > 0).length}</p>
      <p>Current streak: ${state.streak} days</p>
    </div>
  `;
}

// ============================================================
//  VOCAB
// ============================================================
function renderVocab() {
	const sec = $('#section-vocab');
	if (!sec) return;

	sec.innerHTML = `
    <div class="card">
      <h2>Vocabulary List</h2>
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <input type="text" id="vocab-word" placeholder="Word / 単語" style="flex:1;min-width:120px;background:#1a2e28;color:#e8dcc8;border:1px solid #50e3a4;padding:8px 12px;border-radius:6px">
        <input type="text" id="vocab-meaning" placeholder="Meaning / 意味" style="flex:1;min-width:120px;background:#1a2e28;color:#e8dcc8;border:1px solid #50e3a4;padding:8px 12px;border-radius:6px">
        <button class="btn" id="btn-vocab-add">Add</button>
      </div>
      <div id="vocab-list-container"></div>
    </div>
    <div class="card">
      <p>Total words: ${state.vocabList.length}</p>
      <p>Mastered: ${state.vocabList.filter((v) => v.mastered).length}</p>
    </div>
  `;

	$('#btn-vocab-add').addEventListener('click', addVocabWord);
	renderVocabList();
}

function addVocabWord() {
	const wordEl = $('#vocab-word');
	const meaningEl = $('#vocab-meaning');
	if (!wordEl || !meaningEl) return;
	const word = wordEl.value.trim();
	const meaning = meaningEl.value.trim();
	if (!word || !meaning) return;

	state.vocabList.push({
		id: Date.now(),
		word: word,
		meaning: meaning,
		mastered: false,
		reviewCount: 0,
		correctCount: 0,
		nextReview: new Date().toISOString(),
		addedAt: new Date().toISOString(),
	});

	addExp('vocab', 5);
	saveState();
	wordEl.value = '';
	meaningEl.value = '';
	renderVocabList();
}

function renderVocabList() {
	const cont = $('#vocab-list-container');
	if (!cont) return;
	if (!state.vocabList.length) {
		cont.innerHTML =
			"<p style='opacity:0.5'>No words added yet. Add some above!</p>";
		return;
	}

	cont.innerHTML = state.vocabList
		.slice()
		.reverse()
		.slice(0, 50)
		.map(
			(v) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(80,227,164,0.1)">
      <div>
        <strong>${v.word}</strong>
        <span style="opacity:0.6;margin-left:8px">${v.meaning}</span>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        ${v.mastered ? '<span style="color:#50e3a4;font-size:0.8rem">Mastered</span>' : ''}
        <button class="btn btn-secondary" style="padding:4px 8px;font-size:0.75rem" onclick="deleteVocab(${v.id})">Del</button>
      </div>
    </div>
  `,
		)
		.join('');
}

function deleteVocab(id) {
	state.vocabList = state.vocabList.filter((v) => v.id !== id);
	saveState();
	renderVocabList();
}

// ============================================================
//  REVIEW (Flashcard)
// ============================================================
let reviewQueue = [];
let reviewIndex = 0;
let reviewFlipped = false;

function renderReview() {
	const sec = $('#section-review');
	if (!sec) return;

	// Build review queue from words due for review
	if (reviewQueue.length === 0) {
		reviewQueue = state.vocabList.filter((v) => !v.mastered).slice(0, 20);
		reviewIndex = 0;
		reviewFlipped = false;
		// Shuffle
		for (let i = reviewQueue.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[reviewQueue[i], reviewQueue[j]] = [reviewQueue[j], reviewQueue[i]];
		}
	}

	if (reviewQueue.length === 0) {
		sec.innerHTML = `<div class="card"><h2>Review</h2><p>No words to review! Add vocab first.</p>
      <button class="btn" onclick="switchTab('vocab')">Go to Vocab</button></div>`;
		return;
	}

	const current = reviewQueue[reviewIndex];
	if (!current) {
		sec.innerHTML = `<div class="card" style="text-align:center">
      <h2>Review Complete!</h2>
      <p>You reviewed ${reviewQueue.length} words.</p>
      <button class="btn" id="btn-review-restart">Review Again</button>
    </div>`;
		$('#btn-review-restart').addEventListener('click', () => {
			reviewQueue = [];
			renderReview();
		});
		return;
	}

	sec.innerHTML = `
    <div class="card" style="text-align:center">
      <h2>Review — ${reviewIndex + 1} / ${reviewQueue.length}</h2>
      <div class="progress-bar" style="margin-bottom:16px"><div class="progress-fill" style="width:${Math.round((reviewIndex / reviewQueue.length) * 100)}%"></div></div>
      <div id="flashcard" style="background:rgba(10,30,25,0.6);border-radius:12px;padding:40px 20px;margin:20px 0;cursor:pointer;min-height:120px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(80,227,164,0.2)">
        <div style="font-size:1.8rem">${reviewFlipped ? current.meaning : current.word}</div>
      </div>
      <p style="opacity:0.5;font-size:0.85rem">${reviewFlipped ? 'Showing meaning' : 'Tap to reveal meaning'}</p>
      ${
				reviewFlipped
					? `
        <div style="display:flex;gap:12px;justify-content:center;margin-top:16px">
          <button class="btn" id="btn-review-correct" style="background:#10b981">Correct</button>
          <button class="btn" id="btn-review-wrong" style="background:#ef4444">Wrong</button>
        </div>
      `
					: ''
			}
    </div>
  `;

	$('#flashcard').addEventListener('click', () => {
		if (!reviewFlipped) {
			reviewFlipped = true;
			renderReview();
		}
	});

	if (reviewFlipped) {
		$('#btn-review-correct').addEventListener('click', () =>
			reviewAnswer(true),
		);
		$('#btn-review-wrong').addEventListener('click', () => reviewAnswer(false));
	}
}

function reviewAnswer(correct) {
	const current = reviewQueue[reviewIndex];
	if (current) {
		// Update in state
		const item = state.vocabList.find((v) => v.id === current.id);
		if (item) {
			item.reviewCount++;
			if (correct) {
				item.correctCount++;
				if (item.correctCount >= 5) item.mastered = true;
			}
		}
		state.totalReviews++;
		if (correct) state.totalCorrect++;
		addExp('vocab', correct ? 15 : 5);
		saveState();
	}
	reviewIndex++;
	reviewFlipped = false;
	renderReview();
}

// ============================================================
//  CHARACTER
// ============================================================
function renderCharacter() {
	const sec = $('#section-character');
	if (!sec) return;

	const a = state.ancestry ? getAncestryById(state.ancestry) : null;
	const c = state.playerClass ? getClassById(state.playerClass) : null;
	const h =
		state.ancestry && state.heritage
			? getHeritageById(state.ancestry, state.heritage)
			: null;
	const s =
		state.playerClass && state.subclass
			? getSubclassById(state.playerClass, state.subclass)
			: null;
	const title = getTitle(state.level);
	const bonuses = calcBonuses();

	sec.innerHTML = `
    <div class="card">
      <h2>Character Sheet</h2>
      <div style="margin-bottom:12px">
        <label style="font-size:0.85rem;opacity:0.7">Name</label>
        <input type="text" id="char-name" value="${state.playerName}" style="width:100%;background:#1a2e28;color:#e8dcc8;border:1px solid #50e3a4;padding:8px 12px;border-radius:6px;margin-top:4px">
      </div>
      <p><strong>Level:</strong> ${state.level} — ${title}</p>
      <p><strong>HP:</strong> ${state.hp} / ${state.maxHp + (bonuses.hpPlus || 0)}</p>
      <p><strong>Gold:</strong> ${state.gold} G</p>
      <p><strong>Sphere Points:</strong> ${state.spherePoints - state.unlockedNodes.length} available</p>
    </div>

    <!-- Ancestry Selection -->
    <div class="card">
      <h3>Ancestry / 種族 ${a ? '— ' + a.icon + ' ' + a.name : ''}</h3>
      ${a ? `<p style="opacity:0.7;font-size:0.85rem">${a.desc}</p>` : ''}
      <div style="margin-top:8px">
        <select id="sel-ancestry" style="width:100%;background:#1a2e28;color:#e8dcc8;border:1px solid #50e3a4;padding:8px;border-radius:6px">
          <option value="">— Select Ancestry —</option>
          ${buildAncestryOptions()}
        </select>
      </div>
      ${
				a
					? `
        <h4 style="margin-top:12px">Heritage / 系譜 ${h ? '— ' + h.name : ''}</h4>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          ${a.heritages
						.map(
							(hr) => `
            <button class="btn ${state.heritage === hr.id ? '' : 'btn-secondary'}" onclick="selectHeritage('${hr.id}')" style="font-size:0.8rem">
              ${hr.name}<br><span style="font-size:0.7rem;opacity:0.7">${hr.desc}</span>
            </button>
          `,
						)
						.join('')}
        </div>
      `
					: ''
			}
    </div>

    <!-- Class Selection -->
    <div class="card">
      <h3>Class / 職業 ${c ? '— ' + c.icon + ' ' + c.name : ''}</h3>
      ${c ? `<p style="opacity:0.7;font-size:0.85rem">${c.desc}</p>` : ''}
      <div style="margin-top:8px">
        <select id="sel-class" style="width:100%;background:#1a2e28;color:#e8dcc8;border:1px solid #50e3a4;padding:8px;border-radius:6px">
          <option value="">— Select Class —</option>
          ${buildClassOptions()}
        </select>
      </div>
      ${
				c
					? `
        <h4 style="margin-top:12px">Subclass / 専門 ${s ? '— ' + s.name : ''}</h4>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          ${c.subclasses
						.map(
							(sc) => `
            <button class="btn ${state.subclass === sc.id ? '' : 'btn-secondary'}" onclick="selectSubclass('${sc.id}')" style="font-size:0.8rem">
              ${sc.name}<br><span style="font-size:0.7rem;opacity:0.7">${sc.desc}</span>
            </button>
          `,
						)
						.join('')}
        </div>
      `
					: ''
			}
    </div>

    <!-- Active Bonuses -->
    <div class="card">
      <h3>Active Bonuses / 効果一覧</h3>
      <div id="bonus-list">
        ${
					Object.entries(bonuses).length > 0
						? Object.entries(bonuses)
								.map(([k, v]) => {
									const label = bonusLabel(k);
									const sign = v > 0 ? '+' : '';
									const display =
										k.includes('Plus') || k.includes('Regen')
											? sign + v
											: sign + Math.round(v * 100) + '%';
									return `<div style="display:flex;justify-content:space-between;padding:4px 0"><span>${label}</span><span style="color:#50e3a4">${display}</span></div>`;
								})
								.join('')
						: "<p style='opacity:0.5'>Select ancestry and class to see bonuses</p>"
				}
      </div>
    </div>
  `;

	// Events
	$('#char-name').addEventListener('change', (e) => {
		state.playerName = e.target.value.trim() || 'Adventurer';
		saveState();
	});
	$('#sel-ancestry').addEventListener('change', (e) => {
		state.ancestry = e.target.value || null;
		state.heritage = null;
		saveState();
		renderCharacter();
	});
	$('#sel-class').addEventListener('change', (e) => {
		state.playerClass = e.target.value || null;
		state.subclass = null;
		saveState();
		renderCharacter();
	});
}

function buildAncestryOptions() {
	const cats = ['Core', 'Uncommon', 'Rare'];
	let html = '';
	for (const cat of cats) {
		html += `<optgroup label="── ${cat} ──">`;
		for (const a of ANCESTRIES.filter((x) => x.cat === cat)) {
			html += `<option value="${a.id}" ${state.ancestry === a.id ? 'selected' : ''}>${a.icon} ${a.name}</option>`;
		}
		html += `</optgroup>`;
	}
	return html;
}

function buildClassOptions() {
	const cats = ['Martial', 'Caster'];
	let html = '';
	for (const cat of cats) {
		html += `<optgroup label="── ${cat} ──">`;
		for (const c of CLASSES.filter((x) => x.cat === cat)) {
			html += `<option value="${c.id}" ${state.playerClass === c.id ? 'selected' : ''}>${c.icon} ${c.name}</option>`;
		}
		html += `</optgroup>`;
	}
	return html;
}

function selectHeritage(id) {
	state.heritage = id;
	saveState();
	renderCharacter();
}

function selectSubclass(id) {
	state.subclass = id;
	saveState();
	renderCharacter();
}

function bonusLabel(key) {
	const map = {
		expAll: 'All EXP',
		expVocab: 'Vocab EXP',
		expGrammar: 'Grammar EXP',
		expListening: 'Listening EXP',
		expSpeaking: 'Speaking EXP',
		expReading: 'Reading EXP',
		expWriting: 'Writing EXP',
		hpPlus: 'HP',
		hpRegen: 'HP Regen',
		critRate: 'Critical Rate',
		streakBonus: 'Streak Bonus',
		nightBonus: 'Night Bonus',
		timerBonus: 'Timer Bonus',
		shortSessionBonus: 'Short Session Bonus',
		vocabCost: 'Vocab Cost',
		reviewBonus: 'Review Bonus',
	};
	return map[key] || key;
}

// ============================================================
//  SPHERE GRID
// ============================================================
function renderSphere() {
	const sec = $('#section-sphere');
	if (!sec) return;

	const available = state.spherePoints - state.unlockedNodes.length;

	sec.innerHTML = `
    <div class="card">
      <h2>Sphere Grid / スフィア盤</h2>
      <p>Sphere Points: <strong style="color:#50e3a4">${available}</strong> available (Total: ${state.spherePoints})</p>
      <p style="font-size:0.8rem;opacity:0.6">Click a node to unlock. Nodes require prerequisites and sphere points.</p>
    </div>
    <div class="card" style="overflow:auto;padding:0">
      <canvas id="sphere-canvas" width="1120" height="800" style="display:block;cursor:pointer;max-width:100%;height:auto"></canvas>
    </div>
    <div id="sphere-tooltip" style="display:none;position:fixed;background:#0f1f1b;border:1px solid #50e3a4;border-radius:8px;padding:12px;z-index:999;max-width:260px;pointer-events:none"></div>
  `;

	drawSphereGrid();
}

const ATTR_COLORS = {
	fire: '#ef4444',
	water: '#3b82f6',
	wind: '#22c55e',
	earth: '#a78b5a',
	light: '#f0c040',
};

const RARITY_COLORS = {
	1: '#9ca3af',
	2: '#22c55e',
	3: '#3b82f6',
	4: '#a855f7',
	5: '#f59e0b',
};

function drawSphereGrid() {
	const canvas = $('#sphere-canvas');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = '#0a1210';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw connections
	ctx.lineWidth = 2;
	for (const node of SPHERE_NODES) {
		if (node.requires) {
			for (const reqId of node.requires) {
				const reqNode = SPHERE_NODES.find((n) => n.id === reqId);
				if (reqNode) {
					const bothUnlocked =
						state.unlockedNodes.includes(node.id) &&
						state.unlockedNodes.includes(reqId);
					ctx.strokeStyle = bothUnlocked ? '#50e3a4' : 'rgba(80,227,164,0.15)';
					ctx.beginPath();
					ctx.moveTo(reqNode.x, reqNode.y);
					ctx.lineTo(node.x, node.y);
					ctx.stroke();
				}
			}
		}
	}

	// Draw nodes
	for (const node of SPHERE_NODES) {
		const unlocked = state.unlockedNodes.includes(node.id);
		const canUnlock = canUnlockNode(node);
		const r =
			node.type === 'boss'
				? 22
				: node.type === 'chest'
					? 18
					: node.type === 'event'
						? 18
						: 16;

		// Glow for unlocked
		if (unlocked) {
			ctx.shadowColor = ATTR_COLORS[node.attr] || '#50e3a4';
			ctx.shadowBlur = 15;
		}

		ctx.beginPath();
		if (node.type === 'boss') {
			// Octagon
			for (let i = 0; i < 8; i++) {
				const angle = (Math.PI / 4) * i - Math.PI / 8;
				const x = node.x + r * Math.cos(angle);
				const y = node.y + r * Math.sin(angle);
				i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
			}
			ctx.closePath();
		} else if (node.type === 'chest') {
			// Diamond
			ctx.moveTo(node.x, node.y - r);
			ctx.lineTo(node.x + r, node.y);
			ctx.lineTo(node.x, node.y + r);
			ctx.lineTo(node.x - r, node.y);
			ctx.closePath();
		} else if (node.type === 'event') {
			// Triangle
			ctx.moveTo(node.x, node.y - r);
			ctx.lineTo(node.x + r, node.y + r * 0.7);
			ctx.lineTo(node.x - r, node.y + r * 0.7);
			ctx.closePath();
		} else {
			ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
		}

		if (unlocked) {
			ctx.fillStyle = ATTR_COLORS[node.attr] || '#50e3a4';
		} else if (canUnlock) {
			ctx.fillStyle = 'rgba(80,227,164,0.3)';
		} else {
			ctx.fillStyle = 'rgba(40,60,50,0.5)';
		}
		ctx.fill();

		ctx.shadowBlur = 0;

		// Border
		ctx.strokeStyle = unlocked
			? '#fff'
			: canUnlock
				? RARITY_COLORS[node.rarity] || '#50e3a4'
				: 'rgba(80,227,164,0.2)';
		ctx.lineWidth = unlocked ? 2.5 : 1.5;
		ctx.stroke();

		// Stars (rarity)
		if (node.rarity >= 3) {
			ctx.fillStyle = RARITY_COLORS[node.rarity];
			ctx.font = '10px sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(
				'★'.repeat(Math.min(node.rarity, 5)),
				node.x,
				node.y - r - 5,
			);
		}

		// Label
		ctx.fillStyle = unlocked ? '#fff' : 'rgba(232,220,200,0.6)';
		ctx.font = "10px 'Noto Sans JP', sans-serif";
		ctx.textAlign = 'center';
		ctx.fillText(node.label, node.x, node.y + r + 14);

		// Type icon
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		if (node.type === 'boss') ctx.fillText('💀', node.x, node.y);
		else if (node.type === 'chest') ctx.fillText('🎁', node.x, node.y);
		else if (node.type === 'event') ctx.fillText('⚡', node.x, node.y);
	}

	// Click handler
	canvas.onclick = (e) => {
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const mx = (e.clientX - rect.left) * scaleX;
		const my = (e.clientY - rect.top) * scaleY;

		for (const node of SPHERE_NODES) {
			const dist = Math.hypot(mx - node.x, my - node.y);
			if (dist < 24) {
				handleNodeClick(node);
				return;
			}
		}
	};

	// Hover tooltip
	canvas.onmousemove = (e) => {
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const mx = (e.clientX - rect.left) * scaleX;
		const my = (e.clientY - rect.top) * scaleY;
		const tip = $('#sphere-tooltip');

		for (const node of SPHERE_NODES) {
			const dist = Math.hypot(mx - node.x, my - node.y);
			if (dist < 24) {
				const unlocked = state.unlockedNodes.includes(node.id);
				tip.style.display = 'block';
				tip.style.left = e.clientX + 16 + 'px';
				tip.style.top = e.clientY - 10 + 'px';
				tip.innerHTML = `
          <strong style="color:${RARITY_COLORS[node.rarity]}">${'★'.repeat(node.rarity)} ${node.label}</strong><br>
          <span style="font-size:0.8rem">Skill: ${node.skill} | Attr: ${node.attr}</span><br>
          <span style="font-size:0.8rem">Type: ${node.type} | EXP: ${node.exp}</span><br>
          <span style="font-size:0.8rem;color:${unlocked ? '#50e3a4' : '#ef4444'}">${unlocked ? 'UNLOCKED' : 'LOCKED'}</span>
        `;
				return;
			}
		}
		tip.style.display = 'none';
	};

	canvas.onmouseleave = () => {
		const tip = $('#sphere-tooltip');
		if (tip) tip.style.display = 'none';
	};
}

function canUnlockNode(node) {
	if (state.unlockedNodes.includes(node.id)) return false;
	if (state.spherePoints - state.unlockedNodes.length <= 0) return false;
	if (!node.requires || node.requires.length === 0) return true;
	return node.requires.every((r) => state.unlockedNodes.includes(r));
}

function handleNodeClick(node) {
	if (state.unlockedNodes.includes(node.id)) {
		alert(`Already unlocked: ${node.label}`);
		return;
	}
	if (!canUnlockNode(node)) {
		if (state.spherePoints - state.unlockedNodes.length <= 0) {
			alert('Not enough Sphere Points! Level up to earn more.');
		} else {
			alert('Prerequisites not met. Unlock required nodes first.');
		}
		return;
	}

	// Handle different node types
	if (node.type === 'boss') {
		if (
			!confirm(
				`BOSS NODE: ${node.label}\nThis requires passing a challenge. Unlock and gain ${node.exp} EXP?\n\n(In full version, a quiz would appear here)`,
			)
		)
			return;
	} else if (node.type === 'chest') {
		alert(
			`TREASURE! You found: +${node.reward.gold} Gold, +${node.reward.exp} Bonus EXP`,
		);
		state.gold += node.reward.gold;
		addExp(node.skill === 'all' ? null : node.skill, node.reward.exp);
	} else if (node.type === 'event') {
		const events = [
			{ text: 'A mysterious traveler teaches you a secret!', exp: 50 },
			{ text: 'You find an ancient scroll!', exp: 75 },
			{ text: 'A spirit tests your knowledge... and you pass!', exp: 100 },
			{ text: 'You meditate and gain insight.', exp: 40 },
		];
		const ev = events[Math.floor(Math.random() * events.length)];
		alert(`EVENT: ${ev.text}\n+${ev.exp} bonus EXP`);
		addExp(node.skill === 'all' ? null : node.skill, ev.exp);
	}

	// Unlock
	state.unlockedNodes.push(node.id);
	if (node.exp > 0) {
		addExp(node.skill === 'all' ? null : node.skill, node.exp);
	}
	saveState();
	drawSphereGrid();
}

// ============================================================
//  REPORT
// ============================================================
function renderReport() {
	const sec = $('#section-report');
	if (!sec) return;

	const bonuses = calcBonuses();

	sec.innerHTML = `
    <div class="card">
      <h2>Adventure Report</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px">
        <div style="text-align:center;padding:12px;background:rgba(80,227,164,0.08);border-radius:8px">
          <div style="font-size:2rem;font-weight:bold;color:#50e3a4">${state.level}</div>
          <div style="font-size:0.8rem;opacity:0.6">Level</div>
        </div>
        <div style="text-align:center;padding:12px;background:rgba(80,227,164,0.08);border-radius:8px">
          <div style="font-size:2rem;font-weight:bold;color:#f0c040">${state.gold}</div>
          <div style="font-size:0.8rem;opacity:0.6">Gold</div>
        </div>
        <div style="text-align:center;padding:12px;background:rgba(80,227,164,0.08);border-radius:8px">
          <div style="font-size:2rem;font-weight:bold;color:#50e3a4">${state.totalStudyMinutes}</div>
          <div style="font-size:0.8rem;opacity:0.6">Total Minutes</div>
        </div>
        <div style="text-align:center;padding:12px;background:rgba(80,227,164,0.08);border-radius:8px">
          <div style="font-size:2rem;font-weight:bold;color:#50e3a4">${state.streak}</div>
          <div style="font-size:0.8rem;opacity:0.6">Streak</div>
        </div>
        <div style="text-align:center;padding:12px;background:rgba(80,227,164,0.08);border-radius:8px">
          <div style="font-size:2rem;font-weight:bold;color:#50e3a4">${state.vocabList.length}</div>
          <div style="font-size:0.8rem;opacity:0.6">Words</div>
        </div>
        <div style="text-align:center;padding:12px;background:rgba(80,227,164,0.08);border-radius:8px">
          <div style="font-size:2rem;font-weight:bold;color:#50e3a4">${state.totalReviews > 0 ? Math.round((state.totalCorrect / state.totalReviews) * 100) : 0}%</div>
          <div style="font-size:0.8rem;opacity:0.6">Accuracy</div>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Skill Levels</h3>
      ${Object.entries(state.skills)
				.map(([k, v]) => {
					const pct = Math.min(
						100,
						Math.round((v.exp / expForLevel(v.level)) * 100),
					);
					return `<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between"><span>${k.charAt(0).toUpperCase() + k.slice(1)}</span><span>Lv.${v.level} (${pct}%)</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>`;
				})
				.join('')}
    </div>
    <div class="card">
      <h3>Sphere Grid Progress</h3>
      <p>Nodes unlocked: ${state.unlockedNodes.length} / ${SPHERE_NODES.length}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${Math.round((state.unlockedNodes.length / SPHERE_NODES.length) * 100)}%"></div></div>
    </div>
    <div class="card">
      <h3>Data Management</h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" id="btn-export">Export Save</button>
        <button class="btn btn-secondary" id="btn-import">Import Save</button>
        <button class="btn" id="btn-reset" style="background:#ef4444">Reset All</button>
      </div>
      <input type="file" id="import-file" style="display:none" accept=".json">
    </div>
  `;

	$('#btn-export').addEventListener('click', exportSave);
	$('#btn-import').addEventListener('click', () => $('#import-file').click());
	$('#import-file').addEventListener('change', importSave);
	$('#btn-reset').addEventListener('click', () => {
		if (confirm('Are you sure? This will delete ALL data!')) {
			if (confirm('Really? This cannot be undone!')) {
				localStorage.removeItem('linguaquest_state');
				state = JSON.parse(JSON.stringify(DEFAULT_STATE));
				saveState();
				switchTab('home');
			}
		}
	});
}

function exportSave() {
	const blob = new Blob([JSON.stringify(state, null, 2)], {
		type: 'application/json',
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'linguaquest_save_' + todayKey() + '.json';
	a.click();
	URL.revokeObjectURL(url);
}

function importSave(e) {
	const file = e.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = (ev) => {
		try {
			const data = JSON.parse(ev.target.result);
			state = data;
			saveState();
			alert('Save imported successfully!');
			switchTab('home');
		} catch (err) {
			alert('Invalid save file!');
		}
	};
	reader.readAsText(file);
}

// ============================================================
//  CLOCK (Header)
// ============================================================
function updateClock() {
	const clockEl = $('#header-clock');
	if (!clockEl) return;
	const now = new Date();
	const h = String(now.getHours()).padStart(2, '0');
	const m = String(now.getMinutes()).padStart(2, '0');
	const s = String(now.getSeconds()).padStart(2, '0');
	clockEl.textContent = h + ':' + m + ':' + s;
}

// ============================================================
//  PARTICLES (Background effect)
// ============================================================
function initParticles() {
	const container = $('#particles');
	if (!container) return;
	for (let i = 0; i < 30; i++) {
		const p = document.createElement('div');
		p.className = 'particle';
		p.style.cssText = `
      position:absolute;
      width:${2 + Math.random() * 4}px;
      height:${2 + Math.random() * 4}px;
      background:rgba(80,227,164,${0.1 + Math.random() * 0.3});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:float ${8 + Math.random() * 12}s ease-in-out infinite;
      animation-delay:${Math.random() * 5}s;
    `;
		container.appendChild(p);
	}
}

// ============================================================
//  INITIALIZATION
// ============================================================
function init() {
	loadState();
	initNav();
	initParticles();
	updateClock();
	setInterval(updateClock, 1000);
	switchTab('home');
	console.log(
		'✅ LinguaQuest initialized — Lv.' +
			state.level +
			' ' +
			(state.playerName || 'Adventurer'),
	);
}

// Wait for DOM
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
