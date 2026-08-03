/* ═══════════════════════════════════════════════════════════════════════════
   MUNIMO — site behaviour. No libraries. Everything degrades without JS.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── sticky header ── */
  var hd = $('.hd');
  if (hd) {
    var onScroll = function () { hd.classList.toggle('stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── mobile nav ── */
  var burger = $('.burger'), mnav = $('.mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { mnav.classList.remove('open'); }); });
  }

  /* ── reveal on scroll ── */
  var rv = $$('.rv');
  if (rv.length) {
    if (RM || !('IntersectionObserver' in window)) {
      rv.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      rv.forEach(function (el) { io.observe(el); });
    }
  }

  /* ── click-to-launch embeds ─────────────────────────────────────────────
     Real software is heavy. We show a real still, and load the app on first
     click, so the page stays instant and the demo stays genuine.          */
  $$('[data-launch]').forEach(function (screen) {
    var frame = $('iframe', screen), ov = $('.launch', screen);
    if (!frame || !ov) return;
    var src = screen.getAttribute('data-launch'), loaded = false;
    function go() {
      if (loaded) return;
      loaded = true;
      frame.src = src;
      ov.classList.add('gone');
    }
    screen.addEventListener('click', go);
    ov.setAttribute('tabindex', '0');
    ov.setAttribute('role', 'button');
    ov.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });

  /* ── count-up numbers ── */
  var counters = $$('[data-count]');
  if (counters.length && !RM && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, to = parseFloat(el.getAttribute('data-count')), dec = (to % 1 !== 0) ? 1 : 0;
        var pre = el.getAttribute('data-pre') || '', suf = el.getAttribute('data-suf') || '';
        var t0 = performance.now(), dur = 1300;
        (function tick(now) {
          var p = Math.min(1, (now - t0) / dur), e2 = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + (to * e2).toFixed(dec) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ── scroll-progress driver ───────────────────────────────────────────
     Sets --p (0→1) on any [data-scrub] element as it crosses the viewport.
     The raw pass-through only hits 1 once the element has left the top of
     the screen, which is useless for an animation you want to *watch*, so
     data-scrub takes an optional "start end" window (defaults 0.10 0.62)
     and --p is remapped to finish while the element is still comfortably
     in view. The signature animations all run off this one value.        */
  var scrubs = $$('[data-scrub]');
  if (scrubs.length && !RM) {
    var raf = null;
    var update = function () {
      raf = null;
      var vh = window.innerHeight;
      scrubs.forEach(function (el) {
        var win = (el.getAttribute('data-scrub') || '').trim().split(/\s+/).map(Number);
        var a = isFinite(win[0]) ? win[0] : 0.10;
        var b = isFinite(win[1]) ? win[1] : 0.62;
        var r = el.getBoundingClientRect();
        var raw = (vh - r.top) / (vh + r.height);
        var p = (raw - a) / (b - a);
        el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(4));
      });
    };
    var req = function () { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
  }

  /* ── ANIMATION 1 — requirement → running software ────────────────────
     A real sentence a client says, typed out; then the software assembles
     itself around it. Loops. The assembly is CSS; this only flips a class. */
  var typer = $('[data-typer]');
  if (typer) {
    var LINES;
    try { LINES = JSON.parse(typer.getAttribute('data-typer')); } catch (_) { LINES = []; }
    var out = $('.typer-text', typer), stage = $('.assemble', typer);
    if (out && LINES.length) {
      if (RM) {
        out.textContent = LINES[0];
        if (stage) stage.classList.add('built');
      } else {
        var li = 0, ci = 0, mode = 'type';
        (function step() {
          var line = LINES[li];
          if (mode === 'type') {
            out.textContent = line.slice(0, ++ci);
            if (ci >= line.length) { mode = 'hold'; setTimeout(step, 260); return; }
            setTimeout(step, 34 + Math.random() * 34);
          } else if (mode === 'hold') {
            if (stage) stage.classList.add('built');
            mode = 'wait'; setTimeout(step, 2700);
          } else if (mode === 'wait') {
            if (stage) stage.classList.remove('built');
            mode = 'erase'; setTimeout(step, 460);
          } else {
            out.textContent = line.slice(0, --ci);
            if (ci <= 0) { li = (li + 1) % LINES.length; mode = 'type'; setTimeout(step, 250); return; }
            setTimeout(step, 15);
          }
        })();
      }
    }
  }

  /* ── tabbed panels ── */
  $$('[data-tabs]').forEach(function (root) {
    var btns = $$('[data-tab]', root), panes = $$('[data-pane]', root);
    if (!btns.length) return;
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-tab');
        btns.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
        panes.forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-pane') === k); });
      });
    });
  });

  /* ── year stamp ── */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
