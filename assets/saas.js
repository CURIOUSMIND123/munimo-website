/* ──────────────────────────────────────────────────────────────────────────
   saas.js — the auto-running deck, the silent-film video frames, and the
   price engine. No dependencies. Everything degrades to readable static
   content if this file never loads.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var inr = function (n) { return '₹' + Math.round(n).toLocaleString('en-IN'); };

  /* ── 1. the deck ──────────────────────────────────────────────────────── */
  $$('[data-deck]').forEach(function (deck) {
    var slides = $$('.sl', deck);
    if (slides.length < 2) return;
    var dur = (parseFloat(deck.getAttribute('data-deck')) || 7) * 1000;
    var segWrap = $('.deck-seg', deck), ct = $('.deck-ct', deck);
    var i = 0, timer = null, held = false, seen = false;

    var segs = slides.map(function (_, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Slide ' + (n + 1) + ' of ' + slides.length);
      b.addEventListener('click', function () { go(n, true); });
      if (segWrap) segWrap.appendChild(b);
      return b;
    });
    if (segWrap) segWrap.style.setProperty('--dur', (dur / 1000) + 's');

    function paint() {
      slides.forEach(function (s, n) {
        var was = s.classList.contains('on');
        s.classList.toggle('on', n === i);
        s.classList.toggle('out', was && n !== i);
        s.setAttribute('aria-hidden', n === i ? 'false' : 'true');
      });
      segs.forEach(function (b, n) {
        b.classList.toggle('done', n < i);
        b.classList.remove('now');
        if (n === i) { void b.offsetWidth; b.classList.add('now'); }
      });
      if (ct) ct.textContent = (i + 1) + ' / ' + slides.length;
    }

    function go(n, manual) {
      i = (n + slides.length) % slides.length;
      paint();
      if (manual) { stop(); if (!held) start(); }
    }
    function start() { if (calm || held || !seen) return; stop(); timer = setTimeout(function () { go(i + 1); start(); }, dur); }
    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    function hold(on) {
      held = on;
      deck.classList.toggle('hold', on);
      if (on) stop(); else start();
    }

    var prev = $('.deck-prev', deck), next = $('.deck-next', deck);
    if (prev) prev.addEventListener('click', function () { go(i - 1, true); });
    if (next) next.addEventListener('click', function () { go(i + 1, true); });

    deck.addEventListener('mouseenter', function () { hold(true); });
    deck.addEventListener('mouseleave', function () { hold(false); });
    deck.addEventListener('focusin', function () { hold(true); });
    deck.addEventListener('focusout', function () { hold(false); });
    deck.setAttribute('tabindex', '0');
    deck.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, true); }
    });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

    /* only run while it is actually on screen */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { seen = e.isIntersecting; seen ? start() : stop(); });
      }, { threshold: 0.3 }).observe(deck);
    } else { seen = true; start(); }

    paint();
  });

  /* ── 2. video, loaded late and kept silent ────────────────────────────── */
  $$('[data-film]').forEach(function (box) {
    var id = box.getAttribute('data-film');
    var frame = $('iframe', box), hold = $('.vhold', box), btn = $('.vsound', box);
    if (!frame) return;
    var on = false, loud = false;

    function reveal() { if (hold) hold.classList.add('gone'); }

    function load() {
      if (on) return; on = true;
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&mute=1&loop=1&playlist=' + id +
        '&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3' +
        '&disablekb=1&fs=0&playsinline=1&enablejsapi=1&cc_load_policy=0';
      /* ask the player to report its state, so the still only lifts once the
         film is genuinely running. If it never does, the still stays — which
         looks deliberate, where a black rectangle does not. */
      var poll = setInterval(function () {
        try { frame.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*'); } catch (_) {}
      }, 400);
      setTimeout(function () { clearInterval(poll); }, 8000);
    }

    window.addEventListener('message', function (e) {
      if (!on || !e.data || e.source !== frame.contentWindow) return;
      var d = e.data;
      if (typeof d === 'string') { try { d = JSON.parse(d); } catch (_) { return; } }
      if (d && d.event === 'infoDelivery' && d.info && d.info.playerState === 1) reveal();
    });

    function say(fn) {
      try {
        frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: fn, args: [] }), '*');
      } catch (_) {}
    }

    if (btn) btn.addEventListener('click', function () {
      if (!on) load();
      loud = !loud;
      say(loud ? 'unMute' : 'mute');
      btn.querySelector('b').textContent = loud ? 'Sound on' : 'Sound off';
      btn.setAttribute('aria-pressed', loud ? 'true' : 'false');
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { load(); say('playVideo'); }
          else if (on) say('pauseVideo');
        });
      }, { threshold: 0.25 });
      io.observe(box);
    } else { load(); }
  });

  /* ── 3. the price engine ──────────────────────────────────────────────── */
  var eng = $('[data-prx]');
  if (eng) {
    var CFG = {};
    try { CFG = JSON.parse(eng.getAttribute('data-prx')); } catch (_) { CFG = null; }
    if (CFG) {
      var range = $('#prx-range', eng);
      var count = $('#prx-count', eng);
      var annual = false;

      /* digits that roll, like a meter */
      function odo(box, n) {
        var txt = Math.round(n).toLocaleString('en-IN');
        if (box.getAttribute('data-shape') !== txt.replace(/\d/g, '#')) {
          box.setAttribute('data-shape', txt.replace(/\d/g, '#'));
          box.innerHTML = txt.split('').map(function (ch) {
            if (/\d/.test(ch)) {
              return '<i><u>' + '0123456789'.split('').map(function (d) { return '<b>' + d + '</b>'; }).join('') + '</u></i>';
            }
            return '<i class="sep">' + ch + '</i>';
          }).join('');
        }
        var cols = $$('u', box), k = 0;
        txt.split('').forEach(function (ch) {
          if (!/\d/.test(ch)) return;
          var u = cols[k++];
          if (u) u.style.transform = 'translateY(-' + (+ch) + 'em)';
        });
      }

      function draw() {
        var w = Math.max(CFG.min, +range.value);
        count.textContent = w.toLocaleString('en-IN');
        range.style.setProperty('--fill', ((w - +range.min) / (+range.max - +range.min) * 100) + '%');

        var mult = annual ? CFG.annualMonths / 12 : 1;

        /* each tier card */
        CFG.tiers.forEach(function (t) {
          var card = $('#pc-' + t.id, eng);
          if (!card) return;
          var per = t.price * mult;
          odo($('.odo', card), per);
          var tot = $('.pc-tot', card);
          if (tot) {
            var m = t.price * w * mult;
            tot.innerHTML = '<b>' + inr(m) + '</b> a month for ' + w.toLocaleString('en-IN') + ' workers' +
              (annual ? '<br><span class="save">' + inr(t.price * w * 12 - t.price * w * CFG.annualMonths) +
                ' saved over the year</span>' : '');
          }
        });

        /* what the same job costs bought in pieces */
        var ours = CFG.tiers[CFG.compare] ? CFG.tiers[CFG.compare].price * w * mult : 0;
        var rows = $$('.vsr', eng), top = ours;
        var vals = rows.map(function (r) {
          var v;
          if (r.classList.contains('us')) v = ours;
          else {
            v = 0;
            var pw = parseFloat(r.getAttribute('data-pwy')) || 0;
            var pl = parseFloat(r.getAttribute('data-ply')) || 0;
            var pm = parseFloat(r.getAttribute('data-pwm')) || 0;
            v = (pw * w) / 12 + pl / 12 + pm * w;
          }
          top = Math.max(top, v);
          return v;
        });
        rows.forEach(function (r, n) {
          $('.vsr-b', r).style.width = Math.max(2, (vals[n] / top) * 100) + '%';
          $('.vsr-v', r).textContent = inr(vals[n]);
        });

        var save = $('#prx-save', eng);
        if (save) {
          var stack = vals.reduce(function (a, v, n) { return rows[n].classList.contains('us') ? a : a + v; }, 0);
          var diff = stack - ours;
          save.innerHTML = diff > 0
            ? 'That is <b>' + inr(diff) + ' a month</b> less, and one system instead of three.'
            : 'One system instead of three, with payroll already in it.';
        }
      }

      if (range) {
        range.addEventListener('input', draw);
        $$('.sw button', eng).forEach(function (b) {
          b.addEventListener('click', function () {
            $$('.sw button', eng).forEach(function (o) { o.classList.toggle('on', o === b); });
            annual = b.getAttribute('data-bill') === 'year';
            draw();
          });
        });
        /* first paint once it scrolls into view, so the digits roll up from zero */
        if ('IntersectionObserver' in window && !calm) {
          var once = new IntersectionObserver(function (es) {
            es.forEach(function (e) {
              if (!e.isIntersecting) return;
              once.disconnect();
              $$('.odo', eng).forEach(function (o) { odo(o, 0); });
              setTimeout(draw, 120);
            });
          }, { threshold: 0.2 });
          once.observe(eng);
          draw();
        } else { draw(); }
      }
    }
  }

  /* ── 4. the pointer spotlight ─────────────────────────────────────────── */
  var spots = $$('.spot');
  if (spots.length && !calm) {
    spots.forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ── 5. headlines that wipe in word by word ───────────────────────────── */
  var wipes = $$('.wipe');
  if (wipes.length) {
    wipes.forEach(function (el) {
      if (el.getAttribute('data-split') === 'done') return;
      el.setAttribute('data-split', 'done');
      var frag = document.createDocumentFragment();
      Array.prototype.slice.call(el.childNodes).forEach(function (node) {
        if (node.nodeType !== 3) { frag.appendChild(node.cloneNode(true)); return; }
        node.nodeValue.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
          var s = document.createElement('span');
          s.textContent = w;
          frag.appendChild(s);
        });
      });
      el.innerHTML = '';
      el.appendChild(frag);
      $$('span', el).forEach(function (s, n) { s.style.transitionDelay = (n * 0.045) + 's'; });
    });
    if (calm) { wipes.forEach(function (el) { el.classList.add('in'); }); }
    else if ('IntersectionObserver' in window) {
      var wio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); wio.unobserve(e.target); } });
      }, { threshold: 0.25 });
      wipes.forEach(function (el) { wio.observe(el); });
      /* safety: anything still hidden after load gets shown */
      window.addEventListener('load', function () {
        setTimeout(function () {
          wipes.forEach(function (el) {
            if (!el.classList.contains('in') && el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
          });
        }, 400);
      });
    } else { wipes.forEach(function (el) { el.classList.add('in'); }); }
  }
})();
