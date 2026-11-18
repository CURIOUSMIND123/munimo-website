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

  /* ── reveal on scroll ───────────────────────────────────────────────────
     The observer gives the nice staggered timing, but it can be outrun by a
     fast flick, a jump to an anchor or a restored scroll position — and a
     missed reveal leaves that content invisible forever. So a rAF-throttled
     sweep also reveals anything whose top has crossed into view. Content
     being visible always wins over content being animated.                 */
  var rv = $$('.rv');
  if (rv.length) {
    if (RM || !('IntersectionObserver' in window)) {
      rv.forEach(function (el) { el.classList.add('in'); });
    } else {
      var pending = rv.slice();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
      rv.forEach(function (el) { io.observe(el); });

      var sweep = function () {
        if (!pending.length) return;
        var vh = window.innerHeight, still = [];
        for (var i = 0; i < pending.length; i++) {
          var el = pending[i];
          if (el.classList.contains('in')) continue;
          if (el.getBoundingClientRect().top < vh) { el.classList.add('in'); io.unobserve(el); }
          else still.push(el);
        }
        pending = still;
      };
      var st = null;
      var queue = function () {
        if (st) return;
        st = requestAnimationFrame(function () { st = null; sweep(); });
      };
      window.addEventListener('scroll', queue, { passive: true });
      window.addEventListener('resize', queue);
      // Lazy images landing after first paint change the page height, which can
      // move a section into view without a scroll event. Re-sweep on any layout
      // growth so nothing is left stranded invisible.
      window.addEventListener('load', queue);
      if ('ResizeObserver' in window) new ResizeObserver(queue).observe(document.body);
      sweep();
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
          var v = to * e2;
          el.textContent = pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + suf;
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

  /* ── hero deck: a few degrees of cursor parallax ──────────────────────
     Enough that the product reads as an object in space, not a picture.  */
  var deck = $('.deck');
  if (deck && !RM && window.matchMedia('(pointer:fine)').matches) {
    var stage = $('.deck-stage', deck), tick = null;
    var move = function (e) {
      if (tick) return;
      tick = requestAnimationFrame(function () {
        tick = null;
        var r = deck.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width - 0.5;
        var cy = (e.clientY - r.top) / r.height - 0.5;
        stage.style.setProperty('--ry', (cx * 7).toFixed(2) + 'deg');
        stage.style.setProperty('--rx', (11 - cy * 7).toFixed(2) + 'deg');
      });
    };
    deck.addEventListener('mousemove', move);
    deck.addEventListener('mouseleave', function () {
      stage.style.setProperty('--ry', '0deg');
      stage.style.setProperty('--rx', '11deg');
    });
  }

  /* ── sticky product tour ───────────────────────────────────────────────
     The copy scrolls; the screenshot beside it swaps to match whichever
     step is currently in the reading position. Clicking a step jumps too. */
  var tour = $('.tour');
  if (tour) {
    var steps = $$('.tour-step', tour), shots = $$('.tour-imgs img', tour);
    var show = function (i) {
      steps.forEach(function (s, n) { s.classList.toggle('on', n === i); });
      shots.forEach(function (s, n) { s.classList.toggle('on', n === i); });
    };
    show(0);
    steps.forEach(function (s, i) {
      s.addEventListener('click', function () {
        show(i);
        if (window.innerWidth <= 940) s.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    });
    if (!RM && 'IntersectionObserver' in window) {
      var tio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) show(steps.indexOf(e.target));
        });
      }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
      steps.forEach(function (s) { tio.observe(s); });
    }
  }

  /* ── interactive industry picker (the hero) ────────────────────────────
     Chips choose a trade; the real demo for it loads inline on click. One
     screen, re-targeted — no six iframes fighting for memory.             */
  var pick = $('.pick');
  if (pick) {
    var chips = $$('.pchip', pick),
        shot = $('.pshot', pick), frame = $('#pframe', pick), launch = $('.plaunch', pick),
        urlb = $('.purl-t', pick), line = $('.pline', pick),
        lLabel = $('.plaunch b', pick), screen = $('.pscreen', pick);
    var current = null, loaded = false;

    function select(chip) {
      chips.forEach(function (c) { c.classList.toggle('on', c === chip); });
      current = chip.getAttribute('data-src');
      // swap poster with a quick crossfade
      shot.classList.add('fade');
      setTimeout(function () {
        shot.src = chip.getAttribute('data-shot');
        shot.classList.remove('fade');
      }, 200);
      if (urlb) urlb.textContent = chip.getAttribute('data-url');
      if (line) line.innerHTML = chip.getAttribute('data-line');
      if (lLabel) lLabel.textContent = 'Open the ' + chip.getAttribute('data-label') + ' demo';
      // reset to poster state for the new pick
      loaded = false;
      shot.style.display = '';
      launch.classList.remove('gone');
      frame.removeAttribute('src');
    }
    function go() {
      if (loaded || !current) return;
      loaded = true;
      frame.src = current;
      launch.classList.add('gone');
      shot.style.display = 'none';   // reveal the iframe beneath the poster
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { select(c); }); });
    if (screen) screen.addEventListener('click', go);
    launch.setAttribute('tabindex', '0');
    launch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
    if (chips[0]) select(chips[0]);
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
