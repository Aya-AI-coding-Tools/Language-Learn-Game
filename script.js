// ============================================
// LinguaQuest — Complete SPA JavaScript
// Languages: English + Cantonese (2 languages)
// ============================================

// === ROUTER ===
const Router = (() => {
	const pages = [
		'home',
		'timer',
		'calendar',
		'vocab',
		'review',
		'character',
		'sphere',
		'report',
	];
	function go(page) {
		pages.forEach((p) => {
			const el = document.getElementById('page-' + p);
			if (el) el.style.display = p === page ? 'block' : 'none';
		});
		document.querySelectorAll('.nav-link').forEach((a) => {
			a.classList.toggle('active', a.dataset.page === page);
		});
		window.scrollTo(0, 0);
		// Page-specific init
		if (page === 'home') HomePage.render();
		if (page === 'calendar') CalendarApp.init();
		if (page === 'vocab') VocabApp.render();
		if (page === 'review') ReviewApp.init();
		if (page === 'character') CharApp.render();
		if (page === 'sphere') SphereGrid.init();
		if (page === 'report') ReportApp.render();
	}
	function init() {
		document.querySelectorAll('.nav-link').forEach((a) => {
			a.addEventListener('click', (e) => {
				e.preventDefault();
				go(a.dataset.page);
			});
		});
		go('home');
	}
	return { go, init };
})();

// === APP CORE ===
const App = (() => {
	const SK = {
		log: 'lq_log',
		streak: 'lq_streak',
		best: 'lq_best',
		vocab: 'lq_vocab',
		exp: 'lq_exp',
		level: 'lq_lv',
		crystals: 'lq_cry',
		points: 'lq_pts',
		char: 'lq_char',
		tree: 'lq_tree',
	};
	function init() {
		const d = {
			[SK.log]: '{}',
			[SK.streak]: '0',
			[SK.best]: '0',
			[SK.vocab]: '[]',
			[SK.exp]: '0',
			[SK.level]: '1',
			[SK.crystals]: '0',
			[SK.points]: '0',
			[SK.char]: JSON.stringify({ ancestry: 'human', cls: 'fighter' }),
			[SK.tree]: '{}',
		};
		for (const [k, v] of Object.entries(d)) {
			if (!localStorage.getItem(k)) localStorage.setItem(k, v);
		}
	}
	function todayKey() {
		const d = new Date();
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	}
	function getLog() {
		return JSON.parse(localStorage.getItem(SK.log) || '{}');
	}
	function logStudy(lang, mins) {
		const l = getLog(),
			t = todayKey();
		if (!l[t]) l[t] = {};
		l[t][lang] = (l[t][lang] || 0) + mins;
		localStorage.setItem(SK.log, JSON.stringify(l));
		updateStreak();
	}
	function updateStreak() {
		const l = getLog();
		let s = 0,
			d = new Date();
		while (true) {
			const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
			if (l[k] && Object.keys(l[k]).length > 0) {
				s++;
				d.setDate(d.getDate() - 1);
			} else break;
		}
		localStorage.setItem(SK.streak, String(s));
		const b = parseInt(localStorage.getItem(SK.best) || '0');
		if (s > b) localStorage.setItem(SK.best, String(s));
	}
	function getStreak() {
		return parseInt(localStorage.getItem(SK.streak) || '0');
	}
	function getBest() {
		return parseInt(localStorage.getItem(SK.best) || '0');
	}
	function getExp() {
		return parseInt(localStorage.getItem(SK.exp) || '0');
	}
	function getLv() {
		return parseInt(localStorage.getItem(SK.level) || '1');
	}
	function getCry() {
		return parseInt(localStorage.getItem(SK.crystals) || '0');
	}
	function getPts() {
		return parseInt(localStorage.getItem(SK.points) || '0');
	}
	function expNeeded(lv) {
		return Math.floor(100 * Math.pow(1.15, lv - 1));
	}
	function addExp(a) {
		let e = getExp() + a,
			lv = getLv(),
			n = expNeeded(lv);
		while (e >= n) {
			e -= n;
			lv++;
			n = expNeeded(lv);
		}
		localStorage.setItem(SK.exp, String(e));
		localStorage.setItem(SK.level, String(lv));
	}
	function addCry(a) {
		localStorage.setItem(SK.crystals, String(getCry() + a));
	}
	function spendCry(a) {
		const c = getCry();
		if (c >= a) {
			localStorage.setItem(SK.crystals, String(c - a));
			return true;
		}
		return false;
	}
	function addPts(a) {
		localStorage.setItem(SK.points, String(getPts() + a));
	}
	function spendPts(a) {
		const p = getPts();
		if (p >= a) {
			localStorage.setItem(SK.points, String(p - a));
			return true;
		}
		return false;
	}
	function getVocab() {
		return JSON.parse(localStorage.getItem(SK.vocab) || '[]');
	}
	function saveVocab(v) {
		localStorage.setItem(SK.vocab, JSON.stringify(v));
	}
	function getChar() {
		return JSON.parse(localStorage.getItem(SK.char) || '{}');
	}
	function saveChar(c) {
		localStorage.setItem(SK.char, JSON.stringify(c));
	}
	function getTree() {
		return JSON.parse(localStorage.getItem(SK.tree) || '{}');
	}
	function saveTree(t) {
		localStorage.setItem(SK.tree, JSON.stringify(t));
	}
	function title(lv) {
		if (lv >= 51) return 'Archon of Language';
		if (lv >= 31) return 'Legendary Linguist';
		if (lv >= 21) return 'Master of Tongues';
		if (lv >= 11) return 'Polyglot Adventurer';
		if (lv >= 6) return 'Journeyman of Words';
		return 'Apprentice Linguist';
	}
	// World clocks
	function startClocks() {
		function u() {
			const n = new Date();
			const f = (tz) =>
				n.toLocaleTimeString('ja-JP', {
					timeZone: tz,
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: false,
				});
			const jp = document.getElementById('clockJP'),
				hk = document.getElementById('clockHK');
			if (jp) jp.textContent = f('Asia/Tokyo');
			if (hk) hk.textContent = f('Asia/Hong_Kong');
		}
		u();
		setInterval(u, 1000);
	}
	// Particles
	function particles() {
		const c = document.getElementById('particles');
		if (!c) return;
		c.innerHTML = '';
		for (let i = 0; i < 20; i++) {
			const p = document.createElement('div');
			p.className = 'particle';
			p.style.left = Math.random() * 100 + '%';
			p.style.animationDelay = Math.random() * 8 + 's';
			p.style.animationDuration = 6 + Math.random() * 6 + 's';
			p.style.width = p.style.height = 2 + Math.random() * 5 + 'px';
			c.appendChild(p);
		}
	}
	// Notifications
	function initNotif() {
		if ('Notification' in window && Notification.permission === 'default')
			document.addEventListener(
				'click',
				() => {
					Notification.requestPermission();
				},
				{ once: true },
			);
		setInterval(() => {
			const n = new Date();
			if (n.getHours() === 22 && n.getMinutes() === 0) {
				if ('Notification' in window && Notification.permission === 'granted') {
					const l = getLog(),
						t = todayKey(),
						dl = l[t];
					if (!dl || !Object.keys(dl).length)
						new Notification('LinguaQuest ✦', {
							body: '冒険者よ、今日の学習がまだだよ！',
						});
					const v = getVocab(),
						now = new Date().toISOString().split('T')[0];
					const due = v.filter((w) => w.next_review <= now).length;
					if (due > 0)
						setTimeout(
							() =>
								new Notification('LinguaQuest 📖', {
									body: `復習すべき単語が${due}個！`,
								}),
							3000,
						);
				}
			}
		}, 60000);
	}
	return {
		init,
		todayKey,
		getLog,
		logStudy,
		updateStreak,
		getStreak,
		getBest,
		getExp,
		getLv,
		getCry,
		getPts,
		expNeeded,
		addExp,
		addCry,
		spendCry,
		addPts,
		spendPts,
		getVocab,
		saveVocab,
		getChar,
		saveChar,
		getTree,
		saveTree,
		title,
		startClocks,
		particles,
		initNotif,
	};
})();

// === HOME PAGE ===
const HomePage = (() => {
	function render() {
		const s = App.getStreak();
		document.getElementById('streakCount').textContent = s;
		const fl = document.getElementById('streakFlame');
		fl.textContent = s >= 30 ? '🌟' : s >= 7 ? '🔥' : s > 0 ? '✨' : '💤';
		const h = new Date().getHours();
		document.getElementById('heroGreetingText').textContent =
			h < 12
				? 'おはよう、冒険者'
				: h < 18
					? 'こんにちは、冒険者'
					: 'おかえりなさい、冒険者';
		const t = App.todayKey(),
			log = App.getLog(),
			dl = log[t] || {};
		const cfg = {
			en: { el: 'statEnToday', bar: 'statEnBar', max: 35 },
			yue: { el: 'statYueToday', bar: 'statYueBar', max: 20 },
		};
		for (const [lang, c] of Object.entries(cfg)) {
			const m = dl[lang] || 0;
			document.getElementById(c.el).textContent =
				m > 0 ? m + '分 完了' : '未学習';
			document.getElementById(c.bar).style.width =
				Math.min(100, (m / c.max) * 100) + '%';
		}
		// Review
		const vocab = App.getVocab(),
			now = new Date().toISOString().split('T')[0];
		const due = vocab.filter((w) => w.next_review <= now);
		const rs = document.getElementById('homeReviewSection');
		if (due.length > 0) {
			rs.style.display = 'block';
			document.getElementById('homeRevEn').textContent =
				'EN: ' + due.filter((w) => w.language === 'en').length;
			document.getElementById('homeRevYue').textContent =
				'YUE: ' + due.filter((w) => w.language === 'yue').length;
			document.getElementById('homeReviewMsg').textContent =
				due.length + '個の単語が復習を待っています！';
		} else {
			rs.style.display = 'none';
		}
		// Schedule
		const tl = document.getElementById('scheduleTimeline');
		if (Object.keys(dl).length > 0) {
			tl.innerHTML =
				'<div class="schedule-item"><div class="schedule-dot done"></div><div class="schedule-text">今日の学習完了！おつかれさま 🎉</div></div>';
		} else {
			tl.innerHTML =
				'<div class="schedule-item"><div class="schedule-dot"></div><div class="schedule-text">🇺🇸 English — Speaking + Writing</div></div>' +
				'<div class="schedule-item"><div class="schedule-dot"></div><div class="schedule-text">🇭🇰 廣東話 — 会話 + 声調練習</div></div>' +
				'<div class="schedule-item"><div class="schedule-dot"></div><div class="schedule-text">📖 復習 — フラッシュカード</div></div>';
		}
	}
	return { render };
})();

// === TIMER ===
const TimerApp = (() => {
	let mode = null,
		lang = null,
		phases = [],
		cp = 0,
		secLeft = 0,
		totalSec = 0,
		iv = null,
		paused = false,
		studied = 0;
	const CIRC = 2 * Math.PI * 90;
	function selectMode(m) {
		mode = m;
		phases =
			m === 'full'
				? [
						{ type: 'study', dur: 900 },
						{ type: 'rest', dur: 1800 },
						{ type: 'study', dur: 900 },
					]
				: [{ type: 'study', dur: 900 }];
		hide('timerModeSelect');
		show('timerLangSelect');
	}
	function selectLang(l) {
		lang = l;
		document.getElementById('timerLangLabel').textContent =
			l === 'en' ? '🇺🇸 English' : '🇭🇰 廣東話';
		hide('timerLangSelect');
		show('timerDisplay');
		setupPhase(0);
		renderQueue();
	}
	function setupPhase(i) {
		cp = i;
		const ph = phases[i];
		secLeft = ph.dur;
		totalSec = ph.dur;
		const lbl = document.getElementById('phaseLabel'),
			ring = document.getElementById('timerRingProgress');
		if (ph.type === 'study') {
			lbl.textContent = '⚔️ 学習フェーズ';
			lbl.className = 'timer-phase-label';
			ring.classList.remove('rest');
		} else {
			lbl.textContent = '🌿 休憩フェーズ';
			lbl.className = 'timer-phase-label rest';
			ring.classList.add('rest');
		}
		const sn = phases.filter((p, j) => p.type === 'study' && j <= i).length;
		const st = phases.filter((p) => p.type === 'study').length;
		document.getElementById('setLabel').textContent = `セット ${sn}/${st}`;
		updDisp();
		updRing();
		renderQueue();
	}
	function updDisp() {
		const m = Math.floor(secLeft / 60),
			s = secLeft % 60;
		document.getElementById('timerTime').textContent =
			String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
		document.getElementById('totalStudied').textContent =
			'学習: ' + Math.floor(studied / 60) + '分';
	}
	function updRing() {
		const p = 1 - secLeft / totalSec;
		document.getElementById('timerRingProgress').style.strokeDashoffset =
			CIRC * (1 - p);
	}
	function start() {
		if (iv) return;
		paused = false;
		hide('btnStart');
		show('btnPause');
		show('btnStop');
		hide('btnResume');
		iv = setInterval(() => {
			secLeft--;
			if (phases[cp].type === 'study') studied++;
			updDisp();
			updRing();
			if (secLeft <= 0) {
				clearInterval(iv);
				iv = null;
				phaseEnd();
			}
		}, 1000);
	}
	function pause() {
		if (iv) {
			clearInterval(iv);
			iv = null;
			paused = true;
			hide('btnPause');
			show('btnResume');
		}
	}
	function resume() {
		if (paused) {
			paused = false;
			show('btnPause');
			hide('btnResume');
			start();
		}
	}
	function stop() {
		clearInterval(iv);
		iv = null;
		sessionEnd();
	}
	function phaseEnd() {
		try {
			const ctx = new (window.AudioContext || window.webkitAudioContext)(),
				o = ctx.createOscillator(),
				g = ctx.createGain();
			o.connect(g);
			g.connect(ctx.destination);
			o.frequency.value = 523.25;
			g.gain.value = 0.3;
			o.start();
			setTimeout(() => {
				o.stop();
				ctx.close();
			}, 400);
		} catch (e) {}
		renderQueue();
		if (cp < phases.length - 1) {
			setupPhase(cp + 1);
			setTimeout(() => start(), 1500);
		} else sessionEnd();
	}
	function sessionEnd() {
		hide('timerDisplay');
		show('timerComplete');
		const mins = Math.floor(studied / 60),
			exp = mins * 3 + (mode === 'full' ? 15 : 5),
			cry = 10 + (mode === 'full' ? 5 : 0);
		document.getElementById('completeMinutes').textContent = mins;
		document.getElementById('completeExp').textContent = '+' + exp;
		document.getElementById('completeCrystal').textContent = '+' + cry;
		App.logStudy(lang, mins);
		App.addExp(exp);
		App.addCry(cry);
		App.addPts(Math.floor(mins / 2));
		if ('Notification' in window && Notification.permission === 'granted')
			new Notification('LinguaQuest ✦', {
				body: `冒険完了！${mins}分学習 +${exp}EXP`,
			});
	}
	function reset() {
		mode = null;
		lang = null;
		phases = [];
		cp = 0;
		secLeft = 0;
		studied = 0;
		paused = false;
		if (iv) clearInterval(iv);
		iv = null;
		hide('timerComplete');
		hide('timerDisplay');
		hide('timerLangSelect');
		show('timerModeSelect');
		show('btnStart');
		hide('btnPause');
		hide('btnResume');
		hide('btnStop');
	}
	function renderQueue() {
		const c = document.getElementById('pomoQueue');
		if (!c) return;
		let h =
			'<div class="pomo-queue-title">ポモドーロ進行</div><div class="pomo-steps">';
		phases.forEach((p, i) => {
			const lb = p.type === 'study' ? `⚔️${p.dur / 60}分` : `🌿${p.dur / 60}分`;
			let cl = 'pomo-step';
			if (p.type === 'rest') cl += ' rest';
			if (i < cp) cl += ' done';
			if (i === cp) cl += ' active';
			h += `<span class="${cl}">${lb}</span>`;
			if (i < phases.length - 1)
				h += '<span style="color:var(--text-muted)">→</span>';
		});
		h += '</div>';
		c.innerHTML = h;
	}
	function show(id) {
		const el = document.getElementById(id);
		if (el) el.style.display = id.startsWith('btn') ? 'inline-block' : 'block';
	}
	function hide(id) {
		const el = document.getElementById(id);
		if (el) el.style.display = 'none';
	}
	return { selectMode, selectLang, start, pause, resume, stop, reset };
})();

// === CALENDAR ===
const CalendarApp = (() => {
	let vy, vm;
	function init() {
		const n = new Date();
		vy = n.getFullYear();
		vm = n.getMonth();
		render();
	}
	function render() {
		const s = App.getStreak(),
			b = App.getBest();
		document.getElementById('calStreakCount').textContent = s;
		document.getElementById('calStreakBest').textContent = b;
		document.getElementById('calStreakFlame').textContent =
			s >= 30 ? '🌟' : s >= 7 ? '🔥' : s > 0 ? '✨' : '💤';
		document.getElementById('calMonthLabel').textContent = `${vy}年${vm + 1}月`;
		const bd = document.getElementById('calBody');
		bd.innerHTML = '';
		const log = App.getLog(),
			fd = new Date(vy, vm, 1).getDay(),
			dim = new Date(vy, vm + 1, 0).getDate(),
			tk = App.todayKey();
		for (let i = 0; i < fd; i++) {
			const c = document.createElement('div');
			c.className = 'cal-day empty';
			bd.appendChild(c);
		}
		for (let d = 1; d <= dim; d++) {
			const k = `${vy}-${String(vm + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
			const c = document.createElement('div');
			c.className = 'cal-day';
			c.textContent = d;
			if (k === tk) c.classList.add('today');
			if (log[k] && Object.keys(log[k]).length) c.classList.add('studied');
			c.addEventListener('click', () => showDetail(k, d));
			bd.appendChild(c);
		}
		document.getElementById('calDetail').style.display = 'none';
		// Stats
		let sd = 0,
			tm = 0;
		for (let d = 1; d <= dim; d++) {
			const k = `${vy}-${String(vm + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
			if (log[k] && Object.keys(log[k]).length) {
				sd++;
				for (const m of Object.values(log[k])) tm += m;
			}
		}
		const n = new Date();
		let mx = dim;
		if (vy === n.getFullYear() && vm === n.getMonth()) mx = n.getDate();
		document.getElementById('calMonthDays').textContent = sd;
		document.getElementById('calMonthMins').textContent = tm;
		document.getElementById('calMonthRate').textContent =
			(mx > 0 ? Math.round((sd / mx) * 100) : 0) + '%';
	}
	function showDetail(k, d) {
		const log = App.getLog(),
			dl = log[k] || {};
		document.getElementById('calDetailDate').textContent =
			`${vy}年${vm + 1}月${d}日`;
		const la = document.getElementById('calDetailLangs');
		const nm = { en: '🇺🇸 English', yue: '🇭🇰 廣東話' };
		if (!Object.keys(dl).length) {
			la.innerHTML = '<p style="color:var(--text-muted)">記録なし</p>';
		} else {
			let h = '';
			for (const [l, m] of Object.entries(dl))
				h += `<div style="display:flex;gap:10px;font-size:.85rem;color:var(--text-secondary)"><span>${nm[l] || l}</span><span>${m}分</span></div>`;
			la.innerHTML = h;
		}
		document.getElementById('calDetail').style.display = 'block';
	}
	function prev() {
		vm--;
		if (vm < 0) {
			vm = 11;
			vy--;
		}
		render();
	}
	function next() {
		vm++;
		if (vm > 11) {
			vm = 0;
			vy++;
		}
		render();
	}
	return { init, prev, next };
})();

// === VOCAB ===
const VocabApp = (() => {
	let lang = 'en';
	function setLang(l) {
		lang = l;
		document
			.querySelectorAll('.vocab-tab')
			.forEach((t) => t.classList.toggle('active', t.dataset.lang === l));
		render();
	}
	function render() {
		const v = App.getVocab().filter((w) => w.language === lang);
		document.getElementById('vocabCount').textContent = v.length + '語';
		const list = document.getElementById('vocabList');
		if (!v.length) {
			list.innerHTML =
				'<div style="text-align:center;padding:40px;color:var(--text-muted)">まだ単語がありません</div>';
			return;
		}
		let h = '';
		v.forEach((w, i) => {
			const st = w.status || 'new';
			h += `<div class="vocab-item glass-card">
        <img class="vocab-img" src="${esc(w.image_url || '')}" alt="" onerror="this.style.display='none'">
        <div class="vocab-info">
          <span class="vocab-word">${esc(w.word)}</span>
          <span class="vocab-meaning">${esc(w.meaning_jp)}</span>
          <span class="vocab-pron">🗣️ ${esc(w.pronunciation || '')}${w.jyutping ? ' 🔤' + esc(w.jyutping) : ''}</span>
        </div>
        <div class="vocab-meta">
          <span class="vocab-status ${st}">${st === 'new' ? '⭐New' : st === 'learning' ? '🔄Learn' : '✅Master'}</span>
          <span>${w.next_review || ''}</span>
          <button onclick="VocabApp.remove(${i})" style="color:var(--danger);font-size:.72rem">削除</button>
        </div>
      </div>`;
		});
		list.innerHTML = h;
	}
	function add() {
		const w = document.getElementById('inputWord').value.trim();
		const m = document.getElementById('inputMeaning').value.trim();
		if (!w || !m) return alert('単語と意味は必須');
		const p = document.getElementById('inputPron').value.trim();
		const j = document.getElementById('inputJyutping').value.trim();
		const ex = document.getElementById('inputExample').value.trim();
		const today = new Date().toISOString().split('T')[0];
		const entry = {
			id: Date.now().toString(),
			language: lang,
			word: w,
			meaning_jp: m,
			pronunciation: p,
			jyutping: j,
			tone: '',
			example: ex,
			image_url: `https://source.unsplash.com/featured/120x120/?${encodeURIComponent(w)}`,
			date_added: today,
			next_review: today,
			interval_days: 1,
			ease_factor: 2.5,
			review_count: 0,
			status: 'new',
		};
		const v = App.getVocab();
		v.push(entry);
		App.saveVocab(v);
		[
			'inputWord',
			'inputMeaning',
			'inputPron',
			'inputJyutping',
			'inputExample',
		].forEach((id) => {
			const el = document.getElementById(id);
			if (el) el.value = '';
		});
		render();
	}
	function remove(idx) {
		const all = App.getVocab(),
			filtered = all.filter((w) => w.language === lang);
		const target = filtered[idx];
		if (!target) return;
		const i = all.findIndex((w) => w.id === target.id);
		if (i >= 0) {
			all.splice(i, 1);
			App.saveVocab(all);
			render();
		}
	}
	function importCSV() {
		const raw = document.getElementById('csvArea').value.trim();
		if (!raw) return;
		const lines = raw.split('\n'),
			today = new Date().toISOString().split('T')[0],
			v = App.getVocab();
		lines.forEach((line) => {
			const p = line.split(',').map((s) => s.trim());
			if (p.length >= 2) {
				v.push({
					id: Date.now().toString() + Math.random(),
					language: lang,
					word: p[0],
					meaning_jp: p[1],
					pronunciation: p[2] || '',
					jyutping: p[3] || '',
					tone: p[4] || '',
					example: p[5] || '',
					image_url: `https://source.unsplash.com/featured/120x120/?${encodeURIComponent(p[0])}`,
					date_added: today,
					next_review: today,
					interval_days: 1,
					ease_factor: 2.5,
					review_count: 0,
					status: p[6] || 'new',
				});
			}
		});
		App.saveVocab(v);
		document.getElementById('csvArea').value = '';
		render();
	}
	function exportCSV() {
		const v = App.getVocab().filter((w) => w.language === lang);
		const lines = v.map((w) =>
			[
				w.word,
				w.meaning_jp,
				w.pronunciation,
				w.jyutping,
				w.tone,
				w.example,
				w.status,
			].join(','),
		);
		document.getElementById('csvArea').value =
			'word,meaning,pron,jyutping,tone,example,status\n' + lines.join('\n');
	}
	function esc(s) {
		const d = document.createElement('div');
		d.textContent = s;
		return d.innerHTML;
	}
	return { setLang, render, add, remove, importCSV, exportCSV };
})();

// === REVIEW ===
const ReviewApp = (() => {
	let queue = [],
		idx = 0,
		flipped = false;
	function init() {
		const v = App.getVocab(),
			now = new Date().toISOString().split('T')[0];
		queue = v.filter((w) => w.next_review <= now);
		idx = 0;
		flipped = false;
		document.getElementById('revTotal').textContent = queue.length;
		if (!queue.length) {
			document.getElementById('reviewArea').style.display = 'none';
			document.getElementById('reviewDone').style.display = 'block';
			document.getElementById('revDoneCount').textContent = '0';
			return;
		}
		document.getElementById('reviewArea').style.display = 'block';
		document.getElementById('reviewDone').style.display = 'none';
		showCard();
	}
	function showCard() {
		if (idx >= queue.length) {
			finish();
			return;
		}
		flipped = false;
		const w = queue[idx];
		document.getElementById('fcWord').textContent = w.word;
		document.getElementById('fcHint').textContent =
			w.language === 'yue'
				? '🔤 ' + (w.jyutping || '')
				: '🗣️ ' + (w.pronunciation || '');
		document.getElementById('fcMeaning').textContent = w.meaning_jp;
		document.getElementById('fcPron').textContent = w.pronunciation || '';
		document.getElementById('fcExample').textContent = w.example || '';
		const img = document.getElementById('fcImg');
		if (w.image_url) {
			img.src = w.image_url;
			img.style.display = 'block';
		} else {
			img.style.display = 'none';
		}
		document.getElementById('flashcard').classList.remove('flipped');
		document.getElementById('ratingBtns').style.display = 'none';
		document.getElementById('revCurrent').textContent = idx + 1;
	}
	function flip() {
		if (flipped) return;
		flipped = true;
		document.getElementById('flashcard').classList.add('flipped');
		document.getElementById('ratingBtns').style.display = 'flex';
	}
	function rate(score) {
		const w = queue[idx],
			v = App.getVocab(),
			vi = v.findIndex((x) => x.id === w.id);
		if (vi >= 0) {
			let ef = v[vi].ease_factor || 2.5,
				intv = v[vi].interval_days || 1;
			if (score >= 4) {
				intv = Math.round(intv * ef);
				ef += 0.1;
			} else if (score === 3) {
				intv = Math.round(intv * ef);
				ef -= 0.15;
			} else {
				intv = 1;
				ef -= score === 2 ? 0.2 : 0.3;
			}
			if (ef < 1.3) ef = 1.3;
			const next = new Date();
			next.setDate(next.getDate() + intv);
			v[vi].ease_factor = ef;
			v[vi].interval_days = intv;
			v[vi].next_review = next.toISOString().split('T')[0];
			v[vi].review_count = (v[vi].review_count || 0) + 1;
			v[vi].status = score >= 4 ? 'mastered' : score >= 3 ? 'learning' : 'new';
			App.saveVocab(v);
		}
		App.addExp(score >= 4 ? 5 : score >= 3 ? 3 : 1);
		idx++;
		showCard();
	}
	function finish() {
		document.getElementById('reviewArea').style.display = 'none';
		document.getElementById('reviewDone').style.display = 'block';
		document.getElementById('revDoneCount').textContent = queue.length;
	}
	return { init, flip, rate };
})();

// === CHARACTER ===
const CharApp = (() => {
	const ANCS = [
		{ id: 'human', name: '人間', icon: '🧑', desc: 'EXP+10%' },
		{ id: 'elf', name: 'エルフ', icon: '🧝', desc: 'Listening+15%' },
		{ id: 'dwarf', name: 'ドワーフ', icon: '⛏️', desc: 'Writing+15%' },
		{
			id: 'halfling',
			name: 'ハーフリング',
			icon: '🍀',
			desc: 'ストリーク+20%',
		},
		{ id: 'gnome', name: 'ノーム', icon: '🍄', desc: '新単語+15%' },
		{ id: 'orc', name: 'オーク', icon: '💪', desc: 'Speaking+15%' },
		{ id: 'goblin', name: 'ゴブリン', icon: '👺', desc: 'Quick+25%' },
		{ id: 'leshy', name: 'レシー', icon: '🌿', desc: '復習+20%' },
		{ id: 'catfolk', name: 'キャットフォーク', icon: '🐱', desc: '全EXP+5%' },
		{ id: 'tengu', name: 'テング', icon: '👹', desc: '発音+20%' },
		{ id: 'kitsune', name: 'キツネ', icon: '🦊', desc: '多言語+10%' },
		{ id: 'automaton', name: '自動人形', icon: '🤖', desc: 'タイマー完走+15%' },
	];
	const CLS = [
		{ id: 'fighter', name: 'ファイター', icon: '⚔️', desc: 'Speaking+10%' },
		{ id: 'wizard', name: 'ウィザード', icon: '🧙', desc: 'Grammar+20%' },
		{ id: 'bard', name: 'バード', icon: '🎵', desc: 'Listening+発音+15%' },
		{ id: 'rogue', name: 'ローグ', icon: '🗡️', desc: 'ストリーク免除1日/週' },
		{ id: 'cleric', name: 'クレリック', icon: '✝️', desc: '復習効率+15%' },
		{ id: 'ranger', name: 'レンジャー', icon: '🏹', desc: '多言語同日+20%' },
		{ id: 'monk', name: 'モンク', icon: '🥋', desc: '長時間学習+10%' },
		{ id: 'sorcerer', name: 'ソーサラー', icon: '✨', desc: '初回定着UP' },
		{ id: 'alchemist', name: 'アルケミスト', icon: '⚗️', desc: 'Writing+15%' },
		{
			id: 'champion',
			name: 'チャンピオン',
			icon: '🛡️',
			desc: 'Full完走ボーナス',
		},
		{
			id: 'swashbuckler',
			name: 'スワッシュバックラー',
			icon: '🤺',
			desc: '訂正学習+25%',
		},
		{
			id: 'investigator',
			name: 'インベスティゲーター',
			icon: '🔍',
			desc: 'レビュー発見ボーナス',
		},
	];
	function render() {
		const ch = App.getChar();
		const a = ANCS.find((x) => x.id === ch.ancestry) || ANCS[0];
		const cl = CLS.find((x) => x.id === ch.cls) || CLS[0];
		const lv = App.getLv(),
			exp = App.getExp(),
			need = App.expNeeded(lv);
		document.getElementById('charAvatar').textContent = a.icon;
		document.getElementById('charName').textContent =
			`Lv.${lv} ${a.name}の${cl.name}`;
		document.getElementById('charClass').textContent = App.title(lv);
		document.getElementById('charCrystals').textContent = App.getCry();
		document.getElementById('charPoints').textContent = App.getPts();
		document.getElementById('charExpFill').style.width =
			Math.min(100, (exp / need) * 100) + '%';
		document.getElementById('charExpText').textContent = `EXP: ${exp}/${need}`;
		// Ancestries
		let h = '';
		ANCS.forEach((a) => {
			const sel = ch.ancestry === a.id ? 'selected' : '';
			h += `<div class="char-option glass-card ${sel}" onclick="CharApp.pickAnc('${a.id}')"><div class="char-option-icon">${a.icon}</div><div class="char-option-name">${a.name}</div><div class="char-option-desc">${a.desc}</div>${!sel ? '<div class="char-cost">100pt</div>' : ''}</div>`;
		});
		document.getElementById('ancestryGrid').innerHTML = h;
		// Classes
		h = '';
		CLS.forEach((c) => {
			const sel = ch.cls === c.id ? 'selected' : '';
			h += `<div class="char-option glass-card ${sel}" onclick="CharApp.pickCls('${c.id}')"><div class="char-option-icon">${c.icon}</div><div class="char-option-name">${c.name}</div><div class="char-option-desc">${c.desc}</div>${!sel ? '<div class="char-cost">50pt</div>' : ''}</div>`;
		});
		document.getElementById('classGrid').innerHTML = h;
	}
	function pickAnc(id) {
		const ch = App.getChar();
		if (ch.ancestry === id) return;
		if (!App.spendPts(100)) return alert('ポイント不足！(100pt)');
		ch.ancestry = id;
		App.saveChar(ch);
		render();
	}
	function pickCls(id) {
		const ch = App.getChar();
		if (ch.cls === id) return;
		if (!App.spendPts(50)) return alert('ポイント不足！(50pt)');
		ch.cls = id;
		App.saveChar(ch);
		render();
	}
	return { render, pickAnc, pickCls };
})();

// === SPHERE GRID ===
const SphereGrid = (() => {
	const N = [
		// Center
		{
			id: 'core',
			x: 580,
			y: 430,
			name: '言霊の核',
			desc: 'すべての始まり',
			eff: '全EXP+3%',
			cost: 0,
			lang: 'core',
			req: [],
			mx: 1,
			center: true,
		},
		// EN Hub
		{
			id: 'en_hub',
			x: 300,
			y: 280,
			name: 'English',
			desc: '英語エリア',
			eff: '英語EXP+5%',
			cost: 10,
			lang: 'en',
			req: ['core'],
			mx: 1,
			hub: true,
		},
		// EN Speaking
		{
			id: 'en_sp1',
			x: 160,
			y: 180,
			name: 'First Words',
			desc: '最初の一歩',
			eff: 'Speaking+5%',
			cost: 10,
			lang: 'en',
			req: ['en_hub'],
			mx: 3,
		},
		{
			id: 'en_sp2',
			x: 80,
			y: 100,
			name: 'Battle Cry',
			desc: '戦場の雄叫び',
			eff: 'ゲーム会話+8%',
			cost: 15,
			lang: 'en',
			req: ['en_sp1'],
			mx: 3,
		},
		{
			id: 'en_sp3',
			x: 30,
			y: 30,
			name: 'Silver Tongue',
			desc: '銀の舌',
			eff: 'Speaking+12%',
			cost: 25,
			lang: 'en',
			req: ['en_sp2'],
			mx: 3,
		},
		// EN Listening
		{
			id: 'en_ls1',
			x: 280,
			y: 150,
			name: 'Sharp Ear',
			desc: '鋭い耳',
			eff: 'Listening+5%',
			cost: 10,
			lang: 'en',
			req: ['en_hub'],
			mx: 3,
		},
		{
			id: 'en_ls2',
			x: 230,
			y: 70,
			name: 'Voice Chat',
			desc: 'VC力',
			eff: 'Listening+8%',
			cost: 15,
			lang: 'en',
			req: ['en_ls1'],
			mx: 3,
		},
		{
			id: 'en_ls3',
			x: 170,
			y: 10,
			name: 'Echo Master',
			desc: '反響の達人',
			eff: 'Listening+12%',
			cost: 25,
			lang: 'en',
			req: ['en_ls2'],
			mx: 3,
		},
		// EN Writing
		{
			id: 'en_wr1',
			x: 400,
			y: 170,
			name: 'Pen Stroke',
			desc: '筆の一閃',
			eff: 'Writing+5%',
			cost: 10,
			lang: 'en',
			req: ['en_hub'],
			mx: 3,
		},
		{
			id: 'en_wr2',
			x: 450,
			y: 90,
			name: 'Discord Typer',
			desc: '高速入力',
			eff: 'Writing+8%',
			cost: 15,
			lang: 'en',
			req: ['en_wr1'],
			mx: 3,
		},
		{
			id: 'en_wr3',
			x: 480,
			y: 20,
			name: 'Diary Keeper',
			desc: '日記の番人',
			eff: 'Writing+12%',
			cost: 25,
			lang: 'en',
			req: ['en_wr2'],
			mx: 3,
		},
		// EN Vocab
		{
			id: 'en_vc1',
			x: 180,
			y: 310,
			name: 'Word Seed',
			desc: '言葉の種',
			eff: '新単語+5%',
			cost: 10,
			lang: 'en',
			req: ['en_hub'],
			mx: 3,
		},
		{
			id: 'en_vc2',
			x: 100,
			y: 350,
			name: 'Lexicon',
			desc: '辞典',
			eff: '語彙+8%',
			cost: 15,
			lang: 'en',
			req: ['en_vc1'],
			mx: 3,
		},
		// EN Grammar
		{
			id: 'en_gr1',
			x: 400,
			y: 340,
			name: 'Syntax I',
			desc: '構文基礎',
			eff: 'Grammar+5%',
			cost: 10,
			lang: 'en',
			req: ['en_hub'],
			mx: 3,
		},
		{
			id: 'en_gr2',
			x: 460,
			y: 380,
			name: 'Syntax II',
			desc: '構文応用',
			eff: 'Grammar+8%',
			cost: 15,
			lang: 'en',
			req: ['en_gr1'],
			mx: 3,
		},

		// YUE Hub
		{
			id: 'yue_hub',
			x: 860,
			y: 430,
			name: '廣東話',
			desc: '広東語エリア',
			eff: '粤語EXP+5%',
			cost: 10,
			lang: 'yue',
			req: ['core'],
			mx: 1,
			hub: true,
		},
		// YUE Speaking
		{
			id: 'yue_sp1',
			x: 980,
			y: 330,
			name: '你好',
			desc: '挨拶',
			eff: 'Speaking+5%',
			cost: 10,
			lang: 'yue',
			req: ['yue_hub'],
			mx: 3,
		},
		{
			id: 'yue_sp2',
			x: 1060,
			y: 260,
			name: '傾偈',
			desc: 'おしゃべり',
			eff: 'Speaking+8%',
			cost: 15,
			lang: 'yue',
			req: ['yue_sp1'],
			mx: 3,
		},
		{
			id: 'yue_sp3',
			x: 1120,
			y: 190,
			name: '口才',
			desc: '弁舌の才',
			eff: 'Speaking+12%',
			cost: 25,
			lang: 'yue',
			req: ['yue_sp2'],
			mx: 3,
		},
		// YUE Listening
		{
			id: 'yue_ls1',
			x: 960,
			y: 510,
			name: '聽力',
			desc: '聴力',
			eff: 'Listening+5%',
			cost: 10,
			lang: 'yue',
			req: ['yue_hub'],
			mx: 3,
		},
		{
			id: 'yue_ls2',
			x: 1050,
			y: 570,
			name: '聲調耳',
			desc: '声調の耳',
			eff: 'Listening+8%',
			cost: 15,
			lang: 'yue',
			req: ['yue_ls1'],
			mx: 3,
		},
		{
			id: 'yue_ls3',
			x: 1120,
			y: 640,
			name: '六調極',
			desc: '6声の極み',
			eff: 'Listening+12%',
			cost: 25,
			lang: 'yue',
			req: ['yue_ls2'],
			mx: 3,
		},
		// YUE Tone
		{
			id: 'yue_tn1',
			x: 900,
			y: 300,
			name: '聲調練習',
			desc: '声調訓練',
			eff: '発音+10%',
			cost: 15,
			lang: 'yue',
			req: ['yue_hub'],
			mx: 3,
		},
		{
			id: 'yue_tn2',
			x: 870,
			y: 200,
			name: '聲調達人',
			desc: '声調の達人',
			eff: '発音+15%',
			cost: 25,
			lang: 'yue',
			req: ['yue_tn1'],
			mx: 3,
		},
		// YUE Vocab
		{
			id: 'yue_vc1',
			x: 790,
			y: 320,
			name: '生詞',
			desc: '新語',
			eff: 'Vocab+5%',
			cost: 10,
			lang: 'yue',
			req: ['yue_hub'],
			mx: 3,
		},
		{
			id: 'yue_vc2',
			x: 730,
			y: 240,
			name: '詞庫',
			desc: '語彙庫',
			eff: 'Vocab+8%',
			cost: 15,
			lang: 'yue',
			req: ['yue_vc1'],
			mx: 3,
		},
		// YUE Writing
		{
			id: 'yue_wr1',
			x: 980,
			y: 430,
			name: '寫字',
			desc: '書く',
			eff: 'Writing+5%',
			cost: 10,
			lang: 'yue',
			req: ['yue_hub'],
			mx: 3,
		},
		// YUE Grammar
		{
			id: 'yue_gr1',
			x: 810,
			y: 550,
			name: '文法',
			desc: '文法',
			eff: 'Grammar+5%',
			cost: 10,
			lang: 'yue',
			req: ['yue_hub'],
			mx: 3,
		},
		{
			id: 'yue_gr2',
			x: 760,
			y: 640,
			name: '助詞',
			desc: '語気助詞',
			eff: 'Grammar+8%',
			cost: 15,
			lang: 'yue',
			req: ['yue_gr1'],
			mx: 3,
		},

		// Multi
		{
			id: 'multi1',
			x: 580,
			y: 300,
			name: '多言語 I',
			desc: '2言語同日ボーナス',
			eff: '同日+10%',
			cost: 20,
			lang: 'multi',
			req: ['en_hub', 'yue_hub'],
			mx: 3,
		},
		{
			id: 'multi2',
			x: 580,
			y: 560,
			name: '多言語 II',
			desc: '継続ボーナス',
			eff: '全+8%',
			cost: 25,
			lang: 'multi',
			req: ['multi1'],
			mx: 3,
		},
		{
			id: 'multi3',
			x: 580,
			y: 700,
			name: 'Polyglot',
			desc: '多言語の極み',
			eff: '全+12%',
			cost: 30,
			lang: 'multi',
			req: ['multi2'],
			mx: 3,
		},
	];

	let sel = null;

	function init() {
		renderGrid();
		renderInfo();
		renderStats();
	}

	function renderGrid() {
		const cv = document.getElementById('sphereCanvas');
		cv.innerHTML = '';
		const tree = App.getTree();
		// Lines
		N.forEach((n) => {
			n.req.forEach((rid) => {
				const rn = N.find((x) => x.id === rid);
				if (!rn) return;
				const svg = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'svg',
				);
				svg.setAttribute('class', 'sphere-line');
				const x1 = n.x + 23,
					y1 = n.y + 23,
					x2 = rn.x + 23,
					y2 = rn.y + 23;
				const mx = Math.min(x1, x2),
					my = Math.min(y1, y2),
					w = Math.abs(x2 - x1) || 2,
					h = Math.abs(y2 - y1) || 2;
				svg.style.left = mx + 'px';
				svg.style.top = my + 'px';
				svg.style.width = w + 'px';
				svg.style.height = h + 'px';
				svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
				const line = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'line',
				);
				line.setAttribute('x1', x1 - mx);
				line.setAttribute('y1', y1 - my);
				line.setAttribute('x2', x2 - mx);
				line.setAttribute('y2', y2 - my);
				const nlv = tree[n.id] || 0,
					rlv = tree[rn.id] || 0;
				line.setAttribute(
					'stroke',
					nlv > 0 && rlv > 0 ? 'rgba(78,205,196,.4)' : 'rgba(255,255,255,.08)',
				);
				line.setAttribute('stroke-width', '2');
				svg.appendChild(line);
				cv.appendChild(svg);
			});
		});
		// Nodes
		N.forEach((n) => {
			const div = document.createElement('div');
			const lv = tree[n.id] || 0,
				can = canUnlock(n, tree);
			let cls = 'sphere-node';
			if (n.center) cls += ' center-node';
			if (n.hub) cls += ` lang-hub ${n.lang}`;
			if (lv > 0) cls += ' unlocked';
			if (lv >= n.mx && tree['_s_' + n.id]) cls += ' specialized';
			if (lv === 0 && !can) cls += ' locked';
			div.className = cls;
			div.style.left = n.x + 'px';
			div.style.top = n.y + 'px';
			div.innerHTML = `<span>${n.name.replace(/ /g, '<br>')}${lv > 0 && n.mx > 1 ? '<br><small>' + lv + '/' + n.mx + '</small>' : ''}</span>`;
			div.addEventListener('click', () => {
				sel = n;
				renderInfo();
			});
			cv.appendChild(div);
		});
	}

	function canUnlock(node, tree) {
		if (node.id === 'core') return true;
		return node.req.every((r) => (tree[r] || 0) > 0);
	}

	function specCount() {
		const t = App.getTree();
		return Object.keys(t).filter((k) => k.startsWith('_s_') && t[k]).length;
	}

	function renderInfo() {
		const card = document.getElementById('sphereInfoCard');
		if (!sel) {
			card.innerHTML =
				'<p style="color:var(--text-muted)">ノードをクリックして詳細を表示</p>';
			return;
		}
		const n = sel,
			tree = App.getTree(),
			lv = tree[n.id] || 0,
			can = canUnlock(n, tree);
		const spec = tree['_s_' + n.id],
			sc = specCount();
		let h = `<div style="font-family:'Cinzel',serif;font-size:1.05rem;color:var(--gold);margin-bottom:6px">${n.name}</div>`;
		h += `<div style="font-size:.85rem;color:var(--text-secondary);margin-bottom:6px">${n.desc}</div>`;
		h += `<div style="font-size:.82rem;color:var(--green-accent);margin-bottom:6px">${n.eff} (Lv.${lv}/${n.mx})${spec ? ' ★特化(×1.5)' : ''}</div>`;
		if (lv < n.mx && can) {
			h += `<div style="font-size:.8rem;color:var(--yue-color);margin-bottom:8px">💎 ${n.cost} 結晶</div>`;
			h += `<button class="timer-btn start" onclick="SphereGrid.unlock('${n.id}')">解放する</button>`;
		} else if (lv >= n.mx && !spec && n.mx > 1 && sc < 5) {
			h += `<div style="font-size:.8rem;color:var(--yue-color);margin-bottom:8px">💎 50 結晶で特化</div>`;
			h += `<button class="timer-btn start" onclick="SphereGrid.specialize('${n.id}')">特化する</button>`;
		} else if (spec) {
			h += `<button class="timer-btn stop" onclick="SphereGrid.unspec('${n.id}')">特化解除</button>`;
		} else if (lv === 0 && !can) {
			h += `<div style="font-size:.8rem;color:var(--text-muted)">前提ノードを先に解放</div>`;
		}
		card.innerHTML = h;
	}

	function renderStats() {
		const tree = App.getTree();
		document.getElementById('sphereCrystals').textContent = App.getCry();
		document.getElementById('sphereUnlocked').textContent =
			N.filter((n) => (tree[n.id] || 0) > 0).length + '/' + N.length;
		document.getElementById('sphereSpec').textContent = specCount() + '/5';
	}

	function unlock(id) {
		const n = N.find((x) => x.id === id);
		if (!n) return;
		const tree = App.getTree(),
			lv = tree[n.id] || 0;
		if (lv >= n.mx) return;
		if (!canUnlock(n, tree)) return alert('前提ノード未解放');
		if (!App.spendCry(n.cost)) return alert('結晶不足！');
		tree[n.id] = (lv || 0) + 1;
		App.saveTree(tree);
		renderGrid();
		renderInfo();
		renderStats();
	}

	function specialize(id) {
		if (specCount() >= 5) return alert('特化は最大5つ！');
		if (!App.spendCry(50)) return alert('結晶不足！(50)');
		const tree = App.getTree();
		tree['_s_' + id] = true;
		App.saveTree(tree);
		renderGrid();
		renderInfo();
		renderStats();
	}

	function unspec(id) {
		const tree = App.getTree();
		delete tree['_s_' + id];
		App.saveTree(tree);
		renderGrid();
		renderInfo();
		renderStats();
	}

	return { init, unlock, specialize, unspec };
})();

// === REPORT ===
const ReportApp = (() => {
	let period = 7;
	function setPeriod(d) {
		period = d;
		document
			.querySelectorAll('.report-tab')
			.forEach((t) =>
				t.classList.toggle('active', parseInt(t.dataset.days) === d),
			);
		render();
	}
	function render() {
		const log = App.getLog(),
			now = new Date();
		let days = 0,
			total = 0,
			lm = { en: 0, yue: 0 };
		for (let i = 0; i < period; i++) {
			const d = new Date(now);
			d.setDate(d.getDate() - i);
			const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
			const dl = log[k];
			if (dl && Object.keys(dl).length) {
				days++;
				for (const [l, m] of Object.entries(dl)) {
					total += m;
					if (lm[l] !== undefined) lm[l] += m;
				}
			}
		}
		const v = App.getVocab(),
			cutoff = new Date(now);
		cutoff.setDate(cutoff.getDate() - period);
		const words = v.filter(
			(w) => w.date_added >= cutoff.toISOString().split('T')[0],
		).length;
		document.getElementById('rptDays').textContent = days;
		document.getElementById('rptMins').textContent = total;
		document.getElementById('rptWords').textContent = words;
		document.getElementById('rptStreak').textContent = App.getStreak();
		document.getElementById('rptLevel').textContent = 'Lv.' + App.getLv();
		document.getElementById('rptExp').textContent = App.getExp();
		const mx = Math.max(lm.en, lm.yue, 1);
		['en', 'yue'].forEach((l) => {
			document.getElementById('rptBar_' + l).style.width =
				(lm[l] / mx) * 100 + '%';
			document.getElementById('rptMins_' + l).textContent = lm[l] + '分';
		});
	}
	return { setPeriod, render };
})();

// === BOOT ===
document.addEventListener('DOMContentLoaded', () => {
	App.init();
	App.startClocks();
	App.particles();
	App.initNotif();
	Router.init();
});
