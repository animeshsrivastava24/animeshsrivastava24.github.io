/* Shared behaviour for every page. Each block checks that its elements exist. */
(() => {
  const root = document.documentElement;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  if (RM) root.classList.add('rm');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---- load-in order for the home screen ---- */
  let k = 0;
  $$('.home-hero .who > *').forEach(el => el.style.setProperty('--i', k++));
  $$('.home-hero .tiles-head, .home-hero .tiles > *').forEach(el => el.style.setProperty('--i', k++));

  /* ---- boot-log timestamps (experience) ---- */
  $$('.role').forEach((role, r) => {
    let t = 0.000412 + r * 1.204;
    $$('.log li', role).forEach((li, j) => {
      t += 0.0731 + ((j * 37 + r * 13) % 11) / 1000;
      const ts = document.createElement('span');
      ts.className = 'ts'; ts.setAttribute('aria-hidden', 'true');
      ts.textContent = '[' + t.toFixed(6).padStart(10, ' ') + ']';
      li.prepend(ts);
    });
  });

  /* ---- summary words light up ---- */
  const scrub = $('[data-scrub]');
  const words = [];
  if (scrub) {
    (function split(el) {
      Array.from(el.childNodes).forEach(node => {
        if (node.nodeType === 3) {
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span'); s.className = 'w'; s.textContent = part;
            frag.appendChild(s); words.push(s);
          });
          node.replaceWith(frag);
        } else if (node.nodeType === 1) split(node);
      });
    })(scrub);
  }
  let wordsOn = -1;

  /* ---- skills register ---- */
  const regRows = $$('#regtable tbody tr');
  const regEl = $('#reg'), regVal = $('#regVal'), fieldsEl = $('#fields');
  const bits = [], groups = [];
  let bitsOn = -1;
  if (regEl && fieldsEl) {
    regRows.forEach((tr, fi) => {
      const g = document.createElement('div'); g.className = 'fg';
      const b = document.createElement('div'); b.className = 'fg-bits';
      for (let q = 0; q < 4; q++) {
        const n = 31 - (fi * 4 + q);
        const cell = document.createElement('span'); cell.className = 'bit';
        cell.innerHTML = '<sup>' + n + '</sup><b>0</b>';
        b.appendChild(cell); bits.push(cell);
      }
      const name = document.createElement('span'); name.className = 'fg-name'; name.textContent = tr.dataset.field;
      g.appendChild(b); g.appendChild(name); fieldsEl.appendChild(g); groups.push(g);
    });
  }
  function setBits(n) {
    if (!regEl || n === bitsOn) return; bitsOn = n;
    let v = 0;
    bits.forEach((cell, pos) => {
      const on = pos < n;
      cell.classList.toggle('on', on);
      cell.lastChild.textContent = on ? '1' : '0';
      if (on) v = (v | (1 << (31 - pos))) >>> 0;
    });
    groups.forEach((g, fi) => { const on = n >= (fi + 1) * 4; g.classList.toggle('on', on); regRows[fi].classList.toggle('on', on); });
    const h = v.toString(16).toUpperCase().padStart(8, '0');
    regVal.textContent = '0x' + h.slice(0, 4) + '_' + h.slice(4);
  }

  /* ---- signal trace in the left gutter ---- */
  const traceFg = $('#traceFg'), traceBg = $('#traceBg'), tip = $('.trace-tip'), tipLabel = $('.trace-tip b');
  let traceLen = 0;
  if (traceFg) {
    let d = '';
    for (let y = 0; y <= 1000; y += 2) {
      const env = 0.22 + 0.78 * Math.pow(Math.sin(y / 1000 * Math.PI * 7), 2);
      const x = 20 + 13 * env * Math.sin(y * 0.16);
      d += (y ? 'L' : 'M') + x.toFixed(2) + ' ' + y;
    }
    traceFg.setAttribute('d', d); traceBg.setAttribute('d', d);
    traceLen = traceFg.getTotalLength();
    traceFg.style.strokeDasharray = traceLen;
    traceFg.style.strokeDashoffset = traceLen;
  }

  /* ---- I/Q waveform (home) and small signal tile ---- */
  const waves = $$('svg[data-wave]').map(svg => ({
    svg, I: $('.wI', svg), Q: $('.wQ', svg),
    W: svg.viewBox.baseVal.width, H: svg.viewBox.baseVal.height,
    host: svg.closest('section') || document.body, visible: true, s: 0
  }));
  const t0 = performance.now();
  function drawWave(w, now) {
    const t = (now - t0) / 1000, amp = 1 - w.s, k2 = (0.026 + w.s * 0.03) * (1200 / w.W);
    const mid = w.H / 2, A = w.H * 0.4;
    let dI = '', dQ = '';
    const step = Math.max(2, w.W / 200);
    for (let x = 0; x <= w.W; x += step) {
      const env = Math.pow(Math.sin(Math.PI * x / w.W), 1.4) * (0.55 + 0.45 * Math.sin(x * (1200 / w.W) / 170 - t * 0.8));
      const ph = t * 2.1;
      dI += (x ? 'L' : 'M') + x.toFixed(1) + ' ' + (mid + A * amp * env * Math.sin(k2 * x - ph)).toFixed(1);
      dQ += (x ? 'L' : 'M') + x.toFixed(1) + ' ' + (mid + A * amp * env * Math.cos(k2 * x - ph)).toFixed(1);
    }
    if (w.I) w.I.setAttribute('d', dI);
    if (w.Q) w.Q.setAttribute('d', dQ);
  }
  if (waves.length) {
    if (RM) waves.forEach(w => drawWave(w, t0 + 1200));
    else {
      const vio = new IntersectionObserver(es => es.forEach(e => {
        const w = waves.find(x => x.svg === e.target); if (w) w.visible = e.isIntersecting;
      }));
      waves.forEach(w => vio.observe(w.svg));
      const loop = now => { waves.forEach(w => { if (w.visible) drawWave(w, now); }); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }

  /* ---- counters ---- */
  const counters = $$('[data-count]');
  if (!RM) counters.forEach(el => { el.textContent = '0'; });
  function countUp(el) {
    const end = +el.dataset.count;
    if (RM) { el.textContent = end; return; }
    const st = performance.now(), dur = 1500;
    const step = n => {
      const q = clamp((n - st) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - q, 3)));
      if (q < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---- reveal on scroll ---- */
  $$('[data-stagger]').forEach(p => Array.from(p.children).forEach((c, i) => c.style.setProperty('--d', (i * 90) + 'ms')));
  const io = new IntersectionObserver(entries => {
    const hits = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    hits.forEach((e, j) => {
      const el = e.target;
      if (el.matches('.log li')) el.style.setProperty('--bd', (j * 110) + 'ms');
      el.classList.add('in');
      if (el.matches('[data-count]')) countUp(el);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  $$('[data-reveal], .log li, [data-count], .agent-card, .proj, .dgm').forEach(el => io.observe(el));

  /* ---- menu ---- */
  const nav = $('#nav');
  const menuBtn = $('.menu-btn'), menu = $('#menu');
  if (menuBtn && menu) {
    const setMenu = open => {
      menuBtn.setAttribute('aria-expanded', open); menu.hidden = !open;
      menuBtn.textContent = open ? 'Close' : 'All pages';
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---- copy email ---- */
  $$('.copy').forEach(btn => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = 'Copied'; }
    catch (err) { btn.textContent = 'Select the address to copy'; }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
  }));

  /* ---- pinned, sideways-scrolling agents ---- */
  const agents = $('#agents'), track = agents ? $('.track', agents) : null;
  let pinOn = false, pinDist = 0;
  function layoutPin() {
    if (!agents || !track) return;
    pinOn = !RM && innerWidth >= 900 && innerHeight >= 560;
    agents.classList.toggle('pinned', pinOn);
    if (pinOn) {
      track.style.transform = '';
      pinDist = Math.max(0, track.offsetWidth - innerWidth);
      agents.style.height = (pinDist + innerHeight) + 'px';
    } else { agents.style.height = ''; track.style.transform = ''; pinDist = 0; }
  }

  /* ---- one scroll loop ---- */
  const bar = $('.progress span'), timeline = $('#timeline'), railFill = $('.tl-rail span');
  const marquee = $('#marquee'), marqueeHost = marquee ? marquee.closest('section') : null;
  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight, sy = scrollY;
    const max = root.scrollHeight - vh;
    const p = max > 0 ? clamp(sy / max) : 0;
    if (bar) bar.style.transform = 'scaleX(' + p + ')';
    if (nav) nav.classList.toggle('scrolled', sy > 24);

    if (traceFg && traceLen) {
      traceFg.style.strokeDashoffset = traceLen * (1 - p);
      const pt = traceFg.getPointAtLength(traceLen * p);
      tip.style.transform = 'translate(' + (12 + pt.x) + 'px,' + (80 + pt.y / 1000 * (vh - 96)) + 'px)';
      tipLabel.textContent = String(Math.round(p * 100)).padStart(2, '0') + '%';
    }

    waves.forEach(w => { if (w.host !== document.body) w.s = clamp(sy / (w.host.offsetHeight * 0.85)); });

    if (scrub && !RM) {
      const r = scrub.getBoundingClientRect();
      const sp = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3));
      const n = Math.round(sp * words.length);
      if (n !== wordsOn) { words.forEach((w, i) => w.classList.toggle('on', i < n)); wordsOn = n; }
    }

    if (pinOn) {
      const r = agents.getBoundingClientRect();
      const ap = clamp(-r.top / Math.max(1, r.height - vh));
      track.style.transform = 'translate3d(' + (-ap * pinDist).toFixed(1) + 'px,0,0)';
      agents.style.setProperty('--ap', ap);
    }

    if (timeline && railFill) {
      const tr = timeline.getBoundingClientRect();
      railFill.style.setProperty('--p', RM ? 1 : clamp((vh * 0.6 - tr.top) / tr.height));
    }

    if (regEl) {
      if (RM) setBits(32);
      else {
        const rr = regEl.getBoundingClientRect();
        setBits(Math.round(clamp((vh * 0.88 - rr.top) / (vh * 0.55)) * 32));
      }
    }

    if (marquee && !RM) {
      const wr = marqueeHost.getBoundingClientRect();
      if (wr.bottom > 0 && wr.top < vh) {
        const half = marquee.scrollWidth / 2;
        const x = ((vh - wr.top) * 0.4) % half;
        marquee.style.transform = 'translate3d(' + (-x).toFixed(1) + 'px,0,0)';
      }
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  let rz;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { layoutPin(); update(); }, 120); });

  const fontsReady = (document.fonts && document.fonts.ready)
    ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]) : Promise.resolve();
  fontsReady.then(() => requestAnimationFrame(() => { document.body.classList.add('ready'); layoutPin(); update(); }));
  layoutPin();
  update();
})();
