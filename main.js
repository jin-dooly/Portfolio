/* ── 1. 잔디 히어로 ──
 * 첫 프로젝트 시작 주부터 이 페이지를 연 날까지 칸을 만들고,
 * 프로젝트를 진행한 날(GitHub 커밋 기록 기준 첫날~마지막 날)에만 색을 칠한다. */
const P = [
  { name: 'I HATE YOU', from: '2026-07-14', to: '2026-09-17', e: '2026.07  시행착오',
    p: '기획서 없이 기능 단위로 AI에게 요청했더니 <b>결과물이 매번 달라졌습니다.</b>' },
  { name: 'dear-mind', from: '2026-09-22', to: '2026-10-13', e: '2026.09  프로세스 도입',
    p: '<b>기획서를 기준 문서로</b> 두고 화면설계, 디자인, 개발 순서로 진행했습니다. Next.js, Supabase, Vercel.' },
  { name: '오목', from: '2026-10-17', to: '2026-10-19', e: '2026.10  검증 체계',
    p: '화면 11개. AI가 변경 이유를 설명하면 <b>직접 읽고 커밋</b>하고, 테스트와 CI로 검증했습니다.' },
  { name: '내 머리 위 비행기', from: '2026-11-08', to: '2026-11-09', e: '2026.11  적용',
    p: '<b>2일 만에 MVP 배포.</b> 구현은 AI 팀원이, 판단과 검증은 직접합니다. 지금도 진행중입니다.' },
];

const DAY = 864e5;
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const days = (a, b) => Math.round((b - a) / DAY) + 1;

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const first = parse(P[0].from);
const last = new Date(Math.max(today, parse(P[P.length - 1].to)));
const start = new Date(first); start.setDate(first.getDate() - first.getDay()); // 그 주 일요일부터 (시작 전 칸은 비워 둠)

const grass = document.getElementById('grass');
const gMonths = document.getElementById('gMonths');
const cells = [];
let col = 0, lastMonth = -1;
for (let d = new Date(start); d <= last; d.setDate(d.getDate() + 1)) {
  const el = document.createElement('i');
  {
    el.dataset.key = key(d);
    el.dataset.tip = `${d.getMonth() + 1}월 ${d.getDate()}일`;
    if (+d === +today) { el.classList.add('today'); el.dataset.tip += ' · 오늘'; }
  }
  if (d.getDay() === 0 && d > start) col++;
  if (d >= first && d.getMonth() !== lastMonth && (d.getDate() <= 7 || lastMonth === -1)) {
    lastMonth = d.getMonth();
    const s = document.createElement('span'); s.textContent = `${d.getMonth() + 1}월`; s.dataset.col = col;
    gMonths.appendChild(s);
  }
  grass.appendChild(el); cells.push(el);
}
const weeks = col + 1;

// 프로젝트별 칸
P.forEach((p, i) => {
  const a = parse(p.from), b = parse(p.to);
  p.days = days(a, b);
  p.cells = cells.filter((c) => c.dataset.key && c.dataset.key >= p.from && c.dataset.key <= p.to);
  p.cells.forEach((c) => (c.dataset.tip += ` · ${p.name}`));
});
document.getElementById('gRange').textContent =
  `${first.getFullYear()}.${first.getMonth() + 1}.${first.getDate()} ~ 오늘`;

// 칸 크기를 화면 폭에 맞춤
const wrap = document.getElementById('grassWrap');
function fit() {
  const w = wrap.clientWidth - 36 - 26; // 테두리 안쪽 여백, 요일 칸
  const gap = w / weeks < 16 ? 3 : 4;
  const c = Math.max(8, Math.min(26, Math.floor((w - gap * (weeks - 1)) / weeks)));
  wrap.style.setProperty('--c', c + 'px'); wrap.style.setProperty('--g', gap + 'px');
  gMonths.querySelectorAll('span').forEach((s) => (s.style.left = s.dataset.col * (c + gap) + 'px'));
}
fit(); addEventListener('resize', fit);

// 단계 전환
const num = document.getElementById('num'), proj = document.getElementById('proj'),
  eb = document.getElementById('eyebrow'), steps = [...document.querySelectorAll('#steps i')];
let shown = -1, curNum = 0;
function animNum(to) {
  const from = curNum; curNum = to; const t0 = performance.now();
  (function f(t) {
    const k = Math.min(1, (t - t0) / 700);
    num.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}
function set(i) {
  if (i === shown) return; shown = i; const p = P[i];
  eb.textContent = p.e;
  proj.innerHTML = `<h2>${p.name}</h2><p>${p.p}</p>`;
  steps.forEach((s, k) => s.classList.toggle('on', k <= i));
  animNum(p.days);
  cells.forEach((c) => { c.classList.remove('lit', 'past'); c.style.transitionDelay = '0s'; });
  P.forEach((q, k) => { if (k < i) q.cells.forEach((c) => c.classList.add('past')); });
  const step = Math.min(30, 700 / p.cells.length);
  p.cells.forEach((c, k) => { c.style.transitionDelay = k * step + 'ms'; c.classList.add('lit'); });
}

const sc = document.getElementById('scroller'), hint = document.getElementById('hint'), hd = document.getElementById('hd');
function onScroll() {
  const r = sc.getBoundingClientRect();
  const prog = Math.min(0.999, Math.max(0, -r.top / (r.height - innerHeight)));
  set(Math.floor(prog * P.length));
  hint.style.opacity = prog > 0.05 ? 0 : 1;
  hd.classList.toggle('solid', r.bottom < innerHeight * 0.5);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* 나타나기 */
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ── 5. 회사 근무 기간 칸 (2024.08 ~ 2026.01, 18개월) ── */
const months = document.getElementById('months'), M = [];
for (let k = 0; k < 18; k++) {
  const y = 2024 + Math.floor((7 + k) / 12), m = ((7 + k) % 12) + 1;
  const el = document.createElement('i');
  el.dataset.m = m + '월'; el.dataset.key = y + '-' + String(m).padStart(2, '0');
  if (m === 1 || k === 0) { el.classList.add('y'); el.dataset.y = y; }
  months.appendChild(el); M.push(el);
}
const light = (from, to) => M.forEach((el) => el.classList.toggle('on', !!from && el.dataset.key >= from && el.dataset.key <= to));
const cards = [...document.querySelectorAll('.c')];
const activate = (c) => { cards.forEach((x) => x.classList.toggle('active', x === c)); light(c && c.dataset.from, c && c.dataset.to); };
cards.forEach((c) => c.addEventListener('mouseenter', () => activate(c)));
document.querySelector('.clist').addEventListener('mouseleave', () => activate(null));
if (matchMedia('(hover: none)').matches) {
  const io2 = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && activate(e.target)),
    { rootMargin: '-45% 0px -45% 0px' });
  cards.forEach((c) => io2.observe(c));
}
