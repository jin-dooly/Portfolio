// 포트폴리오 인터랙션
// 1) 첫 화면 반경 지도: 경험들이 비행기로 날아다님, 누르면 해당 경험으로 이동
// 2) 메인 사례 항로 레일: 읽는 위치에 따라 단계 표시
// 3) 적재 목록: 실음 / 다음 편 / 내림 탭과 이유 펼치기
// 4) 보간 데모: 받은 위치만 그릴 때 vs 예측 + 1초 합류

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/* ---------------- 1. 반경 지도 ---------------- */
(() => {
  const svg = document.getElementById('radar');
  const layer = document.getElementById('planes');
  if (!svg || !layer) return;
  const NS = 'http://www.w3.org/2000/svg';

  // ✏️ 지도 위 비행기 = 경험. id는 아래 article id와 같아야 해요.
  // r: 궤도 반지름, speed: 초당 라디안(음수면 반대 방향), phase: 시작 각도, squash: 궤도 납작함
  const flights = [
    { id: 'flight', cs: 'JY101', name: '내 머리 위 비행기', r: 128, speed: 0.07, phase: 0.6, squash: 0.78, tilt: 0.4, main: true },
    { id: 'umf', cs: 'EQ025', name: 'UMF 입장권', r: 205, speed: -0.045, phase: 2.4, squash: 0.62, tilt: -0.5 },
    { id: 'kiosk', cs: 'EQ112', name: 'AI 키오스크', r: 176, speed: 0.052, phase: 4.1, squash: 0.85, tilt: 1.2 },
    { id: 'memble', cs: 'EQ045', name: 'Memble UX', r: 222, speed: -0.038, phase: 5.4, squash: 0.7, tilt: 2.1 },
  ];

  const listLinks = [...document.querySelectorAll('.flight-list a')];
  const PLANE = 'M0 -11 L2 -4 L10 1 L10 3 L2 1 L1.6 7 L4.5 9.5 L4.5 11 L0 10 L-4.5 11 L-4.5 9.5 L-1.6 7 L-2 1 L-10 3 L-10 1 L-2 -4 Z';

  flights.forEach((f) => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'plane' + (f.main ? ' main' : ''));
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'link');
    g.setAttribute('aria-label', `${f.cs} ${f.name} 보기`);
    g.innerHTML = `
      <polyline class="tail" points="" />
      <g class="craft"><circle class="hit" r="22" /><path class="body" d="${PLANE}" /></g>
      <g class="label">
        <rect class="tag-bg" rx="3" />
        <text class="tag" x="16" y="-4">${f.cs}</text>
        <text class="tag-name" x="16" y="12">${f.name}</text>
      </g>`;
    layer.appendChild(g);
    f.el = g;
    f.tail = g.querySelector('.tail');
    f.craft = g.querySelector('.craft');
    f.label = g.querySelector('.label');
    f.trail = [];
    requestAnimationFrame(() => {
      const bb = f.label.getBBox();
      const bg = f.label.querySelector('.tag-bg');
      bg.setAttribute('x', bb.x - 4); bg.setAttribute('y', bb.y - 2);
      bg.setAttribute('width', bb.width + 8); bg.setAttribute('height', bb.height + 4);
    });

    const go = () => document.getElementById(f.id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    g.addEventListener('click', go);
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    const link = listLinks.find((a) => a.dataset.id === f.id);
    const on = (v) => { g.classList.toggle('on', v); link?.classList.toggle('on', v); f.hover = v; };
    g.addEventListener('mouseenter', () => on(true));
    g.addEventListener('mouseleave', () => on(false));
    g.addEventListener('focus', () => on(true));
    g.addEventListener('blur', () => on(false));
    link?.addEventListener('mouseenter', () => on(true));
    link?.addEventListener('mouseleave', () => on(false));
  });

  const pos = (f, t) => {
    const a = f.phase + f.speed * t;
    const x0 = Math.cos(a) * f.r, y0 = Math.sin(a) * f.r * f.squash;
    const c = Math.cos(f.tilt), s = Math.sin(f.tilt);
    return { x: x0 * c - y0 * s, y: x0 * s + y0 * c };
  };

  let visible = true, last = performance.now(), clock = 0;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(svg);

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (visible) {
      flights.forEach((f) => { if (!f.hover) f.t = (f.t ?? 0) + dt; });
      clock += dt;
      draw();
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  function draw() {
    flights.forEach((f) => {
      const t = f.t ?? 0;
      const p = pos(f, t), q = pos(f, t + 0.05);
      const heading = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI + 90;
      f.craft.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${heading.toFixed(1)})`);
      f.label.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
      // 지나온 경로: 최근 위치를 몇 개 계산해서 꼬리로
      const pts = [];
      for (let k = 1; k <= 10; k++) { const b = pos(f, t - k * 1.4); pts.push(`${b.x.toFixed(1)},${b.y.toFixed(1)}`); }
      f.tail.setAttribute('points', pts.join(' '));
    });
  }

  if (reduceMotion) draw(); else requestAnimationFrame(frame);
})();

/* ---------------- 2. 항로 레일 ---------------- */
(() => {
  const rail = [...document.querySelectorAll('.route-rail li')];
  const legs = [...document.querySelectorAll('.leg')];
  if (!rail.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const n = Number(e.target.dataset.leg);
      rail.forEach((li) => {
        const s = Number(li.dataset.step);
        li.classList.toggle('on', s === n);
        li.classList.toggle('done', s < n);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  legs.forEach((l) => io.observe(l));
})();

/* ---------------- 3. 적재 목록 ---------------- */
document.querySelectorAll('[data-manifest]').forEach((m) => {
  const tabs = [...m.querySelectorAll('[data-filter]')];
  const items = [...m.querySelectorAll('.manifest-list li')];
  const show = (kind) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.filter === kind)));
    let i = 0;
    items.forEach((li) => {
      const hit = li.dataset.kind === kind;
      li.hidden = !hit;
      if (hit) li.style.setProperty('--i', i++);
    });
    m.classList.remove('flash'); void m.offsetWidth; m.classList.add('flash');
  };
  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.filter)));
  items.forEach((li) => {
    const b = li.querySelector('button');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true')));
  });
  show('load');
});

/* ---------------- 4. 보간 데모 ---------------- */
document.querySelectorAll('[data-demo]').forEach((root) => {
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const W = 720, H = 300, DPR = Math.min(2, devicePixelRatio || 1);
  canvas.width = W * DPR; canvas.height = H * DPR;
  ctx.scale(DPR, DPR);
  const countdown = root.querySelector('[data-countdown]');
  const buttons = [...root.querySelectorAll('[data-mode]')];
  let mode = 'interp';
  buttons.forEach((b) => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    buttons.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    trail.length = 0;
  }));

  const INTERVAL = 6;     // 데이터 도착 간격(초), 실제 서비스와 같은 약 6초
  const BLEND = 1;        // 새 데이터에 합류하는 시간(초)
  const VX = 26;          // 화면 가로 속도(px/s)

  // 실제 비행 경로 (데모용): 완만하게 선회하는 곡선
  const truth = (t) => {
    const x = -30 + VX * t;
    const y = H / 2 + 78 * Math.sin((x / W) * Math.PI * 2.2);
    return { x, y };
  };
  const state = (t) => {
    const a = truth(t), b = truth(t + 0.1), c = truth(t + 0.2);
    const h1 = Math.atan2(b.y - a.y, b.x - a.x), h2 = Math.atan2(c.y - b.y, c.x - b.x);
    return { ...a, heading: h1, speed: Math.hypot(b.x - a.x, b.y - a.y) / 0.1, turn: (h2 - h1) / 0.1 };
  };
  // 마지막 위치 + 속도 + 방향 + 선회율로 원호 예측 (최대 30초)
  const predict = (s, dt) => {
    dt = Math.min(dt, 30);
    if (Math.abs(s.turn) < 1e-4) return { x: s.x + Math.cos(s.heading) * s.speed * dt, y: s.y + Math.sin(s.heading) * s.speed * dt, heading: s.heading };
    const h = s.heading + s.turn * dt, k = s.speed / s.turn;
    return { x: s.x + k * (Math.sin(h) - Math.sin(s.heading)), y: s.y - k * (Math.cos(h) - Math.cos(s.heading)), heading: h };
  };

  let t = 0, last = performance.now(), sample = null, sampleAt = 0, blendFrom = null, shown = null, visible = false;
  const received = [];
  const trail = [];
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  function step(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (visible || !shown) tick(dt);
    if (!reduceMotion) requestAnimationFrame(step);
  }

  function tick(dt) {
    t += dt;
    if (truth(t).x > W + 40) { t = 0; sample = null; received.length = 0; trail.length = 0; }
    if (!sample || t - sampleAt >= INTERVAL) {
      sample = state(t); sampleAt = t;
      received.push({ x: sample.x, y: sample.y });
      if (received.length > 8) received.shift();
      blendFrom = shown ? { ...shown } : null;
    }
    const since = t - sampleAt;
    let p;
    if (mode === 'raw') {
      p = { x: sample.x, y: sample.y, heading: sample.heading };
    } else {
      const target = predict(sample, since);
      if (blendFrom && since < BLEND) {
        const k = since / BLEND, e = 1 - Math.pow(1 - k, 3);
        p = { x: blendFrom.x + (target.x - blendFrom.x) * e, y: blendFrom.y + (target.y - blendFrom.y) * e, heading: target.heading };
      } else p = target;
    }
    shown = p;
    trail.push({ x: p.x, y: p.y });
    if (trail.length > 400) trail.shift();
    countdown.textContent = Math.max(0, INTERVAL - since).toFixed(1);
    render(p);
  }

  function render(p) {
    const ink = css('--ink'), ink2 = css('--ink-2'), mag = css('--magenta'), blue = css('--blue'), line = css('--line');
    ctx.clearRect(0, 0, W, H);
    // 격자
    ctx.strokeStyle = line; ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); ctx.stroke(); }
    // 실제 경로 (점선)
    ctx.setLineDash([2, 6]); ctx.strokeStyle = ink2; ctx.globalAlpha = .45; ctx.beginPath();
    for (let tt = 0; ; tt += 0.25) { const q = truth(tt); if (q.x > W + 40) break; tt === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y); }
    ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    // 화면에 그린 궤적
    ctx.strokeStyle = blue; ctx.lineWidth = 2; ctx.beginPath();
    trail.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
    ctx.stroke();
    // 받은 위치
    received.forEach((q) => { ctx.fillStyle = mag; ctx.beginPath(); ctx.arc(q.x, q.y, 4, 0, Math.PI * 2); ctx.fill(); });
    // 비행기
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.heading + Math.PI / 2); ctx.fillStyle = ink;
    ctx.fill(new Path2D('M0 -11 L2 -4 L10 1 L10 3 L2 1 L1.6 7 L4.5 9.5 L4.5 11 L0 10 L-4.5 11 L-4.5 9.5 L-1.6 7 L-2 1 L-10 3 L-10 1 L-2 -4 Z'));
    ctx.restore();
    // 범례
    ctx.font = '500 12px "IBM Plex Sans KR", sans-serif'; ctx.textBaseline = 'middle';
    ctx.fillStyle = mag; ctx.beginPath(); ctx.arc(16, 18, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = ink2; ctx.fillText('받은 위치', 26, 18);
    ctx.strokeStyle = blue; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(96, 18); ctx.lineTo(112, 18); ctx.stroke();
    ctx.fillText('화면에 그린 경로', 118, 18);
  }

  if (reduceMotion) { for (let i = 0; i < 300; i++) tick(1 / 30); } else requestAnimationFrame(step);
});
