// 포트폴리오 인터랙션
// 1) 첫 화면 돋보기: 돋보기 안에서만 "개발자가 본 것"이 보임
// 2) 메인 사례 단계 레일: 읽는 위치에 따라 단계 표시
// 3) 넣은 것 / 미룬 것 / 뺀 것 탭과 이유 펼치기
// 4) 보간 데모: 받은 위치만 그릴 때 vs 예측 + 1초 합류

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/* ---------------- 1. 돋보기 ---------------- */
(() => {
  const wrap = document.getElementById('stage-wrap');
  const stage = document.getElementById('stage');
  const seen = document.getElementById('seen');
  const lens = document.getElementById('lens');
  if (!wrap || !stage) return;

  const W = 720, H = 650, R = 120;
  let scale = 1;
  const fit = () => {
    scale = Math.min(1, wrap.clientWidth / W);
    stage.style.transform = `scale(${scale})`;
    wrap.style.height = H * scale + 'px';
  };
  fit();
  addEventListener('resize', fit);

  // ✏️ 사용자가 움직이기 전, 돋보기가 차례로 들르는 곳 (무대 좌표 720 x 650)
  const tour = [
    { x: 150, y: 250 },  // 비행기 지도: 예측 보간
    { x: 420, y: 230 },  // 입장권: 낙관적 업데이트
    { x: 470, y: 560 },  // 키오스크: 가상 키보드
    { x: 130, y: 560 },  // 비행기 카드: 가장 가까운 비행기
    { x: 515, y: 40 },   // 닫기 버튼 터치 영역
  ];
  let stop = 0, stopAt = performance.now();
  let x = tour[0].x, y = tour[0].y, tx = x, ty = y;
  let user = false, idleTimer = null;

  const place = () => {
    seen.style.clipPath = `circle(${R}px at ${x}px ${y}px)`;
    lens.style.transform = `translate(${x}px, ${y}px)`;
  };

  const toStage = (e) => {
    const r = stage.getBoundingClientRect();
    return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
  };
  const follow = (e) => {
    const p = toStage(e);
    tx = Math.max(0, Math.min(W, p.x)); ty = Math.max(0, Math.min(H, p.y));
    user = true;
    clearTimeout(idleTimer);
    if (reduceMotion) { x = tx; y = ty; place(); }
  };
  wrap.addEventListener('pointermove', follow);
  wrap.addEventListener('pointerdown', follow);
  wrap.addEventListener('pointerleave', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { user = false; stopAt = performance.now(); }, 2500);
  });

  // 돋보기 안에 보이는 메모를 누르면 해당 사례로 이동
  const anns = [...seen.querySelectorAll('.ann[data-target]')];
  const annAt = (e) => {
    const r = stage.getBoundingClientRect();
    const cx = r.left + x * scale, cy = r.top + y * scale;
    if (Math.hypot(e.clientX - cx, e.clientY - cy) > R * scale) return null;
    return anns.find((a) => {
      const b = a.getBoundingClientRect();
      return e.clientX >= b.left - 6 && e.clientX <= b.right + 6 && e.clientY >= b.top - 6 && e.clientY <= b.bottom + 6;
    }) || null;
  };
  let hot = null;
  wrap.addEventListener('pointermove', (e) => {
    const a = annAt(e);
    if (a === hot) return;
    hot?.classList.remove('hot');
    hot = a; hot?.classList.add('hot');
    wrap.style.cursor = a ? 'pointer' : '';
  });
  wrap.addEventListener('click', (e) => {
    const a = annAt(e);
    if (a) document.getElementById(a.dataset.target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(wrap);

  function loop(now) {
    if (visible) {
      if (!user) {
        if (now - stopAt > 2200) { stop = (stop + 1) % tour.length; stopAt = now; }
        tx = tour[stop].x; ty = tour[stop].y;
      }
      const k = user ? 0.22 : 0.06;
      x += (tx - x) * k; y += (ty - y) * k;
      place();
    }
    requestAnimationFrame(loop);
  }
  place();
  if (!reduceMotion) requestAnimationFrame(loop);
})();

/* ---------------- 2. 단계 레일 ---------------- */
(() => {
  const rail = [...document.querySelectorAll('.rail li')];
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

/* ---------------- 3. 넣은 것 / 미룬 것 / 뺀 것 ---------------- */
document.querySelectorAll('[data-manifest]').forEach((m) => {
  const tabs = [...m.querySelectorAll('[data-filter]')];
  const items = [...m.querySelectorAll('.items li')];
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

/* ---------------- 4. 보간 데모: 같은 데이터를 두 방식으로 나란히 ---------------- */
document.querySelectorAll('[data-demo]').forEach((root) => {
  const W = 560, H = 300, DPR = Math.min(2, devicePixelRatio || 1);
  const panes = [...root.querySelectorAll('canvas[data-mode]')].map((canvas) => {
    canvas.width = W * DPR; canvas.height = H * DPR;
    const ctx = canvas.getContext('2d'); ctx.scale(DPR, DPR);
    return { canvas, ctx, mode: canvas.dataset.mode, trail: [], shown: null, blendFrom: null };
  });
  const countdown = root.querySelector('[data-countdown]');

  const INTERVAL = 6;     // 데이터 도착 간격(초), 실제 서비스와 같은 약 6초
  const BLEND = 1;        // 새 데이터에 합류하는 시간(초)
  const VX = 22;          // 화면 가로 속도(px/s)

  // 실제 비행 경로 (데모용): 완만하게 선회하는 곡선
  const truth = (t) => {
    const x = 24 + VX * t;  // 처음부터 화면 안에서 시작
    return { x, y: H / 2 + 42 * Math.sin((x / W) * Math.PI * 1.6) };
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

  let t = 0, last = performance.now(), sample = null, sampleAt = 0, visible = false, started = false;
  const received = [];
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(root);

  function step(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (visible || !started) { tick(dt); started = true; }
    if (!reduceMotion) requestAnimationFrame(step);
  }

  function tick(dt) {
    t += dt;
    if (truth(t).x > W + 40) { t = 0; sample = null; received.length = 0; panes.forEach((p) => { p.trail.length = 0; p.shown = null; }); }
    let fresh = false;
    if (!sample || t - sampleAt >= INTERVAL) {
      sample = state(t); sampleAt = t; fresh = true;
      received.push({ x: sample.x, y: sample.y });
      if (received.length > 8) received.shift();
    }
    const since = t - sampleAt;
    panes.forEach((p) => {
      if (fresh) p.blendFrom = p.shown ? { ...p.shown } : null;
      let pos;
      if (p.mode === 'raw') {
        pos = { x: sample.x, y: sample.y, heading: sample.heading };
      } else {
        const target = predict(sample, since);
        if (p.blendFrom && since < BLEND) {
          const e = 1 - Math.pow(1 - since / BLEND, 3);
          pos = { x: p.blendFrom.x + (target.x - p.blendFrom.x) * e, y: p.blendFrom.y + (target.y - p.blendFrom.y) * e, heading: target.heading };
        } else pos = target;
      }
      p.shown = pos;
      p.trail.push({ x: pos.x, y: pos.y });
      if (p.trail.length > 600) p.trail.shift();
      render(p, pos);
    });
    countdown.textContent = Math.max(0, INTERVAL - since).toFixed(1);
  }

  const PLANE = new Path2D('M0 -11 L2 -4 L10 1 L10 3 L2 1 L1.6 7 L4.5 9.5 L4.5 11 L0 10 L-4.5 11 L-4.5 9.5 L-1.6 7 L-2 1 L-10 3 L-10 1 L-2 -4 Z');
  function render({ ctx, trail, mode }, p) {
    const ink = css('--ink'), x = css('--x'), mute = css('--mute'), mute2 = css('--mute-2');
    const line = mode === 'raw' ? css('--ink-2') : x;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = mute; ctx.lineWidth = 1;
    for (let gx = 0; gx <= W; gx += 40) { ctx.beginPath(); ctx.moveTo(gx + .5, 0); ctx.lineTo(gx + .5, H); ctx.stroke(); }
    for (let gy = 0; gy <= H; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy + .5); ctx.lineTo(W, gy + .5); ctx.stroke(); }
    // 실제 경로
    ctx.setLineDash([2, 6]); ctx.strokeStyle = mute2; ctx.lineWidth = 2; ctx.beginPath();
    for (let tt = 0; ; tt += 0.25) { const q = truth(tt); if (q.x > W + 40) break; tt === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y); }
    ctx.stroke(); ctx.setLineDash([]);
    // 화면에 그린 경로
    ctx.strokeStyle = line; ctx.lineWidth = 2.5; ctx.beginPath();
    trail.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
    ctx.stroke();
    // 받은 위치
    received.forEach((q) => { ctx.fillStyle = ink; ctx.beginPath(); ctx.arc(q.x, q.y, 4, 0, Math.PI * 2); ctx.fill(); });
    // 비행기
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.heading + Math.PI / 2); ctx.fillStyle = line; ctx.fill(PLANE); ctx.restore();
  }

  if (reduceMotion) { for (let i = 0; i < 300; i++) tick(1 / 30); } else requestAnimationFrame(step);
});

/* ---------------- 5. AI 타임라인: 스크롤에 따라 선이 채워지고 항목이 켜짐 ---------------- */
(() => {
  const tl = document.getElementById('timeline');
  if (!tl) return;
  const items = [...tl.querySelectorAll('.tl-item')];
  const update = () => {
    const r = tl.getBoundingClientRect();
    const mark = innerHeight * 0.6;
    const p = Math.max(0, Math.min(1, (mark - r.top) / r.height));
    tl.style.setProperty('--p', p.toFixed(4));
    items.forEach((it) => it.classList.toggle('on', it.getBoundingClientRect().top < mark));
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();

/* ---------------- 6. 상단 바: 읽은 만큼 차오르는 선, 지금 읽는 구역 표시 ---------------- */
(() => {
  const bar = document.getElementById('topbar');
  const progress = document.getElementById('tb-progress');
  if (!bar) return;
  const links = [...bar.querySelectorAll('[data-sec]')];
  const secs = links.map((a) => document.getElementById(a.dataset.sec)).filter(Boolean);
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    bar.classList.toggle('scrolled', scrollY > 8);
    let cur = null;
    secs.forEach((sec) => { if (sec.getBoundingClientRect().top < innerHeight * 0.35) cur = sec.id; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = 'contact';
    links.forEach((a) => a.classList.toggle('on', a.dataset.sec === cur));
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();

// 터치 기기에서는 안내 문구를 터치 기준으로
if (matchMedia('(hover: none)').matches) {
  const hint = document.getElementById('hint');
  if (hint) hint.textContent = '화면을 눌러 돋보기를 옮기고, 돋보기 속 메모를 눌러 보세요';
}

/* ---------------- 7. 형광펜 밑줄: 화면에 들어오면 그어짐 ---------------- */
(() => {
  const marks = document.querySelectorAll('.hl-mark');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 1, rootMargin: '0px 0px -15% 0px' });
  marks.forEach((m) => io.observe(m));
})();
