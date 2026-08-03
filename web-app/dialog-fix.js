// Shared safe-escaping helper for inline event handlers, plus the Electron
// dialog/double-click guards below. Loaded first on every screen (desktop and
// cloud), so window.jsArg is available before any list renders.
//
// window.jsArg(s) — escape a user-controlled string for use inside a
// SINGLE-quoted JS string literal that itself lives inside a DOUBLE-quoted HTML
// attribute, e.g.  `<button onclick="remind('${jsArg(name)}', ${n})">`.
// A name like  a\'); alert(1);//  would otherwise break out of the JS string
// and execute (stored XSS on click). One single-pass switch handles every
// breakout vector at once (so escapes never re-process each other): backslash
// and quote are JS-escaped; double-quote/&/<>/ are HTML-entity-escaped so they
// can't close the attribute or smuggle an entity that decodes back into a
// quote; line terminators (incl. U+2028/U+2029) are JS-escaped so they can't
// terminate the string.
(function () {
  window.jsArg = function (s) {
    return String(s == null ? '' : s).replace(/[\\'"&<>\r\n\t\u2028\u2029]/g, function (c) {
      switch (c) {
        case '\\': return '\\\\';
        case "'":  return "\\'";
        case '"':  return '&quot;';
        case '&':  return '&amp;';
        case '<':  return '&lt;';
        case '>':  return '&gt;';
        case '\r': return '\\r';
        case '\n': return '\\n';
        case '\t': return '\\t';
        case '\u2028': return '\\u2028';
        case '\u2029': return '\\u2029';
      }
      return c;
    });
  };
})();

// Replaces window.alert() and window.confirm() with Electron-native dialogs.
//
// Why: Chromium's built-in dialogs have a long-standing bug on Windows —
// after one closes, the BrowserWindow is left in a lost-focus state.
// Keyboard input stops registering and form fields render gray/inactive
// until the window is clicked or re-focused. In practice the app appears
// to "freeze" after any validation message or delete confirmation.
//
// Routing the dialogs through the main process (dialog.showMessageBoxSync)
// keeps the same synchronous semantics without the focus loss.
(function () {
  // This is purely an Electron-on-Windows focus workaround, so it must ONLY run
  // inside Electron. The cloud/browser build also defines window.nativeDialog —
  // but there it is a thin shim that itself calls window.alert/confirm, so
  // overriding the natives with it would recurse infinitely (confirm -> shim ->
  // confirm -> ...). Gate strictly on the Electron user agent.
  var isElectron = typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent || '');
  if (!isElectron || !window.nativeDialog) return; // browser: keep native dialogs
  window.alert   = function (m) { window.nativeDialog.alert(m == null ? '' : String(m)); };
  window.confirm = function (m) { return window.nativeDialog.confirm(m == null ? '' : String(m)); };
})();

// ─── Global accidental-double-click guard ──────────────────────────────────
// Real bug this prevents: a user clicks "Execute Transfer" / "Save" / "Pay",
// sees no immediate change, and clicks again 3-5 times — creating 3-5 duplicate
// financial records. This capture-phase guard swallows repeat clicks on the
// SAME action button within a short window, before the inline onclick fires.
//
// Scoped to action buttons only (save/pay/submit/execute/create/confirm/...),
// so quantity steppers, pagination, tab switches and "add row" buttons — where
// rapid repeat clicks are legitimate — are never blocked. Per-form in-flight
// latches still back this up for slower saves; this is the cheap broad net.
(function () {
  var ACTION_RE = /save|submit|\bpay\b|execute|create|confirm|record|recover|approve|generate|\bpost\b|mark\s*paid|issue|finali/i;
  function isActionButton(btn) {
    if (!btn) return false;
    var oc = (btn.getAttribute && btn.getAttribute('onclick')) || '';
    if (ACTION_RE.test(oc)) return true;
    // Fall back to the visible label, but ignore icon-only / empty buttons.
    var txt = (btn.textContent || '').trim();
    return txt.length > 0 && txt.length < 40 && ACTION_RE.test(txt);
  }
  var last = { el: null, t: 0 };
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('button, .btn') : null;
    if (!btn || btn.disabled || !isActionButton(btn)) return;
    var now = Date.now();
    if (btn === last.el && (now - last.t) < 1500) {
      // Swallow the duplicate click so the inline onclick handler never runs.
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    last = { el: btn, t: now };
  }, true); // capture phase — runs before the element's own onclick
})();
