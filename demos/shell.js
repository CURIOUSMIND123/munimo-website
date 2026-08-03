/* ═══════════════════════════════════════════════════════════════════════════
   Vertical demo engine. A config declares the sidebar, the KPIs and the views;
   this renders them and keeps state in memory so the demo actually responds —
   collect a fee and the dues drop, mark attendance and the percentage moves.
   Everything resets on reload. No server, no data leaves the browser.
   ═══════════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var I = {
    grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M17 11a3 3 0 1 0-1.5-5.6M18 20a6 6 0 0 0-3-5.2"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M20 7 10 17l-5-5"/></svg>',
    rupee: '<svg viewBox="0 0 24 24"><path d="M6 4h12M6 9h12M16 4c0 4-3 5-6 5l7 10"/></svg>',
    award: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.4A4 4 0 0 1 12 8a4 4 0 0 1 7 2.6c0 5-7 9.4-7 9.4z"/></svg>',
    box: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M14 3v5h5"/><path d="M19 8v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8z"/></svg>',
    stetho: '<svg viewBox="0 0 24 24"><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    alert: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/></svg>',
  };

  var PALETTE = ['#12b981', '#3b82f6', '#a855f7', '#f0b429', '#ef4444', '#14b8a6', '#f97316'];
  function tint(seed) {
    var n = 0;
    for (var i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) >>> 0;
    return PALETTE[n % PALETTE.length];
  }
  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }
  function money(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function who(name, sub) {
    return '<div class="who"><div class="av" style="background:' + tint(name) + '">' + esc(initials(name)) +
           '</div><div><b>' + esc(name) + '</b>' + (sub ? '<span>' + esc(sub) + '</span>' : '') + '</div></div>';
  }
  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function Demo(cfg) {
    this.cfg = cfg;
    this.view = cfg.views[0].id;
    this.state = cfg.state;
    this.mount();
  }

  Demo.prototype.mount = function () {
    var c = this.cfg, self = this;
    document.title = c.title;
    document.body.classList.add('has-ribbon');
    document.body.innerHTML =
      '<div class="ribbon">Live demo &mdash; sample data only. <a href="/contact.html">Ask for this, built for you</a></div>' +
      '<div class="app">' +
        '<aside class="sb" id="sb">' +
          '<div class="sb-top"><img src="/assets/munimo-icon.svg" alt="">' +
            '<div><b>' + esc(c.brand) + '</b><span>' + esc(c.brandSub) + '</span></div></div>' +
          '<nav class="sb-nav" id="nav"></nav>' +
          '<div class="sb-user"><div class="av" style="background:' + tint(c.user) + '">' + initials(c.user) + '</div>' +
            '<div><b>' + esc(c.user) + '</b><span>' + esc(c.userRole) + '</span></div></div>' +
        '</aside>' +
        '<div class="scrim" id="scrim"></div>' +
        '<main class="main">' +
          '<header class="hd"><button class="burger" id="burger"><i></i><i></i><i></i></button>' +
            '<div><h1 id="ttl"></h1><div class="sub" id="sub"></div></div>' +
            '<div class="sp" id="acts"></div></header>' +
          '<div class="body" id="body"></div>' +
        '</main>' +
      '</div>' +
      '<div class="mask" id="mask"><div class="modal"><div class="modal-h"><h3 id="mt"></h3>' +
        '<button id="mx" aria-label="Close">&times;</button></div>' +
        '<div class="modal-b" id="mb"></div><div class="modal-f" id="mf"></div></div></div>' +
      '<div class="toast" id="toast">' + I.check + '<span id="tmsg"></span></div>';

    var nav = document.getElementById('nav');
    c.views.forEach(function (v, i) {
      if (v.group) nav.appendChild(el('<div class="sb-lbl">' + esc(v.group) + '</div>'));
      var b = el('<div class="sb-i' + (i === 0 ? ' on' : '') + '" data-v="' + v.id + '">' + (I[v.icon] || I.grid) +
                 '<span>' + esc(v.name) + '</span></div>');
      b.addEventListener('click', function () { self.go(v.id); });
      nav.appendChild(b);
    });

    var sb = document.getElementById('sb'), scrim = document.getElementById('scrim');
    document.getElementById('burger').addEventListener('click', function () {
      sb.classList.add('open'); scrim.classList.add('on');
    });
    scrim.addEventListener('click', function () { sb.classList.remove('open'); scrim.classList.remove('on'); });
    document.getElementById('mx').addEventListener('click', function () { self.close(); });
    document.getElementById('mask').addEventListener('click', function (e) {
      if (e.target.id === 'mask') self.close();
    });
    this.render();
  };

  Demo.prototype.go = function (id) {
    this.view = id;
    var nodes = document.querySelectorAll('.sb-i');
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.toggle('on', nodes[i].getAttribute('data-v') === id);
    document.getElementById('sb').classList.remove('open');
    document.getElementById('scrim').classList.remove('on');
    window.scrollTo(0, 0);
    this.render();
  };

  Demo.prototype.render = function () {
    var self = this;
    var v = this.cfg.views.filter(function (x) { return x.id === self.view; })[0];
    document.getElementById('ttl').textContent = v.name;
    document.getElementById('sub').textContent = v.sub || '';
    var acts = document.getElementById('acts');
    acts.innerHTML = '';
    (v.actions || []).forEach(function (a) {
      var b = el('<button class="btn ' + (a.primary ? 'btn-p' : 'btn-g') + '">' + (a.icon ? I[a.icon] : '') +
                 '<span>' + esc(a.label) + '</span></button>');
      b.addEventListener('click', function () { a.run(self); });
      acts.appendChild(b);
    });
    document.getElementById('body').innerHTML = v.render(this);
    (v.after || function () {})(this);
  };

  /* ── modal ── */
  Demo.prototype.open = function (title, html, buttons) {
    var self = this;
    document.getElementById('mt').textContent = title;
    document.getElementById('mb').innerHTML = html;
    var f = document.getElementById('mf');
    f.innerHTML = '';
    (buttons || []).forEach(function (b) {
      var n = el('<button class="btn ' + (b.primary ? 'btn-p' : 'btn-g') + '">' + esc(b.label) + '</button>');
      n.addEventListener('click', function () { b.run(self); });
      f.appendChild(n);
    });
    document.getElementById('mask').classList.add('on');
  };
  Demo.prototype.close = function () { document.getElementById('mask').classList.remove('on'); };
  Demo.prototype.val = function (name) {
    var n = document.querySelector('#mb [name="' + name + '"]');
    return n ? n.value.trim() : '';
  };
  Demo.prototype.toast = function (msg) {
    var t = document.getElementById('toast');
    document.getElementById('tmsg').textContent = msg;
    t.classList.add('on');
    clearTimeout(this._tt);
    this._tt = setTimeout(function () { t.classList.remove('on'); }, 2600);
  };

  /* ── view helpers ── */
  Demo.prototype.kpis = function (items) {
    return '<div class="kpis">' + items.map(function (k) {
      return '<div class="kpi ' + (k.tone || '') + '"><div class="k">' + (I[k.icon] || '') + esc(k.label) + '</div>' +
             '<div class="v">' + k.value + '</div><div class="s">' + esc(k.sub || '') + '</div></div>';
    }).join('') + '</div>';
  };
  Demo.prototype.panel = function (title, inner, tools) {
    return '<section class="panel"><div class="panel-h"><h2>' + esc(title) + '</h2>' +
           (tools ? '<div class="sp">' + tools + '</div>' : '') + '</div>' + inner + '</section>';
  };
  Demo.prototype.table = function (cols, rows) {
    return '<div class="tbl-wrap"><table class="tbl"><thead><tr>' +
      cols.map(function (c) { return '<th' + (c.num ? ' class="num"' : '') + '>' + esc(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r) {
        return '<tr>' + r.map(function (cell, i) {
          return '<td' + (cols[i] && cols[i].num ? ' class="num"' : '') + '>' + cell + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  };

  global.MunimoDemo = { Demo: Demo, I: I, money: money, who: who, tint: tint, initials: initials, esc: esc, el: el };
})(window);
