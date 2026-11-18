/* ──────────────────────────────────────────────────────────────────────────
   wfdemo.js — the working demonstration. A scripted run of what the worker
   taps on his phone and what the office sees on the dashboard, in step.
   Four duty types, each with its own checks, map and pay line.

   Everything is built from these scenarios at run time, so there is one
   place to change a name, a station or a rate.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var root = document.querySelector('[data-wf]');
  if (!root) return;

  var $ = function (s, r) { return (r || root).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || root).querySelectorAll(s)); };
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var money = function (n) { return '₹' + Math.round(n).toLocaleString('en-IN'); };
  var esc = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  /* ── the four kinds of duty ───────────────────────────────────────────── */
  var TYPES = {
    train: {
      label: 'Train duty',
      worker: { name: 'Bikash Rabha', role: 'OBHS attendant · Train 15658', ini: 'BR' },
      url: 'munimo.online/board · Adidev Commercials · OBHS Guwahati',
      nodes: ['Guwahati', 'Rangiya', 'Rangapara', 'Dekargaon'],
      pay: { rate: 640, hours: '8h 20m', head: 'Day proven' },
      kpis: ['On duty now', 'Proven today', 'Waiting on a person', 'Unit'],
      base: [812, 604, 3, '15658'],
      steps: [
        { cue: 'Duty due', screen: 'due', cap: 'The duty comes to him',
          note: 'No register, no phone call. The app knows the train, the timetable and the starting station.' },
        { cue: 'Face check', screen: 'face', cap: 'His face, and a blink',
          note: 'Matched on the handset itself, so it finishes with no signal at all. A photo held to the camera fails.' },
        { cue: 'Position', screen: 'gps', cap: 'The right station, the right train',
          note: 'GPS checked against the starting station for that train number. A mock-location app is caught here.' },
        { cue: 'On duty', screen: 'live', cap: 'The board changes the moment he marks in', dash: 'start',
          note: 'The office does not wait for a report. His row appears, stamped with the time and the place.' },
        { cue: 'Mid-route', screen: 'check', cap: 'A random check he cannot plan for', dash: 'mid',
          note: 'Somewhere in the run the app asks again. The trail he actually travelled is drawn as it arrives.' },
        { cue: 'Destination', screen: 'done', cap: 'Closed at the destination', dash: 'end',
          note: 'Face and GPS again at the far end, or in the yard the rake was moved to. Two ends, one timetable.' },
        { cue: 'Pay', screen: 'pay', cap: 'And it becomes money', dash: 'pay',
          note: 'The day is proven, so it is paid. Nothing is re-typed, and nothing in doubt is paid automatically.' },
      ],
    },
    station: {
      label: 'Station shift',
      worker: { name: 'Mamoni Das', role: 'Station housekeeping · Platform 3', ini: 'MD' },
      url: 'munimo.online/board · Adidev Commercials · Kamakhya station',
      nodes: ['Gate', 'PF 1–2', 'PF 3–4', 'Concourse'],
      pay: { rate: 520, hours: '8h 00m', head: 'Shift proven' },
      kpis: ['On shift now', 'Proven today', 'Left the fence', 'Platform'],
      base: [46, 38, 1, 'PF 3'],
      steps: [
        { cue: 'Shift due', screen: 'due', cap: 'The shift, not a guess',
          note: 'Rosters are set per contract. She sees her own shift, her own platform and her own window to mark in.' },
        { cue: 'Face check', screen: 'face', cap: 'Her face, and a blink',
          note: 'The same liveness test everywhere. One man, one phone: a hardware key ties the code to the handset.' },
        { cue: 'Fence', screen: 'gps', cap: 'Inside the station fence',
          note: 'A fence is drawn around the station area. Marking in from the road outside simply does not take.' },
        { cue: 'On shift', screen: 'live', cap: 'The supervisor sees the platform fill', dash: 'start',
          note: 'A live count per platform, not a sheet collected at the end of the day.' },
        { cue: 'Spot check', screen: 'check', cap: 'Checked again inside the shift', dash: 'mid',
          note: 'Random checks stop the oldest trick there is: mark in, walk away, come back at closing.' },
        { cue: 'Shift end', screen: 'done', cap: 'Closed inside the fence', dash: 'end',
          note: 'Out is checked exactly like in. A shift with only one end is not a proven shift.' },
        { cue: 'Pay', screen: 'pay', cap: 'And it becomes money', dash: 'pay',
          note: 'Muster roll, EPF and ESIC registers and the bank payout sheet all come out of the same proven days.' },
      ],
    },
    site: {
      label: 'Site gang',
      worker: { name: 'Ranjit Boro', role: 'Supervisor · Gang of 14', ini: 'RB' },
      url: 'munimo.online/board · Adidev Commercials · Depot yard',
      nodes: ['Gate', 'Yard A', 'Yard B', 'Stores'],
      pay: { rate: 680, hours: '14 men', head: 'Gang proven' },
      kpis: ['Men on site', 'Gangs marked', 'Flagged', 'Site'],
      base: [128, 9, 0, 'Yard A'],
      steps: [
        { cue: 'Gang due', screen: 'due', cap: 'One phone for the whole gang',
          note: 'Contract labour needs no phone of its own. The supervisor’s handset is the kiosk, and it costs nothing.' },
        { cue: 'Face, man by man', screen: 'face', cap: 'Fourteen faces in about a minute',
          note: 'He holds the phone up and each man steps in. No machine bought, mounted and wired at every site.' },
        { cue: 'Fence', screen: 'gps', cap: 'Inside the site fence',
          note: 'The gang is marked at the site, not from the contractor’s office ten kilometres away.' },
        { cue: 'Marked', screen: 'live', cap: 'Fourteen rows, not one claim', dash: 'start',
          note: 'Every man lands on the board as himself, with his own face behind him.' },
        { cue: 'Spot check', screen: 'check', cap: 'A check during the shift', dash: 'mid',
          note: 'The app picks the moment, not the supervisor. What is checked is recorded whichever way it goes.' },
        { cue: 'Closing', screen: 'done', cap: 'Out at the site’s closing hour', dash: 'end',
          note: 'Closing hour, short-day rule and overtime are set per contract, not once for the whole company.' },
        { cue: 'Pay', screen: 'pay', cap: 'And it becomes money', dash: 'pay',
          note: 'Fourteen proven days, at fourteen agreed rates, straight into the muster and the payout sheet.' },
      ],
    },
    track: {
      label: 'Track patrol',
      worker: { name: 'Jiten Nath', role: 'Keyman · Beat KM 41–48', ini: 'JN' },
      url: 'munimo.online/board · Adidev Commercials · P-Way patrol',
      nodes: ['KM 41', 'KM 43', 'KM 45', 'KM 48'],
      pay: { rate: 700, hours: '7 km walked', head: 'Beat proven' },
      kpis: ['On patrol', 'Beats closed', 'Checkpoints missed', 'Beat'],
      base: [17, 12, 1, '41–48'],
      steps: [
        { cue: 'Beat due', screen: 'due', cap: 'The beat, with its checkpoints',
          note: 'A patrol is not one place. It is a route with points along it, and a time it has to be walked in.' },
        { cue: 'Face check', screen: 'face', cap: 'His face at KM 41',
          note: 'The beat opens with the same liveness check as every other duty. No special case, no weaker rule.' },
        { cue: 'Start', screen: 'gps', cap: 'Start of beat confirmed',
          note: 'There is often no network out here. The check completes on the handset and syncs when a bar appears.' },
        { cue: 'Walking', screen: 'live', cap: 'The trail draws itself', dash: 'start',
          note: 'The office watches the line extend along the track, point by point, instead of taking his word.' },
        { cue: 'Missed point', screen: 'check', cap: 'A point he did not reach', dash: 'mid',
          note: 'KM 45 is raised in red rather than buried. The system’s job is to show it, not to smooth it over.' },
        { cue: 'Beat closed', screen: 'done', cap: 'Closed at KM 48', dash: 'end',
          note: 'The beat is closed with what actually happened on it, including the point that was missed.' },
        { cue: 'Pay', screen: 'pay', cap: 'And it becomes money', dash: 'pay',
          note: 'A beat with a missed point waits for a named person to decide. It is not quietly paid in full.' },
      ],
    },
  };

  var NAMES = ['Akhil Tanti', 'Babul Hussain', 'Dinesh Yadav', 'Jiten Boro', 'Manoj Das',
    'Nazrul Islam', 'Pankaj Nath', 'Rakesh Sah', 'Samir Ali', 'Tarun Deka'];

  /* ── build the shell ──────────────────────────────────────────────────── */
  var cur = 'train', step = 0, timer = null, playing = true, seen = false;

  var tabs = $$('.wf-tab');
  var phone = $('.wfp-scr');
  var dash = $('.wfd');
  var railB = $('.wf-step b');
  var railP = $('.wf-step p');
  var dots = $('.wf-dots');
  var playBtn = $('.wf-play');

  function T() { return TYPES[cur]; }

  /* ── the phone screens ────────────────────────────────────────────────── */
  function faceSvg() {
    return '<div class="wff"><div class="wff-oval"><div class="wff-head">' +
      '<i class="wff-eye l"></i><i class="wff-eye r"></i><i class="wff-mouth"></i></div></div>' +
      '<div class="wff-scan"></div><span class="wff-tag">Blink now</span></div>';
  }

  function gpsSvg(t) {
    return '<div class="wfg"><svg viewBox="0 0 200 150" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="wfg-fence" d="M34 26 L168 34 L160 122 L28 112 Z"/>' +
      '<circle class="wfg-me" cx="98" cy="72" r="7"/>' +
      '<circle cx="98" cy="72" r="18" fill="none" stroke="rgba(233,187,82,.35)" stroke-width="1.5"/>' +
      '</svg><div class="wfg-tag">' + esc(t.nodes[0]) +
      ' · <b>inside the fence</b><br>Accuracy 6 m · mock location not detected</div></div>';
  }

  function screens(t) {
    var w = t.worker;
    return {
      due: '<p class="wfs-eye">' + esc(t.label) + '</p>' +
        '<h4>' + esc(t.steps[0].cap) + '</h4>' +
        '<div class="wfc"><p class="wfc-t">' + esc(w.role) + '</p>' +
        '<div class="wfc-row"><span>Starts</span><b>06:40</b></div>' +
        '<div class="wfc-row"><span>Place</span><b>' + esc(t.nodes[0]) + '</b></div>' +
        '<div class="wfc-row"><span>Window</span><b>06:10 – 07:10</b></div></div>' +
        '<p>Mark in with your face at the place shown. It works with no network.</p>' +
        '<div style="flex:1"></div>' +
        '<button class="wfb" type="button" tabindex="-1">Start duty</button>',

      face: '<p class="wfs-eye">Step 1 of 2</p><h4>Show your face</h4>' + faceSvg() +
        '<p>Matched on this phone. Nothing is sent anywhere to check it.</p>',

      gps: '<p class="wfs-eye">Step 2 of 2</p><h4>Checking where you are</h4>' + gpsSvg(t) +
        '<button class="wfb" type="button" tabindex="-1">Confirm and start</button>',

      live: '<p class="wfs-eye">On duty</p><h4>' + esc(t.nodes[0]) + ', 06:38</h4>' +
        '<div class="wfc"><div class="wfc-row"><span>Running</span><b class="wf-timer">00:04:12</b></div>' +
        '<div class="wfc-row"><span>Face</span><b style="color:#34d399">Matched</b></div>' +
        '<div class="wfc-row"><span>Position</span><b style="color:#34d399">Confirmed</b></div></div>' +
        '<p>Keep the phone with you. If it kills the app, that is recorded as the phone’s doing, not yours.</p>' +
        '<div style="flex:1"></div>' +
        '<button class="wfb ghost" type="button" tabindex="-1">Close duty</button>',

      check: '<p class="wfs-eye amber">Random check</p><h4>Check in again, now</h4>' + faceSvg() +
        '<p>The app picks the moment. You have ten minutes to answer it.</p>',

      done: '<p class="wfs-eye">Duty closed</p><h4>' +
        esc(t.nodes[t.nodes.length - 1]) + ', 15:00</h4>' +
        '<div class="wfc"><div class="wfc-row"><span>Worked</span><b>' + esc(t.pay.hours) + '</b></div>' +
        '<div class="wfc-row"><span>Checks passed</span><b style="color:#34d399">3 of 3</b></div>' +
        '<div class="wfc-row"><span>Status</span><b style="color:#34d399">Proven</b></div></div>' +
        '<p>Both ends checked. Nothing for you to fill in and nothing to sign.</p>',

      pay: '<p class="wfs-eye">Your month</p><h4>' + esc(t.pay.head) + '</h4>' +
        '<div class="wfc"><div class="wfc-row"><span>Rate</span><b>' + money(t.pay.rate) + ' a day</b></div>' +
        '<div class="wfc-row"><span>Proven days</span><b>24</b></div>' +
        '<div class="wfc-row"><span>Overtime</span><b>6h</b></div>' +
        '<div class="wfc-row" style="margin-top:7px;padding-top:7px;border-top:1px solid rgba(255,255,255,.08)">' +
        '<span>Payable</span><b style="color:#34d399">' + money(t.pay.rate * 24 + 6 * (t.pay.rate / 8)) + '</b></div></div>' +
        '<p>The same figure the office sees. No separate wage sheet to argue with.</p>',
    };
  }

  function paintPhone() {
    var t = T();
    var sc = screens(t);
    var want = t.steps[step].screen;
    phone.innerHTML =
      '<div class="wfp-bar"><span>6:38</span><i><b></b><b></b><b></b></i></div>' +
      '<div class="wfp-who"><span class="wfp-av">' + esc(t.worker.ini) + '</span>' +
      '<span><b>' + esc(t.worker.name) + '</b><small>' + esc(t.worker.role) + '</small></span></div>' +
      '<div class="wfp-body">' +
      Object.keys(sc).map(function (k) {
        return '<div class="wfs' + (k === want ? ' on' : '') + '" data-s="' + k + '">' + sc[k] + '</div>';
      }).join('') +
      '<span class="wfp-cue' + (t.steps[step].cue ? ' on' : '') + '">' + esc(t.steps[step].cue) + '</span>' +
      '<span class="wf-tap"></span></div>';

    /* the little animations that belong to a screen */
    if (want === 'face' || want === 'check') runFace();
    if (want === 'due' || want === 'gps') runTap(want);
    if (want === 'live') runTimer();
  }

  var faceT = [];
  function clearFace() { faceT.forEach(clearTimeout); faceT = []; }
  function runFace() {
    clearFace();
    var ff = $('.wfs.on .wff', phone);
    if (!ff || calm) { if (ff) ff.classList.add('lock'); return; }
    var tag = $('.wff-tag', ff);
    faceT.push(setTimeout(function () { ff.classList.add('blink'); }, 900));
    faceT.push(setTimeout(function () { ff.classList.remove('blink'); }, 1060));
    faceT.push(setTimeout(function () { ff.classList.add('blink'); }, 1260));
    faceT.push(setTimeout(function () { ff.classList.remove('blink'); }, 1420));
    faceT.push(setTimeout(function () {
      ff.classList.add('lock');
      if (tag) tag.textContent = 'Face matched';
    }, 1750));
  }

  function runTap(which) {
    if (calm) return;
    var btn = $('.wfs.on .wfb', phone), tap = $('.wf-tap', phone);
    if (!btn || !tap) return;
    faceT.push(setTimeout(function () {
      var pr = phone.getBoundingClientRect(), br = btn.getBoundingClientRect();
      tap.style.left = (br.left - pr.left + br.width / 2) + 'px';
      tap.style.top = (br.top - pr.top + br.height / 2) + 'px';
      tap.classList.remove('go'); void tap.offsetWidth; tap.classList.add('go');
      btn.classList.add('press');
      setTimeout(function () { btn.classList.remove('press'); }, 700);
    }, which === 'gps' ? 1500 : 1700));
  }

  var tickT = null;
  function runTimer() {
    if (tickT) clearInterval(tickT);
    var el = $('.wf-timer', phone);
    if (!el || calm) return;
    var s = 252;
    tickT = setInterval(function () {
      s += 1;
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
      el.textContent = ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + x).slice(-2);
    }, 1000);
  }

  /* ── the dashboard ────────────────────────────────────────────────────── */
  function mapSvg(t, phase) {
    var n = t.nodes.length;
    var pts = t.nodes.map(function (_, i) {
      return { x: 26 + i * (348 / (n - 1)), y: 86 + (i % 2 ? -22 : 20) + (i === 2 ? -8 : 0) };
    });
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p.x + ' ' + p.y; }).join(' ');
    var reach = phase === 'start' ? 1 : phase === 'mid' ? 3
      : (phase === 'end' || phase === 'pay') ? n : 0;
    var miss = (cur === 'track' && reach > 2) ? 2 : -1;
    var total = 400;
    var frac = reach > 1 ? (reach - 1) / (n - 1) : 0;
    var at = Math.max(reach - 1, 0);

    var grid = '';
    for (var g = 0; g <= 400; g += 40) grid += '<line class="wfmap-grid" x1="' + g + '" y1="0" x2="' + g + '" y2="150"/>';
    for (var h = 0; h <= 150; h += 30) grid += '<line class="wfmap-grid" x1="0" y1="' + h + '" x2="400" y2="' + h + '"/>';

    return '<svg viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">' + grid +
      '<path class="wfmap-route" d="' + d + '"/>' +
      '<path class="wfmap-trail" d="' + d + '" stroke-dasharray="' + total + '" stroke-dashoffset="' +
        (total - total * frac) + '"/>' +
      pts.map(function (p, i) {
        var cls = i < reach ? (i === miss ? 'miss' : 'hit') : '';
        return '<circle class="wfmap-node ' + cls + '" cx="' + p.x + '" cy="' + p.y + '" r="6"/>' +
          '<text class="wfmap-lab' + (i < reach ? ' on' : '') + '" x="' + p.x + '" y="' + (p.y - 13) +
          '" text-anchor="middle">' + esc(t.nodes[i]) + '</text>';
      }).join('') +
      '<circle class="wfmap-dot" cx="' + pts[0].x + '" cy="' + pts[0].y + '" r="5"' +
        (reach ? ' transform="translate(' + (pts[at].x - pts[0].x) + ',' + (pts[at].y - pts[0].y) + ')"' : ' opacity="0"') +
        '/>' +
      '</svg>' +
      '<p class="wfmap-cap">' +
      (reach === 0
        ? 'Nothing yet · the trail draws itself as he moves'
        : reach === 1
          ? 'Marked in at <b>' + esc(t.nodes[0]) + '</b> · the trail starts here'
        : miss >= 0
          ? '<b style="color:#f87171">' + esc(t.nodes[miss]) + ' missed</b> · raised for a person to look at'
          : '<b>' + (reach - 1) + ' of ' + (n - 1) + '</b> legs confirmed · trail from the handset') +
      '</p>';
  }

  function boardRows(t, phase) {
    var showMine = phase !== null;
    var rows = [];
    if (showMine) {
      rows.push({
        n: t.worker.name, s: t.nodes[0], time: '06:38',
        pill: phase === 'end' || phase === 'pay' ? 'done' : 'on',
        txt: phase === 'end' || phase === 'pay' ? 'Proven' : 'On duty', me: true,
      });
    }
    var fill = cur === 'site' ? 5 : 4;
    for (var i = 0; i < fill; i++) {
      rows.push({
        n: NAMES[i], s: t.nodes[i % t.nodes.length], time: '06:' + (12 + i * 5),
        pill: i === 2 && cur === 'track' ? 'wait' : i === 3 ? 'off' : 'on',
        txt: i === 2 && cur === 'track' ? 'Waiting' : i === 3 ? 'Closed' : 'On duty',
      });
    }
    return rows.map(function (r, i) {
      return '<div class="wfrow' + (r.me ? ' mine' : '') + '" style="transition-delay:' + (i * 55) + 'ms">' +
        '<span><b>' + esc(r.n) + '</b><small>' + esc(r.s) + '</small></span>' +
        '<time>' + r.time + '</time>' +
        '<span class="pill2 ' + r.pill + '">' + r.txt + '</span></div>';
    }).join('');
  }

  function paintDash() {
    var t = T();
    var st = t.steps[step];
    var phase = st.dash || null;
    var k = t.base.slice();
    if (phase) k[0] = k[0] + (cur === 'site' ? 14 : 1);
    if (phase === 'end' || phase === 'pay') k[1] = k[1] + (cur === 'site' ? 14 : 1);
    if (cur === 'track' && (phase === 'mid' || phase === 'end' || phase === 'pay')) k[2] = t.base[2] + 1;

    var payOn = phase === 'pay';
    var days = 24, ot = 6;
    var gross = t.pay.rate * days + ot * (t.pay.rate / 8);

    dash.innerHTML =
      '<div class="wfd-bar"><i></i><i></i><i></i>' +
      '<span class="wfd-url">' + esc(t.url) + '</span>' +
      '<span class="wfd-live"><em></em>Live</span></div>' +
      '<div class="wfd-in">' +
        '<div class="wfk">' +
          k.map(function (v, i) {
            var cls = (i === 0 && phase) ? ' hit' : (i === 2 && k[2] > t.base[2]) ? ' warn' : '';
            return '<div><b class="' + cls.trim() + '">' + (typeof v === 'number' ? v.toLocaleString('en-IN') : esc(v)) +
              '</b><span>' + esc(t.kpis[i]) + '</span></div>';
          }).join('') +
        '</div>' +
        '<div class="wfd-grid">' +
          '<div class="wfpan"><div class="wfpan-h"><span>Who is on duty now</span>' +
            (phase ? '<em>' + esc(t.worker.name.split(' ')[0]) + ' just marked in</em>' : '<em>waiting</em>') +
          '</div>' + boardRows(t, phase) + '</div>' +
          '<div class="wfpan"><div class="wfpan-h"><span>Where he went</span>' +
            '<em>' + esc(t.nodes[0]) + ' → ' + esc(t.nodes[t.nodes.length - 1]) + '</em></div>' +
            '<div class="wfmap">' + mapSvg(t, phase || 'none') + '</div></div>' +
        '</div>' +
        '<div class="wfpan"><div class="wfpan-h"><span>Pay, from proven duty only</span>' +
          '<em>' + (payOn ? 'ready for approval' : 'builds as duties close') + '</em></div>' +
          '<div class="wfpay">' +
            '<div><b class="' + (payOn ? 'hit' : '') + '">' + (payOn ? days : days - 1) + '</b><span>proven days this month</span></div>' +
            '<div><b>' + money(t.pay.rate) + '</b><span>agreed day rate</span></div>' +
            '<div><b class="' + (payOn ? 'hit' : '') + '">' + money(payOn ? gross : gross - t.pay.rate) +
              '</b><span>payable, before statutory</span></div>' +
          '</div></div>' +
      '</div>';

    /* let the rows arrive one after another */
    requestAnimationFrame(function () {
      $$('.wfrow', dash).forEach(function (r) { r.classList.add('in'); });
      var mine = $('.wfrow.mine', dash);
      if (mine && phase) {
        mine.classList.add('flash');
        setTimeout(function () { mine.classList.remove('flash'); }, 1400);
      }
    });
  }

  /* ── the caption rail ─────────────────────────────────────────────────── */
  function paintRail() {
    var t = T(), st = t.steps[step];
    railB.textContent = st.cap;
    railP.textContent = st.note;
    dots.innerHTML = t.steps.map(function (_, i) {
      return '<i class="' + (i === step ? 'on' : i < step ? 'past' : '') + '"></i>';
    }).join('');
  }

  /* ── running it ───────────────────────────────────────────────────────── */
  function render() { clearFace(); paintPhone(); paintDash(); paintRail(); }

  function advance() {
    step = (step + 1) % T().steps.length;
    render();
  }

  function schedule() {
    stop();
    if (!playing || calm || !seen) return;
    var st = T().steps[step];
    var ms = st.screen === 'face' || st.screen === 'check' ? 3600 : 3100;
    timer = setTimeout(function () { advance(); schedule(); }, ms);
  }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }

  function setPlaying(p) {
    playing = p;
    playBtn.innerHTML = p
      ? '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    playBtn.setAttribute('aria-label', p ? 'Pause the demonstration' : 'Play the demonstration');
    if (p) schedule(); else stop();
  }

  tabs.forEach(function (tb) {
    tb.addEventListener('click', function () {
      tabs.forEach(function (o) { o.classList.toggle('on', o === tb); o.setAttribute('aria-selected', o === tb); });
      cur = tb.getAttribute('data-type');
      step = 0;
      render();
      schedule();
    });
  });

  playBtn.addEventListener('click', function () { setPlaying(!playing); });

  $('.wf-stage').addEventListener('mouseenter', stop);
  $('.wf-stage').addEventListener('mouseleave', schedule);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : schedule(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen = e.isIntersecting; seen ? schedule() : stop(); });
    }, { threshold: 0.25 }).observe(root);
  } else { seen = true; schedule(); }

  setPlaying(!calm);
  render();
})();
