const canHover = matchMedia('(hover: hover)');
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

// 첫 화면: 숫자가 자동으로 줄어드는 인터랙션 (66 → 22 → 3 → 2, 반복)
const num = document.getElementById('num'), cntEl = num.parentElement, cntProj = document.getElementById('cntProj'),
  trail = document.getElementById('trail'), playBtn = document.getElementById('playBtn'), hd = document.getElementById('hd');
// 기록 줄은 한 번만 만들고, 단계마다 보이기만 바꾼다 (이미 보인 숫자는 다시 애니메이션하지 않음)
trail.innerHTML = P.map((q, k) => (k ? '<i>→</i>' : '') + `<span>${q.days}일</span>`).join('');
const trailItems = [...trail.children];
// 숫자는 두 자리 롤링(주행거리계처럼 자리마다 굴러감). 한 자리는 앞에 0을 붙이고, 항상 위에서 아래로 굴러간다.
// 각 자리는 0~9를 여러 번 이어 붙인 띠이고, 새 숫자가 늘 위에서 내려오도록 띠의 더 위쪽 칸으로만 이동한다.
const REP = 4;
num.innerHTML = '<span class="roll">' + [0, 1].map(() =>
  '<span class="col">' + Array.from({ length: 10 * REP }, (_, k) => `<span>${k % 10}</span>`).join('') + '</span>').join('') + '</span>';
const rollCols = [...num.querySelectorAll('.col')].map((el) => ({ el, pos: 10 * (REP - 1) }));
function place(c, animate) {
  c.el.style.transition = animate ? '' : 'none';
  c.el.style.transform = `translateY(${-c.pos}em)`;
}
rollCols.forEach((c) => {
  place(c, false);
  // 띠 위쪽 끝에 가까워지면, 굴러간 뒤 같은 숫자의 아래쪽 칸으로 몰래 옮겨 둔다
  c.el.addEventListener('transitionend', () => { if (c.pos < 10) { c.pos += 10 * (REP - 2); place(c, false); } });
});
function setRoll(v, instant) {
  [...String(v).padStart(2, '0')].forEach((ch, k) => {
    const c = rollCols[k], d = +ch, cur = c.pos % 10;
    if (instant) { c.pos = 10 * (REP - 2) + d; place(c, false); return; } // 반복이 다시 시작될 때는 굴리지 않고 바로 바꿈
    if (d === cur) return;
    c.pos -= (cur - d + 10) % 10; // 위쪽으로만 이동 = 화면에서는 위에서 아래로 굴러 내려옴
    place(c, true);
  });
  num.setAttribute('aria-label', v + '일');
}
let idx = -1, timer = null, playing = true;
function stage(i, instant) {
  const p = P[i];
  setRoll(p.days, instant);
  cntProj.classList.add('fade');
  setTimeout(() => { cntProj.innerHTML = `<b>${p.name}</b><span>${p.from.slice(0, 7).replace('-', '.')}</span>`; cntProj.classList.remove('fade'); }, instant ? 0 : 220);
  trailItems.forEach((el, k) => {
    const n = Math.ceil(k / 2); // span은 짝수 칸, 화살표는 홀수 칸
    el.classList.toggle('show', n <= i);
    if (el.tagName === 'SPAN') el.classList.toggle('now', n === i);
  });
  cells.forEach((c) => { c.classList.remove('lit', 'past'); c.style.transitionDelay = '0s'; });
  P.forEach((q, k) => { if (k < i) q.cells.forEach((c) => c.classList.add('past')); });
  const step = instant ? 0 : Math.min(18, 500 / p.cells.length);
  p.cells.forEach((c, k) => { c.style.transitionDelay = k * step + 'ms'; c.classList.add('lit'); });
  cntEl.classList.toggle('done', i === P.length - 1);
}
const HOLD = [1500, 1300, 1300, 3200]; // 단계마다 머무는 시간, 마지막(2일)은 길게
function next() {
  idx = (idx + 1) % P.length;
  stage(idx, idx === 0);
  timer = setTimeout(next, HOLD[idx]);
}
function setPlaying(on) {
  playing = on; clearTimeout(timer);
  playBtn.classList.toggle('paused', !on);
  playBtn.querySelector('.tx').textContent = on ? '멈춤' : '재생';
  playBtn.setAttribute('aria-label', on ? '멈춤' : '재생');
  if (on) timer = setTimeout(next, 600);
}
playBtn.addEventListener('click', () => setPlaying(!playing));
if (matchMedia('(prefers-reduced-motion: reduce)').matches) { idx = P.length - 1; stage(idx, true); setPlaying(false); }
else next();
addEventListener('scroll', () => {
  const hero = document.getElementById('hero').getBoundingClientRect();
  hd.classList.toggle('solid', hero.bottom < innerHeight * 0.5);
  document.getElementById('hint').style.opacity = scrollY > 40 ? 0 : 1;
}, { passive: true });

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
cards.forEach((c) => c.addEventListener('click', () => activate(c)));
activate(cards[0]);
if (matchMedia('(hover: none)').matches) {
  const io2 = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && activate(e.target)),
    { rootMargin: '-45% 0px -45% 0px' });
  cards.forEach((c) => io2.observe(c));
}

/* ── 2. 일하는 방식 ── */
// 작업 규칙: 줄을 누르면 그 규칙이 생긴 이유
const RULES = [
  { from: '오목', title: 'AI가 혼자 결정해 버리는 일을 막으려고',
    flow: [['문제', '프로젝트마다 가끔 AI가 사람에게 묻지 않고 결정해 버리는 일이 있었어요.'],
           ['규칙', '오목부터 "의사결정은 사람이 한다"를 작업 규칙에 넣었어요.'],
           ['지금', 'AI는 대안과 장단점을 내고, 결정은 제가 해서 PLAN.md에 날짜와 이유를 남겨요.']] },
  { from: '내 머리 위 비행기', title: '자는 동안 맡긴 작업이 범위를 넘지 않게',
    flow: [['상황', '밤에 AI 팀원에게 서버 작업을 맡겼어요. 물어볼 사람이 없는 시간이에요.'],
           ['규칙', '범위를 바꿔야 하는 일은 결정하지 말고 멈춘 뒤, 보고서의 "확인 필요"에 남기게 했어요.'],
           ['지금', '예를 들어 "MQTT를 Socket.IO로 바꾸는 결정"은 막히면 기록만 하고 멈춰요. 아침에 제가 판단해요.']] },
  { from: 'dear-mind', title: '이해하지 못한 코드가 쌓여서',
    flow: [['문제', 'dear-mind에서 개발 속도가 빨라지자 제가 이해하지 못한 코드가 쌓였어요.'],
           ['규칙', '오목부터 기능마다 서버와 클라이언트 작업을 나누고, AI가 변경 사항과 이유를 설명하게 했어요.'],
           ['지금', '설명을 읽고 코드를 직접 확인한 뒤 제가 커밋해요.']] },
  { from: 'dear-mind', title: '직접 눌러 보는 검증이 너무 오래 걸려서',
    flow: [['문제', 'dear-mind에서는 기능을 하나하나 직접 써 보며 확인하느라 검증이 오래 걸렸어요.'],
           ['규칙', '오목부터 단위 테스트와 CI로 AI가 만든 코드를 자동으로 검증해요.'],
           ['지금', '테스트는 실제 외부 API 없이 돌아가요. 실제 API는 필요할 때만 짧게 불러요.']] },
  { from: '내 머리 위 비행기', title: '밤사이 만든 코드를 아침에 읽을 수 있게',
    flow: [['상황', '밤에 AI 팀원이 짠 코드를 아침에 제가 이해할 수 있어야 했어요.'],
           ['규칙', '판단이 들어간 코드(예비 전환, 백오프, 구독 수 추적)에는 왜 그렇게 했는지 주석을 남기게 했어요.'],
           ['지금', '코드를 읽다가 이유가 궁금한 곳에서 바로 답을 찾아요.']] },
];
const why = document.getElementById('why');
const ruleBtns = [...document.querySelectorAll('.rl')];
function showRule(i) {
  const r = RULES[i];
  ruleBtns.forEach((b) => b.classList.toggle('on', +b.dataset.r === i));
  why.classList.remove('swap'); void why.offsetWidth; why.classList.add('swap');
  why.innerHTML = `<div class="from">이 규칙이 생긴 곳 <b>${r.from}</b></div><h4>${r.title}</h4>
    <div class="flow">${r.flow.map(([k, v], n) => `<div class="${n === 2 ? 'to' : ''}"><small>${k}</small>${v}</div>`).join('')}</div>`;
}
ruleBtns.forEach((b) => ['mouseenter', 'focus', 'click'].forEach((ev) => b.addEventListener(ev, () => showRule(+b.dataset.r))));
showRule(0);

// 결정 기록: 펼치기
// 결정 기록: 마우스를 올린 줄만 펼침 (마우스가 떠나도 마지막 줄은 열어 둠)
const dItems = [...document.querySelectorAll('#dlog .d')];
const openD = (d) => dItems.forEach((x) => x.classList.toggle('open', x === d));
dItems.forEach((d) => {
  d.addEventListener('mouseenter', () => { if (canHover.matches) openD(d); });
  d.querySelector('.d-row').addEventListener('click', () => openD(d));
});

// 하루 흐름: 스크롤로 화면에 들어올 때마다 메시지가 하나씩 올라옴 (반복 재생은 하지 않음)
const chatMsgs = [...document.querySelectorAll('#chat .cm')];
let chatTimers = [];
function playChat() {
  chatTimers.forEach(clearTimeout); chatTimers = [];
  chatMsgs.forEach((m) => m.classList.remove('in'));
  chatMsgs.forEach((m, k) => chatTimers.push(setTimeout(() => m.classList.add('in'), 300 + k * 650)));
}
if (matchMedia('(prefers-reduced-motion: reduce)').matches) chatMsgs.forEach((m) => m.classList.add('in'));
else new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) playChat(); else { chatTimers.forEach(clearTimeout); chatMsgs.forEach((m) => m.classList.add('in')); }
}), { threshold: 0.25 }).observe(document.getElementById('chat'));

/* ── 1. 작업물: 마우스를 올리면 자세히 (터치 화면은 누르기). 처음엔 첫 카드가 열려 있음 ── */
const wgrid = document.getElementById('relay');
const pcards = [...wgrid.querySelectorAll('.wc')];
const pdetail = document.getElementById('pdetail');
const narrow = matchMedia('(max-width: 600px)');
let openIdx = -1;
function openDetail(i) {
  if (i === openIdx) return;
  openIdx = i;
  pdetail.innerHTML = document.getElementById('pd' + i).innerHTML;
  pcards.forEach((c, k) => { c.classList.toggle('on', k === i); c.setAttribute('aria-expanded', String(k === i)); });
  (narrow.matches ? pcards[i] : wgrid).after(pdetail);
  pdetail.hidden = false;
  pdetail.style.animation = 'none'; void pdetail.offsetWidth; pdetail.style.animation = '';
}
pcards.forEach((c, i) => {
  c.addEventListener('mouseenter', () => { if (canHover.matches) openDetail(i); });
  c.addEventListener('focus', () => openDetail(i));
  c.addEventListener('click', (e) => { if (!e.target.closest('a')) openDetail(i); });
});
openDetail(0);

/* 헤더: 지금 보고 있는 섹션 표시 */
const navLinks = [...document.querySelectorAll('header nav a')];
const navSecs = navLinks.map((a) => document.querySelector(a.getAttribute('href')));
function markNav() {
  const y = innerHeight * 0.4;
  let cur = -1;
  navSecs.forEach((s, k) => { if (s && s.getBoundingClientRect().top <= y) cur = k; });
  // 맨 아래까지 내려오면 마지막(연락처)
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = navSecs.length - 1;
  navLinks.forEach((a, k) => a.classList.toggle('on', k === cur));
}
addEventListener('scroll', markNav, { passive: true }); markNav();

/* 기술 스택 아이콘: 첫 주소가 안 되면 다음 주소로, 모두 안 되면 첫 글자 */
document.querySelectorAll('.ico img[data-srcs]').forEach((img) => {
  const srcs = img.dataset.srcs.split('|');
  let k = 0;
  img.onload = () => img.parentNode.classList.add('ok');
  img.onerror = () => { k += 1; if (k < srcs.length) img.src = srcs[k]; else img.remove(); };
  img.src = srcs[0];
});
