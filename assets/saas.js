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
  var money = function (n) { return '₹' + Math.round(n).toLocaleString('en-IN'); };

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
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { load(); say('playVideo'); }
          else if (on) say('pauseVideo');
        });
      }, { threshold: 0.25 }).observe(box);
    } else { load(); }
  });

  /* ── 3. the price engine ──────────────────────────────────────────────── */
  var eng = $('[data-prx]');
  if (eng) {
    var CFG = null;
    try { CFG = JSON.parse(eng.getAttribute('data-prx')); } catch (_) { CFG = null; }
    var range = $('#prx-range', eng);

    if (CFG && range) {
      var mode = 'year';

      /* digits that roll, like a meter */
      var odo = function (box, n) {
        if (!box) return;
        var txt = Math.round(n).toLocaleString('en-IN');
        var shape = txt.replace(/[0-9]/g, '#');
        if (box.getAttribute('data-shape') !== shape) {
          box.setAttribute('data-shape', shape);
          box.innerHTML = txt.split('').map(function (ch) {
            return /[0-9]/.test(ch)
              ? '<i><u>' + '0123456789'.split('').map(function (d) { return '<b>' + d + '</b>'; }).join('') + '</u></i>'
              : '<i class="sep">' + ch + '</i>';
          }).join('');
        }
        var cols = $$('u', box), k = 0;
        txt.split('').forEach(function (ch) {
          if (!/[0-9]/.test(ch)) return;
          var u = cols[k++];
          if (u) u.style.transform = 'translateY(-' + (+ch) + 'em)';
        });
      };

      var slabFor = function (w) {
        for (var n = 0; n < CFG.slabs.length; n++) {
          if (CFG.slabs[n].max === null || w <= CFG.slabs[n].max) return CFG.slabs[n];
        }
        return CFG.slabs[CFG.slabs.length - 1];
      };

      var draw = function () {
        var w = Math.max(1, +range.value);
        $('#prx-count', eng).textContent = w.toLocaleString('en-IN');
        range.style.setProperty('--fill', ((w - +range.min) / (+range.max - +range.min) * 100) + '%');

        var s = slabFor(w);
        var monthly = Math.max(s.monthFloor, w * s.monthRate);
        var yearly = Math.max(s.yearFloor, w * s.yearRate * 12);

        /* light up the slab this headcount falls into */
        $$('.pc', eng).forEach(function (c) {
          c.classList.toggle('on', c.getAttribute('data-slab') === s.id);
        });

        /* every slab card follows the chosen way of paying */
        CFG.slabs.forEach(function (sl) {
          var card = $('#pc-' + sl.id, eng);
          if (!card) return;
          odo($('.odo', card), mode === 'month' ? sl.monthFloor : mode === 'lic' ? sl.licence : sl.yearFloor);
          var unit = $('.pc-unit', card), per = $('.pc-per', card), incl = $('.pc-inclw', card);
          if (unit) {
            unit.innerHTML = mode === 'month' ? 'a month<br>minimum'
              : mode === 'lic' ? 'one-time<br>licence' : 'a year<br>minimum';
          }
          if (per) per.textContent = money(mode === 'lic' ? sl.amc : mode === 'month' ? sl.monthRate : sl.yearRate);
          if (incl) {
            incl.innerHTML = mode === 'lic'
              ? 'a year from Year 2, Year 1 free'
              : 'per worker a month above the minimum';
          }
        });

        /* the quote panel */
        var amount, unit, sub, note;
        if (mode === 'month') {
          amount = monthly; unit = 'a month';
          sub = money(monthly / w) + ' per worker a month';
          note = 'Paying yearly instead would save ' + money(monthly * 12 - yearly) + ' over the year.';
        } else if (mode === 'lic') {
          amount = s.licence; unit = 'one-time';
          sub = money(s.amc) + ' a year from Year 2 · Year 1 maintenance free';
          note = 'It does not expire and it does not phone home. Run it on your own server if you want.';
        } else {
          amount = yearly; unit = 'a year';
          sub = money(yearly / 12 / w) + ' per worker a month · ' + money(yearly / 12) + ' a month equivalent';
          note = 'Yearly advance saves ' + money(monthly * 12 - yearly) + ' against paying monthly.';
        }
        var first = s.setup + amount;

        odo($('#prx-quote .odo', eng), amount);
        $('#q-slab', eng).textContent = s.name;
        $('#q-mode', eng).textContent = mode === 'month' ? 'monthly advance'
          : mode === 'lic' ? 'one-time licence' : 'yearly advance';
        $('#q-unit', eng).textContent = unit;
        $('#q-sub', eng).textContent = sub;
        $('#q-setup', eng).textContent = money(s.setup);
        $('#q-first', eng).textContent = money(first);
        $('#q-gst', eng).textContent = money(first * CFG.gst / 100);
        $('#q-pay', eng).textContent = money(first * (1 + CFG.gst / 100));
        $('#q-note', eng).textContent = note;

        /* what the same job costs bought in pieces */
        var ours = mode === 'month' ? monthly
          : mode === 'lic' ? (s.licence / 36 + s.amc / 12)
          : yearly / 12;
        var rows = $$('.vsr', eng), top = ours;
        var vals = rows.map(function (r) {
          if (r.classList.contains('us')) return ours;
          var v = (parseFloat(r.getAttribute('data-pwy')) || 0) * w / 12
                + (parseFloat(r.getAttribute('data-ply')) || 0) / 12
                + (parseFloat(r.getAttribute('data-pwm')) || 0) * w;
          top = Math.max(top, v);
          return v;
        });
        rows.forEach(function (r, n) {
          $('.vsr-b', r).style.width = Math.max(2, (vals[n] / top) * 100) + '%';
          $('.vsr-v', r).textContent = money(vals[n]);
        });

        var save = $('#prx-save', eng);
        if (save) {
          var stack = vals.reduce(function (acc, v, n) {
            return rows[n].classList.contains('us') ? acc : acc + v;
          }, 0);
          var diff = stack - ours;
          save.innerHTML = diff > 0
            ? 'That is <b>' + money(diff) + ' a month</b> less, and one system instead of three.'
            : 'One system instead of three, with muster rolls and payroll already in it.';
          if (mode === 'lic') {
            save.innerHTML += ' <span class="muted">Licence spread over three years, with AMC.</span>';
          }
        }
      };

      range.addEventListener('input', draw);
      $$('.sw button', eng).forEach(function (b) {
        b.addEventListener('click', function () {
          $$('.sw button', eng).forEach(function (o) { o.classList.toggle('on', o === b); });
          mode = b.getAttribute('data-bill');
          draw();
        });
      });

      /* first paint on scroll, so the digits roll up from zero */
      if ('IntersectionObserver' in window && !calm) {
        var once = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (!e.isIntersecting) return;
            once.disconnect();
            $$('.odo', eng).forEach(function (o) { odo(o, 0); });
            setTimeout(draw, 140);
          });
        }, { threshold: 0.15 });
        once.observe(eng);
      }
      draw();
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
    if (calm) {
      wipes.forEach(function (el) { el.classList.add('in'); });
    } else if ('IntersectionObserver' in window) {
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
    } else {
      wipes.forEach(function (el) { el.classList.add('in'); });
    }
  }
})();
