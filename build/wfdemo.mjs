/* ──────────────────────────────────────────────────────────────────────────
   wfdemo.mjs — the shell for the working demonstration. The content is built
   at run time by assets/wfdemo.js; this is the frame it runs inside, plus a
   readable fallback for anyone without scripts.
   ────────────────────────────────────────────────────────────────────────── */

const ICONS = {
  train: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M9 20l-2 2M15 20l2 2"/></svg>',
  station: '<svg viewBox="0 0 24 24"><path d="M3 20h18M6 20V9l6-5 6 5v11M10 20v-5h4v5"/></svg>',
  site: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6"/><path d="M5 11h14"/></svg>',
  track: '<svg viewBox="0 0 24 24"><path d="M7 2 5 22M17 2l2 20M4 8h16M4 14h16"/></svg>',
};

const TABS = [
  ['train', 'Train duty'],
  ['station', 'Station shift'],
  ['site', 'Site gang'],
  ['track', 'Track patrol'],
];

/** The two-pane demonstration: his phone, and the office board, in step. */
export function wfDemo() {
  return `
<div class="wf" data-wf>

  <div class="wf-tabs" role="tablist" aria-label="Kind of duty">
    ${TABS.map(([id, label], i) => `
    <button type="button" class="wf-tab${i === 0 ? ' on' : ''}" data-type="${id}"
            role="tab" aria-selected="${i === 0}">${ICONS[id]}<span>${label}</span></button>`).join('')}
  </div>

  <div class="wf-stage">
    <div>
      <p class="wf-side">On his phone</p>
      <div class="wfp">
        <div class="wfp-scr">
          <noscript><p style="padding:20px;font-size:12px;color:#9fb3aa">
            The worker marks in with his face and his position, and marks out the same way.
          </p></noscript>
        </div>
      </div>
    </div>
    <div style="min-width:0;width:100%">
      <p class="wf-side">On the office dashboard, the same second</p>
      <div class="wfd"></div>
    </div>
  </div>

  <div class="wf-rail">
    <button type="button" class="wf-play" aria-label="Pause the demonstration">
      <svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
    </button>
    <div class="wf-step">
      <b>The duty comes to him</b>
      <p>No register, no phone call. The app knows the train, the timetable and the starting station.</p>
    </div>
    <div class="wf-dots"></div>
  </div>

</div>`;
}
